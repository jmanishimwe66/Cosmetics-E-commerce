import { useEffect, useState } from "react"

import type { AdminOrder, AdminProduct } from "../admin/types.ts"
import {
  createAdminProduct,
  deleteAdminProduct,
  listAdminOrders,
  listAdminProducts,
  patchAdminOrder,
  updateAdminProduct,
} from "./admin.ts"
import { ApiError, listProducts } from "./client.ts"
import {
  toAdminOrder,
  toAdminProduct,
  toOrderPatch,
  toProductWrite,
  type OrderStatusPatch,
} from "./mappers.ts"
import type { ProductList } from "./types.ts"

function message(error: unknown): string {
  if (error instanceof ApiError) return error.message
  return "The request could not be completed."
}

export function useProducts(params: { q?: string; category?: string; featured?: boolean }) {
  const { q, category, featured } = params
  const [data, setData] = useState<ProductList | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true
    void listProducts({ q, category, featured })
      .then((result) => {
        if (!active) return
        setData(result)
        setError("")
        setLoading(false)
      })
      .catch((err: unknown) => {
        if (!active) return
        setError(message(err))
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [q, category, featured])

  return {
    data,
    loading,
    error,
    empty: !loading && !error && (data?.items.length ?? 0) === 0,
  }
}

export function useAdminProducts() {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true
    void listAdminProducts()
      .then((rows) => {
        if (!active) return
        setProducts(rows.map(toAdminProduct))
        setError("")
        setLoading(false)
      })
      .catch((err: unknown) => {
        if (!active) return
        setError(message(err))
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  async function createProduct(product: AdminProduct): Promise<AdminProduct> {
    const saved = toAdminProduct(await createAdminProduct(toProductWrite(product)))
    setProducts((current) => [saved, ...current])
    return saved
  }

  async function updateProduct(product: AdminProduct): Promise<AdminProduct> {
    const saved = toAdminProduct(await updateAdminProduct(product.id, toProductWrite(product)))
    setProducts((current) => current.map((item) => (item.id === saved.id ? saved : item)))
    return saved
  }

  async function removeProduct(id: string): Promise<void> {
    try {
      await deleteAdminProduct(id)
      setProducts((current) => current.filter((item) => item.id !== id))
    } catch (err) {
      setError(message(err))
    }
  }

  async function duplicateProduct(id: string): Promise<void> {
    const source = products.find((item) => item.id === id)
    if (!source) return
    try {
      await createProduct({
        ...source,
        title: `${source.title} copy`,
        sku: source.sku ? `${source.sku}-COPY` : source.sku,
      })
    } catch (err) {
      setError(message(err))
    }
  }

  return {
    products,
    loading,
    error,
    empty: !loading && !error && products.length === 0,
    createProduct,
    updateProduct,
    removeProduct,
    duplicateProduct,
  }
}

export function useUpdateOrderStatus() {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  async function updateOrder(id: string, patch: OrderStatusPatch): Promise<AdminOrder | null> {
    setSaving(true)
    setError("")
    try {
      return toAdminOrder(await patchAdminOrder(id, toOrderPatch(patch)))
    } catch (err) {
      setError(message(err))
      return null
    } finally {
      setSaving(false)
    }
  }

  return { updateOrder, saving, error }
}

export function useAdminOrders() {
  const status = useUpdateOrderStatus()
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let active = true
    void listAdminOrders()
      .then((rows) => {
        if (!active) return
        setOrders(rows.map(toAdminOrder))
        setError("")
        setLoading(false)
      })
      .catch((err: unknown) => {
        if (!active) return
        setError(message(err))
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  async function updateOrder(id: string, patch: OrderStatusPatch) {
    const snapshot = orders
    setOrders(snapshot.map((order) => (order.id === id ? { ...order, ...patch } : order)))
    const saved = await status.updateOrder(id, patch)
    if (!saved) {
      setOrders(snapshot)
      return
    }
    setOrders((current) => current.map((order) => (order.id === id ? saved : order)))
  }

  return {
    orders,
    loading,
    error: error || status.error,
    empty: !loading && !(error || status.error) && orders.length === 0,
    updateOrder,
  }
}
