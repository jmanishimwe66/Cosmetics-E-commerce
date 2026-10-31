import { useState } from "react"

import { uploadProductImage } from "../lib/supabase.ts"

type GalleryFieldProps = {
  images: string[]
  onChange: (images: string[]) => void
}

export function GalleryField({ images, onChange }: GalleryFieldProps) {
  const [url, setUrl] = useState("")
  const [error, setError] = useState("")
  const [uploading, setUploading] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  function addUrl() {
    const next = url.trim()
    if (!next.startsWith("http://") && !next.startsWith("https://")) {
      setError("Enter an http or https image URL.")
      return
    }
    setError("")
    onChange([...images, next])
    setUrl("")
  }

  async function onFile(file: File | undefined) {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setError("Choose an image file.")
      return
    }
    setUploading(true)
    setError("")
    try {
      const publicUrl = await uploadProductImage(file)
      onChange([...images, publicUrl])
    } catch {
      setError("The image could not be uploaded.")
    } finally {
      setUploading(false)
    }
  }

  function move(from: number, to: number) {
    if (to < 0 || to >= images.length || from === to) return
    const next = [...images]
    const [item] = next.splice(from, 1)
    if (!item) return
    next.splice(to, 0, item)
    onChange(next)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https:// image URL"
          className="min-h-11 flex-1 border border-[var(--line)] bg-white px-3 text-sm"
        />
        <button
          type="button"
          className="min-h-11 border border-[#1a120f] px-4 text-xs font-bold tracking-[0.12em] uppercase"
          onClick={addUrl}
        >
          Add URL
        </button>
        <label className="inline-flex min-h-11 cursor-pointer items-center border border-[#1a120f] px-4 text-xs font-bold tracking-[0.12em] uppercase">
          {uploading ? "Uploading" : "Upload"}
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            disabled={uploading}
            onChange={(event) => {
              void onFile(event.target.files?.[0])
              event.target.value = ""
            }}
          />
        </label>
      </div>
      {error ? <p className="text-sm text-[#3f2a22]">{error}</p> : null}
      {images.length === 0 ? (
        <p className="text-sm text-[#3f2a22]">No images yet. Drag a row to reorder after you add some.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {images.map((src, index) => (
            <li
              key={`${src.slice(0, 48)}-${index}`}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (dragIndex !== null) move(dragIndex, index)
                setDragIndex(null)
              }}
              className="flex items-center gap-3 border border-[var(--line)] bg-white p-2"
            >
              <span className="h-14 w-14 shrink-0 overflow-hidden bg-[#eceae6]">
                <img src={src} alt="" />
              </span>
              <span className="min-w-0 flex-1 truncate text-xs text-[#3f2a22]">Image {index + 1}</span>
              <button
                type="button"
                className="min-h-10 px-2 text-xs font-bold tracking-[0.1em] uppercase"
                onClick={() => onChange(images.filter((_, itemIndex) => itemIndex !== index))}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
