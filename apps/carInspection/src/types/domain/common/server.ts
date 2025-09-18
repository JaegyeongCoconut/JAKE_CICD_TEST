import type { PageInfoType } from "@repo/types";

export interface PageQuery {
  page?: string;
  pageSize?: string;
}

export interface ServerMaker {
  name: string;
  code: string;
}

export interface ServerModel {
  name: string;
  code: string;
  maker: string;
}

export type ServerBool = 0 | 1;

export interface ServerColorGroup {
  id: string;
  isMixed: ServerBool;
  hexcodes: string[];
  nameEn: string;
  nameLo: string;
}

export interface ServerColor {
  name?: string;
  code: string;
  colorGroup: ServerColorGroup;
  nameEn: string;
  nameLo: string;
}

export interface ServerTransmission {
  name: string;
  code: string;
}

export interface ServerFuel {
  name: string;
  code: string;
}

export interface ServerCarType {
  name: string;
  code: string;
}

export interface ServerCarInspectionItemStatus {
  BAD: "Bad";
  NORMAL: "Normal";
  PASS: "Pass";
}

export interface ServerCarInspectionItem {
  isVisible: number;
  no: number;
  photos: string[];
  remark: string | null;
  // NOTE: 임시로 null 추가, 서버 논의 완료 후 타입 변경 예정
  status:
    | ServerCarInspectionItemStatus[keyof ServerCarInspectionItemStatus]
    | null;
  title?: string;
  titleEn: string;
  titleLo: string;
}

export interface ServerCarInspection {
  adminId: string;
  engineChecklist: ServerCarInspectionItem[];
  enginePassed: number;
  exteriorChecklist: ServerCarInspectionItem[];
  exteriorPassed: number;
  interiorChecklist: ServerCarInspectionItem[];
  interiorPassed: number;
  underbodyChecklist: ServerCarInspectionItem[];
  underbodyPassed: number;
  usedCarStockId: string;
}

export interface GetMakersServerModel {
  makers: ServerMaker[];
  pageInfo: PageInfoType;
}

export interface GetColorsServerModel {
  colors: ServerColor[];
  pageInfo: PageInfoType;
}

export interface GetFuelTypesServerModel {
  fuelTypes: ServerFuel[];
  pageInfo: PageInfoType;
}

export interface GetTransmissionsServerModel {
  pageInfo: PageInfoType;
  transmissions: ServerTransmission[];
}
