import styled from "styled-components";

export const Container = styled.div`
  max-width: 1024px;
  margin: 1.5rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  font-family: ${({ theme }) => theme.typography.fontPrimary};

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 100%;
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
  width: 100%;
  max-width: 100%; /* Ensures it doesn't stretch beyond column */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 💥 Forces 3 columns */
  gap: 1rem 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for tablet */
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 1 column for mobile */
  }
`;

export const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.colors.navy};
`;

export const Input = styled.input`
  width: 100%;
  max-width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.95rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
`;


export const Select = styled.select`
  width: 100%;
  max-width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.95rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

export const Button = styled.button`
  width: ${({ $fitContent }) => ($fitContent ? "fit-content" : "100%")};
  padding: 0.5rem 1.25rem;
  background-color: ${({ theme }) => theme.colors.buttonPrimary};
  color: ${({ theme }) => theme.colors.buttonText};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.25s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.purple};
  }
`;

export const UploadContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  font-family: ${({ theme }) => theme.typography.fontPrimary};

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

export const UploadHeading = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.purple};
`;

export const UploadStatus = styled.p`
  margin-top: 1rem;
  font-weight: 500;
  color: ${({ success, theme }) => (success ? theme.colors.green : theme.colors.red)};
`;
