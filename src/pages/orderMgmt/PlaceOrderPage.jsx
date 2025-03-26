import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OrderService from "../../services/OrderService";
import { CartContext } from "../../context/CartContext";
import OrderReviewTable from "./OrderReviewTable";
import RazorpayPayment from "../payments/providers/RazorpayPayment";
import StripePayment from "../payments/providers/StripePayment";
import PayPalPayment from "../payments/providers/PayPalPayment";

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, clearCart } = useContext(CartContext);
  
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  
  const orderId = location.state?.orderId; // Extract orderId from state

  useEffect(() => {
    if (!orderId) {
      setError("Invalid order ID. Please try again.");
      setLoading(false);
      return;
    }

    // Fetch order details from API
    const fetchOrder = async () => {
      try {
        const data = await OrderService.getOrderById(orderId);
        setOrderDetails(data);
      } catch (err) {
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Back</button>

      <h3 className="fw-bold">Choose Payment Method</h3>

      {/* Payment Selection */}
      <div>
        {["Razorpay", "PayPal", "Stripe"].map((method) => (
          <button key={method} className="btn btn-outline-primary m-2" onClick={() => setPaymentMethod(method)}>
            {method}
          </button>
        ))}
      </div>

      {/* Render Payment Form */}
      {paymentMethod === "Razorpay" && <RazorpayPayment amount={orderDetails.totalAmount} currency={orderDetails.currency} onSuccess={() => navigate("/order-confirmation", { state: { orderId } })} />}
      {paymentMethod === "Stripe" && <StripePayment amount={orderDetails.totalAmount} currency={orderDetails.currency} onSuccess={() => navigate("/order-confirmation", { state: { orderId } })} />}
      {paymentMethod === "PayPal" && <PayPalPayment amount={orderDetails.totalAmount} currency={orderDetails.currency} onSuccess={() => navigate("/order-confirmation", { state: { orderId } })} />}

      {/* Order Summary */}
      <OrderReviewTable cartItems={orderDetails.items} totalAmount={orderDetails.totalAmount} currency={orderDetails.currency} />
    </div>
  );
};

export default PlaceOrderPage;
