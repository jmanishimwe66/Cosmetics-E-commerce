const STORAGE_KEY = "grece-fov-favorites"

export function readFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set()
    return new Set(parsed.filter((item): item is string => typeof item === "string"))
  } catch {
    return new Set()
  }
}

export function writeFavorites(slugs: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...slugs]))
}

export function toggleFavoriteSlug(slug: string): boolean {
  const next = readFavorites()
  const added = !next.has(slug)
  if (added) next.add(slug)
  else next.delete(slug)
  writeFavorites(next)
  return added
}

export function isFavoriteSlug(slug: string): boolean {
  return readFavorites().has(slug)
}
