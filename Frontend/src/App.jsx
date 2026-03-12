import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

// Global Components
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

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

// Admin & Auth
import AdminLayout from "./pages/Admin/AdminLayout";
import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/Signup";
import AuthLayout from "./pages/Auth/AuthLayout";

function AppContent() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/" || 
    location.pathname.startsWith("/admin") || 
    location.pathname.startsWith("/auth");

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Userintercationpage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/shop" element={<Shoppage />} />
        <Route path="/collections" element={<CollectionPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/care" element={<CarePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrderHistory />} />

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

        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
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