// src/components/StoreCard/styles.jsx
import styled from 'styled-components';

export const CardWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.teal};
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 1.5rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const CardBody = styled.div`
  padding: 1.5rem;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const StoreName = styled.h6`
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  font-size: ${({ theme }) => theme.typography.subHeadingSmall.fontSize};
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.navy};
`;

export const InfoText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 0.4rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;