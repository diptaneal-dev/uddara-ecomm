// src/components/delivery/DeliveryAddressSelection.Styles.js
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 1rem;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.teal};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.06);
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AddressText = styled.p`
  margin-top: 1rem;
  line-height: 1.5;
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  color: ${({ theme }) => theme.colors.black};

  strong {
    color: ${({ theme }) => theme.colors.purple};
  }
`;

export const InlineLinkButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.teal};
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.95rem;

  &:hover {
    color: ${({ theme }) => theme.colors.pink};
  }
`;

export const SectionTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.headingSmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.headingSmall.fontWeight};
  color: ${({ theme }) => theme.colors.purple};
  margin-bottom: 1rem;
`;
