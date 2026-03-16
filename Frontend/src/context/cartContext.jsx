import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on startup
  useEffect(() => {
    const savedCart = localStorage.getItem("luxeCart");
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("luxeCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity, size) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item._id === product._id && item.selectedSize === size
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity, selectedSize: size }];
    });
  };

  const removeFromCart = (id, size) => {
    setCartItems((prev) => prev.filter((item) => !(item._id === id && item.selectedSize === size)));
  };

  const clearCart = () => setCartItems([]);

  // Billing Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 200; // Free shipping over 5k
  const total = subtotal + shipping;

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, removeFromCart, clearCart, 
      subtotal, shipping, total 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);