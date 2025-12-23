import type { ComponentProps } from "react";
import React, { forwardRef } from "react";

import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import type { Languages } from "@repo/types";

import QueryFilterFieldDropdown from "@packages/queryFilter/containers/row/containers/field/containers/control/containers/dropdown/QueryFilterFieldDropdown";
import type * as StyledType from "@packages/queryFilter/containers/row/containers/field/containers/control/containers/dropdown/QueryFilterFieldDropdown.styled";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

// DESC: Icon Mock (UI 요소 확인용)
vi.mock("@repo/assets/icon/ic_down.svg", () => ({
  ReactComponent: () => <svg data-testid="icon-down" />,
}));
vi.mock("@repo/assets/icon/ic_check.svg", () => ({
  ReactComponent: () => <svg data-testid="icon-check" />,
}));
// DESC: useTypedQueryFilterState Hook Mock (필터 상태 조회)
const mockUseTypedQueryFilterState = vi.fn();
vi.mock("@repo/hooks/queryFilter/useTypedQueryFilterState", () => ({
  default: (args: unknown) => mockUseTypedQueryFilterState(args),
}));
// DESC: useOnClickOutside Mock (드롭다운 외부 클릭 처리 확인용)
const mockUseOnClickOutside = vi.fn();
vi.mock("@repo/hooks/useOnClickOutside", () => ({
  default: (args: unknown) => mockUseOnClickOutside(args),
}));
// DESC: Styled Components Mock (DOM 구조 및 props 확인용)
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/control/containers/dropdown/QueryFilterFieldDropdown.styled",
  () => {
    // GIVEN: Dropdown Wrapper (ref 전달 확인용)
    const MockStyledQueryFilterFieldDropdown = forwardRef<
      HTMLDivElement,
      ComponentProps<typeof StyledType.QueryFilterFieldDropdown>
    >((props, ref) => <div ref={ref}>{props.children}</div>);
    MockStyledQueryFilterFieldDropdown.displayName =
      "MockStyledQueryFilterFieldDropdown";

    // GIVEN: Open Button Mock (isOpenDropdown, disabled, onClick 확인용)
    const MockStyledQueryFilterFieldDropdownOpenButton = (
      props: ComponentProps<
        typeof StyledType.QueryFilterFieldDropdownOpenButton
      >,
    ) => (
      <button
        data-is-open={props.isOpenDropdown}
        data-testid="test-open-button"
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );

    // GIVEN: Select Display Mock (선택된 값 표시 확인용)
    const MockStyledSelectQueryFilterFieldDropdown = (
      props: ComponentProps<typeof StyledType.SelectQueryFilterFieldDropdown>,
    ) => (
      <span data-is-selected={props.isSelected} data-testid="test-select">
        {props.children}
      </span>
    );

    // GIVEN: Dropdown List Wrapper Mock (목록 렌더링 확인용)
    const MockStyledQueryFilterFieldDropdownsWrapper = (
      props: ComponentProps<typeof StyledType.QueryFilterFieldDropdownsWrapper>,
    ) => <ul>{props.children}</ul>;

    // GIVEN: Dropdown Item Mock (선택 상태 및 클릭 핸들러 확인용)
    const MockStyledQueryFilterFieldDropdownItem = (
      props: ComponentProps<typeof StyledType.QueryFilterFieldDropdownItem>,
    ) => (
      <button
        data-is-selected={props.isSelected}
        data-testid={`test-item-${props.isSelected ? "selected" : "option"}`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );

    return {
      QueryFilterFieldDropdown: MockStyledQueryFilterFieldDropdown,
      QueryFilterFieldDropdownOpenButton:
        MockStyledQueryFilterFieldDropdownOpenButton,
      SelectQueryFilterFieldDropdown: MockStyledSelectQueryFilterFieldDropdown,
      QueryFilterFieldDropdownsWrapper:
        MockStyledQueryFilterFieldDropdownsWrapper,
      QueryFilterFieldDropdownItem: MockStyledQueryFilterFieldDropdownItem,
      checkeIcon: {},
    };
  },
);
// DESC: useQueryFilterFieldDropdown Hook Mock (드롭다운 로직)
const mockHandleDropdownOpen = vi.fn();
const mockHandleDropdownClose = vi.fn();
const mockHandleDropdownOptionInner = vi.fn();
const mockHandleDropdownOptionClick = vi.fn(
  () => mockHandleDropdownOptionInner,
);
const mockUseQueryFilterFieldDropdown = vi.fn(() => ({
  isOpenDropdown: false,
  handleDropdownOpen: mockHandleDropdownOpen,
  handleDropdownClose: mockHandleDropdownClose,
  handleDropdownOptionClick: mockHandleDropdownOptionClick,
}));
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/control/containers/dropdown/hooks/useQueryFilterFieldDropdown",
  () => ({ default: () => mockUseQueryFilterFieldDropdown() }),
);

describe("QueryFilterFieldDropdown Test", () => {
  const user = userEvent.setup();

  const selections = [
    { key: "a", label: "Alpha" as Languages },
    { key: "b", label: "Beta" as Languages },
  ] as const;

  const baseFilter = {
    type: QUERY_FILTER_TYPE.DROPDOWN,
    queryKey: "type" as const,
    label: "Type" as Languages,
    placeholder: "Select" as Languages,
    selections,
    tagValue: "", // DESC: 초기에는 선택된 값 없음
  };

  test("queryFilter가 undefined이면 null을 반환함", () => {
    // GIVEN: useTypedQueryFilterState가 undefined 반환 (필터 정보 없음)
    mockUseTypedQueryFilterState.mockReturnValue(undefined);

    // WHEN: 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: (
        <QueryFilterFieldDropdown
          disabled={false}
          queryKey={baseFilter.queryKey}
          selections={selections}
          type={QUERY_FILTER_TYPE.DROPDOWN}
        />
      ),
    });

    // THEN: 아무것도 렌더링되지 않음
    expect(container.firstChild).toBeNull();
    // THEN: 필터 상태 조회를 위해 훅이 올바른 인자로 호출되었는지 확인
    expect(mockUseTypedQueryFilterState).toHaveBeenCalledWith({
      type: QUERY_FILTER_TYPE.DROPDOWN,
      queryKey: baseFilter.queryKey,
    });
  });

  test("초기 렌더 시 container 구조와 자식 요소 순서가 올바르게 렌더됨", () => {
    // GIVEN: 기본 필터 상태 및 훅 상태 (닫힘) 반환
    mockUseTypedQueryFilterState.mockReturnValue(baseFilter);
    mockUseQueryFilterFieldDropdown.mockReturnValue({
      isOpenDropdown: false,
      handleDropdownOpen: mockHandleDropdownOpen,
      handleDropdownClose: mockHandleDropdownClose,
      handleDropdownOptionClick: mockHandleDropdownOptionClick,
    });

    // WHEN: 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: (
        <QueryFilterFieldDropdown
          disabled={false}
          queryKey={baseFilter.queryKey}
          selections={selections}
          type={QUERY_FILTER_TYPE.DROPDOWN}
        />
      ),
    });

    const root = container.children[0];

    // THEN: 1. 루트는 Wrapper이고 자식은 OpenButton 하나만 존재
    expect(root.children).toHaveLength(1);

    const openButton = root.children[0];

    // THEN: 2. OpenButton은 Select 표시와 Down Icon을 자식으로 가짐
    expect(openButton.tagName).toBe("BUTTON");
    expect(openButton.children).toHaveLength(2);

    const [select, downIcon] = Array.from(openButton.children);

    expect(select.tagName).toBe("SPAN"); // DESC: Select 표시 영역
    expect(downIcon.tagName).toBe("svg"); // DESC: Down Icon
  });

  test("초기 렌더 시 isOpenDropdown=false이면 목록은 숨김 상태이고 버튼 클릭 시 handleDropdownOpen이 호출됨", async () => {
    // GIVEN: 기본 필터 상태 및 훅 상태 (닫힘) 반환
    mockUseTypedQueryFilterState.mockReturnValue(baseFilter);
    mockUseQueryFilterFieldDropdown.mockReturnValue({
      isOpenDropdown: false, // 닫힘 상태
      handleDropdownOpen: mockHandleDropdownOpen,
      handleDropdownClose: mockHandleDropdownClose,
      handleDropdownOptionClick: mockHandleDropdownOptionClick,
    });

    // WHEN: 컴포넌트 렌더링
    const { getByTestId, queryByTestId } = renderComponent({
      ui: (
        <QueryFilterFieldDropdown
          disabled={false}
          queryKey={baseFilter.queryKey}
          selections={selections}
          type={QUERY_FILTER_TYPE.DROPDOWN}
        />
      ),
    });

    const openButton = getByTestId("test-open-button");

    // THEN: 1. 버튼이 닫힘 상태로 표시
    expect(openButton).toHaveAttribute("data-is-open", "false");
    // THEN: 2. 목록이 DOM에 렌더링되지 않음
    expect(queryByTestId("dropdown-list")).not.toBeInTheDocument();
    // THEN: 3. 선택된 값이 없으므로 placeholder 텍스트가 표시됨
    expect(getByTestId("test-select")).toHaveTextContent("Select");
    expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: "Select" });

    // WHEN: 버튼 클릭
    await user.click(openButton);

    // THEN: 4. 드롭다운 열기 핸들러가 호출됨
    expect(mockHandleDropdownOpen).toHaveBeenCalledOnce();
  });

  test("isOpenDropdown=true이면 옵션 목록이 렌더되고 선택 여부 표시 및 클릭 핸들러가 호출됨", async () => {
    // GIVEN: 필터 상태 (tagValue='b'로 Beta 선택됨) 및 훅 상태 (열림) 반환
    mockUseTypedQueryFilterState.mockReturnValue({
      ...baseFilter,
      tagValue: "b", // Beta 선택
    });
    mockUseQueryFilterFieldDropdown.mockReturnValue({
      isOpenDropdown: true, // 열림 상태
      handleDropdownOpen: mockHandleDropdownOpen,
      handleDropdownClose: mockHandleDropdownClose,
      handleDropdownOptionClick: mockHandleDropdownOptionClick,
    });
    mockHandleDropdownOptionClick.mockReturnValue(
      mockHandleDropdownOptionInner,
    );

    // WHEN: 컴포넌트 렌더링
    const { getByTestId, getAllByTestId } = renderComponent({
      ui: (
        <QueryFilterFieldDropdown
          disabled={false}
          queryKey={baseFilter.queryKey}
          selections={selections}
          type={QUERY_FILTER_TYPE.DROPDOWN}
        />
      ),
    });

    // THEN: 1. 버튼이 열림 상태로 표시
    expect(getByTestId("test-open-button")).toHaveAttribute(
      "data-is-open",
      "true",
    );
    // THEN: 2. 옵션 목록이 렌더링되고 옵션 개수와 일치
    const options = getAllByTestId(/test-item-/);

    expect(options).toHaveLength(selections.length);

    // THEN: 3. 현재 선택된 옵션이 정확히 표시됨
    const selectedItem = getByTestId("test-item-selected");

    expect(selectedItem).toHaveAttribute("data-is-selected", "true");
    // THEN: 4. 버튼의 텍스트도 선택된 옵션의 라벨로 변경됨
    expect(getByTestId("test-select")).toHaveTextContent("Beta");
    expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: "Beta" });

    // WHEN: 열린 상태에서 버튼 클릭 (닫힘 시도)
    await user.click(getByTestId("test-open-button"));
    expect(mockHandleDropdownClose).toHaveBeenCalledOnce(); // DESC: 닫기 핸들러 호출 확인

    // WHEN: 옵션 중 하나 (Alpha, key: 'a') 클릭
    await user.click(options[0]); // DESC: options[0]은 Alpha

    // THEN: 5. 옵션 클릭 핸들러가 queryKey와 선택된 key와 함께 호출됨
    expect(mockHandleDropdownOptionClick).toHaveBeenCalledWith(
      baseFilter.queryKey,
      "a",
    );
    // THEN: 6. 내부 상태 변경 핸들러가 실행됨
    expect(mockHandleDropdownOptionInner).toHaveBeenCalledOnce();
    // THEN: 7. 선택된 항목에 체크 아이콘이 렌더링됨
    expect(getByTestId("icon-check")).toBeInTheDocument();
  });
});
