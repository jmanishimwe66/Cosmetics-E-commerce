import { Link } from "react-router-dom"
import { heroPhoto, storyPhotos } from "../lib/photos.ts"

const chapters = [
  {
    index: "01",
    code: "CH-01",
    title: "Origin",
    copy: "This chapter is reserved for the company’s own account of how it began. That account is not confirmed, so the space stays open.",
    image: storyPhotos.origin,
  },
  {
    index: "02",
    code: "CH-02",
    title: "Material",
    copy: "This chapter is reserved for what the coffee residue is and where it is collected. The source is not confirmed.",
    image: storyPhotos.material,
  },
  {
    index: "03",
    code: "CH-03",
    title: "Craft",
    copy: "This chapter is reserved for how a product is made and what is checked before it is sold. The workshop is not confirmed.",
    image: storyPhotos.craft,
  },
]

export function StoryPage() {
  return (
    <div className="storefront-stack">
      <section className="hero-banner compact" aria-label="Story introduction">
        <img className="hero-banner-img" src={heroPhoto.src} alt={heroPhoto.alt} />
        <div className="hero-banner-scrim" />
        <div className="hero-banner-copy">
          <span className="pill-tag light">Layout Sample</span>
          <h1>Story Portfolio</h1>
          <p>
            This narrative is a layout sample. It is not confirmed company history. Photographs are
            from Unsplash for demonstration.
          </p>
        </div>
      </section>

      <div className="story-stack">
        {chapters.map((chapter, idx) => (
          <article
            className={`story-module ${idx % 2 === 1 ? "reverse" : ""}`}
            key={chapter.index}
          >
            <div className="story-copy-tile">
              <div className="code-title-row">
                <span className="code-pill">{chapter.code}</span>
                <span className="eyebrow">Chapter {chapter.index}</span>
              </div>
              <h2>{chapter.title}</h2>
              <p className="prose">{chapter.copy}</p>
            </div>
            <div className="story-photo-tile">
              <img src={chapter.image.src} alt={chapter.image.alt} loading="lazy" />
            </div>
          </article>
        ))}

        <article className="story-module">
          <div className="story-copy-tile dark">
            <div className="code-title-row">
              <span className="code-pill light">CH-04</span>
              <span className="eyebrow light">Chapter 04</span>
            </div>
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
