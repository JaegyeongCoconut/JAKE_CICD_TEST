import type { FC, SVGProps } from "react";

import type { RecursiveUndefined } from "./api";

export type DispatchDriver = RecursiveUndefined<{
  id: string;
  countryCode: string;
  firstName: string;
  lastName: string;
  phone: string;
}>;

// NOTE: RecursiveUndefined 사용시 아이콘 FC<SVGProps<SVGSVGElement>> 내부 타입에 전부 undefined 타입 정의됨
export interface DispatchVehicleItem {
  id: string | undefined;
  content: string | undefined;
  icon: FC<SVGProps<SVGSVGElement>> | undefined;
  plateNo: string | null | undefined;
}

export type DispatchVehicle = DispatchVehicleItem | undefined;
