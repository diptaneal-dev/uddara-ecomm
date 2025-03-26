import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useUserContext } from "../../hooks/UserContext";

import DeliveryAddressSelection from "../delivery/DeliveryAddressSelection";
import OrderSummary from "./OrderSummary";
import {
  PageWrapper,
  Header,
  ContentGrid,
  LeftCol,
  RightCol,
  Heading,
  SuccessAlert,
} from "./CheckoutPage.styles";
import { Button } from "../../components/Button/Button";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart = [] } = useContext(CartContext);
  const { user } = useUserContext();
  const clientId = user?.userId || "guest";

  const [isShippingConfirmed, setIsShippingConfirmed] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [userShippingInfo, setUserShippingInfo] = useState({
    recipientName: "",
    contactNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    isDefault: true,
  });

  const { cartItems, totalAmount, currency } = location.state || {
    cartItems: cart,
    totalAmount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    currency: cart[0]?.currency || "INR",
  };

  const handleConfirmShipping = () => setIsShippingConfirmed(true);

  return (
    <PageWrapper>
      <Header>
        <Button variant="secondary" size="sm" outline onClick={() => navigate(-1)}>
          ← Back to Cart
        </Button>
      </Header>

      <ContentGrid>
        <LeftCol>
          <Heading>Shipping Address</Heading>
          {successMessage && <SuccessAlert>{successMessage}</SuccessAlert>}

          <DeliveryAddressSelection
            clientId={clientId}
            userShippingInfo={userShippingInfo}
            setUserShippingInfo={setUserShippingInfo}
          />
        </LeftCol>

        <RightCol>
        <Heading>Order Summary</Heading>
          <OrderSummary
            cartItems={cartItems}
            totalAmount={totalAmount}
            currency={currency}
            isShippingConfirmed={isShippingConfirmed}
            handleConfirmShipping={handleConfirmShipping}
            userShippingInfo={userShippingInfo}
          />
        </RightCol>
      </ContentGrid>
    </PageWrapper>
  );
};

export default CheckoutPage;
