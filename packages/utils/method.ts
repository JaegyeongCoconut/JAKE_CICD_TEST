import type { Languages } from "@repo/types";

export const keys = <T extends object>(object: T): (keyof T)[] =>
  Object.keys(object) as (keyof T)[];

interface FindLookupTableLabelProps<
  T extends { key: string | number; label: Languages },
> {
  key: string | number | undefined | null;
  list: ReadonlyArray<T>;
}

export const findLookupTableLabel = <
  T extends { key: string | number; label: Languages },
>({
  list,
  key,
}: FindLookupTableLabelProps<T>): T["label"] | null => {
  if (key === undefined || key === null) return null;

  const selected = list.find((data) => data.key === key);

  return selected ? selected.label : null;
};

export interface getValueFromKeyPairReturnTypeStringProps<
  T extends Record<number | string, string>,
> {
  hasReturnTypeString: true;
  value: number | string | undefined | null;
  pair: T;
}

export interface getValueFromKeyPairReturnTypeMappedPairProps<
  T extends Record<number | string, string>,
> {
  hasReturnTypeString: false;
  value: number | string | undefined | null;
  pair: T;
}

export function getValueFromKeyPair<T extends Record<number | string, string>>(
  props: getValueFromKeyPairReturnTypeStringProps<T>,
): string | undefined;

export function getValueFromKeyPair<T extends Record<number | string, string>>(
  props: getValueFromKeyPairReturnTypeMappedPairProps<T>,
): T[keyof T] | undefined;

export function getValueFromKeyPair<T extends Record<number | string, string>>({
  pair,
  value,
  hasReturnTypeString,
}:
  | getValueFromKeyPairReturnTypeStringProps<T>
  | getValueFromKeyPairReturnTypeMappedPairProps<T>) {
  if (value == null || value === undefined || !(value in pair))
    return undefined;

  return hasReturnTypeString ? pair[value] : (pair[value] as T[keyof T]);
}
