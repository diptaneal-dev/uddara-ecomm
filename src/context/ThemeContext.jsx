import React, { createContext, useState, useContext, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css"; 

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Get theme from localStorage or default to false (light mode)
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("theme")) || false;
  });

  // Apply the theme class to <body> on theme change
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-dark", "text-white");
      document.body.classList.remove("bg-light", "text-dark");
    } else {
      document.body.classList.add("bg-light", "text-dark");
      document.body.classList.remove("bg-dark", "text-white");
    }

    // Save theme preference in localStorage
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  // Toggle function
  const toggleTheme = () => setDarkMode((prevMode) => !prevMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
