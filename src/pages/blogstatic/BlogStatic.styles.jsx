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

export const BlogHeroImage = styled.div`
  width: 100%;
  height: 650px; /* Balanced visual space */
  background-image: url('/images/whyfoxnut.png'); /* default fallback */
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  margin-bottom: 3rem;
  border-radius: 0;

  @media (min-width: 1440px) {
    height: 450px; /* Slightly taller on ultra-wide screens */
  }

  @media (max-width: 1024px) {
    height: 350px;
  }

  @media (max-width: 768px) {
    height: 250px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;


export const BlogHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.navy};
    margin-bottom: 0.5rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

export const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.grey};
  margin-top: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Section = styled.section`
  margin-bottom: 2.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.purple};
  text-align: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  text-align: justify;
  margin-bottom: 1rem;
  color: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.white : theme.colors.black};
`;

export const Highlight = styled.strong`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.teal};
`;

export const ListItem = styled.li`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 0.75rem;
  color: ${({ theme, darkMode }) =>
    darkMode ? theme.colors.white : theme.colors.black};
`;
