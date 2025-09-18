import type { ChangeEvent } from "react";
import React from "react";

import { isEmpty } from "lodash-es";
import { useFormContext } from "react-hook-form";

import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { FormResetPassword } from "@repo/types";

import * as S from "./CreateNewPasswordForm.styled";
import Button from "../../../button/Button";
import AccountInput from "../../../input/accountInput/AccountInput";
import PasswordCondition from "../../../passwordCondition/PasswordCondition";

interface CreateNewPasswordFormProps {
  className?: string;
  isLoading: boolean;
  handlePasswordChange: (data: FormResetPassword) => void;
}

const CreateNewPasswordForm = ({
  className,
  isLoading,
  handlePasswordChange,
}: CreateNewPasswordFormProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const {
    formState: { errors, touchedFields, dirtyFields },
    handleSubmit,
    register,
    setValue,
    trigger,
    watch,
  } = useFormContext<FormResetPassword>();

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue("newPassword", e.target.value.trim());

    if (!touchedFields.confirmPassword) return;

    trigger("confirmPassword");
  };

  return (
    <S.CreateNewPasswordSection className={className}>
      <S.Title>{defaultLanguage(LANGUAGE_LABEL.CREATE_A_NEW_PASSWORD)}</S.Title>
      <S.HideSubmitButton disabled type="button" />
      <AccountInput
        css={S.accountLabelInput}
        id="newPassword"
        disabled={false}
        hasError={!!errors.newPassword?.message}
        isDirty={!!dirtyFields.newPassword}
        label={LANGUAGE_LABEL.NEW_PASSWORD}
        maxLength={100}
        type="password"
        register={register("newPassword", {
          onChange: handleNewPasswordChange,
          onBlur: (): void => {
            trigger("newPassword");
          },
        })}
      />
      <PasswordCondition
        css={S.newPasswordCondition}
        errors={errors}
        touchedFields={touchedFields}
        watch={watch()}
      >
        <PasswordCondition.lengthCondition />
        <PasswordCondition.textTypeCondition />
      </PasswordCondition>
      <AccountInput
        css={S.accountLabelInput}
        id="confirmPassword"
        disabled={false}
        hasError={!!errors.confirmPassword?.message}
        isDirty={!!dirtyFields.confirmPassword}
        label={LANGUAGE_LABEL.CONFIRM_PASSWORD}
        maxLength={100}
        type="password"
        register={register("confirmPassword", {
          onChange: (e: ChangeEvent<HTMLInputElement>): void =>
            setValue("confirmPassword", e.target.value.trim()),
          onBlur: (): void => {
            trigger("confirmPassword");
          },
        })}
      />
      <PasswordCondition
        css={S.confirmPasswordCondition}
        errors={errors}
        touchedFields={touchedFields}
        watch={watch()}
      >
        <PasswordCondition.checkConfirmPassword />
      </PasswordCondition>
      <Button
        css={S.createPasswordButton}
        variant="primary"
        disabled={!isEmpty(errors)}
        isLoading={isLoading}
        label={LANGUAGE_LABEL.DONE}
        type="submit"
        handleButtonClick={handleSubmit(handlePasswordChange)}
      />
    </S.CreateNewPasswordSection>
  );
};

export default CreateNewPasswordForm;
