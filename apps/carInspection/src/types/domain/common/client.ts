import type { PageInfoType, RecursiveUndefined } from "@repo/types";

export type GetMakersClientModel = RecursiveUndefined<{
  makers: { name: string; code: string }[];
  pageInfo: PageInfoType;
}>;

export type GetColorsClientModel = RecursiveUndefined<{
  // NOTE: Inspection은 lo만 사용하지만 개발 편의를 위해 추가
  colors: { code: string; en: string; lo: string }[];
  pageInfo: PageInfoType;
}>;

export type GetFuelTypesClientModel = RecursiveUndefined<{
  fuelTypes: { name: string; code: string }[];
  pageInfo: PageInfoType;
}>;

export type GetTransmissionsClientModel = RecursiveUndefined<{
  pageInfo: PageInfoType;
  transmissions: { name: string; code: string }[];
}>;
