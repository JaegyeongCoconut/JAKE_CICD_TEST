import React, { createContext, useContext } from "react";

import type { FieldErrors, FieldValues } from "react-hook-form";

import { ReactComponent as CheckIcon } from "@repo/assets/icon/ic_check.svg";
import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import { checkPasswordLength, checkPasswordType } from "@repo/utils/validation";

import * as S from "./PasswordCondition.styled";

type FormPasswordType = Partial<
  Record<"currentPassword" | "newPassword" | "confirmPassword", string>
>;

interface PasswordConditionProps<T extends FormPasswordType> {
  className?: string;
  errors: FieldErrors<T | FieldValues> | undefined | null;
  touchedFields: {
    confirmPassword?: boolean | undefined;
    currentPassword?: boolean | undefined;
    newPassword?: boolean | undefined;
  };
  watch: T;
  children: React.ReactNode;
}

interface PasswordConditionContextType<T extends FormPasswordType>
  extends Omit<PasswordConditionProps<T>, "className" | "children" | "watch"> {}

const PasswordConditionContext = createContext<
  PasswordConditionContextType<FormPasswordType> & FormPasswordType
>({
  touchedFields: {},
  errors: null,
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const PasswordCondition = <T extends FormPasswordType>({
  watch,
  className,
  children,
  touchedFields,
  errors,
}: PasswordConditionProps<T>) => {
  const newPassword = watch?.newPassword;
  const currentPassword = watch?.currentPassword;
  const confirmPassword = watch?.confirmPassword;

  return (
    <PasswordConditionContext.Provider
      value={{
        newPassword,
        currentPassword,
        confirmPassword,
        touchedFields,
        errors,
      }}
    >
      <S.PasswordConditionWrapper className={className}>
        {children}
      </S.PasswordConditionWrapper>
    </PasswordConditionContext.Provider>
  );
};

PasswordCondition.lengthCondition = function lengthCondition() {
  const { newPassword, touchedFields, errors } = useContext(
    PasswordConditionContext,
  );

  const { defaultLanguage } = useDefaultLanguage();

  const isLengthError =
    errors?.newPassword?.type === "required"
      ? true
      : !touchedFields?.newPassword && !newPassword
        ? undefined
        : !checkPasswordLength(newPassword!);

  return (
    <S.PasswordCondition hasError={isLengthError}>
      <CheckIcon />
      {defaultLanguage({ text: COMMON_ERROR_MESSAGE.PASSWORD_LENGTH })}
    </S.PasswordCondition>
  );
};

PasswordCondition.textTypeCondition = function textTypeCondition() {
  const { newPassword, touchedFields, errors } = useContext(
    PasswordConditionContext,
  );

  const { defaultLanguage } = useDefaultLanguage();

  const isTypeError =
    errors?.newPassword?.type === "required"
      ? true
      : !touchedFields?.newPassword && !newPassword
        ? undefined
        : !checkPasswordType(newPassword!);

  return (
    <S.PasswordCondition hasError={isTypeError}>
      <CheckIcon />
      {defaultLanguage({ text: COMMON_ERROR_MESSAGE.PASSWORD_TYPE })}
    </S.PasswordCondition>
  );
};

PasswordCondition.passwordCondition = function passwordCondition() {
  const { newPassword, currentPassword, touchedFields, errors } = useContext(
    PasswordConditionContext,
  );

  const { defaultLanguage } = useDefaultLanguage();

  const isSameError =
    errors?.newPassword?.type === "required"
      ? true
      : !touchedFields?.newPassword && !newPassword
        ? undefined
        : !newPassword
          ? true
          : currentPassword === newPassword;

  return (
    <S.PasswordCondition hasError={isSameError}>
      <CheckIcon />
      {defaultLanguage({ text: COMMON_ERROR_MESSAGE.CANNOT_UPDATE_PASSWORD })}
    </S.PasswordCondition>
  );
};

PasswordCondition.checkConfirmPassword = function checkConfirmPassword() {
  const { newPassword, confirmPassword, touchedFields, errors } = useContext(
    PasswordConditionContext,
  );

  const { defaultLanguage } = useDefaultLanguage();

  const hasConfirmError =
    errors?.confirmPassword?.type === "required"
      ? true
      : !touchedFields?.confirmPassword && !confirmPassword
        ? undefined
        : !confirmPassword || confirmPassword !== newPassword
          ? true
          : false;

  return (
    <S.PasswordCondition hasError={hasConfirmError}>
      <CheckIcon />
      {defaultLanguage({ text: COMMON_ERROR_MESSAGE.PASSWORD_CONFIRM })}
    </S.PasswordCondition>
  );
};

export default PasswordCondition;
