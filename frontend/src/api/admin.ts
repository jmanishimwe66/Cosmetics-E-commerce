import { apiRequest } from "./client.ts"
import type { AdminProductWrite, ApiAdminOrder, ApiOrderPatch, Product } from "./types.ts"

export function listAdminProducts(): Promise<Product[]> {
  return apiRequest<Product[]>("/api/v1/admin/products", undefined, true)
}

export function createAdminProduct(payload: AdminProductWrite): Promise<Product> {
  return apiRequest<Product>(
    "/api/v1/admin/products",
    { method: "POST", body: JSON.stringify(payload) },
    true,
  )
}

export function updateAdminProduct(id: string, payload: AdminProductWrite): Promise<Product> {
  return apiRequest<Product>(
    `/api/v1/admin/products/${encodeURIComponent(id)}`,
    { method: "PUT", body: JSON.stringify(payload) },
    true,
  )
}

export function deleteAdminProduct(id: string): Promise<void> {
  return apiRequest<void>(
    `/api/v1/admin/products/${encodeURIComponent(id)}`,
    { method: "DELETE" },
    true,
  )
}

export function listAdminOrders(): Promise<ApiAdminOrder[]> {
  return apiRequest<ApiAdminOrder[]>("/api/v1/admin/orders", undefined, true)
}

export function patchAdminOrder(id: string, payload: ApiOrderPatch): Promise<ApiAdminOrder> {
  return apiRequest<ApiAdminOrder>(
    `/api/v1/admin/orders/${encodeURIComponent(id)}`,
    { method: "PATCH", body: JSON.stringify(payload) },
    true,
  )
}
