import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="site-footer">
      <p className="wordmark">GRECE FOV</p>
      <p>
        Demonstration catalog. These products are sample data, not the GRECE FOV range.
      </p>
      <nav className="footer-nav" aria-label="Footer">
        <Link to="/story">Story</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </footer>
  )
}
