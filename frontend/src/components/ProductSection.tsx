import { Link } from "react-router-dom"

import type { Product } from "../api/types.ts"
import { ProductCardFromCatalog } from "./ProductCard.tsx"
import { UserAlert } from "./UserAlert.tsx"

type ProductSectionProps = {
  title?: string
  products: Product[]
  shopAllHref?: string
  limit?: number
  loading?: boolean
  error?: string | null
  onRetry?: () => void
  className?: string
}

export function ProductSection({
  title = "Unnecessarily Good Good(s)",
  products,
  shopAllHref = "/shop",
  limit = 3,
  loading = false,
  error = null,
  onRetry,
  className = "",
}: ProductSectionProps) {
  const items = products.slice(0, limit)

  return (
    <section
      className={`home-products bg-[#F4F2EC] px-4 py-10 sm:px-6 md:py-14 ${className}`.trim()}
      aria-label={title}
    >
      <div className="home-products-head mb-8">
        <h2 className="max-w-md font-serif text-3xl font-bold leading-tight tracking-tight text-[#1a120f] sm:text-4xl">
          {title}
        </h2>
      </div>
      {error ? <UserAlert onRetry={onRetry}>{error}</UserAlert> : null}
      {loading && items.length === 0 && !error ? (
        <p className="font-serif text-lg text-[#3f2a22]/80">Loading collection…</p>
      ) : null}
      {!loading && items.length === 0 && !error ? (
        <p className="font-serif text-lg text-[#3f2a22]/80">No products to show yet.</p>
      ) : null}
      {items.length > 0 ? (
        <>
          <div className="product-card-grid">
            {items.map((product) => (
              <ProductCardFromCatalog key={product.id} product={product} />
            ))}
          </div>
          <div className="home-products-foot mt-6 flex justify-center sm:mt-8">
            <Link
              to={shopAllHref}
              className="btn-font inline-flex max-w-[min(100%,11.5rem)] items-center justify-center bg-[#1a120f] px-5 py-2 text-xs text-white no-underline transition-all duration-200 ease-in-out hover:bg-[#2f211c] hover:no-underline active:scale-[0.98] sm:max-w-none sm:min-h-11 sm:px-6 sm:py-2 sm:text-sm"
            >
              Shop All
            </Link>
          </div>
        </>
      ) : null}
    </section>
  )
}
