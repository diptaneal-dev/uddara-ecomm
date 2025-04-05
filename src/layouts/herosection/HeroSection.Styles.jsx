import styled from 'styled-components';

export const HeroSection = styled.section`
  max-width: 1440px;
  width: 100%;
  background-color: #FFF;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 20px;
  height: 525px; 

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto; // Let content define height on mobile
    padding: 40px 20px;
  }
`;

export const HeroFrame = styled.div`
  width: 567px;
  height: 400px;
  position: absolute;
  top: 40px;
  left: 188px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 2;

  @media (max-width: 1024px) {
    left: 50px;
    width: 90%;
  }

  @media (max-width: 768px) {
    position: static;
    width: 100%;
    align-items: center;
    text-align: center;
  }
`;

export const HeroTopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const HeroHeading = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.headingLarge.fontSize};
  font-weight: ${({ theme }) => theme.typography.headingLarge.fontWeight};
  line-height: 110%;
  color: ${({ theme }) => theme.colors.purple};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const HeroSubheading = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  font-size: 32px;
  font-weight: ${({ theme }) => theme.typography.subHeading.fontWeight};
  line-height: 120%;
  color: ${({ theme }) => theme.colors.navy};

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const HeroBottomSection = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const HeroImage = styled.img`
  width: 450px;
  height: 450px;
  position: absolute;
  top: 40px;
  right: 50px;
  z-index: 1;

  @media (max-width: 1024px) {
    width: 300px;
    height: 300px;
    right: 20px;
  }

  @media (max-width: 768px) {
    position: static;
    width: 80%;
    height: auto;
    margin-top: 20px;
  }
`;