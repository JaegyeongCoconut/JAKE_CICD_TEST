import type { Languages } from "../../types/common/language";

export const LAOS_COUNTRY_DIAL = "856";

export const LAOS_MOBILE_PLACEHOLDER = "20XXXXXXXX" as Languages;

export const DEFAULT_COUNTRY_CODE_INFO = {
  code: "LA",
  name: "Laos" as const,
  dial: LAOS_COUNTRY_DIAL,
} as const;
