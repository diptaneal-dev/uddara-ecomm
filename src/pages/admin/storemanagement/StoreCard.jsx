import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "../../../components/Button/IconButton";
import { Pencil, Trash2, Eye } from "lucide-react";
import {
  CardWrapper,
  CardBody,
  TitleRow,
  StoreName,
  InfoText,
  ButtonGroup
} from "./StoreCard.styles";

export default function StoreCard({ store, onEdit, onDelete, onView }) {
  return (
    <CardWrapper>
      <CardBody>
        <TitleRow>
          <StoreName>{store.storeName}</StoreName>
          <span className="badge bg-secondary text-uppercase">
            {store.storeType || "Type: N/A"}
          </span>
        </TitleRow>

        <InfoText><strong>Legal Name:</strong> {store.legalName}</InfoText>
        <InfoText><strong>Manager:</strong> {store.storeManagerName || "N/A"}</InfoText>
        <InfoText><strong>Timezone:</strong> {store.timezone} | <strong>Region:</strong> {store.region}</InfoText>
        <InfoText><strong>Currency:</strong> {store.currency} | <strong>Delivery:</strong> {store.enableDelivery ? "Yes" : "No"}</InfoText>

        <ButtonGroup>
          <IconButton onClick={() => onEdit(store)} title="Edit Store">
            <Pencil />
          </IconButton>
          <IconButton onClick={() => onDelete(store)} title="Delete Store">
            <Trash2 />
          </IconButton>
          <IconButton onClick={() => onView(store)} title="View Store">
            <Eye />
          </IconButton>
        </ButtonGroup>
      </CardBody>
    </CardWrapper>
  );
}

StoreCard.propTypes = {
  store: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired
};
