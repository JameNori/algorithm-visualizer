import { useState } from "react";
import { type ArrayBar } from "../algorithms/types";

export function useSortAnimation(steps: ArrayBar[][]) {
  const [currentStep, setCurrentStep] = useState(0);
  const currentBars = steps[currentStep];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
  };

  const isFinished = currentStep === steps.length - 1;

  return {
    currentBars,
    nextStep,
    previousStep,
    reset,
    isFinished,
  };
}
