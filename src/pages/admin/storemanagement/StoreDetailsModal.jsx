import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalGrid,
  GridItem,
  GroupDetailTitle,
  ScrollableBody,
} from "./StoreGroupDetailsModal.styles";

export default function StoreDetailsModal({ store, onClose }) {
  if (!store) return null;

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{store.storeName}</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ScrollableBody>
          <GroupDetailTitle>Store Details</GroupDetailTitle>
          <ModalGrid>
            <GridItem>
              <strong>Store ID</strong>
              <span>{store.id}</span>
            </GridItem>
            <GridItem>
              <strong>Store Type</strong>
              <span>{store.storeType}</span>
            </GridItem>
            <GridItem>
              <strong>Currency</strong>
              <span>{store.currency}</span>
            </GridItem>
            <GridItem>
              <strong>Legal Name</strong>
              <span>{store.legalName}</span>
            </GridItem>
            <GridItem>
              <strong>Region</strong>
              <span>{store.region}</span>
            </GridItem>
            <GridItem>
              <strong>Timezone</strong>
              <span>{store.timezone}</span>
            </GridItem>
            <GridItem>
              <strong>Manager</strong>
              <span>{store.storeManagerName}</span>
            </GridItem>
            <GridItem>
              <strong>Delivery Enabled</strong>
              <span>{store.enableDelivery ? "Yes" : "No"}</span>
            </GridItem>
          </ModalGrid>

          {store.businessHours && (
            <>
              <GroupDetailTitle>Business Hours</GroupDetailTitle>
              <ModalGrid>
                <GridItem>
                  <strong>Opening</strong>
                  <span>{store.businessHours.openingTime}</span>
                </GridItem>
                <GridItem>
                  <strong>Closing</strong>
                  <span>{store.businessHours.closingTime}</span>
                </GridItem>
                <GridItem style={{ gridColumn: "1 / -1" }}>
                  <strong>Days</strong>
                  <span>
                    {store.businessHours.daysOpen?.length > 0
                      ? store.businessHours.daysOpen.join(", ")
                      : "Not set"}
                  </span>
                </GridItem>
              </ModalGrid>
            </>
          )}
        </ScrollableBody>
      </ModalContainer>
    </ModalOverlay>
  );
}

StoreDetailsModal.propTypes = {
  store: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
