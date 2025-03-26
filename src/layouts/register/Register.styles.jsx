import styled from "styled-components";

export const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 80px 1rem 40px; /* 👈 Changed left/right to 1rem */
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  display: flex;
  justify-content: center;
`;

export const Layout = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px; /* 👈 Reduce this from 1200px */
  gap: 2rem;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FormCard = styled.div`
  flex: 2;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  max-width: 700px; /* 👈 Add this */
  width: 100%;
`;

export const PerksCard = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

export const Heading = styled.h2`
  font-size: ${({ theme }) => theme.typography.headingMedium.fontSize};
  font-weight: ${({ theme }) => theme.typography.headingMedium.fontWeight};
  color: ${({ theme }) => theme.colors.purple};
  margin-bottom: 1rem;
`;

export const SubText = styled.p`
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  color: ${({ theme }) => theme.colors.grey};
  margin-bottom: 2rem;
`;

export const InputGroup = styled.div`
  position: relative;

  input {
    padding-right: 70px;
  }

  button {
    position: absolute;
    right: 0.75rem;
    top: 54%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.grey};
    font-size: 0.85rem;
    padding: 0;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.black};
    }
  }
`;
