type IconProps = { className?: string }

export function PinterestIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12c0 4.21 2.63 7.81 6.35 9.24-.09-.79-.17-2.01.03-2.87l1.15-4.86s-.29-.58-.29-1.44c0-1.35.78-2.36 1.76-2.36.83 0 1.23.62 1.23 1.37 0 .83-.53 2.08-.81 3.23-.23.97.49 1.76 1.45 1.76 1.74 0 3.08-1.84 3.08-4.49 0-2.35-1.69-3.99-4.1-3.99-2.79 0-4.43 2.09-4.43 4.25 0 .84.32 1.74.73 2.23a.3.3 0 01-.07.28l-.28 1.12c-.04.18-.14.22-.33.13-1.24-.58-2.02-2.4-2.02-3.86 0-3.15 2.29-6.04 6.61-6.04 3.47 0 6.17 2.47 6.17 5.77 0 3.45-2.17 6.22-5.19 6.22-1.01 0-1.97-.53-2.3-1.16l-.63 2.4c-.23.89-.85 2.01-1.27 2.69A10 10 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"
      />
    </svg>
  )
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm0 2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H7zm5 3.5A5.5 5.5 0 1111.5 18 5.5 5.5 0 0112 7.5zm0 2A3.5 3.5 0 1015.5 13 3.5 3.5 0 0012 9.5zM17.75 6.5a1.25 1.25 0 11-1.25 1.25 1.25 1.25 0 011.25-1.25z"
      />
    </svg>
  )
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.5 3c.4 2.2 1.8 3.9 3.9 4.5v3.2c-1.4 0-2.7-.4-3.9-1.1v6.9a6.9 6.9 0 11-6.9-6.9c.4 0 .8.04 1.2.12A4.4 4.4 0 0012 16.4V3.1c1.3-.1 2.6.3 3.6 1.1l.9-1.2z"
      />
    </svg>
  )
}
