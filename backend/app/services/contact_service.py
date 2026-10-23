from uuid import uuid4

from supabase import Client

from app.core.exceptions import AppError
from app.schemas.contact import ContactCreate, ContactCreated
from app.services.errors import call_db


class ContactService:
    def __init__(self, client: Client) -> None:
        self._client = client

    def create_inquiry(self, payload: ContactCreate) -> ContactCreated:
        inquiry_id = uuid4()
        response = call_db(
            lambda: (
                self._client.table("contact_inquiries")
                .insert(
                    {
                        "id": str(inquiry_id),
                        "name": payload.name.strip(),
                        "email": str(payload.email),
                        "subject": payload.subject.strip(),
                        "message": payload.message.strip(),
                    },
                    returning="minimal",
                )
                .execute()
            )
        )
        if response is None:
            raise AppError(502, "The database request failed")
        return ContactCreated(id=inquiry_id)
