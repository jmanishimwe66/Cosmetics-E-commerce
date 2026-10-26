import { Link } from "react-router-dom"

export function NotFoundPage() {
  return (
    <section className="page-intro">
      <h1>Not found</h1>
      <p className="lede">That page is not part of this demonstration site.</p>
      <div className="actions">
        <Link className="button" to="/">
          Back home
        </Link>
      </div>
    </section>
  )
}
