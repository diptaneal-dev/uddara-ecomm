import React, { useState, useEffect } from 'react';
import userService from '../../../services/UserService';
import { SelectBox, PrimaryButton } from './UserManagement.styles';
import { Input, Label, FormGroup, FormGrid } from "../../../components/Modal/FormGrid.styles";

export default function EditUserForm({ user, onClose, onUpdated }) {
  const [formData, setFormData] = useState({ ...user });
  const [storeGroups, setStoreGroups] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchScopes();
  }, []);

  const fetchScopes = async () => {
    const groups = await userService.getStoreGroups();
    const storeList = await userService.getStores();
    setStoreGroups(groups);
    setStores(storeList);
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSave = async () => {
    try {
      await userService.updateUser(formData.id, formData);
      onUpdated?.();
      onClose?.();
    } catch (err) {
      console.error('Failed to update user', err);
    }
  };

  const scopeOptions = formData.scopeType === 'STORE' ? stores : storeGroups;

  return (
    <div className="space-y-6 p-2">
      <h3 className="text-xl font-semibold mb-2">Edit User</h3>

      <FormGrid>
        <FormGroup>
          <Label>First Name</Label>
          <Input
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="First Name"
          />
        </FormGroup>

        <FormGroup>
          <Label>Last Name</Label>
          <Input
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Last Name"
          />
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Email"
          />
        </FormGroup>

        <FormGroup>
          <Label>Phone Number</Label>
          <Input
            value={formData.phoneNumber || ''}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            placeholder="Phone Number"
          />
        </FormGroup>

        <FormGroup>
          <Label>Role</Label>
          <SelectBox
            value={formData.role}
            onChange={(value) => handleChange('role', value)}
            options={[
              { label: 'Staff', value: 'STAFF' },
              { label: 'Store Admin', value: 'STOREADMIN' },
              { label: 'Group Admin', value: 'GROUPADMIN' },
            ]}
          />
        </FormGroup>

        <FormGroup>
          <Label>Scope Type</Label>
          <SelectBox
            value={formData.scopeType}
            onChange={(value) => handleChange('scopeType', value)}
            options={[
              { label: 'Store', value: 'STORE' },
              { label: 'Group', value: 'GROUP' },
            ]}
          />
        </FormGroup>

        <FormGroup>
          <Label>Scope</Label>
          <SelectBox
            value={formData.scopeId}
            onChange={(value) => handleChange('scopeId', value)}
            options={scopeOptions.map((s) => ({
              label: s.name,
              value: s.id,
            }))}
          />
        </FormGroup>
      </FormGrid>

      <div className="pt-2 flex justify-end">
        <PrimaryButton onClick={handleSave}>Save Changes</PrimaryButton>
      </div>
    </div>
  );
}
