import type { TableHeaderInfo } from "@repo/types";

import { LANGUAGE_LABEL } from "~constants";
import type { CarInspectionLanguages } from "~types";

export const INSPECTION_TABLE_HEADER_INFOS: TableHeaderInfo<
  "frameEngineNumber" | "modelInformation",
  CarInspectionLanguages
> = [
  { key: "frameEngineNumber", label: LANGUAGE_LABEL.FRAME_ENGINE_NUMBER, columnWidth: "244px" },
  { key: "modelInformation", label: LANGUAGE_LABEL.MODEL_INFORMATION, columnWidth: ["434px", "auto"] },
];

export const INSPECTION_CHECKLIST_TABLE_HEADER_INFOS: TableHeaderInfo<
  "no" | "inspectionItem" | "result" | "remarks",
  CarInspectionLanguages
> = [
  { key: "no", label: LANGUAGE_LABEL.NO, columnWidth: "60px" },
  { key: "inspectionItem", label: LANGUAGE_LABEL.INSPECTION_ITEM, columnWidth: ["394px", "auto"] },
  { key: "result", label: LANGUAGE_LABEL.RESULT, columnWidth: "148px" },
  { key: "remarks", label: LANGUAGE_LABEL.REMARKS, columnWidth: "104px" },
];
