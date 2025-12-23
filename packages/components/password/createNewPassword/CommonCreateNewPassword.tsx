import React from "react";

import type { ResetPasswordFormSchema } from "@repo/schemas/resetPasswordForm.schema";

import CreateNewPasswordForm from "./form/CreateNewPasswordForm";

interface CommonCreateNewPasswordProps {
  className?: string;
  isLoading: boolean;
  handlePasswordChange: (data: ResetPasswordFormSchema) => void;
}

const CommonCreateNewPassword = ({
  className,
  isLoading,
  handlePasswordChange,
}: CommonCreateNewPasswordProps) => {
  return (
    <CreateNewPasswordForm
      className={className}
      isLoading={isLoading}
      handlePasswordChange={handlePasswordChange}
    />
  );
};

export default CommonCreateNewPassword;
