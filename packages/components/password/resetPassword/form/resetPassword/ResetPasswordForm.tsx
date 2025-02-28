import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";

import * as S from "./ResetPasswordForm.styled";

interface ResetPasswordFormProps {
  children: React.ReactNode;
}

const ResetPasswordForm = ({ children }: ResetPasswordFormProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.ResetPasswordSection>
      <S.Title>{defaultLanguage("Reset password")}</S.Title>
      <S.DescriptionWrapper>
        <S.Description>
          {defaultLanguage(
            "Enter the email of the account that you wish to reset the password for. We'll send you a verification code.",
          )}
        </S.Description>
      </S.DescriptionWrapper>
      {children}
    </S.ResetPasswordSection>
  );
};

export default ResetPasswordForm;
