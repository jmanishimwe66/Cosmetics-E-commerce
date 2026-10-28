import { heroPhoto } from "../lib/photos.ts"
import { whatsAppInboxMessage, whatsAppUrl } from "../lib/whatsapp.ts"
import { WhatsAppIcon } from "./WhatsAppIcon.tsx"

export function PreFooterBanner() {
  const inboxUrl = whatsAppUrl(whatsAppInboxMessage())

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
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-12 text-center sm:px-6 sm:py-20 md:py-24">
        <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight text-[#1a120f] sm:text-5xl md:text-[3.25rem]">
          More than a product
        </h2>
        <p className="mt-4 max-w-xl font-serif text-sm leading-relaxed text-[#3f2a22]/90 sm:mt-5 sm:text-lg">
          Coffee-born care with a story beyond the jar—considered formulas, traceable origins, and
          craft you can feel in every routine.
        </p>
        <a
          href={inboxUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pre-footer-cta btn-font mt-6 inline-flex max-w-[min(100%,15rem)] items-center justify-center gap-1.5 bg-[#3f2a22] px-5 py-2 text-[0.65rem] font-bold tracking-[0.16em] text-white transition-colors hover:bg-[#2a1c17] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3f2a22] sm:mt-8 sm:max-w-none sm:min-h-11 sm:gap-2 sm:px-8 sm:py-3 sm:text-xs sm:tracking-[0.2em]"
        >
          <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366] sm:h-5 sm:w-5" />
          Reach us inbox
        </a>
      </div>
    </section>
  )
}
