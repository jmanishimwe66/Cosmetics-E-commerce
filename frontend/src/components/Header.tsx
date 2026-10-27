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
      <div className="nav-shell">
        <div className="nav-bar">
          <div className="nav-brand-group">
            <Link className="nav-wordmark nav-logo-link" to="/" aria-label="GRECE FOV Cycles home">
              <img
                className="nav-logo"
                src="/grece-fov-logo.png"
                alt="GRECE FOV Cycles"
                width={160}
                height={72}
              />
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
