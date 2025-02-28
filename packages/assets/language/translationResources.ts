import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { SERVICE_INFO } from "../static/serviceName";
import carAdminEn from "./files/carAdmin/carAdmin-en.json";
import carAdminLo from "./files/carAdmin/carAdmin-lo.json";
import carInspectionEn from "./files/carInspection/carInspection-en.json";
import carInspectionLo from "./files/carInspection/carInspection-lo.json";
import ecommerceAdminEn from "./files/eCommerceAdmin/eCommerceAdmin-en.json";
import ecommerceAdminLo from "./files/eCommerceAdmin/eCommerceAdmin-lo.json";
import logisticsEn from "./files/logisticsAdmin/logisticsAdmin-en.json";
import logisticsLo from "./files/logisticsAdmin/logisticsAdmin-lo.json";
import membershipAdminEn from "./files/membershipAdmin/membershipAdmin-en.json";
import membershipAdminLo from "./files/membershipAdmin/membershipAdmin-lo.json";
import adminEn from "./files/moveAdmin/moveAdmin-en.json";
import adminLo from "./files/moveAdmin/moveAdmin-lo.json";

export const fallbackLng = "EN";

export const moveAdminResources = {
  en: { translation: adminEn },
  lo: { translation: adminLo },
} as const;

export const moveIotResources = {
  en: { translation: {} },
  lo: { translation: {} },
} as const;

export const moveRankingResources = {
  en: { translation: {} },
  lo: { translation: {} },
} as const;

export const logisticsAdminResources = {
  en: { translation: logisticsEn },
  lo: { translation: logisticsLo },
} as const;

export const carAdminResources = {
  en: { translation: carAdminEn },
  lo: { translation: carAdminLo },
} as const;

export const carInspectionResources = {
  en: { translation: carInspectionEn },
  lo: { translation: carInspectionLo },
} as const;

export const ecommerceAdminResources = {
  en: { translation: ecommerceAdminEn },
  lo: { translation: ecommerceAdminLo },
} as const;

export const membershipAdminResources = {
  en: { translation: membershipAdminEn },
  lo: { translation: membershipAdminLo },
} as const;

const combinedEn = {
  ...adminEn,
  ...logisticsEn,
  ...carAdminEn,
  ...carInspectionEn,
  ...ecommerceAdminEn,
  ...membershipAdminEn,
};
const combinedLo = {
  ...adminLo,
  ...logisticsLo,
  ...carAdminLo,
  ...carInspectionLo,
  ...ecommerceAdminLo,
  ...membershipAdminLo,
};

const resources = {
  en: { translation: combinedEn },
  lo: { translation: combinedLo },
} as const;

/*NOTE: 
  version: v3.0.0
  author: 서대원
  description: 중복키 문제로 프로젝트를 구분해서 동적으로 번역을 적용하기위한 Map 객체 생성
*/
export const resourcesMap = {
  [SERVICE_INFO.MOVE_ADMIN.serviceName]: moveAdminResources,
  [SERVICE_INFO.MOVE_IOT.serviceName]: moveIotResources,
  [SERVICE_INFO.MOVE_RANKING.serviceName]: moveRankingResources,
  [SERVICE_INFO.LOGISTICS_ADMIN.serviceName]: logisticsAdminResources,
  [SERVICE_INFO.CAR_ADMIN.serviceName]: carAdminResources,
  [SERVICE_INFO.CAR_INSPECTION.serviceName]: carInspectionResources,
  [SERVICE_INFO.ECOMMERCE_ADMIN.serviceName]: ecommerceAdminResources,
  [SERVICE_INFO.MEMBERSHIP_ADMIN.serviceName]: membershipAdminResources,
  common: resources,
};

i18n.use(initReactI18next).init({ resources, fallbackLng: "en" });
