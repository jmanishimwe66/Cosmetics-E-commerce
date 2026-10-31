from uuid import UUID

from fastapi import APIRouter, Depends, Response

from app.dependencies import admin_product_service_dep
from app.schemas.admin import AdminProductWrite
from app.schemas.product import Product
from app.services.admin_product_service import AdminProductService

router = APIRouter(prefix="/admin/products", tags=["admin-products"])


@router.get("", response_model=list[Product])
def list_admin_products(
    service: AdminProductService = Depends(admin_product_service_dep),
) -> list[Product]:
    return service.list_products()


@router.post("", response_model=Product, status_code=201)
def create_admin_product(
    payload: AdminProductWrite,
    service: AdminProductService = Depends(admin_product_service_dep),
) -> Product:
    return service.create_product(payload)


@router.put("/{product_id}", response_model=Product)
def update_admin_product(
    product_id: UUID,
    payload: AdminProductWrite,
    service: AdminProductService = Depends(admin_product_service_dep),
) -> Product:
    return service.update_product(product_id, payload)


@router.delete("/{product_id}", status_code=204)
def delete_admin_product(
    product_id: UUID,
    service: AdminProductService = Depends(admin_product_service_dep),
) -> Response:
    service.soft_delete(product_id)
    return Response(status_code=204)
