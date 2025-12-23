import { upperCase } from "lodash-es";

import { COMMON_ERROR_CODE } from "@repo/constants/error/code";

interface ShowAlertProps {
  message: string | undefined;
  method: string | undefined;
  statusCode: number | string | undefined;
  url: string | undefined;
}

// NOTE: 정의하지 않은 API 에러 발생 시, 사용자에게 알림을 보여주는 커스텀 훅
const useUnexpectedApiError = () => {
  const showAlert = ({
    message = "None",
    method = "None",
    statusCode = "None",
    url = "None",
  }: ShowAlertProps): void => {
    const IGNORED_ERROR_MESSAGES = [
      COMMON_ERROR_CODE.INVALID_ACCESS_TOKEN,
      COMMON_ERROR_CODE.INVALID_TOKEN,
      COMMON_ERROR_CODE.DUPLICATED_SIGNIN_DETECTED,
      COMMON_ERROR_CODE.DUPLICATE_SIGNIN_DETECTED,
    ] as const;

    if (
      IGNORED_ERROR_MESSAGES.includes(
        message as (typeof IGNORED_ERROR_MESSAGES)[number],
      )
    ) {
      return;
    }

    const currentPath = window.location.pathname;

    alert(`An unexpected error has occurred.
      Please share the following information with our support team to resolve the issue:
      - API Path: ${upperCase(method)} ${url}
      - Error Code: ${statusCode}
      - Error Message: ${message}
      - Current Page: ${currentPath}
      - Current UTC Time: ${new Date().toUTCString()}`);
  };

  return { showAlert };
};

export default useUnexpectedApiError;
