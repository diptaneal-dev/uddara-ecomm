import React, { createContext, useState, useEffect, useContext } from "react";
import { useUserContext } from '../hooks/UserContext';

// Create Context
export const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useUserContext(); // ✅ Check user authentication
  
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on mount (user-specific persistence)
    const storedCart = localStorage.getItem("user_cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cart to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("user_cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart (adjusts quantity if item already exists)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      let updatedCart;
      
      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1, currency: product.currency }];
      }

      // 🔹 Immediately update localStorage
      localStorage.setItem("user_cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Remove item from cart (reduce quantity or remove if last one)
  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      let updatedCart;

      if (existingItem.quantity > 1) {
        updatedCart = prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        updatedCart = prevCart.filter((item) => item.id !== productId);
      }

      // 🔹 Immediately update localStorage
      localStorage.setItem("user_cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  // Clear cart after successful checkout
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("user_cart");
  };
  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
