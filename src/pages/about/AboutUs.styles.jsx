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

export const IntroImage = styled.img`
  flex: 1;
  width: 30%;
  max-width: 100%;
  height: auto;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
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