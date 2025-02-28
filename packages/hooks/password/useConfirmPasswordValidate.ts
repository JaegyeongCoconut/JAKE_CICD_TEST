import { useState } from "react";

import type { UseFormClearErrors, UseFormSetError } from "react-hook-form";

import { TEST } from "@repo/utils/yup/yupTest";

const useConfirmPasswordValidate = (
  setError: UseFormSetError<{ confirmPassword: string }>,
  clearErrors: UseFormClearErrors<{ confirmPassword: string }>,
) => {
  const [isConfirmPasswordBlur, setIsConfirmPasswordBlur] = useState(false);

  const validateNewPasswordConfirmPassword = (
    newPassword: string,
    confirmPassword: string,
  ): void => {
    if (!isConfirmPasswordBlur) return;

    if (confirmPassword !== newPassword) {
      setError("confirmPassword", {
        message: TEST.PASSWORD.CONFIRM.message,
      });
    } else {
      clearErrors("confirmPassword");
    }
  };

  const handleConfirmPasswordBlur = (): void => {
    setIsConfirmPasswordBlur(true);
  };

  return { validateNewPasswordConfirmPassword, handleConfirmPasswordBlur };
};

export default useConfirmPasswordValidate;
