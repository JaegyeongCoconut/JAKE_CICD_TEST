export const replaceFirstTextZeroToEmpty = (value: string): string => {
  const input = value.trim();
  const [firstValue, ...restValue] = input;

  if (firstValue === "0") {
    return restValue.join("");
  }

  return value;
};
