import { describe, expect, it } from "vitest";

import { fillCheckboxSVG } from "@packages/utils/fill";

describe("fillCheckboxSVG Test", () => {
  // GIVEN: 특정 헥스 코드(color)를 받아 해당 코드가 적용된 완전한 SVG Data URL 문자열을 생성하는 헬퍼 함수를 준비
  const returnSVGtext = (color: string): string =>
    `"data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='16' height='16' rx='2' fill='%23${color}' /%3E%3Cpath d='M6.83845 10.2335L12.8844 4.19208C13.1407 3.93597 13.5548 3.93597 13.8111 4.19208C14.0674 4.44818 14.0674 4.86189 13.8111 5.118L7.77163 11.1594L6.98959 11.9409C6.91073 12.0197 6.77273 12.0197 6.69387 11.9409L5.91183 11.1594L2.19222 7.44264C1.93593 7.18654 1.93593 6.77283 2.19222 6.51672C2.44852 6.26062 2.86254 6.26062 3.11884 6.51672L6.83845 10.2335Z' fill='white'/%3E%3C/svg%3E%0A"`;

  it.each([
    { color: "#000000", expected: returnSVGtext("000000") }, // DESC: 검은색
    { color: "#FFFFFF", expected: returnSVGtext("FFFFFF") }, // DESC: 흰색
    { color: "#FF0000", expected: returnSVGtext("FF0000") }, // DESC: 빨간색
    { color: "#0000FF", expected: returnSVGtext("0000FF") }, // DESC: 파란색
    { color: "#abcdef", expected: returnSVGtext("abcdef") }, // DESC: 혼합색
  ])(
    "정상적인 hexcode($color)이면 $expected를 반환.",
    ({ color, expected }) => {
      // WHEN: fillCheckboxSVG 함수에 유효한 헥스 코드를 입력
      // THEN: 헥스 코드가 삽입된 SVG Data URL이 기대값과 일치하는지 확인
      expect(fillCheckboxSVG(color)).toBe(expected);
    },
  );

  it.each(["red", "#123", "#12G45Z", "#1234567", " #123456 "])(
    "유효하지 않는 hexcode(%s)이면 에러를 발생함.",
    (input) => {
      // GIVEN: 유효하지 않은 입력값(input)
      // WHEN: fillCheckboxSVG 함수에 유효하지 않은 헥스 코드를 입력
      // THEN: 특정 에러 메시지를 포함하는 예외가 발생하는지 확인
      expect(() => fillCheckboxSVG(input)).toThrowError(
        "#이 포함된 6자리 Hex code를 파라미터로 전달 받아야 함.",
      );
    },
  );
});
