import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../../context/ThemeContext";

const CookiePolicyPage = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`container mt-4 py-4 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <h2 className="text-center mb-4">Cookie Policy</h2>
      <h4>1. What Are Cookies?</h4>
      <p>Cookies are small files stored on your device that help improve user experience by remembering preferences and login details.</p>
      <h4>2. How We Use Cookies</h4>
      <ul>
        <li>To provide a personalized experience</li>
        <li>To analyze site traffic and usage</li>
        <li>To enhance website functionality</li>
      </ul>
      <h4>3. Managing Cookies</h4>
      <p>Users can control cookie preferences through browser settings. Disabling cookies may impact certain website functionalities.</p>
      <h4>4. Changes to This Policy</h4>
      <p>We may update this Cookie Policy periodically. Users are encouraged to review it regularly.</p>
    </div>
  );
};

export default CookiePolicyPage;
