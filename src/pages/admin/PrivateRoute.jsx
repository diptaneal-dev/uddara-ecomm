import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../hooks/UserContext";

const PrivateRoute = ({ children }) => {
  const { user } = useUserContext();
  console.log("User is:", user);

  // ✅ Allow if the user is `diptaneal-1@gmail.com`, OR if the role is `admin`
  if (user?.username !== "diptaneal-1@gmail.com" && user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
