import type { Product } from "../api/types.ts"

/** Shown when the API is unreachable or returns an empty catalog (dev/demo). */
export const demoCatalogProducts: Product[] = [
  {
    id: "demo-rosewater-toner",
    category_id: "demo-skincare",
    category_slug: "skincare",
    category_name: "Skincare",
    name: "Rosewater Toner",
    slug: "rosewater-toner",
    description: "Cherry truffle, blueberry, kakao nibs",
    price: "18.00",
    image_url: null,
    stock: 40,
    is_featured: true,
  },
  {
    id: "demo-daily-moisturizer",
    category_id: "demo-skincare",
    category_slug: "skincare",
    category_name: "Skincare",
    name: "Daily Moisturizer",
    slug: "daily-moisturizer",
    description: "Cherry truffle, blueberry, kakao nibs",
    price: "24.50",
    image_url: null,
    stock: 25,
    is_featured: true,
  },
  {
    id: "demo-repair-shampoo",
    category_id: "demo-hair",
    category_slug: "hair",
    category_name: "Hair",
    name: "Repair Shampoo",
    slug: "repair-shampoo",
    description: "Cherry truffle, blueberry, kakao nibs",
    price: "19.00",
    image_url: null,
    stock: 18,
    is_featured: true,
  },
  {
    id: "demo-lipstick",
    category_id: "demo-makeup",
    category_slug: "makeup",
    category_name: "Makeup",
    name: "Soft Matte Lipstick",
    slug: "soft-matte-lipstick",
    description: "Comfortable matte finish for everyday wear",
    price: "16.00",
    image_url: null,
    stock: 30,
    is_featured: false,
  },
]

export function findDemoProduct(slug: string): Product | undefined {
  return demoCatalogProducts.find((product) => product.slug === slug)
}
