// components/ProductCreateWizard/ReviewAndSubmit.jsx
import React from "react";
import {
  Container,
  Heading,
  FormGroup
} from "./ProductWizard.styles";
import WizardActions from "../../../../components/Button/WizardActions";

export default function ProductCreationReviewSubmit({ data, onNext, onBack, isLastStep }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ You can call your backend API here (POST /products)
    console.log("🎯 Submitting product:", data);

    // Clear saved draft
    localStorage.removeItem("product-create-draft");

    // Simulate submit
    alert("Product created successfully!");
    onNext({ submitted: true });
  };

  return (
    <Container>
      <Heading>Review & Submit</Heading>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <pre
            style={{
              background: "#f6f8fa",
              padding: "1rem",
              borderRadius: "8px",
              fontSize: "0.9rem",
              maxHeight: "300px",
              overflowY: "scroll",
            }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        </FormGroup>

        <WizardActions onBack={onBack} isLastStep={true} />
      </form>
    </Container>
  );
}
