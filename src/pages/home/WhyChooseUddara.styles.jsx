// src/components/home/WhyChooseUddara.Styles.js
import styled from 'styled-components';

export const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 60px 0;
  text-align: center;
`;

export const UddaraHeading = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontUddaraHeading};
  font-weight: ${({ theme }) => theme.typography.uddaraHeading.fontWeight};
  font-size: ${({ theme }) => theme.typography.uddaraHeading.fontSize};
  color: ${({ theme }) => theme.colors.charcoal};
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.uddaraHeadingMobile.fontSize};
    font-weight: ${({ theme }) => theme.typography.uddaraHeadingMobile.fontWeight};
    line-height: ${({ theme }) => theme.typography.uddaraHeadingMobile.lineHeight};
    margin-bottom: 1.5rem;
  }
`;

export const FeatureRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
`;

export const FeatureCol = styled.div`
  flex: 1 1 300px;
  max-width: 340px;
  display: flex;
`;

export const FeatureCard = styled.div`
  background-color: ${({ theme }) => theme.colors.seashell};
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 250px;
  width: 100%;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const IconWrapper = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.white};
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.pink};
`;

export const CardDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  font-size: 16px;
  color: #555;
  margin-bottom: 0;
`;
