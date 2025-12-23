import en from "@repo/assets/language/files/carInspection/en";
import lo from "@repo/assets/language/files/carInspection/lo";
import packagesEn from "@repo/assets/language/files/packages/en";
import packagesLo from "@repo/assets/language/files/packages/lo";

export const resources = {
  en: { translation: { ...packagesEn, ...en } },
  lo: { translation: { ...packagesLo, ...lo } },
};
