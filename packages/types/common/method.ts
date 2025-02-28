export type ReadonlyOverlappingArray<T> = ReadonlyArray<ReadonlyArray<T>>;

export type StringKeyOf<T> = Extract<keyof T, string>;

export type ValueOf<T> = T[keyof T];

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export type NumberToString<T extends number> = `${T}`;
