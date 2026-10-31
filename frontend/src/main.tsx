import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { brandFavicon } from "./lib/brandAssets.ts"
import { bindApiAuth } from "./lib/supabase.ts"
import "./styles/global.css"

for (const selector of ['link[rel="icon"]', 'link[rel="apple-touch-icon"]'] as const) {
  const link = document.querySelector<HTMLLinkElement>(selector)
  if (link) {
    link.type = "image/png"
    link.href = brandFavicon
  }
}

bindApiAuth()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
