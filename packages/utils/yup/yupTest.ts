import type { TestContext } from "yup";
import { ref } from "yup";

import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";

import {
  checkEmailValidation,
  checkPasswordLength,
  checkPasswordType,
  checkUrl,
} from "../validation";

export const TEST = {
  EMAIL: {
    name: "emailValidation",
    message: COMMON_ERROR_MESSAGE.EMAIL_VALID,
    test: checkEmailValidation,
  },
  FILE_STRING_NULLABLE: {
    name: "emptyFileStringValidation",
    message: COMMON_ERROR_MESSAGE.FIELD,
    test: (file: File | string | null) => !!file,
  },
  MOBILE_NUMBER_PREFIX: {
    name: "mobileNumberPrefixValidation",
    message: COMMON_ERROR_MESSAGE.MOBILE_VALID, // NOTE: 추후 문구 변경 될 수 있음
    test: (value: string) => value.startsWith("20"),
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
      test: (value: string, contexts: TestContext) => {
        return value !== contexts.resolve(ref("currentPassword"));
      },
    },
    CONFIRM: {
      name: "passwordConfirmValidation",
      message: COMMON_ERROR_MESSAGE.PASSWORD_CONFIRM,
      test: (value: string, contexts: TestContext) => {
        return value === contexts.resolve(ref("newPassword"));
      },
    },
  },
  TRIM: (message?: string) => ({
    name: "trimValidation",
    message: message || COMMON_ERROR_MESSAGE.FIELD,
    test: (value: string | null) => !!value?.trim(),
  }),
  URL: {
    name: "urlValidation",
    message: COMMON_ERROR_MESSAGE.URL_INCORRECT,
    test: (value: string) => checkUrl(value) === true,
  },
  LENGTH: (length: number) => ({
    //NOTE: 네이밍 변경 예정 ->SAME_LENGTH
    name: "sameLength",
    message: () => COMMON_ERROR_MESSAGE.FIELD,
    test: (value: string | (string | File)[] | null) =>
      (value?.length || 0) === length,
  }),
  MIN_LENGTH: <T extends string | File>(length: number) => ({
    name: "minLength",
    message: COMMON_ERROR_MESSAGE.FIELD,
    test: (value: T[] | null) => (value?.length || 0) >= length,
  }),
  EMPTY_NULL_CHECK: {
    name: "radioEmptyCheck",
    message: COMMON_ERROR_MESSAGE.FIELD,
    test: (value: string | File | string[] | null) => !!value,
  },
};
