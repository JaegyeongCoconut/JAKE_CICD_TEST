import { yupResolver } from "@hookform/resolvers/yup";
import type { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { object } from "yup";

import { COMMON_ERROR_CODE } from "@repo/constants/error/code";
import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";
import useModal from "@repo/hooks/modal/useModal";
import useToast from "@repo/hooks/useToast";
import useUnexpectedApiError from "@repo/hooks/useUnexpectedApiError";
import type {
  CommonApiErrorType,
  ChangeAccountPasswordQueryModel,
  Languages,
} from "@repo/types";
import { SCHEMA } from "@repo/utils/yup/schema";
import { TEST } from "@repo/utils/yup/yupTest";

interface Form {
  confirmPassword: string;
  currentPassword: string;
  newPassword: string;
}

const schema = object({
  currentPassword: SCHEMA.REQUIRED_STRING(),
  newPassword: SCHEMA.REQUIRED_STRING()
    .test(TEST.PASSWORD.TYPE)
    .test(TEST.PASSWORD.LENGTH)
    .test(TEST.PASSWORD.NEW),
  confirmPassword: SCHEMA.REQUIRED_STRING().test(TEST.PASSWORD.CONFIRM),
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

const initForm = { currentPassword: "", newPassword: "", confirmPassword: "" };

const useChangePassword = ({
  successToast,
  onChangeAccountPasswordMutate,
  handleEncryptPassword,
}: UseChangePasswordProps) => {
  const formMethod = useForm<Form>({
    defaultValues: initForm,
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const { handleModalClose } = useModal();
  const { addToast } = useToast();
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

  return {
    formMethod,
    handlePasswordChange,
  };
};

export default useChangePassword;
