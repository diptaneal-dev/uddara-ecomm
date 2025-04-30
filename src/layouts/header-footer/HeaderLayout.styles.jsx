import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.colors.purple};
  position: sticky;
  top: 0;

  width: 100%;
  padding: 0.5rem 1rem;
  z-index: 100;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const HeaderContent = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

export const LogoColumn = styled.div`
  margin-right: 2rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 160px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;


export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white};
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};

    svg {
      transform: scale(1.2);
    }
  }

  svg {
    transition: transform 0.2s ease;
  }
`;

export const HeaderTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const HeaderBottomRow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavbarWrapper = styled.nav`
  display: flex;
  align-items: center;
  margin-left: 100px;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SearchWrapper = styled.div`
  min-width: 280px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledLogoCircle = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  padding: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85px;
  height: 85px;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`;

export const LogoWrapper = styled.div`
  margin-left: ${({ $customMargin }) => $customMargin || '0'};

  @media (max-width: 1024px) {
    margin-left: 40px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

// Mobile Header
export const MobileHeaderRow = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;

export const MobileLogoWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

export const MobileIconsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const SearchToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  cursor: pointer;

  .icon {
    font-size: 1.2rem;
  }
`;

export const MobileSearchWrapper = styled.div`
  width: 100%;
  margin-top: 0.5rem;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const HamburgerButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenuWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: ${({ theme }) => theme.colors.purple};
    padding: 1rem;
    border-radius: 0 0 8px 8px;
  }
`;

export const ContactBarWrapper = styled.div`
  max-width: fit-content;
`;

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
  }
`;

export const NavItem = styled.li``;

export const NavLinkItem = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
  font-size: 1.125rem;
  line-height: 1.2;
  padding: 0.5rem 0;
  display: inline-block;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }

  &.active-link {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.white};

    ${({ $underlineOnActive, theme }) =>
      $underlineOnActive &&
      `
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: ${theme.colors.gold};
        }
      `}
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const SearchForm = styled.form`
  display: flex;
  width: 100%;
`;

export const SearchInput = styled.input`
  min-width: 250px;
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 6px;
  font-size: 1rem;
  height: 40px;
  line-height: 1.2;
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.gold};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.gold};
  }
`;

export const SearchButton = styled.button`
  margin-left: 8px;
  border: none;
  background: transparent;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gold};
  }

  &:hover svg {
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const SearchIcon = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  transition: color 0.3s ease;
`;

export const CartIconWrapper = styled(IconButton)`
  position: relative;
`;

export const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: ${({ theme }) => theme.colors.gold};
  color: black;
  font-size: 12px;
  font-weight: bold;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;


export const IconsRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;
