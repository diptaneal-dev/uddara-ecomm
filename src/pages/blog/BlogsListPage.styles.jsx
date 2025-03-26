import styled from "styled-components";

export const PageContainer = styled.div`
  padding-top: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const GridWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const SectionHeading = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.headingMedium.fontSize};
  font-weight: ${({ theme }) => theme.typography.headingMedium.fontWeight};
  color: ${({ theme }) => theme.colors.purple};
  text-align: center;
  margin-bottom: 1rem;
`;

export const BlogGridWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const BlogGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: space-between;

  @media (max-width: 576px) {
    justify-content: center;
    padding: 0 0.5rem;
  }
`;

export const BlogCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  flex: 1 1 calc(30% - 1rem);
  max-width: calc(30% - 1rem);
  min-height: 300px;

  &:hover {
    transform: scale(1.03);
  }

  @media (max-width: 992px) {
    flex: 1 1 calc(50% - 1rem);
    max-width: calc(50% - 1rem);
  }

  @media (max-width: 576px) {
    flex: 1 1 100%;
    max-width: 100%;
  }
`;

export const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
`;

export const BlogContent = styled.div`
  padding: 1rem;

  h5 {
    font-family: ${({ theme }) => theme.typography.fontPrimary};
    font-size: ${({ theme }) => theme.typography.blogCardTitle.fontSize};
    font-weight: ${({ theme }) => theme.typography.blogCardTitle.fontWeight};
    color: ${({ theme }) => theme.colors.navy};
    margin-bottom: 0.5rem;
  }

  p {
    font-family: ${({ theme }) => theme.typography.fontSecondary};
    color: ${({ theme }) => theme.colors.grey};
    font-size: 0.95rem;
    line-height: 1.4;
  }

  small {
    color: ${({ theme }) => theme.colors.grey};
    font-size: 0.75rem;
  }
`;

export const CreateButton = styled.button`
  background-color: ${({ theme }) => theme.colors.buttonSecondary};
  color: ${({ theme }) => theme.colors.buttonText};
  font-weight: bold;
  border: none;
  border-radius: 50px;
  padding: 0.5rem 1.25rem;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;