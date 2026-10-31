import type { ReactNode } from "react"

type UserAlertProps = {
  tone?: "error" | "info"
  onRetry?: () => void
  retryLabel?: string
  className?: string
  children: ReactNode
}

export function UserAlert({
  tone = "error",
  onRetry,
  retryLabel = "Try again",
  className = "",
  children,
}: UserAlertProps) {
  return (
    <div className={`user-alert user-alert--${tone} ${className}`.trim()} role="alert">
      <p className={tone === "error" ? "status error" : "status"}>{children}</p>
      {onRetry ? (
        <button type="button" className="button secondary" onClick={onRetry}>
          {retryLabel}
        </button>
      ) : null}
    </div>
  )
}
