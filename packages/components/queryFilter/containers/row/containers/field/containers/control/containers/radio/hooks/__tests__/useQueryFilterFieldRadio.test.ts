import { act } from "react";

import { renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import type { Languages } from "@repo/types";

import useQueryFilterFieldRadio from "@packages/queryFilter/containers/row/containers/field/containers/control/containers/radio/hooks/useQueryFilterFieldRadio";

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

describe("useQueryFilterFieldRadio Test", () => {
  test("queryFilter=undefined라면, onUpdateTagValue가 호출되지 않음", () => {
    // WHEN: queryFilter: undefined를 전달하여 hook 렌더링
    const { result } = renderHook(() =>
      useQueryFilterFieldRadio({ queryFilter: undefined }),
    );

    // WHEN: handleRadioButtonClick 함수 호출 시도
    act(() => result.current.handleRadioButtonClick("key")());

    // THEN: 스토어 업데이트 함수(onUpdateTagValue)는 호출되지 않아야 함
    expect(
      mockUseQueryFilterStateStore.onUpdateTagValue,
    ).not.toHaveBeenCalled();
  });

  test("tagValue가 빈 문자열 상태에서 키를 클릭할 때, onUpdateTagValue가 호출되며, selectedKey에 해당 키가 추가되어야 함", () => {
    // GIVEN: tagValue가 빈 문자열("")인 radio 타입 queryFilter (선택 없음 상태)
    const queryFilter = {
      type: "radio" as const,
      queryKey: "queryKey",
      label: "Label" as Languages,
      tagValue: "",
      selections: [{ key: "key1", label: "Option A" as Languages }],
    };

    // WHEN: hook 렌더링
    const { result } = renderHook(() =>
      useQueryFilterFieldRadio({ queryFilter }),
    );

    // WHEN: 'key1' 라디오 버튼 클릭
    act(() => result.current.handleRadioButtonClick("key1")());

    // THEN: onUpdateTagValue가 한 번 호출되었는지 확인
    expect(
      mockUseQueryFilterStateStore.onUpdateTagValue,
    ).toHaveBeenCalledOnce();
    // THEN: options='single'과 selectedKey='key1'로 업데이트되었는지 확인
    expect(mockUseQueryFilterStateStore.onUpdateTagValue).toHaveBeenCalledWith({
      queryKey: "queryKey",
      options: "single",
      selectedKey: "key1",
    });
  });
});
