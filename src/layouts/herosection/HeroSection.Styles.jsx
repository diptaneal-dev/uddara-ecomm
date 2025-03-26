import styled from 'styled-components';

export const HeroSection = styled.section`
  height: 525px;
  max-width: 1440px;
  width: 100%;
  background-color: #FFF;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0;
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
`;

export const HeroTopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
`;

export const HeroHeading = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.headingLarge.fontSize};
  font-weight: ${({ theme }) => theme.typography.headingLarge.fontWeight};
  line-height: 110%;
  color: ${({ theme }) => theme.colors.purple};
`;

export const HeroSubheading = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  font-size: 32px;
  font-weight: ${({ theme }) => theme.typography.subHeading.fontWeight};
  line-height: 120%;
  color: ${({ theme }) => theme.colors.navy};
`;

export const HeroBottomSection = styled.div`
  display: flex;
  gap: 20px;
`;

export const Button = styled.button`
  width: 239px;
  height: 65px;
  border-radius: 100px;
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  background-color: ${({ bg, theme }) =>
    typeof bg === 'function' ? bg({ theme }) : bg};
  color: ${({ theme }) => theme.colors.white};
`;

export const HeroImage = styled.img`
  width: 450px;
  height: 450px;
  position: absolute;
  top: 40px;
  right: 50px;
`;
