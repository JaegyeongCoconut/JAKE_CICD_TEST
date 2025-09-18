import type { RecursiveUndefined } from "@repo/types";

import type { INSPECTION_STATUS_KEY_PAIR } from "~constants";

interface InspectionClientItem {
  id: string;
  usedCarStock: {
    color: ClientColor;
    carType: { name: string; code: string };
    engineNo: string;
    frameNo: string;
    maker: { name: string; code: string };
    mileage: number;
    model: string;
    // NOTE: 서버 데이터 오류로 임시로 null
    transmission: { name: string; code: string } | null;
    year: number;
  };
}

export type GetInspectionDetailClientModel = RecursiveUndefined<{
  admin: { name: string } | null;
  code: string | null;
  completed: string | null;
  usedCarStock: InspectionClientItem["usedCarStock"] & {
    fuel: { name: string; code: string };
  };
}>;

export interface CarInspectionClientItem {
  isVisible: number;
  no: number;
  photos: string[];
  remark: string | null;
  // NOTE: 임시로 null 추가, 서버 논의 완료 후 타입 변경 예정
  status:
    | (typeof INSPECTION_STATUS_KEY_PAIR)[keyof typeof INSPECTION_STATUS_KEY_PAIR]
    | null;
  title?: string;
  titleEn: string;
  titleLo: string;
}

export type GetInspectionChecklistClientModel = RecursiveUndefined<{
  engineChecklist: CarInspectionClientItem[];
  exteriorChecklist: CarInspectionClientItem[];
  interiorChecklist: CarInspectionClientItem[];
  undersideChecklist: CarInspectionClientItem[];
}>;

interface ClientColorGroup {
  id: string;
  isMixed: 0 | 1;
  hexcodes: string[];
  nameEn: string;
  nameLo: string;
}

interface ClientColor {
  name?: string;
  code: string;
  colorGroup: ClientColorGroup;
  nameEn: string;
  nameLo: string;
}

export type GetInspectionsClientModel = RecursiveUndefined<{
  inspections: InspectionClientItem[];
  nextCursor: string;
}>;
