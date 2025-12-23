import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import type { Languages } from "@repo/types";

import useQueryFilterFieldCheckbox from "@packages/queryFilter/containers/row/containers/field/containers/control/containers/checkbox/hooks/useQueryFilterFieldCheckbox";

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

describe("useQueryFilterFieldCheckbox Test", () => {
  // GIVEN: 테스트에 사용될 선택 옵션 목록
  const selections = [
    { key: "key1", label: "Option A" as Languages },
    { key: "key2", label: "Option B" as Languages },
    { key: "key3", label: "Option C" as Languages },
  ];
  // GIVEN: 테스트에 사용될 기본 queryFilter 필드 (tagValue는 각 테스트에서 설정)
  const baseQueryKey = {
    label: "Label" as Languages,
    queryKey: "queryKey",
    type: "checkbox" as const,
    hasAllCheckButton: false,
    selections,
  };

  test("queryFilter=undefined라면, onUpdateTagValue가 호출되지 않음", () => {
    // WHEN: queryFilter: undefined를 전달하여 hook 렌더링
    const { result } = renderHook(() =>
      useQueryFilterFieldCheckbox({ queryFilter: undefined }),
    );

    // WHEN: handleCheckboxClick 함수 호출 시도
    // DESC: queryFilter는 이미 undefined로 전달되었기 때문에 널 가드를 통과하지 못해야 함
    act(() => result.current.handleCheckboxClick("queryKey", "key")());

    // THEN: 스토어 업데이트 함수(onUpdateTagValue)는 호출되지 않아야 함
    expect(
      mockUseQueryFilterStateStore.onUpdateTagValue,
    ).not.toHaveBeenCalled();
  });

  test("tagValue가 빈 배열인 상태에서 키를 클릭할 때, onUpdateTagValue가 호출되며, selectedKey 배열에 해당 키가 추가되어야 함", () => {
    // GIVEN: tagValue가 빈 배열인 queryFilter
    const queryFilter = { ...baseQueryKey, tagValue: [] };

    // WHEN: hook 렌더링
    const { result } = renderHook(
      (props) => useQueryFilterFieldCheckbox({ queryFilter: props }),
      { initialProps: queryFilter },
    );

    // WHEN: 키 'key1'을 클릭
    act(() => result.current.handleCheckboxClick("queryKey", "key1")());

    // THEN: onUpdateTagValue가 한 번 호출되었는지 확인
    expect(
      mockUseQueryFilterStateStore.onUpdateTagValue,
    ).toHaveBeenCalledOnce();
    // THEN: selectedKey가 ['key1']로 업데이트되었는지 확인
    expect(mockUseQueryFilterStateStore.onUpdateTagValue).toHaveBeenCalledWith({
      queryKey: "queryKey",
      options: "array",
      selectedKey: ["key1"],
    });
  });

  test("tagValue에 포함되지 않은 키를 클릭할 때, onUpdateTagValue가 호출되며, selectedKey 배열에 해당 키가 추가되어야 함", () => {
    // GIVEN: tagValue에 ['key1', 'key2']가 선택된 queryFilter
    const queryFilter = { ...baseQueryKey, tagValue: ["key1", "key2"] };
    vi.mocked(mockUseQueryFilterStateStore.onUpdateTagValue).mockClear();

    // WHEN: hook 렌더링
    const { result } = renderHook(
      (props) => useQueryFilterFieldCheckbox({ queryFilter: props }),
      { initialProps: queryFilter },
    );

    // WHEN: 선택되지 않은 키 'key3'을 클릭
    act(() => result.current.handleCheckboxClick("queryKey", "key3")());

    // THEN: onUpdateTagValue가 한 번 호출되었는지 확인
    expect(
      mockUseQueryFilterStateStore.onUpdateTagValue,
    ).toHaveBeenCalledOnce();
    // THEN: selectedKey가 ['key1', 'key2', 'key3']로 업데이트되었는지 확인
    expect(mockUseQueryFilterStateStore.onUpdateTagValue).toHaveBeenCalledWith({
      queryKey: "queryKey",
      options: "array",
      selectedKey: ["key1", "key2", "key3"],
    });
  });

  test("tagValue에 이미 포함된 키를 클릭할 때, onUpdateTagValue가 호출되며, selectedKey 배열에서 해당 키가 제거되어야 함", () => {
    // GIVEN: tagValue에 ['key1']이 선택된 queryFilter
    const queryFilter = { ...baseQueryKey, tagValue: ["key1"] };
    vi.mocked(mockUseQueryFilterStateStore.onUpdateTagValue).mockClear();

    // WHEN: hook 렌더링
    const { result } = renderHook(
      (props) => useQueryFilterFieldCheckbox({ queryFilter: props }),
      { initialProps: queryFilter },
    );

    // WHEN: 이미 선택된 키 'key1'을 클릭
    act(() => result.current.handleCheckboxClick("queryKey", "key1")());

    // THEN: onUpdateTagValue가 한 번 호출되었는지 확인
    expect(
      mockUseQueryFilterStateStore.onUpdateTagValue,
    ).toHaveBeenCalledOnce();
    // THEN: selectedKey가 [] (빈 배열)로 업데이트되었는지 확인
    expect(mockUseQueryFilterStateStore.onUpdateTagValue).toHaveBeenCalledWith({
      queryKey: "queryKey",
      options: "array",
      selectedKey: [],
    });
  });
});
