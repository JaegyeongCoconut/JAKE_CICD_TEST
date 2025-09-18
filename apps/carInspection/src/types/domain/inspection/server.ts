import type {
  ServerCarInspection,
  ServerCarType,
  ServerColor,
  ServerFuel,
  ServerMaker,
  ServerTransmission,
} from "~types";

export interface InspectionItem {
  id: string;
  usedCarStock: {
    color: ServerColor;
    carType: ServerCarType;
    engineNo: string;
    frameNo: string;
    maker: ServerMaker;
    mileage: number;
    model: string;
    transmission: ServerTransmission;
    year: number;
  };
}

export interface GetInspectionServerModel {
  inspections: InspectionItem[];
  nextCursor: string;
}

export interface GetInspectionDetailServerModel {
  admin: { name: string } | null;
  code: string | null;
  completed: string | null;
  info: ServerCarInspection;
  usedCarStock: {
    color: ServerColor;
    carType: ServerCarType;
    engineNo: string;
    frameNo: string;
    fuel: ServerFuel;
    maker: ServerMaker;
    mileage: number;
    model: string;
    // NOTE: 서버 데이터 오류로 임시로 null
    transmission: ServerTransmission | null;
    year: number;
  };
}
