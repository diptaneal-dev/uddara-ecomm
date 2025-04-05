import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 1.5rem auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border-radius: ${({ theme }) => theme.typography.borderRadius.large};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  font-family: ${({ theme }) => theme.typography.fontPrimary};

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`;

export const Heading = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.headingSmall.fontSize};
  font-weight: ${({ theme }) => theme.typography.headingSmall.fontWeight};
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: ${({ theme }) => theme.typography.spacing.md};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.typography.spacing.sm};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.typography.spacing.md};
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.typography.spacing.md};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.smallText.fontSize};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.navy};
  margin-bottom: 4px;
`;

export const Input = styled.input`
  padding: 0.6rem 1rem;
  font-size: ${({ theme }) => theme.typography.bodyText.fontSize};
  border-radius: ${({ theme }) => theme.typography.borderRadius.medium};
  border: 1px solid #ccc;
  background-color: ${({ theme }) => theme.colors.white};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.purple};
    box-shadow: 0 0 0 2px rgba(102, 48, 144, 0.2);
  }
`;

export const PrimaryButton = styled.button`
  background: ${({ theme }) => theme.colors.buttonPrimary};
  color: ${({ theme }) => theme.colors.buttonText};
  border: none;
  padding: 0.6rem 1.25rem;
  font-size: ${({ theme }) => theme.typography.smallText.fontSize};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.typography.borderRadius.medium};
  cursor: pointer;
  transition: background 0.25s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.purple};
  }
`;

export const DangerButton = styled.button`
  padding: 0.6rem 1.25rem;
  background-color: ${({ theme }) => theme.colors.danger || '#e53935'};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.typography.borderRadius.medium};
  font-weight: 600;
  font-size: ${({ theme }) => theme.typography.smallText.fontSize};
  cursor: pointer;
  transition: background 0.25s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.dangerDark || '#c62828'};
  }
`;

export const CardWrapper = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.typography.borderRadius.medium};
  padding: ${({ theme }) => theme.typography.spacing.md};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
`;

// --- SelectBox Wrapper with Label Support ---

import React from 'react';

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.typography.spacing.xs};
`;

const StyledSelect = styled.select`
  padding: 0.6rem 1rem;
  font-size: ${({ theme }) => theme.typography.bodyText.fontSize};
  border-radius: ${({ theme }) => theme.typography.borderRadius.medium};
  border: 1px solid #ccc;
  background-color: ${({ theme }) => theme.colors.white};
  appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 7l3-3 3 3z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.purple};
    box-shadow: 0 0 0 2px rgba(102, 48, 144, 0.2);
  }
`;

const StyledLabel = styled.label`
  font-size: ${({ theme }) => theme.typography.smallText.fontSize};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.navy};
`;

export const SelectBox = ({ value, onChange, options = [], label }) => (
  <SelectWrapper>
    {label && <StyledLabel>{label}</StyledLabel>}
    <StyledSelect value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </StyledSelect>
  </SelectWrapper>
);
