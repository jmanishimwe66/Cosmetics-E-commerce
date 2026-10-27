import { useState } from "react"

type Item = { id: string; title: string; body: string }

export function PdpAccordion({ items }: { items: Item[] }) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="mt-8 border-t border-gray-300">
      {items.map((item) => {
        const open = openId === item.id
        return (
          <div key={item.id} className="border-b border-gray-300">
            <button
              type="button"
              className="flex min-h-11 w-full items-center justify-between py-4 text-left text-[0.68rem] font-bold tracking-[0.16em] text-[#1a120f]"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : item.id)}
            >
              {item.title}
              <span className="text-lg leading-none" aria-hidden="true">
                {open ? "−" : "+"}
              </span>
            </button>
            {open ? (
              <p className="pb-5 font-serif text-base leading-relaxed text-[#3f2a22]/90">{item.body}</p>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
