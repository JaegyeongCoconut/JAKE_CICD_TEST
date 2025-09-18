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

//TODO: Undefined 받아서 사용하는 공용 코드로 변경 필요 (리팩토링)
export const setCommaNotZeroFirstNumericOnly = (value: string): string =>
  comma(replaceFirstTextZeroToEmpty(numericOnly(value)));

// NOTE: 소수점 입력을 위한 함수
interface DecimalNumberType {
  value: string;
  maxDecimalLength: number;
}

export const decimalNumber = ({
  value,
  maxDecimalLength,
}: DecimalNumberType) => {
  // NOTE: 숫자와 . 이외의 문자를 제거
  let sanitizedValue = value.replace(/[^0-9.]/g, "");

  // NOTE: 소수점 기준으로 문자열 분리
  const parts = sanitizedValue.split(".");

  // NOTE: 소수점 앞의 숫자 부분에 3자리마다 쉼표 추가
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // NOTE: 소수점 최대 자리수 설정
  if (maxDecimalLength && parts.length > 1) {
    parts[1] = parts[1].slice(0, maxDecimalLength);
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
