const DEFAULT_WHATSAPP = "250782023206"

export function whatsAppNumber(): string {
  const raw = import.meta.env.VITE_WHATSAPP_NUMBER?.trim() || DEFAULT_WHATSAPP
  return raw.replace(/\D/g, "")
}

export function whatsAppUrl(text: string): string {
  const digits = whatsAppNumber()
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
}

export function whatsAppInboxMessage(): string {
  return "Hello Grece Fav Cycles — I would like to reach your team."
}

type OrderLine = { name: string; slug: string; quantity: number; lineTotal: string }

function productUrl(slug: string): string {
  const origin = window.location.origin.replace(/\/$/, "")
  return `${origin}/shop/${encodeURIComponent(slug)}`
}

function formatLines(lines: OrderLine[]): string {
  return lines
    .map(
      (line) =>
        `• ${line.name} × ${line.quantity} — ${line.lineTotal}\n  ${productUrl(line.slug)}`,
    )
    .join("\n")
}

export function whatsAppCartMessage(input: { lines: OrderLine[]; subtotal: string }): string {
  const items = formatLines(input.lines)
  return [
    "Hello Grece Fav Cycles — I would like to place an order:",
    "",
    "Items:",
    items,
    "",
    `Estimated total: ${input.subtotal}`,
    "",
    "Please confirm availability, payment, and delivery. Thank you!",
  ].join("\n")
}

export function whatsAppOrderMessage(input: {
  name: string
  email: string
  phone: string
  lines: OrderLine[]
  subtotal: string
}): string {
  const items = formatLines(input.lines)
  const phoneLine = input.phone.trim() ? input.phone.trim() : "Not provided"
  return [
    "Hello Grece Fav Cycles — I would like to place an order:",
    "",
    `Name: ${input.name.trim()}`,
    `Email: ${input.email.trim()}`,
    `Phone: ${phoneLine}`,
    "",
    "Items:",
    items,
    "",
    `Estimated subtotal: ${input.subtotal}`,
    "",
    "I am ready to confirm payment and delivery on WhatsApp. Thank you!",
  ].join("\n")
}
