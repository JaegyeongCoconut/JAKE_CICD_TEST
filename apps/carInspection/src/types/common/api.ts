import type { AxiosError } from "axios";

import type { ERROR_CODE } from "~constants";

export type ApiErrorType<TMessage extends string = keyof typeof ERROR_CODE> =
  AxiosError<{
    message: TMessage;
    response: { data: { message: string } };
  }>;
