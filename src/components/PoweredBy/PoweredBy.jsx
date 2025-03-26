import React from "react";
import { useTheme } from "../../../context/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";

const PoweredBy = ({ text = "Powered by", brand = "BayBLabs", url = "https://www.bayofbangalore.com", className = "" }) => {
  const { darkMode } = useTheme();

  return (
    <div 
      className={`text-center py-3 ${darkMode ? "bg-secondary text-light" : "bg-dark text-light"} ${className}`} 
      role="contentinfo"
    >
      {text}{" "}
      <a 
        href={url} 
        className="fw-bold text-warning text-decoration-none"
        target="_blank" 
        rel="noopener noreferrer"
      >
        {brand}
      </a>
    </div>
  );
};

export default PoweredBy;
