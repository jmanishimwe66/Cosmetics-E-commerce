from fastapi import APIRouter, Depends

from app.dependencies import order_service_dep
from app.schemas.order import OrderCreate, OrderCreated
from app.services.order_service import OrderService

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("", response_model=OrderCreated, status_code=201)
def create_order(
    payload: OrderCreate,
    service: OrderService = Depends(order_service_dep),
) -> OrderCreated:
    return service.create_order(payload)
