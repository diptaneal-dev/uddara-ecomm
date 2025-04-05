import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider } from "./context/ThemeContext";

import { CartProvider } from "./context/CartContext";
import { UserProvider, useUserContext } from "./hooks/UserContext";
import FavoriteProvider from "./components/FavouriteButton/FavouriteContext";
import { ToastContainer } from "react-toastify";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Razorpay script loader (for better Vite compatibility)
const RazorpayScript = () => {
  useEffect(() => {
    const scriptId = "razorpay-checkout-js";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return null;
};

// ✅ AppWrapper should receive full provider tree
const AppWrapper = () => {
  return (
    <UserProvider>
      <CartProvider>
        <FavoriteProvider>
          <ThemeProvider>
            <StyledThemeProvider theme={theme}>
              <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <ToastContainer position="top-right" autoClose={3000} />
                <RazorpayScript />
                <App />
              </BrowserRouter>
            </StyledThemeProvider>
          </ThemeProvider>
        </FavoriteProvider>
      </CartProvider>
    </UserProvider>
  );
};

// ✅ Vite-compatible root rendering
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
