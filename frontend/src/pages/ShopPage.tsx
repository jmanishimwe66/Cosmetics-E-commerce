import { useEffect, useState } from "react"
import { listProducts } from "../api/client.ts"
import type { Product } from "../api/types.ts"
import { ProductCardFromCatalog } from "../components/ProductCard.tsx"
import { demoCatalogProducts } from "../lib/demoCatalog.ts"
import { lineupPhoto } from "../lib/photos.ts"

export function ShopPage() {
  const [products, setProducts] = useState<Product[] | null>(null)

  useEffect(() => {
    let active = true
    listProducts({})
      .then((result) => {
        if (!active) return
        setProducts(result.items.length > 0 ? result.items : demoCatalogProducts)
      })
      .catch(() => {
        if (!active) return
        setProducts(demoCatalogProducts)
      })
    return () => {
      active = false
    }
  }, [])

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
            Coffee-born formulas for skin and hair—considered ingredients, traceable origins, craft
            you can feel in every routine.
          </p>
        </div>
      </section>

      <section className="shop-catalog bg-[#F4F2EC] px-4 py-10 sm:px-6 md:py-14" aria-label="All products">
        {!products ? (
          <p className="font-serif text-lg text-[#3f2a22]/80">Loading collection…</p>
        ) : products.length === 0 ? (
          <p className="font-serif text-lg text-[#3f2a22]/80">No products to show yet.</p>
        ) : (
          <div className="product-card-grid">
            {products.map((product) => (
              <ProductCardFromCatalog key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
