import React from 'react';
import { Navbar, useHeaderConfig } from 'react-vector';
import Logo from './Logo';

const Header = () => {
  const headerProps = useHeaderConfig({
    brand: (
      <img
        src="/images/Uddara_logo.png"
        alt="Uddara"
        style={{
          width: '95px',
          height: 'auto',
          display: 'block',
        }}
      />
    ),    
    flags: {
      enableCart: false,
      enableFavorites: false,
      enableSearch: false,
    },
    menuItems: [], // no links for now
  });

  return <Navbar {...headerProps} />;
};

export default Header;
