import styled, { css, keyframes } from 'styled-components';

const loadingSpinner = keyframes`
  to { transform: rotate(360deg); }
`;

const sizeStyles = {
  xs: css`
    padding: 0.2rem 0.6rem;
    font-size: 0.7rem;
    height: auto;
    min-width: auto;
  `,
  sm: css`
    padding: 0.3rem 0.75rem;
    font-size: 0.8rem;
    height: auto;
    min-width: auto;
  `,
  md: css`
    padding: 0.6rem 1.25rem;
    font-size: 0.95rem;
    height: 44px;
    min-width: 120px;
  `,
  lg: css`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    height: 52px;
    min-width: 160px;
  `,
};

const variantStyles = {
  primary: (theme, props) => css`
    background-color: ${props.bg || theme.colors.buttonPrimary};
    color: ${props.color || theme.colors.white};
    border: 2px solid ${props.borderColor || props.bg || theme.colors.buttonPrimary};

    &:hover {
      opacity: 0.9;
    }
  `,
  secondary: (theme, props) => css`
    background-color: ${props.bg || theme.colors.buttonSecondary};
    color: ${props.color || theme.colors.white};
    border: 2px solid ${props.borderColor || props.bg || theme.colors.buttonSecondary};

    &:hover {
      opacity: 0.9;
    }
  `,
  icon: (theme, props) => css`
    background-color: transparent;
    color: ${props.color || theme.colors.pink};
    border: none;
    padding: 0.25rem;
    height: auto;
    min-width: auto;
    font-size: 1rem;

    &:hover {
      opacity: 0.8;
      transform: scale(1.1);
    }
  `,
};

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 100px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  ${({ $size = 'md' }) => sizeStyles[$size] || sizeStyles.md};

  ${({ $variant = 'primary', theme, ...props }) =>
    variantStyles[$variant]?.(theme, props)};

  ${({ $outline, $variant = 'primary', theme, color, borderColor }) => {
    const fallbackColor =
      $variant === 'secondary'
        ? theme.colors.buttonSecondary
        : theme.colors.buttonPrimary;

    const finalColor = color || fallbackColor;
    const finalBorder = borderColor || finalColor;

    return (
      $outline &&
      css`
        background-color: transparent;
        color: ${finalColor};
        border: 2px solid ${finalBorder};

        &:hover {
          background-color: ${finalColor};
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
