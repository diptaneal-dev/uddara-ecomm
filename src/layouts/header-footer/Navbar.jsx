// src/components/navbar/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  NavContainer,
  NavList,
  NavItem,
  NavLinkItem
} from "./Navbar.styles";

const Navbar = ({ menuItems = [], isAuthenticated, user }) => {
  const location = useLocation();

  const mergedMenuItems = [...menuItems];
  const isAdmin = isAuthenticated && user?.role?.toLowerCase() === "admin";

  return (
    <NavContainer>
      <NavList>
        {mergedMenuItems.map(({ path, label }) => (
          <NavItem key={path}>
            <Link to={path} style={{ textDecoration: 'none' }}>
              <NavLinkItem
                className={location.pathname === path ? "active-link" : ""}
              >
                {label}
              </NavLinkItem>
            </Link>
          </NavItem>
        ))}
        {isAdmin && (
          <NavItem>
            <Link to="/admin" style={{ textDecoration: 'none' }}>
              <NavLinkItem
                className={location.pathname === "/admin" ? "active-link" : ""}
              >
                Admin
              </NavLinkItem>
            </Link>
          </NavItem>
        )}
      </NavList>
    </NavContainer>
  );
};

export default Navbar;
