// src/components/checkout/CheckoutPage.Styles.js
import styled from "styled-components";

export const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  padding: 1rem 1rem;
  min-height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: flex-end; 
  align-items: center;
`;

export const ContentGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftCol = styled.div`
  flex: 1;
  min-width: 320px;
  max-width: 45%;
`;

export const RightCol = styled.div`
  flex: 1.25;
  min-width: 320px;
  max-width: 55%;
`;

export const Heading = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.headingSmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.headingSmall.fontWeight};
  color: ${({ theme }) => theme.colors.purple};
  text-align: center;
  margin-bottom: 1rem;
`;

export const SuccessAlert = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 500;
`;

export const SummaryBox = styled.div`
  width: 100%; 
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
`;
