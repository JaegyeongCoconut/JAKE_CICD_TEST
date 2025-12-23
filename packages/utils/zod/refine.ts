import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";
import {
  checkEmailValidation,
  checkPasswordLength,
  checkPasswordType,
  checkUrl,
  checkVersion,
} from "@repo/utils/validation";

interface PasswordConfirmProps {
  confirmPassword: string;
  newPassword: string;
}

export const REFINE = {
  REQUIRED_STRING: {
    test: (value: string | null): boolean => !!value,
    error: (message?: string) => ({
      error: message || COMMON_ERROR_MESSAGE.FIELD,
    }),
  },
  REQUIRED_FILE: {
    test: (value: string | File | null): boolean => !!value,
    error: (message?: string) => ({
      error: message || COMMON_ERROR_MESSAGE.FIELD,
    }),
  },
  REQUIRED_ARRAY: {
    test: <T>(value: T[] | null): boolean =>
      Array.isArray(value) && !!value?.length,
    error: (message?: string) => ({
      error: message || COMMON_ERROR_MESSAGE.FIELD,
    }),
  },
  URL: {
    test: (value: string): boolean => checkUrl(value),
    error: { error: COMMON_ERROR_MESSAGE.URL_INCORRECT },
  },
  PAIR: {
    test: (value: { key: string; label: string }): boolean =>
      !!value.key && !!value.label,
    error: { error: COMMON_ERROR_MESSAGE.FIELD },
  },
  NOTICE_CONTENTS: {
    test: (value: string): boolean => {
      const text = value.replace(/(<([^>]+)>|&nbsp;)/gi, "").trim();
      const hasImage = /<img\s+[^>]*src=/i.test(value);

      return !!text.length || hasImage;
    },
    error: { error: COMMON_ERROR_MESSAGE.FIELD },
  },
  EMAIL: {
    test: (value: string): boolean => checkEmailValidation(value),
    error: { error: COMMON_ERROR_MESSAGE.EMAIL_VALID },
  },
  VERSION: {
    test: (value: string): boolean => checkVersion(value),
    error: { error: COMMON_ERROR_MESSAGE.VERSION_INCORRECT },
  },
  PASSWORD: {
    TYPE: {
      test: (value: string) => checkPasswordType(value),
      error: { error: COMMON_ERROR_MESSAGE.PASSWORD_TYPE },
    },
    LENGTH: {
      test: (value: string) => checkPasswordLength(value),
      error: { error: COMMON_ERROR_MESSAGE.PASSWORD_LENGTH },
    },
    CONFIRM: {
      test: ({ confirmPassword, newPassword }: PasswordConfirmProps) =>
        newPassword === confirmPassword,
      error: {
        error: COMMON_ERROR_MESSAGE.PASSWORD_CONFIRM,
        path: ["confirmPassword"],
      },
    },
  },
};
