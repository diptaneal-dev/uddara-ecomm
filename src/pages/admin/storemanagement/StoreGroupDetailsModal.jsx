import React from "react";
import PropTypes from "prop-types";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  GroupDetailModalContent,
  GroupDetailTitle,
  GroupDetailsList,
  GroupDetailItem,
} from "./StoreGroupDetailsModal.styles";

import { Button } from "../../../components/Button/Button";

export default function StoreGroupDetailsModal({ group, onClose }) {
  if (!group) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{group.name}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <GroupDetailModalContent>
          <GroupDetailTitle>Group Details</GroupDetailTitle>
          <GroupDetailsList>
            <GroupDetailItem><strong>Region:</strong><span>{group.region}</span></GroupDetailItem>
            <GroupDetailItem><strong>Country:</strong><span>{group.country}</span></GroupDetailItem>
            <GroupDetailItem><strong>Email:</strong><span>{group.contactEmail}</span></GroupDetailItem>
            <GroupDetailItem><strong>Phone:</strong><span>{group.supportPhone}</span></GroupDetailItem>
            <GroupDetailItem><strong>Domain:</strong><span>{group.domain}</span></GroupDetailItem>
            <GroupDetailItem><strong>Currency:</strong><span>{group.currency}</span></GroupDetailItem>
            <GroupDetailItem><strong>Timezone:</strong><span>{group.timezone}</span></GroupDetailItem>
            <GroupDetailItem><strong>Created:</strong><span>{new Date(group.createdAt).toLocaleString()}</span></GroupDetailItem>
            <GroupDetailItem><strong>Updated:</strong><span>{new Date(group.updatedAt).toLocaleString()}</span></GroupDetailItem>
          </GroupDetailsList>
        </GroupDetailModalContent>

        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
          <Button $size="sm" $variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </ModalContainer>
    </ModalOverlay>
  );
}

StoreGroupDetailsModal.propTypes = {
  group: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
