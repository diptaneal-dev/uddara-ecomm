import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

const DismissibleAlert = ({ variant, message, onClose, timeout = 3000 }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setShow(false);
                if (onClose) onClose();
            }, timeout);
            return () => clearTimeout(timer);
        }
    }, [message, onClose, timeout]);

    if (!show || !message) return null;

    return (
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
            {message}
        </Alert>
    );
};

export default DismissibleAlert;
