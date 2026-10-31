-- Admin merchandising, order fulfillment, and product image storage.
-- Apply after 001_initial_schema.sql.

alter table public.products
    add column if not exists subtitle text,
    add column if not exists sku text,
    add column if not exists ingredients text,
    add column if not exists use_storage text,
    add column if not exists reminds_us_of text,
    add column if not exists sustainability_note text;

alter table public.orders
    add column if not exists payment_status text not null default 'pending',
    add column if not exists fulfillment_status text not null default 'unfulfilled',
    add column if not exists tracking_number text not null default '';

alter table public.orders drop constraint if exists orders_payment_status_check;
alter table public.orders
    add constraint orders_payment_status_check
    check (payment_status in ('paid', 'pending', 'failed'));

alter table public.orders drop constraint if exists orders_fulfillment_status_check;
alter table public.orders
    add constraint orders_fulfillment_status_check
    check (fulfillment_status in ('unfulfilled', 'processing', 'shipped', 'delivered'));

create table if not exists public.product_images (
    id uuid primary key default gen_random_uuid(),
    product_id uuid not null references public.products (id) on delete cascade,
    url text not null,
    position integer not null default 0 check (position >= 0),
    unique (product_id, position)
);

create index if not exists product_images_product_id_idx on public.product_images (product_id);

insert into public.categories (id, name, slug, description)
select
    '44444444-4444-4444-4444-444444444444'::uuid,
    'Body',
    'body',
    'Body care'
where not exists (
    select 1 from public.categories existing where existing.slug = 'body'
);

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
    select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

grant execute on function public.is_admin() to anon, authenticated;

alter table public.product_images enable row level security;

drop policy if exists product_images_select on public.product_images;
create policy product_images_select
on public.product_images
for select
to anon, authenticated
using (
    exists (
        select 1
        from public.products product
        where product.id = product_images.product_id
          and (product.is_active or public.is_admin())
    )
);

drop policy if exists product_images_admin_write on public.product_images;
create policy product_images_admin_write
on public.product_images
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists products_admin_write on public.products;
create policy products_admin_write
on public.products
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists orders_admin_select on public.orders;
create policy orders_admin_select
on public.orders
for select
to authenticated
using (public.is_admin());

drop policy if exists orders_admin_update on public.orders;
create policy orders_admin_update
on public.orders
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists order_items_admin_select on public.order_items;
create policy order_items_admin_select
on public.order_items
for select
to authenticated
using (public.is_admin());

grant select on public.product_images to anon, authenticated;
grant insert, update, delete on public.product_images to authenticated;
grant insert, update, delete on public.products to authenticated;
grant select, update on public.orders to authenticated;
grant select on public.order_items to authenticated;

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists product_images_storage_read on storage.objects;
create policy product_images_storage_read
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'product-images');

drop policy if exists product_images_storage_insert on storage.objects;
create policy product_images_storage_insert
on storage.objects
for insert
to authenticated
with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists product_images_storage_update on storage.objects;
create policy product_images_storage_update
on storage.objects
for update
to authenticated
using (bucket_id = 'product-images' and public.is_admin())
with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists product_images_storage_delete on storage.objects;
create policy product_images_storage_delete
on storage.objects
for delete
to authenticated
using (bucket_id = 'product-images' and public.is_admin());
