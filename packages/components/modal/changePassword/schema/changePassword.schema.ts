import type z from "zod";

import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";
import { checkPasswordLength, checkPasswordType } from "@repo/utils/validation";
import { SCHEMA } from "@repo/utils/zod/schema";

export const schema = SCHEMA.OBJECT.DEFAULT({
  currentPassword: SCHEMA.STRING.REQUIRED,
  newPassword: SCHEMA.STRING.REQUIRED,
  confirmPassword: SCHEMA.STRING.REQUIRED,
}).superRefine((value, context) => {
  const isCheckedPasswordType = checkPasswordType(value.newPassword);
  const isCheckedPasswordLength = checkPasswordLength(value.newPassword);

  if (value.currentPassword === value.newPassword) {
    context.addIssue({
      code: "custom",
      message: COMMON_ERROR_MESSAGE.CANNOT_UPDATE_PASSWORD,
      path: ["newPassword"],
    });
  }

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

export type ChangePasswordFormSchema = z.infer<typeof schema>;
