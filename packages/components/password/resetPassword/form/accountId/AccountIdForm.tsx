import React from "react";

import { useFormContext } from "react-hook-form";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import { useVerifyAccountStore } from "@repo/stores/verifyAccount";
import type { GetVerifyCodeQueryModel } from "@repo/types";

import * as S from "./AccountIdForm.styled";
import AccountInput from "../../../../input/accountInput/AccountInput";
import ErrorMessage from "../../../../message/ErrorMessage";

interface AccountIdFormProps {
  handleEmailSend: () => void;
}

const AccountIdForm = ({ handleEmailSend }: AccountIdFormProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const verifyAccountInfo = useVerifyAccountStore((state) => state.verifyInfo);

  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext<GetVerifyCodeQueryModel>();

  return (
    <S.AccountIdForm isVerifyDone={verifyAccountInfo.isEmailVerifyDone}>
      <S.HideSubmitButton disabled />
      <S.AccountInputWrapper>
        <AccountInput
          id="email"
          disabled={verifyAccountInfo.isEmailVerifyDone}
          control={control}
          name="email"
          label="Email"
          type="text"
          hasTrim={false}
          trigger={trigger}
          hasError={!!errors.email?.message}
        />
        <S.EmailVerifyButton
          type="button"
          disabled={!!errors.email?.message}
          onClick={handleEmailSend}
        >
          {defaultLanguage("Verify")}
        </S.EmailVerifyButton>
      </S.AccountInputWrapper>
      {errors.email?.message && (
        <ErrorMessage css={S.alertMessage} message={errors.email.message} />
      )}
    </S.AccountIdForm>
  );
};

export default AccountIdForm;
