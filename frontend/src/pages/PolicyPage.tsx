import { Link, useParams } from "react-router-dom"

const titles: Record<string, string> = {
  faqs: "FAQs",
  privacy: "Privacy Policy",
  returns: "Returns Policy",
  terms: "Terms of Service",
}

export function PolicyPage() {
  const { slug } = useParams()
  const key = slug ?? ""
  const title = titles[key]

  if (!title) {
    return (
      <section className="page-intro">
        <h1>Page not found</h1>
        <Link to="/">Return home</Link>
      </section>
    )
  }

  return (
    <section className="page-intro">
      <p className="eyebrow">Information</p>
      <h1>{title}</h1>
      <p className="lede">
        Placeholder policy copy for the GRECE FOV demonstration storefront. Replace with legal text
        before launch.
      </p>
      <Link className="text-link" to="/contact">
        Contact us
      </Link>
    </section>
  )
}
