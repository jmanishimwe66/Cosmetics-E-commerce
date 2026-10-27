import { fileURLToPath } from "node:url"

import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  envDir: fileURLToPath(new URL("..", import.meta.url)),
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
})
