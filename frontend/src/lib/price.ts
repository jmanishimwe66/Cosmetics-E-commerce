export function formatSamplePrice(price: string | number): string {
  return formatCents(toCents(price))
}

export function lineTotal(price: string | number, quantity: number): string {
  return formatCents(toCents(price) * quantity)
}

export function sumTotals(lines: { price: string | number; quantity: number }[]): string {
  const cents = lines.reduce((total, line) => total + toCents(line.price) * line.quantity, 0)
  return formatCents(cents)
}

function toCents(price: string | number): number {
  const text = typeof price === "number" ? price.toFixed(2) : price.trim()
  if (!/^-?\d+(\.\d+)?$/.test(text)) return 0
  const negative = text.startsWith("-")
  const [whole, fraction = ""] = text.replace("-", "").split(".")
  const cents = Number(whole) * 100 + Number(`${fraction}00`.slice(0, 2))
  return negative ? -cents : cents
}

function formatCents(cents: number): string {
  const sign = cents < 0 ? "-" : ""
  const absolute = Math.abs(cents)
  const whole = Math.floor(absolute / 100)
  const fraction = String(absolute % 100).padStart(2, "0")
  return `${sign}${whole}.${fraction}`
}
