// src/components/StoreListModal/styles.jsx
import styled from 'styled-components';

export const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10500;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalDialog = styled.div`
  max-width: 960px;
  width: 100%;
  margin: auto;
`;

export const ModalContent = styled.div`
  border-radius: 1rem;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
`;

export const ModalHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h5`
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  font-size: 1.25rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.navy};
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.grey};
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.navy};
    transform: scale(1.2);
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
`;

export const ModalFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
`;

export const NoStoresText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.grey};
`;