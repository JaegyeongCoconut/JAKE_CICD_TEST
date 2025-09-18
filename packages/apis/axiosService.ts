import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import axios from "axios";

import { COMMON_ERROR_CODE } from "@repo/constants/error/code";
import type { CommonApiErrorType } from "@repo/types";
import type { TokenService } from "@repo/utils/tokenService";

export class AxiosService {
  private instance: AxiosInstance;

  constructor(private tokenService: TokenService) {
    const isMockEnabled = import.meta.env.VITE_USE_MOCKS;
    const MOCK_BASE_URL = "";
    const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
    const BASE_URL = isMockEnabled ? MOCK_BASE_URL : VITE_BASE_URL;

    this.instance = axios.create({ baseURL: BASE_URL });
  }

  setInterceptors() {
    this.instance.interceptors.request.use(this.onRequest, this.onRequestError);
    this.instance.interceptors.response.use(
      this.onResponse,
      this.onResponseError,
    );

    return this.instance;
  }

  private onRequest = (config: AxiosRequestConfig = {}): AxiosRequestConfig => {
    const headers = config.headers || {};
    const accessToken = this.tokenService.getAccessToken();
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    return { ...config, headers };
  };

  private onRequestError = (error: AxiosError) => Promise.reject(error);

  private onResponse = (response: AxiosResponse) => response;

  private onResponseError = async (
    error: CommonApiErrorType,
  ): Promise<unknown> => {
    const { response: errorResponse } = error;

    switch (errorResponse?.data.message) {
      case COMMON_ERROR_CODE.INVALID_ACCESS_TOKEN:
      case COMMON_ERROR_CODE.INVALID_TOKEN:
        return this.tokenService.resetTokenAndReattemptRequest(error);
      case COMMON_ERROR_CODE.DUPLICATED_SIGNIN_DETECTED: // TODO: move admin, iot 서버 반영 및 웹에 배포 완료 후 삭제 필요
      case COMMON_ERROR_CODE.DUPLICATE_SIGNIN_DETECTED:
        this.tokenService.expireSession(errorResponse?.data.message);
        break;
    }

    return Promise.reject(error);
  };
}
