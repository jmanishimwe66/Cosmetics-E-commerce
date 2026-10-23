from uuid import UUID

from pydantic import BaseModel, Field


class Category(BaseModel):
    id: UUID
    name: str
    slug: str
    description: str | None = None
