// src/components/navbar/Navbar.Styles.js
import styled from 'styled-components';

export const NavContainer = styled.nav`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

export const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

export const NavItem = styled.li``;

export const NavLinkItem = styled.span`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.purple};
  font-weight: 500;
  font-size: 1rem;
  transition: all 0.3s ease-in-out;
  position: relative;
  padding-bottom: 4px;
  display: inline-block;

  &:hover {
    color: #870343; /* You can add this to the theme if reused */
    font-size: 1.1rem;
    transform: scale(1.05);
  }

  &.active-link {
    color: ${({ theme }) => theme.colors.white} !important;
    font-weight: 600;
    background-color: ${({ theme }) => theme.colors.navy};
    border-radius: 5px;
    padding: 0.5rem 1rem;
  }

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    padding: 0.5rem 0;
  }
`;
