// components/ProductWizard/Step11ReviewSubmit.jsx
import React from "react";
import {
  Container,
  Heading,
  Button,
  Row
} from "../ProductWizard.styles";

export default function Step11ReviewSubmit({ data, onNext, onBack, isLastStep }) {
  const handleSubmit = () => {
    console.log("🚀 Final submission payload:", data);
    // Trigger actual submission logic here
    alert("Product submitted!");
    onNext({ submitted: true });
  };

  return (
    <Container>
      <Heading>Step 11: Review & Submit</Heading>
      <pre
        style={{
          fontSize: "0.85rem",
          background: "#f6f8fa",
          padding: "1rem",
          borderRadius: "8px",
          maxHeight: "300px",
          overflowY: "scroll"
        }}
      >
        {JSON.stringify(data, null, 2)}
      </pre>

      <Row>
        <Button type="button" onClick={handleSubmit}>
          Submit Product
        </Button>
        <Button type="button" onClick={onBack}>
          Back
        </Button>
      </Row>
    </Container>
  );
}
