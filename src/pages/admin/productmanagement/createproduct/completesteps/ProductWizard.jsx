// components/ProductWizard/ProductWizard.jsx
import React, { useEffect, useState } from "react";
import Step1BasicInfo from "./Step1BasicInfo";
import Step2SeoMetadata from "./Step2SeoMetadata";
import Step3FoodCompliance from "./Step3FoodCompliance";
import Step4SizePackaging from "./Step4SizePackaging";
import Step5PricingTax from "./Step5PricingTax";
import Step6Variants from "./Step6Variants";
import Step7Inventory from "./Step7Inventory";
import Step8Nutrition from "./Step8Nutrition";
import Step9Specifications from "./Step9Specifications";
import Step10Images from "./Step10Images";
import Step11ReviewSubmit from "./Step11ReviewSubmit";
import { Button } from "../../../../../components/Button/Button";

const steps = [
    { label: "Basic Info", component: Step1BasicInfo },
    { label: "SEO Metadata", component: Step2SeoMetadata },
    { label: "Food Compliance", component: Step3FoodCompliance },
    { label: "Size & Packaging", component: Step4SizePackaging },
    { label: "Pricing & Tax", component: Step5PricingTax },
    { label: "Variants", component: Step6Variants },
    { label: "Inventory", component: Step7Inventory },
    { label: "Nutrition Info", component: Step8Nutrition },
    { label: "Specifications", component: Step9Specifications },
    { label: "Images", component: Step10Images },
    { label: "Review & Submit", component: Step11ReviewSubmit }
];

const DRAFT_KEY = "product-wizard-draft";

export default function ProductWizard() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [isDraftLoaded, setIsDraftLoaded] = useState(false);

    useEffect(() => {
        const draft = localStorage.getItem(DRAFT_KEY);
        if (draft && !isDraftLoaded) {
            const { data, step } = JSON.parse(draft);
            const shouldLoad = window.confirm("A saved draft was found. Would you like to continue where you left off?");
            if (shouldLoad) {
                setFormData(data || {});
                setCurrentStep(step || 0);
                setIsDraftLoaded(true);
            } else {
                localStorage.removeItem(DRAFT_KEY);
            }
        }
    }, [isDraftLoaded]);

    const saveDraft = (data, step) => {
        const draft = {
            data,
            step
        };
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    };

    const handleNext = (data) => {
        const updatedData = { ...formData, ...data };
        setFormData(updatedData);

        // ✅ Save to localStorage on step advance
        const nextStep = currentStep + 1;
        saveDraft(updatedData, nextStep);

        setCurrentStep(nextStep);
    };

    const handleBack = () => {
        const prevStep = Math.max(0, currentStep - 1);
        setCurrentStep(prevStep);
        saveDraft(formData, prevStep);
    };

    const CurrentComponent = steps[currentStep].component;

    return (
        <div>
            <CurrentComponent
                data={formData}
                onNext={handleNext}
                onBack={handleBack}
                isLastStep={currentStep === steps.length - 1}
            />

            <Button type="button" onClick={() => {
                if (window.confirm("Are you sure you want to discard the saved draft?")) {
                    localStorage.removeItem("product-wizard-draft");
                    setFormData({});
                    setCurrentStep(0);
                    setIsDraftLoaded(false);
                }
            }}>
                Discard Draft
            </Button>

        </div>
    );
}
