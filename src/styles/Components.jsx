import styled, { css, keyframes } from 'styled-components';

const loadingSpinner = keyframes`
  to { transform: rotate(360deg); }
`;

const sizeStyles = {
  xs: css`padding: 0.2rem 0.6rem; font-size: 0.7rem;`,
  sm: css`padding: 0.3rem 0.75rem; font-size: 0.8rem;`,
  md: css`padding: 0.6rem 1.25rem; font-size: 0.95rem; height: 44px; min-width: 120px;`,
  lg: css`padding: 0.75rem 1.5rem; font-size: 1rem; height: 52px; min-width: 160px;`,
};

const variantStyles = {
  primary: (theme, props) => css`
    background-color: ${props.$bg || theme.colors.buttonPrimary};
    color: ${props.color || theme.colors.white};
    border: 2px solid ${props.borderColor || props.$bg || theme.colors.buttonPrimary};
    &:hover { opacity: 0.9; }
  `,
  secondary: (theme, props) => css`
    background-color: ${props.$bg || theme.colors.buttonSecondary};
    color: ${props.color || theme.colors.white};
    border: 2px solid ${props.borderColor || props.$bg || theme.colors.buttonSecondary};
    &:hover { opacity: 0.9; }
  `,
  icon: (theme, props) => css`
    background-color: transparent;
    color: ${props.color || theme.colors.pink};
    border: none;
    padding: 0.25rem;
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

  ${({ $size = 'md' }) => sizeStyles[$size]};
  ${({ $variant = 'primary', theme, ...props }) => variantStyles[$variant]?.(theme, props)};

  ${({ $outline, $variant = 'primary', theme, color, borderColor }) => {
    const fallback = $variant === 'secondary' ? theme.colors.buttonSecondary : theme.colors.buttonPrimary;
    const finalColor = color || fallback;
    const finalBorder = borderColor || finalColor;

    return $outline && css`
      background-color: transparent;
      color: ${finalColor};
      border: 2px solid ${finalBorder};

      &:hover {
        background-color: ${finalColor};
        color: ${theme.colors.white};
      }
    `;
  }}

  ${({ disabled, theme }) =>
    disabled && css`
      background-color: ${theme.colors.buttonDisabled};
      color: ${theme.colors.white};
      border: 2px solid ${theme.colors.buttonDisabled};
      cursor: not-allowed;
      opacity: 0.7;
    `
  }

  ${({ $fitContent }) => $fitContent && css`
    width: auto;
    min-width: unset;
  `}

  ${({ $loading }) => $loading && css`
    pointer-events: none;
    opacity: 0.6;
  `}

  ${({ $margin = '0' }) => css`margin: ${$margin};`}

  svg.spinner {
    animation: ${loadingSpinner} 1s linear infinite;
  }
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.typography.borderRadius.medium};
  padding: ${({ theme }) => theme.typography.spacing.lg};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  padding: ${({ theme }) => theme.typography.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: ${({ theme }) => theme.typography.borderRadius.small};
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.paragraph.fontSize};
  color: ${({ theme }) => theme.colors.black};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.pink};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey};
  }
`;

export const Heading = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.headingLarge.fontSize};
  color: ${({ theme }) => theme.colors.purple};
`;

export const Paragraph = styled.p`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.paragraph.fontSize};
  line-height: ${({ theme }) => theme.typography.paragraph.lineHeight};
  color: ${({ theme }) => theme.colors.grey};
`;
