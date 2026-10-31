import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { ApiError } from "../api/client.ts"
import { useAdminProducts } from "../api/hooks.ts"
import { stockStatus } from "../api/mappers.ts"
import { blankProduct } from "./blankProduct.ts"
import { GalleryField } from "./GalleryField.tsx"
import { ProductPreview } from "./ProductPreview.tsx"
import { PRODUCT_CATEGORIES, type AdminProduct } from "./types.ts"

const fieldClass = "min-h-11 w-full border border-[var(--line)] bg-white px-3 text-sm"

export function AdminProductFormPage() {
  const { id } = useParams()
  const { products, loading, error, createProduct, updateProduct } = useAdminProducts()
  const [created] = useState(blankProduct)
  const existing = id ? products.find((item) => item.id === id) : undefined
  if (loading) {
    return <p className="text-sm text-[#3f2a22]">Loading products.</p>
  }
  if (error && products.length === 0) {
    return (
      <p className="text-sm text-[#3f2a22]" role="alert">
        {error}
      </p>
    )
  }
  if (id && !existing) {
    return (
      <div>
        <h1 className="font-serif text-3xl font-bold">Product not found</h1>
        <Link to="/admin/products" className="mt-4 inline-flex text-sm underline">
          Back to products
        </Link>
      </div>
    )
  }

  return (
    <ProductEditor
      key={existing?.id ?? created.id}
      initial={existing ?? created}
      onSave={async (product) => {
        if (id) await updateProduct(product)
        else await createProduct(product)
      }}
    />
  )
}

function ProductEditor({
  initial,
  onSave,
}: {
  initial: AdminProduct
  onSave: (product: AdminProduct) => Promise<void>
}) {
  const navigate = useNavigate()
  const [draft, setDraft] = useState(initial)
  const [preview, setPreview] = useState(false)
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  function set<K extends keyof AdminProduct>(key: K, value: AdminProduct[K]) {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  async function submit() {
    if (!draft.title.trim() || !draft.sku.trim()) {
      setError("Title and SKU are required.")
      return
    }
    if (!Number.isFinite(draft.price) || draft.price < 0 || draft.stock < 0) {
      setError("Price and stock must be zero or greater.")
      return
    }
    if (draft.images.some((src) => !src.startsWith("http://") && !src.startsWith("https://"))) {
      setError("Images must be uploaded or added as http URLs.")
      return
    }
    setError("")
    setSaving(true)
    try {
      await onSave({ ...draft, title: draft.title.trim(), sku: draft.sku.trim(), status: stockStatus(draft.stock) })
      navigate("/admin/products")
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "The product could not be saved.")
    } finally {
      setSaving(false)
    }
  }

  const knownCategory = (PRODUCT_CATEGORIES as readonly string[]).includes(draft.category)
  const categories = knownCategory ? PRODUCT_CATEGORIES : [draft.category, ...PRODUCT_CATEGORIES]

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-serif text-3xl font-bold text-[#1a120f]">
            {initial.title ? "Edit product" : "New product"}
          </h1>
          <button
            type="button"
            className="min-h-11 border border-[#1a120f] px-4 text-xs font-bold tracking-[0.12em] uppercase"
            aria-pressed={preview}
            onClick={() => setPreview((open) => !open)}
          >
            {preview ? "Hide preview" : "Show preview"}
          </button>
        </div>
        <section className="flex flex-col gap-3 border border-[var(--line)] bg-white p-4">
          <h2 className="text-xs font-bold tracking-[0.14em] uppercase">Basic info</h2>
          <label className="flex flex-col gap-1 text-sm">
            Title
            <input className={fieldClass} value={draft.title} onChange={(event) => set("title", event.target.value)} />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Price (RWF)
            <input
              className={fieldClass}
              type="number"
              min={0}
              step={1}
              value={draft.price}
              onChange={(event) => set("price", Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Subtitle / fragrance notes
            <input
              className={fieldClass}
              value={draft.subtitle}
              onChange={(event) => set("subtitle", event.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Category
            <select className={fieldClass} value={draft.category} onChange={(event) => set("category", event.target.value)}>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </section>
        <section className="grid grid-cols-1 gap-3 border border-[var(--line)] bg-white p-4 sm:grid-cols-3">
          <h2 className="text-xs font-bold tracking-[0.14em] uppercase sm:col-span-3">Stock</h2>
          <label className="flex flex-col gap-1 text-sm">
            SKU
            <input className={fieldClass} value={draft.sku} onChange={(event) => set("sku", event.target.value)} />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Quantity
            <input
              className={fieldClass}
              type="number"
              min={0}
              step={1}
              value={draft.stock}
              onChange={(event) => set("stock", Number(event.target.value))}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Status
            <select className={fieldClass} value={stockStatus(draft.stock)} disabled>
              <option value="in_stock">In stock</option>
              <option value="low_stock">Low stock</option>
              <option value="out_of_stock">Out of stock</option>
            </select>
          </label>
        </section>
        <section className="border border-[var(--line)] bg-[#f8f4ef] p-4">
          <h2 className="mb-3 text-xs font-bold tracking-[0.14em] uppercase">Gallery</h2>
          <GalleryField images={draft.images} onChange={(images) => set("images", images)} />
        </section>
        <section className="flex flex-col gap-3 border border-[var(--line)] bg-white p-4">
          <h2 className="text-xs font-bold tracking-[0.14em] uppercase">Accordion content</h2>
          <label className="flex flex-col gap-1 text-sm">
            Ingredients
            <textarea
              className="min-h-28 w-full border border-[var(--line)] bg-white px-3 py-2 text-sm"
              value={draft.ingredients}
              onChange={(event) => set("ingredients", event.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Use and storage
            <textarea
              className="min-h-28 w-full border border-[var(--line)] bg-white px-3 py-2 text-sm"
              value={draft.useStorage}
              onChange={(event) => set("useStorage", event.target.value)}
            />
          </label>
        </section>
        <section className="flex flex-col gap-3 border border-[var(--line)] bg-white p-4">
          <h2 className="text-xs font-bold tracking-[0.14em] uppercase">Editorial</h2>
          <label className="flex flex-col gap-1 text-sm">
            Reminds us of
            <textarea
              className="min-h-24 w-full border border-[var(--line)] bg-white px-3 py-2 text-sm"
              value={draft.remindsUsOf}
              onChange={(event) => set("remindsUsOf", event.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Sustainability note
            <textarea
              className="min-h-24 w-full border border-[var(--line)] bg-white px-3 py-2 text-sm"
              value={draft.sustainabilityNote}
              onChange={(event) => set("sustainabilityNote", event.target.value)}
            />
          </label>
        </section>
        {error ? <p className="text-sm text-[#3f2a22]">{error}</p> : null}
        <div className="flex gap-3">
          <button
            type="button"
            className="min-h-11 bg-[#1a120f] px-5 text-xs font-bold tracking-[0.12em] text-white uppercase"
            disabled={saving}
            onClick={() => void submit()}
          >
            Save product
          </button>
          <Link to="/admin/products" className="inline-flex min-h-11 items-center px-3 text-sm underline">
            Cancel
          </Link>
        </div>
      </div>
      {preview ? <ProductPreview product={draft} /> : null}
    </div>
  )
}
