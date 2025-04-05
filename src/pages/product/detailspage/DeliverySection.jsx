// components/Product/DeliverySection.jsx
import React from "react";

const DeliverySection = ({ user, pinCode, setPinCode, product, quantity, setQuantity, addToCart, formatCurrency }) => {
  return (
    <div className="border-start border-secondary ps-4" style={{ width: "230px" }}>

      <h5>Delivery & Shipment</h5>

      {!user ? (
        <div>
          <p>Enter Pin Code to check delivery options:</p>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter Pin Code"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
          <button className="btn btn-outline-secondary">Check</button>
        </div>
      ) : (
        <p>Delivery options available for your location.</p>
      )}

      <p><strong>Stock Status:</strong> {product.stock > 0 ? <span className="text-success">In Stock</span> : <span className="text-danger">Out of Stock</span>}</p>

      <div className="mt-3">
        <strong>Choose Quantity:</strong>
        <div className="input-group w-100 mt-1">
          <button className="btn btn-outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
          <input type="text" className="form-control text-center" value={quantity} readOnly />
          <button className="btn btn-outline-secondary" onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
      </div>

      <p className="mt-3"><strong>Final Price:</strong> {formatCurrency(product.price * quantity, product.currency)}</p>
      <button className="btn btn-primary mt-2 w-100" onClick={() => addToCart(product, quantity)}>
        Add to Cart
      </button>
    </div>
  );
};

export default DeliverySection;
