import styled from 'styled-components';

export const IconsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white};
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.pink};
    background-color: transparent;
  }
`;

// ✅ For cart icon with relative positioning
export const CartIconWrapper = styled(IconButton)`
  position: relative;
`;

// ✅ Badge itself
export const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: ${({ theme }) => theme.colors.pink};
  color: white;
  font-size: 12px;
  font-weight: bold;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;
