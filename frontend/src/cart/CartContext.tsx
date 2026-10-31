import { useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import type { CartContextValue, CartLine } from "./context.ts"
import { CartContext } from "./context.ts"

const STORAGE_KEY = "grece-fov-cart"

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readCart)

  useEffect(() => {
    writeCart(lines)
  }, [lines])

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY) return
      setLines(readCart())
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const value = useMemo<CartContextValue>(() => {
    return {
      lines,
      count: lines.reduce((total, line) => total + line.quantity, 0),
      addItem(item) {
        const cap = clampCap(item.stock)
        const existing = lines.find((line) => line.productId === item.productId)
        const requested = (existing?.quantity ?? 0) + item.quantity
        const nextQuantity = Math.min(cap, Math.max(0, requested))
        const limited = requested > nextQuantity
        if (nextQuantity < 1) return { quantity: 0, limited }
        const line: CartLine = {
          productId: item.productId,
          slug: item.slug,
          name: item.name,
          unitPrice: item.unitPrice,
          quantity: nextQuantity,
          stock: item.stock,
        }
        setLines((current) => {
          const already = current.some((entry) => entry.productId === item.productId)
          if (!already) return [...current, line]
          return current.map((entry) => (entry.productId === item.productId ? line : entry))
        })
        return { quantity: nextQuantity, limited }
      },
      setQuantity(productId, quantity) {
        if (!Number.isFinite(quantity)) return
        setLines((current) =>
          current.flatMap((line) => {
            if (line.productId !== productId) return [line]
            const cap = clampCap(line.stock)
            const next = Math.min(cap, Math.max(0, Math.trunc(quantity)))
            if (next < 1) return []
            return [{ ...line, quantity: next }]
          }),
        )
      },
      removeItem(productId) {
        setLines((current) => current.filter((line) => line.productId !== productId))
      },
      clear() {
        setLines([])
      },
    }
  }, [lines])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

function clampCap(stock: number): number {
  if (stock < 1) return 0
  return Math.min(99, stock)
}

function readCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isCartLine)
  } catch {
    return []
  }
}

function writeCart(lines: CartLine[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  } catch {
    /* the cart stays in memory when the browser refuses storage */
  }
}

function isCartLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false
  const line = value as Partial<CartLine>
  return (
    typeof line.productId === "string" &&
    typeof line.slug === "string" &&
    typeof line.name === "string" &&
    typeof line.unitPrice === "string" &&
    typeof line.quantity === "number" &&
    typeof line.stock === "number"
  )
}
