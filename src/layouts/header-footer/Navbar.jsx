// src/components/navbar/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserContext } from "../../hooks/UserContext";
import {
  NavContainer,
  NavList,
  NavItem,
  NavLinkItem
} from "./HeaderLayout.styles";

const Navbar = ({ menuItems = [], isAuthenticated, user }) => {
  const location = useLocation();
  const { isAnyAdmin } = useUserContext();
  const isAdmin = isAuthenticated && isAnyAdmin();

  // Combine default menu items with conditional admin
  const fullMenu = [...menuItems];
  if (isAdmin) {
    fullMenu.push({ path: "/admin", label: "Admin" });
  }

  return (
    <NavContainer>
      <NavList>
        {fullMenu.map(({ path, label }) => {
          const isActive = location.pathname === path;

          return (
            <NavItem key={path}>
              <NavLinkItem
                to={path}
                as={Link}
                className={isActive ? "active-link" : ""}
                $underlineOnActive
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </NavLinkItem>
            </NavItem>
          );
        })}
      </NavList>
    </NavContainer>
  );
};

export default Navbar;
