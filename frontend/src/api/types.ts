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
  description: string | null
  price: string | number
  image_url: string | null
  stock: number
  is_featured: boolean
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
