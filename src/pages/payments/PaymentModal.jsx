import React from "react";
import { Modal, Button } from "react-bootstrap";
import RazorpayPayment from "./providers/RazorpayPayment";
import StripePayment from "./providers/StripePayment";
import PayPalPayment from "./providers/PayPalPayment";

const PaymentModal = ({ isOpen, onClose, provider, amount, currency }) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Complete Your Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {provider === "razorpay" && <RazorpayPayment amount={amount} currency={currency} />}
        {provider === "stripe" && <StripePayment amount={amount} currency={currency} />}
        {provider === "paypal" && <PayPalPayment amount={amount} currency={currency} />}
        {!provider && <p>Please select a payment method.</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
