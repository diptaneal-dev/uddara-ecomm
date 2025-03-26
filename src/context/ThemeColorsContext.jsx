export const ThemeColorsProvider = ({ children }) => {
    const theme = useTheme();
    const darkMode = theme?.darkMode ?? false; // ✅ Ensures darkMode always has a boolean value
  
    if (theme === undefined) {
      console.warn("⚠️ ThemeProvider is missing. Using default colors.");
    }
  
    const colors = {
      headerBackground: darkMode ? "#1c1c1c" : "#2E4F35",
      headerTextColor: darkMode ? "#ffffff" : "#555",
      footerBackground: darkMode ? "#2E4F35" : "#F1F8EE",
      footerTextColor: darkMode ? "#D3E0D5" : "#2E4F35",
    };
  
    console.log("🎨 ThemeColorsProvider -> darkMode:", darkMode, "Colors:", colors); // ✅ Debugging Log
  
    return (
      <ThemeColorsContext.Provider value={colors}>
        {children}
      </ThemeColorsContext.Provider>
    );
  };
  