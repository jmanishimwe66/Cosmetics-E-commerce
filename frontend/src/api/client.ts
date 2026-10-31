import type {
  Category,
  ContactCreated,
  ContactRequest,
  OrderCreated,
  OrderRequest,
  Product,
  ProductList,
} from "./types.ts"

/** In dev, use same-origin `/api` (Vite proxy). Ignores localhost:8000 in .env so LAN dev works. */
function apiBaseUrl(): string {
  const fromEnv = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "")
  if (import.meta.env.DEV) {
    if (
      !fromEnv ||
      fromEnv === "http://localhost:8000" ||
      fromEnv === "http://127.0.0.1:8000"
    ) {
      return ""
    }
    return fromEnv
  }
  return fromEnv || "http://localhost:8000"
}

const API_URL = apiBaseUrl()

type TokenProvider = () => Promise<string | null>

let accessTokenProvider: TokenProvider = async () => null

export function setAccessTokenProvider(provider: TokenProvider): void {
  accessTokenProvider = provider
}

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

export function listCategories(): Promise<Category[]> {
  return apiRequest<Category[]>("/api/v1/categories")
}

export function listProducts(params: {
  q?: string
  category?: string
  featured?: boolean
  inStock?: boolean
  sort?: "name" | "newest"
  limit?: number
}): Promise<ProductList> {
  const search = new URLSearchParams()
  if (params.q) search.set("q", params.q)
  if (params.category) search.set("category_slug", params.category)
  if (params.featured !== undefined) search.set("featured", String(params.featured))
  if (params.inStock) search.set("in_stock", "true")
  if (params.sort) search.set("sort", params.sort)
  if (params.limit !== undefined) search.set("limit", String(params.limit))
  const query = search.toString()
  return apiRequest<ProductList>(`/api/v1/products${query ? `?${query}` : ""}`)
}

export function getProduct(slug: string): Promise<Product> {
  return apiRequest<Product>(`/api/v1/products/${encodeURIComponent(slug)}`)
}

export function createOrder(payload: OrderRequest): Promise<OrderCreated> {
  return apiRequest<OrderCreated>("/api/v1/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function createContact(payload: ContactRequest): Promise<ContactCreated> {
  return apiRequest<ContactCreated>("/api/v1/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export async function apiRequest<T>(path: string, init?: RequestInit, auth = false): Promise<T> {
  const token = auth ? await accessTokenProvider() : null
  if (auth && !token) throw new ApiError(401, "Sign in again to continue.")

  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(init?.body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...init?.headers,
      },
    })
  } catch {
    throw new ApiError(0, "We could not reach the store. Check your connection and try again.")
  }

  if (!response.ok) {
    throw new ApiError(response.status, await readError(response))
  }
  if (response.status === 204) return undefined as T
  return (await response.json()) as T
}

async function readError(response: Response): Promise<string> {
  try {
    const body: unknown = await response.json()
    if (!body || typeof body !== "object") return fallback(response.status)
    const detail = (body as { detail?: unknown }).detail
    if (typeof detail === "string" && detail.trim()) return detail
    if (Array.isArray(detail)) {
      const first = detail[0]
      if (first && typeof first === "object" && "msg" in first && typeof first.msg === "string") {
        return first.msg
      }
    }
  } catch {
    return fallback(response.status)
  }
  return fallback(response.status)
}

function fallback(status: number): string {
  if (status === 401) return "Sign in again to continue."
  if (status === 403) return "Admin access required."
  if (status === 404) return "That item is no longer available."
  if (status === 409) return "Not enough stock for one or more items. Update your cart and try again."
  if (status === 422) return "Some details were invalid. Review the form and try again."
  if (status >= 500) return "Something went wrong on our side. Please try again in a moment."
  return "The request could not be completed. Please try again."
}
