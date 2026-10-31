import re
from datetime import UTC, datetime
from uuid import UUID

from supabase import Client

from app.core.exceptions import BadRequestError, ConflictError, NotFoundError
from app.schemas.admin import AdminProductWrite
from app.schemas.product import Product
from app.services.errors import call_db
from app.services.product_rows import product_select, to_product

_SELECT = product_select("categories(slug, name)")


class AdminProductService:
    def __init__(self, client: Client) -> None:
        self._client = client

    def list_products(self) -> list[Product]:
        response = call_db(
            lambda: (
                self._client.table("products")
                .select(_SELECT)
                .eq("is_active", True)
                .order("name")
                .execute()
            )
        )
        return [to_product(row) for row in (response.data or [])]

    def create_product(self, payload: AdminProductWrite) -> Product:
        category_id = self._category_id(payload.category_slug)
        slug = self._unique_slug(_slugify(payload.name))
        row = {
            **_editable(payload, category_id),
            "slug": slug,
            "description": None,
            "is_featured": False,
            "is_active": True,
        }
        response = call_db(lambda: self._client.table("products").insert(row).execute())
        rows = response.data or []
        if not rows:
            raise ConflictError("The product could not be created")
        product_id = UUID(str(rows[0]["id"]))
        self._replace_images(product_id, payload.images)
        return self.get_product(product_id)

    def update_product(self, product_id: UUID, payload: AdminProductWrite) -> Product:
        self.get_product(product_id)
        category_id = self._category_id(payload.category_slug)
        response = call_db(
            lambda: (
                self._client.table("products")
                .update(_editable(payload, category_id))
                .eq("id", str(product_id))
                .eq("is_active", True)
                .execute()
            )
        )
        if not response.data:
            raise NotFoundError("Product not found")
        self._replace_images(product_id, payload.images)
        return self.get_product(product_id)

    def soft_delete(self, product_id: UUID) -> None:
        response = call_db(
            lambda: (
                self._client.table("products")
                .update({"is_active": False, "updated_at": _now()})
                .eq("id", str(product_id))
                .eq("is_active", True)
                .execute()
            )
        )
        if not response.data:
            raise NotFoundError("Product not found")

    def get_product(self, product_id: UUID) -> Product:
        response = call_db(
            lambda: (
                self._client.table("products")
                .select(_SELECT)
                .eq("id", str(product_id))
                .limit(1)
                .execute()
            )
        )
        rows = response.data or []
        if not rows:
            raise NotFoundError("Product not found")
        return to_product(rows[0])

    def _category_id(self, slug: str) -> str:
        response = call_db(
            lambda: (
                self._client.table("categories").select("id").eq("slug", slug).limit(1).execute()
            )
        )
        rows = response.data or []
        if not rows:
            raise BadRequestError("Unknown category")
        return str(rows[0]["id"])

    def _unique_slug(self, base: str) -> str:
        slug = base
        for suffix in range(2, 51):
            if not self._slug_taken(slug):
                return slug
            slug = f"{base}-{suffix}"
        raise ConflictError("Could not assign a unique slug")

    def _slug_taken(self, slug: str) -> bool:
        response = call_db(
            lambda: self._client.table("products").select("id").eq("slug", slug).limit(1).execute()
        )
        return bool(response.data)

    def _replace_images(self, product_id: UUID, images: list[str]) -> None:
        call_db(
            lambda: (
                self._client.table("product_images")
                .delete()
                .eq("product_id", str(product_id))
                .execute()
            )
        )
        if not images:
            return
        rows = [
            {"product_id": str(product_id), "url": url, "position": index}
            for index, url in enumerate(images)
        ]
        call_db(lambda: self._client.table("product_images").insert(rows).execute())


def _slugify(name: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return (slug or "product")[:80]


def _now() -> str:
    return datetime.now(UTC).isoformat()


def _editable(payload: AdminProductWrite, category_id: str) -> dict[str, object]:
    images = payload.images
    return {
        "category_id": category_id,
        "name": payload.name,
        "subtitle": payload.subtitle,
        "sku": payload.sku,
        "price": str(payload.price),
        "stock": payload.stock,
        "ingredients": payload.ingredients,
        "use_storage": payload.use_storage,
        "reminds_us_of": payload.reminds_us_of,
        "sustainability_note": payload.sustainability_note,
        "image_url": images[0] if images else None,
        "updated_at": _now(),
    }
