// src/components/ui/Button.js
import styled, { css, keyframes } from 'styled-components';

const loadingSpinner = keyframes`
  to { transform: rotate(360deg); }
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  ${({ size }) =>
    size === 'sm'
      ? css`
          padding: 0.4rem 1rem;
          height: 36px;
          font-size: 0.85rem;
          min-width: auto;
        `
      : css`
          padding: 0.75rem 1.5rem;
          height: 52px;
          font-size: 1rem;
          min-width: 160px;
        `}

  border-radius: 100px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  ${({ variant = 'primary', theme }) => {
    if (variant === 'icon') {
      return css`
        background-color: transparent;
        color: ${theme.colors.pink};
        border: none;
        padding: 0.25rem;
        height: auto;
        min-width: auto;
        font-size: 1rem;

        &:hover {
          opacity: 0.8;
          transform: scale(1.1);
        }
      `;
    }

    const bgColor =
      variant === 'secondary'
        ? theme.colors.buttonSecondary
        : theme.colors.buttonPrimary;

    return css`
      background-color: ${bgColor};
      color: ${theme.colors.white};
      border: 2px solid ${bgColor};

      &:hover {
        opacity: 0.9;
      }
    `;
  }}

  ${({ outline, variant = 'primary', theme }) => {
    const color =
      variant === 'secondary'
        ? theme.colors.buttonSecondary
        : theme.colors.buttonPrimary;

    return (
      outline &&
      css`
        background-color: transparent;
        color: ${color};
        border: 2px solid ${color};

        &:hover {
          background-color: ${color};
          color: ${theme.colors.white};
        }
      `
    );
  }}

  ${({ disabled, theme }) =>
    disabled &&
    css`
      background-color: ${theme.colors.buttonDisabled};
      color: ${theme.colors.white};
      border: 2px solid ${theme.colors.buttonDisabled};
      cursor: not-allowed;
      opacity: 0.7;
    `}

  svg.spinner {
    animation: ${loadingSpinner} 1s linear infinite;
    font-size: 1rem;
  }
`;
