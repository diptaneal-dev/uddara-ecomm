// src/components/StoreGroupModal/index.jsx
import React from "react";
import PropTypes from "prop-types";
import {
  ModalOverlay,
  ModalDialog,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  FormGrid,
  FormGroup,
  Label,
  Input,
  Select
} from "./StoreGroupModal.styles";

export default function StoreGroupModal({
  groupForm,
  setGroupForm,
  editingGroupId,
  onSubmit,
  onClose,
  renderFooter
}) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalDialog onClick={(e) => e.stopPropagation()}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>
              {editingGroupId ? "Edit Store Group" : "Create Store Group"}
            </ModalTitle>
            <button type="button" className="btn-close" onClick={onClose} />
          </ModalHeader>

          <ModalBody>
            <FormGrid>
              <FormGroup>
                <Label>Group Name</Label>
                <Input
                  value={groupForm.name}
                  onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <Label>Country</Label>
                <Select
                  value={groupForm.country}
                  onChange={(e) => setGroupForm({ ...groupForm, country: e.target.value })}
                >
                  <option value="">Select Country</option>
                  <option value="India">India</option>
                  <option value="AU">Australia</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Singapore">Singapore</option>
                  <option value="UAE">UAE</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Region</Label>
                <Select
                  value={groupForm.region}
                  onChange={(e) => setGroupForm({ ...groupForm, region: e.target.value })}
                >
                  <option value="">Select Region</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                  <option value="Central">Central</option>
                  <option value="International">International</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Domain</Label>
                <Input
                  value={groupForm.domain}
                  onChange={(e) => setGroupForm({ ...groupForm, domain: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <Label>Contact Email</Label>
                <Input
                  type="email"
                  value={groupForm.contactEmail || ""}
                  onChange={(e) => setGroupForm({ ...groupForm, contactEmail: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <Label>Support Phone</Label>
                <Input
                  value={groupForm.supportPhone || ""}
                  onChange={(e) => setGroupForm({ ...groupForm, supportPhone: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <Label>Currency</Label>
                <Select
                  value={groupForm.currency}
                  onChange={(e) => setGroupForm({ ...groupForm, currency: e.target.value })}
                >
                  <option value="">Select Currency</option>
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Timezone</Label>
                <Select
                  value={groupForm.timezone}
                  onChange={(e) => setGroupForm({ ...groupForm, timezone: e.target.value })}
                >
                  <option value="">Select Timezone</option>
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                </Select>
              </FormGroup>
            </FormGrid>
          </ModalBody>

          <ModalFooter>
            {renderFooter ? renderFooter({ onClose, onSubmit, editing: !!editingGroupId }) : (
              <>
                <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button className="btn btn-primary" onClick={onSubmit}>
                  {editingGroupId ? "Update" : "Create"}
                </button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </ModalDialog>
    </ModalOverlay>
  );
}

StoreGroupModal.propTypes = {
  groupForm: PropTypes.object.isRequired,
  setGroupForm: PropTypes.func.isRequired,
  editingGroupId: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  renderFooter: PropTypes.func,
};