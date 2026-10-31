# Schema mapping

Vite reads env from the repository root (`frontend/vite.config.ts` `envDir`). Use `VITE_*` names. Do not add `NEXT_PUBLIC_*` keys or a `frontend/.env.local`.

| Purpose | Variable | Where it is used |
| --- | --- | --- |
| FastAPI base URL | `VITE_API_URL` | Browser `fetch` client. Default `http://localhost:8000` |
| Supabase project URL | `VITE_SUPABASE_URL` | Browser Auth and Storage only |
| Supabase anon key | `VITE_SUPABASE_ANON_KEY` | Browser Auth and Storage. Public by design |
| Supabase project URL | `SUPABASE_URL` | FastAPI server |
| Supabase anon key | `SUPABASE_ANON_KEY` | FastAPI public routes and JWT lookup |
| Service role | `SUPABASE_SERVICE_ROLE_KEY` | Unused by these routes. Never prefix with `VITE_` |
| Browser origin | `CORS_ORIGINS` | FastAPI. Default `http://localhost:5173` |

`VITE_ADMIN_EMAIL` and `VITE_ADMIN_PASSWORD` are retired. Admin sign-in is Supabase Auth. Create the user in the Supabase dashboard, then set the admin claim and sign in again so the access token includes it:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'admin@example.com';
```

Apply `backend/supabase/migrations/002_admin_merchandising.sql` before using the admin API.

## Auth

Public catalog, guest checkout, and contact stay on the anon key with no `Authorization` header. Admin routes require `Authorization: Bearer <supabase access token>`. FastAPI calls `GET /auth/v1/user` with that token, requires `app_metadata.role = admin`, then runs PostgREST with the same JWT so RLS applies. The cached anon client is never given the user session.

## Price

The database stores catalog majors (`numeric(10,2)`), such as `18.00`. The shop formats that as RWF 18,000 (`frontend/src/lib/price.ts`). The admin form edits whole RWF. The frontend mapper divides by 1000 on write and multiplies by 1000 on read. Do not store `18000` in `products.price`.

Stock badges are not stored. `0` is out of stock, `1–10` is low stock, anything higher is in stock.

## Products

| Admin UI (`AdminProduct`) | API field | Supabase |
| --- | --- | --- |
| `id` | `id` | `products.id` uuid |
| `title` | `name` | `products.name` |
| `subtitle` | `subtitle` | `products.subtitle` |
| `category` (Skincare, Hair, Makeup, Body) | `category_slug` on write, `category_name` on read | `categories` via `products.category_id` |
| `sku` | `sku` | `products.sku` |
| `price` (RWF integer) | `price` (catalog major) | `products.price` |
| `stock` | `stock` | `products.stock` |
| `status` | derived from `stock` | not a column |
| `images[]` | `images` plus `image_url` = first image | `product_images (product_id, url, position)` and `products.image_url` |
| `ingredients` | `ingredients` | `products.ingredients` |
| `useStorage` | `use_storage` | `products.use_storage` |
| `remindsUsOf` | `reminds_us_of` | `products.reminds_us_of` |
| `sustainabilityNote` | `sustainability_note` | `products.sustainability_note` |
| — | `description` | `products.description` (kept on update; PDP uses `subtitle` when set) |
| — | `slug` | `products.slug` (set on create, kept on update) |
| — | `is_featured` | `products.is_featured` (kept on update) |
| — | `is_active` | `products.is_active` (delete sets false) |

| Endpoint | Auth | Notes |
| --- | --- | --- |
| `GET /api/v1/products` | anon | Active products. `image_url` remains the cover |
| `GET /api/v1/products/{slug}` | anon | Same shape |
| `GET /api/v1/admin/products` | admin | Active products only, with gallery and merchandising fields |
| `POST /api/v1/admin/products` | admin | Body uses `category_slug` and catalog `price` |
| `PUT /api/v1/admin/products/{id}` | admin | Replaces `product_images`. Does not change `slug` or `is_featured` |
| `DELETE /api/v1/admin/products/{id}` | admin | Soft delete (`is_active = false`) so order lines keep their product |

Shop cards keep using `name`, `price`, `image_url`, and `stock`. The product page uses `subtitle` for the summary when it is set, and uses `ingredients` / `use_storage` in the existing accordion when those fields are set.

## Orders

Guest `POST /api/v1/orders` is unchanged. `orders.status` stays `pending | confirmed | cancelled`. New columns default so existing inserts keep working.

| Admin UI (`AdminOrder`) | API field | Supabase |
| --- | --- | --- |
| `id` | `id` | `orders.id` uuid (not `ORD-8921`) |
| `customerName` | `customer_name` | `orders.customer_name` |
| `email` | `email` | `orders.email` |
| `phone` | `phone` | `orders.phone` |
| `address` | `shipping_address` | `orders.shipping_address` |
| `createdAt` | `created_at` | `orders.created_at` |
| `paymentStatus` | `payment_status` | `orders.payment_status` (`paid`, `pending`, `failed`) |
| `fulfillmentStatus` | `fulfillment_status` | `orders.fulfillment_status` (`unfulfilled`, `processing`, `shipped`, `delivered`) |
| `trackingNumber` | `tracking_number` | `orders.tracking_number` |
| `items[].title` | `items[].name` | `products.name` via `order_items` |
| `items[].quantity` | `items[].quantity` | `order_items.quantity` |
| `items[].unitPrice` (RWF) | `items[].unit_price` (catalog major) | `order_items.unit_price` |
| `items[].imageUrl` | `items[].image_url` | `products.image_url` (not stored on the line) |
| — | `status` | `orders.status` checkout lifecycle. Not the admin fulfillment field |

| Endpoint | Auth | Notes |
| --- | --- | --- |
| `POST /api/v1/orders` | anon | Unchanged `OrderCreated` |
| `GET /api/v1/admin/orders` | admin | No anon select on orders |
| `PATCH /api/v1/admin/orders/{id}` | admin | `payment_status`, `fulfillment_status`, `tracking_number` |

WhatsApp checkout is not switched to `POST /api/v1/orders`.

## Storage

Bucket `product-images` is public-read. Insert, update, and delete require `is_admin()`. The gallery uploads from the browser with the admin session and stores the public URL on the product. Data URLs are rejected.

## Risks

- `CORS_ORIGINS` must list the exact browser origin. `Authorization` is already allowed. Do not set the origin to `*` while credentials are enabled.
- A missing, expired, or non-admin token returns 401 or 403. An empty admin list is not used as the failure signal.
- Forgetting the ÷ 1000 mapper stores RWF in `numeric(10,2)` and the shop shows a 1000× price.
- `price` is a decimal string in JSON. Admin state is a number. Ids are UUIDs.
- Public image URLs are world-readable. Old `localStorage` data URLs are not migrated.
