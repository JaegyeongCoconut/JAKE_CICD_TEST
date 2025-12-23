import { describe, expect, it, test } from "vitest";

import {
  formatCountryMobile,
  formatMobileExceptZero,
} from "@packages/utils/formatter/phone";

describe("phone Test", () => {
  describe("formatCountryMobile Test", () => {
    describe("null을 반환하는 케이스", () => {
      it.each([{ countryDial: null }, { countryDial: undefined }])(
        "countryDial=$countryDial일 경우, null을 반환.",
        ({ countryDial }) => {
          // WHEN: countryDial이 null/undefined인 경우
          // THEN: null을 반환해야 함
          expect(
            formatCountryMobile({ countryDial, phone: "test" }),
          ).toBeNull();
        },
      );

      it.each([{ phone: null }, { phone: undefined }])(
        "phone=$phone일 경우, null을 반환.",
        ({ phone }) => {
          // WHEN: phone이 null/undefined인 경우
          // THEN: null을 반환해야 함
          expect(
            formatCountryMobile({ phone, countryDial: "test" }),
          ).toBeNull();
        },
      );

      test("countryDial='' 또는 phone=''이면 null을 반환.", () => {
        // WHEN: countryDial이 빈 문자열인 경우
        // THEN: null을 반환해야 함
        expect(
          formatCountryMobile({ countryDial: "", phone: "0123456789" }),
        ).toBeNull();
        // WHEN: phone이 빈 문자열인 경우
        // THEN: null을 반환해야 함
        expect(
          formatCountryMobile({ countryDial: "82", phone: "" }),
        ).toBeNull();
      });
    });

    describe("비정상 케이스", () => {
      it.each([
        { countryDial: "82", phone: "01", expected: "+82 01" },
        { countryDial: "82", phone: "0123", expected: "+82 0123" },
        { countryDial: "82", phone: "012345", expected: "+82 012345" },
        { countryDial: "82", phone: "012345678", expected: "+82 012345678" },
      ])(
        "(phone의 길이가 10 미만인 경우) countryDial=$countryDial이고 phone=$phone이면 $expected를 반환.",
        ({ countryDial, phone, expected }) => {
          // WHEN: phone 길이가 포맷팅 기준(10자리) 미만인 경우
          // THEN: 포맷팅이 적용되지 않고 단순히 연결되어야 함
          expect(formatCountryMobile({ phone, countryDial })).toBe(expected);
        },
      );

      test("countryDial에 '+'가 이미 있으면 이중 +가 될 수 있음.", () => {
        // WHEN: countryDial에 이미 '+'가 포함된 경우
        // THEN: 포맷터가 '+'를 중복 추가하여 '++'가 될 수 있음 (현재 로직의 특성 반영)
        expect(
          formatCountryMobile({ countryDial: "+82", phone: "0123456789" }),
        ).toBe("++82 01 23456789");
      });

      test("전화번호에 하이픈이 있으면 포맷이 적용되지 않음.", () => {
        // WHEN: phone에 하이픈이 포함된 경우
        // THEN: 내부적으로 숫자가 아닌 문자를 제거하지 않아 포맷팅 로직(slice)이 올바르게 작동하지 않음 (현재 로직의 특성 반영)
        expect(
          formatCountryMobile({ countryDial: "82", phone: "010-1234-5678" }),
        ).toBe("+82 010-1234-5678");
      });
    });

    describe("정상 케이스", () => {
      it.each([
        { countryDial: "82", phone: "0123456789", expected: "+82 01 23456789" },
        {
          countryDial: "856",
          phone: "0123456789",
          expected: "+856 01 23456789",
        },
        {
          countryDial: "1-264",
          phone: "0123456789",
          expected: "+1-264 01 23456789",
        },
        {
          countryDial: "880",
          phone: "0123456789",
          expected: "+880 01 23456789",
        },
      ])(
        "countryDial=$countryDial이고 phone=$phone이면 $expected를 반환.",
        ({ countryDial, phone, expected }) => {
          // WHEN: phone 길이가 10자리 이상이고 유효한 입력인 경우
          // THEN: '+[countryDial] [phone 0-2] [phone 2-끝]' 형식으로 포맷팅되어야 함 (한국식 01x-xxxx-xxxx 포맷팅)
          expect(formatCountryMobile({ phone, countryDial })).toBe(expected);
        },
      );
    });
  });

  describe("formatMobileExceptZero Test", () => {
    describe("빈 문자열을 반환하는 케이스", () => {
      test("value 문자열이 빈 문자열이라면, 빈 문자열을 반환.", () => {
        // WHEN: 빈 문자열("") 입력
        // THEN: 빈 문자열을 반환해야 함
        expect(formatMobileExceptZero("")).toBe("");
      });

      test("value 문자열이 '0' 하나만 있다면, 빈 문자열을 반환.", () => {
        // WHEN: '0' 하나만 입력
        // THEN: 선행 '0' 제거 로직에 의해 빈 문자열을 반환해야 함
        expect(formatMobileExceptZero("0")).toBe("");
      });

      test("value 문자열 모두가 숫자로 이루어지지 않았다면 빈 문자열을 반환.", () => {
        // GIVEN: 숫자 외의 문자만 포함된 문자열
        // WHEN: formatMobileExceptZero 호출
        // THEN: 숫자만 추출하는 과정에서 빈 문자열이 되어 최종적으로 빈 문자열을 반환해야 함
        expect(formatMobileExceptZero("test.com!@#$%^&*()_-+=,.<>/?;'|")).toBe(
          "",
        );
      });
    });

    describe("value 문자열에 '0'이 연속적으로 나오는 케이스", () => {
      it.each([
        { value: "00", expected: "0" }, // DESC: '00' -> '0'
        { value: "000", expected: "00" }, // DESC: '000' -> '00'
        { value: "00000", expected: "0000" }, // DESC: '00000' -> '0000'
      ])("value=$value라면 $expected로 반환됨.", ({ value, expected }) => {
        // WHEN: '0'이 여러 개 연속되는 경우
        // THEN: 선행 '0' 하나만 제거되고 나머지는 유지되어야 함
        expect(formatMobileExceptZero(value)).toBe(expected);
      });
    });

    describe("첫번째 '0'이 제거되는 케이스 케이스", () => {
      it.each([
        { value: "01012345678", expected: "1012345678" }, // DESC: 일반적인 휴대폰 번호
        { value: " 01012345678", expected: "1012345678" }, // DESC: 선행 공백 포함
        { value: "!1012345678", expected: "1012345678" }, // DESC: 선행 특수문자 포함 (선행 '0'이 없으면 그대로 반환)
        { value: "0-10 123-456 78", expected: "1012345678" }, // DESC: 구분자 포함
      ])("value=$value이면 $expected로 반환됨.", ({ value, expected }) => {
        // WHEN: 선행 '0'이 포함되고 구분자가 섞인 문자열 입력
        // THEN: 모든 숫자 외 문자가 제거되고, 맨 앞의 '0'이 제거된 숫자열이 반환되어야 함
        expect(formatMobileExceptZero(value)).toBe(expected);
      });
    });

    test("value가 한 자리 숫자라면, 그대로 반환.", () => {
      // WHEN: '0'이 아닌 한 자리 숫자 입력
      // THEN: 그대로 반환되어야 함
      expect(formatMobileExceptZero("7")).toBe("7");
    });
  });
});
