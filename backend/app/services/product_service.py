from typing import Any

from supabase import Client

from app.core.exceptions import AppError, NotFoundError
from app.schemas.product import Product, ProductList
from app.services.errors import call_db
from app.services.product_rows import product_select, to_product


class ProductService:
    def __init__(self, client: Client) -> None:
        self._client = client

    def list_products(
        self,
        *,
        q: str | None,
        category_slug: str | None,
        featured: bool | None,
        in_stock: bool | None,
        sort: str,
        limit: int,
        offset: int,
    ) -> ProductList:
        embed = "categories!inner(slug, name)" if category_slug else "categories(slug, name)"
        response = self._run_product_query(
            embed,
            lambda columns: self._list_query(
                columns,
                q=q,
                category_slug=category_slug,
                featured=featured,
                in_stock=in_stock,
                sort=sort,
                limit=limit,
                offset=offset,
            ),
        )
        items = [to_product(row) for row in (response.data or [])]
        total = response.count if response.count is not None else len(items)
        return ProductList(items=items, total=total, limit=limit, offset=offset)

    def get_by_slug(self, slug: str) -> Product:
        response = self._run_product_query(
            "categories(slug, name)",
            lambda columns: (
                self._client.table("products")
                .select(columns)
                .eq("slug", slug)
                .eq("is_active", True)
                .limit(1)
                .execute()
            ),
        )
        rows = response.data or []
        if not rows:
            raise NotFoundError("Product not found")
        return to_product(rows[0])

    def _run_product_query(self, embed: str, run: Any) -> Any:
        attempts = (
            (True, True),
            (True, False),
            (False, False),
        )
        last_error: AppError | None = None
        for merchandising, gallery in attempts:
            columns = product_select(embed, merchandising=merchandising, gallery=gallery)
            try:
                return call_db(lambda cols=columns: run(cols))
            except AppError as exc:
                if exc.status_code != 502:
                    raise
                last_error = exc
        if last_error:
            raise last_error
        raise AppError(502, "The database request failed")

    def _list_query(
        self,
        columns: str,
        *,
        q: str | None,
        category_slug: str | None,
        featured: bool | None,
        in_stock: bool | None,
        sort: str,
        limit: int,
        offset: int,
    ) -> Any:
        query = (
            self._client.table("products")
            .select(columns, count="exact")
            .eq("is_active", True)
        )
        if category_slug:
            query = query.eq("categories.slug", category_slug)
        if featured is not None:
            query = query.eq("is_featured", featured)
        if in_stock:
            query = query.gt("stock", 0)
        if q and q.strip():
            pattern = f"%{_safe_search(q)}%"
            query = query.or_(f"name.ilike.{pattern},description.ilike.{pattern}")
        if sort == "newest":
            query = query.order("created_at", desc=True).order("name")
        else:
            query = query.order("name")
        return query.range(offset, offset + limit - 1).execute()


def _safe_search(value: str) -> str:
    cleaned = value.strip().replace("%", "").replace(",", " ").replace("(", "").replace(")", "")
    return cleaned[:120]


