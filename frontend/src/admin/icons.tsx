import type { ReactNode } from "react"

type IconProps = { className?: string }

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

function Svg({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={24} height={24} aria-hidden="true">
      {children}
    </svg>
  )
}

export function IconLayoutDashboard({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="3" width="7" height="9" {...stroke} />
      <rect x="14" y="3" width="7" height="5" {...stroke} />
      <rect x="14" y="12" width="7" height="9" {...stroke} />
      <rect x="3" y="16" width="7" height="5" {...stroke} />
    </Svg>
  )
}

export function IconMenu({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 6h16M4 12h16M4 18h16" {...stroke} />
    </Svg>
  )
}

export function IconPackage({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 3 3 7v10l9 4 9-4V7l-9-4Z" {...stroke} />
      <path d="M3 7l9 4 9-4M12 11v10" {...stroke} />
    </Svg>
  )
}

export function IconPanelLeftOpen({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="3" width="18" height="18" rx="1" {...stroke} />
      <path d="M9 3v18M15 12H19" {...stroke} />
    </Svg>
  )
}

export function IconPanelLeftClose({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3" y="3" width="18" height="18" rx="1" {...stroke} />
      <path d="M9 3v18M13 12H19" {...stroke} />
    </Svg>
  )
}

export function IconSettings({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="3" {...stroke} />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        {...stroke}
      />
    </Svg>
  )
}

export function IconShoppingBag({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M6 7h12l-1 14H7L6 7Z" {...stroke} />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" {...stroke} />
    </Svg>
  )
}

export function IconUsers({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1" {...stroke} />
      <circle cx="9" cy="7" r="3" {...stroke} />
      <path d="M22 19v-1a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" {...stroke} />
    </Svg>
  )
}

export function IconX({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M6 6l12 12M18 6 6 18" {...stroke} />
    </Svg>
  )
}

export function IconCopy({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="8" y="8" width="12" height="12" rx="1" {...stroke} />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" {...stroke} />
    </Svg>
  )
}

export function IconPencil({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" {...stroke} />
    </Svg>
  )
}

export function IconPlus({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 5v14M5 12h14" {...stroke} />
    </Svg>
  )
}

export function IconSearch({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="11" cy="11" r="7" {...stroke} />
      <path d="M20 20l-3-3" {...stroke} />
    </Svg>
  )
}

export function IconTrash({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 7h16M9 7V5h6v2M8 7l1 14h6l1-14" {...stroke} />
    </Svg>
  )
}
