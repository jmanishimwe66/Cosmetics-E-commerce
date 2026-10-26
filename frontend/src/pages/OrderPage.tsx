import { useState } from "react"
import type { FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ApiError, createOrder } from "../api/client.ts"
import { useCart } from "../cart/context.ts"
import { lineTotal, sumTotals } from "../lib/price.ts"

const ORDER_KEY = "grece-fov-order"

type FieldErrors = {
  name?: string
  email?: string
  address?: string
  form?: string
}

export function OrderPage() {
  const { lines, clear } = useCart()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [notes, setNotes] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [pending, setPending] = useState(false)
  const subtotal = sumTotals(lines.map((line) => ({ price: line.unitPrice, quantity: line.quantity })))

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = validate(name, email, address, lines.length)
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setPending(true)
    try {
      const order = await createOrder({
        customer_name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        shipping_address: address.trim(),
        notes: notes.trim() || null,
        items: lines.map((line) => ({ product_id: line.productId, quantity: line.quantity })),
      })
      sessionStorage.setItem(ORDER_KEY, JSON.stringify(order))
      clear()
      navigate("/order/confirmation")
    } catch (reason: unknown) {
      setErrors({
        form: reason instanceof ApiError ? reason.message : "The order request could not be sent.",
      })
      setPending(false)
    }
  }

  if (lines.length === 0) {
    return (
      <section className="page-intro">
        <h1>Order request</h1>
        <p className="lede">Your cart is empty. Add a sample product before sending a request.</p>
        <div className="actions">
          <Link className="button" to="/shop">
            Shop the sample
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="page-intro">
      <p className="eyebrow">No payment</p>
      <h1>Order request</h1>
      <p className="lede">This sends an order request. Payment is not taken.</p>
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
          <label>
            Delivery address
            <textarea
              value={address}
              maxLength={500}
              autoComplete="street-address"
              onChange={(event) => setAddress(event.target.value)}
            />
            {errors.address ? <span className="field-error">{errors.address}</span> : null}
          </label>
          <label>
            Notes
            <textarea value={notes} maxLength={1000} onChange={(event) => setNotes(event.target.value)} />
          </label>
          {errors.form ? (
            <p className="status error" role="alert">
              {errors.form}
            </p>
          ) : null}
          <button className="button" type="submit" disabled={pending}>
            {pending ? "Sending request" : "Request this order"}
          </button>
        </form>
        <aside className="summary">
          <h2>Sample order</h2>
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
    </section>
  )
}

function validate(name: string, email: string, address: string, itemCount: number): FieldErrors {
  const errors: FieldErrors = {}
  if (name.trim().length < 1) errors.name = "Enter your name."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = "Enter a valid email."
  if (address.trim().length < 5) errors.address = "Enter a delivery address of at least 5 characters."
  if (itemCount < 1) errors.form = "Your cart is empty."
  return errors
}

export { ORDER_KEY }
