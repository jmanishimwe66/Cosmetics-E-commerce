from typing import Any

import httpx
from supabase import Client, create_client

from app.config import get_settings
from app.core.exceptions import ForbiddenError, UnauthorizedError


def client_for_admin(authorization: str | None) -> Client:
    token = _bearer(authorization)
    user = _fetch_user(token)
    role = (user.get("app_metadata") or {}).get("role")
    if role != "admin":
        raise ForbiddenError()
    settings = get_settings()
    client = create_client(settings.supabase_url, settings.supabase_anon_key)
    client.postgrest.auth(token)
    return client


def _bearer(authorization: str | None) -> str:
    if not authorization:
        raise UnauthorizedError()
    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer" or not token.strip():
        raise UnauthorizedError()
    return token.strip()


def _fetch_user(token: str) -> dict[str, Any]:
    settings = get_settings()
    try:
        response = httpx.get(
            f"{settings.supabase_url.rstrip('/')}/auth/v1/user",
            headers={
                "Authorization": f"Bearer {token}",
                "apikey": settings.supabase_anon_key,
            },
            timeout=15,
        )
    except httpx.HTTPError as exc:
        raise UnauthorizedError() from exc
    if response.status_code != 200:
        raise UnauthorizedError()
    payload = response.json()
    if not isinstance(payload, dict):
        raise UnauthorizedError()
    return payload
