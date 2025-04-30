// src/components/cart/Cart.Styles.js
import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: 2rem;
  background-color: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.black : theme.colors.backgroundSecondary};
  color: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.white : theme.colors.black};
`;

export const Heading = styled.h2`
  text-align: left;
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.headingMedium.fontSize};
  font-weight: ${({ theme }) => theme.typography.headingMedium.fontWeight};
  color: ${({ theme }) => theme.colors.purple};
  margin-bottom: 2rem;
`;

export const CartItem = styled.section`
  background-color: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.grey : theme.colors.white};
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.1);

  img {
    width: 100%;
    max-height: 150px;
    object-fit: contain;
    border-radius: 8px;
  }

  .details {
    flex: 1;
  }

  .quantity-control {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    align-items: center;
    margin-top: 0.5rem;
  }

  .price {
    text-align: right;
    font-weight: bold;
  }
`;

export const CartActionTray = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;

  .quantity-text {
    font-size: 1.2rem;
    font-weight: bold;
    min-width: 2rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.black};
  }

  .action {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;

    .label {
      font-size: 0.7rem;
      color: ${({ theme }) => theme.colors.greyText || '#888'};
    }
  }
`;

export const SummaryBox = styled.div`
  background-color: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.grey : theme.colors.white};
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.1);

  h4 {
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.teal};
  }

  .line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .promo {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .final-total {
    margin-top: 1rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.navy};
  }
`;

export const StickyBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.black : theme.colors.white};
  color: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.white : theme.colors.black};
  border-top: 1px solid ${({ theme }) => theme.colors.grey};
  padding: 1rem;
  box-shadow: 0 -2px 6px rgba(0,0,0,0.1);
`;
