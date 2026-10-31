import { useAdminOrders } from "../api/hooks.ts"
import { KpiStrip } from "./KpiStrip.tsx"

export function AdminDashboardPage() {
  const { orders, loading, error } = useAdminOrders()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#1a120f]">Dashboard</h1>
        <p className="mt-2 max-w-xl text-sm text-[#3f2a22]">
          Orders from the store API. Figures update when fulfillment or payment changes.
        </p>
      </div>
      {error ? (
        <p className="text-sm text-[#3f2a22]" role="alert">
          {error}
        </p>
      ) : null}
      <KpiStrip orders={orders} loading={loading} />
    </div>
  )
}
