import { useState } from "react"
import type { FormEvent } from "react"
import { ApiError, createContact } from "../api/client.ts"

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
        form: reason instanceof ApiError ? reason.message : "The message could not be sent.",
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <section className="page-intro">
      <p className="eyebrow">Enquiries</p>
      <h1>Contact</h1>
      <p className="lede">
        For a general question or a business enquiry. This form does not place an order.
      </p>
      <form className="form" onSubmit={onSubmit} noValidate>
        <label>
          Name
          <input value={name} maxLength={120} autoComplete="name" onChange={(event) => setName(event.target.value)} />
          {errors.name ? <span className="field-error">{errors.name}</span> : null}
        </label>
        <label>
          Email
          <input type="email" value={email} autoComplete="email" onChange={(event) => setEmail(event.target.value)} />
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
            {errors.form}
          </p>
        ) : null}
        {reference ? (
          <p className="status" role="status">
            Message received. Reference {reference}.
          </p>
        ) : null}
        <button className="button" type="submit" disabled={pending}>
          {pending ? "Sending" : "Send message"}
        </button>
      </form>
    </section>
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
