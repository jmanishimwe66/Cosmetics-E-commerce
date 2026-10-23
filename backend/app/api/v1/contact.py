from fastapi import APIRouter, Depends

from app.dependencies import contact_service_dep
from app.schemas.contact import ContactCreate, ContactCreated
from app.services.contact_service import ContactService

router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("", response_model=ContactCreated, status_code=201)
def create_contact(
    payload: ContactCreate,
    service: ContactService = Depends(contact_service_dep),
) -> ContactCreated:
    return service.create_inquiry(payload)
