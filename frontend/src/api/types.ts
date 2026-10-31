export type Category = {
  id: string
  name: string
  slug: string
  description: string | null
}

export type Product = {
  id: string
  category_id: string
  category_slug: string | null
  category_name: string | null
  name: string
  slug: string
  subtitle?: string | null
  description: string | null
  sku?: string | null
  ingredients?: string | null
  use_storage?: string | null
  reminds_us_of?: string | null
  sustainability_note?: string | null
  price: string | number
  image_url: string | null
  images?: string[]
  stock: number
  is_featured: boolean
  is_active?: boolean
}

export type ProductList = {
  items: Product[]
  total: number
  limit: number
  offset: number
}

export type OrderItemOut = {
  product_id: string
  name: string
  quantity: number
  unit_price: string | number
}

export type OrderCreated = {
  id: string
  status: string
  items: OrderItemOut[]
  subtotal: string | number
}

export type OrderItemIn = {
  product_id: string
  quantity: number
}

export type OrderRequest = {
  customer_name: string
  email: string
  phone?: string | null
  shipping_address: string
  notes?: string | null
  items: OrderItemIn[]
}

export type ContactRequest = {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactCreated = {
  id: string
}

export type AdminProductWrite = {
  name: string
  subtitle: string | null
  category_slug: string
  sku: string | null
  price: string
  stock: number
  ingredients: string | null
  use_storage: string | null
  reminds_us_of: string | null
  sustainability_note: string | null
  images: string[]
}

export type ApiAdminOrderItem = {
  product_id: string
  name: string
  quantity: number
  unit_price: string | number
  image_url: string | null
}

export type ApiAdminOrder = {
  id: string
  customer_name: string
  email: string
  phone: string | null
  shipping_address: string
  notes: string | null
  status: string
  payment_status: "paid" | "pending" | "failed"
  fulfillment_status: "unfulfilled" | "processing" | "shipped" | "delivered"
  tracking_number: string
  created_at: string
  items: ApiAdminOrderItem[]
  subtotal: string | number
}

export type ApiOrderPatch = {
  payment_status?: ApiAdminOrder["payment_status"]
  fulfillment_status?: ApiAdminOrder["fulfillment_status"]
  tracking_number?: string
}
