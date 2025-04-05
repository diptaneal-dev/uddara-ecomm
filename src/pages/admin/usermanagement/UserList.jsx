import React from 'react';
import { UserCard } from './UserCard';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 0.1rem 0.5rem;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
`;

export default function UserList({
    users = [],
    onEdit,
    onAssign,
    onStoreAssign,
    onViewActivity,
    onToggleStatus,
}) {
    if (!Array.isArray(users) || users.length === 0) {
        return (
            <p className="text-gray-600 text-sm mt-4">
                No users found. Try adjusting your filters.
            </p>
        );
    }

    return (
        <Grid>
            {users.map((user) => (
                <CardWrapper key={user.id}>
                    <UserCard
                        key={user.id}
                        user={user}
                        onEdit={onEdit}
                        onAssign={onAssign}
                        onStoreAssign={onStoreAssign}
                        onViewActivity={onViewActivity} 
                        onToggleStatus={onToggleStatus} 
                    />
                </CardWrapper>
            ))}
        </Grid>
    );
}
