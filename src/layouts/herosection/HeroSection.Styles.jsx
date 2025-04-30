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

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
    padding: 40px 20px;
  }
`;

export const HeroFrame = styled.div`
  max-width: 600px;
  height: auto;
  position: absolute;
  top: 60px;
  left: 60px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 2;

  @media (max-width: 1024px) {
    position: static;
    width: 100%;
    padding: 0 1rem;
    text-align: center;
    align-items: center;
  }
`;

export const HeroOverlay = styled.div`
  background-image: url(${(props) => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  filter: brightness(0.65); // optional
  transition: background-image 1s ease-in-out;
`;

export const HeroTopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    align-items: center;
  }
`;

export const HeroHeading = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: clamp(2rem, 4.5vw, ${({ theme }) => theme.typography.headingLarge.fontSize});
  font-weight: ${({ theme }) => theme.typography.headingLarge.fontWeight};
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
  max-width: 100%;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const HeroSubheading = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  font-weight: ${({ theme }) => theme.typography.subHeading.fontWeight};
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.white};
  max-width: 100%;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
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
    position: static;
    width: 300px;
    height: auto;
    margin-top: 30px;
  }

  @media (max-width: 768px) {
    width: 70%;
    max-width: 100%;
    height: auto;
    margin-top: 40px;
  }
`;
