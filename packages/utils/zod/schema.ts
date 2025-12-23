import type { ZodRawShape, ZodType } from "zod";
import z from "zod";

import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";

type StringLengthType = { length: number; message: string };
type StringMinMaxType = {
  maxLength: number;
  maxMessage: string;
  minLength: number;
  minMessage: string;
};

export const SCHEMA = {
  STRING: {
    DEFAULT: z.string().trim(),
    REQUIRED: z.string().trim().min(1, COMMON_ERROR_MESSAGE.FIELD),
    NULLABLE: z.string().nullable(),
    LENGTH: ({ length, message }: StringLengthType) =>
      //NOTE: 해당 input의 maxLength = length 이거나, 고정된 length가 있을 때(e.g. verifyCode) 사용
      z
        .string()
        .trim()
        .min(1, COMMON_ERROR_MESSAGE.FIELD)
        .length(length, message),
    REQUIRED_MIN: ({ length, message }: StringLengthType) =>
      //NOTE: 공백 에러 문구 존재 + input의 maxLength > length일 때 사용
      z.string().trim().min(1, COMMON_ERROR_MESSAGE.FIELD).min(length, message),
    MIN: ({ length, message }: StringLengthType) =>
      z.string().trim().min(length, message),
    MAX: ({ length, message }: StringLengthType) =>
      z.string().trim().max(length, message),
    MIN_MAX: ({
      maxLength,
      minLength,
      maxMessage,
      minMessage,
    }: StringMinMaxType) =>
      z
        .string()
        .trim()
        .min(1, COMMON_ERROR_MESSAGE.FIELD)
        .min(minLength, minMessage)
        .max(maxLength, maxMessage),
  },
  BOOLEAN: z.boolean(),
  NUMBER: z.number(),
  OBJECT: {
    DEFAULT: <T extends ZodRawShape>(schema: T) => z.object(schema),
    NULLABLE: <T extends ZodRawShape>(schema: T) => z.object(schema).nullable(),
  },
  ARRAY: {
    DEFAULT: <T extends ZodType<unknown>>(schema: T) => z.array(schema),
    STRING: {
      DEFAULT: z.array(z.string()),
      NULLABLE: z.array(z.string()).nullable(),
      REQUIRED_NULLABLE: z
        .array(z.string().trim().min(1, COMMON_ERROR_MESSAGE.FIELD))
        .nullable(), //NOTE: date 필수값
    },
    UNION: {
      STRING_FILE_NULLABLE: z
        .array(z.union([z.string(), z.instanceof(File)]))
        .nullable(),
    },
    OBJECT: {
      DEFAULT: <T extends ZodRawShape>(schema: T) => z.array(z.object(schema)),
      NULLABLE: <T extends ZodRawShape>(schema: T) =>
        z.array(z.object(schema)).nullable(),
      NULLABLE_ITEM: <T extends ZodRawShape>(schema: T) =>
        z.array(z.object(schema).nullable()),
    },
    ENUM: {
      DEFAULT: <T extends string>(keys: T[]) => z.array(z.enum(keys)),
      NULLABLE: <T extends string>(keys: T[]) =>
        z.array(z.enum(keys)).nullable(),
    },
  },
  ENUM: {
    DEFAULT: <T extends string>(keys: T[]) => z.enum(keys),
    NULLABLE: <T extends string>(keys: T[]) => z.enum(keys).nullable(),
  },
  UNION: {
    STRING_UNDEFINED: z.union([z.string(), z.undefined()]),
    STRING_FILE: z.union([z.string(), z.instanceof(File)]),
    STRING_FILE_NULLABLE: z.union([z.string(), z.instanceof(File)]).nullable(),
    ARRAY_STRING_ITEM_UNDEFINED: z.union([z.array(z.string()), z.undefined()]), //NOTE: date 선택값
  },
};
