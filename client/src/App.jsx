import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminLayout from './components/AdminLayout'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import ShippingPage from './pages/ShippingPage'
import PaymentPage from './pages/PaymentPage'
import PlaceOrderPage from './pages/PlaceOrderPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProductList from './pages/admin/ProductList'
import UserList from './pages/admin/UserList'
import OrderList from './pages/admin/OrderList'
import ReviewList from './pages/admin/ReviewList'
import ProductEditPage from './pages/admin/ProductEditPage'
import ProfilePage from './pages/ProfilePage'
import OrderPage from './pages/OrderPage'

const adminRoutes = ['/admin/dashboard', '/admin/products', '/admin/orders', '/admin/users', '/admin/reviews', '/admin/product']

function App() {
    const location = useLocation()
    const isAdminPanel = adminRoutes.some((r) => location.pathname.startsWith(r))

    return isAdminPanel ? (
        <AdminLayout>
            <Routes>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<ProductList />} />
                <Route path="/admin/orders" element={<OrderList />} />
                <Route path="/admin/users" element={<UserList />} />
                <Route path="/admin/reviews" element={<ReviewList />} />
                <Route path="/admin/product/:id/edit" element={<ProductEditPage />} />
                <Route path="/admin/product/create" element={<ProductEditPage />} />
            </Routes>
        </AdminLayout>
    ) : (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/admin/login" element={<LoginPage />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/shipping" element={<ShippingPage />} />
                    <Route path="/placeorder" element={<PlaceOrderPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/order/:id" element={<OrderPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App
