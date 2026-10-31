import { useMemo, useState } from "react"

import { IconCopy, IconPencil, IconPlus, IconSearch, IconTrash } from "./icons.tsx"
import { Link, useNavigate } from "react-router-dom"

import { useAdminProducts } from "../api/hooks.ts"
import { formatRwfAmount } from "../lib/price.ts"
import { StatusBadge } from "./StatusBadge.tsx"
import { PRODUCT_CATEGORIES, type StockStatus } from "./types.ts"

export function AdminProductsPage() {
  const { products, loading, error, removeProduct, duplicateProduct } = useAdminProducts()
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [status, setStatus] = useState<"all" | StockStatus>("all")

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesQuery =
        needle.length === 0 ||
        product.title.toLowerCase().includes(needle) ||
        product.sku.toLowerCase().includes(needle)
      const matchesCategory = category === "all" || product.category === category
      const matchesStatus = status === "all" || product.status === status
      return matchesQuery && matchesCategory && matchesStatus
    })
  }, [products, query, category, status])

  function onDelete(id: string, title: string) {
    if (window.confirm(`Delete ${title}?`)) void removeProduct(id)
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-serif text-3xl font-bold text-[#1a120f]">Products</h1>
        <Link
          to="/admin/products/new"
          className="btn-font inline-flex min-h-11 items-center gap-2 bg-[#1a120f] px-4 text-xs font-bold tracking-[0.12em] text-white uppercase"
        >
          <IconPlus className="h-4 w-4" />
          New product
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_auto_auto]">
        <label className="relative block">
          <span className="sr-only">Search products</span>
          <IconSearch className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-[#3f2a22]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title or SKU"
            className="w-full border border-[var(--line)] bg-white py-2.5 pr-3 pl-10 text-sm"
          />
        </label>
        <select
          aria-label="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="min-h-11 border border-[var(--line)] bg-white px-3 text-sm"
        >
          <option value="all">All categories</option>
          {PRODUCT_CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          aria-label="Stock status"
          value={status}
          onChange={(event) => setStatus(event.target.value as "all" | StockStatus)}
          className="min-h-11 border border-[var(--line)] bg-white px-3 text-sm"
        >
          <option value="all">All statuses</option>
          <option value="in_stock">In stock</option>
          <option value="low_stock">Low stock</option>
          <option value="out_of_stock">Out of stock</option>
        </select>
      </div>
      {error ? (
        <p className="text-sm text-[#3f2a22]" role="alert">
          {error}
        </p>
      ) : null}
      {loading ? (
        <p className="text-sm text-[#3f2a22]">Loading products.</p>
      ) : error ? null : rows.length === 0 ? (
        <p className="text-sm text-[#3f2a22]">No products match these filters.</p>
      ) : (
        <div className="overflow-x-auto border border-[var(--line)] bg-white">
          <table className="w-full min-w-[44rem] text-left text-sm">
            <thead className="border-b border-[var(--line)] text-[0.65rem] tracking-[0.12em] uppercase">
              <tr>
                <th className="px-3 py-3 font-bold">Product</th>
                <th className="px-3 py-3 font-bold">Price</th>
                <th className="px-3 py-3 font-bold">Stock</th>
                <th className="px-3 py-3 font-bold">Status</th>
                <th className="px-3 py-3 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((product) => (
                <tr key={product.id} className="border-b border-[var(--line)] last:border-b-0">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <span className="h-12 w-12 shrink-0 overflow-hidden bg-[#eceae6]">
                        {product.images[0] ? (
                          <img src={product.images[0]} alt="" />
                        ) : null}
                      </span>
                      <span>
                        <span className="block font-semibold">{product.title}</span>
                        <span className="text-xs text-[#3f2a22]">{product.sku}</span>
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3">{formatRwfAmount(product.price)}</td>
                  <td className="px-3 py-3">{product.stock}</td>
                  <td className="px-3 py-3">
                    <StatusBadge kind="stock" value={product.status} />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex gap-1">
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center"
                        aria-label={`Edit ${product.title}`}
                        onClick={() => navigate(`/admin/products/${product.id}`)}
                      >
                        <IconPencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center"
                        aria-label={`Duplicate ${product.title}`}
                        onClick={() => void duplicateProduct(product.id)}
                      >
                        <IconCopy className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center"
                        aria-label={`Delete ${product.title}`}
                        onClick={() => onDelete(product.id, product.title)}
                      >
                        <IconTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
