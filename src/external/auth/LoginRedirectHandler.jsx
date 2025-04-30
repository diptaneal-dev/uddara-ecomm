import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "react-vector";

export default function LoginRedirectHandler() {
  const navigate = useNavigate();
  const { status, user } = useAuth(); // adjust if you use different login state

  useEffect(() => {
    if (status === "authenticated" && user) {
      const redirectPath = localStorage.getItem("redirect_path") || "/";
      if (redirectPath.startsWith("/")) {
        navigate(redirectPath);
      }
      localStorage.removeItem("redirect_path");
    }
  }, [status, user, navigate]);

  return null; // this is just a logic component
}
