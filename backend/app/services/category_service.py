from supabase import Client

from app.schemas.category import Category
from app.services.errors import call_db


class CategoryService:
    def __init__(self, client: Client) -> None:
        self._client = client

    def list_categories(self) -> list[Category]:
        response = call_db(
            lambda: (
                self._client.table("categories")
                .select("id, name, slug, description")
                .order("name")
                .execute()
            )
        )
        return [Category.model_validate(row) for row in (response.data or [])]
