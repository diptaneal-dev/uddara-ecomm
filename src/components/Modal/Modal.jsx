import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalDialog = styled.div`
  max-width: 800px;
  width: 95%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  font-family: ${({ theme }) => theme.typography.fontPrimary};
`;

const ModalHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #ddd;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const ModalTitle = styled.h4`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.navy};
`;

const CloseButton = styled(FaTimes)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.grey};
  font-size: 1.1rem;

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
  overflow-y: auto;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

const ModalFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const Modal = ({ open, onClose, title, children, footer }) => {
  if (!open) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalDialog onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title || 'Dialog'}</ModalTitle>
          <CloseButton onClick={onClose} />
        </ModalHeader>

        <ModalBody>{children}</ModalBody>

        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalDialog>
    </ModalOverlay>
  );
};
