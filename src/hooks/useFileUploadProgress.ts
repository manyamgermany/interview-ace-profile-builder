
import { useState } from "react";

export const useFileUploadProgress = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");

  const updateProgress = (percentage: number, step: string) => {
    setProgress(percentage);
    setCurrentStep(step);
  };

  const resetProgress = () => {
    setProgress(0);
    setCurrentStep("");
  };

  return {
    progress,
    currentStep,
    updateProgress,
    resetProgress
  };
};
