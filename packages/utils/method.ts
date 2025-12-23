import type { Languages } from "@repo/types";

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
  value: number | string | undefined | null;
  pair: T;
  returnAsString: true;
}

export interface getValueFromKeyPairReturnTypeMappedPairProps<
  T extends Record<number | string, string>,
> {
  value: number | string | undefined | null;
  pair: T;
  returnAsString: false;
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
  returnAsString,
}:
  | getValueFromKeyPairReturnTypeStringProps<T>
  | getValueFromKeyPairReturnTypeMappedPairProps<T>) {
  if (value == null || value === undefined || !(value in pair))
    return undefined;

  return returnAsString ? pair[value] : (pair[value] as T[keyof T]);
}

export const getLiteralArrayFromKeyPair = <
  T extends Record<string | number, string>,
>(
  keyPair: T,
): `${Extract<keyof T, string | number>}`[] => {
  return Object.keys(keyPair) as `${Extract<keyof T, string | number>}`[];
};
