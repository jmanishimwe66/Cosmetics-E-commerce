import { useNavigate } from "react-router-dom"

import type { Product } from "../../api/types.ts"
import { formatSamplePrice } from "../../lib/price.ts"
import { PdpAccordion } from "./PdpAccordion.tsx"

type PdpPurchaseProps = {
  product: Product
  quantity: number
  notice: string | null
  onQuantityChange: (quantity: number) => void
  onAddToCart: () => void
}

export function PdpPurchase({
  product,
  quantity,
  notice,
  onQuantityChange,
  onAddToCart,
}: PdpPurchaseProps) {
  const navigate = useNavigate()
  const inStock = product.stock > 0
  const price = formatSamplePrice(product.price)
  const summary = product.subtitle?.trim() || product.description
  const ingredients =
    product.ingredients?.trim() ||
    "Coffee-derived actives, plant oils, and gentle surfactants chosen for daily use. Full INCI listing available on request for this demonstration formula."
  const useStorage =
    product.use_storage?.trim() ||
    "Apply to clean skin or hair as directed. Store away from direct heat and sunlight. Patch test before first use."

  function buyNow() {
    onAddToCart()
    navigate("/order")
  }

  return (
    <div className="bg-[#F4F2EC] px-6 py-10 sm:px-10 md:py-14 lg:px-14">
      <h1 className="font-serif text-4xl font-normal leading-tight tracking-tight text-[#1a120f] sm:text-[2.75rem]">
        {product.name}
      </h1>
      <p className="mt-4 font-serif text-lg font-bold text-[#1a120f]">{price}</p>

      {summary ? (
        <p className="mt-6 max-w-lg font-serif text-lg leading-relaxed text-[#3f2a22]/90">
          {summary}
        </p>
      ) : null}

      <div className="mt-8">
        <p className="font-serif text-xs font-bold tracking-[0.14em] text-[#1a120f]">
          Quantity
        </p>
        <div className="mt-3 inline-flex min-h-11 items-stretch border border-gray-400">
          <button
            type="button"
            className="min-w-11 px-3 text-lg"
            aria-label="Decrease quantity"
            disabled={!inStock}
            onClick={() => onQuantityChange(quantity - 1)}
          >
            −
          </button>
          <span className="flex min-w-12 items-center justify-center border-x border-gray-400 text-sm font-bold">
            {quantity}
          </span>
          <button
            type="button"
            className="min-w-11 px-3 text-lg"
            aria-label="Increase quantity"
            disabled={!inStock}
            onClick={() => onQuantityChange(quantity + 1)}
          >
            +
          </button>
        </div>
      </div>

      {inStock ? (
        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={onAddToCart}
            className="min-h-11 w-full border border-gray-400 bg-[#F4F2EC] text-[0.68rem] font-bold tracking-[0.18em] text-[#1a120f] transition-colors hover:bg-[#ebe8e0]"
          >
            ADD TO CART
          </button>
          <button
            type="button"
            onClick={buyNow}
            className="min-h-11 w-full bg-[#1a120f] text-[0.68rem] font-bold tracking-[0.18em] text-white transition-colors hover:bg-[#2f211c]"
          >
            BUY IT NOW
          </button>
        </div>
      ) : (
        <p className="mt-8 font-serif text-lg text-[#3f2a22]">This sample is out of stock.</p>
      )}

      {notice ? (
        <p className="mt-4 font-serif text-sm text-[#3f2a22]" role="status">
          {notice}
        </p>
      ) : null}

      <PdpAccordion
        items={[
          {
            id: "ingredients",
            title: "INGREDIENTS",
            body: ingredients,
          },
          {
            id: "use",
            title: "USE & STORAGE",
            body: useStorage,
          },
        ]}
      />
    </div>
  )
}
