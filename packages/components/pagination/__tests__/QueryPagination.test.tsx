import type { ComponentProps } from "react";
import React from "react";

import { beforeEach, describe, expect, test, vi } from "vitest";

import { INIT_MAX_PAGE_COUNT } from "@repo/constants/pagination";

import type Pagination from "@packages/pagination/Pagination";
import QueryPagination from "@packages/pagination/QueryPagination";

import renderComponent from "@tests/renderComponent";

const paginationProps: ComponentProps<typeof Pagination>[] = [];
vi.mock("@packages/pagination/Pagination", () => ({
  default: (props: ComponentProps<typeof Pagination>) => {
    paginationProps.push(props); // GIVEN: 전달된 props를 배열에 저장
    return <div />;
  },
}));
const hoisted = vi.hoisted(() => ({ mockUseQueryPagination: vi.fn() }));
vi.mock("@repo/hooks/pagination/useQueryPagination", () => ({
  default: hoisted.mockUseQueryPagination,
}));

// GIVEN: 훅이 반환할 Mock 데이터 (mock 함수는 beforeEach에서 재생성)
const MOCK_HOOK_RETURN = {
  currentPage: 3,
  handlePreviousPageClick: vi.fn(),
  handleFirstPageClick: vi.fn(),
  handleNextPageClick: vi.fn(),
  handleLastPageClick: vi.fn(),
  handleNumberClick: vi.fn(),
};

beforeEach(() => {
  // GIVEN: 테스트 전 캡처된 props 배열 초기화
  paginationProps.length = 0;
  // DESC: 각 테스트 전 mock 함수를 재생성하여 테스트 격리 보장
  MOCK_HOOK_RETURN.handlePreviousPageClick = vi.fn();
  MOCK_HOOK_RETURN.handleFirstPageClick = vi.fn();
  MOCK_HOOK_RETURN.handleNextPageClick = vi.fn();
  MOCK_HOOK_RETURN.handleLastPageClick = vi.fn();
  MOCK_HOOK_RETURN.handleNumberClick = vi.fn();
  // GIVEN: hook 반환값 설정
  hoisted.mockUseQueryPagination.mockReturnValue(MOCK_HOOK_RETURN);
});

describe("QueryPagination Test", () => {
  test("초기 렌더가 되면 props가 올바르게 전달됨", () => {
    // GIVEN: 페이지 정보
    const pageInfo = {
      totalData: 1639,
      currentPage: 1,
      dataPerPage: 20,
      totalPages: 82,
      startRow: 0,
    };

    // WHEN: QueryPagination 렌더링
    const { container } = renderComponent({
      ui: <QueryPagination className="test-class" pageInfo={pageInfo} />,
    });

    // THEN: 렌더링된 요소 확인
    expect(container.children).toHaveLength(1);

    const [props] = paginationProps;

    // THEN: 1. useQueryPagination hook이 올바른 Props로 호출되었는지 확인
    expect(hoisted.mockUseQueryPagination).toHaveBeenCalledOnce();
    expect(hoisted.mockUseQueryPagination).toHaveBeenCalledWith({
      maxPageCount: INIT_MAX_PAGE_COUNT,
      totalPages: pageInfo.totalPages,
    });
    // THEN: 2. Pagination 컴포넌트에 최종 Props가 올바르게 전달되었는지 확인
    expect(props.className).toBe("test-class");
    expect(props.totalPages).toBe(pageInfo.totalPages);
    expect(props.maxPageCount).toBe(INIT_MAX_PAGE_COUNT);
    // THEN: 3. hook에서 반환된 핸들러 및 상태가 전달되었는지 확인
    expect(props.currentPage).toBe(MOCK_HOOK_RETURN.currentPage);
    expect(props.handleFirstPageClick).toBe(
      MOCK_HOOK_RETURN.handleFirstPageClick,
    );
    expect(props.handleNextPageClick).toBe(
      MOCK_HOOK_RETURN.handleNextPageClick,
    );
    expect(props.handleLastPageClick).toBe(
      MOCK_HOOK_RETURN.handleLastPageClick,
    );
    expect(props.handleNumberClick).toBe(MOCK_HOOK_RETURN.handleNumberClick);
    expect(props.handlePreviousPageClick).toBe(
      MOCK_HOOK_RETURN.handlePreviousPageClick,
    );
  });
});
