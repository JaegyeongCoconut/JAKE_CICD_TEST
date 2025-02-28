import React, { createContext, useContext } from "react";

import { CheckIcon } from "@repo/assets/icon";
import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import { checkPasswordLength, checkPasswordType } from "@repo/utils/validation";

import * as S from "./PasswordCondition.styled";

interface PasswordConditionProps {
  className?: string;
  children: React.ReactNode;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  touchedFields: {
    currentPassword?: boolean | undefined;
    newPassword?: boolean | undefined;
    confirmPassword?: boolean | undefined;
  };
}

interface PasswordConditionContextType
  extends Omit<PasswordConditionProps, "className" | "children"> {}

const PasswordConditionContext = createContext<PasswordConditionContextType>({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  touchedFields: {},
});

const PasswordCondition = ({
  className,
  children,
  currentPassword,
  newPassword,
  confirmPassword,
  touchedFields,
}: PasswordConditionProps) => {
  return (
    <PasswordConditionContext.Provider
      value={{
        currentPassword,
        newPassword,
        confirmPassword,
        touchedFields,
      }}
    >
      <S.PasswordConditionWrapper className={className}>
        {children}
      </S.PasswordConditionWrapper>
    </PasswordConditionContext.Provider>
  );
};

PasswordCondition.lengthCondition = function lengthCondition() {
  const { newPassword, touchedFields } = useContext(PasswordConditionContext);

  const { defaultLanguage } = useDefaultLanguage();

  const isLengthError =
    !touchedFields.newPassword && !newPassword
      ? undefined
      : !checkPasswordLength(newPassword!);

  return (
    <S.PasswordCondition hasError={isLengthError}>
      <CheckIcon />
      {defaultLanguage(COMMON_ERROR_MESSAGE.PASSWORD_LENGTH)}
    </S.PasswordCondition>
  );
};

PasswordCondition.textTypeCondition = function textTypeCondition() {
  const { newPassword, touchedFields } = useContext(PasswordConditionContext);

  const { defaultLanguage } = useDefaultLanguage();

  const isTypeError =
    !touchedFields.newPassword && !newPassword
      ? undefined
      : !checkPasswordType(newPassword!);

  return (
    <S.PasswordCondition hasError={isTypeError}>
      <CheckIcon />
      {defaultLanguage(COMMON_ERROR_MESSAGE.PASSWORD_TYPE)}
    </S.PasswordCondition>
  );
};

PasswordCondition.passwordCondition = function passwordCondition() {
  const { currentPassword, newPassword, touchedFields } = useContext(
    PasswordConditionContext,
  );

  const { defaultLanguage } = useDefaultLanguage();

  const isSameError =
    !touchedFields.newPassword && !newPassword
      ? undefined
      : !newPassword
        ? true
        : currentPassword === newPassword;

  return (
    <S.PasswordCondition hasError={isSameError}>
      <CheckIcon />
      {defaultLanguage(COMMON_ERROR_MESSAGE.CANNOT_UPDATE_PASSWORD)}
    </S.PasswordCondition>
  );
};

PasswordCondition.checkConfirmPassword = function checkConfirmPassword() {
  const { newPassword, confirmPassword, touchedFields } = useContext(
    PasswordConditionContext,
  );

  const { defaultLanguage } = useDefaultLanguage();

  const hasConfirmError =
    !touchedFields.confirmPassword && !confirmPassword
      ? undefined
      : !confirmPassword || confirmPassword !== newPassword
        ? true
        : false;

  return (
    <S.PasswordCondition hasError={hasConfirmError}>
      <CheckIcon />
      {defaultLanguage(COMMON_ERROR_MESSAGE.PASSWORD_CONFIRM)}
    </S.PasswordCondition>
  );
};

export default PasswordCondition;
