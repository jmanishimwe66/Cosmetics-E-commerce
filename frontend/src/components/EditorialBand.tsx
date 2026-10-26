import { Link } from "react-router-dom"

const photo = (id: string, width = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`

const leaf = photo("1536147116438-62679a5e01f2", 1200)
const berlin = photo("1511920170033-f8396924c348", 1000)
const vienna = photo("1447933601403-0c6688de566e", 1000)

const goods = [
  {
    name: "Marsha",
    notes: "Cherry truffle, Blueberry, Kakao nibs",
    price: "$12 – $39",
    src: photo("1559056199-641a0ac8b55e", 900),
    alt: "White coffee bag on a light studio background.",
  },
  {
    name: "Gogogu",
    notes: "Cherry truffle, Blueberry, Kakao nibs",
    price: "$12 – $39",
    src: photo("1514432324607-a09d9b4aefdd", 900),
    alt: "Coffee bag standing on a pale surface.",
  },
  {
    name: "V60 Dripper",
    notes: "Cherry truffle, Blueberry, Kakao nibs",
    price: "$49",
    src: photo("1495474472287-4d71bcdd2085", 900),
    alt: "Pour-over coffee dripping into a cup.",
  },
]

function ArrowIcon() {
  return (
    <svg className="editorial-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg className="editorial-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="10" r="2.2" fill="currentColor" />
    </svg>
  )
}

export function EditorialBand() {
  return (
    <section className="editorial" aria-label="Coffee editorial">
      <div className="editorial-intro">
        <div className="editorial-headline">
          <h2>
            From Greenies to
            <br />
            Delight.
          </h2>
          <p>All in the name of coffee.</p>
        </div>
        <div className="editorial-thumb">
          <img src={leaf} alt="Dark green leaf filling the frame." />
          <button className="editorial-play" type="button" aria-label="Play">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 7.5v9l8-4.5-8-4.5z" fill="currentColor" />
            </svg>
          </button>
        </div>
        <p className="editorial-lead">
          It doesn&apos;t have{" "}
          <span className="editorial-leaf-pill">
            <img src={leaf} alt="" />
          </span>{" "}
          to taste that way. But it does. It&apos;s not your typical. It&apos;s unnecessarily good.
        </p>
      </div>

      <div className="editorial-cities">
        <article className="city-card city-card-lead">
          <img src={leaf} alt="Lush green leaves." />
          <button className="city-float" type="button" aria-label="Open Prague">
            <ArrowIcon />
          </button>
          <div className="city-copy">
            <h3>Prague</h3>
            <p>
              Botanical Coffee Shop in Prague offers a serene oasis with its lush decor and
              artisanal coffee.
            </p>
          </div>
          <div className="city-pills">
            <button className="city-pill" type="button">
              <PinIcon /> Navigate
            </button>
            <span className="city-pill city-pill-hours">
              Monday to Sunday
              <br />
              09 AM – 07 PM
            </span>
          </div>
        </article>
        <article className="city-card">
          <img src={berlin} alt="Dark coffee shop interior." />
          <div className="city-copy">
            <h3>Berlin</h3>
            <p>
              Berlin&apos;s dynamic coffee culture features innovative shops where baristas
              experiment with new brewing techniques.
            </p>
          </div>
          <button className="city-pill city-pill-solo" type="button">
            <PinIcon /> Navigate
          </button>
        </article>
        <article className="city-card">
          <img src={vienna} alt="Close-up of dark roasted coffee." />
          <div className="city-copy">
            <h3>Vienna</h3>
            <p>
              Vienna&apos;s coffee scene blends historic cafes and modern spots, all dedicated to
              perfecting the art of coffee making.
            </p>
          </div>
          <button className="city-pill city-pill-solo" type="button">
            <PinIcon /> Navigate
          </button>
        </article>
      </div>

      <div className="editorial-goods">
        <div className="editorial-goods-head">
          <h2>
            Unnecessarily
            <br />
            Good Good(s)
          </h2>
          <Link className="editorial-shopall" to="/shop">
            Shop All
          </Link>
        </div>
        <div className="editorial-products">
          {goods.map((item) => (
            <article className="good-card" key={item.name}>
              <div className="good-media">
                <img src={item.src} alt={item.alt} />
                <button className="good-heart" type="button" aria-label={`Save ${item.name}`}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 19s-7-4.4-7-8.5A3.5 3.5 0 0 1 12 8a3.5 3.5 0 0 1 7 2.5C19 14.6 12 19 12 19z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                </button>
              </div>
              <div className="good-meta">
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.notes}</p>
                  <p className="good-price">{item.price}</p>
                </div>
                <button className="good-arrow" type="button" aria-label={`View ${item.name}`}>
                  <ArrowIcon />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
