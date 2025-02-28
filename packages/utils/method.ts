import type { Languages } from "@repo/types";

export const keys = <T extends object>(object: T): (keyof T)[] =>
  Object.keys(object) as (keyof T)[];

export const findLookupTableLabel = <
  T extends { key: string | number; label: Languages },
>(
  list: ReadonlyArray<T>,
  key: T["key"],
): T["label"] | null => {
  const selectedData = list.filter((data) => data.key === key)[0];

  return selectedData ? selectedData.label : null;
};
