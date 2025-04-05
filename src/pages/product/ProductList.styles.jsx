// src/components/product/ProductList.Styles.js
import styled from 'styled-components';
import { Button } from '../../components/Button/Button';

export const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  min-height: 100vh;
  padding: 3rem 2rem;
  color: ${({ theme, $darkMode }) => ($darkMode ? theme.colors.white : theme.colors.black)};
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
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

export const ProductCard = styled.div`
  flex: 1 1 30%;
  min-width: 250px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }

img {
  aspect-ratio: 112 / 95;
  object-fit: contain;
  width: 100%;
  height: auto;
}


  .card-body {
    padding: 1rem;
    text-align: center;
  }

  h5 {
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    font-size: 1.1rem;
    margin: 0.75rem 0;
    color: ${({ theme }) => theme.colors.black};
  }

  .price {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.pink};
  }

  .old-price {
    text-decoration: line-through;
    color: ${({ theme }) => theme.colors.grey};
    margin-right: 0.5rem;
  }

  .badge {
    background-color: ${({ theme }) => theme.colors.teal};
    color: ${({ theme }) => theme.colors.white};
    margin-left: 0.5rem;
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
    border-radius: 8px;
  }
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

// 🎯 2. Navy Cart Navigation Button
export const CartNavButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.navy};
  border-radius: 100px;
  &:hover {
    opacity: 0.9;
  }
`;
