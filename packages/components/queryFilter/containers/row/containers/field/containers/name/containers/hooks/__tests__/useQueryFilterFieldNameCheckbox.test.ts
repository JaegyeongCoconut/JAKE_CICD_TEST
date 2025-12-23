import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import type { Languages } from "@repo/types";

import useQueryFilterFieldNameCheckbox from "@packages/queryFilter/containers/row/containers/field/containers/name/containers/hooks/useQueryFilterFieldNameCheckbox";

// DESC: useQueryFilterStateStore의 mock 상태 정의 및 함수 추적
const mockUseQueryFilterStateStore = {
  queryFilters: {},
  onUpdateTagValue: vi.fn(), // DESC: 상태 업데이트 함수 Mock
};
// DESC: useQueryFilterStateStore hook을 mock하여 실제 스토어 대신 mock 객체를 반환하도록 설정
vi.mock("@repo/stores/queryFilterState", () => ({
  useQueryFilterStateStore: (
    selector: (store: typeof mockUseQueryFilterStateStore) => unknown,
  ) => selector(mockUseQueryFilterStateStore),
}));

describe("useQueryFilterFieldNameCheckbox Test", () => {
  test("queryFilter가 undefined 이면 isAllChecked=false, onUpdateTagValue 호출되지 않음", () => {
    // WHEN: queryFilter: undefined를 전달하여 hook 렌더링
    const { result } = renderHook(() =>
      useQueryFilterFieldNameCheckbox({ queryFilter: undefined }),
    );

    // THEN: isAllChecked는 false여야 함 (undefined 상태에서는 전체 선택 불가)
    expect(result.current.isAllChecked).toBe(false);

    // WHEN: handleAllCheckboxClick 호출 시도
    // DESC: queryFilter는 이미 undefined로 전달되었기 때문에 타입을 맞추기 위해 임의 string인 "undefined" 전달
    act(() => result.current.handleAllCheckboxClick("undefined")());

    // THEN: 스토어 업데이트 함수(onUpdateTagValue)는 호출되지 않아야 함
    expect(
      mockUseQueryFilterStateStore.onUpdateTagValue,
    ).not.toHaveBeenCalled();
  });

  test("아무 키도 선택되지 않은 상태에서 isAllChecked는 false여야 함", () => {
    // GIVEN: 초기 tagValue가 빈 배열인 queryFilter
    const selections = [{ key: "key1", label: "Option A" as Languages }];
    const queryFilter = {
      label: "Label" as Languages,
      queryKey: "queryKey",
      type: "checkbox" as const,
      tagValue: [], // DESC: 아무것도 선택되지 않음
      hasAllCheckButton: false,
      selections,
    };

    // WHEN: hook 렌더링
    const { result } = renderHook(() =>
      useQueryFilterFieldNameCheckbox({ queryFilter }),
    );

    // THEN: isAllChecked 상태는 false여야 함
    expect(result.current.isAllChecked).toBe(false);
  });

  test("일부 키만 선택된 상태 (isAllChecked=false)에서 클릭 시, 전체 키로 업데이트되어야 함", () => {
    // GIVEN: 일부 선택 상태의 queryFilter
    const selections = [
      { key: "a", label: "Option A" as Languages },
      { key: "b", label: "Option B" as Languages },
    ];
    const queryFilter = {
      label: "Label" as Languages,
      queryKey: "queryKey",
      type: "checkbox" as const,
      tagValue: ["a"], // DESC: 초기 선택: 'a'
      hasAllCheckButton: false,
      selections,
    };
    const allKeys = ["a", "b"];

    // WHEN: hook 렌더링
    const { result, rerender } = renderHook(
      (initdata) => useQueryFilterFieldNameCheckbox({ queryFilter: initdata }),
      { initialProps: queryFilter },
    );

    // THEN: 1. Initial State 검증: isAllChecked는 false여야 함
    expect(result.current.isAllChecked).toBe(false);

    // WHEN: handleAllCheckboxClick 함수 호출
    act(() => result.current.handleAllCheckboxClick("queryKey")());

    // THEN: 2. onUpdateTagValue가 전체 키 목록(allKeys)으로 호출되었는지 검증
    expect(mockUseQueryFilterStateStore.onUpdateTagValue).toHaveBeenCalledWith({
      queryKey: "queryKey",
      options: "array",
      selectedKey: allKeys, // THEN: 전체 키가 전달되었는지 검증
    });

    // WHEN: Mock 상태 업데이트를 시뮬레이션 (rerender를 통해 새 props 전달)
    rerender({ ...queryFilter, tagValue: allKeys });

    // THEN: 3. 상태가 업데이트된 후, isAllChecked가 true로 변경되었는지 확인
    expect(result.current.isAllChecked).toBe(true);
  });

  test("모든 키가 선택된 상태 (isAllChecked=true)에서 클릭 시, 빈 배열로 업데이트되어야 함", () => {
    // GIVEN: 전체 선택 상태의 queryFilter
    const selections = [
      { key: "key1", label: "Option A" as Languages },
      { key: "key2", label: "Option B" as Languages },
      { key: "key3", label: "Option C" as Languages },
    ];
    const allKeys = ["key1", "key2", "key3"];
    const queryFilter = {
      label: "Label" as Languages,
      queryKey: "queryKey",
      type: "checkbox" as const,
      tagValue: allKeys, // DESC: 전체 키 선택
      hasAllCheckButton: false,
      selections,
    };

    // WHEN: hook 렌더링
    const { result, rerender } = renderHook(
      (initdata) => useQueryFilterFieldNameCheckbox({ queryFilter: initdata }),
      { initialProps: queryFilter },
    );

    // THEN: 1. Initial State 검증: isAllChecked는 true여야 함
    expect(result.current.isAllChecked).toBe(true);

    // WHEN: handleAllCheckboxClick 함수 호출
    act(() => result.current.handleAllCheckboxClick("queryKey")());

    // THEN: 2. onUpdateTagValue가 빈 배열로 호출되었는지 검증
    expect(
      mockUseQueryFilterStateStore.onUpdateTagValue,
    ).toHaveBeenCalledOnce(); // 이전에 호출된 횟수와 별개로 한번 더 호출됨
    expect(mockUseQueryFilterStateStore.onUpdateTagValue).toHaveBeenCalledWith({
      queryKey: "queryKey",
      options: "array",
      selectedKey: [], // THEN: 빈 배열로 호출되었는지 검증
    });

    // WHEN: Mock 상태 업데이트를 시뮬레이션 (rerender를 통해 새 props 전달)
    rerender({ ...queryFilter, tagValue: [] });

    // THEN: 3. 상태가 업데이트된 후, isAllChecked가 false로 변경되었는지 확인
    expect(result.current.isAllChecked).toBe(false);
  });
});
