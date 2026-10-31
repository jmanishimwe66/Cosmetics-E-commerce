from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, Field


class Product(BaseModel):
    id: UUID
    category_id: UUID
    category_slug: str | None = None
    category_name: str | None = None
    name: str
    slug: str
    subtitle: str | None = None
    description: str | None = None
    sku: str | None = None
    ingredients: str | None = None
    use_storage: str | None = None
    reminds_us_of: str | None = None
    sustainability_note: str | None = None
    price: Decimal
    image_url: str | None = None
    images: list[str] = Field(default_factory=list)
    stock: int
    is_featured: bool
    is_active: bool = True


class ProductList(BaseModel):
    items: list[Product]
    total: int
    limit: int
    offset: int
