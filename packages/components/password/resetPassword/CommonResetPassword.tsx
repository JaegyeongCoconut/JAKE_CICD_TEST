import React from "react";

import type { ResetPasswordFormSchema } from "@repo/schemas/resetPasswordForm.schema";

import AccountIdForm from "./form/accountId/AccountIdForm";
import ResetPasswordForm from "./form/resetPassword/ResetPasswordForm";
import VerificationForm from "./form/verificationForm/VerificationForm";

interface CommonResetPasswordProps {
  className?: string;
  isTimeStart: boolean;
  initTime: number;
  handleEmailSend: (data: ResetPasswordFormSchema) => void;
  handleVerificationCheck: (data: ResetPasswordFormSchema) => void;
}

const CommonResetPassword = ({
  className,
  initTime,
  isTimeStart,
  handleEmailSend,
  handleVerificationCheck,
}: CommonResetPasswordProps) => {
  return (
    <ResetPasswordForm className={className}>
      <AccountIdForm
        isTimeStart={isTimeStart}
        handleEmailSend={handleEmailSend}
      />
      <VerificationForm
        initTime={initTime}
        handleVerificationCheck={handleVerificationCheck}
      />
    </ResetPasswordForm>
  );
};

export default CommonResetPassword;
