import React from "react";

import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";

import * as S from "./ResetPasswordForm.styled";

interface ResetPasswordFormProps {
  className?: string;
  children: React.ReactNode;
}

const ResetPasswordForm = ({ className, children }: ResetPasswordFormProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.ResetPasswordSection className={className}>
      <S.Title>{defaultLanguage(LANGUAGE_LABEL.RESET_PASSWORD)}</S.Title>
      <S.DescriptionWrapper>
        <S.Description>
          {defaultLanguage(
            LANGUAGE_LABEL.ENTER_THE_EMAIL_OF_THE_ACCOUNT_THAT_YOU_WISH_TO_RESET_THE_PASSWORD_FOR_WE_LL_SEND_YOU_A_VERIFICATION_CODE,
          )}
        </S.Description>
      </S.DescriptionWrapper>
      {children}
    </S.ResetPasswordSection>
  );
};

export default ResetPasswordForm;
