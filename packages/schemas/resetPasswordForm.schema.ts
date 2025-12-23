import type z from "zod";

import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";
import { checkPasswordType, checkPasswordLength } from "@repo/utils/validation";
import { REFINE } from "@repo/utils/zod/refine";
import { SCHEMA } from "@repo/utils/zod/schema";

export const resetPasswordSchema = SCHEMA.OBJECT.DEFAULT({
  verify: SCHEMA.OBJECT.DEFAULT({
    email: SCHEMA.STRING.REQUIRED.refine(REFINE.EMAIL.test, REFINE.EMAIL.error),
    verificationCode: SCHEMA.STRING.DEFAULT,
    token: SCHEMA.STRING.NULLABLE,
    isAuthCodeSend: SCHEMA.BOOLEAN,
    hasVerified: SCHEMA.BOOLEAN,
  }).refine((value) => !value.isAuthCodeSend || value.verificationCode, {
    path: ["verificationCode"],
    error: COMMON_ERROR_MESSAGE.FIELD,
  }),
  newPassword: SCHEMA.STRING.DEFAULT,
  confirmPassword: SCHEMA.STRING.DEFAULT,
}).superRefine((value, context) => {
  if (!value.verify.hasVerified) return;

  if (!value.newPassword || !value.confirmPassword) {
    !value.newPassword &&
      context.addIssue({
        code: "custom",
        message: COMMON_ERROR_MESSAGE.FIELD,
        path: ["newPassword"],
      });

    !value.confirmPassword &&
      context.addIssue({
        code: "custom",
        message: COMMON_ERROR_MESSAGE.FIELD,
        path: ["confirmPassword"],
      });
  }

  const isCheckedPasswordType = checkPasswordType(value.newPassword);
  const isCheckedPasswordLength = checkPasswordLength(value.newPassword);

  if (!isCheckedPasswordType || !isCheckedPasswordLength) {
    context.addIssue({
      code: "custom",
      message: !isCheckedPasswordType
        ? COMMON_ERROR_MESSAGE.PASSWORD_TYPE
        : COMMON_ERROR_MESSAGE.PASSWORD_LENGTH,
      path: ["newPassword"],
    });
  }

  if (value.newPassword !== value.confirmPassword) {
    context.addIssue({
      code: "custom",
      message: COMMON_ERROR_MESSAGE.PASSWORD_CONFIRM,
      path: ["confirmPassword"],
    });
  }
});

export type ResetPasswordFormSchema = z.infer<typeof resetPasswordSchema>;
