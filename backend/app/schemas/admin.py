from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, Field, field_validator

from app.schemas.order import OrderItemOut


def _blank(value: str | None) -> str | None:
    if value is None:
        return None
    text = value.strip()
    return text or None


class AdminProductWrite(BaseModel):
    name: str = Field(min_length=1, max_length=160)
    subtitle: str | None = Field(default=None, max_length=300)
    category_slug: str = Field(min_length=1, max_length=80)
    sku: str | None = Field(default=None, max_length=64)
    price: Decimal = Field(ge=0)
    stock: int = Field(ge=0, le=1_000_000)
    ingredients: str | None = Field(default=None, max_length=4000)
    use_storage: str | None = Field(default=None, max_length=4000)
    reminds_us_of: str | None = Field(default=None, max_length=2000)
    sustainability_note: str | None = Field(default=None, max_length=2000)
    images: list[str] = Field(default_factory=list, max_length=12)

    @field_validator(
        "subtitle",
        "sku",
        "ingredients",
        "use_storage",
        "reminds_us_of",
        "sustainability_note",
    )
    @classmethod
    def empty_to_none(cls, value: str | None) -> str | None:
        return _blank(value)

    @field_validator("category_slug")
    @classmethod
    def normalize_slug(cls, value: str) -> str:
        return value.strip().lower()

    @field_validator("name")
    @classmethod
    def normalize_name(cls, value: str) -> str:
        return value.strip()

    @field_validator("images")
    @classmethod
    def http_images(cls, values: list[str]) -> list[str]:
        cleaned: list[str] = []
        for value in values:
            url = value.strip()
            if not url.startswith(("http://", "https://")):
                raise ValueError("Images must be http or https URLs")
            cleaned.append(url)
        return cleaned


class AdminOrderItem(OrderItemOut):
    image_url: str | None = None


class AdminOrder(BaseModel):
    id: UUID
    customer_name: str
    email: str
    phone: str | None = None
    shipping_address: str
    notes: str | None = None
    status: str
    payment_status: str
    fulfillment_status: str
    tracking_number: str
    created_at: datetime
    items: list[AdminOrderItem]
    subtotal: Decimal


class AdminOrderUpdate(BaseModel):
    payment_status: str | None = Field(default=None, pattern="^(paid|pending|failed)$")
    fulfillment_status: str | None = Field(
        default=None,
        pattern="^(unfulfilled|processing|shipped|delivered)$",
    )
    tracking_number: str | None = Field(default=None, max_length=120)
