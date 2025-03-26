import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useUserContext } from "../../hooks/UserContext";
import userService from "../../services/UserService";

const SessionExpirationModal = ({ show, onClose }) => {
    const { logout } = useUserContext();

    const handleExtendSession = async () => {
        try {
            await userService.refreshToken(); // Refresh the session
            onClose(); // Close modal
        } catch (error) {
            console.error("Session renewal failed:", error);
            logout(); // Log out the user if refresh fails
        }
    };

    return (
        <Modal show={show} onHide={logout} centered>
            <Modal.Header closeButton>
                <Modal.Title>Session Expiring Soon</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Your session is about to expire. Would you like to extend it?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={logout}>
                    Log Out
                </Button>
                <Button variant="primary" onClick={handleExtendSession}>
                    Extend Session
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SessionExpirationModal;
