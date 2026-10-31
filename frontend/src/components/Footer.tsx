import { Link } from "react-router-dom"

import { brandLogo } from "../lib/brandAssets.ts"
import { InstagramIcon, PinterestIcon, TikTokIcon } from "./FooterIcons.tsx"

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
  { href: "https://pinterest.com", label: "Pinterest", Icon: PinterestIcon },
  { href: "https://instagram.com", label: "Instagram", Icon: InstagramIcon },
  { href: "https://tiktok.com", label: "TikTok", Icon: TikTokIcon },
] as const

export function Footer() {
  return (
    <footer className="border-t border-gray-300 bg-[#F4F2EC] text-[#1a120f]">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="flex flex-row items-center justify-between gap-3 border-b border-gray-300 px-4 py-7 sm:px-6 sm:py-9 md:flex-col md:items-start md:gap-6 md:border-b-0 md:border-r md:py-12 md:pl-8 md:pr-6">
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
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-11 w-11 items-center justify-center text-[#1a120f] transition-opacity hover:opacity-65"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-b border-gray-300 px-4 py-7 sm:gap-4 sm:px-6 sm:py-9 md:border-b-0 md:border-r md:py-12 md:px-8">
          <h2 className="text-xs font-bold tracking-[0.18em] text-[#1a120f]">OUR COLLECTION</h2>
          <p className="max-w-md text-sm leading-relaxed text-[#3f2a22]/85 md:max-w-xs">
            Considered coffee-born care to take you from morning ritual to evening restore.
          </p>
          <p className="text-[0.65rem] leading-relaxed tracking-wide text-[#3f2a22]/70 sm:text-[0.7rem] md:mt-auto">
            Built by Safari Strives
          </p>
        </div>

        <div className="footer-nav-pair border-b border-gray-300 px-4 py-7 sm:px-6 sm:py-9 md:border-b-0 md:border-r md:py-12 md:px-8">
          <nav className="flex flex-col gap-1.5" aria-label="Explore">
            <h2 className="text-[0.65rem] font-bold tracking-[0.16em] text-[#1a120f] sm:text-xs sm:tracking-[0.18em]">
              EXPLORE
            </h2>
            <ul className="flex flex-col gap-0.5">
              {exploreLinks.map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-[0.62rem] font-bold tracking-[0.14em] text-[#1a120f] no-underline transition-opacity hover:opacity-65 sm:text-[0.68rem] sm:tracking-[0.16em]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="flex flex-col gap-1.5" aria-label="Information">
            <h2 className="text-[0.65rem] font-bold tracking-[0.16em] text-[#1a120f] sm:text-xs sm:tracking-[0.18em]">
              INFORMATION
            </h2>
            <ul className="flex flex-col gap-0.5">
              {infoLinks.map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-[0.62rem] font-bold tracking-[0.14em] text-[#1a120f] no-underline transition-opacity hover:opacity-65 sm:text-[0.68rem] sm:tracking-[0.16em]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
