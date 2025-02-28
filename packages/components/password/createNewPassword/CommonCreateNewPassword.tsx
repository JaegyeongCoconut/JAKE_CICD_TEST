import React from "react";

import type { UseMutateFunction } from "@tanstack/react-query";
import { FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import useCreateNewPassword from "@repo/hooks/password/useCreateNewPassword";
import useToast from "@repo/hooks/useToast";
import useUnexpectedApiError from "@repo/hooks/useUnexpectedApiError";
import { useVerifyAccountStore } from "@repo/stores/verifyAccount";
import type {
  UpdatePasswordWithVerifyQueryModel,
  CommonApiErrorType,
  CreateNewPasswordFormType,
  Toast,
} from "@repo/types";
import { makeCryptoPassword } from "@repo/utils/crypto";

import CreateNewPasswordForm from "./form/CreateNewPasswordForm";

interface CommonCreateNewPasswordProps {
  isLoading: boolean;
  resetPasswordPath: string;
  toastMessage: Omit<Toast, "id">;
  successPath: string;
  hasShowAlert: boolean;
  updatePasswordWithVerify: UseMutateFunction<
    unknown,
    CommonApiErrorType,
    UpdatePasswordWithVerifyQueryModel,
    unknown
  >;
}

const CommonCreateNewPassword = ({
  isLoading,
  resetPasswordPath,
  toastMessage,
  successPath,
  hasShowAlert,
  updatePasswordWithVerify,
}: CommonCreateNewPasswordProps) => {
  const navigate = useNavigate();

  const verifyAccountInfo = useVerifyAccountStore((state) => state.verifyInfo);

  const { formMethod } = useCreateNewPassword(resetPasswordPath);
  const { addToast } = useToast();
  const { showAlert } = useUnexpectedApiError();

  const handlePasswordChange = (data: CreateNewPasswordFormType) => {
    const { email, authCode } = verifyAccountInfo;
    const req: UpdatePasswordWithVerifyQueryModel = {
      email,
      authCode,
      password: makeCryptoPassword(data.newPassword),
    };

    updatePasswordWithVerify(req, {
      onSuccess: () => {
        addToast(toastMessage);
        navigate(successPath);
      },
      onError: (error) => {
        hasShowAlert &&
          showAlert({
            message: error.response?.data.message,
            statusCode: error.response?.data.statusCode,
          });
      },
    });
  };

  return (
    <FormProvider {...formMethod}>
      <CreateNewPasswordForm
        isLoading={isLoading}
        handlePasswordChange={formMethod.handleSubmit(handlePasswordChange)}
      />
    </FormProvider>
  );
};

export default CommonCreateNewPassword;
