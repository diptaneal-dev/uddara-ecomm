// src/components/home/WhyChooseUddara.Styles.js
import styled from 'styled-components';

export const Section = styled.section`
  background-color: #FAF6F1;
  padding: 60px 0;
  text-align: center;
`;

export const Heading = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-weight: ${({ theme }) => theme.typography.headingMedium.fontWeight};
  font-size: ${({ theme }) => theme.typography.headingMedium.fontSize};
  color: ${({ theme }) => theme.colors.purple};
  margin-bottom: 40px;
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
  background-color: ${({ theme }) => theme.colors.white};
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
  font-family: ${({ theme }) => theme.typography.fontPrimary};
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
