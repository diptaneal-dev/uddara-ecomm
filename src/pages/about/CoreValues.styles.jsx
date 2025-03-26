import styled from "styled-components";

export const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  padding: 60px 0;
  text-align: center;
`;

export const Heading = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.subHeading.fontSize};
  font-weight: ${({ theme }) => theme.typography.subHeading.fontWeight};
  color: ${({ theme }) => theme.colors.purple};
  margin-bottom: 40px;
`;

export const ValueCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 250px;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    min-height: 220px;
  }
`;

export const IconWrapper = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ValueTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.navy};
`;

export const ValueDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey};
`;