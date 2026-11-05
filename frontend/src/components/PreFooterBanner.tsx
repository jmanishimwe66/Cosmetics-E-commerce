import { Link } from "react-router-dom"

import { heroPhoto } from "../lib/photos.ts"

export function PreFooterBanner() {
  return (
    <section
      className="pre-footer-banner relative isolate w-full overflow-hidden"
      aria-label="Our story invitation"
    >
      <img
        src={heroPhoto.src}
        alt=""
        className="pre-footer-banner-img"
        width={1920}
        height={980}
        loading="lazy"
        decoding="async"
      />
      <div className="pre-footer-banner-scrim absolute inset-0 bg-black/35" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-14 md:py-16">
        <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight text-white sm:text-5xl md:text-[3.25rem]">
          A Second Life for Coffee.
        </h2>
        <p className="mt-4 max-w-xl font-serif text-sm leading-relaxed text-white/90 sm:mt-5 sm:text-lg">
          Discover how one Rwandan entrepreneur is transforming discarded coffee grounds into a
          growing skincare business.
        </p>
        <Link
          to="/story"
          className="pre-footer-cta btn-font mt-6 inline-flex min-h-11 max-w-[min(100%,15rem)] items-center justify-center bg-white px-5 py-2 text-[0.65rem] font-bold tracking-[0.16em] text-[#2a1b12] no-underline transition-colors hover:bg-[#f7f6f2] hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:mt-8 sm:max-w-none sm:px-8 sm:py-3 sm:text-xs sm:tracking-[0.2em]"
        >
          Our Story
        </Link>
      </div>
    </section>
  )
}
