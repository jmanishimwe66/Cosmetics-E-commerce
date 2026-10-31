type IconProps = { className?: string }

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

export function GmailIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 6.5A2.5 2.5 0 015.5 4h13A2.5 2.5 0 0121 6.5v11a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 17.5v-11zm2.2.3l6.8 4.7 6.8-4.7H5.2zm13.3 1.55l-6.15 4.25a.6.6 0 01-.7 0L5.5 8.35V17.5c0 .28.22.5.5.5h12a.5.5 0 00.5-.5V8.35z"
      />
    </svg>
  )
}
