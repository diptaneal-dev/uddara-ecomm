// src/components/Header/HeaderLayout.Styles.js
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.headerfootercolor};
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Added shadow */
  z-index: 9999;
  position: sticky; /* Optional: for sticky effect */
  top: 0;
`;

export const LogoWrapper = styled.div`
  margin-left: 186px;
`;

export const NavbarWrapper = styled.div`
  margin-left: 70px;
`;

export const SearchWrapper = styled.div`
  margin-left: auto;
  max-width: 300px;
`;

export const IconsWrapper = styled.div`
  margin-left: 40px;
  margin-right: 40px;
  display: flex;
  gap: 20px;
  align-items: center;
`;
