import dayjs from "dayjs";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import type { GetMonthYearReturnType } from "@packages/utils/calendar";
import getMonthYear, {
  getNewMonth,
  getNewYear,
  resetMonthYear,
} from "@packages/utils/calendar";

// DESC: 매 테스트에서 신선한 MonthYear 결과를 생성하기 위한 헬퍼 함수를 정의
const mockGetMothYear = (iso: string): GetMonthYearReturnType =>
  getMonthYear(dayjs(iso));

describe("calendar Test", () => {
  // GIVEN: 테스트 날짜를 고정하여, 테스트 케이스를 산정하기 위해 시스템 시간을 2025-10-15로 설정하여 준비
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-10-15"));
  });

  afterEach(() => {
    // DESC: 테스트 날짜 원상복구
    vi.useRealTimers();
  });

  describe("getMonthYear Test", () => {
    describe("2025-10-15 입력 시", () => {
      test("value는 입력받은 날짜와 동일", () => {
        // WHEN: 2025-10-15를 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2025-10-15");

        // THEN: 반환된 dayjs 객체가 입력 날짜와 일치하는지 확인
        expect(result.value.format("YYYY-MM-DD")).toBe("2025-10-15");
      });

      test("month는 '10'을 반환.", () => {
        // WHEN: 2025-10-15를 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2025-10-15");

        // THEN: month 속성이 '10'인지 확인
        expect(result.month).toBe("10");
      });

      test("year는 '2025'를 반환.", () => {
        // WHEN: 2025-10-15를 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2025-10-15");

        // THEN: year 속성이 '2025'인지 확인
        expect(result.year).toBe("2025");
      });

      test("date는 '15'를 반환.", () => {
        // WHEN: 2025-10-15를 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2025-10-15");

        // THEN: date 속성이 '15'인지 확인
        expect(result.date).toBe("15");
      });

      test("currentMonth는 현재 월 '10'을 반환.", () => {
        // WHEN: 2025-10-15를 입력하여 getMonthYear를 실행 (시스템 시간과 동일)
        const result = mockGetMothYear("2025-10-15");

        // THEN: currentMonth가 시스템 시간 기준 현재 월인 '10'인지 확인
        expect(result.currentMonth).toBe("10");
      });

      test("currentYear는 현재 연도 '2025'를 반환.", () => {
        // WHEN: 2025-10-15를 입력하여 getMonthYear를 실행 (시스템 시간과 동일)
        const result = mockGetMothYear("2025-10-15");

        // THEN: currentYear가 시스템 시간 기준 현재 연도인 '2025'인지 확인
        expect(result.currentYear).toBe("2025");
      });

      test("isCurrentMonthYear는 true를 반환.", () => {
        // WHEN: 2025-10-15를 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2025-10-15");

        // THEN: 입력된 월/년이 시스템 시간과 일치하므로 true인지 확인
        expect(result.isCurrentMonthYear).toBe(true);
      });

      test("startDate는 해당 월의 시작일(2025-10-01)", () => {
        // WHEN: 2025-10-15를 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2025-10-15");

        // THEN: startDate가 해당 월의 1일인 2025-10-01인지 확인
        expect(result.startDate.format("YYYY-MM-DD")).toBe("2025-10-01");
      });

      test("currentStartDate는 현재 월의 시작일(2025-10-01)", () => {
        // WHEN: 2025-10-15를 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2025-10-15");

        // THEN: currentStartDate가 시스템 시간 기준 현재 월의 1일인 2025-10-01인지 확인
        expect(result.currentStartDate.format("YYYY-MM-DD")).toBe("2025-10-01");
      });

      test("prevMonthStartDate는 이전 달의 시작일(2025-09-01)", () => {
        // WHEN: 2025-10-15를 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2025-10-15");

        // THEN: prevMonthStartDate가 2025-09-01인지 확인
        expect(result.prevMonthStartDate.format("YYYY-MM-DD")).toBe(
          "2025-09-01",
        );
      });

      test("nextMonthStartDate는 다음 달의 시작일(2025-11-01)", () => {
        // WHEN: 2025-10-15를 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2025-10-15");

        // THEN: nextMonthStartDate가 2025-11-01인지 확인
        expect(result.nextMonthStartDate.format("YYYY-MM-DD")).toBe(
          "2025-11-01",
        );
      });

      test("frstDayOfMonth는 해당 월 1일의 요일(3=수요일)", () => {
        // WHEN: 2025-10-15를 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2025-10-15");

        // THEN: 2025년 10월 1일의 요일 인덱스 (일요일: 0 ~ 토요일: 6)가 3인지 확인
        expect(result.frstDayOfMonth).toBe(3);
      });

      test("lastDate는 해당 월의 마지막 날짜(31)", () => {
        // WHEN: 2025-10-15를 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2025-10-15");

        // THEN: 10월의 마지막 날짜가 31인지 확인
        expect(result.lastDate).toBe(31);
      });

      test("prevMonthLastDate는 이전 달의 마지막 날짜(30)", () => {
        // WHEN: 2025-10-15를 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2025-10-15");

        // THEN: 이전 달(9월)의 마지막 날짜가 30인지 확인
        expect(result.prevMonthLastDate).toBe(30);
      });

      test("firstWeekPrevMonthDate는 첫 주에 표시될 이전 달 날짜(2025-09-28)", () => {
        // WHEN: 2025-10-15를 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2025-10-15");

        // THEN: 10월 1일(수요일, 인덱스 3)의 달력 첫 칸(일요일)에 해당하는 2025-09-28인지 확인
        expect(result.firstWeekPrevMonthDate.format("YYYY-MM-DD")).toBe(
          "2025-09-28",
        );
      });
    });

    describe("다른 연도/월 입력 시 (2024-09-20)", () => {
      test("month는 '09'를 반환.", () => {
        // WHEN: 2024-09-20을 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2024-09-20");
        // THEN: month 속성이 '09'인지 확인
        expect(result.month).toBe("09");
      });

      test("year는 '2024'를 반환.", () => {
        // WHEN: 2024-09-20을 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2024-09-20");
        // THEN: year 속성이 '2024'인지 확인
        expect(result.year).toBe("2024");
      });

      test("isCurrentMonthYear는 false를 반환.", () => {
        // WHEN: 2024-09-20을 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2024-09-20");
        // THEN: 입력된 월/년이 시스템 시간(2025년 10월)과 다르므로 false인지 확인
        expect(result.isCurrentMonthYear).toBe(false);
      });

      test("startDate는 해당 월의 시작일(2024-09-01)", () => {
        // WHEN: 2024-09-20을 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2024-09-20");
        // THEN: startDate가 2024-09-01인지 확인
        expect(result.startDate.format("YYYY-MM-DD")).toBe("2024-09-01");
      });

      test("frstDayOfMonth는 해당 월 1일의 요일(0=일요일)", () => {
        // WHEN: 2024-09-20을 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2024-09-20");
        // THEN: 2024년 9월 1일의 요일 인덱스가 0(일요일)인지 확인
        expect(result.frstDayOfMonth).toBe(0);
      });

      test("lastDate는 해당 월의 마지막 날짜(30)", () => {
        // WHEN: 2024-09-20을 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2024-09-20");
        // THEN: 9월의 마지막 날짜가 30인지 확인
        expect(result.lastDate).toBe(30);
      });
    });

    describe("같은 연도, 다른 월 입력 시 (2025-11-05)", () => {
      test("month는 '11'을 반환.", () => {
        // WHEN: 2025-11-05를 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2025-11-05");
        // THEN: month 속성이 '11'인지 확인
        expect(result.month).toBe("11");
      });

      test("isCurrentMonthYear는 false를 반환.", () => {
        // WHEN: 2025-11-05를 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2025-11-05");
        // THEN: 입력된 월이 시스템 시간(10월)과 다르므로 false인지 확인
        expect(result.isCurrentMonthYear).toBe(false);
      });

      test("currentMonth는 '10'을 반환.", () => {
        // WHEN: 2025-11-05를 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2025-11-05");
        // THEN: currentMonth는 시스템 시간 기준 현재 월인 '10'인지 확인
        expect(result.currentMonth).toBe("10");
      });

      test("startDate는 해당 월의 시작일(2025-11-01)", () => {
        // WHEN: 2025-11-05를 입력하여 getMonthYear를 실행
        const result = mockGetMothYear("2025-11-05");
        // THEN: startDate가 2025-11-01인지 확인
        expect(result.startDate.format("YYYY-MM-DD")).toBe("2025-11-01");
      });
    });
  });

  describe("getNewMonth Test", () => {
    // GIVEN: prevDate로 2025-10-15의 캘린더 데이터를 준비
    const prevDate = mockGetMothYear("2025-10-15");

    test("1개월 후로 이동.", () => {
      // GIVEN: prevDate로 2025-10-15의 캘린더 데이터를 준비
      // WHEN: monthIncrement를 1로 설정하여 getNewMonth를 실행
      const result = getNewMonth({ prevDate, monthIncrement: 1 });

      // THEN: 월이 '11'로, 연도는 '2025'로 변경되었는지 확인
      expect(result.month).toBe("11");
      expect(result.year).toBe("2025");
    });

    test("1개월 전으로 이동.", () => {
      // GIVEN: prevDate로 2025-10-15의 캘린더 데이터를 준비
      // WHEN: monthIncrement를 -1로 설정하여 getNewMonth를 실행
      const result = getNewMonth({ prevDate, monthIncrement: -1 });

      // THEN: 월이 '09'로, 연도는 '2025'로 변경되었는지 확인
      expect(result.month).toBe("09");
      expect(result.year).toBe("2025");
    });

    test("3개월 후로 이동.", () => {
      // GIVEN: prevDate로 2025-10-15의 캘린더 데이터를 준비
      // WHEN: monthIncrement를 3으로 설정하여 getNewMonth를 실행 (연도 경계 포함)
      const result = getNewMonth({ prevDate, monthIncrement: 3 });

      // THEN: 월이 '01'로, 연도는 '2026'으로 변경되었는지 확인
      expect(result.month).toBe("01");
      expect(result.year).toBe("2026");
    });

    test("12개월 후로 이동.", () => {
      // GIVEN: prevDate로 2025-10-15의 캘린더 데이터를 준비
      // WHEN: monthIncrement를 12로 설정하여 getNewMonth를 실행
      const result = getNewMonth({ prevDate, monthIncrement: 12 });

      // THEN: 월은 '10'으로 유지되고, 연도는 '2026'으로 변경되었는지 확인
      expect(result.month).toBe("10");
      expect(result.year).toBe("2026");
    });

    test("0개월 이동 시 같은 월을 반환.", () => {
      // GIVEN: prevDate로 2025-10-15의 캘린더 데이터를 준비
      // WHEN: monthIncrement를 0으로 설정하여 getNewMonth를 실행
      const result = getNewMonth({ prevDate, monthIncrement: 0 });

      // THEN: 월과 연도가 변하지 않고 '10', '2025'인지 확인
      expect(result.month).toBe("10");
      expect(result.year).toBe("2025");
    });

    describe("연도 경계 테스트", () => {
      test("12월에서 1개월 후는 다음 해 1월", () => {
        // GIVEN: 2025-12-15의 캘린더 데이터를 준비
        const prevDateDec = mockGetMothYear("2025-12-15");
        // WHEN: monthIncrement를 1로 설정하여 getNewMonth를 실행
        const result = getNewMonth({
          prevDate: prevDateDec,
          monthIncrement: 1,
        });

        // THEN: 연도가 2026, 월이 01인지 확인
        expect(result.month).toBe("01");
        expect(result.year).toBe("2026");
      });

      test("1월에서 1개월 전은 이전 해 12월", () => {
        // GIVEN: 2025-01-15의 캘린더 데이터를 준비
        const prevDateJan = mockGetMothYear("2025-01-15");
        // WHEN: monthIncrement를 -1로 설정하여 getNewMonth를 실행
        const result = getNewMonth({
          prevDate: prevDateJan,
          monthIncrement: -1,
        });

        // THEN: 연도가 2024, 월이 12인지 확인
        expect(result.month).toBe("12");
        expect(result.year).toBe("2024");
      });
    });

    describe("isCurrentMonthYear 업데이트 테스트", () => {
      test("현재 월에서 1개월 후로 이동하면 isCurrentMonthYear는 false", () => {
        // GIVEN: 현재 월(10월)의 캘린더 데이터를 준비
        const prevDateCurrent = mockGetMothYear("2025-10-15");
        // WHEN: monthIncrement를 1로 설정하여 getNewMonth를 실행
        const result = getNewMonth({
          prevDate: prevDateCurrent,
          monthIncrement: 1,
        });

        // THEN: 시스템 현재 월(10월)에서 벗어났으므로 false인지 확인
        expect(result.isCurrentMonthYear).toBe(false);
      });

      test("다른 월에서 현재 월로 이동하면 isCurrentMonthYear는 true", () => {
        // GIVEN: 이전 월(9월)의 캘린더 데이터를 준비
        const prevDatePrev = mockGetMothYear("2025-09-15");
        // WHEN: monthIncrement를 1로 설정하여 getNewMonth를 실행
        const result = getNewMonth({
          prevDate: prevDatePrev,
          monthIncrement: 1,
        });

        // THEN: 결과 월이 시스템 현재 월(10월)과 일치하므로 true인지 확인
        expect(result.isCurrentMonthYear).toBe(true);
      });
    });
  });

  describe("getNewYear Test", () => {
    // GIVEN: prevDate로 2025-10-15의 캘린더 데이터를 준비
    const prevDate = mockGetMothYear("2025-10-15");

    describe("연도 이동 테스트", () => {
      test("1년 후로 이동.", () => {
        // GIVEN: prevDate로 2025-10-15의 캘린더 데이터를 준비
        // WHEN: yearIncrement를 1로 설정하여 getNewYear를 실행
        const result = getNewYear({ prevDate, yearIncrement: 1 });

        // THEN: 연도가 '2026'으로 변경되고 월은 '10'으로 유지되었는지 확인
        expect(result.year).toBe("2026");
        expect(result.month).toBe("10");
      });

      test("1년 전으로 이동.", () => {
        // GIVEN: prevDate로 2025-10-15의 캘린더 데이터를 준비
        // WHEN: yearIncrement를 -1로 설정하여 getNewYear를 실행
        const result = getNewYear({ prevDate, yearIncrement: -1 });

        // THEN: 연도가 '2024'로 변경되고 월은 '10'으로 유지되었는지 확인
        expect(result.year).toBe("2024");
        expect(result.month).toBe("10");
      });

      test("5년 후로 이동.", () => {
        // GIVEN: prevDate로 2025-10-15의 캘린더 데이터를 준비
        // WHEN: yearIncrement를 5로 설정하여 getNewYear를 실행
        const result = getNewYear({ prevDate, yearIncrement: 5 });

        // THEN: 연도가 '2030'으로 변경되었는지 확인
        expect(result.year).toBe("2030");
        expect(result.month).toBe("10");
      });

      test("0년 이동 시 같은 연도를 반환.", () => {
        // GIVEN: prevDate로 2025-10-15의 캘린더 데이터를 준비
        // WHEN: yearIncrement를 0으로 설정하여 getNewYear를 실행
        const result = getNewYear({ prevDate, yearIncrement: 0 });

        // THEN: 연도가 변하지 않고 '2025'인지 확인
        expect(result.year).toBe("2025");
        expect(result.month).toBe("10");
      });

      test("10년 전으로 이동.", () => {
        // GIVEN: prevDate로 2025-10-15의 캘린더 데이터를 준비
        // WHEN: yearIncrement를 -10으로 설정하여 getNewYear를 실행
        const result = getNewYear({ prevDate, yearIncrement: -10 });

        // THEN: 연도가 '2015'로 변경되었는지 확인
        expect(result.year).toBe("2015");
        expect(result.month).toBe("10");
      });
    });

    describe("isCurrentMonthYear 업데이트 테스트", () => {
      test("현재 연도(2025년)에서 1년 후로 이동하면 isCurrentMonthYear는 false", () => {
        // GIVEN: 현재 연도의 캘린더 데이터를 준비
        const prevDateCurrent = mockGetMothYear("2025-10-15");
        // WHEN: yearIncrement를 1로 설정하여 getNewYear를 실행
        const result = getNewYear({
          prevDate: prevDateCurrent,
          yearIncrement: 1,
        });

        // THEN: 연도가 시스템 현재 연도에서 벗어났으므로 false인지 확인
        expect(result.isCurrentMonthYear).toBe(false);
      });

      test("다른 연도(2024년)에서 현재 연도(2025년)로 이동하면 isCurrentMonthYear는 true", () => {
        // GIVEN: 이전 연도의 캘린더 데이터를 준비
        const prevDatePrev = mockGetMothYear("2024-10-15");
        // WHEN: yearIncrement를 1로 설정하여 getNewYear를 실행
        const result = getNewYear({ prevDate: prevDatePrev, yearIncrement: 1 });

        // THEN: 결과 월/연도가 시스템 현재 월/연도와 일치하므로 true인지 확인
        expect(result.isCurrentMonthYear).toBe(true);
      });

      test("현재 월(10월)이 아닌 경우, 현재 연도로 이동해도 isCurrentMonthYear는 false", () => {
        // GIVEN: 이전 연도의 다른 월(2024년 11월) 캘린더 데이터를 준비
        const prevDateOtherMonth = mockGetMothYear("2024-11-15");
        // WHEN: yearIncrement를 1로 설정하여 getNewYear를 실행
        const result = getNewYear({
          prevDate: prevDateOtherMonth,
          yearIncrement: 1,
        });

        // THEN: 연도는 2025년이 되지만 월이 11월(현재 월 10월과 다름)이므로 false인지 확인
        expect(result.isCurrentMonthYear).toBe(false);
      });
    });

    describe("윤년 처리 테스트", () => {
      test("2월이 윤년으로 이동 시 올바르게 처리함.", () => {
        // GIVEN: 2023년 2월(평년) 데이터를 준비
        const prevDateNormal = mockGetMothYear("2023-02-15");
        // WHEN: yearIncrement를 1로 설정하여 2024년(윤년)으로 이동
        const result = getNewYear({
          prevDate: prevDateNormal,
          yearIncrement: 1,
        });

        // THEN: 연도가 '2024'이고, 윤년인 2월의 마지막 날짜가 29인지 확인
        expect(result.year).toBe("2024");
        expect(result.month).toBe("02");
        // DESC: 2024년은 윤년, 2월 29일까지 있음
        expect(result.lastDate).toBe(29);
      });

      test("2월이 평년으로 이동 시 올바르게 처리함.", () => {
        // GIVEN: 2024년 2월(윤년) 데이터를 준비
        const prevDateLeap = mockGetMothYear("2024-02-15");
        // WHEN: yearIncrement를 1로 설정하여 2025년(평년)으로 이동
        const result = getNewYear({ prevDate: prevDateLeap, yearIncrement: 1 });

        // THEN: 연도가 '2025'이고, 평년인 2월의 마지막 날짜가 28인지 확인
        expect(result.year).toBe("2025");
        expect(result.month).toBe("02");
        // DESC: 2025년은 평년, 2월 28일까지 있음
        expect(result.lastDate).toBe(28);
      });
    });

    describe("다양한 월에서의 연도 이동", () => {
      test("1월에서 연도 이동(2025년에서 2026년으로)이 올바르게 동작함.", () => {
        // GIVEN: 2025년 1월 데이터를 준비
        const prevDateJan = mockGetMothYear("2025-01-15");
        // WHEN: yearIncrement를 1로 설정하여 getNewYear를 실행
        const result = getNewYear({ prevDate: prevDateJan, yearIncrement: 1 });

        // THEN: 연도가 2026, 월이 01로 유지되었는지 확인
        expect(result.year).toBe("2026");
        expect(result.month).toBe("01");
      });

      test("12월에서 연도 이동(2025년에서 2024년으로)이 올바르게 동작함.", () => {
        // GIVEN: 2025년 12월 데이터를 준비
        const prevDateDec = mockGetMothYear("2025-12-15");
        // WHEN: yearIncrement를 -1로 설정하여 getNewYear를 실행
        const result = getNewYear({ prevDate: prevDateDec, yearIncrement: -1 });

        // THEN: 연도가 2024, 월이 12로 유지되었는지 확인
        expect(result.year).toBe("2024");
        expect(result.month).toBe("12");
      });
    });
  });

  describe("resetMonthYear Test", () => {
    // DESC: 시스템 현재 시간은 2025-10-15로 고정되어 있음 (현재 월: 10, 현재 연도: 2025)

    describe("현재 월(10월)로 초기화", () => {
      test("다른 월(11월)에서 현재 월로 초기화함.", () => {
        // GIVEN: 2025년 11월 데이터를 준비
        const date = mockGetMothYear("2025-11-20");
        // WHEN: resetMonthYear 함수를 실행
        const result = resetMonthYear(date);

        // THEN: 연도와 월이 시스템 현재 시간인 '2025-10'으로 초기화되었는지 확인
        expect(result.year).toBe("2025");
        expect(result.month).toBe("10");
      });

      test("다른 연도(2024년)에서 현재 월로 초기화함.", () => {
        // GIVEN: 2024년 12월 데이터를 준비
        const date = mockGetMothYear("2024-12-15");
        // WHEN: resetMonthYear 함수를 실행
        const result = resetMonthYear(date);

        // THEN: 연도와 월이 시스템 현재 시간인 '2025-10'으로 초기화되었는지 확인
        expect(result.year).toBe("2025");
        expect(result.month).toBe("10");
      });

      test("이전 달에서 현재 월로 초기화함.", () => {
        // GIVEN: 2025년 09월 데이터를 준비
        const date = mockGetMothYear("2025-09-10");
        // WHEN: resetMonthYear 함수를 실행
        const result = resetMonthYear(date);

        // THEN: 연도와 월이 시스템 현재 시간인 '2025-10'으로 초기화되었는지 확인
        expect(result.year).toBe("2025");
        expect(result.month).toBe("10");
      });

      test("다음 달에서 현재 월로 초기화함.", () => {
        // GIVEN: 2025년 11월 데이터를 준비
        const date = mockGetMothYear("2025-11-05");
        // WHEN: resetMonthYear 함수를 실행
        const result = resetMonthYear(date);

        // THEN: 연도와 월이 시스템 현재 시간인 '2025-10'으로 초기화되었는지 확인
        expect(result.year).toBe("2025");
        expect(result.month).toBe("10");
      });
    });

    describe("다양한 날짜에서 테스트", () => {
      test("2025-12-25으로 초기화함.", () => {
        // GIVEN: 시스템 현재 시간을 '2025-12-25'로 변경하여 준비
        // DESC: 이 테스트만 현재시간 변경 => 변경 후 유틸 호출
        vi.setSystemTime(new Date("2025-12-25"));

        // GIVEN: 2025년 6월 데이터를 준비
        const date = mockGetMothYear("2025-06-15");
        // WHEN: resetMonthYear 함수를 실행
        const result = resetMonthYear(date);

        // THEN: 연도와 월이 변경된 시스템 현재 시간인 '2025-12'로 초기화되었는지 확인
        expect(result.year).toBe("2025");
        expect(result.month).toBe("12");
      });

      test("2025-01-05으로 초기화함.", () => {
        // GIVEN: 시스템 현재 시간을 '2025-01-05'로 변경하여 준비
        vi.setSystemTime(new Date("2025-01-05"));

        // GIVEN: 2024년 12월 데이터를 준비
        const date = mockGetMothYear("2024-12-31");
        // WHEN: resetMonthYear 함수를 실행
        const result = resetMonthYear(date);

        // THEN: 연도와 월이 변경된 시스템 현재 시간인 '2025-01'으로 초기화되었는지 확인
        expect(result.year).toBe("2025");
        expect(result.month).toBe("01");
      });

      test("2024-02-20으로 초기화함.", () => {
        // GIVEN: 시스템 현재 시간을 '2024-02-20'으로 변경하여 준비
        vi.setSystemTime(new Date("2024-02-20"));

        // GIVEN: 2024년 1월 데이터를 준비
        const date = mockGetMothYear("2024-01-15");
        // WHEN: resetMonthYear 함수를 실행
        const result = resetMonthYear(date);

        // THEN: 연도와 월이 변경된 시스템 현재 시간인 '2024-02'로 초기화되었는지 확인
        expect(result.year).toBe("2024");
        expect(result.month).toBe("02");
      });
    });
  });
});
