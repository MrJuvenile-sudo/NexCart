import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Providers
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import Toast from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import AdminModal from './components/AdminModal';
import PromoPopupModal from './components/PromoPopupModal';
import AuthModal from './components/AuthModal';
import ErrorBoundary from './components/ErrorBoundary';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import WishlistPage from './pages/WishlistPage';
import AdminPage from './pages/AdminPage';
import FAQPage from './pages/FAQPage';
import ContactUs from './pages/ContactUs.jsx';
import DealsPage from './pages/DealsPage';
import TrackOrderPage from './pages/TrackOrderPage';
import GiftCardsPage from './pages/GiftCardsPage';
import SupportPage from './pages/SupportPage';
import ShippingReturns from './pages/ShippingReturns.jsx';
import HelpSupport from './pages/HelpSupport.jsx';
import MyAccount from './pages/MyAccount.jsx';
import SavedWishlist from './pages/SavedWishlist.jsx';
import CustomerSupport from './pages/CustomerSupport.jsx';
import OrderTracking from './pages/OrderTracking.jsx';
import DownloadApp from './pages/DownloadApp.jsx';
import NotFoundPage from './pages/NotFoundPage';

// Styles
import './styles/main.css';
import './styles/auth.css';

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <div className="app-container">
              <Navbar />
              <div className="app-main-content">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/product/:id" element={<ProductDetailsPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/cart" element={<ProtectedRoute element={<CartPage />} />} />
                  <Route path="/checkout" element={<ProtectedRoute element={<CheckoutPage />} />} />
                  <Route path="/order-success/:id" element={<ProtectedRoute element={<OrderSuccessPage />} />} />
                  <Route path="/orders" element={<ProtectedRoute element={<OrdersPage />} />} />
                  <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} />} />
                  <Route path="/offers" element={<DealsPage />} />
                  <Route path="/track" element={<TrackOrderPage />} />
                  <Route path="/gift-cards" element={<GiftCardsPage />} />
                  <Route path="/support" element={<SupportPage />} />
<Route path="/order-tracking" element={<OrderTracking />} />
<Route path="/shipping-returns" element={<ShippingReturns />} />
<Route path="/help-support" element={<HelpSupport />} />
<Route path="/my-account" element={<MyAccount />} />
<Route path="/saved-wishlist" element={<SavedWishlist />} />
<Route path="/customer-support" element={<CustomerSupport />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/download-app" element={<DownloadApp />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </div>
              <Footer />
              <CartDrawer />
              <QuickViewModal />
              <AdminModal />
              <PromoPopupModal />
              <AuthModal />
              <Toast />
            </div>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}
