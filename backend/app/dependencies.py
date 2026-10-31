from typing import Annotated

from fastapi import Depends, Header
from supabase import Client

from app.config import Settings, get_settings
from app.services.admin_order_service import AdminOrderService
from app.services.admin_product_service import AdminProductService
from app.services.auth import client_for_admin
from app.services.category_service import CategoryService
from app.services.contact_service import ContactService
from app.services.order_service import OrderService
from app.services.product_service import ProductService
from app.services.supabase import get_supabase_client


def settings_dep() -> Settings:
    return get_settings()


def supabase_dep() -> Client:
    return get_supabase_client()


def category_service_dep(client: Client = Depends(supabase_dep)) -> CategoryService:
    return CategoryService(client)


def product_service_dep(client: Client = Depends(supabase_dep)) -> ProductService:
    return ProductService(client)


def order_service_dep(client: Client = Depends(supabase_dep)) -> OrderService:
    return OrderService(client)


def contact_service_dep(client: Client = Depends(supabase_dep)) -> ContactService:
    return ContactService(client)


def require_admin(authorization: Annotated[str | None, Header()] = None) -> Client:
    return client_for_admin(authorization)


def admin_product_service_dep(client: Client = Depends(require_admin)) -> AdminProductService:
    return AdminProductService(client)


def admin_order_service_dep(client: Client = Depends(require_admin)) -> AdminOrderService:
    return AdminOrderService(client)
