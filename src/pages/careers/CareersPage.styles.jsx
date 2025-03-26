import styled from "styled-components";

export const SectionHeading = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.headingMedium.fontSize};
  font-weight: ${({ theme }) => theme.typography.headingMedium.fontWeight};
  color: ${({ theme }) => theme.colors.purple};
  text-align: center;
  margin-bottom: 1rem;
`;

export const SectionSubHeading = styled.h4`
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  font-size: ${({ theme }) => theme.typography.subHeadingSmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.subHeadingSmall.fontWeight};
  color: ${({ theme }) => theme.colors.pink};
  text-align: center;
  margin-bottom: 1rem;
`;

export const JobTitle = styled.h5`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.blogCardTitle.fontSize};
  font-weight: ${({ theme }) => theme.typography.blogCardTitle.fontWeight};
  color: ${({ theme }) => theme.typography.blogCardTitle.color};
`;

export const MessageCard = styled.div`
  text-align: center;
  padding: 2rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  p {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.grey};
  }
`;