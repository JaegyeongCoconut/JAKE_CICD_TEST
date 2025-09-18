import { AxiosService } from "@repo/apis/axiosService";
import { SERVICE_INFO } from "@repo/assets/static/serviceInfo";
import { TokenService } from "@repo/utils/tokenService";

import { auth } from "~contexts";

const axiosService = new AxiosService(
  TokenService.getInstance({
    objectName: SERVICE_INFO.CAR_INSPECTION.objectName,
    auth,
  }),
);

export const ax = axiosService.setInterceptors();
