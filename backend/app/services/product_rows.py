from typing import Any

from app.schemas.product import Product

PRODUCT_COLUMNS_BASE = (
    "id, category_id, name, slug, description, price, image_url, stock, "
    "is_featured, is_active, created_at"
)
PRODUCT_COLUMNS_MERCH = (
    "subtitle, sku, ingredients, use_storage, reminds_us_of, sustainability_note"
)


def product_select(
    embed_category: str,
    *,
    merchandising: bool = True,
    gallery: bool = True,
) -> str:
    columns = PRODUCT_COLUMNS_BASE
    if merchandising:
        columns = f"{columns}, {PRODUCT_COLUMNS_MERCH}"
    parts = [columns, embed_category]
    if gallery:
        parts.append("product_images(url, position)")
    return ", ".join(parts)


def to_product(row: dict[str, Any]) -> Product:
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
            "subtitle": row.get("subtitle"),
            "description": row.get("description"),
            "sku": row.get("sku"),
            "ingredients": row.get("ingredients"),
            "use_storage": row.get("use_storage"),
            "reminds_us_of": row.get("reminds_us_of"),
            "sustainability_note": row.get("sustainability_note"),
            "price": row["price"],
            "image_url": row.get("image_url"),
            "images": _image_urls(row.get("product_images")),
            "stock": row["stock"],
            "is_featured": row["is_featured"],
            "is_active": row.get("is_active", True),
        }
    )


def _image_urls(raw: Any) -> list[str]:
    if not isinstance(raw, list):
        return []
    ordered = sorted(raw, key=lambda item: item.get("position") or 0)
    return [item["url"] for item in ordered if isinstance(item, dict) and item.get("url")]
