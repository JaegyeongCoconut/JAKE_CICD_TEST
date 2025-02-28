import type { Languages } from "./language";

export interface DropdownOptionType<T extends Languages> {
  key: string;
  label: T;
}

export interface DropdownUtiltyType<
  T extends readonly { key: string; label: Languages }[],
> {
  key: T[number]["key"] | "";
  label: T[number]["label"] | "";
}
