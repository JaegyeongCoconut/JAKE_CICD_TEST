export type QueryFilterQueryKeys<T extends string> = Exclude<
  T,
  "page" | "pageSize"
>;
export type QueryFilterQueryKeyMatch<
  T extends Record<string, { queryKey: string }>,
> = {
  [K in keyof T]: T[K] & { queryKey: K };
};
