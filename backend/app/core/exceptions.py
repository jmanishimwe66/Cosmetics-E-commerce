"""Domain errors mapped to HTTP responses by the API layer."""


class AppError(Exception):
    def __init__(self, status_code: int, detail: str) -> None:
        self.status_code = status_code
        self.detail = detail
        super().__init__(detail)


class NotFoundError(AppError):
    def __init__(self, detail: str = "Not found") -> None:
        super().__init__(404, detail)


class ConflictError(AppError):
    def __init__(self, detail: str) -> None:
        super().__init__(409, detail)


class BadRequestError(AppError):
    def __init__(self, detail: str) -> None:
        super().__init__(400, detail)


class UnauthorizedError(AppError):
    def __init__(self, detail: str = "Sign in required") -> None:
        super().__init__(401, detail)


class ForbiddenError(AppError):
    def __init__(self, detail: str = "Admin access required") -> None:
        super().__init__(403, detail)
