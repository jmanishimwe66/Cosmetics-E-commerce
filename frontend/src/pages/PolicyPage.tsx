import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { policies } from "../content/policies.ts"

export function PolicyPage() {
  const { slug = "" } = useParams()
  const navigate = useNavigate()
  const content = policies[slug]

  useEffect(() => {
    if (!content) return undefined

    function close() {
      if (window.history.length > 1) navigate(-1)
      else navigate("/")
    }

    document.body.classList.add("policy-modal-open")

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)

    return () => {
      document.body.classList.remove("policy-modal-open")
      window.removeEventListener("keydown", onKey)
    }
  }, [content, navigate])

  function close() {
    if (window.history.length > 1) navigate(-1)
    else navigate("/")
  }

  if (!content) {
    return (
      <section className="page-intro">
        <h1>Page not found</h1>
        <button type="button" className="button secondary" onClick={() => navigate("/")}>
          Return home
        </button>
      </section>
    )
  }

  return (
    <div className="policy-overlay" role="presentation" onClick={close}>
      <div
        className="policy-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="policy-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="policy-panel-head">
          <p className="eyebrow">Information</p>
          <h1 id="policy-title">{content.title}</h1>
          <button type="button" className="policy-close btn-font" onClick={close}>
            Close
          </button>
        </div>
        <div className="policy-panel-body">
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p className="prose">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
