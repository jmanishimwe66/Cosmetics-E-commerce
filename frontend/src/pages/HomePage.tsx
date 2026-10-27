import { HomeProductSection } from "../components/HomeProductSection.tsx"
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
        />
        <div className="hero-banner-scrim" />
        <div className="hero-banner-copy">
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
        <HomeProductSection />
      </div>
    </div>
  )
}
