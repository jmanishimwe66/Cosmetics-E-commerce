import { useEffect, useState } from "react"

import { IconX } from "./icons.tsx"

import type { OrderStatusPatch } from "../api/mappers.ts"
import { formatRwfAmount } from "../lib/price.ts"
import { orderTotal } from "./metrics.ts"
import type { AdminOrder, FulfillmentStatus, PaymentStatus } from "./types.ts"

const fieldClass = "min-h-11 w-full border border-[var(--line)] bg-white px-3 text-sm"

export function OrderDrawer({
  order,
  onClose,
  onUpdate,
}: {
  order: AdminOrder
  onClose: () => void
  onUpdate: (id: string, patch: OrderStatusPatch) => void
}) {
  const [tracking, setTracking] = useState(order.trackingNumber)
  const [trackingSource, setTrackingSource] = useState({
    id: order.id,
    value: order.trackingNumber,
  })
  if (trackingSource.id !== order.id || trackingSource.value !== order.trackingNumber) {
    setTrackingSource({ id: order.id, value: order.trackingNumber })
    setTracking(order.trackingNumber)
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button type="button" className="absolute inset-0 bg-[#1a120f]/40" aria-label="Close order" onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-drawer-title"
        className="relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-[#f8f4ef] p-5"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 id="order-drawer-title" className="font-serif text-2xl font-bold">
            #{order.id}
          </h2>
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center" aria-label="Close" onClick={onClose}>
            <IconX className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-4 text-sm font-semibold">{order.customerName}</p>
        <p className="text-sm text-[#3f2a22]">{order.email}</p>
        <p className="text-sm text-[#3f2a22]">{order.phone}</p>
        <h3 className="mt-5 text-xs font-bold tracking-[0.14em] uppercase">Address</h3>
        <p className="mt-2 text-sm leading-relaxed">{order.address}</p>
        <h3 className="mt-5 text-xs font-bold tracking-[0.14em] uppercase">Items</h3>
        <ul className="mt-2 flex flex-col gap-3">
          {order.items.map((item) => (
            <li key={item.title} className="flex items-center gap-3">
              <span className="h-12 w-12 shrink-0 overflow-hidden bg-[#eceae6]">
                {item.imageUrl ? <img src={item.imageUrl} alt="" /> : null}
              </span>
              <span className="min-w-0 flex-1 text-sm">
                {item.title} × {item.quantity}
              </span>
              <span className="text-sm">{formatRwfAmount(item.unitPrice * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-bold">Total {formatRwfAmount(orderTotal(order))}</p>
        <label className="mt-5 flex flex-col gap-1 text-sm">
          Payment
          <select
            className={fieldClass}
            value={order.paymentStatus}
            onChange={(event) =>
              onUpdate(order.id, { paymentStatus: event.target.value as PaymentStatus })
            }
          >
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </label>
        <label className="mt-3 flex flex-col gap-1 text-sm">
          Fulfillment
          <select
            className={fieldClass}
            value={order.fulfillmentStatus}
            onChange={(event) =>
              onUpdate(order.id, { fulfillmentStatus: event.target.value as FulfillmentStatus })
            }
          >
            <option value="unfulfilled">Unfulfilled</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </label>
        <label className="mt-3 flex flex-col gap-1 text-sm">
          Tracking number
          <input
            className={fieldClass}
            value={tracking}
            onChange={(event) => setTracking(event.target.value)}
            onBlur={() => {
              if (tracking !== order.trackingNumber) onUpdate(order.id, { trackingNumber: tracking })
            }}
          />
        </label>
      </aside>
    </div>
  )
}
