import { useState } from "react"
import type { FormEvent } from "react"

import { businessEmail } from "../lib/contact.ts"
import { whatsAppUrl } from "../lib/whatsapp.ts"

type FieldErrors = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const whatsAppDisplay = "+250 782 023 206"
const whatsAppLink = whatsAppUrl("Hello Grece Fav Cycles — I have a question.")

export function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [sent, setSent] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = validate(name, email, subject, message)
    setErrors(next)
    if (Object.keys(next).length > 0) return

    const mailtoHref = `mailto:${businessEmail}?subject=${encodeURIComponent(subject.trim())}&body=${encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    )}`
    window.location.href = mailtoHref
    setSent(true)
    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
  }

  return (
    <div className="contact-page">
      <aside className="contact-sidebar" aria-label="Contact information">
        <p className="eyebrow">Contact</p>
        <h1 className="contact-sidebar-title">Talk to Grace&apos;s Team</h1>
        <p className="prose contact-sidebar-lede">
          Questions about our products, orders, or wholesale opportunities? Send us a message.
          We&apos;d love to hear from you.
        </p>
        <dl className="contact-details">
          <div>
            <dt>Location</dt>
            <dd>Gisenyi, Rubavu, Rwanda</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${businessEmail}`}>{businessEmail}</a>
            </dd>
          </div>
          <div>
            <dt>WhatsApp</dt>
            <dd>
              <a href={whatsAppLink} target="_blank" rel="noopener noreferrer">
                {whatsAppDisplay}
              </a>
            </dd>
          </div>
        </dl>
      </aside>

      <section className="contact-panel" aria-label="Send a message">
        <h2 className="contact-panel-title">Send a message</h2>
        <p className="prose contact-panel-lede">
          Your email app will open with your message addressed to our team.
        </p>
        {sent ? (
          <p className="contact-success" role="status">
            If your email app opened, send the message from there. We will reply to{" "}
            {businessEmail} as soon as we can.
          </p>
        ) : null}
        <form className="form contact-form" onSubmit={onSubmit} noValidate>
          <label>
            Name
            <input
              className="min-h-11"
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
              className="min-h-11"
              type="email"
              value={email}
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            {errors.email ? <span className="field-error">{errors.email}</span> : null}
          </label>
          <label>
            Subject
            <input
              className="min-h-11"
              value={subject}
              maxLength={160}
              onChange={(event) => setSubject(event.target.value)}
            />
            {errors.subject ? <span className="field-error">{errors.subject}</span> : null}
          </label>
          <label>
            Message
            <textarea
              className="min-h-28"
              value={message}
              maxLength={4000}
              onChange={(event) => setMessage(event.target.value)}
            />
            {errors.message ? <span className="field-error">{errors.message}</span> : null}
          </label>
          <button className="button min-h-11" type="submit">
            Send via email
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
