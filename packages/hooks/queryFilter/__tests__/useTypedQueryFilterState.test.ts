import { renderHook } from "@testing-library/react";
import useTypedQueryFilterState from "queryFilter/useTypedQueryFilterState";
import { beforeEach, describe, expect, it, test, vi } from "vitest";

import { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";

// GIVEN: useQueryFilterStateStore의 mock 상태 정의
const mockUseQueryFilterStateStore = { queryFilters: {} };
// GIVEN: useQueryFilterStateStore hook을 mock
vi.mock("@repo/stores/queryFilterState", () => ({
  useQueryFilterStateStore: (
    selector: (store: typeof mockUseQueryFilterStateStore) => unknown,
  ) => selector(mockUseQueryFilterStateStore),
}));

// DESC: 각 테스트 전에 필터 상태를 초기화
beforeEach(() => {
  mockUseQueryFilterStateStore.queryFilters = {};
});

describe("useTypedQueryFilterState Test", () => {
  it.each(Object.values(QUERY_FILTER_TYPE))(
    "QUERY_FILTER_TYPE=%s일 때, queryKey와 type이 일치할 때, 해당 필터 객체를 반환함.",
    (type) => {
      // GIVEN: 필터 상태 정의. type과 queryKey가 인자와 일치하도록 설정
      const mockFilterState = { type, queryKey: "test", tagValue: "testValue" };

      // GIVEN: 전역 상태에 필터 주입
      mockUseQueryFilterStateStore.queryFilters = { test: mockFilterState };

      // WHEN: useTypedQueryFilterState hook 렌더링 및 실행
      const { result } = renderHook(
        () => useTypedQueryFilterState({ queryKey: "test", type }), // DESC: queryKey와 type 일치
      );

      // THEN: hook의 결과가 주입했던 필터 객체와 동일한지 확인
      expect(result.current).toEqual(mockFilterState);
    },
  );

  it.each(Object.values(QUERY_FILTER_TYPE))(
    "QUERY_FILTER_TYPE=%s일 때, Filter의 type과 인자의 type이 일치하지 않을 때, undefined를 반환함.",
    (type) => {
      // GIVEN: 실제 필터의 type은 인자의 type과 다르게 "test"로 설정
      const mockFilterState = {
        type: "test", // DESC: 저장된 필터 타입 (인자 type과 불일치)
        queryKey: "test",
        tagValue: "testValue",
      };

      // GIVEN: 전역 상태에 필터 주입
      mockUseQueryFilterStateStore.queryFilters = { test: mockFilterState };

      // WHEN: useTypedQueryFilterState hook 렌더링 및 실행
      const { result } = renderHook(
        () => useTypedQueryFilterState({ queryKey: "test", type }), // DESC: 인자로 다른 type을 전달
      );

      // THEN: type 불일치로 인해 undefined가 반환되는지 확인
      expect(result.current).toBeUndefined();
    },
  );

  test("store에 queryKey에 해당하는 필터가 없을 때, undefined를 반환함.", () => {
    // GIVEN: mockUseQueryFilterStateStore.queryFilters는 beforeEach에 의해 {} (빈 객체)로 설정되어 있음

    // WHEN: 존재하지 않는 queryKey("test")로 hook 렌더링 및 실행
    const { result } = renderHook(() =>
      useTypedQueryFilterState({
        queryKey: "test", // DESC: store에 존재하지 않는 키
        type: QUERY_FILTER_TYPE.RADIO,
      }),
    );

    // THEN: 필터를 찾지 못해 undefined가 반환되는지 확인
    expect(result.current).toBeUndefined();
  });
});
