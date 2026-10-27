export function formatSamplePrice(price: string | number): string {
  return formatRwf(price)
}

export function lineTotal(price: string | number, quantity: number): string {
  return formatRwfAmount(toRwfAmount(price) * quantity)
}

export function sumTotals(lines: { price: string | number; quantity: number }[]): string {
  const rwf = lines.reduce((total, line) => total + toRwfAmount(line.price) * line.quantity, 0)
  return formatRwfAmount(rwf)
}

/** Stored catalog prices (e.g. 18.00) map to whole RWF for display (18,000). */
export function toRwfAmount(price: string | number): number {
  const text = typeof price === "number" ? price.toFixed(2) : price.trim()
  if (/^\d+$/.test(text)) return Number(text)
  if (/^-?\d+(\.\d+)?$/.test(text)) return Math.round(parseFloat(text) * 1000)
  return 0
}

export function formatRwfAmount(rwf: number): string {
  const sign = rwf < 0 ? "-" : ""
  const absolute = Math.abs(rwf)
  return `${sign}RWF ${absolute.toLocaleString("en-US")}`
}

/** Display price in Rwandan Francs (demo majors like 18.00 → RWF 18,000). */
export function formatRwf(price: string | number): string {
  return formatRwfAmount(toRwfAmount(price))
}
