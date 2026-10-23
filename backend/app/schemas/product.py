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
    description: str | None = None
    price: Decimal
    image_url: str | None = None
    stock: int
    is_featured: bool


class ProductList(BaseModel):
    items: list[Product]
    total: int
    limit: int
    offset: int
