import React, { useState, useEffect } from 'react';
import userService from '../../../services/UserService';
import { SelectBox, PrimaryButton } from './UserManagement.styles';
import { Input, Label, FormGroup, FormGrid } from "../../../components/Modal/FormGrid.styles";

export default function CreateUserForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: 'STAFF',
    scopeType: 'STORE',
    scopeId: '',
    invite: true
  });

  const [storeGroups, setStoreGroups] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchScopeOptions();
  }, []);

  const fetchScopeOptions = async () => {
    const groups = await userService.getStoreGroups();
    const storeList = await userService.getStores();
    setStoreGroups(groups);
    setStores(storeList);
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      await userService.createUser(formData);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Error creating user', err);
    }
  };

  const scopeOptions = formData.scopeType === 'STORE' ? stores : storeGroups;

  return (
    <div className="space-y-6 p-2">
      <h3 className="text-xl font-semibold">Invite New User</h3>

      <FormGrid>
        <FormGroup>
          <Label>First Name</Label>
          <Input
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Last Name</Label>
          <Input
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Phone Number</Label>
          <Input
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
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
            options={scopeOptions.map((s) => ({ label: s.name, value: s.id }))}
          />
        </FormGroup>
      </FormGrid>

      <div className="flex justify-end">
        <PrimaryButton onClick={handleSubmit}>Invite User</PrimaryButton>
      </div>
    </div>
  );
}
