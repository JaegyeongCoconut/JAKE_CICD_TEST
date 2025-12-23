import { AxiosService } from "@repo/apis/axiosService";
import { SERVICE_INFO } from "@repo/assets/static/serviceInfo";
import { TokenService } from "@repo/utils/tokenService";

import { useAuthStore } from "~stores";

const authAccessors = {
  getAccessToken: () => useAuthStore.getState().user?.accessToken,
  getRefreshToken: () => useAuthStore.getState().user?.refreshToken,
  setAccessToken: (token: string) =>
    useAuthStore.getState().changeAccessToken(token),
  signOut: () => useAuthStore.getState().signOut(),
};

const axiosService = new AxiosService(
  TokenService.getInstance({
    objectName: SERVICE_INFO.CAR_INSPECTION.objectName,
    auth: authAccessors,
  }),
);

export const ax = axiosService.setInterceptors();
