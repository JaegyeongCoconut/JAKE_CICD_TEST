interface FindKeyPairProps<T extends Record<number, string>> {
  value: string | undefined | null;
  pair: T;
}

export const findKeyPair = <T extends Record<number, string>>({
  pair,
  value,
}: FindKeyPairProps<T>): keyof T | null => {
  if (!value) return null;

  const findKey = Object.keys(pair).find((key) => pair[+key] === value);

  return findKey ? +findKey : null;
};
