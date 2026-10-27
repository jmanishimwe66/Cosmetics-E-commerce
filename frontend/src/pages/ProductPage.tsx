import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import { ApiError, getProduct, listProducts } from "../api/client.ts"
import type { Product } from "../api/types.ts"
import { useCart } from "../cart/context.ts"
import { PdpGallery } from "../components/product/PdpGallery.tsx"
import { PdpPurchase } from "../components/product/PdpPurchase.tsx"
import { PdpRecommendations } from "../components/product/PdpRecommendations.tsx"
import { demoCatalogProducts, findDemoProduct } from "../lib/demoCatalog.ts"
export function ProductPage() {
  const { slug = "" } = useParams()
  const { addItem } = useCart()
  const [snapshot, setSnapshot] = useState<{
    slug: string
    product: Product | null
    error: string | null
  }>({ slug: "", product: null, error: null })
  const [related, setRelated] = useState<Product[]>([])
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [notice, setNotice] = useState<string | null>(null)
  const [boundId, setBoundId] = useState("")

  useEffect(() => {
    let active = true
    getProduct(slug)
      .then((item) => {
        if (active) setSnapshot({ slug, product: item, error: null })
      })
      .catch((reason: unknown) => {
        if (!active) return
        const demo = findDemoProduct(slug)
        if (demo) {
          setSnapshot({ slug, product: demo, error: null })
          return
        }
        setSnapshot({
          slug,
          product: null,
          error: reason instanceof ApiError ? reason.message : "This product could not be loaded.",
        })
      })
    return () => {
      active = false
    }
  }, [slug])

  useEffect(() => {
    let active = true
    listProducts({})
      .then((result) => {
        if (!active) return
        setRelated(result.items.filter((item) => item.slug !== slug).slice(0, 4))
      })
      .catch(() => {
        if (!active) return
        setRelated(demoCatalogProducts.filter((item) => item.slug !== slug).slice(0, 4))
      })
    return () => {
      active = false
    }
  }, [slug])

  const ready = snapshot.slug === slug
  const product = ready ? snapshot.product : null
  const error = ready ? snapshot.error : null

  if (product && boundId !== product.id) {
    setBoundId(product.id)
    setActiveImage(0)
    setQuantity(1)
    setNotice(null)
  }

  const cap = product ? Math.min(99, Math.max(product.stock, 0)) : 1

  function changeQuantity(value: number) {
    if (!product || product.stock < 1 || !Number.isFinite(value)) return
    setQuantity(Math.min(cap, Math.max(1, Math.trunc(value))))
  }

  function onAddToCart() {
    if (!product || product.stock < 1) return
    const result = addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      unitPrice: String(product.price),
      quantity,
      stock: product.stock,
    })
    setNotice(
      result.limited
        ? `Added ${result.quantity}. Quantity limited to sample stock.`
        : "Added to cart.",
    )
  }

  return (
    <article className="bg-[#F4F2EC]">
      <div className="border-b border-gray-300 px-4 py-4 sm:px-6">
        <Link
          to="/shop"
          className="font-serif text-[0.65rem] font-bold tracking-[0.16em] text-[#1a120f] hover:opacity-70"
        >
          BACK TO SHOP
        </Link>
      </div>

      {error ? (
        <p className="status error px-6 py-10">{error}</p>
      ) : null}
      {!product && !error ? <p className="status px-6 py-10">Loading product.</p> : null}

      {product ? (
        <>
          <div className="grid grid-cols-1 border-b border-gray-300 md:grid-cols-2">
            <PdpGallery product={product} activeIndex={activeImage} onSelect={setActiveImage} />
            <PdpPurchase
              product={product}
              quantity={quantity}
              notice={notice}
              onQuantityChange={changeQuantity}
              onAddToCart={onAddToCart}
            />
          </div>

          <div className="grid grid-cols-1 border-b border-gray-300 md:grid-cols-2">
            <div className="border-b border-gray-300 px-6 py-10 md:border-b-0 md:border-r md:px-10 md:py-14">
              <h2 className="font-serif text-xs font-bold tracking-[0.16em] text-[#1a120f]">
                REMINDS US OF
              </h2>
              <p className="mt-5 font-serif text-lg leading-relaxed text-[#3f2a22]/90">
                Warm morning light, grounded botanicals, and the quiet confidence of a routine that
                feels intentional—coffee-born care with an editorial, unhurried mood.
              </p>
            </div>
            <div className="px-6 py-10 md:px-10 md:py-14">
              <h2 className="font-serif text-xs font-bold tracking-[0.16em] text-[#1a120f]">
                SUSTAINABILITY NOTE
              </h2>
              <p className="mt-5 font-serif text-lg leading-relaxed text-[#3f2a22]/90">
                Formulated with upcycled coffee residue and responsibly sourced inputs. This
                demonstration listing reflects GRECE FOV&apos;s intended premium, traceable
                production story.
              </p>
            </div>
          </div>

          <PdpRecommendations items={related} />
        </>
      ) : null}
    </article>
  )
}
