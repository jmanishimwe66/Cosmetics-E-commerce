import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { ApiError, listCategories, listProducts } from "../api/client.ts"
import type { Category, Product } from "../api/types.ts"
import { ProductCard } from "../components/ProductCard.tsx"

export function ShopPage() {
  const [params, setParams] = useSearchParams()
  const category = params.get("category") ?? ""
  const query = params.get("q") ?? ""
  const [draft, setDraft] = useState(query)
  const [seenQuery, setSeenQuery] = useState(query)
  const [categories, setCategories] = useState<Category[]>([])
  const [catalog, setCatalog] = useState<{
    key: string
    products: Product[] | null
    error: string | null
  }>({ key: "", products: null, error: null })

  if (query !== seenQuery) {
    setSeenQuery(query)
    setDraft(query)
  }

  useEffect(() => {
    const handle = window.setTimeout(() => {
      const trimmed = draft.trim()
      if (trimmed === query) return
      setParams(
        (current) => {
          const next = new URLSearchParams(current)
          if (trimmed) next.set("q", trimmed)
          else next.delete("q")
          return next
        },
        { replace: true },
      )
    }, 250)
    return () => window.clearTimeout(handle)
  }, [draft, query, setParams])

  useEffect(() => {
    let active = true
    listCategories()
      .then((items) => {
        if (active) setCategories(items)
      })
      .catch(() => {
        if (active) setCategories([])
      })
    return () => {
      active = false
    }
  }, [])

  const catalogKey = `${category}\n${query}`

  useEffect(() => {
    let active = true
    listProducts({ q: query || undefined, category: category || undefined })
      .then((result) => {
        if (active) setCatalog({ key: catalogKey, products: result.items, error: null })
      })
      .catch((reason: unknown) => {
        if (!active) return
        setCatalog({
          key: catalogKey,
          products: null,
          error: reason instanceof ApiError ? reason.message : "The sample catalog could not be loaded.",
        })
      })
    return () => {
      active = false
    }
  }, [catalogKey, category, query])

  const ready = catalog.key === catalogKey
  const products = ready ? catalog.products : null
  const error = ready ? catalog.error : null

  function chooseCategory(slug: string) {
    const next = new URLSearchParams(params)
    if (slug) next.set("category", slug)
    else next.delete("category")
    setParams(next, { replace: true })
  }

  return (
    <section className="page-intro">
      <p className="eyebrow">Sample catalog</p>
      <h1>Shop</h1>
      <p className="lede">
        Demonstration catalog. These products are sample data, not the GRECE FOV range.
      </p>
      <div className="toolbar">
        <label className="meta" htmlFor="search">
          Search
          <input
            id="search"
            className="search"
            type="search"
            value={draft}
            placeholder="Search sample products"
            onChange={(event) => setDraft(event.target.value)}
          />
        </label>
      </div>
      <div className="filters" role="group" aria-label="Categories">
        <button type="button" aria-pressed={category === ""} onClick={() => chooseCategory("")}>
          All
        </button>
        {categories.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={category === item.slug}
            onClick={() => chooseCategory(item.slug)}
          >
            {item.name}
          </button>
        ))}
      </div>
      {error ? <p className="status error">{error}</p> : null}
      {!products && !error ? <p className="status">Loading sample products.</p> : null}
      {products && products.length === 0 ? <p>No sample products match.</p> : null}
      {products && products.length > 0 ? (
        <div className="grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : null}
    </section>
  )
}
