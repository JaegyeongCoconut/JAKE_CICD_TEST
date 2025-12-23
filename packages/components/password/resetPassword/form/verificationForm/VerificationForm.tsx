import type { ChangeEvent } from "react";
import React from "react";

import { useFormContext } from "react-hook-form";

import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { ResetPasswordFormSchema } from "@repo/schemas/resetPasswordForm.schema";
import { useTimerStore } from "@repo/stores/timer";
import { numericOnly } from "@repo/utils/formatter/number";

import * as S from "./VerificationForm.styled";
import AccountInput from "../../../../input/accountInput/AccountInput";
import ErrorMessage from "../../../../message/ErrorMessage";
import Timer from "../../../../timer/Timer";

interface VerificationFormProps {
  initTime: number;
  handleVerificationCheck: (data: ResetPasswordFormSchema) => void;
}

const VerificationForm = ({
  initTime,
  handleVerificationCheck,
}: VerificationFormProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const isTimeOut = useTimerStore((state) => state.isTimeOut);

  const {
    formState: { errors, isDirty },
    getValues,
    handleSubmit,
    register,
    setValue,
  } = useFormContext<ResetPasswordFormSchema>();

  return (
    <S.VerificationSection>
      {getValues("verify.isAuthCodeSend") && (
        <>
          <S.HideSubmitButton disabled type="button" />
          <AccountInput
            id="verificationCode"
            disabled={false}
            hasError={!!errors.verify?.verificationCode?.message}
            isDirty={!!isDirty}
            label={LANGUAGE_LABEL.VERIFICATION_CODE}
            maxLength={6}
            type="text"
            register={register("verify.verificationCode", {
              onChange: (e: ChangeEvent<HTMLInputElement>): void =>
                setValue(
                  "verify.verificationCode",
                  numericOnly(e.target.value),
                ),
            })}
          />
          {errors.verify?.verificationCode?.message && (
            <ErrorMessage
              css={S.alertMessage}
              message={errors.verify.verificationCode.message}
            />
          )}
          <Timer css={S.timer} initTime={initTime} />
        </>
      )}
      <S.NextStepButton
        disabled={
          isTimeOut ||
          !getValues("verify.isAuthCodeSend") ||
          !!errors.verify?.verificationCode?.message
        }
        type="submit"
        onClick={handleSubmit(handleVerificationCheck)}
      >
        {defaultLanguage({ text: LANGUAGE_LABEL.NEXT })}
      </S.NextStepButton>
    </S.VerificationSection>
  );
};

export default VerificationForm;
