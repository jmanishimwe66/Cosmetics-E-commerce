import { Link } from "react-router-dom"

import { storyPhotos } from "../lib/photos.ts"

const chapters = [
  {
    index: "01",
    code: "CH-01",
    title: "What we do",
    paragraphs: [
      "GRECE FOV Cycles makes coffee-born skin and hair care from upcycled coffee and plant ingredients—formulas that feel premium and list what is inside clearly.",
      "We partner with growers and roasters, turn residue into actives, and sell toners, moisturizers, and hair care priced in RWF for Rwanda and the wider region.",
      "You browse here, request orders directly, and we confirm personally while we grow traceability, retail, and accelerator partnerships.",
    ],
    image: storyPhotos.origin,
  },
  {
    index: "02",
    code: "CH-02",
    title: "Inspiration & background",
    paragraphs: [
      "We started from coffee’s smell and story—what if the same richness could care for skin and hair after the cup is empty?",
      "Rwanda’s coffee culture taught us to honor farmers, use waste thoughtfully, and keep luxury local, circular, and honest.",
      "Our look follows slow rituals and earthy light; GRECE FOV Cycles names the loop from crop to cosmetic and back again.",
    ],
    image: storyPhotos.material,
  },
  {
    index: "03",
    code: "CH-03",
    title: "Where we are",
    paragraphs: [
      "We are based in Rwanda, near the coffee communities that supply us, developing and testing formulas sold in RWF.",
      "Today we sell direct online, take order requests by hand, and appear at Kigali markets and pop-ups when dates are announced.",
      "Safari Strive supports our growth; next steps are stronger production, retail partners, and reach beyond one city.",
    ],
    image: storyPhotos.craft,
  },
]

export function StoryPage() {
  return (
    <div className="storefront-stack story-page">
      <div className="story-stack">
        {chapters.map((chapter, idx) => (
          <article
            className={`story-module story-chapter ${idx % 2 === 1 ? "reverse" : ""}`}
            key={chapter.index}
          >
            <div className="story-copy-tile">
              <span className="eyebrow">Chapter {chapter.index}</span>
              <h2>{chapter.title}</h2>
              <div className="story-prose">
                {chapter.paragraphs.map((paragraph, pIdx) => (
                  <p className="prose" key={`${chapter.index}-${pIdx}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="story-photo-tile">
              <img src={chapter.image.src} alt={chapter.image.alt} loading="lazy" />
            </div>
          </article>
        ))}

        <article className="story-module">
          <div className="story-copy-tile dark">
            <span className="eyebrow light">Chapter 04</span>
            <h2>Sample Range</h2>
            <p className="prose">
              The shop uses sample products so this storefront can be demonstrated. Those products
              are not the GRECE FOV range.
            </p>
            <div className="actions">
              <Link className="pill-btn light" to="/shop">
                Shop the sample
              </Link>
              <Link className="pill-btn outline-light" to="/contact">
                Business enquiry
              </Link>
            </div>
          </div>
          <div className="range-grid">
            {storyPhotos.range.map((photo) => (
              <img key={photo.alt} src={photo.src} alt={photo.alt} loading="lazy" />
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}
