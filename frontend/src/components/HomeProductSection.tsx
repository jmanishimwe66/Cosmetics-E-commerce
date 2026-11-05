import { useCallback, useEffect, useState } from "react"

import { getProduct } from "../api/client.ts"
import type { Product } from "../api/types.ts"
import { FEATURED_PRODUCT_SLUGS } from "../lib/featuredProducts.ts"
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
        const results = await Promise.all(
          FEATURED_PRODUCT_SLUGS.map((slug) => getProduct(slug).catch(() => null)),
        )
        if (!active) return
        const ordered = results.filter((item): item is Product => item !== null)
        setProducts(ordered)
        setError(ordered.length === 0 ? "Featured products could not be loaded." : null)
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
      title="Signature Picks"
      products={products}
      limit={3}
      loading={loading}
      error={error}
      onRetry={retry}
    />
  )
}
