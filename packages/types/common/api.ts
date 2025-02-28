import type { AxiosError } from "axios";

import {
  COMMON_ERROR_CODE,
  LOGISTICS_ERROR_CODE,
} from "../../constants/error/code";
import {
  ADMIN_ERROR_MESSAGE,
  COMMON_ERROR_MESSAGE,
  IOT_ERROR_MESSAGE,
} from "../../constants/error/message";

export type ApiErrorType = AxiosError<{
  message:
    | keyof typeof ADMIN_ERROR_MESSAGE
    | keyof typeof LOGISTICS_ERROR_CODE
    | keyof typeof IOT_ERROR_MESSAGE;
}>;

export type CommonApiErrorType = AxiosError<{
  message: keyof typeof COMMON_ERROR_MESSAGE;
  statusCode: keyof typeof COMMON_ERROR_CODE;
}>;

export interface ChangeAccountPasswordQueryModel {
  body: {
    currentPassword: string;
    newPassword: string;
  };
}
