import type { AdminOrder } from "./types.ts"

export function orderTotal(order: AdminOrder): number {
  return order.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
}

export function orderMetrics(orders: AdminOrder[]) {
  const paid = orders.filter((order) => order.paymentStatus === "paid")
  const revenue = paid.reduce((sum, order) => sum + orderTotal(order), 0)
  const pendingFulfillment = orders.filter(
    (order) => order.fulfillmentStatus !== "delivered",
  ).length
  const averageOrderValue = paid.length === 0 ? 0 : Math.round(revenue / paid.length)
  return {
    revenue,
    orderCount: orders.length,
    pendingFulfillment,
    averageOrderValue,
  }
}
