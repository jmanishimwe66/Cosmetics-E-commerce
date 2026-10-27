import { Link } from "react-router-dom"
import { useCart } from "../cart/context.ts"
import { formatRwf, lineTotal, sumTotals } from "../lib/price.ts"

export function CartPage() {
  const { lines, setQuantity, removeItem } = useCart()
  const subtotal = sumTotals(lines.map((line) => ({ price: line.unitPrice, quantity: line.quantity })))

  return (
    <section className="page-intro">
      <p className="eyebrow">Order request</p>
      <h1>Cart</h1>
      <p className="lede">
        Estimated from sample prices. The server confirms the price when you send the request. No
        payment is taken.
      </p>
      {lines.length === 0 ? (
        <div className="actions">
          <Link className="button" to="/shop">
            Browse the sample shop
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
                    aria-label={`Decrease ${line.name}`}
                    onClick={() => setQuantity(line.productId, line.quantity - 1)}
                  >
                    −
                  </button>
                  <input
                    aria-label={`${line.name} quantity`}
                    inputMode="numeric"
                    value={line.quantity}
                    onChange={(event) => setQuantity(line.productId, Number(event.target.value))}
                  />
                  <button
                    type="button"
                    aria-label={`Increase ${line.name}`}
                    onClick={() => setQuantity(line.productId, line.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <p>{lineTotal(line.unitPrice, line.quantity)}</p>
                <button className="remove" type="button" onClick={() => removeItem(line.productId)}>
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
            <Link className="button" to="/order">
              Request this order
            </Link>
          </div>
        </>
      )}
    </section>
  )
}
