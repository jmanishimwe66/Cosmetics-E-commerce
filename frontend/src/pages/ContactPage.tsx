import { useState } from "react"
import type { FormEvent } from "react"
import { createContact } from "../api/client.ts"
import { businessEmail } from "../lib/contact.ts"
import { userErrorMessage } from "../lib/userError.ts"

type FieldErrors = {
  name?: string
  email?: string
  subject?: string
  message?: string
  form?: string
}

export function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [pending, setPending] = useState(false)
  const [reference, setReference] = useState<string | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = validate(name, email, subject, message)
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setPending(true)
    setReference(null)
    try {
      const created = await createContact({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      })
      setReference(created.id)
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    } catch (reason: unknown) {
      setErrors({
        form: userErrorMessage(reason, "Your message could not be sent. Please try again."),
      })
    } finally {
      setPending(false)
    }
  }

  const mailtoHref = `mailto:${businessEmail}?subject=${encodeURIComponent(
    subject.trim() || "GRECE FOV enquiry",
  )}&body=${encodeURIComponent(
    `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
  )}`

  return (
    <div className="contact-page">
      <aside className="contact-sidebar" aria-label="Contact information">
        <p className="eyebrow">Contact</p>
        <h1 className="contact-sidebar-title">Get in touch</h1>
        <p className="prose contact-sidebar-lede">
          Questions, wholesale, or press—reach the GRECE FOV team. We reply by email.
        </p>
        <dl className="contact-details">
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${businessEmail}`}>{businessEmail}</a>
            </dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>Kigali, Rwanda</dd>
          </div>
          <div>
            <dt>Hours</dt>
            <dd>Mon–Fri, 9:00–17:00 (CAT)</dd>
          </div>
        </dl>
        <p className="contact-sidebar-note">
          Prefer your own mail app?{" "}
          <a className="text-link" href={mailtoHref}>
            Compose an email
          </a>
          .
        </p>
      </aside>

      <section className="contact-panel" aria-label="Send a message">
        <h2 className="contact-panel-title">Send a message</h2>
        <p className="prose contact-panel-lede">
          Your note is delivered to our inbox. This form does not place an order.
        </p>
        <form className="form contact-form" onSubmit={onSubmit} noValidate>
          <label>
            Name
            <input
              value={name}
              maxLength={120}
              autoComplete="name"
              onChange={(event) => setName(event.target.value)}
            />
            {errors.name ? <span className="field-error">{errors.name}</span> : null}
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            {errors.email ? <span className="field-error">{errors.email}</span> : null}
          </label>
          <label>
            Subject
            <input value={subject} maxLength={160} onChange={(event) => setSubject(event.target.value)} />
            {errors.subject ? <span className="field-error">{errors.subject}</span> : null}
          </label>
          <label>
            Message
            <textarea value={message} maxLength={4000} onChange={(event) => setMessage(event.target.value)} />
            {errors.message ? <span className="field-error">{errors.message}</span> : null}
          </label>
          {errors.form ? (
            <p className="status error" role="alert">
              {errors.form}{" "}
              <a className="text-link" href={mailtoHref}>
                Send via email instead
              </a>
            </p>
          ) : null}
          {reference ? (
            <p className="status" role="status">
              Message sent to {businessEmail}. Reference {reference}.
            </p>
          ) : null}
          <button className="button" type="submit" disabled={pending}>
            {pending ? "Sending…" : "Send message"}
          </button>
        </form>
      </section>
    </div>
  )
}

function validate(name: string, email: string, subject: string, message: string): FieldErrors {
  const errors: FieldErrors = {}
  if (name.trim().length < 1) errors.name = "Enter your name."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = "Enter a valid email."
  if (subject.trim().length < 1) errors.subject = "Enter a subject."
  if (message.trim().length < 1) errors.message = "Enter a message."
  return errors
}
