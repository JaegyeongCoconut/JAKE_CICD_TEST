import { describe, expect, it, test } from "vitest";

import {
  formatExceptSpacing,
  formatForCheckValidate,
} from "@packages/utils/formatter/format";

describe("format Test", () => {
  describe("formatExceptSpacing Test", () => {
    describe("빈 문자열 반환", () => {
      test("파라미터가 빈 문자열이라면 빈 문자를 반환.", () => {
        // WHEN: 빈 문자열("") 입력
        // THEN: 빈 문자열을 반환해야 함
        expect(formatExceptSpacing("")).toBe("");
      });

      test("파라미터가 공백만 있는 문자열이라면 빈 문자를 반환.", () => {
        // WHEN: 공백("    ")만 포함된 문자열 입력
        // THEN: 공백이 제거된 빈 문자열을 반환해야 함
        expect(formatExceptSpacing("    ")).toBe("");
      });
    });

    test("파라미터에 공백이 없다면 문자열을 그대로 반환.", () => {
      // WHEN: 공백이 없는 문자열 입력
      // THEN: 입력 문자열을 그대로 반환해야 함
      expect(formatExceptSpacing("문자열")).toBe("문자열");
    });

    describe("공백이 있는 문자열", () => {
      it.each([
        [" a b", "ab"], // 앞, 중간에 공백이 있는 경우
        [" a b c ", "abc"], // 앞, 중간, 뒤에 공백이 있는 경우
        [" a b cd ", "abcd"], // 띄어쓰기 패턴이 다른 경우
      ])("%s이면 공백을 제거하고 %s를 반환.", (input, expected) => {
        // WHEN: 일반 공백(" ")이 포함된 문자열 입력
        // THEN: 모든 일반 공백이 제거된 문자열을 반환해야 함
        expect(formatExceptSpacing(input)).toBe(expected);
      });
    });

    describe("제거되지 않는 케이스", () => {
      test("탭 문자는 제거하지 않음.", () => {
        // GIVEN: 탭 문자(\t) 포함
        // WHEN: formatExceptSpacing 호출
        // THEN: 일반 공백만 제거하고 탭 문자는 유지해야 함
        expect(formatExceptSpacing("a\tb c")).toBe("a\tbc");
      });

      test("개행 문자는 제거 안 함.", () => {
        // GIVEN: 개행 문자(\n) 포함
        // WHEN: formatExceptSpacing 호출
        // THEN: 일반 공백만 제거하고 개행 문자는 유지해야 함
        expect(formatExceptSpacing("a\nb c")).toBe("a\nbc");
      });
    });
  });

  describe("formatForCheckValidate Test", () => {
    describe("빈 배열 처리", () => {
      test("array가 빈 배열이면, 빈 배열을 반환함", () => {
        // GIVEN: 요소가 하나도 없는 array
        // WHEN: 빈 배열 입력
        const value = formatForCheckValidate({
          array: [],
          target: "label",
        });

        // THEN: 빈 배열을 반환해야 함
        expect(value).toEqual([]);
      });
    });

    describe("array 배열 내 중복된 값의 존재 여부에 따른 그룹화", () => {
      test("배열 내 target의 value에 중복이 있으면, 중복된 값들을 그룹화하여 [값, 인덱스 배열] 형태로 반환함", () => {
        // GIVEN: target(label)의 value에 중복이 있는 객체 배열
        const array = [
          { key: "01", label: "apple" },
          { key: "02", label: "banana" },
          { key: "03", label: "apple" },
          { key: "04", label: "cherry" },
          { key: "05", label: "banana" },
        ];

        // WHEN: formatForCheckValidate 호출
        const value = formatForCheckValidate({ array, target: "label" });

        // THEN: 중복된 label의 value는 그룹화되어 [값, 인덱스 배열] 형태로 반환되는지 확인
        expect(value).toEqual([
          ["apple", [0, 2]],
          ["banana", [1, 4]],
          ["cherry", [3]],
        ]);
      });

      test("배열 내 target의 value에 중복이 없으면, 각 값은 [값, 인덱스 배열] 형태로 반환함", () => {
        // GIVEN: target(label)의 value가 모두 고유한 객체 배열
        const array = [
          { key: "01", label: "apple" },
          { key: "02", label: "banana" },
          { key: "03", label: "cherry" },
        ];

        // WHEN: formatForCheckValidate 호출
        const value = formatForCheckValidate({ array, target: "label" });

        // THEN: 각 label의 value는 [값, 인덱스 배열] 형태로 반환되는지 확인
        expect(value).toEqual([
          ["apple", [0]],
          ["banana", [1]],
          ["cherry", [2]],
        ]);
      });

      test("target의 value는 고유하고 target 외 value가 중복되면, 각 값은 [값, 인덱스 배열] 형태로 반환함", () => {
        // GIVEN: target(label)의 value는 고유하고 다른 속성(key)은 중복되는 객체 배열
        const array = [
          { key: "01", label: "apple" },
          { key: "01", label: "banana" },
          { key: "01", label: "cherry" },
        ];

        // WHEN: formatForCheckValidate 호출
        const value = formatForCheckValidate({ array, target: "label" });

        // THEN: 각 label의 value는 [값, 인덱스 배열] 형태로 반환되는지 확인
        expect(value).toEqual([
          ["apple", [0]],
          ["banana", [1]],
          ["cherry", [2]],
        ]);
      });
    });

    describe("trim 처리", () => {
      test("target의 value가 앞뒤 공백을 포함하면, trim 처리 후 [값, 인덱스 배열] 형태로 반환함", () => {
        // GIVEN: target(label)의 value에 앞뒤 공백이 포함된 객체 배열
        const array = [
          { key: "01", label: " apple " },
          { key: "02", label: "apple" },
          { key: "03", label: "  banana  " },
        ];

        // WHEN: formatForCheckValidate 호출
        const value = formatForCheckValidate({ array, target: "label" });

        // THEN: trim 처리된 label의 value는 그룹화되어 [값, 인덱스 배열] 형태로 반환되는지 확인
        expect(value).toEqual([
          ["apple", [0, 1]],
          ["banana", [2]],
        ]);
      });

      test("target의 value에 공백만 포함된 값이 있으면, 해당 값은 그룹화에서 제외됨", () => {
        // GIVEN: target(label)의 value가 공백만으로 이루어진 객체 배열
        const array = [
          { key: "01", label: "   " },
          { key: "02", label: "apple" },
          { key: "03", label: "  " },
        ];

        // WHEN: formatForCheckValidate 호출
        const value = formatForCheckValidate({ array, target: "label" });

        // THEN: 공백만 있는 label의 value는 제외되고, 문자열인 값만 그룹화되어 [값, 인덱스 배열] 형태로 반환되는지 확인
        expect(value).toEqual([["apple", [1]]]);
      });

      test("target의 value가 빈 문자열이면, 해당 값은 그룹화에서 제외됨", () => {
        // GIVEN: target(label)의 value가 빈 문자열인 객체 배열
        const array = [
          { key: "01", label: "" },
          { key: "02", label: "apple" },
          { key: "03", label: "" },
        ];

        // WHEN: formatForCheckValidate 호출
        const value = formatForCheckValidate({ array, target: "label" });

        // THEN: 빈 문자열인 label의 value는 제외되고, 문자열인 값만 그룹화되어 [값, 인덱스 배열] 형태로 반환되는지 확인
        expect(value).toEqual([["apple", [1]]]);
      });
    });

    describe("문자열이 아닌 값 처리", () => {
      test("target의 value가 number 타입이면, 해당 값은 그룹화에서 제외됨", () => {
        // GIVEN: target(label)의 value가 number 타입인 객체 배열
        const array = [
          { key: "01", label: 123 },
          { key: "02", label: "apple" },
          { key: "03", label: 456 },
        ];

        // WHEN: formatForCheckValidate 호출
        const value = formatForCheckValidate({ array, target: "label" });

        // THEN: number 타입인 label의 value는 제외되고, 문자열인 값만 그룹화되어 [값, 인덱스 배열] 형태로 반환되는지 확인
        expect(value).toEqual([["apple", [1]]]);
      });

      test("target의 value가 boolean 타입이면, 해당 값은 그룹화에서 제외됨", () => {
        // GIVEN: target(label)의 value가 boolean 타입인 객체 배열
        const array = [
          { key: "01", label: true },
          { key: "02", label: "apple" },
          { key: "03", label: false },
        ];

        // WHEN: formatForCheckValidate 호출
        const value = formatForCheckValidate({
          array,
          target: "label",
        });

        // THEN: boolean 타입인 label의 value는 제외되고, 문자열인 값만 그룹화되어 [값, 인덱스 배열] 형태로 반환되는지 확인
        expect(value).toEqual([["apple", [1]]]);
      });

      test("target의 value가 null이면, 해당 값은 그룹화에서 제외됨", () => {
        // GIVEN: target(label)의 value가 null인 객체 배열
        const array = [
          { key: "01", label: null },
          { key: "02", label: "apple" },
          { key: "03", label: null },
        ];

        // WHEN: formatForCheckValidate 호출
        const value = formatForCheckValidate({ array, target: "label" });

        // THEN: null인 label의 value는 제외되고, 문자열인 값만 그룹화되어 [값, 인덱스 배열] 형태로 반환되는지 확인
        expect(value).toEqual([["apple", [1]]]);
      });

      test("target의 value가 undefined이면, 해당 값은 그룹화에서 제외됨", () => {
        // GIVEN: target(label)의 value가 undefined인 객체 배열
        const array = [
          { key: "01", label: undefined },
          { key: "02", label: "apple" },
          { key: "03", label: undefined },
        ];
        // WHEN: formatForCheckValidate 호출
        const value = formatForCheckValidate({ array, target: "label" });

        // THEN: undefined인 label의 value는 제외되고, 문자열인 값만 그룹화되어 [값, 인덱스 배열] 형태로 반환되는지 확인
        expect(value).toEqual([["apple", [1]]]);
      });

      test("target의 value가 객체 타입이면, 해당 값은 그룹화에서 제외됨", () => {
        // GIVEN: target(label)의 value가 객체 타입인 객체 배열
        const array = [
          { key: "01", label: { nested: "value" } },
          { key: "02", label: "apple" },
          { key: "03", label: [] },
        ];

        // WHEN: formatForCheckValidate 호출
        const value = formatForCheckValidate({ array, target: "label" });

        // THEN: 객체 타입인 label의 value는 제외되고, 문자열인 값만 그룹화되어 [값, 인덱스 배열] 형태로 반환되는지 확인
        expect(value).toEqual([["apple", [1]]]);
      });
    });

    describe("Complicated Type Test", () => {
      test("target의 value가 복합 타입이면, 문자열 값만 그룹화되어 [값, 인덱스 배열] 형태로 반환함", () => {
        // GIVEN: target(label)의 value에 문자열과 비문자열이 혼재된 객체 배열
        const array = [
          { key: "01", label: "apple" },
          { key: "02", label: 123 },
          { key: "03", label: " apple " },
          { key: "04", label: 123 },
          { key: "05", label: "banana" },
          { key: "06", label: null },
          { key: "07", label: "apple" },
        ];

        // WHEN: formatForCheckValidate 호출
        const value = formatForCheckValidate({ array, target: "label" });

        // THEN: 문자열인 label의 value만 그룹화되어 [값, 인덱스 배열] 형태로 반환되는지 확인
        expect(value).toEqual([
          ["apple", [0, 2, 6]],
          ["banana", [4]],
        ]);
      });
    });
  });
});
