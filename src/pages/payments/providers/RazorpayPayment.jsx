import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../hooks/UserContext";
import { toast } from "react-toastify";
import { CartContext } from "../../../context/CartContext";
import paymentService from "../../../services/PaymentService";

const RazorpayPayment = ({ amount, currency, cartItems, paymentMethod }) => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  
  const { clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Capture errors

  // Load Razorpay script dynamically
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve, reject) => {
        if (window.Razorpay) {
          resolve(window.Razorpay);
          return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => resolve(window.Razorpay);
        script.onerror = () => reject(new Error("Failed to load Razorpay script"));

        document.body.appendChild(script);
      });
    };

    loadRazorpayScript().catch((error) => {
      console.error(error.message);
      setError("Payment service is currently unavailable.");
    });
  }, []);

  // Handle payment
  const handlePayment = async (event) => {
    event.preventDefault();

    if (!window.Razorpay) {
      setError("Payment gateway not available. Please refresh and try again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch `order_id` from `paymentService`
      const orderId = await paymentService.createOrder(amount, currency);
      if (!orderId) {
        setLoading(false);
        setError("Failed to generate order. Please try again.");
        return;
      }
      
      console.log(" Amount: ", amount, " currency: ", currency, " order_id:", orderId);

      const options = {
        key: "rzp_test_A4D8R9wJzdqV4h", // Razorpay test key
        amount: amount * 100, // Convert to paise
        currency: currency || "INR",
        order_id: orderId, // Use backend-generated order_id
        name: "BayBLabs",
        description: "Order Payment",
        image: "https://bayofbangalore.com/wp-content/uploads/2023/06/SITE-LOGO.png",
        handler: async function (response) {
          toast.success("Payment Successful!");
          console.log("Payment Received Response from razorPay", response);

          // Process Payment in Backend
          const paymentResponse = await paymentService.processPayment({
            transactionId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            amount,
            currency,
            provider: "Razorpay",
            status: "SUCCESS",
            initiator: user?.username,
            transactionDateTime: new Date().toISOString() // Send current timestamp
          });

          console.log("Payment Received Response from backend", paymentResponse);

          if (!paymentResponse) {
            toast.error("Payment processing failed on backend. Contact support.");
            return;
          }

          clearCart(); // Clear cart after successful payment

          // Redirect to order confirmation
          navigate("/order-confirmation", {
            state: {
              cartItems,
              totalAmount: amount,
              currency,
              paymentMethod: paymentMethod || "Razorpay",
              paymentStatus: "success",
              paymentId: response.razorpay_payment_id,
            },
          });
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "BayBLabs Corporate Office",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);

      // ✅ Handle payment failures
      rzp.on("payment.failed", function (response) {
        toast.error("Payment Failed!");
        setError(`Payment failed: ${response.error.description}`);
      });

      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      setError("❌ Payment process failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      <button onClick={handlePayment} className="btn btn-primary" disabled={loading}>
        {loading ? "Processing..." : "Pay with Razorpay"}
      </button>
    </div>
  );
};

export default RazorpayPayment;
