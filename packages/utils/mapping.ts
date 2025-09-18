import type { RecursiveUndefined } from "@repo/types";

type CodeNameOptionsType = RecursiveUndefined<
  { name: string; code: string | number }[]
>;
type IdNameOptionsType = RecursiveUndefined<
  { id: string | number; name: string }[]
>;
type KeyNameOptionsType = RecursiveUndefined<
  { key: string | number; name: string }[]
>;
type KeyLabelOptionsType = RecursiveUndefined<
  { key: string | number; label: string }[]
>;

export const mappingToKeyLabelSelects = <T extends string>(
  selects:
    | CodeNameOptionsType
    | IdNameOptionsType
    | KeyNameOptionsType
    | KeyLabelOptionsType
    | undefined,
): { key: string; label: T }[] => {
  if (!selects) return [{ key: "", label: "" as T }];

  return selects.flatMap((item) => {
    if (!item) return [];

    const key = "code" in item ? item.code : "id" in item ? item.id : item.key;
    const label = ("label" in item ? item.label : item.name) as T;

    return key !== null && key !== undefined ? [{ key: `${key}`, label }] : [];
  });
};
