import type { ChangeEvent } from "react";
import React from "react";

import { useIsMutating, type UseMutateFunction } from "@tanstack/react-query";

import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import type {
  CommonApiErrorType,
  ChangeAccountPasswordQueryModel,
  Languages,
} from "@repo/types";

import * as S from "./ChangePasswordModal.styled";
import useChangePassword from "./hooks/useChangePassword";
import PasswordInput from "../../input/password/PasswordInput";
import LabelContentTable from "../../label/table/content/LabelContentTable";
import ErrorMessage from "../../message/ErrorMessage";
import PasswordCondition from "../../passwordCondition/PasswordCondition";
import DetailModal from "../detail/DetailModal";

interface ChangePasswordModalProps {
  className?: string;
  buttonLabel: Languages;
  currentPasswordPlaceholder: Languages;
  mutationKey: string[];
  newPasswordPlaceholder: Languages;
  successToast: { content: Languages; type: "success" };
  handleEncryptPassword: (password: string) => string;
  onChangeAccountPasswordMutate: UseMutateFunction<
    unknown,
    CommonApiErrorType,
    ChangeAccountPasswordQueryModel,
    unknown
  >;
}

const ChangePasswordModal = React.forwardRef<
  HTMLDialogElement,
  ChangePasswordModalProps
>(
  (
    {
      className,
      mutationKey,
      currentPasswordPlaceholder,
      newPasswordPlaceholder,
      buttonLabel,
      successToast,
      onChangeAccountPasswordMutate,
      handleEncryptPassword,
    },
    ref,
  ) => {
    const {
      formMethod: {
        setValue,
        watch,
        trigger,
        formState: { errors, touchedFields },
        register,
      },
      handlePasswordChange,
    } = useChangePassword({
      successToast,
      onChangeAccountPasswordMutate,
      handleEncryptPassword,
    });

    const mutatingCount = useIsMutating({ mutationKey });

    const handleCurrentPasswordChange = (
      e: ChangeEvent<HTMLInputElement>,
    ): void => {
      setValue("currentPassword", e.target.value.trim());

      if (!touchedFields.newPassword) return;

      trigger("newPassword");
    };

    const handleNewPasswordChange = (
      e: ChangeEvent<HTMLInputElement>,
    ): void => {
      setValue("newPassword", e.target.value.trim());

      if (!touchedFields.confirmPassword) return;

      trigger("confirmPassword");
    };

    return (
      <DetailModal
        css={S.modalLayout}
        className={className}
        ref={ref}
        isPosDisabled={!!Object.keys(errors).length}
        isPosLoading={!!mutatingCount}
        posButtonName={buttonLabel}
        posFnType="submit"
        title={LANGUAGE_LABEL.CHANGE_PASSWORD}
        handlePosButtonClick={handlePasswordChange}
      >
        <LabelContentTable variant="empty" marginBottom={20}>
          <LabelContentTable.Row>
            <LabelContentTable.Content
              css={S.content}
              isRequired
              label={LANGUAGE_LABEL.CURRENT_PASSWORD}
              labelWidth={150}
            >
              <S.InputWrapper>
                <PasswordInput
                  hasError={!!errors.currentPassword?.message}
                  autoComplete="on"
                  placeholder={currentPasswordPlaceholder}
                  register={register("currentPassword", {
                    onChange: handleCurrentPasswordChange,
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
              isRequired
              label={LANGUAGE_LABEL.NEW_PASSWORD}
              labelWidth={150}
            >
              <S.InputWrapper>
                <PasswordInput
                  hasError={!!errors.newPassword?.message}
                  autoComplete="on"
                  placeholder={newPasswordPlaceholder}
                  register={register("newPassword", {
                    onChange: handleNewPasswordChange,
                  })}
                />
                <PasswordCondition
                  css={S.passwordCondition}
                  errors={errors}
                  touchedFields={touchedFields}
                  watch={watch()}
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
              isRequired
              label={LANGUAGE_LABEL.CONFIRM_PASSWORD}
              labelWidth={150}
            >
              <S.InputWrapper>
                <PasswordInput
                  hasError={!!errors.confirmPassword?.message}
                  autoComplete="on"
                  placeholder={LANGUAGE_LABEL.ENTER_CONFIRM_PASSWORD}
                  register={register("confirmPassword", {
                    onChange: (e: ChangeEvent<HTMLInputElement>): void =>
                      setValue("confirmPassword", e.target.value.trim()),
                  })}
                />
                <PasswordCondition
                  css={S.passwordCondition}
                  errors={errors}
                  touchedFields={touchedFields}
                  watch={watch()}
                >
                  <PasswordCondition.checkConfirmPassword />
                </PasswordCondition>
              </S.InputWrapper>
            </LabelContentTable.Content>
          </LabelContentTable.Row>
        </LabelContentTable>
      </DetailModal>
    );
  },
);

ChangePasswordModal.displayName = "ChangePasswordModal";

export default ChangePasswordModal;
