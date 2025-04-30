import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faBookmark, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/CartContext';
import {
  PageWrapper,
  Heading,
  CartItem,
  CartActionTray,
  SummaryBox,
  StickyBar,
} from './Cart.styles';
import { Button } from '../../components/Button/Button';

const formatCurrency = (amount, currency) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);

const Cart = () => {
  const { cart, addToCart, removeFromCart, deleteFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { saveForLater } = useContext(CartContext);

  const handleSaveForLater = (item) => {
    saveForLater(item); 
    removeFromCart(item.id);
    toast.info(`${item.name} saved for later.`);
  };

  console.log("Cart INBOUND is:", cart);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loadingItemId, setLoadingItemId] = useState(null);

  const cartCurrency = cart[0]?.currency || 'INR';

  const increaseQuantity = (productId) => {
    const item = cart.find((i) => i.productId === productId);
    if (item) {
      setLoadingItemId(productId);
      addToCart(item);
      setTimeout(() => setLoadingItemId(null), 300);
    }
  };

  const decreaseQuantity = (productId) => {
    removeFromCart(productId);
  };

  const handleApplyPromo = () => {
    if (promoCode === 'SAVE10') {
      setDiscount(10);
      toast.success('Promo code applied!');
    } else {
      setDiscount(0);
      toast.error('Invalid promo code');
    }
  };

  const totals = cart.reduce((acc, item) => {
    acc[item.currency] = (acc[item.currency] || 0) + item.price * item.quantity;
    return acc;
  }, {});

  const totalAmount = Object.values(totals).reduce((a, b) => a + b, 0);
  const finalTotal = totalAmount - discount;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout', {
      state: { cartItems: cart, totalAmount: finalTotal, discount, currency: cartCurrency },
    });
  };

  return (
    <PageWrapper>
      <Heading>My Cart</Heading>

      {cart.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: '#444',
              }}
            >
              🛒 Your cart is empty
            </p>
            <p style={{ fontSize: '1rem', color: '#888' }}>
              Looks like you haven't added anything yet.
            </p>
          </div>

          <div style={{ width: '100%', maxWidth: '250px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Button $variant="secondary" onClick={() => navigate('/products')}>
              Browse Products
            </Button>
            <Button $variant="outline" onClick={() => navigate('/favorites')}>
              View Wishlist
            </Button>
          </div>
        </div>
      ) : (
        <div className="row">

          <div className="col-lg-8">
            {cart.map((item) => (
              <CartItem key={item.id}>
                <div className="col-3">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="details col-9">
                  <h5>{item.name}</h5>
                  <p>{item.description}</p>

                  <CartActionTray>
                    {/* Decrease */}
                    <Button
                      $variant="iconSquare"
                      $size="squareMd"
                      $outline
                      title="Decrease quantity"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </Button>

                    {/* Quantity Text */}
                    <span className="quantity-text">{item.quantity}</span>

                    {/* Increase */}
                    <Button
                      $variant="iconSquare"
                      $size="squareMd"
                      title="Increase quantity"
                      $outline
                      onClick={() => increaseQuantity(item.id)}
                      disabled={loadingItemId === item.id}
                    >
                      {loadingItemId === item.id ? (
                        <span className="spinner-border spinner-border-sm" />
                      ) : (
                        <FontAwesomeIcon icon={faPlus} />
                      )}
                    </Button>

                    {/* Remove */}
                    <div className="action" style={{ float: "right", marginLeft: "40px" }}>
                    <Button
                        $variant="iconSquare"
                        $size="squareSm"
                        title="Remove item"
                        onClick={() => deleteFromCart(item.id)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </div>

                    {/* Save */}
                    <div className="action">
                      <Button
                        $variant="iconSquare"
                        $size="squareSm"
                        title="Save for later"
                        onClick={() => handleSaveForLater(item)}
                      >
                        <FontAwesomeIcon icon={faBookmark} />
                      </Button>
                    </div>
                  </CartActionTray>

                  <p className="price">{formatCurrency(item.price, item.currency)}</p>
                </div>
              </CartItem>
            ))}
          </div>

          <div className="col-lg-4">
            <SummaryBox>
              <h4>Cart Summary</h4>
              <div className="line">
                <span>Subtotal ({totalItems} items):</span>
                <span>{formatCurrency(totalAmount, cartCurrency)}</span>
              </div>
              <div className="line">
                <span>Discount:</span>
                <span>{formatCurrency(discount, cartCurrency)}</span>
              </div>
              <div className="promo">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button size="sm" onClick={handleApplyPromo}>
                  Apply
                </Button>
              </div>
              <p className="final-total">
                You Pay: {formatCurrency(finalTotal, cartCurrency)}
              </p>
              <Button $variant="secondary" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </SummaryBox>
          </div>
        </div>
      )}

      {/* Mobile Only Summary Bar */}
      {cart.length > 0 && (
        <StickyBar className="d-lg-none">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <strong>Total:</strong>
            <span>{formatCurrency(finalTotal, cartCurrency)}</span>
          </div>
          <Button $variant="primary" onClick={handleCheckout}>
            Checkout
          </Button>
        </StickyBar>
      )}
    </PageWrapper>
  );
};

export default Cart;
