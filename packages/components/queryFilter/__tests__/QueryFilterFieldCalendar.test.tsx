import type { ComponentProps, ReactNode } from "react";
import React from "react";

import { describe, expect, test, vi, beforeEach } from "vitest";

import { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import type { Languages } from "@repo/types";

import type CalendarInput from "@packages/input/calendar/CalendarInput";
import QueryFilterFieldCalendar from "@packages/queryFilter/containers/row/containers/field/containers/control/containers/calendar/QueryFilterFieldCalendar";
import type * as StyledType from "@packages/queryFilter/containers/row/containers/field/containers/control/containers/calendar/QueryFilterFieldCalendar.styled";
import { QueryFilterFieldStateContext } from "@packages/queryFilter/containers/row/containers/field/context/QueryFilterFieldStateContext";

import renderComponent from "@tests/renderComponent";

// DESC: useTypedQueryFilterState Hook Mock (필터 상태 조회)
const mockUseTypedQueryFilterState = vi.fn();
vi.mock("@repo/hooks/queryFilter/useTypedQueryFilterState", () => ({
  default: (args: unknown) => mockUseTypedQueryFilterState(args),
}));
// DESC: Styled Component Mock (Wrapper의 disabled prop 확인용)
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/control/containers/calendar/QueryFilterFieldCalendar.styled",
  () => {
    // GIVEN: disabled prop 확인용
    const MockStyledQueryFilterFieldCalendarWrapper = (
      props: ComponentProps<typeof StyledType.QueryFilterFieldCalendarWrapper>,
    ) => <div data-disabled={props.disabled}>{props.children}</div>;

    return {
      QueryFilterFieldCalendarWrapper:
        MockStyledQueryFilterFieldCalendarWrapper,
      calendar: {},
    };
  },
);
// DESC: useQueryFilterFieldCalendar Hook Mock (날짜 변경 핸들러 생성)
const mockHandleDateChange = vi.fn(() => vi.fn());
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/control/containers/calendar/hooks/useQueryFilterFieldCalendar",
  () => ({
    default: vi.fn(() => ({ handleDateChange: mockHandleDateChange })),
  }),
);
// DESC: CalendarInput Mock
const calendarInputProps: ComponentProps<typeof CalendarInput>[] = [];
vi.mock("@packages/input/calendar/CalendarInput", () => ({
  default: (props: ComponentProps<typeof CalendarInput>) => {
    // GIVEN: CalendarInput에 전달되는 props 캡처
    calendarInputProps.push(props);

    // GIVEN: disabled 및 value 확인용
    return <div data-disabled={props.disabled} data-value={props.value} />;
  },
}));
// DESC: QueryFilterFieldStateContext Mock (Focus/Blur 핸들러 테스트용)
const mockContextValue = {
  handleBlur: vi.fn(),
  handleFocus: vi.fn(),
  hasError: false,
  isFocused: false,
  handleErrorClear: () => {},
  onSetError: () => {},
};
// DESC: Context Provider를 사용하여 컴포넌트를 렌더링하는 헬퍼 함수
const renderWithProvider = (children: ReactNode) =>
  renderComponent({
    ui: (
      <QueryFilterFieldStateContext.Provider value={mockContextValue}>
        {children}
      </QueryFilterFieldStateContext.Provider>
    ),
  });

beforeEach(() => {
  // GIVEN: 각 테스트 전 CalendarInput props 초기화
  calendarInputProps.length = 0;
});

describe("QueryFilterFieldCalendar", () => {
  // GIVEN: 기본 캘린더 필터 상태 (기간 선택: free)
  const baseFilter = {
    type: QUERY_FILTER_TYPE.CALENDAR,
    queryKey: "created" as const,
    label: "Created" as Languages,
    placeholder: "날짜" as Languages,
    calendarType: "free" as const,
    tagValue: ["2024-01-01", "2024-01-02"],
  };

  test("queryFilter가 undefined이면 null을 반환함", () => {
    // GIVEN: useTypedQueryFilterState가 필터 정보(undefined)를 반환
    mockUseTypedQueryFilterState.mockReturnValue(undefined);

    // WHEN: 컴포넌트 렌더링
    const { container } = renderWithProvider(
      <QueryFilterFieldCalendar
        disabled={false}
        calendarType="free"
        queryKey={baseFilter.queryKey}
        type={QUERY_FILTER_TYPE.CALENDAR}
      />,
    );

    // THEN: 컴포넌트가 null을 반환하여 DOM에 아무것도 렌더링되지 않음
    expect(container.firstChild).toBeNull();
    // THEN: 필터 상태 조회를 위해 훅이 올바른 인자로 호출되었는지 확인
    expect(mockUseTypedQueryFilterState).toHaveBeenCalledWith({
      type: QUERY_FILTER_TYPE.CALENDAR,
      queryKey: baseFilter.queryKey,
    });
  });

  test("비활성화가 아닐 때, tagValue로부터 포맷된 value와 핸들러들이 CalendarInput에 전달됨 (calendarType=free)", () => {
    // GIVEN: 기본 필터 상태 반환 (기간 선택 모드)
    mockUseTypedQueryFilterState.mockReturnValue(baseFilter);

    // WHEN: disabled=false로 컴포넌트 렌더링
    const { container } = renderWithProvider(
      <QueryFilterFieldCalendar
        disabled={false}
        calendarType="free"
        queryKey={baseFilter.queryKey}
        type={QUERY_FILTER_TYPE.CALENDAR}
      />,
    );

    expect(container.children).toHaveLength(1);

    const wrapper = container.children[0];

    // THEN: 1. Wrapper의 렌더 확인
    expect(wrapper).toBeInTheDocument();
    // THEN: 2. Wrapper의 disabled 상태 확인
    expect(wrapper).toHaveAttribute("data-disabled", "false");
    expect(wrapper.children).toHaveLength(1);

    const calendarInput = wrapper.children[0];

    expect(calendarInput).toBeInTheDocument();

    const [props] = calendarInputProps;

    // THEN: 3. CalendarInput props 확인
    expect(props.disabled).toBe(false);
    expect(props.value).toBe("2024-01-01 ~ 2024-01-02"); // DESC: tagValue가 범위 형식으로 포맷되어 전달됨
    expect(props.selectedDate).toEqual(baseFilter.tagValue);
    expect(props.placeholder).toBe(baseFilter.placeholder);
    expect(props.type).toBe("free");

    // THEN: 4. Focus/Blur 핸들러 호출 시 Context의 핸들러가 호출되는지 확인
    props.handleConditionFocus?.();
    props.handleConditionBlur?.();

    expect(mockContextValue.handleFocus).toHaveBeenCalledOnce();
    expect(mockContextValue.handleBlur).toHaveBeenCalledOnce();
    // THEN: 5. 날짜 변경 핸들러 생성을 위해 훅이 올바른 인자로 호출되었는지 확인
    expect(mockHandleDateChange).toHaveBeenCalledWith(baseFilter.queryKey);
  });

  test("calendarType=date일 때 value는 startDate만 전달됨", () => {
    // GIVEN: calendarType='date' 및 단일 tagValue 상태 반환 (단일 날짜 선택 모드)
    mockUseTypedQueryFilterState.mockReturnValue({
      ...baseFilter,
      calendarType: "date" as const,
      tagValue: ["2024-03-01"],
    });

    // WHEN: calendarType="date"로 컴포넌트 렌더링
    const { container } = renderWithProvider(
      <QueryFilterFieldCalendar
        disabled={false}
        calendarType="date"
        queryKey={baseFilter.queryKey}
        type={QUERY_FILTER_TYPE.CALENDAR}
      />,
    );

    expect(container.children).toHaveLength(1);

    const wrapper = container.children[0];

    expect(wrapper.children).toHaveLength(1);

    const calendarInput = wrapper.children[0];

    expect(calendarInput).toBeInTheDocument();

    const [props] = calendarInputProps;

    // THEN: value에 단일 날짜만 표시됨
    expect(props.value).toBe("2024-03-01");
    expect(props.selectedDate).toEqual(["2024-03-01"]);
  });

  test("disabled=true이면 빈 값과 disabled 상태로 CalendarInput이 렌더되고 핸들러는 전달되지 않음", () => {
    // GIVEN: 기본 필터 상태 반환
    mockUseTypedQueryFilterState.mockReturnValue(baseFilter);

    // WHEN: disabled=true로 컴포넌트 렌더링
    const { container } = renderWithProvider(
      <QueryFilterFieldCalendar
        disabled
        calendarType="free"
        queryKey={baseFilter.queryKey}
        type={QUERY_FILTER_TYPE.CALENDAR}
      />,
    );

    expect(container.children).toHaveLength(1);

    const wrapper = container.children[0];

    // THEN: 1. Wrapper의 렌더 확인
    expect(wrapper).toBeInTheDocument();
    // THEN: 2. Wrapper의 disabled 상태 확인
    expect(wrapper).toHaveAttribute("data-disabled", "true");
    expect(wrapper.children).toHaveLength(1);

    const calendarInput = wrapper.children[0];

    expect(calendarInput).toBeInTheDocument();

    const [props] = calendarInputProps;

    // THEN: 3. CalendarInput props 확인
    expect(props.disabled).toBe(true);
    expect(props.value).toBe(""); // DESC: 비활성화 시 value는 빈 문자열로 초기화됨
    expect(props.placeholder).toBe(baseFilter.placeholder);
    // THEN: 4. 비활성화 시 이벤트 핸들러가 전달되지 않음
    expect(props.handleConditionFocus).toBeUndefined();
    expect(props.handleConditionBlur).toBeUndefined();
    expect(props.handleDateChange).toBeUndefined();
  });
});
