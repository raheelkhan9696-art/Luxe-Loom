import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

// Global Components
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import ProtectedRoute from "./auth/ProtectedRoute"; // Import your new guard

// Public Pages
import Userintercationpage from "./pages/Userintercationpage";
import Homepage from "./pages/Homepage";
import AboutUs from "./pages/AboutUs";
import CollectionPage from "./pages/Collectionpage";
import Shoppage from "./pages/Shoppage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductPage from "./pages/ProductPage";
import ContactPage from "./pages/ContactPage";
import OrderHistory from "./pages/OrderHistory";
import CarePage from "./pages/CarePage";
import NotFound from "./pages/NotFound";
import CartPage from "./pages/CartPage";

// Admin & Auth
import AdminLayout from "./pages/Admin/AdminLayout";
import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/Signup";
import AuthLayout from "./pages/Auth/AuthLayout";

function AppContent() {
  const location = useLocation();

  const publicPaths = [
    "/home", "/about", "/shop", "/collections", 
    "/product", "/contact", "/care", "/checkout", 
    "/orders", "/cart"
  ];

  const hideLayout =
    location.pathname === "/" || 
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/auth") ||
    !publicPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        {/* --- ENTRY POINT --- */}
        <Route path="/" element={<Userintercationpage />} />
        
        {/* --- PUBLIC SUITE --- */}
        <Route path="/home" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/shop" element={<Shoppage />} />
        <Route path="/collections" element={<CollectionPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/care" element={<CarePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductPage />} />

        {/* --- PROTECTED CUSTOMER SUITE --- */}
        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          } 
        />

        {/* --- AUTHENTICATION SUITE --- */}
        <Route path="/auth">
          <Route index element={<Navigate to="/auth/login" replace />} />
          <Route 
            path="login" 
            element={
              <AuthLayout title="Identity" subtitle="Secure Access to Admin Suite">
                <LoginPage />
              </AuthLayout>
            } 
          />
          <Route 
            path="signup" 
            element={
              <AuthLayout title="Onboarding" subtitle="Create Administrative Credentials">
                <SignupPage />
              </AuthLayout>
            } 
          />
        </Route>

        {/* --- ADMINISTRATIVE SUITE (Admin Only) --- */}
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout />
            </ProtectedRoute>
          } 
        />

        {/* --- CATCH-ALL (404) --- */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;