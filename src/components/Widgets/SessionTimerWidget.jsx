import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../hooks/UserContext"; // Adjust path if needed
import Draggable from "react-draggable";

function getTokenExpiry() {
    const expiry = localStorage.getItem("tokenExpiry");
    return expiry ? parseInt(expiry, 10) : null;
}

export default function SessionTimerWidget() {
    const { isAuthenticated } = useUserContext(); // ✅ Grab auth status from context
    const [timeLeft, setTimeLeft] = useState(() => {
        const expiry = getTokenExpiry();
        return expiry ? Math.max(expiry - Date.now(), 0) : 0;
    });

    const nodeRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const expiry = getTokenExpiry();
            if (!expiry || !isAuthenticated) {
                setTimeLeft(0);
                return;
            }
            const remaining = expiry - Date.now();
            setTimeLeft(remaining > 0 ? remaining : 0);
        }, 1000);

        return () => clearInterval(interval);
    }, [isAuthenticated]);

    if (!isAuthenticated || timeLeft <= 0) return null;

    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);

    const getColor = () => {
        if (timeLeft < 60000) return "#ff4d4f";
        if (timeLeft < 5 * 60000) return "#faad14";
        return "#52c41a";
    };

    return (
        <Draggable nodeRef={nodeRef}>
            <div
                ref={nodeRef}
                style={{
                    position: "fixed",
                    top: 50,
                    left: 50,
                    backgroundColor: "#fff",
                    color: "#000",
                    border: `2px solid ${getColor()}`,
                    borderRadius: 10,
                    padding: "8px 16px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    cursor: "move",
                    zIndex: 9999,
                    fontFamily: "monospace",
                    fontSize: "16px",
                    userSelect: "none"
                }}
            >
                ⏳ <strong>{minutes}:{seconds.toString().padStart(2, "0")}</strong>
            </div>
        </Draggable>
    );
}
