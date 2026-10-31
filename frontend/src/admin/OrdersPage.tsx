import { useMemo, useState } from "react"

import { IconSearch } from "./icons.tsx"

import { useAdminOrders } from "../api/hooks.ts"
import { formatRwfAmount } from "../lib/price.ts"
import { KpiStrip } from "./KpiStrip.tsx"
import { OrderDrawer } from "./OrderDrawer.tsx"
import { StatusBadge } from "./StatusBadge.tsx"
import { orderTotal } from "./metrics.ts"
import type { FulfillmentStatus, PaymentStatus } from "./types.ts"

function formatWhen(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })
}

export function AdminOrdersPage() {
  const { orders, loading, error, updateOrder } = useAdminOrders()
  const [query, setQuery] = useState("")
  const [payment, setPayment] = useState<"all" | PaymentStatus>("all")
  const [fulfillment, setFulfillment] = useState<"all" | FulfillmentStatus>("all")
  const [openId, setOpenId] = useState<string | null>(null)

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase().replace(/^#/, "")
    return orders.filter((order) => {
      const matchesQuery =
        needle.length === 0 ||
        order.id.toLowerCase().includes(needle) ||
        order.customerName.toLowerCase().includes(needle) ||
        order.email.toLowerCase().includes(needle)
      const matchesPay = payment === "all" || order.paymentStatus === payment
      const matchesShip = fulfillment === "all" || order.fulfillmentStatus === fulfillment
      return matchesQuery && matchesPay && matchesShip
    })
  }, [orders, query, payment, fulfillment])

  const selected = orders.find((order) => order.id === openId) ?? null

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-serif text-3xl font-bold text-[#1a120f]">Orders</h1>
      {error ? (
        <p className="text-sm text-[#3f2a22]" role="alert">
          {error}
        </p>
      ) : null}
      <KpiStrip orders={orders} loading={loading} />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_auto_auto]">
        <label className="relative block">
          <span className="sr-only">Search orders</span>
          <IconSearch className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-[#3f2a22]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search order, name, or email"
            className="w-full border border-[var(--line)] bg-white py-2.5 pr-3 pl-10 text-sm"
          />
        </label>
        <select
          aria-label="Payment status"
          value={payment}
          onChange={(event) => setPayment(event.target.value as "all" | PaymentStatus)}
          className="min-h-11 border border-[var(--line)] bg-white px-3 text-sm"
        >
          <option value="all">All payments</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <select
          aria-label="Fulfillment status"
          value={fulfillment}
          onChange={(event) => setFulfillment(event.target.value as "all" | FulfillmentStatus)}
          className="min-h-11 border border-[var(--line)] bg-white px-3 text-sm"
        >
          <option value="all">All fulfillment</option>
          <option value="unfulfilled">Unfulfilled</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
      {loading ? (
        <p className="text-sm text-[#3f2a22]">Loading orders.</p>
      ) : error ? null : rows.length === 0 ? (
        <p className="text-sm text-[#3f2a22]">No orders match these filters.</p>
      ) : (
        <div className="overflow-x-auto border border-[var(--line)] bg-white">
          <table className="w-full min-w-[52rem] text-left text-sm">
            <thead className="border-b border-[var(--line)] text-[0.65rem] tracking-[0.12em] uppercase">
              <tr>
                <th className="px-3 py-3 font-bold">Order</th>
                <th className="px-3 py-3 font-bold">Customer</th>
                <th className="px-3 py-3 font-bold">Date</th>
                <th className="px-3 py-3 font-bold">Items</th>
                <th className="px-3 py-3 font-bold">Payment</th>
                <th className="px-3 py-3 font-bold">Fulfillment</th>
                <th className="px-3 py-3 font-bold">Total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((order) => (
                <tr key={order.id} className="border-b border-[var(--line)] last:border-b-0">
                  <td className="px-3 py-3">
                    <button
                      type="button"
                      className="font-bold underline"
                      onClick={() => setOpenId(order.id)}
                    >
                      #{order.id}
                    </button>
                  </td>
                  <td className="px-3 py-3">
                    <span className="block">{order.customerName}</span>
                    <span className="text-xs text-[#3f2a22]">{order.email}</span>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">{formatWhen(order.createdAt)}</td>
                  <td className="px-3 py-3">
                    <ul className="flex flex-col gap-2">
                      {order.items.map((item) => (
                        <li key={`${order.id}-${item.title}`} className="flex items-center gap-2">
                          <span className="h-10 w-10 shrink-0 overflow-hidden bg-[#eceae6]">
                            {item.imageUrl ? <img src={item.imageUrl} alt="" /> : null}
                          </span>
                          <span>
                            {item.title} × {item.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge kind="payment" value={order.paymentStatus} />
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge kind="fulfillment" value={order.fulfillmentStatus} />
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">{formatRwfAmount(orderTotal(order))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selected ? (
        <OrderDrawer order={selected} onClose={() => setOpenId(null)} onUpdate={updateOrder} />
      ) : null}
    </div>
  )
}
