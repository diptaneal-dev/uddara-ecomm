// src/components/StepStoreModal/styles.jsx
import styled from 'styled-components';

export const ModalOverlay = styled.div`
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

export const ModalDialog = styled.div`
  max-width: 1000px;
  width: 95%;
  margin: auto;
`;

export const ModalContent = styled.div`
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  font-family: ${({ theme }) => theme.typography.fontPrimary};
`;

export const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const ModalTitle = styled.h5`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: 1.5rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.navy};
`;

export const ModalBody = styled.div`
  padding: 2rem;
`;

export const ModalFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 0.75rem;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const ProgressBarWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const StepLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grey};
  margin-bottom: 0.5rem;

  span.active {
    color: ${({ theme }) => theme.colors.navy};
  }
`;

export const StepSegment = styled.div`
  flex: 1;
  transition: background-color 0.3s;
  background-color: ${({ theme, isActive, stepColor }) =>
    isActive ? theme.colors[stepColor] : "#e0e0e0"};
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem 2rem;
  margin-bottom: 2rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.colors.navy};
`;

export const Input = styled.input`
  padding: 0.5rem 0.75rem;
  font-size: 0.95rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

export const Select = styled.select`
  padding: 0.5rem 0.75rem;
  font-size: 0.95rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
`;
