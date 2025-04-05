// src/components/UserContextView.styles.js
import styled from 'styled-components';

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.typography.borderRadius.medium};
  padding: ${({ theme }) => theme.typography.spacing.lg};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const CardContent = styled.div`
  padding: ${({ theme }) => theme.typography.spacing.md};
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: ${({ theme }) => theme.typography.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.pink};
  color: ${({ theme }) => theme.colors.white};

  ${({ variant, theme }) => variant === 'secondary' && `
    background-color: ${theme.colors.teal};
    color: ${theme.colors.white};
  `}
`;

export const Separator = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.grey};
  margin: ${({ theme }) => theme.typography.spacing.lg} 0;
`;
