import type {
  ServerCarInspectionItem,
  ServerCarInspectionItemStatus,
} from "~types";

export interface FormInspectionDefaultInfo {
  color: string;
  carType: string;
  code: string | null;
  engineNo: string;
  frameNo: string;
  fuel: string;
  inspectedBy: string | null;
  inspectedDate: string | null;
  maker: string;
  mileage: string;
  model: string;
  transmission: string;
  year: string;
}

export interface FormInspectionChecklistItem
  extends Omit<ServerCarInspectionItem, "status" | "remark" | "photos"> {
  photos: (string | File)[];
  remark: string;
  status:
    | ServerCarInspectionItemStatus[keyof ServerCarInspectionItemStatus]
    | "";
}

export interface FormInspectionCheckItems {
  isCompleted: boolean;
  engineChecklist: FormInspectionChecklistItem[];
  engineCount: number;
  exteriorChecklist: FormInspectionChecklistItem[];
  exteriorCount: number;
  interiorChecklist: FormInspectionChecklistItem[];
  interiorCount: number;
  undersideChecklist: FormInspectionChecklistItem[];
  undersideCount: number;
}
