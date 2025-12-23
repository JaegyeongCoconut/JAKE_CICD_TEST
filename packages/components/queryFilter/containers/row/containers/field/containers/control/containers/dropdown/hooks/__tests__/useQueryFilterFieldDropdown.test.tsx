import type { ReactNode } from "react";
import React from "react";

import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import type { Languages } from "@repo/types";

import useQueryFilterFieldDropdown from "@packages/queryFilter/containers/row/containers/field/containers/control/containers/dropdown/hooks/useQueryFilterFieldDropdown";
import { QueryFilterFieldStateContext } from "@packages/queryFilter/containers/row/containers/field/context/QueryFilterFieldStateContext";

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

// DESC: QueryFilterFieldStateContext의 Mock 값 설정 (Focus/Blur 핸들러 추적)
const mockContextValue = {
  handleBlur: vi.fn(), // DESC: handleBlur 함수 Mock
  handleFocus: vi.fn(), // DESC: handleFocus 함수 Mock
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

describe("useQueryFilterFieldDropdown Test", () => {
  // GIVEN: 테스트에 사용될 기본 queryFilter 객체
  const queryFilter = {
    type: "dropdown" as const,
    queryKey: "queryKey",
    label: "Label" as Languages,
    selections: [
      { key: "key1", label: "Option A" as Languages },
      { key: "key2", label: "Option B" as Languages },
    ],
    placeholder: "Select the option" as Languages,
    tagValue: "",
  };

  test("초기 렌더 시, isOpenDropdown은 false이여야 함", () => {
    // WHEN: hook을 렌더링
    const { result } = renderHook(
      () => useQueryFilterFieldDropdown({ queryFilter: undefined }), // queryFilter는 상태에 영향 없음
      { wrapper: Wrapper },
    );

    // THEN: 초기 isOpenDropdown 상태는 false여야 함
    expect(result.current.isOpenDropdown).toBe(false);
  });

  test(`queryFilter=undefined라면, handleDropdownOptionClick은 
        updateTagValue와 handleDropdownClose를 호출하지 않고 종료되어야 함`, () => {
    // WHEN: queryFilter: undefined를 전달하여 hook 렌더링
    const { result } = renderHook(
      () => useQueryFilterFieldDropdown({ queryFilter: undefined }),
      { wrapper: Wrapper },
    );

    // WHEN: handleDropdownOptionClick 호출 시도
    act(() => result.current.handleDropdownOptionClick("queryKey", "key")());

    // THEN: 스토어 업데이트 함수는 호출되지 않아야 함
    expect(
      mockUseQueryFilterStateStore.onUpdateTagValue,
    ).not.toHaveBeenCalled();
    // THEN: 드롭다운 닫기 로직(handleBlur)도 호출되지 않아야 함
    expect(mockContextValue.handleBlur).not.toHaveBeenCalled();
  });

  test("handleDropdownOpen 호출 시, isOpenDropdown이 true가 되고 Context의 handleFocus가 호출되어야 함", () => {
    // GIVEN: hook 렌더링
    const { result } = renderHook(
      () => useQueryFilterFieldDropdown({ queryFilter }),
      { wrapper: Wrapper },
    );

    // THEN: 초기 상태 확인
    expect(result.current.isOpenDropdown).toBe(false);

    // WHEN: handleDropdownOpen 호출
    act(() => result.current.handleDropdownOpen());

    // THEN: Context의 handleFocus가 호출되어 필드 포커스 상태가 업데이트되어야 함
    expect(mockContextValue.handleFocus).toHaveBeenCalledOnce();
    // THEN: isOpenDropdown 상태가 true로 변경되어야 함
    expect(result.current.isOpenDropdown).toBe(true);
  });

  test("handleDropdownClose 호출 시, isOpenDropdown이 false가 되고 Context의 handleBlur가 호출되어야 함", () => {
    // GIVEN: hook 렌더링 및 드롭다운 열기
    const { result } = renderHook(
      () => useQueryFilterFieldDropdown({ queryFilter }),
      { wrapper: Wrapper },
    );

    expect(result.current.isOpenDropdown).toBe(false);

    act(() => result.current.handleDropdownOpen()); // DESC: 드롭다운 열림 (전제 조건)

    expect(result.current.isOpenDropdown).toBe(true);

    // WHEN: handleDropdownClose 호출
    act(() => result.current.handleDropdownClose());

    // THEN: Context의 handleBlur가 호출되어 필드 포커스 상태가 해제되어야 함
    expect(mockContextValue.handleBlur).toHaveBeenCalledOnce();
    // THEN: isOpenDropdown 상태가 false로 변경되어야 함
    expect(result.current.isOpenDropdown).toBe(false);
  });

  test(`handleDropdownOptionClick 호출 시 유효한 옵션을 클릭한다면, 
        updateTagValue가 single 옵션과 정확한 키로 호출된 후, 드롭다운이 닫혀야 함`, () => {
    // GIVEN: hook 렌더링
    const { result } = renderHook(
      () => useQueryFilterFieldDropdown({ queryFilter }),
      { wrapper: Wrapper },
    );

    expect(result.current.isOpenDropdown).toBe(false);

    // WHEN: 'key1' 옵션을 클릭
    act(() => result.current.handleDropdownOptionClick("queryKey", "key1")());

    // THEN: 1. 스토어 업데이트 함수가 호출되었는지 확인
    expect(
      mockUseQueryFilterStateStore.onUpdateTagValue,
    ).toHaveBeenCalledOnce();
    // THEN: 2. 'single' 타입과 선택된 키로 올바르게 호출되었는지 확인
    expect(mockUseQueryFilterStateStore.onUpdateTagValue).toHaveBeenCalledWith({
      queryKey: "queryKey",
      options: "single",
      selectedKey: "key1",
    });
    // THEN: 3. 옵션 선택 후, 드롭다운을 닫기 위해 Context의 handleBlur가 호출되어야 함
    expect(mockContextValue.handleBlur).toHaveBeenCalledOnce();
    // THEN: 4. isOpenDropdown 상태가 false로 변경되어야 함
    expect(result.current.isOpenDropdown).toBe(false);
  });
});
