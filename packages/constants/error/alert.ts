export const AUTH_ALERT_MESSAGE = {
  INVALID_REFRESH_TOKEN: "Your session has expired.",
  INVALID_TOKEN: "Your session has expired.", //NOTE: delivery token 에러 메세지
  DUPLICATED_SIGNIN_DETECTED: "Signed out because your account is signed in from another device.", // TODO: move admin, iot 서버 반영 및 웹에 배포 완료 후 삭제 필요
  DUPLICATE_SIGNIN_DETECTED: "Signed out because your account is signed in from another device.",
} as const;
