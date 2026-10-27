import { Link } from "react-router-dom"

import { heroPhoto } from "../lib/photos.ts"

export function PreFooterBanner() {
  return (
    <section
      className="pre-footer-banner relative isolate w-full overflow-hidden"
      aria-label="Contact invitation"
    >
      <img
        src={heroPhoto.src}
        alt=""
        className="pre-footer-banner-img"
        decoding="async"
      />
      <div className="absolute inset-0 bg-white/55" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-16 text-center sm:py-20 md:py-24">
        <h2 className="font-serif text-4xl font-normal leading-tight tracking-tight text-[#1a120f] sm:text-5xl md:text-[3.25rem]">
          More than a product
        </h2>
        <p className="mt-5 max-w-xl font-serif text-base leading-relaxed text-[#3f2a22]/90 sm:text-lg">
          Coffee-born care with a story beyond the jar—considered formulas, traceable origins, and
          craft you can feel in every routine.
        </p>
        <Link
          to="/contact"
          className="pre-footer-cta btn-font mt-8 inline-flex min-h-11 min-w-[11rem] items-center justify-center bg-[#3f2a22] px-8 py-3 font-[family-name:var(--font-button)] text-xs font-bold tracking-[0.2em] text-white transition-colors hover:bg-[#2a1c17] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3f2a22]"
        >
          CONTACT US
        </Link>
      </div>
    </section>
  )
}
