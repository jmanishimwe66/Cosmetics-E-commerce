import type { Product } from "../../api/types.ts"
import { ProductCardFromCatalog } from "../ProductCard.tsx"

export function PdpRecommendations({ items }: { items: Product[] }) {
  if (items.length === 0) return null

  return (
    <section
      className="border-t border-gray-300 bg-[#F4F2EC] px-4 py-10 sm:px-6 md:py-14"
      aria-label="You might also like"
    >
      <h2 className="mb-8 font-serif text-3xl font-normal text-[#1a120f] sm:text-4xl">
        You might also like
      </h2>
      <div className="product-card-grid">
        {items.map((item) => (
          <ProductCardFromCatalog key={item.id} product={item} />
        ))}
      </div>
    </section>
  )
}
