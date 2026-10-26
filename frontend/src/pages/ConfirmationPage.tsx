import { Link } from "react-router-dom"
import type { OrderCreated } from "../api/types.ts"
import { formatSamplePrice, lineTotal } from "../lib/price.ts"
import { ORDER_KEY } from "./OrderPage.tsx"

export function ConfirmationPage() {
  const order = readOrder()

  if (!order) {
    return (
      <section className="page-intro">
        <h1>No order request</h1>
        <p className="lede">There is no order request to show in this session.</p>
        <div className="actions">
          <Link className="button" to="/shop">
            Shop the sample
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="page-intro">
      <p className="eyebrow">Request received</p>
      <h1>Pending</h1>
      <p className="lede">
        Payment is not taken. This request stays pending until the business confirms it.
      </p>
      <p>
        <span className="price-label">Reference </span>
        {order.id}
      </p>
      <p>
        <span className="price-label">Status </span>
        {order.status}
      </p>
      <ul className="confirm-list">
        {order.items.map((item) => (
          <li key={item.product_id}>
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{lineTotal(item.unit_price, item.quantity)}</span>
          </li>
        ))}
      </ul>
      <p>
        <span className="price-label">Subtotal </span>
        {formatSamplePrice(order.subtotal)}
      </p>
    </section>
  )
}

function readOrder(): OrderCreated | null {
  try {
    const raw = sessionStorage.getItem(ORDER_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object") return null
    const order = parsed as Partial<OrderCreated>
    if (typeof order.id !== "string" || typeof order.status !== "string" || !Array.isArray(order.items)) {
      return null
    }
    if (order.subtotal === undefined) return null
    return order as OrderCreated
  } catch {
    return null
  }
}
