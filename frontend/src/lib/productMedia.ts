import type { Product } from "../api/types.ts"
import { lineupPhoto, samplePhotos } from "./photos.ts"

export function productImageUrls(product: Product): string[] {
  const fromGallery = (product.images ?? []).filter((url) => url.trim().length > 0)
  if (fromGallery.length > 0) return fromGallery
  if (product.image_url?.trim()) return [product.image_url.trim()]
  const fallback = samplePhotos[product.slug]
  return fallback ? [fallback] : []
}

export function productCoverUrl(product: Product): string {
  return productImageUrls(product)[0] ?? ""
}

export function productGallerySlides(product: Product): { src: string; alt: string }[] {
  const urls = productImageUrls(product)
  if (urls.length > 0) {
    return urls.map((src) => ({ src, alt: product.name }))
  }
  return [{ src: lineupPhoto.src, alt: lineupPhoto.alt }]
}
