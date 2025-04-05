import React, { useState } from 'react';
import { useUserContext } from '../../hooks/UserContext';
import UserContextModal from './UserContextModal';
import defaultProfileImage from "../../assets/images/profileImage.webp";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
`;

const ProfileButton = styled.button`
  background-color: #FAF6F1;
  border: 1px solid #dee2e6;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border 0.2s ease-in-out;

  &:hover {
    border-color: #007bff;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  border-radius: 10px;
  border: none;
  padding: 8px;
  margin-top: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.2s ease-in-out;
  min-width: 220px;
  list-style: none;
  z-index: 1000;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DropdownItem = styled.li`
  button {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    font-size: 14px;
    padding: 10px 15px;
    transition: background 0.2s ease-in-out;
    display: flex;
    align-items: center;

    &:hover {
      background-color: #f8f9fa;
    }

    &.text-danger:hover {
      background-color: rgba(220, 53, 69, 0.1);
    }
  }
`;

const DropdownHeader = styled.li`
  text-align: center;
  font-size: 0.9rem;
  padding: 0.5rem 0.75rem;
`;

const Divider = styled.hr`
  margin: 0.5rem 0;
  border: none;
  border-top: 1px solid #eaeaea;
`;

const UserProfileDropdown = ({ user }) => {
  const parsedUser = user || {};
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const { logout: userContextLogout, isAuthenticated: isUserContextAuthenticated } = useUserContext();

  const isAuthenticated = isUserContextAuthenticated;
  const displayName = parsedUser?.username || 'User';
  const profilePicture = parsedUser?.picture || defaultProfileImage;

  const handleLogout = async () => {
    try {
      if (isUserContextAuthenticated) {
        await userContextLogout();
      }
    } catch (error) {
      console.error('Error during logout:', error);
      if (isUserContextAuthenticated) {
        userContextLogout();
      }
    }
  };

  const goToUserContextPage = () => {
    navigate("/usercontext");
  };

  return (
    isAuthenticated && (
      <DropdownContainer className="dropdown user-profile-dropdown">
        <ProfileButton
          type="button"
          id="userProfileDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <ProfileImage
            src={profilePicture}
            alt={`${displayName}'s profile`}
          />
        </ProfileButton>

        <DropdownMenu className="dropdown-menu dropdown-menu-end shadow rounded-lg" aria-labelledby="userProfileDropdown">
          <DropdownHeader>
            <strong className="fs-6">{displayName}</strong><br />
            <small className="text-muted">{parsedUser?.email || 'No email available'}</small>
          </DropdownHeader>
          <Divider />

          <DropdownItem>
            <button type="button" onClick={goToUserContextPage}>
              <i className="bi bi-gear me-2"></i>
              Settings
            </button>
          </DropdownItem>

          <DropdownItem>
            <button type="button" className="text-danger" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-2"></i>
              Logout
            </button>
          </DropdownItem>
        </DropdownMenu>

        <UserContextModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
        />
      </DropdownContainer>
    )
  );
};

export default UserProfileDropdown;
