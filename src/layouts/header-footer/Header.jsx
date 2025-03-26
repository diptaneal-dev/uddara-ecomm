// src/components/Header/Header.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Navbar from "./Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useUserContext } from "../../hooks/UserContext";
import HeaderIcons from "./HeaderIcons";

import {
  HeaderContainer,
  LogoWrapper,
  NavbarWrapper,
  SearchWrapper,
  IconsWrapper
} from "./HeaderLayout.styles";

const menuItems = [
  { path: "/products", label: "Shop" },
  { path: "/about", label: "About" },
  { path: "/blog/list", label: "Blog" },
  { path: "/contact", label: "Contact" },
];

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUserContext() || {};

  return (
    <HeaderContainer>
      <LogoWrapper>
        <div className="logo-container">
          <Link to="/" className="navbar-brand">
            <Logo
              imageSrc="/images/Uddara_logo.png"
              width="100px"
              height="100px"
              className="header-logo"
              textColor="#333"
              bgColor="transparent"
              centered={false}
            />
          </Link>
        </div>
      </LogoWrapper>

      <NavbarWrapper>
        <Navbar menuItems={menuItems} isAuthenticated={isAuthenticated} user={user} />
      </NavbarWrapper>

      <SearchWrapper>
        <SearchBar
          onSearch={(query) => navigate(`/search?query=${encodeURIComponent(query)}`)}
        />
      </SearchWrapper>

      <IconsWrapper>
        <HeaderIcons isAuthenticated={isAuthenticated} user={user} />
      </IconsWrapper>
    </HeaderContainer>
  );
};

export default Header;
