// src/hooks/UserContextView.styles.jsx

import styled from 'styled-components';
import {
  List as TabsListPrimitive,
  Trigger as TabsTriggerPrimitive,
} from '@radix-ui/react-tabs';

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

  ${({ variant, theme }) =>
    variant === 'secondary' &&
    `
      background-color: ${theme.colors.teal};
    `}
`;

export const Separator = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.grey};
  margin: ${({ theme }) => theme.typography.spacing.lg} 0;
`;

export const TabList = styled(TabsListPrimitive)`
  display: flex;
  gap: ${({ theme }) => theme.typography.spacing.sm};
  margin-bottom: ${({ theme }) => theme.typography.spacing.md};
`;

export const TabTrigger = styled(TabsTriggerPrimitive)`
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.typography.borderRadius.small};
  background: ${({ theme }) => theme.colors.seashell};
  font-weight: 500;
  cursor: pointer;
  border: none;

  &[data-state='active'] {
    background: ${({ theme }) => theme.colors.navy};
    color: ${({ theme }) => theme.colors.white};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.teal};
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.9;
  }
`;

export const TabLayout = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: ${({ theme }) => theme.typography.spacing.lg};
`;

export const SectionHeading = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: ${({ theme }) => theme.typography.spacing.md};
`;

export const GridRow = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: start;
  gap: ${({ theme }) => theme.typography.spacing.lg};
  margin-bottom: ${({ theme }) => theme.typography.spacing.xl};
`;

export const KeyValueGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.typography.spacing.sm};
`;

export const KeyValueItem = styled.div`
  display: flex;
  min-height: 56px;
  padding: ${({ theme }) => theme.typography.spacing.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

export const Key = styled.div`
  width: 180px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grey};
  padding-right: ${({ theme }) => theme.typography.spacing.sm};
  flex-shrink: 0;
`;

export const Value = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.colors.black};
  font-weight: 400;
`;

export const TableWrapper = styled.div`
  width: 100%;
  padding-right: ${({ theme }) => theme.typography.spacing.lg};
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  min-width: 500px;
`;

export const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.grey};
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.typography.spacing.sm};
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};

  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

export const TableCell = styled.td`
  padding: ${({ theme }) => theme.typography.spacing.sm};
  vertical-align: top;
`;
