// src/components/home/AboutBrand.Styles.js
import styled from 'styled-components';

export const Section = styled.section`
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
`;

export const LeftCol = styled.div`
  flex: 1 1 50%;
  background-color: ${({ theme }) => theme.colors.green};
  height: 350px;
  padding: 40px;
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    flex: 1 1 100%;
    padding: 30px 20px;
    height: auto;
  }
`;

export const RightCol = styled.div`
  flex: 1 1 50%;

  img {
    width: 100%;
    height: 350px;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

export const Heading = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-weight: ${({ theme }) => theme.typography.headingMedium.fontWeight};
  font-size: ${({ theme }) => theme.typography.headingMedium.fontSize};
  color: ${({ theme }) => theme.colors.purple};
  margin-bottom: 12px;
`;

export const Divider = styled.hr`
  width: 100px;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.navy};
  border: none;
  margin-bottom: 20px;
`;

export const Description = styled.p`
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 24px;
  margin-left: 0;
  strong {
    font-weight: 600;
  }
`;

export const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.buttonPrimary};
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.buttonPrimary};
  border-radius: 100px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;
