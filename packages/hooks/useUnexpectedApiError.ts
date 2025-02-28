import { useLocation } from "react-router-dom";

// NOTE: 정의하지 않은 API 에러 발생 시, 사용자에게 알림을 보여주는 커스텀 훅
const useUnexpectedApiError = () => {
  const location = useLocation();

  const showAlert = ({
    message = "None",
    statusCode = "None",
  }: {
    message?: string;
    statusCode?: number | string;
  }) => {
    alert(`An unexpected error has occurred.
Please share the following information with our support team to resolve the issue:
- Error Code: ${statusCode}
- Error Message: ${message}
- Current Page: ${location.pathname}
- Current UTC Time: ${new Date().toUTCString()}`);
  };

  return { showAlert };
};

export default useUnexpectedApiError;
