// src/components/delivery/AddressList.Styles.js
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 1rem;
`;

export const Title = styled.h4`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.headingSmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.headingSmall.fontWeight};
  color: ${({ theme }) => theme.colors.purple};
  margin-bottom: 1rem;
`;

export const AddressCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.grey};
  padding: 1rem;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  margin-bottom: 1.5rem;
  text-align: left;

  p {
    margin: 0.25rem 0;
    color: ${({ theme }) => theme.colors.black};
  }

  strong {
    color: ${({ theme }) => theme.colors.purple};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
