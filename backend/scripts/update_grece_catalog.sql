-- Grece Fav Cycles flagship catalog. Run in Supabase SQL after 001 + 002 migrations.
-- Safe to re-run: updates known seed UUIDs and deactivates legacy demo SKUs.

update public.products
set
    is_active = false
where slug in ('soft-matte-lipstick');

update public.products
set
    name = 'Grece Fav Body Jelly',
    slug = 'grece-fav-body-jelly',
    description = 'A nourishing body jelly for daily moisture and soft, smooth skin.',
    subtitle = 'Made in Rwanda',
    sku = 'GF-JELLY-001',
    price = 24.50,
    stock = 25,
    is_featured = true,
    is_active = true,
    category_id = '44444444-4444-4444-4444-444444444444'::uuid,
    ingredients = 'Upcycled coffee extract, plant oils, glycerin, and gentle emollients.',
    use_storage = 'Apply to clean, dry skin as needed. Store in a cool, dry place away from direct sun.',
    reminds_us_of = 'Silky, everyday comfort after a warm shower.',
    sustainability_note = 'Made in Gisenyi with repurposed coffee grounds and locally sourced ingredients.'
where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2'::uuid;

update public.products
set
    name = 'Grece Fav Body Wash',
    slug = 'grece-fav-body-wash',
    description = 'A locally made body cleanser for everyday use.',
    subtitle = 'Made in Rwanda',
    sku = 'GF-WASH-001',
    price = 19.00,
    stock = 40,
    is_featured = true,
    is_active = true,
    category_id = '44444444-4444-4444-4444-444444444444'::uuid,
    ingredients = 'Plant-based cleansers, upcycled coffee extract, aloe, and vitamin E.',
    use_storage = 'Lather on wet skin and rinse thoroughly. For external use only.',
    reminds_us_of = 'A fresh start to your morning routine.',
    sustainability_note = 'Eco-conscious packaging; crafted in Rwanda.'
where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa4'::uuid;

update public.products
set
    name = 'Tabithy Bath Soap',
    slug = 'tabithy-bath-soap',
    description = 'A gentle bath soap from the Tabithy line, made for everyday cleansing.',
    subtitle = 'Made in Rwanda',
    sku = 'TB-SOAP-001',
    price = 18.00,
    stock = 35,
    is_featured = true,
    is_active = true,
    category_id = '44444444-4444-4444-4444-444444444444'::uuid,
    ingredients = 'Natural clays, coffee-derived actives, and nourishing oils.',
    use_storage = 'Use with water; keep dry between uses. Store in a cool, dry place.',
    reminds_us_of = 'Simple, honest care inspired by Rwandan craftsmanship.',
    sustainability_note = 'Part of our circular coffee-to-care range.'
where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1'::uuid;

update public.products
set is_active = false
where id = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa3'::uuid;
