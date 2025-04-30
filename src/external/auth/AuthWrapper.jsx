import React from "react";
import { AuthProvider, UserProvider } from "react-vector";

const apiBaseUrl = import.meta.env.VITE_AUTH_API;

export default function AuthWrapper({ children }) {
  console.log("[AuthWrapper] apiBaseUrl:", apiBaseUrl);

  return (
    <UserProvider apiBaseUrl={apiBaseUrl}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </UserProvider>
  );
}
