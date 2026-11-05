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
          <Link className="best-tile best-tile-link" key={item.slug} to={`/shop/${item.slug}`}>
            <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
          </Link>
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
            Our story began behind a coffee counter. As a barista, Grace watched used coffee
            grounds being discarded every day. Curious about their potential, she took them to the
            laboratory and began experimenting. That curiosity eventually became Grece Fav Cycles, a
            growing Rwandan skincare business.
          </p>
          <Link className="showcase-btn" to="/story">
            Meet Grace
          </Link>
        </div>
        <div className="why-photo-grid">
          {showcaseWhyPhotos.map((item) => (
            <img
              className="why-photo"
              key={item.src}
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
