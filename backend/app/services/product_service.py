from typing import Any

from supabase import Client

from app.core.exceptions import NotFoundError
from app.schemas.product import Product, ProductList
from app.services.errors import call_db


class ProductService:
    def __init__(self, client: Client) -> None:
        self._client = client

    def list_products(
        self,
        *,
        q: str | None,
        category_slug: str | None,
        featured: bool | None,
        limit: int,
        offset: int,
    ) -> ProductList:
        embed = "categories!inner(slug, name)" if category_slug else "categories(slug, name)"
        columns = (
            "id, category_id, name, slug, description, price, image_url, "
            f"stock, is_featured, {embed}"
        )

        def _query() -> Any:
            query = self._client.table("products").select(columns, count="exact").eq("is_active", True)
            if category_slug:
                query = query.eq("categories.slug", category_slug)
            if featured is not None:
                query = query.eq("is_featured", featured)
            if q and q.strip():
                pattern = f"%{_safe_search(q)}%"
                query = query.or_(f"name.ilike.{pattern},description.ilike.{pattern}")
            return query.order("name").range(offset, offset + limit - 1).execute()

        response = call_db(_query)
        items = [_to_product(row) for row in (response.data or [])]
        total = response.count if response.count is not None else len(items)
        return ProductList(items=items, total=total, limit=limit, offset=offset)

    def get_by_slug(self, slug: str) -> Product:
        response = call_db(
            lambda: (
                self._client.table("products")
                .select(
                    "id, category_id, name, slug, description, price, image_url, "
                    "stock, is_featured, categories(slug, name)"
                )
                .eq("slug", slug)
                .eq("is_active", True)
                .limit(1)
                .execute()
            )
        )
        rows = response.data or []
        if not rows:
            raise NotFoundError("Product not found")
        return _to_product(rows[0])


def _safe_search(value: str) -> str:
    cleaned = value.strip().replace("%", "").replace(",", " ").replace("(", "").replace(")", "")
    return cleaned[:120]


def _to_product(row: dict[str, Any]) -> Product:
    category = row.get("categories") or {}
    if isinstance(category, list):
        category = category[0] if category else {}
    return Product.model_validate(
        {
            "id": row["id"],
            "category_id": row["category_id"],
            "category_slug": category.get("slug"),
            "category_name": category.get("name"),
            "name": row["name"],
            "slug": row["slug"],
            "description": row.get("description"),
            "price": row["price"],
            "image_url": row.get("image_url"),
            "stock": row["stock"],
            "is_featured": row["is_featured"],
        }
    )
