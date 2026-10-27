import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CartProvider } from "./cart/CartContext.tsx"
import { Layout } from "./components/Layout.tsx"
import { CartPage } from "./pages/CartPage.tsx"
import { ConfirmationPage } from "./pages/ConfirmationPage.tsx"
import { ContactPage } from "./pages/ContactPage.tsx"
import { HomePage } from "./pages/HomePage.tsx"
import { NotFoundPage } from "./pages/NotFoundPage.tsx"
import { PolicyPage } from "./pages/PolicyPage.tsx"
import { OrderPage } from "./pages/OrderPage.tsx"
import { ProductPage } from "./pages/ProductPage.tsx"
import { ShopPage } from "./pages/ShopPage.tsx"
import { StoryPage } from "./pages/StoryPage.tsx"

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="story" element={<StoryPage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="shop/:slug" element={<ProductPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="order" element={<OrderPage />} />
            <Route path="order/confirmation" element={<ConfirmationPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="policies/:slug" element={<PolicyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
