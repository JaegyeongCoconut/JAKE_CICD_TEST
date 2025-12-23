import type { ChangeEvent } from "react";
import React from "react";

import { useFormContext } from "react-hook-form";

import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { ResetPasswordFormSchema } from "@repo/schemas/resetPasswordForm.schema";

import * as S from "./AccountIdForm.styled";
import AccountInput from "../../../../input/accountInput/AccountInput";
import ErrorMessage from "../../../../message/ErrorMessage";

interface AccountIdFormProps {
  isTimeStart: boolean;
  handleEmailSend: (data: ResetPasswordFormSchema) => void;
}

const AccountIdForm = ({
  isTimeStart,
  handleEmailSend,
}: AccountIdFormProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const {
    formState: { errors, isDirty },
    getValues,
    handleSubmit,
    register,
    setValue,
  } = useFormContext<ResetPasswordFormSchema>();

  return (
    <S.AccountIdSection isVerifyDone={getValues("verify.isAuthCodeSend")}>
      <S.HideSubmitButton disabled type="button" />
      <S.AccountInputWrapper>
        <AccountInput
          id="email"
          disabled={getValues("verify.isAuthCodeSend")}
          hasError={!!errors.verify?.email?.message}
          isDirty={!!isDirty}
          label={LANGUAGE_LABEL.EMAIL}
          maxLength={100}
          type="email"
          register={register("verify.email", {
            onChange: (e: ChangeEvent<HTMLInputElement>): void =>
              setValue("verify.email", e.target.value.trim()),
          })}
        />
        <S.EmailVerifyButton
          disabled={!!errors.verify?.email?.message || isTimeStart || !isDirty}
          type="button"
          onClick={handleSubmit(handleEmailSend)}
        >
          {defaultLanguage({ text: LANGUAGE_LABEL.VERIFY })}
        </S.EmailVerifyButton>
      </S.AccountInputWrapper>
      {errors.verify?.email?.message && (
        <ErrorMessage
          css={S.alertMessage}
          message={errors.verify?.email.message}
        />
      )}
    </S.AccountIdSection>
  );
};

export default AccountIdForm;
