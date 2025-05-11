import React, { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../../../../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../../../../components/Button/Button';
import { X } from 'lucide-react';

// Header
const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

// Sidebar wrapper
const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  right: ${({ visible }) => (visible ? '0' : '-400px')};
  width: 360px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 12px rgba(0,0,0,0.1);
  transition: right 0.3s ease-in-out;
  z-index: 1000;
  display: flex;
  flex-direction: column;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

// Scrollable content area
const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
`;

// Close button
const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text || '#333'};

  &:hover {
    color: ${({ theme }) => theme.colors.primary || '#007bff'};
  }
`;

// Cart item layout
const CartItem = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.25rem;

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
  }

  .details {
    flex: 1;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`;

// Summary box pinned to bottom
const Summary = styled.div`
  border-top: 1px solid #ddd;
  padding: 1rem;
`;

const CartSidebar = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    deleteFromCart,
    sidebarVisible,
    setSidebarVisible,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const currency = cart[0]?.currency || 'INR';
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount);

  return (
    <SidebarWrapper visible={sidebarVisible}>
      <SidebarHeader>
        <h4 style={{ marginBottom: '1rem' }}>🛒 Your Cart</h4>
        <CloseButton onClick={() => setSidebarVisible(false)} aria-label="Close sidebar">
          <X size={20} />
        </CloseButton>
      </SidebarHeader>

      <ScrollableContent>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <CartItem key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="details">
                <strong>{item.name}</strong>
                <div>{formatCurrency(item.price)}</div>
                <div className="actions">
                  <Button
                    $variant="iconSquare"
                    $size="squareSm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    $variant="iconSquare"
                    $size="squareSm"
                    onClick={() => addToCart(item)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                  <Button
                    $variant="iconSquare"
                    $size="squareSm"
                    onClick={() => deleteFromCart(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              </div>
            </CartItem>
          ))
        )}
      </ScrollableContent>

      {cart.length > 0 && (
        <Summary>
          <p><strong>Total:</strong> {formatCurrency(total)}</p>
          <Button
            $variant="primary"
            fullWidth
            onClick={() => {
              setSidebarVisible(false);
              navigate('/checkout');
            }}
          >
            Proceed to Checkout
          </Button>
        </Summary>
      )}
    </SidebarWrapper>
  );
};

export { CartSidebar };
