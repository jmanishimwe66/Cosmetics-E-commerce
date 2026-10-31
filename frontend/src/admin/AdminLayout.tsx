import { NavLink, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import { clearLegacyAdminStore, logoutAdmin, useAdminSession } from "./auth.ts"
import {
  IconLayoutDashboard,
  IconMenu,
  IconPackage,
  IconPanelLeftClose,
  IconPanelLeftOpen,
  IconShoppingBag,
  IconX,
} from "./icons.tsx"
const links = [
  { to: "/admin", label: "Dashboard", icon: IconLayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: IconPackage, end: false },
  { to: "/admin/orders", label: "Orders", icon: IconShoppingBag, end: false },
] as const

export function AdminLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const session = useAdminSession()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    clearLegacyAdminStore()
  }, [])

  if (session === "loading") {
    return (
      <p className="flex min-h-screen items-center justify-center bg-[#f4f2ec] text-sm text-[#3f2a22]">
        Checking session.
      </p>
    )
  }

  if (session !== "admin") {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
  }

  function signOut() {
    void logoutAdmin().then(() => navigate("/admin/login", { replace: true }))
  }

  return (
      <div className="admin-shell flex min-h-screen bg-[#f4f2ec] font-[family-name:var(--font-button)] text-[#1a120f]">
        {mobileOpen ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-[#1a120f]/40 md:hidden"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
        ) : null}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-[var(--line)] bg-[#f8f4ef] transition-transform md:translate-x-0 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          } ${collapsed ? "md:w-16" : "md:w-56"}`}
        >
          <div className="flex items-center justify-between gap-2 border-b border-[var(--line)] px-3 py-4">
            <span className={`text-xs font-bold tracking-[0.16em] ${collapsed ? "md:sr-only" : ""}`}>
              GRECE FOV
            </span>
            <button
              type="button"
              className="hidden h-9 w-9 items-center justify-center md:inline-flex"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setCollapsed((open) => !open)}
            >
              {collapsed ? <IconPanelLeftOpen className="h-4 w-4" /> : <IconPanelLeftClose className="h-4 w-4" />}
            </button>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center md:hidden"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <IconX className="h-4 w-4" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-2" aria-label="Admin">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                title={label}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex min-h-11 items-center gap-3 px-3 text-xs font-semibold tracking-[0.12em] uppercase ${
                    isActive ? "bg-[#1a120f] text-white" : "text-[#1a120f] hover:bg-[#e7ddd2]"
                  }`
                }
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className={collapsed ? "md:sr-only" : ""}>{label}</span>
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-[var(--line)] p-2">
            <button
              type="button"
              className="flex min-h-11 w-full items-center px-3 text-xs font-semibold tracking-[0.12em] text-[#3f2a22] uppercase hover:bg-[#e7ddd2]"
              onClick={signOut}
            >
              <span className={collapsed ? "md:sr-only" : ""}>Sign out</span>
            </button>
          </div>
        </aside>
        <div className={`flex min-w-0 flex-1 flex-col ${collapsed ? "md:pl-16" : "md:pl-56"}`}>
          <header className="flex items-center gap-3 border-b border-[var(--line)] bg-[#f8f4ef] px-4 py-3 md:hidden">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <IconMenu className="h-5 w-5" />
            </button>
            <span className="text-xs font-bold tracking-[0.16em]">ADMIN</span>
          </header>
          <main className="flex-1 px-4 py-6 sm:px-6">
            <Outlet />
          </main>
        </div>
      </div>
  )
}
