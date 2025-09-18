import type { FC, SVGProps } from "react";

import type { Languages } from "./language";

export interface RadioType<T extends string | number, U extends Languages> {
  key: T;
  Icon?: FC<SVGProps<SVGSVGElement>>;
  label: U;
}
