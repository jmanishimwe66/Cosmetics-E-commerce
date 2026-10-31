import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AdminDashboardPage } from "./admin/DashboardPage.tsx"
import { AdminLayout } from "./admin/AdminLayout.tsx"
import { AdminLoginPage } from "./admin/LoginPage.tsx"
import { AdminOrdersPage } from "./admin/OrdersPage.tsx"
import { AdminProductFormPage } from "./admin/ProductFormPage.tsx"
import { AdminProductsPage } from "./admin/ProductsPage.tsx"
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
          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="products/new" element={<AdminProductFormPage />} />
            <Route path="products/:id" element={<AdminProductFormPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
          </Route>
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
