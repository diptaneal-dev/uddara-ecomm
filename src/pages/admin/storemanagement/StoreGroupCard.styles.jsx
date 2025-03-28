// src/components/StoreGroupCard/styles.jsx
import styled from 'styled-components';

export const GroupCardWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border: none;
  border-radius: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const GroupCardBody = styled.div`
  padding: 1.5rem;
`;

export const GroupTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const GroupName = styled.button`
  all: unset;
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.headingSmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.headingSmall.fontWeight};
  margin: 0;
  color: ${({ theme }) => theme.colors.navy};
  text-decoration: underline;
  cursor: pointer;
`;

export const GroupInfoText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.grey};
  margin-bottom: 0.4rem;
`;

export const GroupButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

export const GroupDetailsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem 2rem;
  padding: 1rem 0;
`;

export const GroupDetailItem = styled.div`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  line-height: 1.6;

  strong {
    color: ${({ theme }) => theme.colors.teal};
    font-weight: 600;
  }
`;

export const GroupDetailTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.purple};
  margin-bottom: 1.5rem;
`;

export const GroupDetailModalContent = styled.div`
  padding: 2rem 2.5rem;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: 0.75rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`;
