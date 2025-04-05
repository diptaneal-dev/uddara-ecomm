// src/components/TimeSelect/TimeSelect.styles.jsx
import styled, { css } from "styled-components";

export const TimeSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const baseStyle = css`
  padding: 0.5rem 0.75rem;
  font-size: 0.95rem;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  background-color: ${({ theme }) => theme.colors.white};
  transition: all 0.2s ease;
`;

const variants = {
  default: css`
    ${baseStyle};
    border: 1px solid #ccc;
    color: ${({ theme }) => theme.colors.black};

    &:focus {
      border-color: ${({ theme }) => theme.colors.pink};
      outline: none;
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.pink}33;
    }
  `,
  minimal: css`
    ${baseStyle};
    border: none;
    background-color: transparent;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
    color: ${({ theme }) => theme.colors.navy};
  `,
  borderless: css`
    ${baseStyle};
    border: none;
    background-color: ${({ theme }) => theme.colors.seashell};
    color: ${({ theme }) => theme.colors.navy};
  `
};

export const StyledSelect = styled.select`
  ${({ variant }) => variants[variant] || variants.default};
`;
