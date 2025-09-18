export type ReadonlyOverlappingArray<T> = ReadonlyArray<ReadonlyArray<T>>;

export type StringKeyOf<T> = Extract<keyof T, string>;

export type ValueOf<T> = T[keyof T];

export type ValueToKey<T, V extends ValueOf<T>> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type NumberToString<T extends number> = `${T}`;

export type TransformNumberKeysToStrings<T> = `${Extract<keyof T, number>}`;
