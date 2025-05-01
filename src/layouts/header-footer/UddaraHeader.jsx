import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClientHeader, useHeaderConfig, LogoContainer } from 'react-vector';
import HeaderIcons from './HeaderIcons';
import { useUserContext } from '../../hooks/UserContext';

const navLinks = [
  { href: '/home', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/blog/list', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin', label: 'Admin Panel', allowedRoles: ['admin'] },
];

const UddaraHeader = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUserContext() || {};
  const [searchTerm, setSearchTerm] = useState('');

  const userRoles = Array.isArray(user?.roles) && user.roles.length > 0
    ? user.roles
    : ['guest'];

  const handleSearch = (e) => {
    e.preventDefault();
    if (typeof searchTerm !== 'string') return;

    const trimmed = searchTerm.trim();
    if (trimmed) {
      navigate(`/products?search=${encodeURIComponent(trimmed)}`);
    }
  };

  const header = useHeaderConfig({
    logo: (
      <LogoContainer
        src="/images/Uddara_logo.png"
        alt="Uddara Logo"
        size="64px"
        backgroundColor="#ffffff"
        shape="circle"
        encapsulate={true}
      />
    ),
    logoHref: '/',
    userRoles,
    navLinks,
    iconTray: <HeaderIcons isAuthenticated={isAuthenticated} user={user} />,
    showSearch: true,
    searchPlaceholder: 'Search products...',
    layoutDirection: 'row',
    spacing: '1rem',
    mobileMenuBehavior: 'slide',
    searchInputProps: {
      value: searchTerm,
      onChange: (e) => setSearchTerm(e.target.value),
    },
    onSearchSubmit: handleSearch,
  });

  return <ClientHeader {...header} />;
};

export default UddaraHeader;
