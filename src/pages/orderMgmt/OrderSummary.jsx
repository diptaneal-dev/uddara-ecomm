import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/UserContext";
import guestUserService from "../../services/GuestUserService";
import OrderService from "../../services/OrderService";

import OrderReviewTable from "./OrderReviewTable";
import {
    SummaryContainer,
    AddressBox,
    ConfirmNote,
    ErrorText,
    Disclaimer,
} from "./OrderSummary.styles";
import { Button } from "../../components/Button/Button";

const OrderSummary = ({
    cartItems,
    totalAmount,
    currency,
    isShippingConfirmed,
    handleConfirmShipping,
    userShippingInfo
}) => {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useUserContext();
    const storeId = user?.currentStoreId || 33;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const isAddressValid = (address) =>
        address?.recipientName?.trim() &&
        address?.phoneNumber?.trim() &&
        address?.addressLine1?.trim() &&
        address?.city?.trim() &&
        address?.state?.trim() &&
        address?.zipCode?.trim() &&
        address?.country?.trim();

    const formatAddress = (address) => {
        return `${address.addressLine1}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`;
    };

    const handlePlaceOrder = async () => {
        if (!isShippingConfirmed) {
            setError("Please confirm your shipping address before proceeding.");
            return;
        }

        if (!isAddressValid(userShippingInfo)) {
            setError("Invalid shipping address. Please provide a complete address.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const shippingAddress = formatAddress(userShippingInfo);
            const billingAddress = shippingAddress;
            let guestToken = null;

            if (!isAuthenticated) {
                guestToken = await guestUserService.generateCheckoutToken(userShippingInfo);
                if (!guestToken) throw new Error("Failed to generate guest token.");
                localStorage.setItem("guestToken", guestToken);
            }

            const orderData = {
                orderType: "ECOMMERCE",
                customerId: isAuthenticated ? user.userId : null,
                customerName: isAuthenticated ? user.userName : "Guest",
                storeId,
                placedByUserId: isAuthenticated ? user.userId : null,
                deliveryAddressId: userShippingInfo.id,
                currencyCode: currency,
                financialStatus: "PENDING",
                totalAmount,
                discount: 0.0,
                finalAmount: totalAmount, // Adjust if priceModifiers affect this
                amountPaid: 0.0,
              
                priceModifiers: [
                  {
                    name: "GST",
                    code: "GST18",
                    amount: 0.0,
                    rate: 0.18,
                    isPercentage: true,
                    target: "TAX",
                    scope: "ORDER",
                  },
                ],
              
                items: cartItems.map(item => ({
                  type: "ECOMMERCE",
                  productId: item.id,
                  productName: item.name,
                  productSKU: item.sku || "UNKNOWN",
                  quantity: item.quantity,
                  unitPrice: item.price,
                  discount: 0.0,
                  totalPrice: item.price * item.quantity,
                  itemStatus: "PENDING",
                  specialInstructions: item.specialInstructions || "",
                  shippingMethod: "STANDARD",
                  shippingStatus: "PENDING"
                })),
              
                guestToken: isAuthenticated ? null : guestToken,
              };
              
            const placedOrder = await OrderService.placeOrder(orderData);
            navigate("/place-order", {
                state: { orderId: placedOrder.id, cartItems, totalAmount, currency }
            });

        } catch (err) {
            console.error(err);
            setError("An error occurred while placing your order.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SummaryContainer>
            {isAddressValid(userShippingInfo) ? (
                <AddressBox>
                    <h5>Shipping Address</h5>
                    <p>
                        <strong>{userShippingInfo.recipientName}</strong><br />
                        {userShippingInfo.addressLine1}, {userShippingInfo.city}, {userShippingInfo.state}, {userShippingInfo.zipCode}<br />
                        {userShippingInfo.country}<br />
                        📞 {userShippingInfo.phoneNumber}
                    </p>
                </AddressBox>
            ) : (
                <ErrorText>No valid shipping address selected.</ErrorText>
            )}

            <OrderReviewTable
                cartItems={cartItems}
                totalAmount={totalAmount}
                currency={currency}
            />

            {!isShippingConfirmed && (
                <ConfirmNote>
                    <label>
                        <input
                            type="checkbox"
                            onChange={handleConfirmShipping}
                            disabled={!isAddressValid(userShippingInfo)}
                        />{" "}
                        Please confirm your shipping address before placing the order.
                    </label>
                </ConfirmNote>
            )}

            <Button
                variant="primary"
                fullWidth
                disabled={loading || !isShippingConfirmed}
                onClick={handlePlaceOrder}
                className="mt-3"
            >
                {loading ? "Processing..." : "Place Order"}
            </Button>

            {error && <ErrorText>{error}</ErrorText>}

            <Disclaimer>
                By proceeding, you agree to Uddara's{" "}
                <a href="#">Privacy Practices</a> and <a href="#">Legal Terms</a>. Uddara might send you an SMS to confirm your order.
            </Disclaimer>
        </SummaryContainer>
    );
};

export default OrderSummary;
