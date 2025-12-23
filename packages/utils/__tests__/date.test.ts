import { describe, expect, it, test } from "vitest";

import {
  formatICTDateTime,
  formatLocalDateTime,
  formatPeriodToUTC,
  formatUnixToLocalDateTime,
} from "@packages/utils/date";

describe("date Test", () => {
  describe("formatUnixToLocalDateTime Test", () => {
    // GIVEN: unix 시간 1760424179 (2025-10-14 15:42:59 GMT+0900 기준)
    const unix = 1760424179;

    // GIVEN: 다양한 포맷 템플릿과 기대되는 현지 시간 결과값을 준비
    it.each([
      { unix, template: "DD/MM/YYYY", expected: "14/10/2025" },
      { unix, template: "DD/MM/YYYY, HH:mm", expected: "14/10/2025, 15:42" },
      {
        unix,
        template: "DD/MM/YYYY, HH:mm:ss",
        expected: "14/10/2025, 15:42:59",
      },
    ])(
      "unix($unix) 시간을 현지 시간의 $template로 변경하여 $expected로 반환.",
      ({ unix, template, expected }) => {
        // WHEN: formatUnixToLocalDateTime 함수를 실행
        // THEN: 결과 문자열이 기대되는 현지 시간 포맷과 일치하는지 확인
        expect(formatUnixToLocalDateTime({ date: unix, template })).toBe(
          expected,
        );
      },
    );

    test("template를 전달하지 않으면 DD/MM/YYYY, HH:mm로 변경하여 반환.", () => {
      // GIVEN: unix 시간과 템플릿 생략을 준비
      // WHEN: formatUnixToLocalDateTime 함수를 실행
      // THEN: 기본 템플릿(DD/MM/YYYY, HH:mm)으로 포맷된 문자열을 반환하는지 확인
      expect(formatUnixToLocalDateTime({ date: unix })).toBe(
        "14/10/2025, 15:42",
      );
    });
  });

  describe("formatLocalDateTime Test", () => {
    // GIVEN: 유효하지 않은 날짜 문자열 파라미터들을 준비
    it.each([
      { date: "" },
      { date: "abc" },
      { date: "2025-00-00Z" },
      { date: "2025-00-01T00:00:00Z" },
      { date: "2025-12-32T00:00:00Z" },
      { date: "2025-13-32T00:00:00Z" },
    ])(
      "date에 잘못된 파라미터($date)를 전달하면, 'Invalid Date' 를 반환.",
      ({ date }) => {
        // WHEN: formatLocalDateTime 함수를 실행
        // THEN: 'Invalid Date' 문자열을 반환하는지 확인
        expect(formatLocalDateTime({ date })).toBe("Invalid Date");
      },
    );

    // GIVEN: UTC 날짜("2025-10-14T09:00:00Z")와 다양한 템플릿 및 현지 시간 기대값을 준비 (UTC 09:00:00Z는 KST 기준 18:00:00)
    it.each([
      {
        date: "2025-10-14T09:00:00Z",
        template: "DD/MM/YYYY",
        expected: "14/10/2025",
      },
      {
        date: "2025-10-14T09:00:00Z",
        template: "YYYY-MM-DD",
        expected: "2025-10-14",
      },
      {
        date: "2025-10-14T09:00:00Z",
        template: "YYYY-MM-DD, HH:mm:ss",
        expected: "2025-10-14, 18:00:00",
      },
    ])(
      "$date 입력값을 로컬 타임존으로 해석해 포맷 문자열 $template로 $expected를 반환.",
      ({ date, template, expected }) => {
        // WHEN: formatLocalDateTime 함수를 실행
        // THEN: 결과 문자열이 현재 시스템의 로컬 타임존으로 올바르게 포맷되었는지 확인
        expect(formatLocalDateTime({ date, template })).toBe(expected);
      },
    );

    test("template를 전달하지 않으면 DD/MM/YYYY로 변경하여 반환.", () => {
      // GIVEN: 날짜 입력값과 템플릿 생략을 준비
      // WHEN: formatLocalDateTime 함수를 실행
      // THEN: 기본 템플릿(DD/MM/YYYY)으로 포맷된 문자열을 반환하는지 확인
      expect(formatLocalDateTime({ date: "2025-10-14T09:00:00Z" })).toBe(
        "14/10/2025",
      );
    });
  });

  describe("formatICTDateTime Test", () => {
    // GIVEN: 유효하지 않은 날짜 문자열 파라미터들을 준비
    it.each([
      { date: "" },
      { date: "abc" },
      { date: "2025-00-00Z" },
      { date: "2025-00-01T00:00:00Z" },
      { date: "2025-12-32T00:00:00Z" },
      { date: "2025-13-32T00:00:00Z" },
    ])(
      "date에 잘못된 파라미터($date)를 전달하면, 'Invalid Date' 를 반환.",
      ({ date }) => {
        // WHEN: formatICTDateTime 함수를 실행
        // THEN: 'Invalid Date' 문자열을 반환하는지 확인
        expect(formatICTDateTime({ date })).toBe("Invalid Date");
      },
    );

    // GIVEN: UTC 날짜("2025-10-14T09:00:00Z")와 다양한 템플릿 및 ICT 시간대 기대값을 준비 (UTC 09:00:00Z는 ICT/UTC+7 기준 16:00:00)
    it.each([
      {
        date: "2025-10-14T09:00:00Z",
        template: "DD/MM/YYYY",
        expected: "14/10/2025",
      },
      {
        date: "2025-10-14T09:00:00Z",
        template: "YYYY-MM-DD",
        expected: "2025-10-14",
      },
      {
        date: "2025-10-14T09:00:00Z",
        template: "YYYY-MM-DD, HH:mm:ss",
        expected: "2025-10-14, 16:00:00", // ICT (+07:00) 적용 시간
      },
    ])(
      "$date 입력값을 Asia/Vientiane 타임존으로 해석해 포맷 문자열 $template로 $expected를 반환.( UTC+7 )",
      ({ date, template, expected }) => {
        // WHEN: formatICTDateTime 함수를 실행
        // THEN: 결과 문자열이 ICT 타임존으로 올바르게 포맷되었는지 확인
        expect(formatICTDateTime({ date, template })).toBe(expected);
      },
    );

    test("template를 전달하지 않으면 Asia/Vientiane 타임존으로 해석해 DD/MM/YYYY, HH:mm로 변경하여 반환.", () => {
      // GIVEN: 날짜 입력값과 템플릿 생략을 준비
      // WHEN: formatICTDateTime 함수를 실행
      // THEN: 기본 템플릿(DD/MM/YYYY, HH:mm)으로 ICT 타임존 포맷된 문자열을 반환하는지 확인
      expect(formatICTDateTime({ date: "2025-10-14T09:00:00Z" })).toBe(
        "14/10/2025, 16:00",
      );
    });
  });

  describe("formatPeriodToUTC Test", () => {
    test("localDate가 빈 문자열이면 빈 문자열을 반환.", () => {
      // GIVEN: localDate가 빈 문자열인 경우를 준비
      // WHEN: formatPeriodToUTC 함수를 실행
      // THEN: 결과로 빈 문자열을 반환하는지 확인
      expect(
        formatPeriodToUTC({
          type: "startDate",
          localDate: "",
          isLocalTime: false,
        }),
      ).toBe("");
    });

    // GIVEN: 유효하지 않은 날짜 문자열 파라미터들을 준비
    it.each([
      { localDate: "abc" },
      { localDate: "2025-00-00Z" },
      { localDate: "2025-00-01T00:00:00Z" },
      { localDate: "2025-12-32T00:00:00Z" },
      { localDate: "2025-13-32T00:00:00Z" },
    ])(
      "localDate에 잘못된 파라미터($localDate)를 전달하면, 'Invalid time value' 에러가 발생함.",
      ({ localDate }) => {
        // WHEN: formatPeriodToUTC 함수를 실행
        // THEN: 날짜 파싱 실패로 인해 'Invalid time value' 에러가 발생하는지 확인
        expect(() =>
          formatPeriodToUTC({
            type: "startDate",
            localDate,
            isLocalTime: true,
          }),
        ).toThrow("Invalid time value");
      },
    );

    describe("isLocalTime=true", () => {
      test("type='startDate'인 경우, DD/MM/YYYY 입력을 UTC 기준 00:00:00Z ISO 문자열로 반환.", () => {
        // GIVEN: type='startDate', isLocalTime=true, localDate='14/10/2025'를 준비
        // WHEN: formatPeriodToUTC 함수를 실행
        // THEN: 해당 날짜의 로컬 타임존 00:00:00을 UTC로 변환한 ISO 문자열을 반환하는지 확인
        expect(
          formatPeriodToUTC({
            type: "startDate",
            localDate: "14/10/2025",
            isLocalTime: true,
          }),
        ).toBe("2025-10-14T00:00:00.000Z");
      });

      test("type='endDate'인 경우, DD/MM/YYYY 입력에서 하루를 더한 UTC 기준 00:00:00Z ISO 문자열로 반환.", () => {
        // GIVEN: type='endDate', isLocalTime=true, localDate='14/10/2025'를 준비
        // WHEN: formatPeriodToUTC 함수를 실행
        // THEN: 다음 날짜의 로컬 타임존 00:00:00을 UTC로 변환한 ISO 문자열을 반환하여 기간의 끝을 표시하는지 확인
        expect(
          formatPeriodToUTC({
            type: "endDate",
            localDate: "14/10/2025",
            isLocalTime: true,
          }),
        ).toBe("2025-10-15T00:00:00.000Z");
      });
    });

    describe("isLocalTime=false", () => {
      test("type='startDate'인 경우, 라오스 자정(UTC+7)의 UTC 값(전날 17:00:00Z)을 반환.", () => {
        // GIVEN: type='startDate', isLocalTime=false (ICT 타임존 적용), localDate='14/10/2025'를 준비
        // WHEN: formatPeriodToUTC 함수를 실행
        const result = formatPeriodToUTC({
          type: "startDate",
          localDate: "14/10/2025",
          isLocalTime: false,
        });
        // THEN: '14/10/2025 00:00:00 (ICT)'를 UTC로 변환한 '2025-10-13T17:00:00.000Z'를 반환하는지 확인
        expect(result).toBe("2025-10-13T17:00:00.000Z");
      });

      test("type='endDate'인 경우, 다음날 자정(UTC+7)의 UTC 값(해당일 17:00:00Z)을 반환.", () => {
        // GIVEN: type='endDate', isLocalTime=false (ICT 타임존 적용), localDate='14/10/2025'를 준비
        // WHEN: formatPeriodToUTC 함수를 실행
        const result = formatPeriodToUTC({
          type: "endDate",
          localDate: "14/10/2025",
          isLocalTime: false,
        });
        // THEN: '15/10/2025 00:00:00 (ICT)'를 UTC로 변환한 '2025-10-14T17:00:00.000Z'를 반환하여 기간의 끝을 표시하는지 확인
        expect(result).toBe("2025-10-14T17:00:00.000Z");
      });
    });
  });
});
