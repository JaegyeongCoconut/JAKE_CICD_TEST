import type { Languages } from "./language";

export interface TabType<T extends Languages> {
  key: string;
  label: T;
}
