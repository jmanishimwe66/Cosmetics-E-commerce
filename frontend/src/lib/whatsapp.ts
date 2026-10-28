const DEFAULT_WHATSAPP = "250788000000"

export function whatsAppNumber(): string {
  const raw = import.meta.env.VITE_WHATSAPP_NUMBER?.trim() || DEFAULT_WHATSAPP
  return raw.replace(/\D/g, "")
}

export function whatsAppUrl(text: string): string {
  const digits = whatsAppNumber()
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
}

export function whatsAppInboxMessage(): string {
  return "Hello GRECE FOV Cycles — I would like to reach your inbox."
}

type OrderLine = { name: string; quantity: number; lineTotal: string }

export function whatsAppOrderMessage(input: {
  name: string
  email: string
  phone: string
  lines: OrderLine[]
  subtotal: string
}): string {
  const items = input.lines
    .map((line) => `• ${line.name} × ${line.quantity} — ${line.lineTotal}`)
    .join("\n")
  const phoneLine = input.phone.trim() ? input.phone.trim() : "Not provided"
  return [
    "Hello GRECE FOV Cycles — I would like to place an order:",
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
