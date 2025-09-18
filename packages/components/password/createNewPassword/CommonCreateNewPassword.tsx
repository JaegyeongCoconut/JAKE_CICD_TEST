import React from "react";

import type { FormResetPassword } from "@repo/types";

import CreateNewPasswordForm from "./form/CreateNewPasswordForm";

interface CommonCreateNewPasswordProps {
  className?: string;
  isLoading: boolean;
  handlePasswordChange: (data: FormResetPassword) => void;
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
