import { useState } from "react";

import { RESET_PASSWORD_STEP } from "@repo/constants/step";

const useResetPasswordStep = () => {
  const [currentStep, setCurrentStep] = useState<
    (typeof RESET_PASSWORD_STEP)[keyof typeof RESET_PASSWORD_STEP]
  >(RESET_PASSWORD_STEP.IDENTITY_VERIFICATION);

  const handleMoveNextStep = (): void =>
    setCurrentStep(RESET_PASSWORD_STEP.CREATE_NEW_PASSWORD);

  return { currentStep, handleMoveNextStep };
};

export default useResetPasswordStep;
