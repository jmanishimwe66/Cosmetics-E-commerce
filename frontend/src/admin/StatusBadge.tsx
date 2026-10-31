import type { FulfillmentStatus, PaymentStatus, StockStatus } from "./types.ts"

const stockLabel: Record<StockStatus, string> = {
  in_stock: "In stock",
  low_stock: "Low stock",
  out_of_stock: "Out of stock",
}

const payLabel: Record<PaymentStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  failed: "Failed",
}

const fulfillLabel: Record<FulfillmentStatus, string> = {
  unfulfilled: "Unfulfilled",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
}

export function StatusBadge({
  kind,
  value,
}: {
  kind: "stock" | "payment" | "fulfillment"
  value: StockStatus | PaymentStatus | FulfillmentStatus
}) {
  const label =
    kind === "stock"
      ? stockLabel[value as StockStatus]
      : kind === "payment"
        ? payLabel[value as PaymentStatus]
        : fulfillLabel[value as FulfillmentStatus]
  const tone =
    value === "out_of_stock" || value === "failed"
      ? "border-[#1a120f] text-[#1a120f]"
      : value === "low_stock" || value === "pending" || value === "unfulfilled"
        ? "border-[#3f2a22] text-[#3f2a22]"
        : "border-[#6b7f62] text-[#2f4a32]"

  return (
    <span className={`inline-flex border px-2 py-1 text-[0.65rem] font-bold tracking-[0.08em] uppercase ${tone}`}>
      {label}
    </span>
  )
}
