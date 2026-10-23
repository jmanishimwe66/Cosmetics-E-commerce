from fastapi import APIRouter, Depends, Query

from app.dependencies import product_service_dep
from app.schemas.product import Product, ProductList
from app.services.product_service import ProductService

router = APIRouter(prefix="/products", tags=["products"])


@router.get("", response_model=ProductList)
def list_products(
    q: str | None = Query(default=None, max_length=120),
    category_slug: str | None = Query(default=None, max_length=80),
    featured: bool | None = None,
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    service: ProductService = Depends(product_service_dep),
) -> ProductList:
    return service.list_products(
        q=q,
        category_slug=category_slug,
        featured=featured,
        limit=limit,
        offset=offset,
    )


@router.get("/{slug}", response_model=Product)
def get_product(slug: str, service: ProductService = Depends(product_service_dep)) -> Product:
    return service.get_by_slug(slug)
