import React, { useEffect, useState } from 'react';
import userService from '../../../services/UserService';
import { SelectBox } from './UserManagement.styles';
import {
  Input,
  Label,
  FormGroup,
  FormGrid,
} from '../../../components/Modal/FormGrid.styles';

export default function UserActivityLog({ userId, onClose }) {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    fetchLogs();
  }, [search, typeFilter]);

  const fetchLogs = async () => {
    const res = await userService.getUserActivityLog(userId, {
      search,
      type: typeFilter,
    });
    setLogs(res);
  };

  return (
    <div className="space-y-6 p-2 max-h-[65vh] overflow-y-auto">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">User Activity Log</h3>
      </div>

      <FormGrid>
        <FormGroup>
          <Label>Search</Label>
          <Input
            placeholder="Search activity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Type</Label>
          <SelectBox
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { label: 'All', value: '' },
              { label: 'Login', value: 'LOGIN' },
              { label: 'Change', value: 'CHANGE' },
              { label: 'Error', value: 'ERROR' },
            ]}
          />
        </FormGroup>
      </FormGrid>

      <div className="space-y-3">
        {logs.length === 0 && (
          <p className="text-sm text-gray-500">No activity found.</p>
        )}

        {logs.map((log) => (
          <div
            key={log.id}
            className="border p-3 rounded bg-white shadow-sm"
          >
            <div className="text-sm font-medium text-gray-800">
              {log.action}
            </div>
            <div className="text-xs text-gray-500">
              {log.timestamp} — {log.ipAddress}
            </div>
            <div className="text-sm text-gray-600">{log.details}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
