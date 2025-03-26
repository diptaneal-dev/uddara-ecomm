// src/components/Typography/Heading.js
import styled from 'styled-components';

export const Heading = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-weight: ${({ theme, size = 'medium' }) =>
    theme.typography[`heading${capitalize(size)}`]?.fontWeight};
  font-size: ${({ theme, size = 'medium' }) =>
    theme.typography[`heading${capitalize(size)}`]?.fontSize};
  color: ${({ theme, color }) => color || theme.colors.purple};
  margin-bottom: ${({ margin }) => margin || '12px'};
  line-height: 1.2;
  letter-spacing: 0;
  text-align: ${({ align }) => align || 'left'};
`;

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
