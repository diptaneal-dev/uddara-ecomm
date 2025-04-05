// src/components/navbar/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../../hooks/UserContext";
import {
  NavContainer,
  NavList,
  NavItem,
  NavLinkItem
} from "./Navbar.styles";

const Navbar = ({ menuItems = [], isAuthenticated, user }) => {
  const location = useLocation();
  const { isAnyAdmin } = useUserContext();

  const isAdmin = isAuthenticated && isAnyAdmin();
  const mergedMenuItems = [...menuItems];
  
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
