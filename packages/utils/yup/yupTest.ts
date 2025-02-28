import * as yup from "yup";

import {
  CAR_ADMIN_ERROR_MESSAGE,
  COMMON_ERROR_MESSAGE,
} from "@repo/constants/error/message";

import {
  checkEmailValidation,
  checkPasswordLength,
  checkPasswordType,
  checkUrl,
} from "../validation";

export const TEST = {
  DROPDOWN: {
    name: "requiredDropdown",
    message: COMMON_ERROR_MESSAGE.FIELD,
    test: ({ key, label }: { key: string | number; label: string }) => {
      if (typeof key === "number") key = `${key}`;

      return !!(key && label);
    },
  },
  EMAIL: {
    name: "emailValidation",
    message: COMMON_ERROR_MESSAGE.EMAIL_VALID,
    test: checkEmailValidation,
  },
  // NOTE: 추후 FILE, FILE_STRING 코드 통합 필요
  FILE: {
    name: "emptyFileValidation",
    message: COMMON_ERROR_MESSAGE.FIELD,
    test: (file: File | null) => !!file,
  },
  FILE_STRING: {
    name: "emptyFileStringValidation",
    message: COMMON_ERROR_MESSAGE.FIELD,
    test: (file: File | string) => !!file,
  },
  PASSWORD: {
    LENGTH: {
      name: "passwordLengthValidation",
      message: COMMON_ERROR_MESSAGE.PASSWORD_LENGTH,
      test: checkPasswordLength,
    },
    TYPE: {
      name: "passwordTypeValidation",
      message: COMMON_ERROR_MESSAGE.PASSWORD_TYPE,
      test: checkPasswordType,
    },
    NEW: {
      name: "passwordNewValidation",
      message: COMMON_ERROR_MESSAGE.CANNOT_UPDATE_PASSWORD,
      test: (value: string, contexts: yup.TestContext) => {
        return value !== contexts.resolve(yup.ref("currentPassword"));
      },
    },
    CONFIRM: {
      name: "passwordConfirmValidation",
      message: COMMON_ERROR_MESSAGE.PASSWORD_CONFIRM,
      test: (value: string, contexts: yup.TestContext) => {
        return value === contexts.resolve(yup.ref("newPassword"));
      },
    },
  },
  TRIM: {
    name: "trimValidation",
    message: COMMON_ERROR_MESSAGE.FIELD,
    test: (value: string) => !!value.trim(),
  },
  RETURN_TRUE: {
    name: "onlyTrue",
    message: COMMON_ERROR_MESSAGE.REQUIRED_SELECT_ONE_MORE,
    test: (value: boolean) => value === true,
  },
  URL: {
    name: "urlValidation",
    message: COMMON_ERROR_MESSAGE.URL_INCORRECT,
    test: (value: string) => checkUrl(value) === true,
  },
  LENGTH: (length: number) => ({
    name: "sixChar",
    message: () => COMMON_ERROR_MESSAGE.FIELD,
    test: (value: string) => value.length === length,
  }),
  RADIO_EMPTY_CHECK: {
    name: "radioEmptyCheck",
    message: CAR_ADMIN_ERROR_MESSAGE.REQUIRED_OPTION,
    test: (value: string | null) => !!value,
  },
};
