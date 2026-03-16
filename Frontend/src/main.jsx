import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/cartContext.jsx";
import { Toaster } from "react-hot-toast"; // 1. Import Toaster
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
      <Toaster 
        position="top-right"
        toastOptions={{
          // Global styling for Luxe & Loom
          style: {
            background: '#0c0c0c',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            fontSize: '10px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderRadius: '2px',
          },
          success: {
            iconTheme: {
              primary: '#eab308', // Yellow accent
              secondary: '#000',
            },
          },
        }}
      />
      <StrictMode>
        <App />
      </StrictMode>
    </CartProvider>
  </AuthProvider>,
);