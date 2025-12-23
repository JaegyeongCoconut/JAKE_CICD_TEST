import type { ComponentProps, ReactNode } from "react";
import React from "react";

import { describe, expect, test, vi } from "vitest";

import type { Languages } from "@repo/types";

import QueryFilterFieldName from "@packages/queryFilter/containers/row/containers/field/containers/name/QueryFilterFieldName";
import type * as StyledType from "@packages/queryFilter/containers/row/containers/field/containers/name/QueryFilterFieldName.styled";
import type QueryFilterFieldNameCheckbox from "@packages/queryFilter/containers/row/containers/field/containers/name/containers/QueryFilterFieldNameCheckbox";
import { QueryFilterFieldStateContext } from "@packages/queryFilter/containers/row/containers/field/context/QueryFilterFieldStateContext";

import renderComponent from "@tests/renderComponent";

// DESC: useDefaultLanguage Hook Mocking
const mockDefaultLanguage = vi.fn(({ text }: { text: string }) => text);
vi.mock("@repo/hooks/useDefaultLanguage", () => ({
  default: () => ({ defaultLanguage: mockDefaultLanguage }),
}));
// DESC: Styled Component Mocking (Props 확인용)
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/name/QueryFilterFieldName.styled",
  () => {
    // GIVEN: QueryFilterFeildName Wrapper Mock (스타일 관련 props 추적용)
    const MockStyledQueryFilterFieldName = (
      props: ComponentProps<typeof StyledType.QueryFilterFeildName>,
    ) => (
      <div
        data-has-checkbox={!!props.hasCheckbox}
        data-has-error={!!props.hasError}
        data-is-focused={!!props.isFocused}
        data-testid="test-field-name"
      >
        {props.children}
      </div>
    );
    // GIVEN: 필수 표시자 (*)
    const MockStyledRequired = (
      props: ComponentProps<typeof StyledType.Required>,
    ) => <div data-testid="test-required">{props.children}</div>;

    return {
      QueryFilterFeildName: MockStyledQueryFilterFieldName,
      Required: MockStyledRequired,
    };
  },
);
// GIVEN: Checkbox 컴포넌트 Mocking (isMultiSelect일 때 렌더링 확인용)
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/name/containers/QueryFilterFieldNameCheckbox",
  () => ({
    default: (props: ComponentProps<typeof QueryFilterFieldNameCheckbox>) => (
      <div data-query-key={props.queryKey} data-testid="test-query-check" />
    ),
  }),
);
// DESC: QueryFilterFieldStateContext의 Mock 값 설정 (hasError/isFocused 추적)
const mockContextValue = {
  handleBlur: () => {},
  handleFocus: () => {},
  hasError: false,
  isFocused: false,
  handleErrorClear: () => {},
  onSetError: () => {},
};
// DESC: Context Provider Wrapper 컴포넌트
const Wrapper = ({ children }: { children: ReactNode }) => (
  <QueryFilterFieldStateContext.Provider value={mockContextValue}>
    {children}
  </QueryFilterFieldStateContext.Provider>
);

describe("QueryFilterFieldName Test", () => {
  const label = "Label" as Languages;
  const queryKey = "queryKey";

  test(`(isRequired=false, isMultiSelect=false)
        QueryFilterFieldName 렌더 시, children은 span 하나이고
        S.QueryFilterFieldName에 isMultiSelect, hasError, isFocused가 전달`, () => {
    // WHEN: isRequired=false, isMultiSelect=false로 렌더링
    const { container } = renderComponent({
      ui: (
        <Wrapper>
          <QueryFilterFieldName
            isMultiSelect={false}
            isRequired={false}
            label={label}
            queryKey={queryKey}
          />
        </Wrapper>
      ),
    });

    // THEN: 1. 컴포넌트 구조 확인 (Wrapper 하나)
    expect(container.children).toHaveLength(1);

    const queryFilterFieldName = container.children[0];

    // THEN: 2. Styled Component Props 확인 (모두 false)
    expect(queryFilterFieldName).toHaveAttribute("data-has-checkbox", "false");
    expect(queryFilterFieldName).toHaveAttribute("data-has-error", "false");
    expect(queryFilterFieldName).toHaveAttribute("data-is-focused", "false");

    // THEN: 3. 내부 children (Label 텍스트) 확인
    expect(queryFilterFieldName.children).toHaveLength(1);

    const spanText = queryFilterFieldName.children[0];
    expect(spanText.tagName).toBe("SPAN");
    expect(spanText).toHaveTextContent(label);

    // THEN: 4. defaultLanguage 호출 확인
    expect(mockDefaultLanguage).toHaveBeenCalledOnce();
    expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: label });
  });

  test(`(isRequired=true, isMultiSelect=false)
        QueryFilterFieldName 렌더 시, children은 span과 S.Required를 렌더함`, () => {
    // WHEN: isRequired=true, isMultiSelect=false로 렌더링
    const { container } = renderComponent({
      ui: (
        <Wrapper>
          <QueryFilterFieldName
            isMultiSelect={false}
            isRequired
            label={label}
            queryKey="querykey"
          />
        </Wrapper>
      ),
    });

    const queryFilterFieldName = container.children[0];

    // THEN: 1. children 개수 확인 (Label + Required)
    expect(queryFilterFieldName.children).toHaveLength(2);

    // THEN: 2. Label 텍스트 (span) 확인
    const spanText = queryFilterFieldName.children[0];

    expect(spanText.tagName).toBe("SPAN");
    expect(spanText).toHaveTextContent(label);
    expect(mockDefaultLanguage).toHaveBeenCalledOnce();
    expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: label });

    // THEN: 3. Required 확인
    const required = queryFilterFieldName.children[1];
    expect(required).toHaveTextContent("*");
  });

  test(`(isRequired=false, isMultiSelect=true)
        QueryFilterFieldName 렌더 시, children은 span과 QueryFilterFieldNameCheckbox를 렌더함`, () => {
    // WHEN: isRequired=false, isMultiSelect=true로 렌더링
    const { container } = renderComponent({
      ui: (
        <Wrapper>
          <QueryFilterFieldName
            isMultiSelect
            isRequired={false}
            label={label}
            queryKey={queryKey}
          />
        </Wrapper>
      ),
    });

    const queryFilterFieldName = container.children[0];

    // THEN: 1. children 개수 확인 (Label + Checkbox)
    expect(queryFilterFieldName.children).toHaveLength(2);

    // THEN: 2. Label 텍스트 (span) 확인
    const spanText = queryFilterFieldName.children[0];

    expect(spanText.tagName).toBe("SPAN");
    expect(spanText).toHaveTextContent(label);
    expect(mockDefaultLanguage).toHaveBeenCalledOnce();
    expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: label });

    // THEN: 3. QueryFilterFieldNameCheckbox Mock 컴포넌트 렌더링 확인
    const queryFilterFieldCheckbox = queryFilterFieldName.children[1];

    expect(queryFilterFieldCheckbox).toBeInTheDocument();
    // THEN: 4. Checkbox에 queryKey prop이 올바르게 전달되었는지 확인
    expect(queryFilterFieldCheckbox).toHaveAttribute(
      "data-query-key",
      queryKey,
    );
  });

  test(`(isRequired=true, isMultiSelect=true)
        QueryFilterFieldName 렌더 시, children은 span과 S.Requried, QueryFilterFieldNameCheckbox를 모두 렌더함`, () => {
    // WHEN: isRequired=true, isMultiSelect=true로 렌더링
    const { container } = renderComponent({
      ui: (
        <Wrapper>
          <QueryFilterFieldName
            isMultiSelect
            isRequired
            label={label}
            queryKey={queryKey}
          />
        </Wrapper>
      ),
    });

    const queryFilterFieldName = container.children[0];

    // THEN: 1. children 개수 확인 (Label + Required + Checkbox)
    expect(queryFilterFieldName.children).toHaveLength(3);

    // THEN: 2. Label 텍스트 (span) 확인
    const spanText = queryFilterFieldName.children[0];

    expect(spanText.tagName).toBe("SPAN");
    expect(spanText).toHaveTextContent(label);
    expect(mockDefaultLanguage).toHaveBeenCalledOnce();
    expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: label });

    // THEN: 3. Required 확인
    const required = queryFilterFieldName.children[1];

    expect(required).toHaveTextContent("*");

    // THEN: 4. QueryFilterFieldNameCheckbox Mock 컴포넌트 렌더링 및 prop 확인
    const queryFilterFieldCheckbox = queryFilterFieldName.children[2];
    expect(queryFilterFieldCheckbox).toBeInTheDocument();
    expect(queryFilterFieldCheckbox).toHaveAttribute(
      "data-query-key",
      queryKey,
    );
  });
});
