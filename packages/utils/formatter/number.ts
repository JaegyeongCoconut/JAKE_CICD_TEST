import { comma } from "./currency";
import { replaceFirstTextZeroToEmpty } from "./string";

export const numericOnly = (str: string): string => {
  if (!str) return "";

  const regExp = /[^0-9]/g;

  return str.replace(regExp, "");
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
  // NOTE: 음수 부호가 있는지 판단
  const isNegative = /^\s*-/.test(value);
  // NOTE: 숫자와 . 이외의 문자를 제거
  let sanitizedValue = value.replace(/[^0-9.]/g, "");

  // NOTE: 소수점 기준으로 문자열 분리
  const parts = sanitizedValue.split(".");

  // NOTE: 정수부가 비어 있고(= ".xxx" 형태) 실제로 점으로 시작하면 0을 보강
  if (parts[0] === "" && sanitizedValue.startsWith(".")) {
    parts[0] = "0";
  }

  // NOTE: 소수점 앞에 00 과 같은 값이 들오면 제거할 수 있도록 조건 추가
  if (parts[0] !== "") {
    parts[0] = /^0+$/.test(parts[0]) ? "0" : parts[0].replace(/^0+(?=\d)/, "");
  }

  // NOTE: 소수점 앞의 숫자 부분에 3자리마다 쉼표 추가
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // NOTE: maxDecimalLength <=0 이면 음수 부호를 표기하여 return
  if (maxDecimalLength <= 0) {
    // 정수만 허용
    return (isNegative ? "-" : "") + parts[0];
  }

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

  return (isNegative ? "-" : "") + sanitizedValue;
};

export const formatDecimal = (value: number): number => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};
