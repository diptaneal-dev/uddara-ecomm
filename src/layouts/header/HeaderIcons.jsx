import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import styled, { useTheme } from 'styled-components';

import {
  useAuth,
  useUser,
  LoginModal,
  UserProfileMenu,
  useUserProfileMenuConfig,
} from 'react-vector';
import LoginModalPortal from './LoginModalPortal';
import { CartContext } from '../../context/CartContext';

// 🔽 Inline styles here
const IconsRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white};
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};

    svg {
      transform: scale(1.2);
    }
  }

  svg {
    transition: transform 0.2s ease;
  }
`;

const CartIconWrapper = styled(IconButton)`
  position: relative;
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: ${({ theme }) => theme.colors.gold};
  color: black;
  font-size: 12px;
  font-weight: bold;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

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
      {/* Favorites */}
      <IconButton onClick={() => navigate('/favorites')} aria-label="Favorites">
        <FontAwesomeIcon icon={faHeart} />
      </IconButton>

      {/* Cart with badge */}
      <CartIconWrapper onClick={() => navigate('/cart')} aria-label="Cart">
        <FontAwesomeIcon icon={faShoppingCart} />
        {cartItemCount > 0 && <CartBadge>{cartItemCount}</CartBadge>}
      </CartIconWrapper>

      {/* User profile menu OR login button */}
      {isAuthenticated ? (
        <UserProfileMenu
          shape="circle"
          menuItems={menuItems}
          menuStyles={menuStyles}
        />
      ) : (
        <IconButton onClick={() => setShowLoginModal(true)} aria-label="Login">
          <FontAwesomeIcon icon={faUser} />
        </IconButton>
      )}

      {/* Login modal */}
      <LoginModalPortal show={showLoginModal} onClose={() => setShowLoginModal(false)} />

    </IconsRow>
  );
};

export default HeaderIcons;
