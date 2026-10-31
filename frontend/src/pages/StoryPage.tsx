import { Link } from "react-router-dom"

import { storyPhotos } from "../lib/photos.ts"

const chapters = [
  {
    index: "01",
    code: "CH-01",
    title: "What we do",
    paragraphs: [
      "Grece Fav Cycles transforms coffee residues into high-performance, circular body and skin care. Founded by Umubyeyi Grace, we create quality body scrubs, washes, soaps, jellies, and lip care that address real skin challenges while curbing environmental pollution.",
      "Every product is proudly Made-in-Rwanda—offering transparent, affordable luxury that reduces reliance on imported cosmetics and empowers local youth through sustainable manufacturing.",
    ],
    image: storyPhotos.origin,
  },
  {
    index: "02",
    code: "CH-02",
    title: "Inspiration & background",
    paragraphs: [
      "We began with a simple question: what if coffee’s rich nutrient potential extended beyond the cup? By repurposing discarded coffee grounds from local growers and roasters, we turn waste into skin-nourishing actives.",
      "Driven by a passion for environmental care and economic growth, Grece Fav Cycles bridges local heritage with circular innovation—building a sustainable loop from crop to cosmetic and back to the earth.",
    ],
    image: storyPhotos.material,
  },
  {
    index: "03",
    code: "CH-03",
    title: "Where we are",
    paragraphs: [
      "Based in Rwanda, we work directly alongside local coffee-growing communities to craft, test, and package our formulas locally.",
      "As we expand, we are pioneering eco-friendly packaging crafted from recycled raw materials—improving product protection, minimizing waste, and elevating Made-in-Rwanda cosmetics onto the global luxury stage.",
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
            <h2>The range</h2>
            <p className="prose">
              Toners, moisturizers, lip color, and hair care—each formula ties back to the coffee loop
              with ingredients you can read and routines you can keep.
            </p>
            <div className="actions">
              <Link className="pill-btn light" to="/shop">
                Shop the collection
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
