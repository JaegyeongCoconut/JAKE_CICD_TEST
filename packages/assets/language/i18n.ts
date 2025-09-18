import carAdminEn from "./files/carAdmin/carAdmin-en.json";
import carAdminLo from "./files/carAdmin/carAdmin-lo.json";
import carInspectionEn from "./files/carInspection/carInspection-en.json";
import carInspectionLo from "./files/carInspection/carInspection-lo.json";
import deliveryEn from "./files/delivery/delivery-en.json";
import deliveryLo from "./files/delivery/delivery-lo.json";
import kokkokAdminEn from "./files/kokkokAdmin/kokkokAdmin-en.json";
import kokkokAdminLo from "./files/kokkokAdmin/kokkokAdmin-lo.json";
import logisticsEn from "./files/logisticsAdmin/logisticsAdmin-en.json";
import logisticsLo from "./files/logisticsAdmin/logisticsAdmin-lo.json";
import adminEn from "./files/moveAdmin/moveAdmin-en.json";
import adminLo from "./files/moveAdmin/moveAdmin-lo.json";

export const fallbackLng = "en";

const combinedEn = {
  ...adminEn,
  ...logisticsEn,
  ...carAdminEn,
  ...carInspectionEn,
  ...kokkokAdminEn,
  ...deliveryEn,
};
const combinedLo = {
  ...adminLo,
  ...logisticsLo,
  ...carAdminLo,
  ...carInspectionLo,
  ...kokkokAdminLo,
  ...deliveryLo,
};

export const resources = {
  en: { translation: combinedEn },
  lo: { translation: combinedLo },
} as const;
