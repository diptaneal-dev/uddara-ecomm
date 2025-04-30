import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

import StoreSwitcherIcon from "./StoreSwitcher";
import { IconsRow, IconButton, CartIconWrapper, CartBadge } from "./HeaderLayout.styles";
import { CartContext } from "../../context/CartContext";
import { useTheme } from 'styled-components';

// 🔐 Auth Imports from react-vector
import {
  useAuth,
  useUser,
  LoginModal,
  UserProfileMenu,
  useUserProfileMenuConfig,
} from 'react-vector';

const HeaderIcons = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const { cart } = useContext(CartContext) || { cart: [] };
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const { isAuthenticated, user } = useUser();
  const { login } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { menuItems, menuStyles } = useUserProfileMenuConfig({
    user,
    flags: {
      includeWishlist: true,
      includeFavorites: true,
      includeCart: false,
    },
  });

  useEffect(() => {
    if (isAuthenticated) setShowLoginModal(false);
  }, [isAuthenticated]);

  return (
    <IconsRow>
      {/* ✅ Store switcher */}
      {isAuthenticated && user?.stores?.length > 1 && (
        <StoreSwitcherIcon stores={user.stores} />
      )}

      {/* ❤️ Favorites */}
      <IconButton onClick={() => navigate("/favorites")}>
        <FontAwesomeIcon icon={faHeart} />
      </IconButton>

      {/* 🛒 Cart with badge */}
      <CartIconWrapper onClick={() => navigate("/cart")}>
        <FontAwesomeIcon icon={faShoppingCart} />
        {cartItemCount > 0 && <CartBadge>{cartItemCount}</CartBadge>}
      </CartIconWrapper>

      {/* 👤 User/Login/Profile */}
      {isAuthenticated ? (
        <UserProfileMenu
          shape="circle"
          menuItems={menuItems}
          menuStyles={menuStyles}
        />
      ) : (
        <IconButton onClick={() => setShowLoginModal(true)}>
          <FontAwesomeIcon icon={faUser} />
        </IconButton>
      )}

      {/* 🔐 Login modal */}
      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        zIndex={9999}
        adapter="oauth"
        logo={
          <img
            src="/images/Uddara_logo.png"
            alt="Uddara"
            style={{ maxWidth: 160 }}
          />
        }
        providers={['google', 'microsoft']}
      />
    </IconsRow>
  );
};

export default HeaderIcons;
