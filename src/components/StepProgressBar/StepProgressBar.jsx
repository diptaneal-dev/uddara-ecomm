import React from "react";
import {
    ProgressBarWrapper,
    StepLabels,
    StepLabel,
    ProgressSteps,
    StepSegment,
    DotProgress,
    DotStep,
    Dot,
    Connector,
    BubbleProgress,
    Bubble,
    BubbleWrapper,
    BubbleUnderline,
    StepText,
} from "./StepProgressBar.styles";

export default function StepProgressBar({
    steps = [],
    currentStep = 1,
    showLabels = true,
    showStepText = true,
    variant = "fill", // "dot", "bubble"
}) {
    return (
        <ProgressBarWrapper variant={variant}>
            {showLabels && variant !== "bubble" && (
                <StepLabels>
                    {steps.map((label, index) => (
                        <span
                            key={index}
                            className={currentStep === index + 1 ? "active" : ""}
                        >
                            {label}
                        </span>
                    ))}
                </StepLabels>
            )}

            {variant === "fill" && (
                <ProgressSteps>
                    {steps.map((_, index) => (
                        <StepSegment
                            key={index}
                            $isActive={index < currentStep}
                            $stepColor={`step${index + 1}`}
                        />
                    ))}
                </ProgressSteps>
            )}

            {variant === "dot" && (
                <DotProgress>
                    {steps.map((_, index) => (
                        <DotStep key={index}>
                            <Dot $isActive={index < currentStep} />
                            {index < steps.length - 1 && <Connector />}
                        </DotStep>
                    ))}
                </DotProgress>
            )}

            {variant === "bubble" && (
                <BubbleProgress count={steps.length}>
                    {steps.map((label, index) => {
                        const status =
                            index + 1 < currentStep
                                ? "complete"
                                : index + 1 === currentStep
                                    ? "current"
                                    : "upcoming";

                        return (
                            <BubbleWrapper key={index}>
                                <Bubble
                                    $isActive={status === "complete"}
                                    $isCurrent={status === "current"}
                                    aria-current={status === "current" ? "step" : undefined}
                                >
                                    {index + 1}
                                </Bubble>
                                <StepLabel $isActive={status === "current"}>{label}</StepLabel>
                                <BubbleUnderline $status={status} />
                            </BubbleWrapper>
                        );
                    })}
                </BubbleProgress>
            )}


            {showStepText && (
                <StepText>
                    Step {currentStep} of {steps.length}
                </StepText>
            )}
        </ProgressBarWrapper>
    );
}
