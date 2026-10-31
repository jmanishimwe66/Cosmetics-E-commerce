-- Sample catalog for local checks. Run after 001_initial_schema.sql.
-- Safe to re-run: rows are inserted only when the slug is missing.

insert into public.categories (id, name, slug, description)
select seed.id, seed.name, seed.slug, seed.description
from (
    values
        (
            '11111111-1111-1111-1111-111111111111'::uuid,
            'Skincare'::text,
            'skincare'::text,
            'Cleansers, moisturizers, and treatments'::text
        ),
        (
            '22222222-2222-2222-2222-222222222222'::uuid,
            'Makeup'::text,
            'makeup'::text,
            'Face, eye, and lip color'::text
        ),
        (
            '33333333-3333-3333-3333-333333333333'::uuid,
            'Hair'::text,
            'hair'::text,
            'Shampoo, conditioner, and styling'::text
        ),
        (
            '44444444-4444-4444-4444-444444444444'::uuid,
            'Body'::text,
            'body'::text,
            'Body care'::text
        )
) as seed(id, name, slug, description)
where not exists (
    select 1 from public.categories existing where existing.slug = seed.slug
);

insert into public.products (
    id,
    category_id,
    name,
    slug,
    description,
    price,
    image_url,
    stock,
    is_featured,
    is_active
)
select
    seed.id,
    seed.category_id,
    seed.name,
    seed.slug,
    seed.description,
    seed.price,
    seed.image_url,
    seed.stock,
    seed.is_featured,
    seed.is_active
from (
    values
        (
            'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1'::uuid,
            '11111111-1111-1111-1111-111111111111'::uuid,
            'Rosewater Toner'::text,
            'rosewater-toner'::text,
            'Alcohol-free toner with rosewater'::text,
            18.00::numeric,
            null::text,
            40,
            true,
            true
        ),
        (
            'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2'::uuid,
            '11111111-1111-1111-1111-111111111111'::uuid,
            'Daily Moisturizer'::text,
            'daily-moisturizer'::text,
            'Light cream for everyday use'::text,
            24.50::numeric,
            null::text,
            25,
            true,
            true
        ),
        (
            'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3'::uuid,
            '22222222-2222-2222-2222-222222222222'::uuid,
            'Soft Matte Lipstick'::text,
            'soft-matte-lipstick'::text,
            'Comfortable matte lipstick'::text,
            16.00::numeric,
            null::text,
            30,
            false,
            true
        ),
        (
            'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4'::uuid,
            '33333333-3333-3333-3333-333333333333'::uuid,
            'Repair Shampoo'::text,
            'repair-shampoo'::text,
            'Gentle shampoo for dry hair'::text,
            19.00::numeric,
            null::text,
            18,
            false,
            true
        )
) as seed(
    id,
    category_id,
    name,
    slug,
    description,
    price,
    image_url,
    stock,
    is_featured,
    is_active
)
where not exists (
    select 1 from public.products existing where existing.slug = seed.slug
);
