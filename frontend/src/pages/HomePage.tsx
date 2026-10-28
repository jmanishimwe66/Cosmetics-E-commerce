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
          <p className="home-hero-lede">
            Coffee-born care for daily rituals—browse the collection and checkout on WhatsApp.
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
