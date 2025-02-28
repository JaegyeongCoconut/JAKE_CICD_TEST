import { Languages } from "./language";

export interface RadioType<T extends string | number, U extends Languages> {
  key: T;
  label: U;
}
