// src/components/product/ProductList.Styles.js
import styled from 'styled-components';
import { Button } from 'react-vector';

export const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  min-height: 100vh;
  padding: 2rem 1rem;
  color: ${({ theme, $darkMode }) => ($darkMode ? theme.colors.white : theme.colors.black)};
  display: flex;
  flex-direction: column;
  max-width: 100%;
  width: 100%;
`;


export const Title = styled.h2`
  text-align: center;
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.headingMedium.fontSize};
  font-weight: ${({ theme }) => theme.typography.headingMedium.fontWeight};
  color: ${({ theme }) => theme.colors.purple};
  margin-bottom: 2rem;
`;

export const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;


export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); 
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  padding-bottom: ${({ theme }) => theme.spacing.md};

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const CardGridWrapper = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
`;

export const CartPanel = styled.div`
  width: 350px;
  background-color: ${({ theme, darkMode }) => (darkMode ? "#333" : theme.colors.white)};
  color: ${({ theme, darkMode }) => (darkMode ? theme.colors.white : theme.colors.black)};
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: ${({ $show }) => ($show ? "0" : "-400px")};
  height: 100%;
  z-index: 100000;
  transition: left 0.3s ease;
  display: flex;
  flex-direction: column;
`;

export const CartHeader = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

export const CartBody = styled.div`
  padding: 1rem;
  overflow-y: auto;
  flex: 1;
`;

export const CartFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.grey};

  .total {
    text-align: end;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .actions {
    display: flex;
    gap: 1rem;
  }
`;

// 🎯 1. Teal Filter Button
export const FilterButton = styled(Button)`
  ${({ theme, $outline }) =>
    $outline
      ? `
    background-color: transparent;
    color: ${theme.colors.teal};
    border: 1px solid ${theme.colors.teal};

    &:hover {
      background-color: ${theme.colors.teal};
      color: ${theme.colors.white};
    }
  `
      : `
    background-color: ${theme.colors.teal};
    color: ${theme.colors.white};
    border: 1px solid ${theme.colors.teal};

    &:hover {
      opacity: 0.9;
    }
  `}
  border-radius: 999px;
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
`;

// 2. Navy Cart Navigation Button
export const CartNavButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gold};
  border-radius: 50px;
  &:hover {
    opacity: 0.9;
  }
`;

export const SidebarFilters = styled.div`
  width: 220px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.white || "#f7f7f7"};
  border-right: none;
  height: 100%;
  position: relative;
  left: 0; 
  padding: 20px;
  @media (max-width: 768px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #ddd;
    margin-bottom: 1rem;
  }
`;

export const FilterGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const FilterLabel = styled.div`
  font-weight: bold; /* 👈 strong font */
  font-size: 1rem;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme.colors.primary || "#333"};
`;

export const FilterOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text || "#333"};

  input[type="checkbox"] {
    accent-color: ${({ theme }) => theme.colors.primary || "#6b46c1"};
    cursor: pointer;
  }
`;

export const MobileFilterToggle = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    margin-bottom: 1rem;
  }
`;

export const ClearFilterButton = styled.button`
  margin-bottom: 1rem;
  background: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
  font-size: 0.9rem;
  cursor: pointer;
  color: #444;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const ContentLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ProductResults = styled.div`
  flex: 1;
  min-width: 0;
`;

