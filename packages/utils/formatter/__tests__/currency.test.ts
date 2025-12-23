import { describe, expect, it, test } from "vitest";

import {
  comma,
  commaWithCurrencyUnit,
  commaWithUnit,
  removeComma,
} from "@packages/utils/formatter/currency";

describe("currency Test", () => {
  describe("comma Test", () => {
    describe("빈 문자열 반환 케이스", () => {
      it.each([
        { description: "빈 문자열을 전달하면", str: "", expected: "" },
        {
          description: "공백만 들어간 문자열을 전달하면",
          str: "      ",
          expected: "",
        },
        { description: "null을 전달하면", str: null, expected: "" },
        { description: "undefined을 전달하면", str: undefined, expected: "" },
      ])("$description, 빈 문자열을 반환.", ({ str, expected }) => {
        // WHEN: 유효하지 않거나 빈 값(null, undefined, 공백) 입력
        // THEN: 빈 문자열을 반환해야 함
        expect(comma(str)).toBe(expected);
      });
    });

    test("number 타입을 string 타입으로 변환하여 반환.", () => {
      // GIVEN: 숫자 타입 0
      // WHEN: comma 함수 호출
      const result = comma(0);

      // THEN: 결과 타입이 문자열이고, 값은 "0"이어야 함
      expect(result).toBeTypeOf("string");
      expect(result).toBe("0");
    });

    test("양쪽 공백이 들어간 경우, 공백을 제거하고 반환.", () => {
      // WHEN: 양쪽 공백이 포함된 문자열 입력
      // THEN: 공백이 제거되고 콤마가 추가된 문자열을 반환해야 함
      expect(comma(" 100000 ")).toBe("100,000");
    });

    describe("콤마(,) 케이스", () => {
      it.each([
        { str: 100, expected: "100" }, // DESC: 1,000 미만
        { str: "1000", expected: "1,000" }, // DESC: 1,000
        { str: "a1000", expected: "a1,000" }, // DESC: 숫자가 아닌 문자가 포함된 경우
        { str: "100000", expected: "100,000" }, // DESC: 10만 단위
        { str: "1000000", expected: "1,000,000" }, // DESC: 100만 단위
        { str: "-1000000", expected: "-1,000,000" }, // DESC: 음수
        { str: "1000000.123", expected: "1,000,000.123" }, // DESC: 소수점 포함
      ])("$str이면 $expected를 반환.", ({ str, expected }) => {
        // WHEN: 콤마 포맷팅이 필요한 값 입력
        // THEN: 콤마가 올바르게 추가된 문자열을 반환해야 함
        expect(comma(str)).toBe(expected);
      });
    });
  });

  describe("removeComma Test", () => {
    describe("빈 문자열 반환 케이스", () => {
      it.each([
        { description: "빈 문자열을 전달하면", str: "", expected: "" },
        {
          description: "공백만 들어간 문자열을 전달하면",
          str: "      ",
          expected: "",
        },
        { description: "null을 전달하면", str: null, expected: "" },
        { description: "undefined을 전달하면", str: undefined, expected: "" },
      ])("$description, 빈 문자열을 반환.", ({ str, expected }) => {
        // WHEN: 유효하지 않거나 빈 값(null, undefined, 공백) 입력
        // THEN: 빈 문자열을 반환해야 함
        expect(removeComma(str)).toBe(expected);
      });
    });

    test("number 타입을 string 타입으로 변환하여 반환.", () => {
      // GIVEN: 숫자 타입 0
      // WHEN: removeComma 함수 호출
      const result = removeComma(0);

      // THEN: 결과 타입이 문자열이고, 값은 "0"이어야 함
      expect(result).toBeTypeOf("string");
      expect(result).toBe("0");
    });

    test("양쪽 공백이 들어간 경우, 공백을 제거하고 반환.", () => {
      // WHEN: 양쪽 공백이 포함된 문자열 입력
      // THEN: 공백이 제거되고 콤마도 제거된 문자열을 반환해야 함
      expect(removeComma(" 100,000 ")).toBe("100000");
    });

    describe("콤마가 제거된 케이스", () => {
      it.each([
        { str: 100, expected: "100" }, // DESC: 콤마가 없는 숫자
        { str: "1,000", expected: "1000" }, // DESC: 콤마 하나
        { str: "a1,000", expected: "a1000" }, // DESC: 숫자가 아닌 문자가 포함된 경우
        { str: "100,000", expected: "100000" }, // DESC: 콤마 두 개
        { str: "1,000,000", expected: "1000000" }, // DESC: 콤마 세 개
        { str: "-1,000,000", expected: "-1000000" }, // DESC: 음수
        { str: "1,000,000.123", expected: "1000000.123" }, // DESC: 소수점 포함
      ])("$str이면 $expected를 반환.", ({ str, expected }) => {
        // WHEN: 콤마 제거가 필요한 값 입력
        // THEN: 모든 콤마가 제거된 문자열을 반환해야 함
        expect(removeComma(str)).toBe(expected);
      });
    });
  });

  describe("commaWithUnit Test", () => {
    describe("빈 문자열 반환 케이스", () => {
      it.each([
        { description: "빈 문자열을 전달하면", value: "", expected: "" },
        {
          description: "공백만 들어간 문자열을 전달하면",
          value: "      ",
          expected: "",
        },
        { description: "null을 전달하면", value: null, expected: "" },
        { description: "undefined을 전달하면", value: undefined, expected: "" },
      ])("$description, 빈 문자열을 반환.", ({ value, expected }) => {
        // WHEN: 유효하지 않거나 빈 값(null, undefined, 공백) 입력
        // THEN: 단위와 관계없이 빈 문자열을 반환해야 함
        expect(commaWithUnit({ value, unit: "KM" })).toBe(expected);
      });
    });

    test("number 타입을 string 타입으로 변환하여 반환.", () => {
      // GIVEN: 숫자 타입 100
      // WHEN: commaWithUnit 함수 호출
      const result = commaWithUnit({ value: 100, unit: "KM" });

      // THEN: 결과 타입이 문자열이고, 값은 "100 KM"이어야 함
      expect(result).toBeTypeOf("string");
      expect(result).toBe("100 KM");
    });

    describe("유닛 반환 케이스", () => {
      it.each([
        { unit: "km" },
        { unit: "kg" },
        { unit: "cc" },
        { unit: "mm" },
        { unit: "ps(kw)/rpm" },
        { unit: "kWh" },
        { unit: "kgm(NM)/rpm" },
        { unit: "km/L" },
        { unit: "km/h" },
        { unit: "KM" },
        { unit: "KW" },
      ] as const)("unit=$unit이라면 value+공백+$unit을 반환.", ({ unit }) => {
        // WHEN: 값과 다양한 일반 단위 조합 입력
        // THEN: "100 {unit}" 형식의 문자열을 반환해야 함
        expect(commaWithUnit({ value: "100", unit })).toBe(`100 ${unit}`);
      });
    });

    test("양쪽 공백이 들어간 경우, 공백을 제거하고 반환.", () => {
      // WHEN: 양쪽 공백이 포함된 문자열 입력
      // THEN: 공백이 제거되고 콤마와 단위가 올바르게 추가된 문자열을 반환해야 함
      expect(commaWithUnit({ value: " 100000 ", unit: "KM" })).toBe(
        "100,000 KM",
      );
    });
  });

  describe("commaWithCurrencyUnit", () => {
    describe("unit+공백+0 반환 케이스", () => {
      it.each([
        { price: undefined, unit: "฿" as const },
        { price: null, unit: "$" as const },
        { price: "", unit: "₭" as const },
        { price: "   ", unit: "P" as const },
      ])(
        "price: %j, unit: %s 조합에서 '${unit} 0'을 반환합니다",
        ({ price, unit }) => {
          // WHEN: 유효하지 않거나 빈 값(null, undefined, 공백) 입력
          // THEN: '{unit} 0' 형식의 문자열을 반환해야 함 (빈 값이면 0으로 처리)
          expect(
            commaWithCurrencyUnit({
              price,
              currencyUnit: unit,
              showPlusSign: false,
            }),
          ).toBe(`${unit} 0`);
        },
      );
    });

    describe("양수에서 showPlusSign=false", () => {
      it.each([
        { price: 0, unit: "฿" as const, expected: "฿ 0" },
        { price: 1, unit: "$" as const, expected: "$ 1" },
        { price: 1000, unit: "₭" as const, expected: "₭ 1,000" },
        { price: "2000", unit: "P" as const, expected: "P 2,000" },
        { price: " 3456 ", unit: "฿" as const, expected: "฿ 3,456" },
      ])(
        "price=$price이고 unit=$unit이면, $expected 조합을 반환.",
        ({ price, unit, expected }) => {
          // WHEN: 양수/0 값, showPlusSign=false
          // THEN: '통화단위 콤마값' 형식의 문자열을 반환해야 함
          expect(
            commaWithCurrencyUnit({
              price,
              currencyUnit: unit,
              showPlusSign: false,
            }),
          ).toBe(expected);
        },
      );
    });

    describe("양수에서 showPlusSign=true이면 '+ 통화단위 콤마값'을 반환합니다", () => {
      it.each([
        { price: 0, unit: "฿" as const, expected: "+ ฿ 0" },
        { price: 1, unit: "$" as const, expected: "+ $ 1" },
        { price: 1234567, unit: "₭" as const, expected: "+ ₭ 1,234,567" },
        { price: "7890", unit: "P" as const, expected: "+ P 7,890" },
      ])(
        "price=$price이고 unit=$unit이면, $expected 조합을 반환.",
        ({ price, unit, expected }) => {
          // WHEN: 양수/0 값, showPlusSign=true
          // THEN: '+ 통화단위 콤마값' 형식의 문자열을 반환해야 함 (0도 +로 표시)
          expect(
            commaWithCurrencyUnit({
              price,
              currencyUnit: unit,
              showPlusSign: true,
            }),
          ).toBe(expected);
        },
      );
    });

    describe("음수 케이스", () => {
      it.each([
        { price: -1, unit: "฿" as const, expected: "- ฿ 1" },
        { price: -1000, unit: "$" as const, expected: "- $ 1,000" },
        { price: -1234567, unit: "₭" as const, expected: "- ₭ 1,234,567" },
        { price: "  -3456  ", unit: "P" as const, expected: "- P 3,456" },
      ])(
        "price=$price이고 unit=$unit이면, $expected 조합을 반환.",
        ({ price, unit, expected }) => {
          // WHEN: 음수 값 입력
          // THEN: '- 통화단위 콤마값 (절댓값)' 형식의 문자열을 반환해야 함 (부호는 통화 단위 앞에 위치)
          expect(
            commaWithCurrencyUnit({
              price,
              currencyUnit: unit,
              showPlusSign: true,
            }),
          ).toBe(expected);
        },
      );
    });

    describe("소수점 케이스", () => {
      it.each([
        {
          price: 1234.56,
          unit: "฿" as const,
          sign: false,
          expected: "฿ 1,234.56",
        },
        {
          price: "-9876.5",
          unit: "$" as const,
          sign: true,
          expected: "- $ 9,876.5",
        },
        {
          price: "1000000.01",
          unit: "₭" as const,
          sign: false,
          expected: "₭ 1,000,000.01",
        },
      ])(
        "price=$price, showPlusSign=$sign unit=$unit이면, $expected 조합을 반환.",
        ({ price, unit, sign, expected }) => {
          // WHEN: 소수점이 포함된 값 입력
          // THEN: 콤마와 소수점이 모두 올바르게 포맷팅된 문자열을 반환해야 함
          expect(
            commaWithCurrencyUnit({
              price,
              currencyUnit: unit,
              showPlusSign: sign,
            }),
          ).toBe(expected);
        },
      );
    });

    describe("trim 케이스", () => {
      it.each([
        {
          price: " 1000 ",
          unit: "฿" as const,
          sign: false,
          expected: "฿ 1,000",
        },
        { price: "   0   ", unit: "$" as const, sign: true, expected: "+ $ 0" },
        {
          price: "  -2000   ",
          unit: "P" as const,
          sign: true,
          expected: "- P 2,000",
        },
      ])(
        "price=$price, showPlusSign=$sign unit=$unit이면, $expected 조합을 반환.",
        ({ price, unit, sign, expected }) => {
          // WHEN: 양쪽 공백이 포함된 문자열 입력
          // THEN: 공백이 제거되고 통화 단위와 콤마, 부호가 올바르게 적용된 문자열을 반환해야 함
          expect(
            commaWithCurrencyUnit({
              price,
              currencyUnit: unit,
              showPlusSign: sign,
            }),
          ).toBe(expected);
        },
      );
    });
  });
});
