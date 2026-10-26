import { EditorialBand } from "../components/EditorialBand.tsx"
import { ShowcaseBand } from "../components/ShowcaseBand.tsx"
import { heroPhoto } from "../lib/photos.ts"

export function HomePage() {
  return (
    <div className="storefront-stack home-cover">
      <section className="hero-banner" aria-label="Introduction">
        <img className="hero-banner-img" src={heroPhoto.src} alt={heroPhoto.alt} />
        <div className="hero-banner-scrim" />
        <div className="hero-banner-copy">
          <span className="pill-tag light">GRECE FOV Demonstration</span>
          <h1>
            Considered Skin Care
            <br />
            Rooted in Coffee
          </h1>
          <p>
            Sample catalog and Unsplash editorial imagery. No payment is taken on order requests.
          </p>
        </div>
      </section>

      <div className="home-sheet">
        <ShowcaseBand />

        <EditorialBand />
      </div>
    </div>
  )
}
