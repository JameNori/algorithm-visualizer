import { useState } from "react";

export function useSortAnimation<T>(steps: T[]) {
  const [currentStep, setCurrentStep] = useState(0);
  const currentItem = steps[currentStep];

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

  const resetStep = () => {
    setCurrentStep(0);
  };

  const isFinished = currentStep === steps.length - 1;

  return {
    currentItem,
    nextStep,
    previousStep,
    resetStep,
    isFinished,
  };
}
