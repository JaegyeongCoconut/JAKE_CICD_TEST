import type { ServerCarInspectionItemStatus } from "~types";

export interface GetInspectionQueryModel {
  query: {
    brand: string;
    engineNo?: string;
    frameNo?: string;
    model?: string;
    nextCursor?: string;
  };
}

export interface UpdateInspectionDefaultInfoQueryModel {
  body: {
    code: string | null;
    usedCarStock: {
      color: string;
      fuel: string;
      mileage: number | null;
      transmission: string;
      year: number | null;
    };
  };
  inspectionId: string;
}

interface UpdateInspectionChecklistStatusBody {
  photos?: never;
  remark?: never;
  status: ServerCarInspectionItemStatus[keyof ServerCarInspectionItemStatus];
}

interface UpdateInspectionChecklistPhotosBody {
  photos: string[];
  remark?: never;
  status?: never;
}

interface UpdateInspectionChecklistRemarkBody {
  photos?: never;
  remark: string | null;
  status?: never;
}

export interface UpdateInspectionChecklistQueryModel {
  body:
    | UpdateInspectionChecklistStatusBody
    | UpdateInspectionChecklistPhotosBody
    | UpdateInspectionChecklistRemarkBody;
  inspectionId: string;
  itemNo: string;
}
