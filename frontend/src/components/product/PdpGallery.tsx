import type { Product } from "../../api/types.ts"
import { lineupPhoto, samplePhotos } from "../../lib/photos.ts"

type PdpGalleryProps = {
  product: Product
  activeIndex: number
  onSelect: (index: number) => void
}

function gallerySources(product: Product): { src: string; alt: string }[] {
  const primary = product.image_url || samplePhotos[product.slug] || lineupPhoto.src
  return [
    { src: primary, alt: product.name },
    { src: lineupPhoto.src, alt: lineupPhoto.alt },
  ]
}

export function PdpGallery({ product, activeIndex, onSelect }: PdpGalleryProps) {
  const images = gallerySources(product)
  const active = images[activeIndex] ?? images[0]

  return (
    <div className="flex flex-col border-b border-gray-300 md:border-b-0 md:border-r">
      <div className="flex min-h-[22rem] items-center justify-center border-b border-gray-300 bg-[#F4F2EC] p-8 sm:min-h-[28rem] md:min-h-[32rem]">
        <img
          src={active.src}
          alt={active.alt}
          className="max-h-[26rem] w-auto max-w-full object-contain"
        />
      </div>
      <div className="grid grid-cols-2 gap-0 border-gray-300 bg-[#F4F2EC]">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => onSelect(index)}
            className={`flex min-h-[5.5rem] items-center justify-center border-t border-gray-300 p-4 transition-colors ${
              index === 0 ? "border-r" : ""
            } ${activeIndex === index ? "ring-2 ring-inset ring-[#1a120f]" : "opacity-80 hover:opacity-100"}`}
            aria-label={`View image ${index + 1}`}
            aria-pressed={activeIndex === index}
          >
            <img src={image.src} alt="" className="max-h-16 w-auto max-w-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  )
}
