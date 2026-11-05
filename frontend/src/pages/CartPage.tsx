import { Link } from "react-router-dom"
import { useCart } from "../cart/context.ts"
import { formatRwf, lineTotal, sumTotals } from "../lib/price.ts"
import { whatsAppCartMessage, whatsAppUrl } from "../lib/whatsapp.ts"
import { WhatsAppIcon } from "../components/WhatsAppIcon.tsx"

export function CartPage() {
  const { lines, setQuantity, removeItem } = useCart()
  const subtotal = sumTotals(lines.map((line) => ({ price: line.unitPrice, quantity: line.quantity })))

  const whatsAppHref =
    lines.length > 0
      ? whatsAppUrl(
          whatsAppCartMessage({
            lines: lines.map((line) => ({
              name: line.name,
              slug: line.slug,
              quantity: line.quantity,
              lineTotal: lineTotal(line.unitPrice, line.quantity),
            })),
            subtotal,
          }),
        )
      : ""

  return (
    <section className="page-intro">
      <p className="eyebrow">Order request</p>
      <h1>Cart</h1>
      <p className="lede">
        Submit your order request. We&apos;ll confirm availability, payment, and delivery through
        WhatsApp.
      </p>
      {lines.length === 0 ? (
        <div className="actions">
          <Link className="button min-h-11" to="/shop">
            Browse the shop
          </Link>
        </div>
      ) : (
        <>
          <ul className="lines">
            {lines.map((line) => (
              <li className="line" key={line.productId}>
                <div>
                  <Link className="line-title" to={`/shop/${line.slug}`}>
                    {line.name}
                  </Link>
                  <p className="meta">{formatRwf(line.unitPrice)} each</p>
                </div>
                <div className="qty">
                  <button
                    type="button"
                    className="min-h-11 min-w-11"
                    aria-label={`Decrease ${line.name}`}
                    onClick={() => setQuantity(line.productId, line.quantity - 1)}
                  >
                    −
                  </button>
                  <input
                    aria-label={`${line.name} quantity`}
                    inputMode="numeric"
                    className="min-h-11"
                    value={line.quantity}
                    onChange={(event) => setQuantity(line.productId, Number(event.target.value))}
                  />
                  <button
                    type="button"
                    className="min-h-11 min-w-11"
                    aria-label={`Increase ${line.name}`}
                    onClick={() => setQuantity(line.productId, line.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <p>{lineTotal(line.unitPrice, line.quantity)}</p>
                <button className="remove min-h-11" type="button" onClick={() => removeItem(line.productId)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-foot">
            <p>
              <span className="price-label">Estimated subtotal </span>
              {subtotal}
            </p>
            <div className="actions cart-foot-actions">
              <a
                className="button whatsapp-btn min-h-11 inline-flex items-center justify-center gap-2"
                href={whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" aria-hidden />
                Order on WhatsApp
              </a>
              <Link className="button secondary min-h-11" to="/order">
                Save order details
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
