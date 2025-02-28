import React from "react";

import type { UseMutateFunction } from "@tanstack/react-query";

import type {
  ApiErrorType,
  ChangeAccountPasswordQueryModel,
} from "@repo/types";

import * as S from "./ChangePasswordModal.styled";
import useChangePassword from "./hooks/useChangePassword";
import PasswordInput from "../../input/password/PasswordInput";
import LabelContentTable from "../../label/table/content/LabelContentTable";
import ErrorMessage from "../../message/ErrorMessage";
import PasswordCondition from "../../passwordCondition/PasswordCondition";
import DetailModal from "../detail/DetailModal";

interface PasswordChangeModalProps {
  className?: string;
  isLoading: boolean;
  changeAccountPasswordMutate: UseMutateFunction<
    unknown,
    ApiErrorType,
    ChangeAccountPasswordQueryModel,
    unknown
  >;
}

const ChangePasswordModal = React.forwardRef<
  HTMLDialogElement,
  PasswordChangeModalProps
>(({ className, isLoading, changeAccountPasswordMutate }, ref) => {
  const {
    errors,
    touchedFields,
    watch,
    handlePasswordChange,
    register,
    validateCurrentPasswordNewPassword,
    handleNewPasswordBlur,
    validateNewPasswordConfirmPassword,
    handleConfirmPasswordBlur,
  } = useChangePassword({
    changeAccountPasswordMutate,
  });

  return (
    <DetailModal
      ref={ref}
      css={S.modalLayout}
      className={className}
      isPosLoading={isLoading}
      title="Change password"
      posButtonName="Update"
      posFnType="submit"
      isPosDisabled={Object.keys(errors).length > 0}
      posFn={handlePasswordChange}
    >
      <LabelContentTable variant="empty" marginBottom={20}>
        <LabelContentTable.Row>
          <LabelContentTable.Content
            css={S.content}
            label="Current password"
            labelWidth={150}
            isRequired
          >
            <S.InputWrapper>
              <PasswordInput
                hasError={!!errors.currentPassword?.message}
                placeholder="Current password"
                register={register("currentPassword", {
                  onChange: (event) => {
                    validateCurrentPasswordNewPassword(
                      event.target.value,
                      watch("newPassword"),
                    );
                  },
                })}
              />
              {errors?.currentPassword?.message && (
                <ErrorMessage
                  css={S.errorMessage}
                  message={errors.currentPassword.message}
                />
              )}
            </S.InputWrapper>
          </LabelContentTable.Content>
        </LabelContentTable.Row>
        <LabelContentTable.Row>
          <LabelContentTable.Content
            css={S.content}
            label="New password"
            labelWidth={150}
            isRequired
          >
            <S.InputWrapper>
              <PasswordInput
                hasError={!!errors.newPassword?.message}
                placeholder="Enter password"
                register={register("newPassword", {
                  onChange: (event) => {
                    validateNewPasswordConfirmPassword(
                      event.target.value,
                      watch("confirmPassword"),
                    );
                  },
                  onBlur: handleNewPasswordBlur,
                })}
              />
              <PasswordCondition
                css={S.passwordCondition}
                touchedFields={touchedFields}
                currentPassword={watch("currentPassword")}
                newPassword={watch("newPassword")}
              >
                <PasswordCondition.lengthCondition />
                <PasswordCondition.textTypeCondition />
                <PasswordCondition.passwordCondition />
              </PasswordCondition>
            </S.InputWrapper>
          </LabelContentTable.Content>
        </LabelContentTable.Row>
        <LabelContentTable.Row>
          <LabelContentTable.Content
            css={S.content}
            label="Confirm password"
            labelWidth={150}
            isRequired
          >
            <S.InputWrapper>
              <PasswordInput
                hasError={!!errors.confirmPassword?.message}
                placeholder="Enter confirm password"
                register={register("confirmPassword", {
                  onBlur: handleConfirmPasswordBlur,
                })}
              />
              <PasswordCondition
                css={S.passwordCondition}
                touchedFields={touchedFields}
                newPassword={watch("newPassword")}
                confirmPassword={watch("confirmPassword")}
              >
                <PasswordCondition.checkConfirmPassword />
              </PasswordCondition>
            </S.InputWrapper>
          </LabelContentTable.Content>
        </LabelContentTable.Row>
      </LabelContentTable>
    </DetailModal>
  );
});

ChangePasswordModal.displayName = "ChangePasswordModal";

export default ChangePasswordModal;
