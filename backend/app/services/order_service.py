from collections import OrderedDict
from uuid import UUID

from supabase import Client

from app.core.exceptions import AppError, BadRequestError
from app.schemas.order import OrderCreate, OrderCreated, OrderItemIn
from app.services.errors import call_db


class OrderService:
    def __init__(self, client: Client) -> None:
        self._client = client

    def create_order(self, payload: OrderCreate) -> OrderCreated:
        items = _merge_items(payload.items)
        response = call_db(
            lambda: self._client.rpc(
                "create_order",
                {
                    "p_customer_name": payload.customer_name,
                    "p_email": str(payload.email),
                    "p_phone": payload.phone,
                    "p_shipping_address": payload.shipping_address,
                    "p_notes": payload.notes,
                    "p_items": [
                        {"product_id": str(item.product_id), "quantity": item.quantity}
                        for item in items
                    ],
                },
            ).execute()
        )
        data = response.data
        if isinstance(data, list):
            data = data[0] if data else None
        if not isinstance(data, dict):
            raise AppError(502, "The database request failed")
        return OrderCreated.model_validate(data)


def _merge_items(items: list[OrderItemIn]) -> list[OrderItemIn]:
    merged: OrderedDict[UUID, int] = OrderedDict()
    for item in items:
        merged[item.product_id] = merged.get(item.product_id, 0) + item.quantity
    if any(quantity > 99 for quantity in merged.values()):
        raise BadRequestError("Quantity is too large")
    return [
        OrderItemIn(product_id=product_id, quantity=quantity)
        for product_id, quantity in merged.items()
    ]
