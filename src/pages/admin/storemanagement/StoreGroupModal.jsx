// src/components/StoreGroupModal/index.jsx
import React, { useEffect, useState } from "react";
import { getAllCountries } from "../../../services/RefDataService";

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
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    getAllCountries().then(setCountryList);
  }, []);

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
                  onChange={(e) => {
                    const selectedIso = e.target.value;
                    const selectedCountry = countryList.find(c => c.isoCode === selectedIso);

                    setGroupForm({
                      ...groupForm,
                      country: selectedIso,
                      currency: selectedCountry?.currencyCode || "",
                      timezone: selectedCountry?.timezone || "",
                    });
                  }}
                >
                  <option value="">Select Country</option>
                  {countryList.map((country) => (
                    <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
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
                <Select value={groupForm.currency || ""} disabled>
                  <option value={groupForm.currency || ""}>
                    {groupForm.currency || "Auto-filled from country"}
                  </option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>Timezone</Label>
                <Select value={groupForm.timezone || ""} disabled>
                  <option value={groupForm.timezone || ""}>
                    {groupForm.timezone || "Auto-filled from country"}
                  </option>
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