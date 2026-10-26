import { Link, NavLink } from "react-router-dom"
import { useCart } from "../cart/context.ts"

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop" },
  { to: "/story", label: "Story" },
  { to: "/contact", label: "Contact" },
]

export function Header() {
  const { count } = useCart()

  return (
    <header className="site-header">
      <div className="top-banner">
        <Link className="top-brand" to="/" aria-label="GRECE FOV home">
          <span>GRECE FOV</span>
          <span className="brand-dot" aria-hidden="true" />
        </Link>
      </div>
      <div className="nav-shell">
        <div className="nav-bar">
          <div className="nav-brand-group">
            <Link className="nav-wordmark" to="/">
              GRECE FOV<sup>*</sup>
            </Link>
          </div>
          <nav className="nav" aria-label="Primary">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end}>
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/cart" aria-label={`Cart, ${count} items`}>
              Cart ({count})
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}
