import React from "react";

import { useFormContext } from "react-hook-form";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import { useTimerStore } from "@repo/stores/timer";
import { useVerifyAccountStore } from "@repo/stores/verifyAccount";
import type { VerificationType } from "@repo/types";

import * as S from "./VerificationForm.styled";
import AccountInput from "../../../../input/accountInput/AccountInput";
import ErrorMessage from "../../../../message/ErrorMessage";
import Timer from "../../../../timer/Timer";

interface VerificationFormProps {
  initTime?: number;
  handleVerificationCheck: () => void;
}

const VerificationForm = ({
  initTime,
  handleVerificationCheck,
}: VerificationFormProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const isTimeOut = useTimerStore((state) => state.isTimeOut);
  const verifyAccountInfo = useVerifyAccountStore((state) => state.verifyInfo);

  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext<VerificationType>();

  return (
    <S.VerificationForm onSubmit={handleVerificationCheck}>
      {verifyAccountInfo.isEmailVerifyDone && (
        <>
          <S.HideSubmitButton disabled />
          <AccountInput
            id="verificationCode"
            maxLength={6}
            control={control}
            name="verificationCode"
            label="Verification code"
            type="text"
            hasTrim={false}
            trigger={trigger}
            hasError={!!errors.verificationCode?.message}
          />
          {errors.verificationCode?.message && (
            <ErrorMessage
              css={S.alertMessage}
              message={errors.verificationCode.message}
            />
          )}
          <Timer css={S.timer} initTime={initTime} />
        </>
      )}
      <S.NextStepButton
        disabled={
          isTimeOut ||
          !verifyAccountInfo.isEmailVerifyDone ||
          !!errors.verificationCode?.message
        }
      >
        {defaultLanguage("Next")}
      </S.NextStepButton>
    </S.VerificationForm>
  );
};

export default VerificationForm;
