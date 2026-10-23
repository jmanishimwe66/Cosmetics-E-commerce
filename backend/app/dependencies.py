from fastapi import Depends
from supabase import Client

from app.config import Settings, get_settings
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
