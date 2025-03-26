import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../context/CartContext";

import "bootstrap/dist/css/bootstrap.min.css";

const formatCurrency = (amount, currency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

const CartDropdown = ({ buttonClass = "btn btn-outline-secondary", buttonStyle = {} }) => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const cartRef = useRef(null);

  return (
    <div className="nav-item dropdown me-4" ref={cartRef}>
      <button
        className={`${buttonClass} dropdown-toggle position-relative`}
        style={buttonStyle}
        id="cartDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
        {cart.length > 0 && (
          <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
            {cart.length}
          </span>
        )}
      </button>

      <ul className="dropdown-menu dropdown-menu-end p-3" aria-labelledby="cartDropdown">
        <li className="dropdown-header"><strong>Your Cart</strong></li>
        {cart.length === 0 ? (
          <li className="dropdown-item text-center">Your cart is empty.</li>
        ) : (
          cart.map((item) => (
            <li key={item.id} className="dropdown-item">
              <div className="d-flex align-items-start">
                <img src={item.image} alt={item.name} style={{ width: "40px", height: "40px", marginRight: "10px" }} />
                <div className="flex-grow-1">
                  <span className="d-block text-muted small">{item.name}</span>
                  <small className="d-block text-muted">Qty: {item.quantity}</small>
                </div>
                <span className="text-muted small text-end" style={{ minWidth: "60px" }}>{formatCurrency(item.price, item.currency)}</span>
                <button className="btn btn-outline-danger btn-sm ms-2" onClick={() => removeFromCart(item.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))
        )}
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li className="text-center">
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary btn-sm me-2 flex-grow-1" onClick={() => navigate("/cart")}>View Cart</button>
            <button className="btn btn-success btn-sm flex-grow-1" onClick={() => navigate("/checkout")}>Checkout</button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CartDropdown;
