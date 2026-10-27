import { Link } from "react-router-dom"

import type { Product } from "../api/types.ts"
import { ProductCardFromCatalog } from "./ProductCard.tsx"

type ProductSectionProps = {
  title?: string
  products: Product[]
  shopAllHref?: string
  limit?: number
  loading?: boolean
  demoNotice?: string
}

export function ProductSection({
  title = "Unnecessarily Good Good(s)",
  products,
  shopAllHref = "/shop",
  limit = 3,
  loading = false,
  demoNotice,
}: ProductSectionProps) {
  const items = products.slice(0, limit)

  return (
    <section className="bg-[#F4F2EC] px-4 py-10 sm:px-6 md:py-14" aria-label={title}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h2 className="max-w-md font-serif text-3xl font-bold leading-tight tracking-tight text-[#1a120f] sm:text-4xl">
          {title}
        </h2>
        <Link
          to={shopAllHref}
          className="btn-font inline-flex min-h-11 items-center rounded-full bg-[#1a120f] px-6 py-2 text-sm text-white transition-all duration-200 ease-in-out hover:bg-[#2f211c] active:scale-[0.98]"
        >
          Shop All
        </Link>
      </div>
      {demoNotice ? (
        <p className="mb-6 font-serif text-sm text-[#3f2a22]/75">{demoNotice}</p>
      ) : null}
      {loading && items.length === 0 ? (
        <p className="font-serif text-lg text-[#3f2a22]/80">Loading collection…</p>
      ) : null}
      {!loading && items.length === 0 ? (
        <p className="font-serif text-lg text-[#3f2a22]/80">No products to show yet.</p>
      ) : null}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCardFromCatalog key={product.id} product={product} />
          ))}
        </div>
      ) : null}
    </section>
  )
}
