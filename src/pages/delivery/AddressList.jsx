import React from "react";
import {
  Wrapper,
  Title,
  AddressCard,
  ButtonGroup
} from "./AddressList.styles";
import { Button } from "../../components/Button/Button";

const AddressList = ({ addresses, onSelect, onAddNew, onCancel }) => {
  return (
    <Wrapper>
      <Title>Select a Shipping Address</Title>

      {addresses.length > 0 ? (
        addresses.map((address, index) => (
          <AddressCard key={index}>
            <p><strong>{address.recipientName}</strong></p>
            <p>{address.addressLine1}, {address.city}</p>
            <Button
              size="sm"
              variant="secondary"
              outline
              onClick={() => onSelect(address)}
            >
              Deliver Here
            </Button>
          </AddressCard>
        ))
      ) : (
        <p>No saved addresses available.</p>
      )}

      <ButtonGroup>
        <Button $variant="primary" onClick={onAddNew}>
          Add New Address
        </Button>
        <Button $variant="secondary" $outline onClick={onCancel}>
          Cancel
        </Button>
      </ButtonGroup>
    </Wrapper>
  );
};

export default AddressList;
