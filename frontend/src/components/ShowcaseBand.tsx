import { Link } from "react-router-dom"

import { showcaseCollectionTiles, showcaseWhyPhotos } from "../lib/photos.ts"

export function ShowcaseBand() {
  return (
    <section className="showcase" aria-label="Best sellers">
      <div className="best-sellers">
        <div className="best-sellers-copy">
          <h2>
            Signature
            <br />
            Picks
          </h2>
          <Link className="showcase-btn" to="/shop">
            Shop all
          </Link>
        </div>
        {showcaseCollectionTiles.map((item) => (
          <div className="best-tile" key={item.src}>
            <img src={item.src} alt={item.alt} />
          </div>
        ))}
      </div>

      <div className="why-band why-coffee">
        <div className="why-copy">
          <h2>
            Why we&apos;re
            <br />
            different
          </h2>
          <p>
            We believe clean beauty should restore both skin and planet. By upcycling coffee waste
            into nourishing skin treatments and developing our own recycled packaging, Grece Fav
            Cycles delivers premium, zero-waste cosmetics that create dignified jobs for local youth
            and champion sustainable Rwandan craftsmanship.
          </p>
          <Link className="showcase-btn" to="/story">
            Read our story
          </Link>
        </div>
        <div className="why-photo-grid">
          {showcaseWhyPhotos.map((item) => (
            <img className="why-photo" key={item.src} src={item.src} alt={item.alt} />
          ))}
        </div>
      </div>
    </section>
  )
}
