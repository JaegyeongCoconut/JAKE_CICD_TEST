import type { AxiosError } from "axios";

import type { COMMON_ERROR_CODE } from "../../constants/error/code";

export type CommonApiErrorType = AxiosError<{
  message: keyof typeof COMMON_ERROR_CODE;
}>;

export interface ChangeAccountPasswordQueryModel {
  body: {
    currentPassword: string;
    newPassword: string;
  };
}

export type RecursiveUndefined<T> =
  // NOTE: 내부 타입을 추론할 수 있도록 infer 사용
  T extends Array<infer U>
    ? Array<RecursiveUndefined<U>> | undefined
    : T extends object
      ? { [K in keyof T]: RecursiveUndefined<T[K]> } | undefined
      : T | undefined;

export type RecursiveDefined<T> =
  T extends Array<infer U>
    ? Array<RecursiveDefined<NonNullable<U>>>
    : T extends object
      ? { [K in keyof T]: RecursiveDefined<NonNullable<T[K]>> }
      : NonNullable<T>;
