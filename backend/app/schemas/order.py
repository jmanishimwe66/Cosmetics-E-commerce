from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class OrderItemIn(BaseModel):
    product_id: UUID
    quantity: int = Field(ge=1, le=99)


class OrderCreate(BaseModel):
    customer_name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=40)
    shipping_address: str = Field(min_length=5, max_length=500)
    notes: str | None = Field(default=None, max_length=1000)
    items: list[OrderItemIn] = Field(min_length=1, max_length=50)


class OrderItemOut(BaseModel):
    product_id: UUID
    name: str
    quantity: int
    unit_price: Decimal


class OrderCreated(BaseModel):
    id: UUID
    status: str
    items: list[OrderItemOut]
    subtotal: Decimal
