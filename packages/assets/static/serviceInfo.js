// LINK: local port https://www.notion.so/coconutsilo/33f1bb1811c8423aad1143d91de58d58
export const SERVICE_INFO = {
  MOVE_ADMIN: Object.freeze({
    cookieKey: "KKE_ADMIN",
    i18nKey: "moveAdmin",
    needSystemAlert: true,
    objectName: "MOVE_ADMIN",
    packageName: "kokkok-move-admin",
    port: 3030,
    refreshTokenUrlSuffix: "/auth/tokens",
    serviceName: "moveAdmin",
  }),
  MOVE_IOT: Object.freeze({
    cookieKey: "KOKKOK_IoT",
    i18nKey: null, // NOTE: i18n 불요하여, null 처리
    needSystemAlert: false,
    objectName: "MOVE_IOT",
    packageName: "kokkok-move-iot",
    port: 3033,
    refreshTokenUrlSuffix: "/iot/tokens",
    serviceName: "moveIot",
  }),
  MOVE_RANKING: Object.freeze({
    cookieKey: "",
    i18nKey: null, // NOTE: i18n 불요하여, null 처리
    needSystemAlert: true,
    objectName: "MOVE_RANKING",
    packageName: "kokkok-move-ranking",
    port: 3034,
    refreshTokenUrlSuffix: "",
    serviceName: "moveRanking",
  }),
  LOGISTICS_ADMIN: Object.freeze({
    cookieKey: "KOKKOK_LOGISTICS",
    i18nKey: "logisticsAdmin",
    needSystemAlert: false,
    objectName: "LOGISTICS_ADMIN",
    packageName: "kokkok-logistics-admin",
    port: 3032,
    refreshTokenUrlSuffix: "/auth/tokens",
    serviceName: "logisticsAdmin",
  }),
  CAR_ADMIN: Object.freeze({
    cookieKey: "KOKKOK_CAR_ADMIN",
    i18nKey: "carAdmin",
    needSystemAlert: false,
    objectName: "CAR_ADMIN",
    packageName: "kokkok-car-admin",
    port: 3035,
    refreshTokenUrlSuffix: "/auth/tokens",
    serviceName: "carAdmin",
  }),
  CAR_INSPECTION: Object.freeze({
    cookieKey: "KOKKOK_CAR_INSPECTION",
    i18nKey: null, // NOTE: i18n 불요하여, null 처리
    needSystemAlert: false,
    objectName: "CAR_INSPECTION",
    packageName: "kokkok-car-inspection",
    port: 3036,
    refreshTokenUrlSuffix: "/auth/tokens",
    serviceName: "carInspection",
  }),
  KOKKOK_ADMIN: Object.freeze({
    cookieKey: "KOKKOK_ADMIN",
    i18nKey: "kokkokAdmin",
    needSystemAlert: true,
    objectName: "KOKKOK_ADMIN",
    packageName: "kokkok-admin",
    port: 3038,
    refreshTokenUrlSuffix: "/auth/tokens",
    serviceName: "kokkokAdmin",
  }),
  DELIVERY: Object.freeze({
    cookieKey: "KOKKOK_DELIVERY",
    i18nKey: "delivery",
    needSystemAlert: true,
    objectName: "DELIVERY",
    packageName: "kokkok-delivery",
    port: 3039,
    refreshTokenUrlSuffix: "/auth/tokens",
    serviceName: "delivery",
  }),
};

export const SERVICE_NAMES = Object.values(SERVICE_INFO).map(
  (service) => service.serviceName,
);
