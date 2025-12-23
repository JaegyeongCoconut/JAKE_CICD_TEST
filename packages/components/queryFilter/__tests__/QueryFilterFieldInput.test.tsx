import type { ComponentProps } from "react";
import React from "react";

import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi, beforeEach } from "vitest";

import { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import type { Languages } from "@repo/types";

import type Input from "@packages/input/Input";
import QueryFilterFieldInput from "@packages/queryFilter/containers/row/containers/field/containers/control/containers/input/QueryFilterFieldInput";
import type * as StyledType from "@packages/queryFilter/containers/row/containers/field/containers/control/containers/input/QueryFilterFieldInput.styled";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

// DESC: useTypedQueryFilterState Hook Mock (필터 상태 조회)
const mockUseTypedQueryFilterState = vi.fn();
vi.mock("@repo/hooks/queryFilter/useTypedQueryFilterState", () => ({
  default: (args: unknown) => mockUseTypedQueryFilterState(args),
}));
// DESC: Styled Components Mock
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/control/containers/input/QueryFilterFieldInput.styled",
  () => {
    // GIVEN: Wrapper Mock (폼 구조 확인용)
    const MockStyledQueryFilterFieldInputWrapper = (
      props: ComponentProps<typeof StyledType.QueryFilterFieldInputWrapper>,
    ) => <form>{props.children}</form>;
    // GIVEN: Apply Button Mock (onMouseDown 핸들러 및 data-testid 확인용)
    const MockStyledQueryFilterFieldInputApplyButton = (
      props: ComponentProps<typeof StyledType.QueryFilterFieldInputApplyButton>,
    ) => (
      <button data-testid="test-apply-button" onMouseDown={props.onMouseDown}>
        {props.children}
      </button>
    );
    return {
      QueryFilterFieldInputWrapper: MockStyledQueryFilterFieldInputWrapper,
      QueryFilterFieldInputApplyButton:
        MockStyledQueryFilterFieldInputApplyButton,
      input: {},
    };
  },
);
// DESC: useQueryFilterFieldInput Hook Mock (로컬 상태 및 이벤트 핸들러)
const { createHookReturn, mockUseQueryFilterFieldInput } = vi.hoisted(() => {
  const createHookReturn = () => ({
    localInputValue: "",
    isVisible: false,
    handleInputFocus: vi.fn(),
    handleInputBlur: vi.fn(),
    handleInputChange: vi.fn(),
    handleInputSearch: vi.fn(() => vi.fn()),
    handleApplyButtonMouseDown: vi.fn(() => vi.fn()),
  });
  // GIVEN: hook의 기본 반환 값 및 Mock 함수 생성
  const mockUseQueryFilterFieldInput = vi.fn(createHookReturn);

  return { createHookReturn, mockUseQueryFilterFieldInput };
});
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/control/containers/input/hooks/useQueryFilterFieldInput",
  () => ({ default: mockUseQueryFilterFieldInput }),
);
// DESC: Input Mock
const inputProps: ComponentProps<typeof Input>[] = [];
vi.mock("@packages/input/Input", () => ({
  default: (props: ComponentProps<typeof Input>) => {
    // GIVEN: Input에 전달되는 props 캡처
    inputProps.push(props);

    // GIVEN: 사용자 이벤트 시뮬레이션 및 props 확인용 input 요소 렌더링
    return (
      <input
        data-testid="test-input"
        disabled={props.disabled}
        value={props.value}
        maxLength={props.maxLength}
        onBlur={props.handleBlur}
        onChange={props.handleChange}
        onFocus={props.handleFocus}
      />
    );
  },
}));

beforeEach(() => {
  // GIVEN: 각 테스트 전 Input props 배열 초기화
  inputProps.length = 0;
});

describe("QueryFilterFieldInput Test", () => {
  const user = userEvent.setup();

  const baseFilter = {
    type: QUERY_FILTER_TYPE.INPUT,
    queryKey: "code" as const,
    label: "Code" as Languages,
    placeholder: "코드를 입력하세요" as Languages,
    inputValue: "",
    maxLength: 10,
    tagValue: "",
  };

  test("queryFilter가 undefined이면 null을 반환함", () => {
    // GIVEN: useTypedQueryFilterState가 undefined 반환 (필터 정보 없음)
    mockUseTypedQueryFilterState.mockReturnValue(undefined);

    // WHEN: 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: (
        <QueryFilterFieldInput
          disabled={false}
          queryKey={baseFilter.queryKey}
          type={QUERY_FILTER_TYPE.INPUT}
        />
      ),
    });

    // THEN: 아무것도 렌더링되지 않음
    expect(container.firstChild).toBeNull();
    // THEN: 필터 상태 조회를 위해 hook이 올바른 인자로 호출되었는지 확인
    expect(mockUseTypedQueryFilterState).toHaveBeenCalledWith({
      type: QUERY_FILTER_TYPE.INPUT,
      queryKey: baseFilter.queryKey,
    });
  });

  test("초기 렌더 시 wrapper 구조와 Input props가 올바르게 전달됨", () => {
    // GIVEN: 기본 필터 상태 반환
    mockUseTypedQueryFilterState.mockReturnValue(baseFilter);
    // GIVEN: hook 상태 설정 (localInputValue='ABC', isVisible=true)
    mockUseQueryFilterFieldInput.mockReturnValue({
      ...createHookReturn(),
      localInputValue: "ABC",
      isVisible: true,
    });

    // WHEN: 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: (
        <QueryFilterFieldInput
          disabled={false}
          queryKey={baseFilter.queryKey}
          type={QUERY_FILTER_TYPE.INPUT}
        />
      ),
    });

    expect(container.children).toHaveLength(1);

    const wrapper = container.children[0];

    // THEN: 1. Wrapper (form) 아래 Input과 Apply Button 두 개의 자식 요소가 존재
    expect(wrapper.children).toHaveLength(2);

    const input = wrapper.children[0];
    const applyButton = wrapper.children[1];

    expect(input).toBeInTheDocument();

    const [props] = inputProps;

    // THEN: 2. Input props가 hook 상태 및 필터 설정에 따라 올바르게 전달되었는지 확인
    expect(props.disabled).toBe(false);
    expect(props.value).toBe("ABC");
    expect(props.maxLength).toBe(baseFilter.maxLength);
    // THEN: 3. Apply 버튼 텍스트에 대한 언어 처리 hook 호출 확인
    expect(mockDefaultLanguage).toHaveBeenCalledWith({
      text: LANGUAGE_LABEL.APPLY,
    });

    expect(applyButton).toBeInTheDocument();
  });

  test("버튼이 보이는 상태에서 Apply 버튼 mouse down 시 handleApplyButtonMouseDown이 queryKey와 함께 호출됨", async () => {
    // GIVEN: handleApplyButtonMouseDown의 내부 핸들러 Mock
    const mockApplyMouseDown = vi.fn();
    const mockHandleApplyButtonMouseDown = vi.fn(() => mockApplyMouseDown);

    // GIVEN: hook 상태 설정 (isVisible=true, 커스텀 핸들러 사용)
    mockUseTypedQueryFilterState.mockReturnValue(baseFilter);
    mockUseQueryFilterFieldInput.mockReturnValue({
      ...createHookReturn(),
      localInputValue: "ABC",
      isVisible: true,
      handleApplyButtonMouseDown: mockHandleApplyButtonMouseDown,
    });

    // WHEN: 컴포넌트 렌더링
    const { getByTestId } = renderComponent({
      ui: (
        <QueryFilterFieldInput
          disabled={false}
          queryKey={baseFilter.queryKey}
          type={QUERY_FILTER_TYPE.INPUT}
        />
      ),
    });

    // THEN: 1. handleApplyButtonMouseDown이 queryKey와 함께 호출되어 내부 핸들러를 생성했는지 확인
    expect(mockHandleApplyButtonMouseDown).toHaveBeenCalledWith(
      baseFilter.queryKey,
    );

    // WHEN: Apply 버튼 클릭 (실제로는 onMouseDown 이벤트)
    // NOTE: user.click은 onMouseDown -> onMouseUp -> onClick 순서로 이벤트를 발생시키며, Mock에서 onMouseDown을 캡처하므로 user.click 사용
    await user.click(getByTestId("test-apply-button"));

    // THEN: 2. 생성된 내부 핸들러(mockApplyMouseDown)가 실행되었는지 확인
    expect(mockApplyMouseDown).toHaveBeenCalledOnce();
  });

  test("Input 이벤트가 각 핸들러에 연결됨(handleInputFocus/Blur/Change)", async () => {
    // GIVEN: 개별 Input 이벤트 핸들러 Mock 설정
    const mockHandleInputFocus = vi.fn();
    const mockHandleInputBlur = vi.fn();
    const mockHandleInputChange = vi.fn();

    // GIVEN: hook 상태에 Mock 핸들러 연결
    mockUseTypedQueryFilterState.mockReturnValue(baseFilter);
    mockUseQueryFilterFieldInput.mockReturnValue({
      ...createHookReturn(),
      handleInputFocus: mockHandleInputFocus,
      handleInputBlur: mockHandleInputBlur,
      handleInputChange: mockHandleInputChange,
    });

    // WHEN: 컴포넌트 렌더링
    renderComponent({
      ui: (
        <QueryFilterFieldInput
          disabled={false}
          queryKey={baseFilter.queryKey}
          type={QUERY_FILTER_TYPE.INPUT}
        />
      ),
    });

    const [props] = inputProps;

    // WHEN: 1. Input의 Focus 이벤트 발생
    props.handleFocus?.(new FocusEvent("focus") as never);
    // THEN: hook의 handleInputFocus가 호출되었는지 확인
    expect(mockHandleInputFocus).toHaveBeenCalledOnce();

    // WHEN: 2. Input의 Blur 이벤트 발생
    props.handleBlur?.(new FocusEvent("blur") as never);
    // THEN: hook의 handleInputBlur가 호출되었는지 확인
    expect(mockHandleInputBlur).toHaveBeenCalledOnce();

    // WHEN: 3. Input의 Change 이벤트 발생
    props.handleChange?.({ target: { value: "A" } } as never);
    // THEN: hook의 handleInputChange가 호출되었는지 확인
    expect(mockHandleInputChange).toHaveBeenCalled();
  });
});
