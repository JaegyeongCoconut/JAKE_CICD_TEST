import { describe, expect, it, test } from "vitest";

import {
  decimalNumber,
  formatDecimal,
  numericOnly,
  setCommaNotZeroFirstNumericOnly,
} from "@packages/utils/formatter/number";

describe("number Test", () => {
  describe("numericOnly Test", () => {
    describe("빈 문자열이 반환되는 테스트", () => {
      test("파라미터로 빈 문자열이 전달되면 빈 문자열을 반환.", () => {
        // WHEN: 빈 문자열("") 입력
        // THEN: 빈 문자열을 반환해야 함
        expect(numericOnly("")).toBe("");
      });

      it.each(["  ", "!", "!@#$", "가나다라", "abced"])(
        "'%s'이면, 빈 문자열을 반환.",
        (input) => {
          // WHEN: 숫자가 전혀 없는 문자열 (공백, 특수문자, 문자) 입력
          // THEN: 빈 문자열을 반환해야 함
          expect(numericOnly(input)).toBe("");
        },
      );
    });

    describe("숫자가 반환되는 테스트", () => {
      test("숫자만 있으면 그대로 반환.", () => {
        // WHEN: 숫자만 포함된 문자열 입력
        // THEN: 문자열을 그대로 반환해야 함
        expect(numericOnly("0123456789")).toBe("0123456789");
      });

      it.each([
        ["1,234", "1234"], // DESC: 콤마 구분자
        ["1 234 567", "1234567"], // DESC: 공백 구분자
        ["010-1234-5678", "01012345678"], // DESC: 하이픈 구분자
        ["+82 10 1234 5678", "821012345678"], // DESC: + 기호 및 공백
      ])("구분자가 있는 value=%s이면, %s를 반환.", (input, expected) => {
        // WHEN: 다양한 구분자가 포함된 숫자 문자열 입력
        // THEN: 모든 구분자가 제거된 숫자 문자열을 반환해야 함
        expect(numericOnly(input)).toBe(expected);
      });

      it.each([
        ["   0", "0"],
        [" ! 0", "0"],
        [" ! 0 2", "02"],
        [" ! 0 2 @#", "02"],
        [" !0@2#", "02"],
      ])("공백이 있는 value=%s이면, %s을 반환.", (value, expected) => {
        // WHEN: 공백 및 특수문자가 섞인 숫자 문자열 입력
        // THEN: 숫자만 추출하여 반환해야 함
        expect(numericOnly(value)).toBe(expected);
      });

      it.each([
        ["\t0\n1\r2", "012"], // DESC: 탭, 개행, 캐리지 리턴 문자
        ["\u00A0\u200B0\u20091", "01"], // DESC: 다양한 유니코드 공백 문자
      ])("개행이나 탭이 있는 value=%s이면, %s을 반환.", (input, expected) => {
        // WHEN: 탭, 개행 등 비가시 문자가 섞인 숫자 문자열 입력
        // THEN: 숫자만 추출하여 반환해야 함 (비가시 문자도 제거됨)
        expect(numericOnly(input)).toBe(expected);
      });
    });
  });

  describe("setCommaNotZeroFirstNumericOnly Test", () => {
    describe("빈 문자열이 반환되는 테스트", () => {
      test("단일 '0'만 입력되면 빈 문자열을 반환.", () => {
        // WHEN: 단일 '0' 입력
        // THEN: 선행 0 처리에 의해 빈 문자열을 반환해야 함
        expect(setCommaNotZeroFirstNumericOnly("0")).toBe("");
      });

      test("파라미터로 빈 문자열이 전달되면 빈 문자열을 반환.", () => {
        // WHEN: 빈 문자열("") 입력
        // THEN: 빈 문자열을 반환해야 함
        expect(setCommaNotZeroFirstNumericOnly("")).toBe("");
      });

      it.each(["  ", "!", "!@#$", "가나다라", "abced"])(
        "'%s'이면, 빈 문자열을 반환.",
        (input) => {
          // WHEN: 숫자가 전혀 없는 문자열 (공백, 특수문자, 문자) 입력
          // THEN: 빈 문자열을 반환해야 함
          expect(setCommaNotZeroFirstNumericOnly(input)).toBe("");
        },
      );
    });

    describe("콤마(,)가 없는 테스트", () => {
      it.each([
        [" 100", "100"], // DESC: 공백 제거
        [" !100", "100"], // DESC: 특수 문자 제거
        [" 1! 00", "100"], // DESC: 공백 및 특수 문자 제거
        [" 10 !0", "100"],
        [" 100 !", "100"],
      ])("'%s'이면, %s를 반환.", (input, expected) => {
        // WHEN: 콤마가 필요 없는 3자리 이하 숫자 입력
        // THEN: 특수 문자/공백이 제거된 숫자 문자열을 반환해야 함
        expect(setCommaNotZeroFirstNumericOnly(input)).toBe(expected);
      });

      test("음수 부호를 넣어도 양수로 처리됨.", () => {
        // WHEN: 음수 부호(-) 포함
        // THEN: 음수 부호가 제거되고 양수로 처리된 숫자 문자열을 반환해야 함
        expect(setCommaNotZeroFirstNumericOnly("-100")).toBe("100");
      });
    });

    describe("콤마(,)가 있는 테스트", () => {
      it.each([
        [" 1000", "1,000"],
        [" !1000", "1,000"],
        [" 1! 00   0", "1,000"],
        [" 10 !0 @0", "1,000"],
        [" 100 !0 !!%#", "1,000"],
        [" 100000", "100,000"],
      ])("( 콤마(,)가 하나 있는 )'%s'이면, %s를 반환.", (input, expected) => {
        // WHEN: 콤마 포맷팅이 필요한 4~6자리 숫자 입력
        // THEN: 특수 문자/공백이 제거되고 콤마가 올바르게 추가된 문자열을 반환해야 함
        expect(setCommaNotZeroFirstNumericOnly(input)).toBe(expected);
      });

      it.each([
        [" 1000000000", "1,000,000,000"],
        [" 100000000000", "100,000,000,000"],
        [" 1! 00   0 000", "1,000,000"],
        [" 10 !0 @0 !#% 00 $#0", "1,000,000"],
      ])(
        "( 콤마(,)가 여러 개 있는 )'%s'이면, %s를 반환.",
        (input, expected) => {
          // WHEN: 콤마 포맷팅이 필요한 큰 숫자 입력
          // THEN: 특수 문자/공백이 제거되고 콤마가 올바르게 추가된 문자열을 반환해야 함
          expect(setCommaNotZeroFirstNumericOnly(input)).toBe(expected);
        },
      );
    });

    test("콤마가 섞인 입력도 재포맷됨.", () => {
      // GIVEN: 잘못된 위치에 콤마가 포함된 문자열
      // WHEN: setCommaNotZeroFirstNumericOnly 호출
      // THEN: 모든 콤마를 제거한 후 3자리마다 콤마를 다시 추가하여 반환해야 함
      expect(setCommaNotZeroFirstNumericOnly("1,0,0,0")).toBe("1,000");
    });
  });

  describe("formatDecimal Test", () => {
    describe("양수일 경우,", () => {
      describe("소수점 둘째자리 반올림", () => {
        it.each([
          [1.234, 1.23], // DESC: 셋째 자리 4에서 내림
          [1.235, 1.24], // DESC: 셋째 자리 5에서 올림
          [123.456, 123.46], // DESC: 큰 수의 올림
          [10, 10], // DESC: 정수 그대로 유지
        ])("%p는 %p으로 반올림됨.", (input, expected) => {
          // WHEN: 양수 입력
          // THEN: 소수점 셋째 자리에서 반올림되어 소수점 둘째 자리까지 반환해야 함
          expect(formatDecimal(input)).toBe(expected);
        });
      });

      describe("소수점 셋째자리 반올림", () => {
        it.each([
          [1.005, 1.01],
          [2.675, 2.68],
        ])("%p는 %p으로 반올림됨.", (input, expected) => {
          // WHEN: 소수점 셋째 자리가 5인 경우
          // THEN: 올바르게 반올림되어야 함
          expect(formatDecimal(input)).toBe(expected);
        });
      });
    });

    describe("음수일 경우,", () => {
      it.each([
        [-1.234, -1.23], // DESC: 절댓값 셋째 자리 4에서 내림 (수학적 반올림)
        [-1.235, -1.23], // DESC: 절댓값 셋째 자리 5에서 올림 (0에서 멀어지는 방식)이 아닌, 소수점 두 자리까지만 표시 (버림)되는지 확인. (참고: Math.round()는 0에 가까워지게 반올림하지 않으므로 -1.235의 결과는 -1.24)
        [-1.005, -1.0], // DESC: -1.005의 반올림 처리
      ])("%p는 %p으로 반올림됨.", (input, expected) => {
        // WHEN: 음수 입력
        // THEN: 소수점 셋째 자리에서 반올림되어 소수점 둘째 자리까지 반환해야 함 (음수 처리 방식 확인)
        expect(formatDecimal(input)).toBe(expected);
      });
    });

    test("NaN은 NaN을 반환.", () => {
      // WHEN: NaN 입력
      // THEN: NaN을 반환해야 함
      expect(Number.isNaN(formatDecimal(Number.NaN))).toBe(true);
    });

    test("Infinity는 Infinity를 반환.", () => {
      // WHEN: Infinity 입력
      // THEN: Infinity를 반환해야 함
      expect(formatDecimal(Number.POSITIVE_INFINITY)).toBe(
        Number.POSITIVE_INFINITY,
      );
    });
  });

  describe("decimalNumber Test", () => {
    test("빈 문자열이면 빈 문자열을 그대로 반환.", () => {
      // WHEN: 빈 문자열("") 입력
      // THEN: 빈 문자열을 반환해야 함
      expect(decimalNumber({ value: "", maxDecimalLength: 2 })).toBe("");
    });

    test("0 단일 값은 그대로 0을 반환.", () => {
      // WHEN: "0" 입력
      // THEN: "0"을 반환해야 함
      expect(decimalNumber({ value: "0", maxDecimalLength: 2 })).toBe("0");
    });

    test("정수에 3자리마다 쉼표를 추가함.", () => {
      // WHEN: 정수 입력
      // THEN: 3자리마다 콤마를 추가하여 반환해야 함
      expect(decimalNumber({ value: "1234", maxDecimalLength: 2 })).toBe(
        "1,234",
      );
    });

    test("긴 정수에도 3자리마다 쉼표를 추가함.", () => {
      // WHEN: 긴 정수 입력
      // THEN: 3자리마다 콤마를 추가하여 반환해야 함
      expect(decimalNumber({ value: "1234567", maxDecimalLength: 2 })).toBe(
        "1,234,567",
      );
    });

    describe("소수점 처리", () => {
      test("소수 자릿수가 최대치보다 짧으면 그대로 유지함.", () => {
        // WHEN: 소수 자릿수가 maxDecimalLength(2)보다 짧은 경우
        // THEN: 그대로 유지하고 콤마를 추가하여 반환해야 함
        expect(decimalNumber({ value: "1234.5", maxDecimalLength: 2 })).toBe(
          "1,234.5",
        );
      });

      test("소수 자릿수가 최대치를 초과하면 잘라서 반환.", () => {
        // WHEN: 소수 자릿수가 maxDecimalLength(2)를 초과하는 경우
        // THEN: 초과분을 절삭하여 반환해야 함 (반올림 없음)
        expect(decimalNumber({ value: "1234.5678", maxDecimalLength: 2 })).toBe(
          "1,234.56",
        );
      });
    });

    describe("특수 문자( 점을 제외한 ) 및 공백 처리", () => {
      test("숫자와 점 이외의 문자는 제거하고 포맷", () => {
        // WHEN: 숫자, 점 외의 문자 포함
        // THEN: 숫자와 점만 남기고 콤마 포맷팅해야 함
        expect(
          decimalNumber({ value: "ab12,3x.4z", maxDecimalLength: 2 }),
        ).toBe("123.4");
      });

      test("입력의 공백과 쉼표는 무시하고 포맷함.", () => {
        // WHEN: 공백과 기존 콤마 포함
        // THEN: 공백과 기존 콤마를 제거하고 새로운 콤마 포맷팅해야 함
        expect(
          decimalNumber({ value: "  1,234.567  ", maxDecimalLength: 3 }),
        ).toBe("1,234.567");
      });
    });

    describe("음수 처리", () => {
      test("음수 기호를 보존하여 포맷함.", () => {
        // WHEN: 음수 값 입력
        // THEN: 음수 기호를 보존하고 콤마/소수점 포맷팅해야 함
        expect(decimalNumber({ value: "-1234.56", maxDecimalLength: 2 })).toBe(
          "-1,234.56",
        );
      });

      test("음수 부호와 선행 점이 함께 있으면 -0을 보강하여 소수로 포맷함.", () => {
        // WHEN: '-.5' 입력
        // THEN: '-0.5'로 포맷팅해야 함
        expect(decimalNumber({ value: "-.5", maxDecimalLength: 3 })).toBe(
          "-0.5",
        );
      });

      test("음수 부호와 선행 0이 함께 있으면 정수부를 정규화하여 포맷함.", () => {
        // WHEN: '-00.5' 입력
        // THEN: '-0.5'로 정규화하여 포맷팅해야 함
        expect(decimalNumber({ value: "-00.5", maxDecimalLength: 2 })).toBe(
          "-0.5",
        );
      });

      test("음수 부호와 선행 0이 있는 정수 입력은 쉼표와 함께 정규화함.", () => {
        // WHEN: '-0001234' 입력
        // THEN: '-1,234'로 정규화하여 포맷팅해야 함
        expect(decimalNumber({ value: "-0001234", maxDecimalLength: 2 })).toBe(
          "-1,234",
        );
      });
    });

    test("정수만 입력되었고 점이 없으면 소수부를 추가하지 않음.", () => {
      // GIVEN: maxDecimalLength가 2 이상이지만
      // WHEN: 소수점 없이 정수만 입력
      // THEN: 소수점 부분을 인위적으로 추가하지 않고 콤마만 포맷팅해야 함
      expect(decimalNumber({ value: "1000", maxDecimalLength: 2 })).toBe(
        "1,000",
      );
    });

    describe("maxDecimalLength가 0보다 작은 경우", () => {
      test("maxDecimalLength가 0이면 소수부를 제거함.", () => {
        // WHEN: maxDecimalLength=0
        // THEN: 소수점 이하를 제거하고 정수부만 포맷팅해야 함
        expect(decimalNumber({ value: "1234.56", maxDecimalLength: 0 })).toBe(
          "1,234",
        );
      });

      test("maxDecimalLength가 0이어도 음수 기호를 보존함.", () => {
        // WHEN: 음수, maxDecimalLength=0
        // THEN: 음수 기호를 보존하고 소수점 이하를 제거해야 함
        expect(decimalNumber({ value: "-1234.56", maxDecimalLength: 0 })).toBe(
          "-1,234",
        );
      });
    });

    test("점이 여러 개 있으면 첫 번째 점 이후를 이어 붙이는 현재 동작을 유지함.", () => {
      // WHEN: 점이 여러 개 포함된 문자열 입력
      // THEN: 첫 번째 점을 소수점으로 사용하고, 그 뒤의 모든 숫자를 이어 붙여 소수부로 처리해야 함
      expect(decimalNumber({ value: "12.3.4.5", maxDecimalLength: 2 })).toBe(
        "12.345",
      );
    });

    describe("특이 케이스", () => {
      test("정수부가 0만 있는 경우 하나의 0으로 정규화함.", () => {
        // WHEN: '000' 입력
        // THEN: '0'으로 정규화해야 함
        expect(decimalNumber({ value: "000", maxDecimalLength: 2 })).toBe("0");
      });

      test("선행 점으로 시작하면 0을 보강하여 소수로 포맷함.", () => {
        // WHEN: '.5' 입력
        // THEN: '0.5'로 보강하여 포맷팅해야 함
        expect(decimalNumber({ value: ".5", maxDecimalLength: 2 })).toBe("0.5");
      });

      test("정수부가 0으로만 구성되고 소수부가 있으면 0으로 정규화함.", () => {
        // WHEN: '00.5' 입력
        // THEN: '0.5'로 정규화하여 포맷팅해야 함
        expect(decimalNumber({ value: "00.5", maxDecimalLength: 2 })).toBe(
          "0.5",
        );
      });

      test("선행 0이 다수 존재하면 정수부를 정규화함.", () => {
        // WHEN: '0001234.50' 입력
        // THEN: '1,234.50'으로 정규화하여 포맷팅해야 함
        expect(
          decimalNumber({ value: "0001234.50", maxDecimalLength: 2 }),
        ).toBe("1,234.50");
      });
    });
  });
});
