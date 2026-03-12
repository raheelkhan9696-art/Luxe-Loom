import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

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

function App() {
  return (
    <Router>

      {/* Navbar appears on all pages */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Userintercationpage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/shop" element={<Shoppage />} />
        <Route path="/collections" element={<CollectionPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/care" element={<CarePage />} />
        <Route path="/orders" element={<OrderHistory />} />

      </Routes>

      {/* Footer appears on all pages */}
      <Footer />

    </Router>
  );
}

export default App;