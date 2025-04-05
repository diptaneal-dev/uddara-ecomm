import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "../../../components/Button/Button";
import StoreListModal from "./StoreListModal";
import storeService from "../../../services/StoreService";
import StoreGroupDetailsModal from "./StoreGroupDetailsModal";

import {
  GroupCardWrapper,
  GroupCardBody,
  GroupTitleRow,
  GroupName,
  GroupInfoText,
  GroupButtonGroup
} from "./StoreGroupCard.styles";

export default function StoreGroupCard({
  group,
  stores,
  onEdit,
  onDelete,
  onEditStore,
  onDeleteStore,
  onViewStore
}) {
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [groupDetails, setGroupDetails] = useState(null);

  const groupStores = stores.filter((s) => s.storeGroupId === group.id);

  const handleGroupClick = async () => {
    try {
      const data = await storeService.getStoreGroupById(group.id);
      setGroupDetails(data);
      setShowDetailsModal(true);
    } catch (err) {
      console.error("Failed to fetch group details", err);
    }
  };

  return (
    <>
      <GroupCardWrapper>
        <GroupCardBody>
          <GroupTitleRow>
            <GroupName onClick={handleGroupClick}>
              {group.name}
            </GroupName>
            <span className="badge bg-secondary">
              {groupStores.length} Store{groupStores.length !== 1 && "s"}
            </span>
          </GroupTitleRow>

          <GroupInfoText><strong>Region:</strong> {group.region}</GroupInfoText>
          <GroupInfoText><strong>Domain:</strong> {group.domain}</GroupInfoText>
          <GroupInfoText>
            <strong>Country:</strong> {group.country} | <strong>Email:</strong> {group.contactEmail}<br />
            <strong>Phone:</strong> {group.supportPhone} | <strong>Timezone:</strong> {group.timezone} | <strong>Currency:</strong> {group.currency}
          </GroupInfoText>

          <GroupButtonGroup>
            <Button $size="sm" $variant="secondary" onClick={() => onEdit(group.id)}>
              Edit
            </Button>
            <Button $size="sm" $outline $variant="secondary" onClick={() => onDelete(group.id)}>
              Delete
            </Button>
            {groupStores.length > 0 && (
              <Button $size="sm" $outline onClick={() => setShowModal(true)}>
                View Stores
              </Button>
            )}
          </GroupButtonGroup>
        </GroupCardBody>
      </GroupCardWrapper>

      {showModal && (
        <StoreListModal
          stores={groupStores}
          onClose={() => setShowModal(false)}
          onEdit={onEditStore}     
          onDelete={onDeleteStore}
          onView={onViewStore}
        />
      )}

      {showDetailsModal && groupDetails && (
        <StoreGroupDetailsModal
          group={groupDetails}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </>
  );
}

StoreGroupCard.propTypes = {
  group: PropTypes.object.isRequired,
  stores: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEditStore: PropTypes.func.isRequired,
  onDeleteStore: PropTypes.func.isRequired,
  onViewStore: PropTypes.func.isRequired
};
