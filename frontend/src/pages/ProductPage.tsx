import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ApiError, getProduct } from "../api/client.ts"
import type { Product } from "../api/types.ts"
import { useCart } from "../cart/context.ts"
import { ProductMedia } from "../components/ProductCard.tsx"
import { productCodes } from "../lib/photos.ts"
import { formatSamplePrice } from "../lib/price.ts"

export function ProductPage() {
  const { slug = "" } = useParams()
  const { addItem } = useCart()
  const [snapshot, setSnapshot] = useState<{
    slug: string
    product: Product | null
    error: string | null
  }>({ slug: "", product: null, error: null })
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

  const ready = snapshot.slug === slug
  const product = ready ? snapshot.product : null
  const error = ready ? snapshot.error : null

  if (product && boundId !== product.id) {
    setBoundId(product.id)
    setQuantity(1)
    setNotice(null)
  }

  const cap = product ? Math.min(99, Math.max(product.stock, 0)) : 1

  function changeQuantity(value: number) {
    if (!product || product.stock < 1 || !Number.isFinite(value)) return
    setQuantity(Math.min(cap, Math.max(1, Math.trunc(value))))
  }

  function onAdd() {
    if (!product || product.stock < 1) return
    const result = addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      unitPrice: formatSamplePrice(product.price),
      quantity,
      stock: product.stock,
    })
    setNotice(
      result.limited
        ? `Added ${result.quantity}. The quantity was limited to the sample stock.`
        : "Added to cart.",
    )
  }

  return (
    <section className="page-intro">
      <Link className="text-link" to="/shop">
        Back to shop
      </Link>
      {error ? <p className="status error">{error}</p> : null}
      {!product && !error ? <p className="status">Loading product.</p> : null}
      {product ? (
        <div className="product-layout">
          <ProductMedia product={product} />
          <div className="product-copy">
            {product.category_name ? <p className="meta">{product.category_name}</p> : null}
            <div className="code-title-row">
              <span className="code-pill">{productCodes[product.slug] ?? "GF-00"}</span>
              <h1>{product.name}</h1>
            </div>
            {product.description ? <p className="prose">{product.description}</p> : null}
            <p>
              <span className="price-label">Sample price </span>
              {formatSamplePrice(product.price)}
            </p>
            <p className="meta">Sample stock: {product.stock}</p>
            {product.stock > 0 ? (
              <>
                <div className="qty" aria-label="Quantity">
                  <button type="button" onClick={() => changeQuantity(quantity - 1)} aria-label="Decrease quantity">
                    −
                  </button>
                  <input
                    aria-label="Quantity"
                    inputMode="numeric"
                    value={quantity}
                    onChange={(event) => changeQuantity(Number(event.target.value))}
                  />
                  <button type="button" onClick={() => changeQuantity(quantity + 1)} aria-label="Increase quantity">
                    +
                  </button>
                </div>
                <div className="actions">
                  <button className="button" type="button" onClick={onAdd}>
                    Add to cart
                  </button>
                </div>
              </>
            ) : (
              <p>This sample is out of stock.</p>
            )}
            {notice ? (
              <p className="status" role="status">
                {notice} <Link to="/cart">View cart</Link>
              </p>
            ) : null}
            <p className="note">Adding a product does not take payment.</p>
          </div>
        </div>
      ) : null}
    </section>
  )
}
