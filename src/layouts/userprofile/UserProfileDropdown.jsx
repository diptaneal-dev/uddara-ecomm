import React, { useState } from 'react';
import { useUserContext } from '../../hooks/UserContext';
import UserContextModal from './UserContextModal';
import defaultProfileImage from "../../assets/images/profileImage.webp";
import "./userProfile.css";

const UserProfileDropdown = ({ user }) => {
    const parsedUser = user || {}; // Ensure user is always an object
    const [isModalOpen, setModalOpen] = useState(false); // State for the modal

    // Custom User Context
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

    const launchUserContextView = () => {
        setModalOpen(true); // Open the modal
    };

    const closeModal = () => {
        setModalOpen(false); // Close the modal
    };

    return (
        isAuthenticated && (
            <div className="dropdown user-profile-dropdown">
                {/* Profile Picture Button */}
                <button
                    className="d-flex align-items-center justify-content-center border border-secondary"
                    type="button"
                    id="userProfileDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                        backgroundColor: '#FAF6F1',
                        borderRadius: '50%',
                        width: '40px', // Adjust width as needed
                        height: '40px', // Adjust height as needed
                        padding: 0 // Removes default padding to keep it circular
                    }}
                >
                    <img
                        src={profilePicture}
                        alt={`${displayName}'s profile`}
                        className="rounded-circle shadow-sm"
                        style={{ width: '100%', height: '100%' }}
                    />
                </button>

                {/* Dropdown Menu */}
                <ul
                    className="dropdown-menu dropdown-menu-end shadow rounded-lg"
                    aria-labelledby="userProfileDropdown"
                    style={{ minWidth: "220px" }}
                >
                    {/* User Info Section */}
                    <li className="dropdown-header text-center">
                        <strong className="fs-6">{displayName}</strong>
                        <br />
                        <small className="text-muted">{parsedUser?.email || 'No email available'}</small>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    
                    {/* View User Context */}
                    <li>
                        <button
                            className="dropdown-item d-flex align-items-center"
                            type="button"
                            onClick={launchUserContextView}
                        >
                            <i className="bi bi-person-lines-fill me-2"></i>
                            View User Context
                        </button>
                    </li>

                    {/* Logout */}
                    <li>
                        <button
                            className="dropdown-item d-flex align-items-center text-danger"
                            type="button"
                            onClick={handleLogout}
                        >
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Logout
                        </button>
                    </li>
                </ul>

                {/* User Context Modal */}
                <UserContextModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            </div>
        )
    );
};

export default UserProfileDropdown;
