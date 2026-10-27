import { Outlet } from "react-router-dom"
import { Footer } from "./Footer.tsx"
import { Header } from "./Header.tsx"
import { PreFooterBanner } from "./PreFooterBanner.tsx"

export function Layout() {
  return (
    <>
      <a className="skip" href="#content">
        Skip to content
      </a>
      <Header />
      <main id="content" className="site-main">
        <Outlet />
      </main>
      <PreFooterBanner />
      <Footer />
    </>
  )
}
