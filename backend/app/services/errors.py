from collections.abc import Callable
from typing import Any

from postgrest.exceptions import APIError

from app.core.exceptions import AppError, BadRequestError, ConflictError, NotFoundError


def raise_for_db_error(exc: APIError) -> None:
    message = _error_text(exc)
    if "PRODUCT_NOT_FOUND" in message:
        raise NotFoundError("One or more products are unavailable") from exc
    if "INSUFFICIENT_STOCK" in message:
        raise ConflictError("Not enough stock for one or more products") from exc
    if "ORDER_EMPTY" in message or "INVALID_" in message or "DUPLICATE_PRODUCT" in message:
        raise BadRequestError("The order could not be accepted") from exc
    raise AppError(502, "The database request failed") from exc


def call_db(action: Callable[[], Any]) -> Any:
    try:
        return action()
    except APIError as exc:
        raise_for_db_error(exc)


def _error_text(exc: APIError) -> str:
    parts = [str(exc)]
    for attr in ("message", "details", "hint", "code"):
        value = getattr(exc, attr, None)
        if value:
            parts.append(str(value))
    payload = getattr(exc, "json", None)
    if isinstance(payload, dict):
        parts.extend(str(item) for item in payload.values())
    return " ".join(parts)
