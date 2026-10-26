import { Link } from "react-router-dom"

const photo = (id: string, width = 1000) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`

const sellers = [
  {
    src: photo("1556228720-195a672e8a03", 900),
    alt: "Cream squeezed from a dark cosmetic tube.",
  },
  {
    src: photo("1571781926291-c477ebfd024b", 900),
    alt: "Pump bottle of lotion on a light background.",
  },
  {
    src: photo("1608571423902-eed4a5ad8108", 1100),
    alt: "Close-up of a labeled cosmetic bottle.",
  },
]

export function ShowcaseBand() {
  return (
    <section className="showcase" aria-label="Best sellers">
      <div className="best-sellers">
        <div className="best-sellers-copy">
          <h2>
            Best
            <br />
            Sellers
          </h2>
          <Link className="showcase-btn" to="/shop">
            Explore all
          </Link>
        </div>
        {sellers.map((item) => (
          <div className="best-tile" key={item.src}>
            <img src={item.src} alt={item.alt} />
          </div>
        ))}
      </div>

      <div className="why-band">
        <img
          className="why-photo"
          src={photo("1536147116438-62679a5e01f2", 1200)}
          alt="Close-up of a green leaf."
        />
        <img
          className="why-photo"
          src={photo("1526947425960-945c6e72858f", 1200)}
          alt="Oil pouring from a clear bottle."
        />
        <div className="why-copy">
          <h2>
            Why we&apos;re
            <br />
            different
          </h2>
          <p>
            Turpis leo tempus morbi sagittis a a orci. Id sodales quis nibh faucibus amet. Sapien
            est sodales etiam ornare urna fermentum dignissim amet. Fermentum venenatis accumsan
            nisl luctus a ac. Diam diam neque nisl faucibus ac quis eget id.
          </p>
          <Link className="showcase-btn" to="/story">
            Read our story
          </Link>
        </div>
      </div>
    </section>
  )
}
