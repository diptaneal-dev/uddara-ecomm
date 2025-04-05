// components/UserCard.jsx
import React, { useState, useRef, useEffect } from 'react';

import styled, { useTheme } from 'styled-components';
import { FaEllipsisV } from 'react-icons/fa';

const Card = styled.div`
  width: 100%;
  max-width: 350px;
  height: auto;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  border: 1px solid #e4e6eb;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.25s ease;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    background:  ${({ theme }) => theme.colors.seashell};
  }
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ $bg }) => $bg};  color: #fff;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  text-transform: uppercase;
  user-select: none;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const Label = styled.span`
  font-weight: 500;
  color: #555;
`;

const Value = styled.span`
  font-weight: 400;
  color: #333;
`;

const MenuIcon = styled.div`
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 6px;
  transition: background 0.2s ease;
  color: ${({ theme }) => theme.colors.grey};

  &:hover {
    background-color: #f1f1f1;
  }
`;

const MenuItem = styled.button`
  background: none;
  border: none;
  padding: 0.4rem 0.6rem;
  text-align: left;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const MenuWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 120%;  // below the icon
  right: 0;   // align to the right edge of the icon
  background: white;
  border: 1px solid #e4e6eb;
  border-radius: 8px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  z-index: 100;
  min-width: 160px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
`;

const getInitials = (user) => {
    const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email;
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0][0]?.toUpperCase();
    return parts[0][0]?.toUpperCase() + parts[1][0]?.toUpperCase();
};

const getColor = (theme, seed) => {
    const colors = [
        theme.colors.purple,
        theme.colors.teal,
        theme.colors.pink,
        theme.colors.navy,
        theme.colors.grey,
    ];
    const index = seed.charCodeAt(0) % colors.length;
    return colors[index];
};

export const UserCard = ({ user, onEdit, onAssign, onStoreAssign, onViewActivity, onToggleStatus }) => {
    const theme = useTheme();
    const initials = getInitials(user);
    const bgColor = getColor(theme, initials);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <Card>
            <Top>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {user.profilePictureUrl ? (
                        <img src={user.profilePictureUrl} alt="avatar" style={{ width: 48, height: 48, borderRadius: '50%' }} />
                    ) : (
                        <Avatar $bg={bgColor}>{initials}</Avatar>
                    )}
                    <div>
                        <div className="text-sm font-medium text-gray-800">
                            {user.firstName} {user.lastName}
                        </div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                </div>

                <MenuWrapper ref={menuRef}>
                    <MenuIcon
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "normal",
                            opacity: "0.9"
                        }}
                    >
                        <FaEllipsisV />
                    </MenuIcon>
                    {menuOpen && (
                        <Dropdown>
                            <MenuItem onClick={() => onEdit(user)}>Edit</MenuItem>
                            <MenuItem onClick={() => onAssign(user)}>Assign Role</MenuItem>
                            <MenuItem onClick={() => onStoreAssign(user)}>Assign Store</MenuItem>
                            <MenuItem onClick={() => onViewActivity(user)}>View Activity</MenuItem>
                            <MenuItem onClick={() => onToggleStatus(user)}>
                                {user.active ? 'Deactivate' : 'Reactivate'}
                            </MenuItem>
                        </Dropdown>
                    )}
                </MenuWrapper>
            </Top>

            <div className="text-sm mt-2">
                <Label>Role:</Label> <Value>{user.role}</Value>
            </div>
            <div className="text-sm">
                <Label>Scope:</Label> <Value>{user.scopeType} - {user.scopeId}</Value>
            </div>
            <div className="text-sm">
                <Label>Status:</Label>{' '}
                <Value className={user.active ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>
                    {user.active ? 'Active' : 'Inactive'}
                </Value>
            </div>
        </Card>
    );
};
