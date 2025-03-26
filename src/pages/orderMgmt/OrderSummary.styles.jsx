// src/components/checkout/OrderSummary.Styles.js
import styled from 'styled-components';

export const SummaryContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;

export const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.headingSmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.headingSmall.fontWeight};
  color: ${({ theme }) => theme.colors.purple};
  margin-bottom: 1.5rem;
`;

export const AddressBox = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  margin-bottom: 1rem;

  h5 {
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.black};
  }

  p {
    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.grey};
  }
`;

export const ConfirmNote = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.grey};
  text-align: center;
  margin-top: 1rem;

  label {
    margin-left: 0.5rem;
  }
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.pink};
  font-size: 0.875rem;
  text-align: center;
  margin-top: 1rem;
`;

export const Disclaimer = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey};
  margin-top: 2rem;

  a {
    color: ${({ theme }) => theme.colors.purple};
    text-decoration: underline;
  }
`;
