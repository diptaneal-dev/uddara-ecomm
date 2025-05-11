import React, { createContext, useState, useEffect } from "react";
import { useUserContext } from "../hooks/UserContext";
import cartService from "../services/CartService";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated, currentStoreId } = useUserContext();
  const userId = user?.userId;
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const [cart, setCart] = useState([]);

  // 🧠 Load cart on auth change
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated && userId) {
        // After getCart(userId)
        const serverCart = await cartService.getCart(userId, currentStoreId);
        const mappedCart = serverCart.items.map((item) => ({
          id: item.productId,
          name: item.productName,
          quantity: item.quantity,
          price: item.price,
          currency: item.currency,
          image: item.image,
          description: item.description
        }));
        setCart(mappedCart);
        console.log("BACKEND Data:", mappedCart);
      } else {
        const stored = localStorage.getItem("user_cart");
        console.log("LOCAL CART is:", stored);
        setCart(stored ? JSON.parse(stored).items : []);
      }
    };

    loadCart();
  }, [isAuthenticated, userId]);

  const toCartItemDTO = (item) => ({
    productId: item.id,
    productName: item.name,
    quantity: item.quantity,
    price: item.price,
    currency: item.currency,
    image: item.image,
    description: item.description
  });

  // ➕ Add to cart
  const addToCart = async (product) => {
    const updated = (() => {
      const existing = cart.find((item) => item.id === product.id);
      if (existing) {
        return cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...cart, { ...product, quantity: 1 }];
      }
    })();

    setCart(updated);
    console.log("User Id is:", userId);

    if (isAuthenticated && userId) {
      console.log("updated data is :", updated);
      console.log("current store id:", currentStoreId);

      await cartService.updateCart(userId, currentStoreId, updated.map(toCartItemDTO));
    } else {
      localStorage.setItem(
        "user_cart",
        JSON.stringify({ userId: null, items: updated })
      );
    }
  };

  const removeFromCart = async (productId) => {
    const updated = (() => {
      const item = cart.find((item) => item.id === productId);
      if (!item) return cart;

      return item.quantity > 1
        ? cart.map((i) =>
          i.id === productId ? { ...i, quantity: i.quantity - 1 } : i
        )
        : cart.filter((i) => i.id !== productId);
    })();

    setCart(updated);

    if (isAuthenticated && userId) {
      await cartService.updateCart(userId, currentStoreId, updated);
    } else {
      localStorage.setItem(
        "user_cart",
        JSON.stringify({ userId: null, items: updated })
      );
    }
  };

  // Delete item completely
  const deleteFromCart = async (productId) => {
    const updated = cart.filter((item) => item.id !== productId);
    setCart(updated);

    if (isAuthenticated && userId) {
      await cartService.updateCart(userId, currentStoreId, updated.map(toCartItemDTO));
    } else {
      if (updated.length === 0) {
        localStorage.removeItem("user_cart");
      } else {
        localStorage.setItem(
          "user_cart",
          JSON.stringify({ userId: null, items: updated })
        );
      }
    }
  };

  // 🗑 Clear cart
  const clearCart = async () => {
    setCart([]);

    if (userId) {
      await cartService.clearCart(userId, currentStoreId);
    } else {
      localStorage.removeItem("user_cart");
    }
  };

  // 🔁 Optional manual sync of guest cart after login
  const syncCart = async () => {
    if (!isAuthenticated || !userId) return;

    const guestCart = JSON.parse(localStorage.getItem("user_cart"))?.items || [];
    if (guestCart.length === 0) return;

    const serverCart = await cartService.getCart(userId, currentStoreId);
    const merged = mergeCarts(serverCart.items, guestCart);

    setCart(merged);
    await cartService.updateCart(userId, currentStoreId, merged);
    localStorage.removeItem("user_cart");
  };

  return (
    <CartContext.Provider
      value=
      {{
        cart,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
        syncCart,
        sidebarVisible,
        setSidebarVisible,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Merge helper
const mergeCarts = (serverItems, guestItems) => {
  const merged = [...serverItems];
  guestItems.forEach((guestItem) => {
    const index = merged.findIndex((item) => item.id === guestItem.id);
    if (index >= 0) {
      merged[index].quantity += guestItem.quantity;
    } else {
      merged.push(guestItem);
    }
  });
  return merged;
};
