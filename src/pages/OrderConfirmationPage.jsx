import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircleFill, XCircleFill, HouseFill, CreditCardFill, ReceiptCutoff } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    cartItems = [],
    totalAmount = 0,
    currency = "INR",
    paymentMethod = "Unknown",
    paymentStatus = "Pending",
    paymentId = "N/A",
  } = location.state || {};

  const isSuccess = paymentStatus.toLowerCase() === "success";

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "600px", width: "100%" }}>
        <div className="d-flex justify-content-between align-items-center">
          <button
            onClick={() => navigate("/")}
            className="btn btn-primary d-flex align-items-center"
          >
            <HouseFill className="me-2" size={20} /> Back to Home
          </button>
        </div>

        <div className="text-center mt-3">
          {isSuccess ? (
            <CheckCircleFill className="text-success" size={50} />
          ) : (
            <XCircleFill className="text-danger" size={50} />
          )}
          <h2 className={`mt-3 ${isSuccess ? "text-success" : "text-danger"}`}>
            {isSuccess ? "Order Confirmed!" : "Order Failed"}
          </h2>
          <p className="text-muted">
            {isSuccess
              ? "Thank you for your purchase! Your order has been successfully placed."
              : "Oops! Something went wrong with your order. Please try again."}
          </p>
        </div>

        <div className="mt-3">
          <h4 className="text-dark">Order Summary</h4>
          <ul className="list-group">
            {cartItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex align-items-center">
                <img src={item.image} alt={item.name} className="img-thumbnail me-3" style={{ width: "50px", height: "50px" }} />
                <div className="flex-grow-1">
                  <a href={item.link} className="text-decoration-none">{item.name}</a>
                  <div className="text-muted">Qty: {item.quantity}</div>
                </div>
                <span>{currency} {item.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3">
          <h4 className="text-dark">Payment Details</h4>
          <div className="d-flex align-items-center">
            <CreditCardFill className="me-2 text-primary" size={20} />
            <p className="mb-0"><strong>Payment Method:</strong> {paymentMethod}</p>
          </div>
          <div className="d-flex align-items-center mt-2">
            <ReceiptCutoff className="me-2 text-secondary" size={20} />
            <p className="mb-0"><strong>Payment ID:</strong> {paymentId}</p>
          </div>
          <p className="mt-2"><strong>Total Amount:</strong> {currency} {totalAmount}</p>
          <p>
            <strong>Payment Status:</strong>
            <span className={isSuccess ? "text-success" : "text-danger"}> {paymentStatus}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
