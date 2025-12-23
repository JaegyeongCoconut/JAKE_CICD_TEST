import { act, renderHook } from "@testing-library/react";
import dayjs from "dayjs";
import { beforeEach, describe, expect, test, vi } from "vitest";

import type { Languages } from "@repo/types";
import * as DateUtils from "@repo/utils/date";

import useQueryFilterFieldCalendar from "@packages/queryFilter/containers/row/containers/field/containers/control/containers/calendar/hooks/useQueryFilterFieldCalendar";

// DESC: useQueryFilterStateStore의 mock 상태 정의 및 함수 추적
const mockUseQueryFilterStateStore = {
  queryFilters: {},
  onUpdateTagValue: vi.fn(), // DESC: 상태 업데이트 함수 Mock
};
// DESC: useQueryFilterStateStore hook을 mock하여 실제 스토어 대신 mock 객체를 반환하도록 설정
vi.mock("@repo/stores/queryFilterState", () => ({
  useQueryFilterStateStore: (
    selector: (store: typeof mockUseQueryFilterStateStore) => unknown,
  ) => selector(mockUseQueryFilterStateStore),
}));

// DESC: DateUtils.formatLocalDateTime 유틸리티 함수를 Spy 및 Mocking하여 포맷된 날짜를 예측 가능하게 반환
const spyFormatLocalDateTime = vi.spyOn(DateUtils, "formatLocalDateTime");

// DESC: 각 테스트 이전에 formatLocalDateTime Mock 구현 설정
beforeEach(() => {
  // GIVEN: formatLocalDateTime의 Mock 구현
  // DESC: formatLocalDateTime의 내부 로직이 변경되었을 경우, 테스트에 영향을 미치지 않기 위해 테스트 함수의 정의 추가
  spyFormatLocalDateTime.mockImplementation(({ date }) => {
    // DESC: dayjs 객체가 아닌 경우 처리 (안정성)
    const dateString = dayjs.isDayjs(date) ? date.format("YYYY-MM-DD") : "";

    // DESC: 특정 날짜에 대한 예측 가능한 포맷된 값 반환 설정
    if (dateString === "2025-10-20") return "20/10/2025";
    if (dateString === "2025-10-30") return "30/10/2025";

    return "";
  });
});

describe("useQueryFilterFieldCalendar Test", () => {
  // GIVEN: 테스트에 사용될 기본 queryFilter 객체
  const queryFilter = {
    type: "calendar" as const,
    queryKey: "created" as const,
    calendarType: "free" as const,
    label: "Purchase date" as Languages,
    placeholder: "Select the date" as Languages,
    tagValue: [],
  };

  test("queryFilter=undefined라면, formatLocalDateTime와 onUpdateTagValue가 호출되지 않음", () => {
    // WHEN: queryFilter: undefined를 전달하여 hook 렌더링
    const { result } = renderHook(() =>
      useQueryFilterFieldCalendar({ queryFilter: undefined }),
    );

    // WHEN: handleDateChange 함수 호출 시도 (handleDateChange는 빈 배열([])을 인수로 받음)
    act(() => result.current.handleDateChange("queryKey")([]));

    // THEN: 날짜 포맷 함수는 호출되지 않아야 함
    expect(spyFormatLocalDateTime).not.toHaveBeenCalled();
    // THEN: 스토어 업데이트 함수(onUpdateTagValue)는 호출되지 않아야 함
    expect(
      mockUseQueryFilterStateStore.onUpdateTagValue,
    ).not.toHaveBeenCalled();
  });

  test("빈 날짜 배열을 전달하면, formatLocalDateTime 호출 없이 onUpdateTagValue가 빈 배열로 호출됨", () => {
    // GIVEN: hook 렌더링
    const { result } = renderHook(() =>
      useQueryFilterFieldCalendar({ queryFilter }),
    );

    // WHEN: handleDateChange 함수에 빈 날짜 배열을 전달
    act(() => result.current.handleDateChange("created")([]));

    // THEN: 날짜 포맷 함수는 호출되지 않아야 함
    expect(spyFormatLocalDateTime).not.toHaveBeenCalled();
    // THEN: onUpdateTagValue가 빈 배열([])로 호출되어 필터가 해제되었음을 알림
    expect(mockUseQueryFilterStateStore.onUpdateTagValue).toHaveBeenCalledWith({
      queryKey: "created",
      options: "array",
      selectedKey: [],
    });
  });

  test("유효한 날짜 배열을 전달하면, formatLocalDateTime가 호출되고 onUpdateTagValue가 포맷된 문자열로 호출됨", () => {
    // GIVEN: dayjs 객체로 구성된 유효한 날짜 배열
    const dates = [dayjs("2025-10-20"), dayjs("2025-10-30")];

    // WHEN: hook 렌더링
    const { result } = renderHook(() =>
      useQueryFilterFieldCalendar({ queryFilter }),
    );

    // WHEN: handleDateChange 함수에 날짜 배열을 전달
    act(() => result.current.handleDateChange("created")(dates));

    // THEN: 각 날짜에 대해 formatLocalDateTime 유틸리티가 호출되었는지 확인
    dates.forEach((date) =>
      expect(spyFormatLocalDateTime).toHaveBeenCalledWith({ date }),
    );
    // THEN: onUpdateTagValue가 Mock 구현에 따라 포맷된 날짜 문자열 배열로 호출되었는지 확인
    expect(mockUseQueryFilterStateStore.onUpdateTagValue).toHaveBeenCalledWith({
      queryKey: "created",
      options: "array",
      selectedKey: ["20/10/2025", "30/10/2025"],
    });
  });
});
