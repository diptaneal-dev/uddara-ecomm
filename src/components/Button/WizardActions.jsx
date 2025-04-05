// components/common/WizardActions.jsx
import React from "react";
import { Button } from "./Button";
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
`;

export default function WizardActions({ onBack, onNext, onSkip, isLastStep }) {
  return (
    <Row style={{ justifyContent: "flex-end", gap: "1rem", flexWrap: "wrap" }}>
      {onBack && (
        <Button
          type="button"
          onClick={onBack}
          $outline
          $variant="primary"
          $fitContent
          color={({ theme }) => theme.colors.purple}
          borderColor={({ theme }) => theme.colors.purple}
          $size="md"
        >
          Back
        </Button>
      )}

      {onSkip && (
        <Button
          type="button"
          onClick={onSkip}
          $outline
          $variant="secondary"
          color={({ theme }) => theme.colors.pink}
          borderColor={({ theme }) => theme.colors.pink}
          $fitContent
          $size="md"
        >
          Skip
        </Button>
      )}

      <Button
        type="submit"
        onClick={onNext}
        $variant="primary"
        $bg={({ theme }) => theme.colors.pink}
        $fitContent
        $size="md"
      >
        {isLastStep ? "Submit" : "Next"}
      </Button>
    </Row>
  );
}
