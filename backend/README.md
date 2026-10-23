# Cosmetics API

Customer-facing FastAPI service for the cosmetics store. It reads the catalog from Supabase and accepts guest orders and contact messages.

## Setup

From the repository root, copy the environment file and fill in the Supabase project values:

```bash
cp .env.example .env
```

Create a virtual environment and install the package:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

Apply the database schema in the Supabase SQL editor, in order:

1. `supabase/migrations/001_initial_schema.sql`
2. `scripts/seed.sql` (optional sample products)

Do not commit `.env`. The service-role key is not required for these endpoints.

## Run

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

- Health: `GET /health`
- OpenAPI: `GET /docs`
- API prefix: `/api/v1`

From the repository root, after `.env` exists:

```bash
docker compose up --build
```

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/api/v1/categories` | List categories |
| GET | `/api/v1/products` | Search and filter the catalog |
| GET | `/api/v1/products/{slug}` | Product detail |
| POST | `/api/v1/orders` | Submit a guest order |
| POST | `/api/v1/contact` | Submit a contact or order inquiry |

Product list query parameters: `q`, `category_slug`, `featured`, `limit`, `offset`.

Order prices and stock changes are applied in Postgres (`create_order` and the `order_items` insert trigger). The API does not trust prices sent by the client.
