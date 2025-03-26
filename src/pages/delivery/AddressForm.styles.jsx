// src/components/delivery/AddressForm.Styles.js
import styled from 'styled-components';

export const FormCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;

export const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  flex: 1 1 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 8px;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.typography.fontSecondary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.purple};
  }
`;

export const InputHalf = styled(Input)`
  flex: 1 1 48%;
`;

export const Note = styled.p`
  color: ${({ theme }) => theme.colors.grey};
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.5rem;
`;
