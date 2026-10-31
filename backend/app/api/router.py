from fastapi import APIRouter

from app.api.v1 import admin_orders, admin_products, categories, contact, orders, products

api_router = APIRouter()
api_router.include_router(categories.router)
api_router.include_router(products.router)
api_router.include_router(orders.router)
api_router.include_router(contact.router)
api_router.include_router(admin_products.router)
api_router.include_router(admin_orders.router)
