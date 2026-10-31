import type { AdminProduct } from "./types.ts"

export function blankProduct(): AdminProduct {
  return {
    id: "",
    title: "",
    price: 0,
    subtitle: "",
    category: "Skincare",
    sku: "",
    stock: 0,
    status: "in_stock",
    images: [],
    ingredients: "",
    useStorage: "",
    remindsUsOf: "",
    sustainabilityNote: "",
  }
}
