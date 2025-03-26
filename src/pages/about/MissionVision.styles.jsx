import styled from "styled-components";

export const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  padding: 60px 0;
  text-align: center;
`;

export const StatementCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 250px;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    min-height: 220px;
    padding: 20px;
  }
`;

export const IconWrapper = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StatementTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

export const StatementDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey};
  max-width: 500px;
  margin: auto;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
