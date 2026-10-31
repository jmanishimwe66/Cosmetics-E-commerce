import { ApiError } from "../api/client.ts"

export function userErrorMessage(reason: unknown, fallback: string): string {
  if (reason instanceof ApiError) {
    if (reason.message.trim()) return reason.message
    return messageForStatus(reason.status, fallback)
  }
  return fallback
}

export function messageForStatus(status: number, fallback: string): string {
  if (status === 0) return "We could not reach the store. Check your connection and try again."
  if (status === 400) return "Some details were invalid. Review the form and try again."
  if (status === 404) return "That item is no longer available."
  if (status === 409) return "Not enough stock for one or more items. Update your cart and try again."
  if (status === 422) return "Some details were invalid. Review the form and try again."
  if (status >= 500) return "Something went wrong on our side. Please try again in a moment."
  return fallback
}
