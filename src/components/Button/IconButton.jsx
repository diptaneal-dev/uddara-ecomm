import styled from 'styled-components';

const iconSizes = {
  xs: "12px",
  sm: "16px",
  md: "20px",
  lg: "24px",
  xl: "50px",
};

export const IconButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["iconSize"].includes(prop),
})`
  background: none;
  border: ${({ borderColor }) => borderColor || 'none'}; /* No border by default */
  color: ${({ color, theme }) => color || theme.colors.navy};
  padding: 6px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ $hoverColor, theme }) => $hoverColor || theme.colors.seashell};
    color: ${({ $hoverIconColor, theme }) => $hoverIconColor || theme.colors.navy};
    transform: scale(1.1);
    border-color: ${({ $hoverBorderColor }) => $hoverBorderColor || 'none'}; /* Option to have no border on hover */
  }

  svg {
    width: ${({ iconSize }) => iconSizes[iconSize] || iconSizes.md};
    height: ${({ iconSize }) => iconSizes[iconSize] || iconSizes.md};
  }
`;
