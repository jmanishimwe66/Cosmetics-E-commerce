import { Link } from "react-router-dom"

import { businessEmail } from "../lib/contact.ts"
import { brandLogo } from "../lib/brandAssets.ts"
import { whatsAppInboxMessage, whatsAppUrl } from "../lib/whatsapp.ts"
import { GmailIcon, InstagramIcon } from "./FooterIcons.tsx"
import { WhatsAppIcon } from "./WhatsAppIcon.tsx"

const exploreLinks = [
  { to: "/shop", label: "SHOP ALL" },
  { to: "/story", label: "ABOUT" },
  { to: "/contact", label: "CONTACT US" },
] as const

const infoLinks = [
  { to: "/policies/faqs", label: "FAQS" },
  { to: "/policies/privacy", label: "PRIVACY POLICY" },
  { to: "/policies/returns", label: "RETURNS POLICY" },
  { to: "/policies/terms", label: "TERMS OF SERVICE" },
] as const

const socials = [
  {
    href: "https://www.instagram.com/grece_fav_cycles",
    label: "Instagram",
    Icon: InstagramIcon,
    external: true,
  },
  { href: whatsAppUrl(whatsAppInboxMessage()), label: "WhatsApp", Icon: WhatsAppIcon, external: true },
  { href: `mailto:${businessEmail}`, label: "Gmail", Icon: GmailIcon, external: false },
] as const

export function Footer() {
  return (
    <footer className="footer-shell w-full border-t border-gray-300 bg-[#F4F2EC] text-[#1a120f]">
      <div className="footer-grid grid w-full min-w-0 grid-cols-2 md:grid-cols-4">
        <div className="footer-brand col-span-2 flex flex-col items-start gap-1 border-b border-gray-300 px-4 py-7 sm:px-6 sm:py-9 md:col-span-1 md:gap-1.5 md:border-b-0 md:border-r md:py-12 md:pl-8 md:pr-6">
          <Link to="/" className="inline-block w-fit shrink-0" aria-label="GRECE FOV Cycles home">
            <img
              className="footer-logo"
              src={brandLogo}
              alt="GRECE FOV Cycles"
              width={320}
              height={177}
            />
          </Link>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2 md:gap-4">
            {socials.map(({ href, label, Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center text-[#1a120f] transition-opacity hover:opacity-65"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-collection col-span-2 flex flex-col gap-3 border-b border-gray-300 px-4 py-7 sm:gap-4 sm:px-6 sm:py-9 md:col-span-1 md:border-b-0 md:border-r md:py-12 md:px-8">
          <h2 className="text-xs font-bold tracking-[0.18em] text-[#1a120f]">OUR COLLECTION</h2>
          <p className="max-w-md text-sm leading-relaxed text-[#3f2a22]/85 md:max-w-xs">
            Considered coffee-born care to take you from morning ritual to evening restore.
          </p>
        </div>

        <div className="footer-nav-pair contents">
          <nav
            className="footer-nav-block footer-nav-block--explore md:border-r md:px-8 md:py-12"
            aria-label="Explore"
          >
            <h2 className="footer-nav-heading">EXPLORE</h2>
            <ul className="footer-nav-list">
              {exploreLinks.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="footer-nav-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav
            className="footer-nav-block footer-nav-block--info md:border-r md:px-8 md:py-12"
            aria-label="Information"
          >
            <h2 className="footer-nav-heading">INFORMATION</h2>
            <ul className="footer-nav-list">
              {infoLinks.map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="footer-nav-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <p className="footer-credit-bar border-t border-gray-300 px-4 py-5 text-center text-[0.7rem] leading-relaxed tracking-wide text-[#3f2a22]/70 sm:px-6 md:py-4">
        Built by Safari Strives
      </p>
    </footer>
  )
}
