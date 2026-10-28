import { useEffect, useId, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useCart } from "../cart/context.ts"

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop" },
  { to: "/story", label: "Story" },
  { to: "/contact", label: "Contact" },
]

function MenuIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 7h16v1.5H4V7zm0 4.75h16v1.5H4v-1.5zm0 4.75h16V18H4v-1.5z"
      />
    </svg>
  )
}

export function Header() {
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const drawerId = useId()

  useEffect(() => {
    document.body.classList.toggle("nav-drawer-open", menuOpen)
    return () => document.body.classList.remove("nav-drawer-open")
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  function navLinks(onNavigate?: () => void) {
    return (
      <>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.end} onClick={onNavigate}>
            {link.label}
          </NavLink>
        ))}
        <NavLink to="/cart" aria-label={`Cart, ${count} items`} onClick={onNavigate}>
          Cart ({count})
        </NavLink>
      </>
    )
  }

  return (
    <header className="site-header">
      <div className="nav-shell">
        <div className="nav-bar">
          <div className="nav-brand-group">
            <Link
              className="nav-wordmark nav-logo-link"
              to="/"
              aria-label="GRECE FOV Cycles home"
              onClick={closeMenu}
            >
              <img
                className="nav-logo"
                src="/grece-fov-logo.png"
                alt="GRECE FOV Cycles"
                width={160}
                height={72}
              />
            </Link>
          </div>
          <button
            type="button"
            className="nav-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls={drawerId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon />
          </button>
          <nav className="nav nav--desktop" aria-label="Primary">
            {navLinks()}
          </nav>
        </div>
      </div>
      <button
        type="button"
        className={`nav-backdrop ${menuOpen ? "is-visible" : ""}`}
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenu}
      />
      <aside
        id={drawerId}
        className={`nav-drawer ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className="nav nav--drawer" aria-label="Primary mobile">
          {navLinks(closeMenu)}
        </nav>
      </aside>
    </header>
  )
}
