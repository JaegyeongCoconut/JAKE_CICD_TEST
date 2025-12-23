import type { ReactNode, ComponentProps } from "react";
import React from "react";

import { describe, expect, test, vi } from "vitest";

import QueryFilterFieldControl from "@packages/queryFilter/containers/row/containers/field/containers/control/QueryFilterFieldControl";
import type * as StyledType from "@packages/queryFilter/containers/row/containers/field/containers/control/QueryFilterFieldControl.styled";
import { QueryFilterFieldStateContext } from "@packages/queryFilter/containers/row/containers/field/context/QueryFilterFieldStateContext";

import renderComponent from "@tests/renderComponent";

// DESC: Styled Component Mock
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/control/QueryFilterFieldControl.styled",
  () => {
    // GIVEN: Styled Component Mock
    const MockStyledQueryFilterFieldControl = (
      props: ComponentProps<typeof StyledType.QueryFilterFieldControl>,
    ) => (
      <div
        data-has-error={props.hasError} // DESC: Context의 hasError 상태 캡처
        data-is-focused={props.isFocused} // DESC: Context의 isFocused 상태 캡처
        data-testid="wrapper"
      >
        {props.children}
      </div>
    );

    return { QueryFilterFieldControl: MockStyledQueryFilterFieldControl };
  },
);
// DESC: QueryFilterFieldStateContext Mock
const mockContextValue = {
  handleBlur: () => {},
  handleFocus: () => {},
  hasError: false, // DESC: : 에러 없음
  isFocused: false, // DESC: : 포커스 없음
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

describe("QueryFilterFieldControl Test", () => {
  test("기본 컨텍스트(hasError=false, isFocused=false)로 렌더되고 children을 포함한다", () => {
    // GIVEN: Context의 기본값 (hasError: false, isFocused: false) 설정

    // WHEN: 컴포넌트를 자식 요소와 함께 렌더링
    const { container, getByTestId } = renderWithProvider(
      <QueryFilterFieldControl>
        <div data-testid="test-child" />
      </QueryFilterFieldControl>,
    );

    // THEN: 1. 루트 요소는 하나여야 함
    expect(container.children).toHaveLength(1);

    const wrapper = container.children[0];

    // THEN: 2. Wrapper가 DOM에 존재하고 자식 요소 (test-child)를 하나 포함
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.children).toHaveLength(1);
    expect(getByTestId("test-child")).toBeInTheDocument();
    // THEN: 3. Context에서 읽어온 상태가 Wrapper의 data-attribute에 올바르게 반영되었는지 확인
    expect(wrapper).toHaveAttribute("data-has-error", "false");
    expect(wrapper).toHaveAttribute("data-is-focused", "false");
  });
});
