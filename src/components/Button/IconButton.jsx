// src/components/ui/IconButton.jsx
import styled from 'styled-components';

export const IconButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.navy};
  padding: 6px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.seashell};
    transform: scale(1.1);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;