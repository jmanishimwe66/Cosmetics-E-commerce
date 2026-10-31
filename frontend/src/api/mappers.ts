import type { AdminOrder, AdminProduct, StockStatus } from "../admin/types.ts"
import type { AdminProductWrite, ApiAdminOrder, ApiOrderPatch, Product } from "./types.ts"

export type OrderStatusPatch = Partial<
  Pick<AdminOrder, "paymentStatus" | "fulfillmentStatus" | "trackingNumber">
>

export function stockStatus(stock: number): StockStatus {
  if (stock <= 0) return "out_of_stock"
  if (stock <= 10) return "low_stock"
  return "in_stock"
}

export function catalogPriceToRwf(price: string | number): number {
  const major = typeof price === "number" ? price : Number(price)
  if (!Number.isFinite(major)) return 0
  return Math.round(major * 1000)
}

export function rwfToCatalogPrice(rwf: number): string {
  if (!Number.isFinite(rwf) || rwf < 0) return "0.00"
  return (Math.round(rwf) / 1000).toFixed(2)
}

export function toAdminProduct(product: Product): AdminProduct {
  const images = product.images?.length
    ? product.images
    : product.image_url
      ? [product.image_url]
      : []
  return {
    id: product.id,
    title: product.name,
    price: catalogPriceToRwf(product.price),
    subtitle: product.subtitle ?? "",
    category: product.category_name ?? "Skincare",
    sku: product.sku ?? "",
    stock: product.stock,
    status: stockStatus(product.stock),
    images,
    ingredients: product.ingredients ?? "",
    useStorage: product.use_storage ?? "",
    remindsUsOf: product.reminds_us_of ?? "",
    sustainabilityNote: product.sustainability_note ?? "",
  }
}

export function toProductWrite(product: AdminProduct): AdminProductWrite {
  return {
    name: product.title.trim(),
    subtitle: emptyToNull(product.subtitle),
    category_slug: categorySlug(product.category),
    sku: emptyToNull(product.sku),
    price: rwfToCatalogPrice(product.price),
    stock: product.stock,
    ingredients: emptyToNull(product.ingredients),
    use_storage: emptyToNull(product.useStorage),
    reminds_us_of: emptyToNull(product.remindsUsOf),
    sustainability_note: emptyToNull(product.sustainabilityNote),
    images: product.images,
  }
}

export function toAdminOrder(order: ApiAdminOrder): AdminOrder {
  return {
    id: order.id,
    customerName: order.customer_name,
    email: order.email,
    phone: order.phone ?? "",
    address: order.shipping_address,
    createdAt: order.created_at,
    items: order.items.map((item) => ({
      title: item.name,
      quantity: item.quantity,
      unitPrice: catalogPriceToRwf(item.unit_price),
      imageUrl: item.image_url ?? "",
    })),
    paymentStatus: order.payment_status,
    fulfillmentStatus: order.fulfillment_status,
    trackingNumber: order.tracking_number,
  }
}

export function toOrderPatch(patch: OrderStatusPatch): ApiOrderPatch {
  return {
    ...(patch.paymentStatus ? { payment_status: patch.paymentStatus } : {}),
    ...(patch.fulfillmentStatus ? { fulfillment_status: patch.fulfillmentStatus } : {}),
    ...(patch.trackingNumber !== undefined ? { tracking_number: patch.trackingNumber } : {}),
  }
}

function emptyToNull(value: string): string | null {
  const text = value.trim()
  return text.length > 0 ? text : null
}

function categorySlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}
