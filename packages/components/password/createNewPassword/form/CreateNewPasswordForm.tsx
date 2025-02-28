import React from "react";

import { isEmpty } from "lodash-es";
import { useFormContext } from "react-hook-form";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { CreateNewPasswordFormType } from "@repo/types";

import * as S from "./CreateNewPasswordForm.styled";
import Button from "../../../button/Button";
import AccountInput from "../../../input/accountInput/AccountInput";
import PasswordCondition from "../../../passwordCondition/PasswordCondition";

interface CreateNewPasswordFormProps {
  isLoading: boolean;
  handlePasswordChange: () => void;
}

const CreateNewPasswordForm = ({
  isLoading,
  handlePasswordChange,
}: CreateNewPasswordFormProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const {
    control,
    formState: { errors, touchedFields },
    trigger,
    watch,
  } = useFormContext<CreateNewPasswordFormType>();

  return (
    <S.CreateNewPasswordSection>
      <S.Title>{defaultLanguage("Create a new password")}</S.Title>
      <form onSubmit={handlePasswordChange}>
        <S.HideSubmitButton disabled />
        <AccountInput
          css={S.accountLabelInput}
          id="newPassword"
          control={control}
          name="newPassword"
          label="New password"
          type="password"
          hasTrim={false}
          trigger={trigger}
          hasError={!!errors.newPassword?.message}
        />
        <PasswordCondition
          css={S.newPasswordCondition}
          touchedFields={touchedFields}
          newPassword={watch("newPassword")}
        >
          <PasswordCondition.lengthCondition />
          <PasswordCondition.textTypeCondition />
        </PasswordCondition>
        <AccountInput
          css={S.accountLabelInput}
          id="confirmPassword"
          control={control}
          name="confirmPassword"
          label="Confirm password"
          hasTrim={false}
          trigger={trigger}
          type="password"
          hasError={!!errors.confirmPassword?.message}
        />
        <PasswordCondition
          css={S.confirmPasswordCondition}
          touchedFields={touchedFields}
          newPassword={watch("newPassword")}
          confirmPassword={watch("confirmPassword")}
        >
          <PasswordCondition.checkConfirmPassword />
        </PasswordCondition>
        <Button
          css={S.createPasswordButton}
          disabled={!isEmpty(errors)}
          isLoading={isLoading}
          type="submit"
          variant="primary"
          label="Done"
          handleButtonClick={handlePasswordChange}
        />
      </form>
    </S.CreateNewPasswordSection>
  );
};

export default CreateNewPasswordForm;
