import React, { useEffect } from "react";

import type { UseMutateFunction } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import useAccountIdForm from "@repo/hooks/useAccountIdForm";
import useTimer from "@repo/hooks/useTimer";
import useVerificationCode from "@repo/hooks/useVerificationCode";
import { useTimerStore } from "@repo/stores/timer";
import { useVerifyAccountStore } from "@repo/stores/verifyAccount";
import type {
  CheckVerifyCodeQueryModel,
  GetVerifyCodeQueryModel,
  VerificationType,
} from "@repo/types";

import AccountIdForm from "./form/accountId/AccountIdForm";
import ResetPasswordForm from "./form/resetPassword/ResetPasswordForm";
import VerificationForm from "./form/verificationForm/VerificationForm";

interface CommonResetPasswordProps {
  passwordChangePath: string;
  emailErrorMessage: string;
  verifyCodeErrorMessage: string;
  sendVerifyCodeMutate: UseMutateFunction<
    unknown,
    AxiosError,
    GetVerifyCodeQueryModel,
    unknown
  >;
  checkVerifyCodeMutate: UseMutateFunction<
    unknown,
    AxiosError,
    CheckVerifyCodeQueryModel,
    unknown
  >;
}

const CommonResetPassword = ({
  passwordChangePath,
  emailErrorMessage,
  verifyCodeErrorMessage,
  sendVerifyCodeMutate,
  checkVerifyCodeMutate,
}: CommonResetPasswordProps) => {
  const navigate = useNavigate();

  const isTimeReset = useTimerStore((state) => state.isTimeReset);
  const verifyAccountInfo = useVerifyAccountStore((state) => state.verifyInfo);
  const setAuthCode = useVerifyAccountStore((state) => state.setAuthCode);
  const setEmail = useVerifyAccountStore((state) => state.setEmail);
  const setEmailVerifyDone = useVerifyAccountStore(
    (state) => state.setEmailVerifyDone,
  );

  const { formMethod: emailFormMethod } = useAccountIdForm();
  const { formMethod: verificationCodeFormMethod } = useVerificationCode();
  const { resetTimer, startTimer } = useTimer();

  const handleEmailSend = (data: GetVerifyCodeQueryModel): void => {
    if (!data) return;

    const req: GetVerifyCodeQueryModel = { email: data.email };

    sendVerifyCodeMutate(req, {
      onSuccess: () => {
        setEmail(data.email);
        setEmailVerifyDone(true);

        resetTimer();
        startTimer();
      },
      onError: () => {
        emailFormMethod.setError("email", {
          message: emailErrorMessage,
        });
      },
    });
  };

  const handleVerificationCheck = ({
    verificationCode,
  }: VerificationType): void => {
    const req: CheckVerifyCodeQueryModel = {
      email: verifyAccountInfo.email,
      authCode: verificationCode,
    };

    checkVerifyCodeMutate(req, {
      onSuccess: () => {
        setAuthCode(verificationCode);
        navigate(passwordChangePath);
      },
      onError: () => {
        verificationCodeFormMethod.setFocus("verificationCode");
        verificationCodeFormMethod.setError("verificationCode", {
          type: "validate",
          message: verifyCodeErrorMessage,
        });
      },
    });
  };

  useEffect(() => {
    verificationCodeFormMethod.resetField("verificationCode");
    verificationCodeFormMethod.setFocus("verificationCode");
  }, [isTimeReset]);

  return (
    <ResetPasswordForm>
      <FormProvider {...emailFormMethod}>
        <AccountIdForm
          handleEmailSend={emailFormMethod.handleSubmit(handleEmailSend)}
        />
      </FormProvider>
      <FormProvider {...verificationCodeFormMethod}>
        <VerificationForm
          handleVerificationCheck={verificationCodeFormMethod.handleSubmit(
            handleVerificationCheck,
          )}
        />
      </FormProvider>
    </ResetPasswordForm>
  );
};

export default CommonResetPassword;
