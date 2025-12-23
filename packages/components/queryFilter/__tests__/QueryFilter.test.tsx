import type { ComponentProps } from "react";
import React from "react";

import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import QueryFilter from "@packages/queryFilter/QueryFilter";
import type * as StyledType from "@packages/queryFilter/QueryFilter.styled";
import type QueryFilterActionButtons from "@packages/queryFilter/containers/actionButtons/QueryFilterActionButtons";

// DESC: react-router-dom의 useSearchParams Mock (초기 상태 설정을 위해 필요)
const mockSearchParams = new URLSearchParams("foo=bar");
vi.mock("react-router-dom", () => ({
  useSearchParams: () => [mockSearchParams, vi.fn()],
}));
// DESC: useQueryFilterStateStore Mock
const mockUseQueryFilterStateStore = {
  // GIVEN: 쿼리 필터 상태
  queryFilters: {} as Record<string, { tagValue: string | string[] }>,
  // GIVEN: 필터 상태 초기화/설정 핸들러 캡처용 Mock
  onSetQueryFilters: vi.fn(),
};
vi.mock("@repo/stores/queryFilterState", () => ({
  useQueryFilterStateStore: (
    selector: (store: typeof mockUseQueryFilterStateStore) => unknown,
  ) => selector(mockUseQueryFilterStateStore),
}));
// DESC: useQueryFilterStore Mock
const mockUseQueryFilterStore = { setIsInitQueryFilter: vi.fn() };
vi.mock("@repo/stores/queryFilter", () => ({
  useQueryFilterStore: (
    selector: (store: typeof mockUseQueryFilterStore) => unknown,
  ) => selector(mockUseQueryFilterStore),
}));
// DESC: QueryFilter Styled Component Mock
vi.mock("@packages/queryFilter/QueryFilter.styled", () => {
  const MockQueryFilter = (
    props: ComponentProps<typeof StyledType.QueryFilter>,
  ) => (
    <div className={props.className} data-testid="test-query-filter">
      {props.children}
    </div>
  );
  return { QueryFilter: MockQueryFilter };
});
// DESC: QueryFilterActionButtons Mock
vi.mock(
  "@packages/queryFilter/containers/actionButtons/QueryFilterActionButtons",
  () => ({
    default: (props: ComponentProps<typeof QueryFilterActionButtons>) => (
      <div
        data-loading={props.isLoadingApplyButton} // DESC: isLoadingApplyButton prop 확인
        data-margin={props.marginButton} // DESC: marginButton prop 확인
        data-testid="test-action-buttons"
      />
    ),
  }),
);
// DESC: QueryFilterTagBox Mock
vi.mock("@packages/queryFilter/containers/box/QueryFilterTagBox", () => ({
  default: () => <div data-testid="test-tag-box" />,
}));

describe("QueryFilter Test", () => {
  const constructor = {};

  test("QueryFilter 렌더 시, children과 ActionButtons가 렌더되고 hasTags=false이면 TagBox는 렌더되지 않음", () => {
    // GIVEN: 초기 필터 상태에 tagValue가 없음 (TagBox 렌더링 조건 만족 안함)
    mockUseQueryFilterStateStore.queryFilters = {};

    // WHEN: QueryFilter 렌더링 (isLoadingApplyButton, marginButton, className 전달)
    const { container, queryByTestId } = render(
      <QueryFilter
        className="test-class"
        isLoadingApplyButton
        marginButton={12}
        constructor={constructor}
      >
        <div data-testid="test-child" />
      </QueryFilter>,
    );

    expect(container.children).toHaveLength(1);

    const section = container.children[0];

    // THEN: 1. 최상위는 SECTION 태그
    expect(section).toBeInTheDocument();
    expect(section.tagName).toBe("SECTION");
    expect(section.children).toHaveLength(2); // DESC: QueryFilter (Styled) + ActionButtons

    const queryFilter = section.children[0];

    // THEN: 2. Styled QueryFilter Wrapper 및 className 확인
    expect(queryFilter).toBeInTheDocument();
    expect(queryFilter).toHaveAttribute("data-testid", "test-query-filter");
    expect(queryFilter).toHaveClass("test-class");

    const queryFilterChildren = queryFilter.children[0];

    // THEN: 3. 전달된 children이 렌더링되었는지 확인
    expect(queryFilterChildren).toBeInTheDocument();
    // THEN: 4. tagValue가 없으므로 TagBox는 렌더링되지 않음
    expect(queryByTestId("test-tag-box")).toBeNull();

    const actionButtons = section.children[1];

    // THEN: 5. ActionButtons가 렌더링되고 props가 올바르게 전달되었는지 확인
    expect(actionButtons).toBeInTheDocument();
    expect(actionButtons).toHaveAttribute("data-testid", "test-action-buttons");
    expect(actionButtons).toHaveAttribute("data-loading", "true"); // DESC:  isLoadingApplyButton
    expect(actionButtons).toHaveAttribute("data-margin", "12"); // DESC: marginButton

    // THEN: 6. 초기 렌더 시 필터 상태 설정 함수 호출 확인
    expect(mockUseQueryFilterStateStore.onSetQueryFilters).toHaveBeenCalledWith(
      { constructor, searchParams: mockSearchParams },
    );
  });

  test("QueryFilter 렌더 시, children과 ActionButtons가 렌더되고 hasTags=true이면 TagBox가 렌더", () => {
    // GIVEN: 필터 상태에 tagValue가 존재함 (TagBox 렌더링 조건 만족)
    mockUseQueryFilterStateStore.queryFilters = {
      status: { tagValue: ["active"] },
    };

    // WHEN: QueryFilter 렌더링 (isLoadingApplyButton=false)
    const { container } = render(
      <QueryFilter
        className="test-class"
        isLoadingApplyButton={false}
        constructor={constructor}
      >
        <div data-testid="test-child" />
      </QueryFilter>,
    );

    expect(container.children).toHaveLength(1);

    const section = container.children[0];

    expect(section).toBeInTheDocument();
    expect(section.tagName).toBe("SECTION");
    expect(section.children).toHaveLength(2); // DESC: QueryFilter (Styled) + ActionButtons

    const queryFilter = section.children[0];

    expect(queryFilter).toBeInTheDocument();
    expect(queryFilter).toHaveClass("test-class");
    expect(queryFilter.children).toHaveLength(2); // DESC: children + TagBox

    const queryFilterChildren = queryFilter.children[0];

    expect(queryFilterChildren).toBeInTheDocument();

    const tagBox = queryFilter.children[1];

    // THEN: 1. tagValue가 존재하므로 TagBox가 렌더링됨
    expect(tagBox).toBeInTheDocument();

    const actionButtons = section.children[1];

    // THEN: 2. ActionButtons가 렌더링되고 isLoadingApplyButton=false 확인
    expect(actionButtons).toBeInTheDocument();
    expect(actionButtons).toHaveAttribute("data-loading", "false");

    // THEN: 3. 초기 렌더 시 필터 상태 설정 함수 호출 확인
    expect(mockUseQueryFilterStateStore.onSetQueryFilters).toHaveBeenCalledWith(
      { constructor, searchParams: mockSearchParams },
    );
  });

  test("QueryFilter가 unmount 시, setIsInitQueryFilter(true)가 호출됨", () => {
    // GIVEN: QueryFilter 렌더링
    const { unmount } = render(
      <QueryFilter
        className="test-class"
        isLoadingApplyButton={false}
        constructor={constructor}
      >
        <div data-testid="test-child" />
      </QueryFilter>,
    );

    // WHEN: 컴포넌트 언마운트
    unmount();

    // THEN: 필터 true로 설정됨
    expect(mockUseQueryFilterStore.setIsInitQueryFilter).toHaveBeenCalledWith(
      true,
    );
  });
});
