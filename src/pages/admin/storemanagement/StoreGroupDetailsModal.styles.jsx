import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10500;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  width: 90%;
  max-width: 840px;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  padding: 2.5rem 3rem;
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  padding-bottom: 1rem;
  margin-bottom: 2rem;
`;

export const ModalTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.headingSmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.headingSmall.fontWeight};
  color: ${({ theme }) => theme.colors.purple};
  margin: 0;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.grey};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.pink};
  }
`;

export const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3-column layout */
  gap: 1rem 1.5rem; /* tighter spacing */
`;

export const GridItem = styled.div`
  font-family: ${({ theme }) => theme.typography.fontSecondary};

  strong {
    display: block;
    font-size: 0.75rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.teal};
    margin-bottom: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  span {
    font-size: 1rem;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const GroupDetailModalContent = styled.div`
  padding: 0;
`;

export const GroupDetailTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  font-size: ${({ theme }) => theme.typography.subHeadingSmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.subHeadingSmall.fontWeight};
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 1.5rem;
`;

export const GroupDetailsList = ModalGrid;
export const GroupDetailItem = GridItem;
