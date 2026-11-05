import { Link } from "react-router-dom"

import { HomeProductSection } from "../components/HomeProductSection.tsx"
import { ImpactMetrics } from "../components/ImpactMetrics.tsx"
import { ShowcaseBand } from "../components/ShowcaseBand.tsx"
import { landingHeroPhoto } from "../lib/photos.ts"

export function HomePage() {
  return (
    <div className="storefront-stack home-cover">
      <section className="hero-banner" aria-label="Introduction">
        <img
          className="hero-banner-img hero-banner-img--landing"
          src={landingHeroPhoto.src}
          alt={landingHeroPhoto.alt}
          width={1600}
          height={2400}
          decoding="async"
          fetchPriority="high"
        />
        <div className="hero-banner-scrim hero-banner-scrim--strong" />
        <div className="hero-banner-copy hero-banner-copy--wide">
          <h1>From Coffee Waste to Made-in-Rwanda Skincare.</h1>
          <p className="hero-banner-lede">
            Founded by Umubyeyi Grace in Gisenyi, Grece Fav Cycles creates locally made
            personal-care products while giving discarded coffee grounds a second life.
          </p>
          <div className="home-hero-actions">
            <Link className="pill-btn light" to="/shop">
              Shop the Collection
            </Link>
            <Link className="pill-btn outline-light" to="/story">
              Meet Grace
            </Link>
          </div>
        </div>
      </section>

      <div className="home-sheet">
        <ShowcaseBand />
        <ImpactMetrics />
        <HomeProductSection />
      </div>
    </div>
  )
}
