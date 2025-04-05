import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 1.5rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  font-family: ${({ theme }) => theme.typography.fontPrimary};

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`;

export const Heading = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.purple};
  text-align: left;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem 2rem;
`;

export const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.colors.navy};
`;

export const Input = styled.input`
  padding: 0.5rem 0.75rem;
  font-size: 0.95rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

export const Select = styled.select`
  padding: 0.5rem 0.75rem;
  font-size: 0.95rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
`;
