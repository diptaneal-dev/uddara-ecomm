// components/Wizard/WizardContainer.jsx
import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { WizardWrapper, StepSidebar, StepItem } from "./WizardStyles";

export default function WizardContainer({ steps, draftKey, layout = "vertical" }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isDraftLoaded, setIsDraftLoaded] = useState(false);

  useEffect(() => {
    if (draftKey) {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        const { data, step } = JSON.parse(saved);
        const shouldLoad = window.confirm("A saved draft was found. Continue editing?");
        if (shouldLoad) {
          setFormData(data || {});
          setCurrentStep(step || 0);
        } else {
          localStorage.removeItem(draftKey);
        }
      }
    }
  }, [draftKey]);

  const saveDraft = (data, step) => {
    if (!draftKey) return;
    localStorage.setItem(draftKey, JSON.stringify({ data, step }));
  };

  const handleNext = (data) => {
    const updated = { ...formData, ...data };
    setFormData(updated);
    const next = currentStep + 1;
    if (next < steps.length) { // Ensure we don't exceed the array length
      saveDraft(updated, next);
      setCurrentStep(next);
    }
  };

  const handleBack = () => {
    const prev = Math.max(0, currentStep - 1);
    saveDraft(formData, prev);
    setCurrentStep(prev);
  };

  const handleDiscard = () => {
    if (window.confirm("Discard saved draft?")) {
      localStorage.removeItem(draftKey);
      setFormData({});
      setCurrentStep(0);
      setIsDraftLoaded(false);
    }
  };

  console.log('steps:', steps);

  console.log("Steps with component type:", steps.map(step => typeof step.component));

  const CurrentStep = steps[currentStep];
  console.log('currentStep:', CurrentStep);
  if (!CurrentStep) {
    return <div>⚠️ Step not found. Check your step config.</div>;
  }

  return (
    <WizardWrapper $layout={layout}>
      <StepSidebar $layout={layout}>
        {steps.map((step, idx) => (
          <StepItem
            key={idx}
            $active={idx === currentStep}
            $layout={layout}
          >
            {step.label}
          </StepItem>
        ))}
      </StepSidebar>

      <div style={{ flex: 1 }}>
        <CurrentStep.component
          data={formData}
          onNext={handleNext}
          onBack={currentStep > 0 ? handleBack : null}
          isLastStep={currentStep === steps.length - 1}
        />
        {draftKey && (
          <Button
            type="button"
            onClick={handleDiscard}
            $outline
            $variant="icon"
            style={{ marginTop: "1.5rem" }}
          >
            Discard Draft
          </Button>
        )}
      </div>
    </WizardWrapper>
  );
}
