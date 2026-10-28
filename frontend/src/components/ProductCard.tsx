import { type MouseEvent } from "react"
import { Link } from "react-router-dom"

import type { Product } from "../api/types.ts"
import { useCart } from "../cart/context.ts"
import { samplePhotos } from "../lib/photos.ts"
import { formatSamplePrice } from "../lib/price.ts"

export type ProductCardProps = {
  title: string
  price: string
  imageUrl: string
  slug: string
  productId: string
  unitPrice: string | number
  stock: number
}

const COFFEE_BTN =
  "btn-font inline-flex min-h-10 shrink-0 items-center justify-center bg-[#3f2a22] px-4 py-2 text-xs font-bold tracking-wide text-white transition-all duration-200 ease-in-out hover:bg-[#2a1c17] active:scale-[0.98]"

const COFFEE_BTN_ADDED =
  "btn-font inline-flex min-h-10 shrink-0 cursor-default items-center justify-center bg-[#a89888] px-4 py-2 text-xs font-bold tracking-wide text-white"

export function ProductCard({
  title,
  price,
  imageUrl,
  slug,
  productId,
  unitPrice,
  stock,
}: ProductCardProps) {
  const { addItem, lines } = useCart()
  const inCart = lines.some((line) => line.productId === productId)

  function onAddToCart(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()
    if (inCart) return
    addItem({
      productId,
      slug,
      name: title,
      unitPrice: String(unitPrice),
      quantity: 1,
      stock,
    })
  }

  return (
    <article className="overflow-hidden bg-white shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md">
      <Link to={`/shop/${slug}`} className="group block text-[#1a120f] no-underline">
        <div className="relative aspect-[4/4.2] overflow-hidden bg-[#eceae6]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#eceae6] px-4 text-center font-serif text-lg text-[#3f2a22]/70">
              {title}
            </div>
          )}
        </div>
        <div className="px-4 pt-4 sm:px-5">
          <h3 className="font-serif text-xl font-semibold leading-tight text-[#1a120f]">{title}</h3>
        </div>
      </Link>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-3 px-4 pb-5 sm:px-5">
        <p className="font-serif text-lg font-semibold text-[#1a120f] sm:text-xl">{price}</p>
        <button
          type="button"
          className={inCart ? COFFEE_BTN_ADDED : COFFEE_BTN}
          onClick={onAddToCart}
          disabled={inCart}
          aria-pressed={inCart}
        >
          {inCart ? "Added to cart" : "Add to cart"}
        </button>
      </div>
    </article>
  )
}

export function ProductCardFromCatalog({ product }: { product: Product }) {
  const imageUrl = product.image_url || samplePhotos[product.slug] || ""
  return (
    <ProductCard
      title={product.name}
      price={formatSamplePrice(product.price)}
      imageUrl={imageUrl}
      slug={product.slug}
      productId={product.id}
      unitPrice={product.price}
      stock={product.stock}
    />
  )
}

export function ProductMedia({ product }: { product: Product }) {
  const src = product.image_url || samplePhotos[product.slug]
  if (src) {
    return <img className="media" src={src} alt={product.name} loading="lazy" />
  }
  return (
    <div className="swatch" aria-hidden="true">
      <span>{product.name}</span>
    </div>
  )
}
