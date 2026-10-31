import { useCallback, useEffect, useState } from "react"

import { listProducts } from "../api/client.ts"
import type { Product } from "../api/types.ts"
import { userErrorMessage } from "../lib/userError.ts"
import { ProductSection } from "./ProductSection.tsx"

export function HomeProductSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  const retry = useCallback(() => {
    setError(null)
    setReloadKey((key) => key + 1)
  }, [])

  useEffect(() => {
    let active = true
    async function load() {
      setLoading(true)
      try {
        const latest = await listProducts({ sort: "newest", limit: 3 })
        if (!active) return
        setProducts(latest.items)
        setError(null)
      } catch (reason: unknown) {
        if (!active) return
        setProducts([])
        setError(userErrorMessage(reason, "Featured products could not be loaded."))
      } finally {
        if (active) setLoading(false)
      }
    }
    void load()
    return () => {
      active = false
    }
  }, [reloadKey])

  return (
    <ProductSection
      title="Featured care"
      products={products}
      limit={3}
      loading={loading}
      error={error}
      onRetry={retry}
    />
  )
}
