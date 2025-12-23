import { describe, expect, it } from "vitest";

import { replaceFirstTextZeroToEmpty } from "@packages/utils/formatter/string";

describe("string Test", () => {
  describe("replaceFirstTextZeroToEmpty Test", () => {
    describe("빈 문자열 반환 케이스", () => {
      it.each([
        { input: "" }, // DESC: 빈 문자열
        { input: "0" }, // DESC: 단일 '0'
        { input: " 0" }, // DESC: 선행 공백과 '0'
        { input: "0 " }, // DESC: 후행 공백과 '0'
        { input: " 0 " }, // DESC: 선행/후행 공백과 '0'
      ])("value=$input이면 빈 문자열을 반환.", ({ input }) => {
        // WHEN: 입력 값이 빈 문자열이거나, 공백을 제외하고 '0' 하나인 경우
        // THEN: 빈 문자열을 반환해야 함 (선행 '0' 제거 및 빈 값 처리)
        expect(replaceFirstTextZeroToEmpty(input)).toBe("");
      });
    });

    describe("중복된 0에 대한 케이스", () => {
      it.each([
        { input: "  00  ", expected: "0" }, // DESC: 공백 포함된 "00"
        { input: "00  ", expected: "0" }, // DESC: 후행 공백 포함된 "00"
        { input: "00", expected: "0" }, // DESC: "00"
        { input: "000", expected: "00" }, // DESC: "000"
      ])(
        "value=$input, 중복된 0에 대해서는 가장 앞의 0만 제외하고 $expected를 반환.",
        ({ input, expected }) => {
          // WHEN: 선행 '0'이 여러 개 연속되거나, 공백과 섞여 있는 경우
          // THEN: 가장 앞의 '0' 하나만 제거하고 나머지는 유지해야 함 (공백은 제거됨)
          expect(replaceFirstTextZeroToEmpty(input)).toBe(expected);
        },
      );
    });

    describe("문자열 사이 공백에 대한 케이스", () => {
      it.each([
        { input: "  0 0  ", expected: " 0" }, // DESC: 앞뒤 공백과 내부 공백이 섞인 '0 0'
        { input: "0 0  ", expected: " 0" }, // DESC: 후행 공백과 내부 공백이 섞인 '0 0'
        { input: "0 0", expected: " 0" }, // DESC: '0 0'
        { input: " 0 0 0 ", expected: " 0 0" }, // DESC: '0 0 0'
      ])(
        "value=$input, 사이의 공백을 포함하고 $expected를 반환.",
        ({ input, expected }) => {
          // WHEN: 선행 '0'이 포함되고 그 뒤에 공백과 다른 문자가 오는 경우
          // THEN: 가장 앞의 '0'만 제거하고, 문자열 내부 및 후행 공백은 그대로 유지해야 함
          expect(replaceFirstTextZeroToEmpty(input)).toBe(expected);
        },
      );
    });
  });
});
