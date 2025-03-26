import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const formatCurrency = (amount, currency) => {
  if (!amount || isNaN(amount)) amount = 0;
  if (!currency) currency = "INR";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

const OrderReviewTable = ({
  cartItems = [],
  totalAmount = 0,
  shippingCost = 0,
  dutiesAndTaxes = 0,
  orderDiscount = 0,
  currency = "INR",
  totalSavings = 0, // ✅ Added total savings parameter
}) => {
  const { darkMode } = useTheme();
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side render before applying theme class
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ Calculate Total Number of Items in Cart
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="order-review-table">
      <table
        className={`table ${isClient ? (darkMode ? "table-dark" : "table-light") : ""}`}
        style={{ borderCollapse: "collapse", border: "none" }} // ✅ Remove all table borders except above Order Total
      >
        <tbody>
          <tr style={{ borderBottom: "none" }}>
            <td style={{ border: "none" }}>Subtotal</td>
            <td className="text-right" style={{ border: "none" }}>
              {formatCurrency(totalAmount, currency)}
            </td>
          </tr>
          <tr style={{ borderBottom: "none" }}>
            <td style={{ border: "none" }}>Shipping ({itemCount} items)</td>
            <td className="text-right" style={{ border: "none" }}>
              {shippingCost === 0 ? "Free" : formatCurrency(shippingCost, currency)}
            </td>
          </tr>
          <tr style={{ borderBottom: "none" }}>
            <td style={{ border: "none" }}>Estimated Tax</td>
            <td className="text-right" style={{ border: "none" }}>
              {formatCurrency(dutiesAndTaxes, currency)}
            </td>
          </tr>
          {orderDiscount !== 0 && (
            <tr style={{ borderBottom: "none" }}>
              <td style={{ border: "none" }}>Order Discount</td>
              <td className="text-right text-success" style={{ border: "none" }}>
                {formatCurrency(-orderDiscount, currency)}
              </td>
            </tr>
          )}
          {/* ✅ Add a border only above Order Total */}
          <tr style={{ borderTop: "1px solid #ccc" }}>
            <td style={{ border: "none", paddingTop: "10px" }}>
              <h3 className="total-label">
                <strong>Order Total</strong>
              </h3>
            </td>
            <td className="text-right" style={{ border: "none", paddingTop: "10px" }}>
              <h3 className="total-amount">
                <strong>
                  {formatCurrency(totalAmount + shippingCost + dutiesAndTaxes - orderDiscount, currency)}
                </strong>
              </h3>
            </td>
          </tr>
          {totalSavings > 0 && (
            <tr style={{ borderBottom: "none" }}>
              <td colSpan="2" className="text-center text-success" style={{ border: "none" }}>
                <strong>You saved {formatCurrency(totalSavings, currency)}!</strong>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderReviewTable;
