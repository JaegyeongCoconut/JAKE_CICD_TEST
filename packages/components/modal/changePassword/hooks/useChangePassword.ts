import { yupResolver } from "@hookform/resolvers/yup";
import type { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";
import { COMMON_TOAST_MESSAGE } from "@repo/constants/toast";
import useModal from "@repo/hooks/modal/useModal";
import useConfirmPasswordValidate from "@repo/hooks/password/useConfirmPasswordValidate";
import useNewPasswordValidate from "@repo/hooks/password/useNewPasswordValidate";
import useToast from "@repo/hooks/useToast";
import type {
  ApiErrorType,
  ChangeAccountPasswordQueryModel,
} from "@repo/types";
import { makeCryptoPassword } from "@repo/utils/crypto";
import { SCHEMA } from "@repo/utils/yup/schema";
import { TEST } from "@repo/utils/yup/yupTest";

interface Form {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const schema = yup.object({
  currentPassword: SCHEMA.REQUIRED_STRING,
  newPassword: SCHEMA.REQUIRED_STRING.test(
    TEST.PASSWORD.TYPE.name,
    TEST.PASSWORD.TYPE.message,
    TEST.PASSWORD.TYPE.test,
  )
    .test(
      TEST.PASSWORD.LENGTH.name,
      TEST.PASSWORD.LENGTH.message,
      TEST.PASSWORD.LENGTH.test,
    )
    .test(
      TEST.PASSWORD.NEW.name,
      TEST.PASSWORD.NEW.message,
      TEST.PASSWORD.NEW.test,
    ),
  confirmPassword: SCHEMA.REQUIRED_STRING.test(
    TEST.PASSWORD.CONFIRM.name,
    TEST.PASSWORD.CONFIRM.message,
    function (value) {
      return TEST.PASSWORD.CONFIRM.test(value, this); //NOTE: 화살표 함수로는 this 객체를 넘길 수 없음
    },
  ),
});

interface UseChangePasswordProps {
  changeAccountPasswordMutate: UseMutateFunction<
    unknown,
    ApiErrorType,
    ChangeAccountPasswordQueryModel,
    unknown
  >;
}

const initForm = { currentPassword: "", newPassword: "", confirmPassword: "" };

const useChangePassword = ({
  changeAccountPasswordMutate,
}: UseChangePasswordProps) => {
  const {
    register,
    watch,
    formState: { errors, touchedFields },
    setError,
    clearErrors,
    handleSubmit,
  } = useForm<Form>({
    defaultValues: initForm,
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const { validateCurrentPasswordNewPassword, handleNewPasswordBlur } =
    useNewPasswordValidate(setError, clearErrors);
  const { validateNewPasswordConfirmPassword, handleConfirmPasswordBlur } =
    useConfirmPasswordValidate(setError, clearErrors);
  const { handleModalClose } = useModal();
  const { addToast } = useToast();

  const handlePasswordChange = handleSubmit(
    ({ currentPassword, newPassword }) => {
      const req = {
        body: {
          currentPassword: makeCryptoPassword(currentPassword),
          newPassword: makeCryptoPassword(newPassword),
        },
      };

      changeAccountPasswordMutate(req, {
        onSuccess: () => {
          addToast(COMMON_TOAST_MESSAGE.SUCCESS.PASSWORD_CHANGE);
          handleModalClose();
        },
        onError: (error) => {
          if (error.response?.data.message === "CANNOT_UPDATE_PASSWORD") {
            setError("currentPassword", {
              type: "validate",
              message: COMMON_ERROR_MESSAGE.CANNOT_UPDATE_PASSWORD,
            });
          }

          if (error.response?.data.message === "INVALID_PASSWORD") {
            setError("currentPassword", {
              type: "validate",
              message: COMMON_ERROR_MESSAGE.CANNOT_UPDATE_PASSWORD,
            });
          }
        },
      });
    },
  );

  return {
    register,
    errors,
    touchedFields,
    setError,
    clearErrors,
    watch,
    handlePasswordChange,
    validateCurrentPasswordNewPassword,
    handleNewPasswordBlur,
    validateNewPasswordConfirmPassword,
    handleConfirmPasswordBlur,
  };
};

export default useChangePassword;
