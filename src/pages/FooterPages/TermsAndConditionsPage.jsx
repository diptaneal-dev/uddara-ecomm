import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "../../context/ThemeContext";

const TermsAndConditionsPage = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`container mt-4 py-4 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <h2 className="text-center mb-4">Terms and Conditions</h2>
      <p>Welcome to BayBLabs. These terms and conditions outline the rules and regulations for the use of our website and services.</p>
      <h4>1. Introduction</h4>
      <p>By accessing or using our services, you agree to comply with these terms.</p>
      <h4>2. Intellectual Property Rights</h4>
      <p>All content on this website, including text, graphics, logos, and images, is the property of BayBLabs and is protected by applicable copyright and trademark laws.</p>
      <h4>3. User Conduct</h4>
      <p>Users must not engage in unlawful activities, post offensive content, or violate any applicable laws while using our services.</p>
      <h4>4. Limitation of Liability</h4>
      <p>BayBLabs shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or services.</p>
      <h4>5. Changes to Terms</h4>
      <p>We reserve the right to modify these terms at any time. Users will be notified of significant changes via email or website announcements.</p>
    </div>
  );
};

export default TermsAndConditionsPage;
