import { zodResolver } from "@hookform/resolvers/zod";
import type { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { COMMON_ERROR_CODE } from "@repo/constants/error/code";
import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";
import useUnexpectedApiError from "@repo/hooks/useUnexpectedApiError";
import { useModalStore } from "@repo/stores/modal";
import { useToastStore } from "@repo/stores/toast";
import type {
  CommonApiErrorType,
  ChangeAccountPasswordQueryModel,
  Languages,
} from "@repo/types";
import { checkPasswordLength, checkPasswordType } from "@repo/utils/validation";
import { SCHEMA } from "@repo/utils/zod/schema";

import type { ChangePasswordFormSchema } from "../schema/changePassword.schema";

interface FormChangePassword {
  confirmPassword: string;
  currentPassword: string;
  newPassword: string;
}

const schema = SCHEMA.OBJECT.DEFAULT({
  currentPassword: SCHEMA.STRING.REQUIRED,
  newPassword: SCHEMA.STRING.REQUIRED,
  confirmPassword: SCHEMA.STRING.REQUIRED,
}).superRefine((value, context) => {
  const isCheckedPasswordType = checkPasswordType(value.newPassword);
  const isCheckedPasswordLength = checkPasswordLength(value.newPassword);

  if (value.currentPassword === value.newPassword) {
    context.addIssue({
      code: "custom",
      message: COMMON_ERROR_MESSAGE.CANNOT_UPDATE_PASSWORD,
      path: ["newPassword"],
    });
  }

  if (!isCheckedPasswordType || !isCheckedPasswordLength) {
    context.addIssue({
      code: "custom",
      message: !isCheckedPasswordType
        ? COMMON_ERROR_MESSAGE.PASSWORD_TYPE
        : COMMON_ERROR_MESSAGE.PASSWORD_LENGTH,
      path: ["newPassword"],
    });
  }

  if (value.newPassword !== value.confirmPassword) {
    context.addIssue({
      code: "custom",
      message: COMMON_ERROR_MESSAGE.PASSWORD_CONFIRM,
      path: ["confirmPassword"],
    });
  }
});

interface UseChangePasswordProps {
  successToast: { content: Languages; type: "success" };
  handleEncryptPassword: (password: string) => string;
  onChangeAccountPasswordMutate: UseMutateFunction<
    unknown,
    CommonApiErrorType,
    ChangeAccountPasswordQueryModel,
    unknown
  >;
}

const INIT_FORM: ChangePasswordFormSchema = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const useChangePassword = ({
  successToast,
  onChangeAccountPasswordMutate,
  handleEncryptPassword,
}: UseChangePasswordProps) => {
  const formMethod = useForm<FormChangePassword>({
    defaultValues: INIT_FORM,
    mode: "onTouched",
    resolver: zodResolver(schema),
  });

  const handleModalClose = useModalStore((state) => state.handleModalClose);
  const addToast = useToastStore((state) => state.addToast);

  const { showAlert } = useUnexpectedApiError();

  const handlePasswordChange = formMethod.handleSubmit(
    ({ currentPassword, newPassword }) => {
      const req: ChangeAccountPasswordQueryModel = {
        body: {
          currentPassword: handleEncryptPassword(currentPassword),
          newPassword: handleEncryptPassword(newPassword),
        },
      };

      onChangeAccountPasswordMutate(req, {
        onSuccess: () => {
          addToast(successToast);
          handleModalClose();
        },
        onError: (error) => {
          if (
            error.response?.data.message ===
            COMMON_ERROR_CODE.CANNOT_UPDATE_PASSWORD
          ) {
            return formMethod.setError("currentPassword", {
              type: "validate",
              message: COMMON_ERROR_MESSAGE.CANNOT_UPDATE_PASSWORD,
            });
          }

          if (
            error.response?.data.message === COMMON_ERROR_CODE.INVALID_PASSWORD
          ) {
            return formMethod.setError("currentPassword", {
              type: "validate",
              message: COMMON_ERROR_MESSAGE.CANNOT_UPDATE_PASSWORD,
            });
          }

          showAlert({
            method: error.config.method,
            message: error.response?.data.message,
            statusCode: undefined, // NOTE: CommonApiErrorType에 타입 작성이 되어 있지 않아 undeinfed 적용
            url: error.config.url,
          });
        },
      });
    },
  );

  return { formMethod, handlePasswordChange };
};

export default useChangePassword;
