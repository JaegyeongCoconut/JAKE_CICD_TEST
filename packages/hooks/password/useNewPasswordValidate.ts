import { useState } from "react";

import type { UseFormClearErrors, UseFormSetError } from "react-hook-form";

import { TEST } from "@repo/utils/yup/yupTest";

const useNewPasswordValidate = (
  setError: UseFormSetError<{ newPassword: string }>,
  clearErrors: UseFormClearErrors<{ newPassword: string }>,
) => {
  const [isNewPasswordBlur, setIsNewPasswordBlur] = useState(false);

  const validateCurrentPasswordNewPassword = (
    currentPassword: string,
    newPassword: string,
  ): void => {
    if (!isNewPasswordBlur) return;

    if (newPassword === currentPassword) {
      setError("newPassword", {
        message: TEST.PASSWORD.NEW.message,
      });
    } else {
      clearErrors("newPassword");
    }
  };

  const handleNewPasswordBlur = (): void => {
    setIsNewPasswordBlur(true);
  };

  return { validateCurrentPasswordNewPassword, handleNewPasswordBlur };
};

export default useNewPasswordValidate;
