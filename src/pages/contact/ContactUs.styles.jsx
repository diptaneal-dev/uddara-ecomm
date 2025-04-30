import styled from "styled-components";

export const PageWrapper = styled.div`
  padding: 3rem 1rem;
  background-color: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.navy : theme.colors.backgroundPrimary};
  color: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.white : theme.colors.black};
`;

export const SectionHeading = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.headingMedium.fontSize};
  font-weight: ${({ theme }) => theme.typography.headingMedium.fontWeight};
  color: ${({ theme }) => theme.colors.purple};
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const ContactCard = styled.div`
  background-color: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.grey : theme.colors.backgroundPrimary};
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.grey};

  &:hover {
    transform: translateY(-5px);
  }
`;

export const IconWrapper = styled.div`
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.purple};
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
`;

export const ModalContent = styled.div`
  background-color: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.navy : theme.colors.white};
  color: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.white : theme.colors.black};
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h5 {
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    font-size: 1.25rem;
    font-weight: 600;
  }

  .btn-close {
    background: none;
    border: none;
    font-size: 1.25rem;
    color: ${({ theme, darkMode }) =>
      darkMode ? theme.colors.white : theme.colors.black};
    cursor: pointer;
  }
`;

export const ModalBody = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-weight: 500;
    margin-bottom: 0.5rem;
    font-family: ${({ theme }) => theme.typography.fontSecondary};
  }

  input,
  textarea {
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.grey};
    font-family: ${({ theme }) => theme.typography.fontSecondary};
  }
`;

export const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.buttonText};
  padding: 0.75rem 1.5rem;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;
