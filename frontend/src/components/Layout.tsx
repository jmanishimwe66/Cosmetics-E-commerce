import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Footer } from "./Footer.tsx"
import { Header } from "./Header.tsx"
import { PreFooterBanner } from "./PreFooterBanner.tsx"

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

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
