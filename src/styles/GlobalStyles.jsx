// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.white};
    line-height: 1;
  }

  h1 {
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    font-size: ${({ theme }) => theme.typography.headingLarge.fontSize};
    font-weight: ${({ theme }) => theme.typography.headingLarge.fontWeight};
    line-height: ${({ theme }) => theme.typography.headingLarge.lineHeight};
    letter-spacing: ${({ theme }) => theme.typography.headingLarge.letterSpacing};
    color: ${({ theme }) => theme.colors.purple};
  }

  h2, h3 {
    font-family: ${({ theme }) => theme.typography.fontSecondary};
    font-size: ${({ theme }) => theme.typography.subHeading.fontSize};
    font-weight: ${({ theme }) => theme.typography.subHeading.fontWeight};
    line-height: ${({ theme }) => theme.typography.subHeading.lineHeight};
    letter-spacing: ${({ theme }) => theme.typography.subHeading.letterSpacing};
    color: ${({ theme }) => theme.colors.navy};
  }

  p {
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    font-size: ${({ theme }) => theme.typography.paragraph.fontSize};
    font-weight: ${({ theme }) => theme.typography.paragraph.fontWeight};
    line-height: ${({ theme }) => theme.typography.paragraph.lineHeight};
    letter-spacing: ${({ theme }) => theme.typography.paragraph.letterSpacing};
    color: ${({ theme }) => theme.colors.grey};
  }
`;
