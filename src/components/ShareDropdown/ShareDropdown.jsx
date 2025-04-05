// components/Product/ShareDropdown.jsx
import React from "react";
import {
  FaShareAlt,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaClipboard,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const ShareDropdown = ({ product, shareContent, productUrl }) => {
  const { darkMode } = useTheme();

  const shareProduct = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: shareContent,
          url: productUrl,
        })
        .then(() => console.log("Product shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      navigator.clipboard.writeText(shareContent);
      alert("Product details copied! Share it on your favorite platform.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(productUrl);
    alert("Product link copied!");
  };

  return (
    <div className="dropdown ms-2 mt-2">
      <div
        className={`d-flex align-items-center justify-content-center dropdown-toggle p-2 rounded-circle shadow ${darkMode ? "bg-secondary text-light" : "bg-dark text-light"}`}
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ cursor: "pointer", width: "42px", height: "42px" }}
      >
        <FaShareAlt size={20} />
      </div>

      <ul
        className={`dropdown-menu dropdown-menu-end p-2 shadow ${darkMode ? "bg-dark text-light border-light" : "bg-light text-dark border-dark"}`}
      >
        <li>
          <button className="dropdown-item d-flex align-items-center" onClick={shareProduct}>
            <FaShareAlt size={16} className="me-2" /> Share Now
          </button>
        </li>
        <li>
          <button className="dropdown-item d-flex align-items-center" onClick={copyToClipboard}>
            <FaClipboard size={16} className="me-2" /> Copy Link
          </button>
        </li>
        <li>
          <button
            className="dropdown-item d-flex align-items-center"
            onClick={() =>
              (window.location.href = `mailto:?subject=Check out this product!&body=${shareContent}`)
            }
          >
            <FaEnvelope size={16} className="me-2" /> Email
          </button>
        </li>
        <li>
          <button
            className="dropdown-item d-flex align-items-center"
            onClick={() =>
              window.open(`https://www.facebook.com/sharer/sharer.php?u=${productUrl}`, "_blank")
            }
          >
            <FaFacebook size={16} className="me-2 text-primary" /> Facebook
          </button>
        </li>
        <li>
          <button
            className="dropdown-item d-flex align-items-center"
            onClick={() =>
              window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareContent)}`, "_blank")
            }
          >
            <FaTwitter size={16} className="me-2 text-info" /> Twitter
          </button>
        </li>
        <li>
          <button
            className="dropdown-item d-flex align-items-center"
            onClick={() =>
              window.open(`https://wa.me/?text=${encodeURIComponent(shareContent)}`, "_blank")
            }
          >
            <FaWhatsapp size={16} className="me-2 text-success" /> WhatsApp
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ShareDropdown;
