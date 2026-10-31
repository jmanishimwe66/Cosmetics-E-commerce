from decimal import Decimal
from typing import Any
from uuid import UUID

from supabase import Client

from app.core.exceptions import NotFoundError
from app.schemas.admin import AdminOrder, AdminOrderUpdate
from app.services.errors import call_db

_SELECT = (
    "id, customer_name, email, phone, shipping_address, notes, status, "
    "payment_status, fulfillment_status, tracking_number, created_at, "
    "order_items(product_id, quantity, unit_price, products(name, image_url))"
)


class AdminOrderService:
    def __init__(self, client: Client) -> None:
        self._client = client

    def list_orders(self) -> list[AdminOrder]:
        response = call_db(
            lambda: (
                self._client.table("orders")
                .select(_SELECT)
                .order("created_at", desc=True)
                .execute()
            )
        )
        return [_to_order(row) for row in (response.data or [])]

    def update_order(self, order_id: UUID, patch: AdminOrderUpdate) -> AdminOrder:
        changes = patch.model_dump(exclude_none=True)
        if changes:
            response = call_db(
                lambda: (
                    self._client.table("orders")
                    .update(changes)
                    .eq("id", str(order_id))
                    .execute()
                )
            )
            if not response.data:
                raise NotFoundError("Order not found")
        return self.get_order(order_id)

    def get_order(self, order_id: UUID) -> AdminOrder:
        response = call_db(
            lambda: (
                self._client.table("orders")
                .select(_SELECT)
                .eq("id", str(order_id))
                .limit(1)
                .execute()
            )
        )
        rows = response.data or []
        if not rows:
            raise NotFoundError("Order not found")
        return _to_order(rows[0])


def _to_order(row: dict[str, Any]) -> AdminOrder:
    items = [_to_item(item) for item in (row.get("order_items") or [])]
    subtotal = sum(
        (Decimal(item["quantity"]) * Decimal(str(item["unit_price"])) for item in items),
        Decimal(0),
    )
    return AdminOrder.model_validate(
        {
            "id": row["id"],
            "customer_name": row["customer_name"],
            "email": row["email"],
            "phone": row.get("phone"),
            "shipping_address": row["shipping_address"],
            "notes": row.get("notes"),
            "status": row["status"],
            "payment_status": row["payment_status"],
            "fulfillment_status": row["fulfillment_status"],
            "tracking_number": row.get("tracking_number") or "",
            "created_at": row["created_at"],
            "items": items,
            "subtotal": subtotal,
        }
    )


def _to_item(row: dict[str, Any]) -> dict[str, Any]:
    product = row.get("products") or {}
    if isinstance(product, list):
        product = product[0] if product else {}
    return {
        "product_id": row["product_id"],
        "name": product.get("name") or "Product",
        "quantity": row["quantity"],
        "unit_price": row["unit_price"],
        "image_url": product.get("image_url"),
    }
