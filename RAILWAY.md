# Railway

Use two services from this repo. Set variables in the Railway dashboard. Do not commit `.env`.

## API

- Root directory: `backend`
- Builder: Dockerfile (`backend/Dockerfile`)
- Health check: `/health`
- Variables:
  - `APP_ENV=production`
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `CORS_ORIGINS` = the public storefront URL, for example `https://your-web.up.railway.app` (comma-separate extra origins if needed)

The process listens on Railway's `PORT`.

## Storefront

- Root directory: `frontend`
- Builder: Dockerfile (`frontend/Dockerfile`)
- Variables (required at **build** time, then redeploy):
  - `VITE_API_URL` = the public API URL, no trailing slash, for example `https://your-api.up.railway.app`
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY` (publishable or anon key only)
  - `VITE_WHATSAPP_NUMBER` (optional, digits with country code)
  - `VITE_CONTACT_EMAIL` (optional)

`VITE_*` values are baked into the static build. Change them, then redeploy the web service.

Apply `backend/supabase/migrations/001_initial_schema.sql` and `002_admin_merchandising.sql` in Supabase before going live.
