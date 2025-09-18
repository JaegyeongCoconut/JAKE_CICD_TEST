import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";
import type { FormResetPassword } from "@repo/types";
import { SCHEMA } from "@repo/utils/yup/schema";
import { TEST } from "@repo/utils/yup/yupTest";

const DEFAULT_VALUES = {
  verify: {
    email: "",
    verificationCode: "",
    token: null,
    isAuthCodeSend: false,
    hasVerified: false,
  },
  newPassword: "",
  confirmPassword: "",
};

const schema = object({
  verify: object({
    email: SCHEMA.REQUIRED_STRING().test(TEST.TRIM()).test(TEST.EMAIL),
    verificationCode: string()
      .defined()
      .when("isAuthCodeSend", {
        is: true,
        then: (schema) => schema.required(COMMON_ERROR_MESSAGE.FIELD),
      }),
    token: SCHEMA.DEFINED_NULLABLE_STRING,
    isAuthCodeSend: SCHEMA.REQUIRED_BOOLEAN,
    hasVerified: SCHEMA.REQUIRED_BOOLEAN,
  }).required(),
  newPassword: string()
    .defined()
    .when("verify.hasVerified", {
      is: true,
      then: (schema) =>
        schema
          .required(COMMON_ERROR_MESSAGE.FIELD)
          .test(TEST.PASSWORD.TYPE)
          .test(TEST.PASSWORD.LENGTH),
      otherwise: (schema) => schema.optional(),
    }),
  confirmPassword: string()
    .defined()
    .when("verify.hasVerified", {
      is: true,
      then: (schema) =>
        schema.required(COMMON_ERROR_MESSAGE.FIELD).test(TEST.PASSWORD.CONFIRM),
      otherwise: (schema) => schema.optional(),
    }),
});

const useResetPasswordForm = () => {
  const formMethod = useForm<FormResetPassword>({
    mode: "onTouched",
    defaultValues: DEFAULT_VALUES,
    shouldFocusError: false,
    resolver: yupResolver(schema),
  });
  return { formMethod };
};

export default useResetPasswordForm;
