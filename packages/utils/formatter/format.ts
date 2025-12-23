export const formatExceptSpacing = (word: string): string =>
  word.split(" ").join("");

interface FormatForCheckValidateProps<
  T extends Record<string, unknown>,
  K extends keyof T & string,
> {
  array: T[];
  target: K;
}

export const formatForCheckValidate = <
  T extends Record<string, unknown>, //NOTE: 배열 내부에 어떤 값이 들어올지 알 수 없어 unknown 사용
  K extends keyof T & string,
>({
  array,
  target,
}: FormatForCheckValidateProps<T, K>): [string, number[]][] => {
  return array.reduce<[string, number[]][]>((acc, item, index) => {
    const targetValue = item[target];
    const formattedTargetValue =
      typeof targetValue === "string" ? targetValue.trim() : undefined;

    if (!formattedTargetValue) return acc;

    const existing = acc.find(([value]) => value === formattedTargetValue);

    if (existing) {
      existing[1].push(index);
    } else {
      acc.push([formattedTargetValue, [index]]);
    }

    return acc;
  }, []);
};
