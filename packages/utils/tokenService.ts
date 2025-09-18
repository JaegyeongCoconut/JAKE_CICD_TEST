import axios from "axios";

import { SERVICE_INFO } from "@repo/assets/static/serviceInfo";
import { AUTH_ALERT_MESSAGE } from "@repo/constants/error/alert";
import { COMMON_ERROR_CODE } from "@repo/constants/error/code";

import { renewAccessTokenAPI } from "../apis/auth";

interface Fn {
  (accessToken: string): void;
}

interface TokenServiceProps {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  onChangeAccessToken: (accessToken: string) => void;
  onSignOut: () => void;
}

interface InstanceProps {
  auth: TokenServiceProps;
  objectName: keyof typeof SERVICE_INFO;
}

export class TokenService {
  private isAlreadyFetchingAccessToken = false;
  private subscribers: Fn[] = [];

  private static instance: TokenService | null = null;

  private constructor(
    private objectName: keyof typeof SERVICE_INFO,
    private auth: TokenServiceProps,
  ) {}

  static getInstance({ objectName, auth }: InstanceProps): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService(objectName, auth);
    }
    return TokenService.instance;
  }

  async resetTokenAndReattemptRequest(error: any) {
    try {
      const { response: errorResponse } = error;

      const { refreshToken } = this.auth;
      if (!refreshToken) {
        this.expireSession(errorResponse?.data.message);
        return await Promise.reject(error);
      }
      const retryOriginalRequest = new Promise((resolve) => {
        this.addSubscriber((accessToken: string) => {
          errorResponse.config.headers.Authorization = `Bearer ${accessToken}`;
          resolve(axios(errorResponse.config));
        });
      });
      if (!this.isAlreadyFetchingAccessToken) {
        try {
          this.isAlreadyFetchingAccessToken = true;
          const tokens = await renewAccessTokenAPI(
            `${import.meta.env.VITE_BASE_URL}${SERVICE_INFO[this.objectName].refreshTokenUrlSuffix}`,
            refreshToken,
          );
          if (!tokens.accessToken) {
            return await Promise.reject(error);
          }

          this.auth.onChangeAccessToken(tokens.accessToken);

          this.onAccessTokenFetched(tokens.accessToken);
        } catch (error: any) {
          const { response: errorResponse } = error;

          const authErrorCode = [
            COMMON_ERROR_CODE.INVALID_REFRESH_TOKEN,
            COMMON_ERROR_CODE.INVALID_TOKEN,
            COMMON_ERROR_CODE.DUPLICATED_SIGNIN_DETECTED, // TODO: move admin, iot 서버 반영 및 웹에 배포 완료 후 삭제 필요
            COMMON_ERROR_CODE.DUPLICATE_SIGNIN_DETECTED,
          ];

          if (authErrorCode.includes(errorResponse?.data.message)) {
            this.expireSession(errorResponse?.data.message);
            return await Promise.reject(error);
          }
        } finally {
          this.isAlreadyFetchingAccessToken = false;
        }
      }
      return await retryOriginalRequest;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  getAccessToken() {
    return this.auth.accessToken;
  }

  onAccessTokenFetched(accessToken: string) {
    this.subscribers.forEach((callback) => callback(accessToken));
    this.subscribers = [];
  }

  addSubscriber(callback: Fn) {
    this.subscribers.push(callback);
  }

  expireSession(errorMessage: keyof typeof AUTH_ALERT_MESSAGE) {
    this.auth.refreshToken && alert(AUTH_ALERT_MESSAGE[errorMessage]);
    this.auth.onSignOut();
  }
}
