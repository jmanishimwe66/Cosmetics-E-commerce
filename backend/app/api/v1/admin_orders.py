from uuid import UUID

from fastapi import APIRouter, Depends

from app.dependencies import admin_order_service_dep
from app.schemas.admin import AdminOrder, AdminOrderUpdate
from app.services.admin_order_service import AdminOrderService

router = APIRouter(prefix="/admin/orders", tags=["admin-orders"])


@router.get("", response_model=list[AdminOrder])
def list_admin_orders(
    service: AdminOrderService = Depends(admin_order_service_dep),
) -> list[AdminOrder]:
    return service.list_orders()


@router.patch("/{order_id}", response_model=AdminOrder)
def update_admin_order(
    order_id: UUID,
    payload: AdminOrderUpdate,
    service: AdminOrderService = Depends(admin_order_service_dep),
) -> AdminOrder:
    return service.update_order(order_id, payload)
