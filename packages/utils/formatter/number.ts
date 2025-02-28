import { comma } from "./currency";

export const numericOnly = (str: string): string => {
  if (!str) return "";

  const regExp = /[^0-9]/g;

  return str.replace(regExp, "");
};

export const replaceFirstTextZeroToEmpty = (value: string): string => {
  const [firstValue, ...restValue] = value;

  if (firstValue === "0") {
    return restValue.join() ?? "";
  }

  return value;
};

export const setCommaNotZeroFirstNumericOnly = (value: string): string =>
  comma(replaceFirstTextZeroToEmpty(numericOnly(value)));

// NOTE: 소수점 입력을 위한 함수
export const decimalNumber = (value: string) => {
  // NOTE: 숫자와 . 이외의 문자를 제거
  let sanitizedValue = value.replace(/[^0-9.]/g, "");

  // NOTE: 소수점 기준으로 문자열 분리
  const parts = sanitizedValue.split(".");

  // NOTE: 소수점 앞의 숫자 부분에 3자리마다 쉼표 추가
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // NOTE: 소수점 최대 두자리만 입력
  if (parts.length > 1) {
    parts[1] = parts[1].slice(0, 2);
  }

  // NOTE: 소수점이 여러 개 포함된 경우 처리
  if (parts.length > 2) {
    sanitizedValue = parts[0] + "." + parts.slice(1).join("");
  } else {
    sanitizedValue = parts.join(".");
  }

  return sanitizedValue;
};

export const formatDecimal = (value: number): number => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

export const removeLeadingZero = (input: string): string => {
  if (/^0+$/.test(input)) {
    return "0";
  }

  if (input.length > 1 && input[0] === "0" && /^[1-9]/.test(input[1])) {
    return input.slice(1);
  }

  return input;
};

export const normalizeNumberInput = (
  allowNegative: boolean,
  input: string,
): string => {
  const removeNonNumericAndDash = input.replace(/[^-\d]/g, "");

  const removeNonLeadingDash = (value: string): string =>
    value.replace(/(?!^)-/g, "");

  const isNegativeZero = (value: string): boolean => value.startsWith("-0");

  const removeInvalidLeadingZero = (value: string): string =>
    value.length > 1 && value[0] === "0" && value[1] !== "0"
      ? value.slice(1)
      : value;

  const isDoubleZero = (value: string): boolean => value.startsWith("00");

  const normalizedInput = allowNegative
    ? removeNonLeadingDash(removeNonNumericAndDash)
    : removeNonNumericAndDash.replace(/-/g, "");

  if (isNegativeZero(normalizedInput)) {
    return "-";
  }

  const removeLeadingZeroIfNecessary =
    removeInvalidLeadingZero(normalizedInput);

  if (isDoubleZero(removeLeadingZeroIfNecessary)) {
    return "0";
  }

  return removeLeadingZeroIfNecessary;
};
