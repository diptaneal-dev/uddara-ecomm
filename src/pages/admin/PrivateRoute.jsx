import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../hooks/UserContext";

const PrivateRoute = () => {
  const { user } = useUserContext();

  if (user?.username !== "diptaneal-1@gmail.com" && user?.role !== "GROUPADMIN") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; 
};

export default PrivateRoute;
