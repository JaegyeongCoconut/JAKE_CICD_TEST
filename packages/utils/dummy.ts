interface CreateDummyArray<T> {
  data: T;
  count: number;
  excludeKeys?: string[];
}

export const createDummyArray = <T extends { [key: string]: string | number }>({
  data,
  count,
  excludeKeys,
}: CreateDummyArray<T>): T[] =>
  Array.from({ length: count }).map<T>((_, index) =>
    Object.entries(data).reduce<T>(
      (acc, [key, value]) => ({
        ...acc,
        [key]: excludeKeys?.includes(key) ? value : `${value} ${index + 1}`,
      }),
      {} as T,
    ),
  );
