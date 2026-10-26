import type {
  Category,
  ContactCreated,
  ContactRequest,
  OrderCreated,
  OrderRequest,
  Product,
  ProductList,
} from "./types.ts"

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "")

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

export function listCategories(): Promise<Category[]> {
  return request<Category[]>("/api/v1/categories")
}

export function listProducts(params: {
  q?: string
  category?: string
  featured?: boolean
}): Promise<ProductList> {
  const search = new URLSearchParams()
  if (params.q) search.set("q", params.q)
  if (params.category) search.set("category_slug", params.category)
  if (params.featured !== undefined) search.set("featured", String(params.featured))
  const query = search.toString()
  return request<ProductList>(`/api/v1/products${query ? `?${query}` : ""}`)
}

export function getProduct(slug: string): Promise<Product> {
  return request<Product>(`/api/v1/products/${encodeURIComponent(slug)}`)
}

export function createOrder(payload: OrderRequest): Promise<OrderCreated> {
  return request<OrderCreated>("/api/v1/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function createContact(payload: ContactRequest): Promise<ContactCreated> {
  return request<ContactCreated>("/api/v1/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(init?.body ? { "Content-Type": "application/json" } : {}),
        ...init?.headers,
      },
    })
  } catch {
    throw new ApiError(0, "The store is unavailable right now. Check that the API is running.")
  }

  if (!response.ok) {
    throw new ApiError(response.status, await readError(response))
  }

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
  if (status === 404) return "Not found."
  if (status === 409) return "Not enough stock for one or more products."
  return "The request could not be completed."
}
