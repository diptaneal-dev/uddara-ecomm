import React, { useEffect, useState } from 'react';
import userService from '../../../services/UserService';
import { SelectBox, PrimaryButton } from './UserManagement.styles';
import { FormGrid, FormGroup, Label } from "../../../components/Modal/FormGrid.styles";

export default function AssignRolesForm({ user, onUpdated, onClose }) {
  const [assignments, setAssignments] = useState([]);
  const [newRole, setNewRole] = useState('STAFF');
  const [scopeType, setScopeType] = useState('STORE');
  const [scopeId, setScopeId] = useState('');
  const [storeGroups, setStoreGroups] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    loadAssignments();
    loadScopes();
  }, []);

  const loadAssignments = async () => {
    const roles = await userService.getUserRoleAssignments(user.id);
    setAssignments(roles);
  };

  const loadScopes = async () => {
    const groups = await userService.getStoreGroups();
    const storeList = await userService.getStores();
    setStoreGroups(groups);
    setStores(storeList);
  };

  const handleAssign = async () => {
    await userService.assignRole(user.id, {
      role: newRole,
      scopeType,
      scopeId,
    });
    await loadAssignments();
    if (onUpdated) onUpdated();
  };

  const handleRemove = async (assignmentId) => {
    await userService.removeRoleAssignment(assignmentId);
    await loadAssignments();
  };

  const scopes = scopeType === 'STORE' ? stores : storeGroups;

  return (
    <div className="space-y-6 p-2">
      <h3 className="text-xl font-semibold">Assign Roles to {user.firstName}</h3>

      <FormGrid>
        <FormGroup>
          <Label>Role</Label>
          <SelectBox
            value={newRole}
            onChange={setNewRole}
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
            value={scopeType}
            onChange={setScopeType}
            options={[
              { label: 'Store', value: 'STORE' },
              { label: 'Group', value: 'GROUP' },
            ]}
          />
        </FormGroup>

        <FormGroup>
          <Label>Scope</Label>
          <SelectBox
            value={scopeId}
            onChange={setScopeId}
            options={scopes.map((s) => ({ label: s.name, value: s.id }))}
          />
        </FormGroup>
      </FormGrid>

      <div className="flex justify-end">
        <PrimaryButton onClick={handleAssign}>Assign</PrimaryButton>
      </div>

      {assignments.length > 0 && (
        <div className="space-y-2 pt-6">
          <h4 className="text-md font-medium">Current Assignments</h4>
          {assignments.map((assignment) => (
            <div
              key={assignment.id}
              className="flex justify-between items-center border p-2 rounded-md text-sm"
            >
              <div>
                <strong>{assignment.role}</strong> — {assignment.scopeType}:{' '}
                {assignment.scopeName || assignment.scopeId}
              </div>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleRemove(assignment.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
