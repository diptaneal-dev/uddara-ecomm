import styled from 'styled-components';

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.navy};
`;

export const Input = styled.input`
  padding: 0.6rem 0.75rem;
  font-size: 0.95rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;

  &:focus {
    border-color: ${({ theme }) => theme.colors.purple};
    box-shadow: 0 0 0 2px rgba(102, 48, 144, 0.1);
    outline: none;
  }
`;
