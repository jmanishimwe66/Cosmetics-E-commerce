import { formatRwfAmount } from "../lib/price.ts"
import type { AdminProduct } from "./types.ts"

export function ProductPreview({ product }: { product: AdminProduct }) {
  return (
    <article className="border border-[var(--line)] bg-white">
      <div className="aspect-[4/4.2] overflow-hidden bg-[#eceae6]">
        {product.images[0] ? <img src={product.images[0]} alt="" /> : null}
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h2 className="font-serif text-2xl font-bold text-[#1a120f]">
          {product.title || "Untitled product"}
        </h2>
        <p className="text-sm text-[#3f2a22]">{product.subtitle || "Subtitle"}</p>
        <p className="text-sm font-bold">{formatRwfAmount(product.price)}</p>
      </div>
    </article>
  )
}
