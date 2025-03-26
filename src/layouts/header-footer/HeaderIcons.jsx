import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import UserProfileDropdown from "../userprofile/UserProfileDropdown";
import { IconsWrapper, IconButton, CartIconWrapper, CartBadge } from "./HeaderIcons.styles";
import { CartContext } from "../../context/CartContext";

const HeaderIcons = ({ isAuthenticated, user }) => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext) || { cart: [] };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0); // ✅ Calculate total quantity

  return (
    <IconsWrapper>
      <IconButton onClick={() => navigate("/favorites")}>
        <FontAwesomeIcon icon={faHeart} />
      </IconButton>

      <CartIconWrapper onClick={() => navigate("/cart")}>
        <FontAwesomeIcon icon={faShoppingCart} />
        {cartItemCount > 0 && <CartBadge>{cartItemCount}</CartBadge>}
      </CartIconWrapper>

      {isAuthenticated ? (
        <UserProfileDropdown user={user} />
      ) : (
        <IconButton onClick={() => navigate("/signin")}>
          <FontAwesomeIcon icon={faUser} />
        </IconButton>
      )}
    </IconsWrapper>
  );
};

export default HeaderIcons;
