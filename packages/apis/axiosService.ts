import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";
import { TokenService } from "@repo/utils/tokenService";

export class AxiosService {
  private instance: AxiosInstance;

  constructor(private tokenService: TokenService) {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
    });
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
    error: AxiosError<any>,
  ): Promise<unknown> => {
    const { response: errorResponse } = error;

    switch (errorResponse?.data.message) {
      case COMMON_ERROR_MESSAGE.INVALID_ACCESS_TOKEN:
        return this.tokenService.resetTokenAndReattemptRequest(error);
      case COMMON_ERROR_MESSAGE.DUPLICATED_SIGNIN_DETECTED: // TODO: move admin, iot 서버 반영 및 웹에 배포 완료 후 삭제 필요
      case COMMON_ERROR_MESSAGE.DUPLICATE_SIGNIN_DETECTED:
        this.tokenService.expireSession(errorResponse?.data.message);
        break;
    }

    return Promise.reject(error);
  };
}
