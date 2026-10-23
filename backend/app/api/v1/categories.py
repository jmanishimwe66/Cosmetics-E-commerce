from fastapi import APIRouter, Depends

from app.dependencies import category_service_dep
from app.schemas.category import Category
from app.services.category_service import CategoryService

router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("", response_model=list[Category])
def list_categories(service: CategoryService = Depends(category_service_dep)) -> list[Category]:
    return service.list_categories()
