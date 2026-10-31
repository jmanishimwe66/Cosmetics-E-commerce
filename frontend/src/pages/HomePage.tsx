import { Link } from "react-router-dom"

import { HomeProductSection } from "../components/HomeProductSection.tsx"
import { ShowcaseBand } from "../components/ShowcaseBand.tsx"
import { WhatsAppIcon } from "../components/WhatsAppIcon.tsx"
import { landingHeroPhoto } from "../lib/photos.ts"
import { whatsAppInboxMessage, whatsAppUrl } from "../lib/whatsapp.ts"

export function HomePage() {
  const whatsAppHref = whatsAppUrl(whatsAppInboxMessage())

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
            Conscious Skincare,
            <br />
            Reborn from Coffee
          </h1>
          <div className="home-hero-actions">
            <Link className="pill-btn light" to="/shop">
              Shop the collection
            </Link>
            <a
              className="pill-btn outline-light"
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" aria-hidden />
              Order via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="home-sheet">
        <ShowcaseBand />
        <HomeProductSection />
      </div>
    </div>
  )
}
