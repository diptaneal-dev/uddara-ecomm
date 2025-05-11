// src/components/blog/BlogsSummarySection.Styles.js
import styled from 'styled-components';

export const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  padding: 3rem 1rem;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const BlogGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const BlogCard = styled.div`
  flex: 1 1 30%;
  min-width: 280px;
  max-width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const Heading = styled.h2`
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


export const BlogImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

export const BlogContent = styled.div`
  padding: 1rem;

  h5 {
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    font-size: ${({ theme }) => theme.typography.blogCardTitle.fontSize};
    font-weight: ${({ theme }) => theme.typography.blogCardTitle.fontWeight};
    line-height: ${({ theme }) => theme.typography.blogCardTitle.lineHeight};
    color: ${({ theme }) => theme.typography.blogCardTitle.color};
    margin-bottom: 0.5rem;
  }

  p {
    font-family: ${({ theme }) => theme.typography.fontSecondary};
    color: ${({ theme }) => theme.colors.grey};
    font-size: 0.95rem;
    line-height: 1.4;
  }
`;
