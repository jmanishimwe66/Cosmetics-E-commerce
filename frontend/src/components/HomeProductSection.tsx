import { useEffect, useState } from "react"

import { listProducts } from "../api/client.ts"
import type { Product } from "../api/types.ts"
import { demoCatalogProducts } from "../lib/demoCatalog.ts"
import { ProductSection } from "./ProductSection.tsx"

export function HomeProductSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let active = true
    async function load() {
      setLoading(true)
      try {
        const featured = await listProducts({ featured: true })
        if (!active) return
        let items = featured.items
        if (items.length === 0) {
          items = (await listProducts({})).items
        }
        if (items.length > 0) {
          setProducts(items)
          return
        }
      } catch {
        /* use demo catalog below */
      }
      if (!active) return
      setProducts(demoCatalogProducts)
      setLoading(false)
    }
    void load().finally(() => {
      if (active) setLoading(false)
    })
    return () => {
      active = false
    }
  }, [])

  return (
    <ProductSection
      products={products}
      limit={3}
      loading={loading}
    />
  )
}
