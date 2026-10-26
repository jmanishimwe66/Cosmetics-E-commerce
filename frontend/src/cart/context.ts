import { createContext, useContext } from "react"

export type CartLine = {
  productId: string
  slug: string
  name: string
  unitPrice: string
  quantity: number
  stock: number
}

export type AddInput = {
  productId: string
  slug: string
  name: string
  unitPrice: string
  quantity: number
  stock: number
}

export type CartContextValue = {
  lines: CartLine[]
  count: number
  addItem: (item: AddInput) => { quantity: number; limited: boolean }
  setQuantity: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  clear: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function useCart(): CartContextValue {
  const value = useContext(CartContext)
  if (!value) throw new Error("useCart must be used within CartProvider")
  return value
}
