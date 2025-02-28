import * as yup from "yup";

import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";
import { DropdownOptionType, DropdownUtiltyType, Languages } from "@repo/types";

export const SCHEMA = {
  OPTIONAL_DROPDOWN: <T extends DropdownOptionType<Languages>>(dropdown: T[]) =>
    yup.mixed<DropdownUtiltyType<T[]>>().optional(),
  OPTIONAL_API_DROPDOWN: <T extends DropdownOptionType<Languages>>() =>
    yup.mixed<DropdownUtiltyType<T[]>>().optional(),
  NULLABLE_STRING: yup.string().nullable().defined(),
  OPTIONAL_ARRAY: <T extends string>(keys: T[]) =>
    yup.string().oneOf(keys as ReadonlyArray<T>),
  OPTIONAL_NUMBER: yup.number().optional(),
  OPTIONAL_STRING: yup.string().optional(),
  OPTIONAL_FILE_STRING: yup.mixed<File | string>().optional(),
  OPTIONAL_FILE_NULLABLE: yup.mixed<File>().nullable().defined(),
  OPTIONAL_FILE_STRING_ARRAY: yup
    .array()
    .of(yup.mixed<File | string>().defined())
    .optional(),
  OPTIONAL_KEY_LABEL: yup
    .object({ key: yup.string(), label: yup.string() })
    .optional(),
  DEFINED_FILE: yup.mixed<File | string>().defined(),
  REQUIRED_STRING: yup.string().required(COMMON_ERROR_MESSAGE.FIELD),
  REQUIRED_NUMBER: yup.number().required(COMMON_ERROR_MESSAGE.FIELD),
  REQUIRED_ARRAY: <T extends string>(keys: T[]) =>
    yup
      .string()
      .oneOf(keys as ReadonlyArray<T>)
      .required(COMMON_ERROR_MESSAGE.FIELD),
  REQUIRED_BOOLEAN: yup.boolean().required(COMMON_ERROR_MESSAGE.FIELD),
  REQUIRED_NULLABLE_ARRAY: <T extends string | null>(keys: T[]) =>
    yup
      .string()
      .nullable()
      .oneOf(keys as ReadonlyArray<T>)
      .defined(),
  REQUIRED_ONE_OF_DATE: yup
    .array()
    .min(1, COMMON_ERROR_MESSAGE.REQUIRED_DATE)
    .required(COMMON_ERROR_MESSAGE.REQUIRED_DATE),
  REQUIRED_DROPDOWN: <T extends DropdownOptionType<Languages>>(dropdown: T[]) =>
    yup
      .mixed<DropdownUtiltyType<T[]>>()
      .required(COMMON_ERROR_MESSAGE.REQUIRED_OPTION),
  REQUIRED_API_DROPDOWN: <T extends DropdownOptionType<Languages>>() =>
    yup
      .mixed<DropdownUtiltyType<T[]>>()
      .required(COMMON_ERROR_MESSAGE.REQUIRED_OPTION),
  // NOTE: 추후 REQUIRED_FILE, REQUIRED_FILE_STRING 코드 통합 필요
  REQUIRED_FILE: yup
    .mixed<File>()
    .required(COMMON_ERROR_MESSAGE.FIELD)
    .nullable(), // NOTE: form에서 파일을 null로 초기화 해주기 위해 nullable 필요
  REQUIRED_FILE_STRING: yup
    .mixed<File | string>()
    .required(COMMON_ERROR_MESSAGE.FIELD),
  REQURED_FILE_STRING_ARRAY: yup
    .array()
    .of(yup.mixed<File | string>().required())
    .min(1, COMMON_ERROR_MESSAGE.FIELD)
    .required(COMMON_ERROR_MESSAGE.FIELD)
    .defined(),
  REQUIRED_KEY_LABEL: yup
    .object({
      key: yup.string().required(),
      label: yup.string().required(),
    })
    .required(),
};
