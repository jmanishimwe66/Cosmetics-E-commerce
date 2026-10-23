-- Customer catalog, guest orders, and contact inquiries.
-- Apply in the Supabase SQL editor or with the Supabase CLI.

create extension if not exists pgcrypto;

create table if not exists public.categories (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    slug text not null unique,
    description text,
    created_at timestamptz not null default now()
);

create table if not exists public.products (
    id uuid primary key default gen_random_uuid(),
    category_id uuid not null references public.categories (id),
    name text not null,
    slug text not null unique,
    description text,
    price numeric(10, 2) not null check (price >= 0),
    image_url text,
    stock integer not null default 0 check (stock >= 0),
    is_featured boolean not null default false,
    is_active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists public.orders (
    id uuid primary key default gen_random_uuid(),
    customer_name text not null,
    email text not null,
    phone text,
    shipping_address text not null,
    notes text,
    status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
    created_at timestamptz not null default now()
);

create table if not exists public.order_items (
    id uuid primary key default gen_random_uuid(),
    order_id uuid not null references public.orders (id) on delete cascade,
    product_id uuid not null references public.products (id),
    quantity integer not null check (quantity > 0),
    unit_price numeric(10, 2) not null check (unit_price >= 0)
);

create table if not exists public.contact_inquiries (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    email text not null,
    subject text not null,
    message text not null,
    created_at timestamptz not null default now()
);

create index if not exists products_category_id_idx on public.products (category_id);
create index if not exists products_is_featured_idx on public.products (is_featured) where is_featured = true;
create index if not exists products_name_lower_idx on public.products (lower(name));
create index if not exists order_items_order_id_idx on public.order_items (order_id);

-- Snapshot the catalog price and decrement stock in the same transaction as the line insert.
create or replace function public.order_items_before_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
    v_product public.products%rowtype;
begin
    select *
    into v_product
    from public.products
    where id = new.product_id
    for update;

    if not found or not v_product.is_active then
        raise exception 'PRODUCT_NOT_FOUND';
    end if;

    if new.quantity is null or new.quantity < 1 then
        raise exception 'INVALID_QUANTITY';
    end if;

    if v_product.stock < new.quantity then
        raise exception 'INSUFFICIENT_STOCK';
    end if;

    new.unit_price := v_product.price;

    update public.products
    set stock = stock - new.quantity,
        updated_at = now()
    where id = v_product.id;

    return new;
end;
$$;

drop trigger if exists order_items_before_insert on public.order_items;
create trigger order_items_before_insert
before insert on public.order_items
for each row
execute function public.order_items_before_insert();

create or replace function public.create_order(
    p_customer_name text,
    p_email text,
    p_phone text,
    p_shipping_address text,
    p_notes text,
    p_items jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
    v_order_id uuid;
    v_item jsonb;
    v_product_id uuid;
    v_quantity integer;
    v_seen uuid[] := '{}';
    v_subtotal numeric(10, 2) := 0;
    v_items jsonb;
begin
    if p_customer_name is null or length(trim(p_customer_name)) = 0 then
        raise exception 'INVALID_CUSTOMER';
    end if;

    if p_email is null or position('@' in p_email) = 0 then
        raise exception 'INVALID_EMAIL';
    end if;

    if p_shipping_address is null or length(trim(p_shipping_address)) < 5 then
        raise exception 'INVALID_ADDRESS';
    end if;

    if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
        raise exception 'ORDER_EMPTY';
    end if;

    insert into public.orders (
        customer_name,
        email,
        phone,
        shipping_address,
        notes
    )
    values (
        trim(p_customer_name),
        trim(p_email),
        nullif(trim(coalesce(p_phone, '')), ''),
        trim(p_shipping_address),
        nullif(trim(coalesce(p_notes, '')), '')
    )
    returning id into v_order_id;

    for v_item in
        select value from jsonb_array_elements(p_items)
    loop
        v_product_id := (v_item->>'product_id')::uuid;
        v_quantity := (v_item->>'quantity')::integer;

        if v_product_id = any (v_seen) then
            raise exception 'DUPLICATE_PRODUCT';
        end if;
        v_seen := array_append(v_seen, v_product_id);

        insert into public.order_items (order_id, product_id, quantity, unit_price)
        values (v_order_id, v_product_id, v_quantity, 0);
    end loop;

    select coalesce(sum(quantity * unit_price), 0)
    into v_subtotal
    from public.order_items
    where order_id = v_order_id;

    select coalesce(
        jsonb_agg(
            jsonb_build_object(
                'product_id', oi.product_id,
                'name', p.name,
                'quantity', oi.quantity,
                'unit_price', oi.unit_price
            )
            order by p.name
        ),
        '[]'::jsonb
    )
    into v_items
    from public.order_items oi
    join public.products p on p.id = oi.product_id
    where oi.order_id = v_order_id;

    return jsonb_build_object(
        'id', v_order_id,
        'status', 'pending',
        'items', v_items,
        'subtotal', v_subtotal
    );
end;
$$;

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.contact_inquiries enable row level security;

drop policy if exists categories_select_public on public.categories;
create policy categories_select_public
on public.categories
for select
to anon, authenticated
using (true);

drop policy if exists products_select_active on public.products;
create policy products_select_active
on public.products
for select
to anon, authenticated
using (is_active = true);

drop policy if exists orders_insert_public on public.orders;
create policy orders_insert_public
on public.orders
for insert
to anon, authenticated
with check (
    length(trim(customer_name)) > 0
    and position('@' in email) > 0
    and length(trim(shipping_address)) >= 5
    and status = 'pending'
);

drop policy if exists order_items_insert_public on public.order_items;
create policy order_items_insert_public
on public.order_items
for insert
to anon, authenticated
with check (quantity > 0);

drop policy if exists contact_insert_public on public.contact_inquiries;
create policy contact_insert_public
on public.contact_inquiries
for insert
to anon, authenticated
with check (
    length(trim(name)) > 0
    and position('@' in email) > 0
    and length(trim(subject)) > 0
    and length(trim(message)) > 0
);

grant usage on schema public to anon, authenticated;
grant select on public.categories, public.products to anon, authenticated;
grant insert on public.orders, public.order_items, public.contact_inquiries to anon, authenticated;
grant execute on function public.create_order(text, text, text, text, text, jsonb) to anon, authenticated;
