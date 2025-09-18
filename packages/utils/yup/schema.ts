import { array, boolean, mixed, number, object, string } from "yup";

import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";

export const SCHEMA = {
  DEFINED_NULLABLE_STRING: string().nullable().defined(),
  OPTIONAL_STRING: string().optional(),
  REQUIRED_STRING: (message?: string) =>
    string().required(message || COMMON_ERROR_MESSAGE.FIELD),
  REQUIRED_ONE_OF_MIXED: <T extends string>(keys: T[]) =>
    mixed<T>()
      .oneOf(keys as ReadonlyArray<T>)
      .required(COMMON_ERROR_MESSAGE.FIELD),
  DEFINED_NULLABLE_ONE_OF_MIXED: <T extends string>(keys: T[]) =>
    mixed<T>()
      .oneOf(keys as ReadonlyArray<T>)
      .nullable()
      .defined(),
  DEFINED_NULLABLE_MIXED_API: <T extends Record<number, string>>() =>
    mixed<T>().nullable().defined(),
  REQUIRED_BOOLEAN: boolean().required(COMMON_ERROR_MESSAGE.FIELD),
  REQUIRED_MIN_ARRAY: array(string().defined())
    .nullable()
    .defined()
    .min(1, COMMON_ERROR_MESSAGE.FIELD),
  REQUIRED_MIXED_STRING_FILE: mixed<File | string>().required(
    COMMON_ERROR_MESSAGE.FIELD,
  ),
  REQUIRED_NULLABLE_MIXED_STRING_FILE: mixed<File | string>()
    .required()
    .nullable(), //NOTE:NULLABLE_DEFINED_MIXED_FILE_STRING로 통합 필요 (required -> defined로 변경)
  MIN_MESSAGE_NULLABLE_DEFINED_MIXED_ARRAY: <T extends File | string>() =>
    array().of(mixed<T>().defined()).defined().nullable(),
  OPTIONAL_MIXED_FILE_STRING: mixed<File | string>().optional(),
  OPTIONAL_NULLABLE_MIXED_FILE_STRING_DEFINED_ARRAY: array()
    .of(mixed<File | string>().defined())
    .nullable()
    .optional(), //NOTE: OPTIONAL_MIXED_FILE_STRING_DEFINED_ARRAY -> OPTIONAL_NULLABLE_MIXED_FILE_STRING_DEFINED_ARRAY 로 통합 예정 (초기값 Null 설정 필요하여)
  NULLABLE_DEFINED_MIXED_FILE_STRING: mixed<File | string>()
    .defined()
    .nullable(), // NOTE: file|string 필수값인 경우 초기값을 위해 null 설정
  STRIP: (type: "string" | "number" | "object") =>
    (type === "number"
      ? number()
      : type === "object"
        ? object()
        : string()
    ).strip(),
};
