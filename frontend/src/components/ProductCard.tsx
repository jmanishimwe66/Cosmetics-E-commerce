import { Link } from "react-router-dom"
import type { Product } from "../api/types.ts"
import { productCodes, samplePhotos } from "../lib/photos.ts"
import { formatSamplePrice } from "../lib/price.ts"

export function ProductCard({ product }: { product: Product }) {
  const code = productCodes[product.slug] ?? "GF-00"

  return (
    <Link className="card" to={`/shop/${product.slug}`}>
      <div className="card-media-wrap">
        {product.is_featured ? <span className="pill-tag">Featured</span> : null}
        <ProductMedia product={product} />
      </div>
      <div className="card-body">
        {product.category_name ? <p className="meta">{product.category_name}</p> : null}
        <div className="code-title-row">
          <span className="code-pill">{code}</span>
          <h3>{product.name}</h3>
        </div>
        {product.description ? <p className="card-desc">{product.description}</p> : null}
        <div className="card-foot">
          <p className="card-price">
            <span className="price-label">Sample price </span>
            {formatSamplePrice(product.price)}
          </p>
          <span className="pill-btn dark small">View</span>
        </div>
      </div>
    </Link>
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
