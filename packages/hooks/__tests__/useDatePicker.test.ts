import { act, renderHook } from "@testing-library/react";
import dayjs from "dayjs";
import { vi, describe, test, expect } from "vitest";

import * as calendarUtils from "@repo/utils/calendar";
import type { GetMonthYearReturnType } from "@repo/utils/calendar";

import useDatePicker from "@packages/hooks/useDatePicker";

// GIVEN: calendarUtils.getMonthYear의 반환 값(MonthYear 객체)을 Mocking하는 헬퍼 함수
const mockMonthYear = (iso: string): GetMonthYearReturnType => ({
  month: dayjs(iso).format("MM"),
  year: dayjs(iso).format("YYYY"),
  value: dayjs(iso),
  startDate: dayjs(iso),
  date: dayjs(iso).format("DD"),
  currentMonth: dayjs(iso).format("MM"),
  currentYear: dayjs(iso).format("YYYY"),
  isCurrentMonthYear: true,
  currentStartDate: dayjs(iso),
  prevMonthStartDate: dayjs(iso).subtract(1, "month").startOf("month"),
  nextMonthStartDate: dayjs(iso).add(1, "month").startOf("month"),
  frstDayOfMonth: dayjs(iso).startOf("month").day(),
  lastDate: dayjs(iso).daysInMonth(),
  prevMonthLastDate: dayjs(iso).subtract(1, "month").daysInMonth(),
  firstWeekPrevMonthDate: dayjs(iso).startOf("month").startOf("week"),
});

describe("useDatePicker Test", () => {
  test("올바른 초기 monthYear 상태를 설정하는지 확인.", () => {
    // GIVEN: 초기 MonthYear Mock 값 (2025-10-01)
    const initMonthYear = mockMonthYear("2025-10-01");
    // GIVEN: hook에 전달할 Props
    const initialProps = { initDate: ["01/10/2025"], handleChange: vi.fn() };
    // GIVEN: 초기 렌더링 시 호출되는 getMonthYear 유틸리티를 Mocking
    const spyGetMonthYear = vi
      .spyOn(calendarUtils, "getMonthYear")
      .mockReturnValueOnce(initMonthYear);

    // WHEN: hook 렌더링
    const { result } = renderHook(() => useDatePicker(initialProps));

    // THEN: getMonthYear가 초기 1회 호출되었는지 확인
    expect(spyGetMonthYear).toHaveBeenCalledTimes(1);
    // THEN: monthYear 상태가 Mock 값과 정확히 일치하는지 확인
    expect(result.current.monthYear).toEqual(initMonthYear);
  });

  test("handleMonthChange를 호출하면 선택한 월로 상태가 업데이트됨.", () => {
    // GIVEN: 목표 월(1월) 및 변경 후 기대 MonthYear (2025-01-01)
    const targetMonth = 1;
    const nextMonthYear = mockMonthYear("2025-01-01");
    const initialMockMonthYear = mockMonthYear("2025-10-01");

    // GIVEN: getMonthYear 유틸리티를 스파이하여 두 번의 호출을 제어
    const spyGetMonthYear = vi.spyOn(calendarUtils, "getMonthYear");
    spyGetMonthYear
      .mockReturnValueOnce(initialMockMonthYear) // DESC: 1. 초기 렌더링 시 반환 (10월)
      .mockReturnValueOnce(nextMonthYear); // DESC: 2. handleMonthChange 호출 시 반환 (1월)

    // WHEN: hook 렌더링 (초기 상태 10월)
    const { result } = renderHook(() =>
      useDatePicker({ initDate: ["01/10/2025"], handleChange: vi.fn() }),
    );

    // WHEN: 월 변경 핸들러 호출 (1월로)
    act(() => {
      result.current.handleMonthChange(targetMonth);
    });

    // THEN: monthYear 상태가 1월 데이터로 업데이트 되었는지 확인
    expect(result.current.monthYear).toEqual(nextMonthYear);
    // THEN: 두 번째 getMonthYear 호출 시 인자가 2025-01-01을 포함하는지 확인
    expect(spyGetMonthYear).toHaveBeenNthCalledWith(2, dayjs("2025-01-01"));
  });

  test("handlePrevMonthChange를 호출하면 이전 달로 이동.", () => {
    // GIVEN: 이전 달 (2025-09-01)의 기대 MonthYear
    const previousMonth = mockMonthYear("2025-09-01");
    const initialProps = { initDate: ["01/10/2025"], handleChange: vi.fn() };
    // GIVEN: getNewMonth 유틸리티를 Mocking하여 이전 달 데이터 반환
    const spyGetNewMonth = vi
      .spyOn(calendarUtils, "getNewMonth")
      .mockReturnValueOnce(previousMonth);

    // WHEN: hook 렌더링
    const { result } = renderHook(() => useDatePicker(initialProps));

    // WHEN: 이전 달 이동 핸들러 호출
    act(() => {
      result.current.handlePrevMonthChange();
    });

    // THEN: getNewMonth가 1회 호출되었는지 확인
    expect(spyGetNewMonth).toHaveBeenCalledTimes(1);
    // THEN: monthYear 상태가 이전 달 데이터로 변경되었는지 확인
    expect(result.current.monthYear).toEqual(previousMonth);
  });

  test("handleNextMonthChange를 호출하면 다음 달로 이동.", () => {
    // GIVEN: 다음 달 (2025-11-01)의 기대 MonthYear
    const nextMonth = mockMonthYear("2025-11-01");
    const initialProps = { initDate: ["01/10/2025"], handleChange: vi.fn() };
    // GIVEN: getNewMonth 유틸리티를 Mocking하여 다음 달 데이터 반환
    const spyGetNewMonth = vi
      .spyOn(calendarUtils, "getNewMonth")
      .mockReturnValueOnce(nextMonth);

    // WHEN: hook 렌더링
    const { result } = renderHook(() => useDatePicker(initialProps));

    // WHEN: 다음 달 이동 핸들러 호출
    act(() => {
      result.current.handleNextMonthChange();
    });

    // THEN: getNewMonth가 1회 호출되었는지 확인
    expect(spyGetNewMonth).toHaveBeenCalledTimes(1);
    // THEN: monthYear 상태가 다음 달 데이터로 변경되었는지 확인
    expect(result.current.monthYear).toEqual(nextMonth);
  });

  test("handlePrevYearChange를 호출하면 이전 해로 이동.", () => {
    // GIVEN: 이전 해 (2024-10-01)의 기대 MonthYear
    const previousYear = mockMonthYear("2024-10-01");
    const initialProps = { initDate: ["01/10/2025"], handleChange: vi.fn() };
    // GIVEN: getNewYear 유틸리티를 Mocking하여 이전 해 데이터 반환
    const spyGetNewYear = vi
      .spyOn(calendarUtils, "getNewYear")
      .mockReturnValueOnce(previousYear);

    // WHEN: hook 렌더링
    const { result } = renderHook(() => useDatePicker(initialProps));

    // WHEN: 이전 해 이동 핸들러 호출
    act(() => {
      result.current.handlePrevYearChange();
    });

    // THEN: getNewYear가 1회 호출되었는지 확인
    expect(spyGetNewYear).toHaveBeenCalledTimes(1);
    // THEN: monthYear 상태가 이전 해 데이터로 변경되었는지 확인
    expect(result.current.monthYear).toEqual(previousYear);
  });

  test("handleNextYearChange를 호출하면 다음 해로 이동.", () => {
    // GIVEN: 다음 해 (2026-10-01)의 기대 MonthYear
    const nextYear = mockMonthYear("2026-10-01");
    const initialProps = { initDate: ["01/10/2025"], handleChange: vi.fn() };
    // GIVEN: getNewYear 유틸리티를 Mocking하여 다음 해 데이터 반환
    const spyGetNewYear = vi
      .spyOn(calendarUtils, "getNewYear")
      .mockReturnValueOnce(nextYear);

    // WHEN: hook 렌더링
    const { result } = renderHook(() => useDatePicker(initialProps));

    // WHEN: 다음 해 이동 핸들러 호출
    act(() => {
      result.current.handleNextYearChange();
    });

    // THEN: getNewYear가 1회 호출되었는지 확인
    expect(spyGetNewYear).toHaveBeenCalledTimes(1);
    // THEN: monthYear 상태가 다음 해 데이터로 변경되었는지 확인
    expect(result.current.monthYear).toEqual(nextYear);
  });

  test("handleDateChange를 호출하면 props로 받은 handleChange를 호출함.", () => {
    // GIVEN: Mock handleChange 콜백
    const mockHandleChange = vi.fn();
    const initialProps = {
      initDate: ["01/10/2025"],
      handleChange: mockHandleChange,
    };
    // GIVEN: hook 렌더링
    const { result } = renderHook(() => useDatePicker(initialProps));

    // GIVEN: 선택한 날짜 배열 Mock
    const mockDates = [dayjs("2025-10-15"), dayjs("2025-10-18")];

    // WHEN: 날짜 변경 핸들러 호출
    act(() => {
      result.current.handleDateChange(mockDates);
    });

    // THEN: 외부 handleChange 콜백이 1회 호출되었는지 확인
    expect(mockHandleChange).toHaveBeenCalledTimes(1);
    // THEN: 콜백에 선택한 날짜 배열이 정확히 전달되었는지 확인
    expect(mockHandleChange).toHaveBeenCalledWith(mockDates);
  });

  test("handleResetMonthYear를 호출하면 초기 상태로 돌아감.", () => {
    // GIVEN: 초기 MonthYear (10월) Mock
    const initMockMonthYear = mockMonthYear("2025-10-01");
    const initialProps = { initDate: ["01/10/2025"], handleChange: vi.fn() };

    // GIVEN: getMonthYear Mock (초기 렌더링용)
    const spyGetMonthYear = vi
      .spyOn(calendarUtils, "getMonthYear")
      .mockReturnValueOnce(initMockMonthYear);
    // GIVEN: resetMonthYear 유틸리티를 스파이
    const spyResetMonthYear = vi.spyOn(calendarUtils, "resetMonthYear");

    // WHEN: hook 렌더링
    const { result } = renderHook(() => useDatePicker(initialProps));

    // WHEN: 리셋 핸들러 호출 (상태 변화를 유도)
    act(() => {
      result.current.handleResetMonthYear();
    });

    // THEN: getMonthYear가 초기 렌더링과 리셋 시 두 번 호출되었는지 확인
    expect(spyGetMonthYear).toHaveBeenCalledTimes(2);

    // THEN: resetMonthYear가 1회 호출되었는지 확인
    expect(spyResetMonthYear).toHaveBeenCalledTimes(1);
    // THEN: resetMonthYear에 초기 MonthYear 객체가 인자로 전달되었는지 확인
    expect(spyResetMonthYear).toHaveBeenCalledWith(initMockMonthYear);
  });
});
