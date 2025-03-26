import React, { useState } from "react";
import guestUserService from "../../services/GuestUserService";
import deliveryService from "../../services/DeliveryService";

import {
  FormCard,
  FormRow,
  Input,
  InputHalf,
  Note,
  ButtonRow,
} from "./AddressForm.styles";
import { Button } from "../../components/Button/Button";

const AddressForm = ({
  clientId,
  storeId,
  isAuthenticated,
  setUserContext,
  setDeliveryAddresses,
  setUserShippingInfo,
  setSuccessMessage,
  setErrorMessage,
  setShowForm
}) => {
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    email: "",
  });

  const handleSaveNewAddress = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "firstName", "lastName", "email", "phoneNumber",
      "addressLine1", "city", "state", "zipCode", "country"
    ];

    const hasEmpty = requiredFields.some((key) => !newAddress[key]);
    if (hasEmpty) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      let userId = clientId;

      if (!isAuthenticated) {
        const guestData = await guestUserService.createGuestUser(
          newAddress.firstName,
          newAddress.lastName,
          newAddress.email,
          newAddress.phoneNumber,
          storeId
        );
        userId = guestData.userId;
      }

      const deliveryAddressDTO = {
        ...newAddress,
        recipientName: `${newAddress.firstName} ${newAddress.lastName}`,
        userId,
        isDefault: true,
      };

      const response = isAuthenticated
        ? await deliveryService.saveDeliveryAddress(userId, deliveryAddressDTO)
        : await guestUserService.saveGuestDeliveryAddress(deliveryAddressDTO);

      setDeliveryAddresses((prev) => [...prev, response]);
      setUserShippingInfo(response);
      setSuccessMessage("Address added successfully!");
      setShowForm(false);

      if (!isAuthenticated) {
        setUserContext((prev) => ({ ...prev, userId }));
      }

    } catch (error) {
      console.error("Failed to save address:", error);
      setErrorMessage("Failed to save address.");
    }
  };

  return (
    <FormCard>
      <Note>*Required Fields</Note>
      <form onSubmit={handleSaveNewAddress}>
        <FormRow>
          <InputHalf
            type="text"
            placeholder="First Name"
            required
            value={newAddress.firstName}
            onChange={(e) => setNewAddress({ ...newAddress, firstName: e.target.value })}
          />
          <InputHalf
            type="text"
            placeholder="Last Name"
            required
            value={newAddress.lastName}
            onChange={(e) => setNewAddress({ ...newAddress, lastName: e.target.value })}
          />
        </FormRow>

        <FormRow>
          <Input
            type="text"
            placeholder="Address Line 1"
            required
            value={newAddress.addressLine1}
            onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
          />
        </FormRow>

        <FormRow>
          <InputHalf
            type="text"
            placeholder="City"
            required
            value={newAddress.city}
            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
          />
          <InputHalf
            type="text"
            placeholder="State"
            required
            value={newAddress.state}
            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
          />
        </FormRow>

        <FormRow>
          <InputHalf
            type="text"
            placeholder="Zip Code"
            required
            value={newAddress.zipCode}
            onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
          />
          <InputHalf
            type="text"
            placeholder="Country"
            required
            value={newAddress.country}
            onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
          />
        </FormRow>

        <FormRow>
          <Input
            type="tel"
            placeholder="Phone Number"
            required
            value={newAddress.phoneNumber}
            onChange={(e) => {
              let phone = e.target.value.replace(/\s+/g, '');
              if (/^\d{10}$/.test(phone)) {
                phone = `+91${phone}`;
              }
              phone = phone.replace(/^(\+91|\+1)?(\d{3})(\d{3})(\d{4})$/, '$1 $2-$3-$4');
              setNewAddress({ ...newAddress, phoneNumber: phone });
            }}
          />
        </FormRow>

        <FormRow>
          <Input
            type="email"
            placeholder="Email Address"
            required
            value={newAddress.email}
            onChange={(e) => setNewAddress({ ...newAddress, email: e.target.value })}
          />
        </FormRow>

        <ButtonRow>
          <Button variant="secondary" outline onClick={() => setShowForm(false)} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Address
          </Button>
        </ButtonRow>
      </form>
    </FormCard>
  );
};

export default AddressForm;
