import React from 'react';
import { Input, PrimaryButton } from './UserManagement.styles';
import { SelectBox } from '../../../components/SelectBox/SelectBox';

export default function UserSearchFilters({
    search,
    roleFilter,
    statusFilter,
    onSearchChange,
    onRoleChange,
    onStatusChange,
    onAddUserClick
}) {
    return (
        <div className="max-w-5xl w-full flex flex-wrap items-end gap-4 mt-4">

            <div className="flex flex-col" style={{ width: '180px' }}>

                <SelectBox
                    label="Role"
                    multi
                    checkboxes
                    searchable
                    value={roleFilter}
                    onChange={onRoleChange}
                    options={[
                        { label: 'Staff', value: 'STAFF' },
                        { label: 'Store Admin', value: 'STOREADMIN' },
                        { label: 'Group Admin', value: 'GROUPADMIN' },
                    ]}
                />
            </div>


            <div className="pt-2">
                <PrimaryButton onClick={onAddUserClick}>
                    Add User
                </PrimaryButton>
            </div>
        </div>
    );
}
