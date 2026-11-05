import { samplePhotos } from "./photos.ts"

export function adminProductCoverUrl(images: string[], slug: string): string {
  const fromGallery = images.find((url) => url.trim().length > 0)
  if (fromGallery) return fromGallery
  return samplePhotos[slug] ?? ""
}
