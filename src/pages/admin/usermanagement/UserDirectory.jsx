import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ConfirmUserStatusModal } from './ConfirmUserStatusModal';
import { FilterBar } from '../../../components/FilterBar/FilterBar';
import { Modal } from '../../../components/Modal/Modal';
import { UserStoreAssignmentModal } from './UserStoreAssignmentModal';
import { Button } from '../../../components/Button/Button';

import userService from '../../../services/UserService';
import CreateUserForm from './CreateUserForm';
import EditUserForm from './EditUserForm';
import AssignRolesForm from './AssignRolesForm';
import UserActivityLog from './UserActivityLog';
import UserList from './UserList';
import SmartSearchBar from '../../../components/SmartSearch/SmartSearchBar';

import styled from 'styled-components';

// Layout Rows
const Row = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`;

const TwoColumnRow = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
`;

const LeftColumn = styled.div`
  flex: 0 0 60%;
  display: flex;
  align-items: center;
`;

const RightColumn = styled.div`
  flex: 0 0 40%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

// Label
const Label = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
`;

const SearchSectionWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.seashell};
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;       // <-- ensures left alignment
  text-align: left;              // <-- ensures text (like labels) are left-aligned
`;

const StickyBackButton = styled.button`
  position: sticky;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.buttonSecondary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 8px;
  margin-bottom: 1rem;
  z-index: 10;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    background-color: ${({ theme }) => theme.colors.pink};
  }
`;

export default function UserDirectory() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [storeFilter, setStoreFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [assigningUser, setAssigningUser] = useState(null);
    const [storeAssignmentUser, setStoreAssignmentUser] = useState(null);
    const [viewingActivityUser, setViewingActivityUser] = useState(null);
    const [confirmUserStatus, setConfirmUserStatus] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, [search, roleFilter, statusFilter, storeFilter]);

    const fetchUsers = async () => {
        try {
            const res = await userService.getUsers({
                search,
                role: roleFilter,
                status: statusFilter,
                store: storeFilter,
            });
            setUsers(res);
            console.log("User Directory Results:", res);
        } catch (err) {
            console.error('Failed to fetch users', err);
        }
    };

    const handleUserCreated = () => {
        setShowCreateForm(false);
        fetchUsers();
    };

    const handleUserUpdated = () => {
        setEditingUser(null);
        fetchUsers();
    };

    const handleStoreAssignmentUser = () => {
        setStoreAssignmentUser(null);
        fetchUsers();
    }

    const handleRoleAssigned = () => {
        setAssigningUser(null);
        fetchUsers();
    };

    const toggleUserStatus = async (user) => {
        const action = user.active ? 'deactivate' : 'reactivate';

        try {
            await userService.toggleUserStatus(user.id, !user.active);
            toast.success(`User ${action}d successfully.`);
            fetchUsers();
        } catch (err) {
            console.error(`Failed to ${action} user`, err);
            toast.error(`Failed to ${action} user.`);
        }
    };

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <Row>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>User Directory</h2>
            </Row>

            <TwoColumnRow>
                <LeftColumn>
                    <StickyBackButton onClick={() => navigate(-1)}>
                        ← Back
                    </StickyBackButton>
                </LeftColumn>
                <RightColumn>
                    <Button
                        $variant="secondary"
                        $size="md"
                        onClick={() => navigate('inviteUser')}
                    >
                        Invite User
                    </Button>                    <Button
                        $variant="primary"
                        $size="md"
                        onClick={() => navigate('createUser')}
                    >
                        + Create User
                    </Button>
                </RightColumn>
            </TwoColumnRow>

            {/* User Search Section */}
            <SearchSectionWrapper>
                <SmartSearchBar
                    placeholderFields={['name', 'email', 'username']}
                    onSearch={(query) => setSearch(query.trim())}
                />

                <FilterBar
                    initialPivot="User"
                    onFiltersChange={(pivot, filters) => {
                        setStatusFilter(filters.status || '');
                        setRoleFilter(filters.role || []);
                        setStoreFilter(filters.store || []);
                    }}
                />
            </SearchSectionWrapper>

            {/* User List */}
            <UserList
                users={users}
                onEdit={setEditingUser}
                onAssign={setAssigningUser}
                onStoreAssign={setStoreAssignmentUser}
                onViewActivity={setViewingActivityUser}
                onToggleStatus={setConfirmUserStatus}
            />

            {/* Modals */}
            <Modal open={showCreateForm} onClose={() => setShowCreateForm(false)}>
                <CreateUserForm onSuccess={handleUserCreated} />
            </Modal>

            {editingUser && (
                <Modal open={!!editingUser} onClose={() => setEditingUser(null)}>
                    <EditUserForm
                        user={editingUser}
                        onUpdated={handleUserUpdated}
                        onClose={() => setEditingUser(null)}
                    />
                </Modal>
            )}

            {assigningUser && (
                <Modal open={!!assigningUser} onClose={() => setAssigningUser(null)}>
                    <AssignRolesForm
                        user={assigningUser}
                        onUpdated={handleRoleAssigned}
                        onClose={() => setAssigningUser(null)}
                    />
                </Modal>
            )}

            {storeAssignmentUser && (
                <UserStoreAssignmentModal
                    user={storeAssignmentUser}
                    open={!!storeAssignmentUser}
                    onClose={handleStoreAssignmentUser}
                />
            )}

            {viewingActivityUser && (
                <Modal open={!!viewingActivityUser} onClose={() => setViewingActivityUser(null)}>
                    <UserActivityLog userId={viewingActivityUser.id} onClose={() => setViewingActivityUser(null)} />
                </Modal>
            )}

            {confirmUserStatus && (
                <ConfirmUserStatusModal
                    user={confirmUserStatus}
                    onClose={() => setConfirmUserStatus(null)}
                    onConfirm={toggleUserStatus}
                />
            )}
        </div>
    );

}
