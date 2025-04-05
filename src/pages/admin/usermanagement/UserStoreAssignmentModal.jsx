// components/UserStoreAssignmentModal.jsx

import React, { useEffect, useState } from 'react';
import { Modal } from '../../../components/Modal/Modal';
import { SelectBox } from '../../../components/SelectBox/SelectBox';
import {
    FormGrid,
    FormGroup,
    Label,
    Input
} from '../../../components/Modal/FormGrid.styles';
import { PrimaryButton } from './UserManagement.styles';
import userService from '../../../services/UserService';
import storeService from '../../../services/StoreService';

export const UserStoreAssignmentModal = ({ user, open, onClose }) => {
    const [role, setRole] = useState('STAFF');
    const [scopeType, setScopeType] = useState('STORE');
    const [scopeId, setScopeId] = useState('');
    const [stores, setStores] = useState([]);
    const [storeGroups, setStoreGroups] = useState([]);
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        if (open) {
            loadScopes();
            loadAssignments();
        }
    }, [open]);

    const loadScopes = async () => {
        try {
            const storeList = await storeService.getAllStores();
            const groupList = await storeService.getMyStoreGroups();

            console.log("Store list is:", storeList);
            console.log("Store group is:", groupList);

            setStores(Array.isArray(storeList) ? storeList : []);
            setStoreGroups(Array.isArray(groupList) ? groupList : []);
        } catch (e) {
            console.error("❌ Error loading scopes:", e);
            setStores([]);
            setStoreGroups([]);
        }
    };

    const loadAssignments = async () => {
        const userStores = await storeService.getUserStores(user.id);
        const userGroups = await storeService.getUserStoreGroups(user.id);
        console.log("User is:", user);
        console.log("User Stores is:", userStores);
        console.log("User group is:", userGroups);

        setAssignments([...userStores, ...userGroups]);
        console.log("Assignment : ", assignments);
    };

    const handleAssign = async () => {
        if (!scopeId) return;

        await userService.assignUserToScope(user.id, {
            role,
            scopeType,
            scopeId,
        });

        await loadAssignments();
        setScopeId('');
    };

    const handleRemove = async (assignmentId, type) => {
        console.log("Assignment are:", assignments);
        console.log("Requesting removal of access for assignmentId ", assignmentId, " and type:", type);
        await userService.removeUserScopeAssignment(assignmentId, type);
        await loadAssignments();
    };


    const scopeOptions = scopeType === 'STORE'
        ? Array.isArray(stores) ? stores.map(s => ({ label: s.name, value: s.id })) : []
        : Array.isArray(storeGroups) ? storeGroups.map(g => ({ label: g.name, value: g.id })) : [];

    return (
        <Modal open={open} onClose={onClose} title={`Assign ${scopeType} to ${user.firstName}`}>
            <FormGrid>
                <FormGroup>
                    <Label>Role</Label>
                    <SelectBox
                        value={role}
                        onChange={setRole}
                        options={[
                            { label: 'Staff', value: 'STAFF' },
                            { label: 'Store Admin', value: 'STOREADMIN' },
                            { label: 'Group Admin', value: 'GROUPADMIN' }
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
                            { label: 'Store Group', value: 'GROUP' }
                        ]}
                    />
                </FormGroup>

                <FormGroup>
                    <Label>{scopeType === 'STORE' ? 'Store' : 'Store Group'}</Label>
                    <SelectBox
                        value={scopeId}
                        onChange={setScopeId}
                        options={scopeOptions}
                        searchable
                    />
                </FormGroup>
            </FormGrid>

            <PrimaryButton onClick={handleAssign}>Assign</PrimaryButton>

            <div className="mt-6">
                <h4 className="font-medium text-md mt-3 mb-2">Current Assignments</h4>
                {assignments.length === 0 ? (
                    <p className="text-sm text-gray-500">No assignments yet.</p>
                ) : (
                    <div className="overflow-x-auto mt-3 rounded border">
                        <table className="min-w-full text-sm text-left border-collapse">
                            <thead className="bg-gray-100 border-b">
                                <tr>
                                    <th className="px-4 py-2 font-medium text-gray-700">Role</th>
                                    <th className="px-4 py-2 font-medium text-gray-700">Scope</th>
                                    <th className="px-4 py-2 font-medium text-gray-700">Type</th>
                                    <th className="px-4 py-2 font-medium text-gray-700 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignments.map((assignment, index) => {
                                    const isStore = assignment.type === 'STORE';
                                    const scopeName = isStore ? assignment.storeName : assignment.name;
                                    const scopeId = isStore ? assignment.storeId : assignment.id;

                                    return (
                                        <tr key={`${assignment.type}-${scopeId ?? index}`} className="border-t hover:bg-gray-50">
                                            <td className="px-4 py-2">{assignment.role || '—'}</td>
                                            <td className="px-4 py-2">{scopeName || scopeId}</td>
                                            <td className="px-4 py-2">{assignment.type}</td>
                                            <td className="px-4 py-2 text-right">
                                                <button
                                                    className="text-red-500 hover:underline text-sm"
                                                    onClick={() => handleRemove(scopeId, assignment.type)}
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>


        </Modal>
    );
};
