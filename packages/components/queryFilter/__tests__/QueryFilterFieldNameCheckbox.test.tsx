import type { ComponentProps } from "react";
import React from "react";

import { describe, expect, test, vi } from "vitest";

import type Checkbox from "@packages/button/checkbox/Checkbox";
import QueryFilterFieldNameCheckbox from "@packages/queryFilter/containers/row/containers/field/containers/name/containers/QueryFilterFieldNameCheckbox";

import renderComponent from "@tests/renderComponent";

// DESC: Hoisted Mock 설정 (useTypedQueryFilterState 추적용)
const hoisted = vi.hoisted(() => {
  const mockUseTypedQueryFilterState = vi.fn();

  return { mockUseTypedQueryFilterState };
});
// GIVEN: useTypedQueryFilterState Hook Mocking
vi.mock("@repo/hooks/queryFilter/useTypedQueryFilterState", () => ({
  default: hoisted.mockUseTypedQueryFilterState,
}));
// GIVEN: Styled Component Mocking (실제 스타일 로직은 테스트 대상이 아님)
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/name/containers/QueryFilterFieldNameCheckbox.styled",
  () => {
    return { checkbox: {} };
  },
);
// GIVEN: useQueryFilterFieldNameCheckbox Hook Mock 상태 정의
const mockUseQueryFilterFieldNameCheckbox = {
  isAllChecked: false,
  handleAllCheckboxClick: vi.fn(),
};
// GIVEN: useQueryFilterFieldNameCheckbox Hook Mocking
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/name/containers/hooks/useQueryFilterFieldNameCheckbox",
  () => ({
    default: vi.fn(() => mockUseQueryFilterFieldNameCheckbox),
  }),
);
// GIVEN: Checkbox 컴포넌트 Mocking (props 및 클릭 이벤트 추적용)
vi.mock("@packages/button/checkbox/Checkbox", () => ({
  default: (props: ComponentProps<typeof Checkbox>) => (
    <input
      data-disabled={props.disabled}
      data-is-checked={props.isChecked}
      data-testid="test-checkbox"
      type="checkbox"
      onChange={props.handleCheck} // DESC: onChange를 통해 클릭 이벤트 테스트
    />
  ),
}));

describe("QueryFilterFieldNameCheckbox Test", () => {
  test(`QueryFilterFieldNameCheckbox 렌더 시, 
        Checkbox 컴포넌트가 렌더링되며, 
        Checkbox에 disabled, isChecked, handleCheck가 올바르게 전달됨`, async () => {
    // GIVEN: 초기 상태 (isAllChecked: false)

    // WHEN: 컴포넌트 렌더링
    const { container, getByTestId } = renderComponent({
      ui: <QueryFilterFieldNameCheckbox queryKey="queryKey" />,
    });

    // THEN: 1. 컴포넌트 구조 확인
    expect(container.children).toHaveLength(1);

    const checkbox = container.children[0];

    // THEN: 2. Checkbox Mock 컴포넌트 렌더링 및 Props 확인
    expect(checkbox).toBe(getByTestId("test-checkbox"));
    expect(checkbox).toHaveAttribute("data-disabled", "false");
    expect(checkbox).toHaveAttribute("data-is-checked", "false"); // DESC: isAllChecked: false 상태 반영 확인
    // THEN: 3. useTypedQueryFilterState 호출 확인
    expect(hoisted.mockUseTypedQueryFilterState).toHaveBeenCalledWith({
      type: "checkbox",
      queryKey: "queryKey",
    });
    // THEN: 4. handleAllCheckboxClick 함수 호출 확인
    expect(
      mockUseQueryFilterFieldNameCheckbox.handleAllCheckboxClick,
    ).toHaveBeenCalledWith("queryKey");
  });

  test(`QueryFilterFieldNameCheckbox 렌더 시, 
        hook의 isAllChecked 상태가 true일 때, 
        Checkbox의 isChecked prop이 true로 전달되는지 확인`, () => {
    // GIVEN: Hook의 isAllChecked 상태를 true로 Mock 설정
    mockUseQueryFilterFieldNameCheckbox.isAllChecked = true;

    // WHEN: 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: <QueryFilterFieldNameCheckbox queryKey={"queryKey"} />,
    });

    const checkbox = container.children[0];

    // THEN: Checkbox의 isChecked prop이 'true'로 전달되었는지 확인
    expect(checkbox).toHaveAttribute("data-is-checked", "true");
  });
});
