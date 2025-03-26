import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/UserContext";
import { useTheme } from "../../context/ThemeContext";
import userService from "../../services/UserService";
import "./loginPage.css";

const LoginModal = ({ isOpen, onRequestClose }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { login } = useUserContext();
    const { darkMode } = useTheme(); // Access darkMode from ThemeContext
    const navigate = useNavigate();

    const resetForm = () => {
        setUsername("");
        setPassword("");
        setErrorMessage("");
    };

    useEffect(() => {
        if (!isOpen) resetForm();
    }, [isOpen]);

    const handleInternalLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Clear any previous errors
    
        try {
            // Call login function (JWT is handled via HttpOnly Cookie)
            console.log("Calling login");
            const { userContext } = await userService.login(username, password);
    
            // Update context and store only user info (No JWT handling)
            login(userContext);  
    
            onRequestClose();
            navigate("/home");
        } catch (error) {
            setErrorMessage(error.message || "Invalid username or password");
        }
    };

    return (
        <Modal
            show={isOpen}
            onHide={onRequestClose}
            centered
            size="sm" // Compact size
            aria-labelledby="login-modal"
            className="login-modal"
        >
            <div
                className={`modal-content ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
                style={{ border: "none" }}
            >
                {/* Modal Header */}
                <div className="text-center py-3">
                    <h2 className="modal-title">Login</h2>
                </div>

                {/* Modal Body */}
                <Modal.Body className="p-3">
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleInternalLogin}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoComplete="username"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control form-control-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        <button type="submit" className="btn btn-login-modal btn-sm w-100">
                            Login
                        </button>
                    </form>
                </Modal.Body>

                {/* Modal Footer */}
                <Modal.Footer className="p-2 border-0">
                    <button
                        type="button"
                        className="btn btn-secondary btn-sm w-100"
                        onClick={onRequestClose}
                    >
                        Cancel
                    </button>
                </Modal.Footer>
            </div>
        </Modal>
    );
};

export default LoginModal;
