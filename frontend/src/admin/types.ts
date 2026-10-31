export type StockStatus = "in_stock" | "low_stock" | "out_of_stock"

export type PaymentStatus = "paid" | "pending" | "failed"

export type FulfillmentStatus = "unfulfilled" | "processing" | "shipped" | "delivered"

export type AdminProduct = {
  id: string
  title: string
  price: number
  subtitle: string
  category: string
  sku: string
  stock: number
  status: StockStatus
  images: string[]
  ingredients: string
  useStorage: string
  remindsUsOf: string
  sustainabilityNote: string
}

export type AdminOrderItem = {
  title: string
  quantity: number
  unitPrice: number
  imageUrl: string
}

export type AdminOrder = {
  id: string
  customerName: string
  email: string
  phone: string
  address: string
  createdAt: string
  items: AdminOrderItem[]
  paymentStatus: PaymentStatus
  fulfillmentStatus: FulfillmentStatus
  trackingNumber: string
}

export type AdminState = {
  products: AdminProduct[]
  orders: AdminOrder[]
}

export const PRODUCT_CATEGORIES = ["Skincare", "Hair", "Makeup", "Body"] as const
