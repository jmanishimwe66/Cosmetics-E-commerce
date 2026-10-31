import { useCallback, useEffect, useState } from "react"
import { listProducts } from "../api/client.ts"
import type { Product } from "../api/types.ts"
import { ProductCardFromCatalog } from "../components/ProductCard.tsx"
import { UserAlert } from "../components/UserAlert.tsx"
import { userErrorMessage } from "../lib/userError.ts"
import { lineupPhoto } from "../lib/photos.ts"

export function ShopPage() {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  const retry = useCallback(() => {
    setError(null)
    setProducts(null)
    setReloadKey((key) => key + 1)
  }, [])

  useEffect(() => {
    let active = true
    listProducts({})
      .then((result) => {
        if (!active) return
        setProducts(result.items)
        setError(null)
      })
      .catch((reason: unknown) => {
        if (!active) return
        setProducts([])
        setError(userErrorMessage(reason, "The collection could not be loaded."))
      })
    return () => {
      active = false
    }
  }, [reloadKey])

  return (
    <div className="shop-page">
      <section className="hero-banner shop-hero" aria-label="Shop introduction">
        <img className="hero-banner-img" src={lineupPhoto.src} alt={lineupPhoto.alt} />
        <div className="hero-banner-scrim" />
        <div className="hero-banner-copy">
          <h1>
            Shop the
            <br />
            Collection
          </h1>
          <p>
            Coffee-born formulas for skin care—upcycled ingredients, eco-conscious packaging, and
            sustainable luxury in every routine.
          </p>
        </div>
      </section>

      <section className="shop-catalog bg-[#F4F2EC] px-4 py-10 sm:px-6 md:py-14" aria-label="All products">
        {error ? <UserAlert onRetry={retry}>{error}</UserAlert> : null}
        {products === null ? (
          <p className="font-serif text-lg text-[#3f2a22]/80">Loading collection…</p>
        ) : products.length === 0 && !error ? (
          <p className="font-serif text-lg text-[#3f2a22]/80">No products to show yet.</p>
        ) : products.length > 0 ? (
          <div className="product-card-grid">
            {products.map((product) => (
              <ProductCardFromCatalog key={product.id} product={product} />
            ))}
          </div>
        ) : null}
      </section>
    </div>
  )
}
