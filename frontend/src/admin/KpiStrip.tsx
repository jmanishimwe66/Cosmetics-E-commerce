import { formatRwfAmount } from "../lib/price.ts"
import { orderMetrics } from "./metrics.ts"
import type { AdminOrder } from "./types.ts"

export function KpiStrip({ orders, loading = false }: { orders: AdminOrder[]; loading?: boolean }) {
  const metrics = orderMetrics(orders)
  const cards = [
    { label: "Total revenue", value: formatRwfAmount(metrics.revenue) },
    { label: "Total orders", value: String(metrics.orderCount) },
    { label: "Pending fulfillment", value: String(metrics.pendingFulfillment) },
    { label: "Average order value", value: formatRwfAmount(metrics.averageOrderValue) },
  ]

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article key={card.label} className="border border-[var(--line)] bg-white px-4 py-4">
          <p className="text-[0.65rem] font-bold tracking-[0.14em] text-[#3f2a22] uppercase">
            {card.label}
          </p>
          <p className="mt-2 text-xl font-bold text-[#1a120f]">{loading ? "…" : card.value}</p>
        </article>
      ))}
    </div>
  )
}
