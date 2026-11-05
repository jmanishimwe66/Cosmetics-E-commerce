import { Link } from "react-router-dom"

import { storyPhotos } from "../lib/photos.ts"

const chapters = [
  {
    index: "01",
    title: "Meet Grace",
    paragraphs: [
      "Umubyeyi Grace studied Food Biotechnology. While working as a barista, she noticed how much coffee residue was discarded every day. She began taking it to the laboratory to explore its potential. What started as an experiment eventually became Grece Fav Cycles.",
    ],
    image: storyPhotos.meetGrace,
  },
  {
    index: "02",
    title: "What We Make",
    paragraphs: [
      "Today, Grace and her team produce skincare products in Rwanda, including body wash, body jelly, lip care, and soap. By finding new uses for discarded coffee grounds, we’re creating locally made products while reducing waste.",
    ],
    image: storyPhotos.whatWeMake,
  },
  {
    index: "03",
    title: "Where We’re Going",
    paragraphs: [
      "From Gisenyi, we’re strengthening production, improving packaging, and expanding our reach across Rwanda. Our ambition is to build a recognized Made-in-Rwanda skincare brand that can eventually reach international markets.",
    ],
    image: storyPhotos.whereGoing,
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
          <div className="story-copy-tile dark story-chapter-cta">
            <span className="eyebrow light">Chapter 04</span>
            <h2>Explore Our Products</h2>
            <p className="prose">
              Discover our growing collection of Made-in-Rwanda skincare products, from everyday
              body care to our Tabithy soap collection.
            </p>
            <div className="actions">
              <Link className="pill-btn light" to="/shop">
                Shop the Collection
              </Link>
              <Link className="pill-btn outline-light" to="/contact">
                Ask About Wholesale
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
