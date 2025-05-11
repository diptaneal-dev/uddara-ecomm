import React from "react";
import { ReactVectorProvider, registerAuthAdapter, createOAuthAdapter } from "react-vector";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./hooks/UserContext";
import FavoriteProvider from "./components/FavouriteButton/FavouriteContext";
import AuthWrapper from "./external/auth/AuthWrapper";
import { clientTheme } from './theme/clientTheme';

// 🌐 Environment config
const apiBase = import.meta.env.VITE_AUTH_API;
const mode = import.meta.env.MODE;

console.log("🔐 Uddara Auth Adapter Config:", {
  apiBaseUrl: apiBase,
  mode,
});

// ✅ Register the auth adapter
registerAuthAdapter(
  createOAuthAdapter({
    apiBaseUrl: apiBase,
    mode,
  })
);

export const AppProviders = ({ children }) => {
  return (
    <ReactVectorProvider theme={clientTheme}>
      <ThemeProvider>
        <UserProvider>
          <CartProvider>
            <FavoriteProvider>
              <AuthWrapper>
                {children}
              </AuthWrapper>
            </FavoriteProvider>
          </CartProvider>
        </UserProvider>
      </ThemeProvider>
    </ReactVectorProvider>
  );
};
