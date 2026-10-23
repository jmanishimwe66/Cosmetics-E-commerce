from uuid import UUID

import pytest
from pydantic import ValidationError

from app.core.exceptions import BadRequestError
from app.schemas.order import OrderCreate, OrderItemIn
from app.services.order_service import _merge_items


def test_order_requires_items() -> None:
    with pytest.raises(ValidationError):
        OrderCreate(
            customer_name="Ada Lovelace",
            email="ada@example.com",
            shipping_address="12 Market Street",
            items=[],
        )


def test_merge_items_sums_duplicate_products() -> None:
    product_id = UUID("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1")
    merged = _merge_items(
        [
            OrderItemIn(product_id=product_id, quantity=2),
            OrderItemIn(product_id=product_id, quantity=3),
        ]
    )
    assert merged == [OrderItemIn(product_id=product_id, quantity=5)]


def test_merge_items_rejects_quantity_over_limit() -> None:
    product_id = UUID("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1")
    with pytest.raises(BadRequestError):
        _merge_items(
            [
                OrderItemIn(product_id=product_id, quantity=60),
                OrderItemIn(product_id=product_id, quantity=50),
            ]
        )
