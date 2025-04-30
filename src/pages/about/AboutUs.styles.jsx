import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 3rem 1rem;
  background-color: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.navy : theme.colors.backgroundPrimary};
  color: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.white : theme.colors.black};
`;

export const PurpleCard = styled.div`
  background-color: #6a0dad; /* purple */
  border-radius: 1.5rem;
  padding: 2rem;
  color: white;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const BoxParagraph = styled.div`
  line-height: 1.7;
  text-align: justify;
  overflow: hidden; /* Ensures it clears float properly if needed */
`;


export const IntroSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 3rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const IntroText = styled.div`
  flex: 1;
`;

// In AboutUs.styles.js
export const IntroImage = styled.img`
  float: right;
  width: 300px;
  height: auto;
  margin: 0 0 1rem 2rem;
  border-radius: 1rem;
  object-fit: cover;

  @media (max-width: 768px) {
    float: none;
    display: block;
    margin: 1.5rem auto;
    width: 100%;
    max-width: 100%;
  }
`;

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.purple};
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const PageHeading = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.headingLarge.fontSize};
  font-weight: ${({ theme }) => theme.typography.headingLarge.fontWeight};
  color: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.white : theme.colors.navy};
`;

export const SubHeading = styled.p`
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  font-size: 1.25rem;
  color: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.white : theme.colors.grey};
`;

export const Paragraph = styled.p`
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  font-size: 1rem;
  color: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.white : theme.colors.black};
  line-height: 1.6;
  text-align: justify;
`;

export const Highlight = styled.strong`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.teal};
`;