import { renderHook } from "@testing-library/react";
import * as routerDom from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";

import useQueryFilterParams from "@packages/hooks/queryFilter/useQueryFilterParams";

// DESC: vi.mock()이 파일 상단으로 호이스팅되어 외부 변수를 참조할 수 없어 mock 선언을 위해 vi.hoisted() 사용
const hoisted = vi.hoisted(() => ({ mockGetQueryFilterParams: vi.fn() }));
// DESC: getQueryFilterParams util 함수 모킹
vi.mock("@repo/utils/queryFilter", () => ({
  getQueryFilterParams: hoisted.mockGetQueryFilterParams,
}));

// DESC: 테스트에 사용할 테스트 searchParams 설정
const MOCK_SEARCH_PARAMS = new URLSearchParams("page=1&pageSize=20");
// DESC: 테스트에 사용할 테스트 queryfilter 예상 반환값 설정
const EXPECTED_QUERY_FILTER = { page: "1", pageSize: "20" };

// DESC: 각 테스트 실행 전 공통 초기화 로직 설정
beforeEach(() => {
  // DESC: useSearchParams hook 모킹하여 mockSearchParams 반환하도록 설정
  vi.spyOn(routerDom, "useSearchParams").mockReturnValue([
    MOCK_SEARCH_PARAMS,
    vi.fn(),
  ]);
  // DESC: getQueryFilterParams 함수를 모킹하여 expectedResult 반환하도록 설정
  hoisted.mockGetQueryFilterParams.mockReturnValue(EXPECTED_QUERY_FILTER);
});

describe("useQueryFilterParams Test", () => {
  // DESC: 테스트에 사용할 테스트 params 설정
  const mockParams = ["page", "pageSize"] as const;

  test("useQueryFilterParams hook 호출 시 URLSearchParams와 params를 기반으로 queryFilters 반환", () => {
    // GIVEN: useQueryFilterParams hook 렌더링
    const { result } = renderHook(() => useQueryFilterParams(mockParams));

    // THEN: getQueryFilterParams 함수 인자 확인
    expect(hoisted.mockGetQueryFilterParams).toHaveBeenCalledWith({
      searchParams: MOCK_SEARCH_PARAMS,
      params: mockParams,
    });
    // THEN: queryFilters가 예상 결과와 일치하는지 확인
    expect(result.current.queryFilters).toEqual(EXPECTED_QUERY_FILTER);
  });

  test("searchParams가 동일하면 getQueryFilterParams가 다시 호출되지 않고 캐싱된 queryFilters 유지", () => {
    // GIVEN: useQueryFilterParams hook 렌더링
    const { rerender, result } = renderHook(() =>
      useQueryFilterParams(mockParams),
    );

    // THEN: getQueryFilterParams 호출 횟수 확인
    expect(hoisted.mockGetQueryFilterParams).toHaveBeenCalledOnce();
    // THEN: queryFilters가 예상 결과와 일치하는지 확인
    expect(result.current.queryFilters).toEqual(EXPECTED_QUERY_FILTER);

    // WHEN: 동일한 searchParams로 useQueryFilterParams hook 리렌더링
    rerender(mockParams);

    // THEN: getQueryFilterParams 추가로 호출되지 않았는지 확인
    expect(hoisted.mockGetQueryFilterParams).toHaveBeenCalledOnce();
    // THEN: 캐싱된 queryFilters 상태 반환 확인
    expect(result.current.queryFilters).toEqual(EXPECTED_QUERY_FILTER);
  });

  test("searchParams 변경 시 getQueryFilterParams가 재호출되어 새로운 queryFilters 반환", () => {
    // GIVEN: useQueryFilterParams hook 렌더링
    const { rerender, result } = renderHook(() =>
      useQueryFilterParams(mockParams),
    );

    // THEN: getQueryFilterParams 호출 횟수 확인
    expect(hoisted.mockGetQueryFilterParams).toHaveBeenCalledOnce();
    // THEN: queryFilters가 예상 결과와 일치하는지 확인
    expect(result.current.queryFilters).toEqual(EXPECTED_QUERY_FILTER);

    // GIVEN: getQueryFilterParams 함수 모킹 반환값 설정
    hoisted.mockGetQueryFilterParams.mockReturnValue({
      page: "10",
      pageSize: "20",
    });
    // GIVEN: useSearchParams hook 모킹하여 searchParams 반환값 설정
    vi.spyOn(routerDom, "useSearchParams").mockReturnValue([
      new URLSearchParams("page=10&pageSize=20"),
      vi.fn(),
    ]);

    // WHEN: 변경한 searchParams로 useQueryFilterParams hook 리렌더링
    rerender(mockParams);

    // THEN: getQueryFilterParams 추가 호출 확인
    expect(hoisted.mockGetQueryFilterParams).toHaveBeenCalledTimes(2);
    // THEN: 새로 계산된 queryFilters 상태 반환 확인
    expect(result.current.queryFilters).toEqual({
      page: "10",
      pageSize: "20",
    });
  });
});
