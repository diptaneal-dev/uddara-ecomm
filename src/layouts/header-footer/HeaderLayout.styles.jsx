// src/components/Header/HeaderLayout.Styles.js
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  height: auto;
  background-color: ${({ theme }) => theme.colors.purple};
  padding: 0 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  position: sticky;
  top: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    gap: 1rem;
    position: static;
  }
`;

export const StyledLogoCircle = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  padding: 1px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85px;
  height: 85px;

  @media (max-width: 768px) {
    width: 75px;
    height: 75px;
    padding: 6px;
  }
`;

export const LogoWrapper = styled.div`
  margin-left: 186px;

  @media (max-width: 1024px) {
    margin-left: 40px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

export const NavbarWrapper = styled.div`
  margin-left: 70px;

  @media (max-width: 1024px) {
    margin-left: 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;

export const SearchWrapper = styled.div`
  margin-left: auto;
  max-width: 300px;
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;

export const IconsWrapper = styled.div`
  margin-left: 40px;
  margin-right: 40px;
  display: flex;
  gap: 20px;
  align-items: center;

  @media (max-width: 768px) {
    margin: 0;
    justify-content: center;
    width: 100%;
  }
`;
