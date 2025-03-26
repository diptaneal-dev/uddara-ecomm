import React, { useState, useEffect } from "react";
import DismissibleAlert from "../../components/Alerts/DismissableAlert";
import { useUserContext } from "../../hooks/UserContext";
import deliveryService from "../../services/DeliveryService";
import AddressForm from "./AddressForm";
import AddressList from "./AddressList";
import {
    Wrapper,
    Card,
    HeaderRow,
    AddressText,
    InlineLinkButton,
    SectionTitle,
} from "./DeliveryAddressSelection.styles";

const DeliveryAddressSelection = ({
    clientId,
    userShippingInfo,
    setUserShippingInfo
}) => {
    const { isAuthenticated, setUserContext, user } = useUserContext();
    const storeId = user?.currentStoreId || 33;

    const [deliveryAddresses, setDeliveryAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddressList, setShowAddressList] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            fetchDeliveryAddresses(clientId);
        } else {
            setDeliveryAddresses([]);
            setLoading(false);
            setShowForm(true);
        }
    }, [clientId, isAuthenticated]);

    const fetchDeliveryAddresses = async (clientId) => {
        try {
            console.log("Calling fetchDeliveryAddresses");
            const addresses = await deliveryService.fetchDeliveryAddresses(clientId);
            setDeliveryAddresses(addresses);
    
            if (addresses.length === 0) {
                setShowForm(true);
                return;
            }
    
            const defaultAddress = addresses.find((addr) => addr.isDefault) || addresses[0];
    
            if (
                (!userShippingInfo || !isAddressValid(userShippingInfo)) &&
                defaultAddress &&
                !isSameAddress(userShippingInfo, defaultAddress)
            ) {
                setUserShippingInfo(defaultAddress);
            }
        } catch (error) {
            console.error("Error fetching addresses:", error);
            setErrorMessage("No saved addresses found. Please add one.");
            setShowForm(true);
        } finally {
            setLoading(false);
        }
    };    

    const isSameAddress = (a, b) => {
        if (!a || !b) return false;
        return a.id === b.id; 
    };
    
    const handleSelectAddress = async (address) => {
        try {
            await deliveryService.updateDeliveryAddress(clientId, address.id, {
                ...address,
                isDefault: true,
            });

            setDeliveryAddresses((prev) =>
                prev.map((addr) => ({ ...addr, isDefault: addr.id === address.id }))
            );

            setUserShippingInfo(address);
            setShowAddressList(false);
        } catch (error) {
            console.error("Error setting default address:", error);
            setErrorMessage("Failed to update default address.");
        }
    };

    const isAddressValid = (address) =>
        address &&
        typeof address.recipientName === "string" &&
        address.recipientName.trim() &&
        typeof address.phoneNumber === "string" &&
        address.phoneNumber.trim() &&
        typeof address.addressLine1 === "string" &&
        address.addressLine1.trim();

    if (loading) return <div className="text-center mt-4">Loading...</div>;

    return (
        <Wrapper>
            <DismissibleAlert
                variant="danger"
                message={errorMessage}
                onClose={() => setErrorMessage("")}
            />
            <DismissibleAlert
                variant="success"
                message={successMessage}
                onClose={() => setSuccessMessage("")}
            />

            {(showForm || !isAddressValid(userShippingInfo) || deliveryAddresses.length === 0) ? (
                <AddressForm
                    clientId={clientId}
                    storeId={storeId}
                    isAuthenticated={isAuthenticated}
                    setUserContext={setUserContext}
                    setDeliveryAddresses={setDeliveryAddresses}
                    setUserShippingInfo={setUserShippingInfo}
                    setSuccessMessage={setSuccessMessage}
                    setErrorMessage={setErrorMessage}
                    setShowForm={setShowForm}
                />
            ) : (
                <>
                    {isAddressValid(userShippingInfo) && (
                        <Card>
                            <HeaderRow>
                                <SectionTitle>Shipping Address</SectionTitle>
                                <InlineLinkButton onClick={() => setShowAddressList(!showAddressList)}>
                                    Change
                                </InlineLinkButton>
                            </HeaderRow>
                            <AddressText>
                                <strong>{userShippingInfo.recipientName}</strong><br />
                                {userShippingInfo.addressLine1}, {userShippingInfo.city}, {userShippingInfo.state}, {userShippingInfo.zipCode}<br />
                                {userShippingInfo.country}<br />
                                📞 {userShippingInfo.phoneNumber}<br />
                                ✉️ {userShippingInfo.email || "No email provided"}
                            </AddressText>
                        </Card>
                    )}

                    {showAddressList && (
                        <AddressList
                            addresses={deliveryAddresses}
                            onSelect={handleSelectAddress}
                            onCancel={() => setShowAddressList(false)}
                        />
                    )}
                </>
            )}
        </Wrapper>
    );
};

export default DeliveryAddressSelection;
