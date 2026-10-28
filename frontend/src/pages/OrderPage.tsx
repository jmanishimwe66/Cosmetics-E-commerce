import { useState } from "react"
import type { FormEvent } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../cart/context.ts"
import { lineTotal, sumTotals } from "../lib/price.ts"
import { whatsAppOrderMessage, whatsAppUrl } from "../lib/whatsapp.ts"

const ORDER_KEY = "grece-fov-order"

type FieldErrors = {
  name?: string
  email?: string
  form?: string
}

type ThankYou = {
  url: string
}

export function OrderPage() {
  const { lines, clear } = useCart()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [pending, setPending] = useState(false)
  const [thankYou, setThankYou] = useState<ThankYou | null>(null)
  const subtotal = sumTotals(lines.map((line) => ({ price: line.unitPrice, quantity: line.quantity })))

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = validate(name, email, lines.length)
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setPending(true)
    const message = whatsAppOrderMessage({
      name,
      email,
      phone,
      subtotal,
      lines: lines.map((line) => ({
        name: line.name,
        quantity: line.quantity,
        lineTotal: lineTotal(line.unitPrice, line.quantity),
      })),
    })
    const url = whatsAppUrl(message)
    window.open(url, "_blank", "noopener,noreferrer")
    clear()
    setThankYou({ url })
    setPending(false)
  }

  if (lines.length === 0 && !thankYou) {
    return (
      <section className="page-intro">
        <h1>Checkout</h1>
        <p className="lede">Your cart is empty. Add a product before checkout.</p>
        <div className="actions">
          <Link className="button" to="/shop">
            Shop
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="page-intro">
      <h1>Checkout</h1>
      {thankYou ? (
        <div className="checkout-thanks" role="dialog" aria-modal="true" aria-labelledby="checkout-thanks-title">
          <h2 id="checkout-thanks-title">Thank you — we received your order</h2>
          <p className="prose">
            Your request is recorded. Continue in WhatsApp to confirm payment and delivery with our
            team. If the chat did not open, use the button below.
          </p>
          <div className="actions">
            <a
              className="button whatsapp-btn"
              href={thankYou.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Continue on WhatsApp
            </a>
            <Link className="button secondary" to="/shop">
              Back to shop
            </Link>
          </div>
        </div>
      ) : (
        <div className="order-layout">
          <form className="form" onSubmit={onSubmit} noValidate>
            <label>
              Name
              <input value={name} maxLength={120} autoComplete="name" onChange={(event) => setName(event.target.value)} />
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
              Phone
              <input
                value={phone}
                maxLength={40}
                autoComplete="tel"
                onChange={(event) => setPhone(event.target.value)}
              />
            </label>
            {errors.form ? (
              <p className="status error" role="alert">
                {errors.form}
              </p>
            ) : null}
            <button className="button whatsapp-btn" type="submit" disabled={pending}>
              {pending ? "Opening WhatsApp…" : "Send order to WhatsApp"}
            </button>
          </form>
          <aside className="summary">
            <h2>Your order</h2>
            <ul>
              {lines.map((line) => (
                <li key={line.productId}>
                  <span>
                    {line.name} × {line.quantity}
                  </span>
                  <span>{lineTotal(line.unitPrice, line.quantity)}</span>
                </li>
              ))}
            </ul>
            <p className="summary-row">
              <span className="price-label">Estimated subtotal</span>
              <span>{subtotal}</span>
            </p>
          </aside>
        </div>
      )}
    </section>
  )
}

function validate(name: string, email: string, itemCount: number): FieldErrors {
  const errors: FieldErrors = {}
  if (name.trim().length < 1) errors.name = "Enter your name."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = "Enter a valid email."
  if (itemCount < 1) errors.form = "Your cart is empty."
  return errors
}

export { ORDER_KEY }
