import type { ChangeEvent, FormEvent, ReactNode } from "react";
import React from "react";

import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import type { Languages } from "@repo/types";

import useQueryFilterFieldInput from "@packages/queryFilter/containers/row/containers/field/containers/control/containers/input/hooks/useQueryFilterFieldInput";
import { QueryFilterFieldStateContext } from "@packages/queryFilter/containers/row/containers/field/context/QueryFilterFieldStateContext";

// DESC: useQueryFilterStateStore의 mock 상태 정의 및 함수 추적
const mockUseQueryFilterStateStore = {
  queryFilters: {},
  onUpdateTagValue: vi.fn(), // DESC: tagValue 업데이트 함수 Mock (적용 버튼/검색 시 호출)
  onUpdateInputValue: vi.fn(), // DESC: inputValue 업데이트 함수 Mock (검색 시 호출)
};
// DESC: useQueryFilterStateStore hook을 mock하여 실제 스토어 대신 mock 객체를 반환하도록 설정
vi.mock("@repo/stores/queryFilterState", () => ({
  useQueryFilterStateStore: (
    selector: (store: typeof mockUseQueryFilterStateStore) => unknown,
  ) => selector(mockUseQueryFilterStateStore),
}));
// DESC: Context의 Mock 값 설정 (Focus/Blur/Error 핸들러 추적)
const mockContextValue = {
  handleBlur: vi.fn(),
  handleFocus: vi.fn(),
  hasError: false,
  isFocused: false,
  handleErrorClear: vi.fn(), // DESC: 에러 해제 함수 Mock
  onSetError: vi.fn(), // DESC: 에러 설정 함수 Mock
};
// DESC: Context Provider Wrapper 컴포넌트
const Wrapper = ({ children }: { children: ReactNode }) => (
  <QueryFilterFieldStateContext.Provider value={mockContextValue}>
    {children}
  </QueryFilterFieldStateContext.Provider>
);

describe("useQueryFilterFieldInput Test", () => {
  // GIVEN: 테스트에 사용될 기본 filter 객체 속성
  const baseFilter = {
    queryKey: "queryKey",
    maxLength: 5,
    placeholder: "Placeholder" as Languages,
    label: "Label" as Languages,
    tagValue: "",
  };
  // GIVEN: FormEvent Mock (preventDefault 추적용)
  const mockFormEvent = {
    preventDefault: vi.fn(),
  } as unknown as FormEvent<HTMLFormElement>;

  // GIVEN: ChangeEvent Mock 생성 헬퍼 함수
  const createMockChangeEvent = (value: string) => {
    return { target: { value } } as ChangeEvent<HTMLInputElement>;
  };

  describe("초기 렌더링 시", () => {
    test("filter=undefined라면, localInputValue가 빈 문자열로 초기화되고 isVisible이 false인지 확인", () => {
      // WHEN: filter: undefined로 hook 렌더링
      const { result } = renderHook(
        () => useQueryFilterFieldInput({ filter: undefined }),
        { wrapper: Wrapper },
      );

      // THEN: isVisible 상태는 false여야 함
      expect(result.current.isVisible).toBe(false);
      // THEN: localInputValue는 빈 문자열로 초기화되어야 함
      expect(result.current.localInputValue).toBe("");
    });

    test("localInputValue가 filter?.inputValue 값으로 올바르게 초기화되고 isVisible이 false인지 확인", () => {
      // GIVEN: inputValue가 있는 filter 객체
      const filter = {
        ...baseFilter,
        type: "input" as const,
        inputValue: "inputValue",
      };

      // WHEN: hook 렌더링
      const { result } = renderHook(
        () => useQueryFilterFieldInput({ filter }),
        { wrapper: Wrapper },
      );

      // THEN: isVisible 상태는 false여야 함
      expect(result.current.isVisible).toBe(false);
      // THEN: localInputValue가 filter.inputValue 값으로 초기화되어야 함
      expect(result.current.localInputValue).toBe("inputValue");
    });
  });

  test("handleInputFocus 호출 시, filter=undefined이면, handleFocus를 호출하지 않고 종료되는지 확인", () => {
    // GIVEN: filter: undefined로 hook 렌더링
    const { result } = renderHook(
      () => useQueryFilterFieldInput({ filter: undefined }),
      { wrapper: Wrapper },
    );

    // WHEN: handleInputFocus 호출
    act(() => result.current.handleInputFocus());

    // THEN: Context의 handleFocus는 호출되지 않아야 함
    expect(mockContextValue.handleFocus).not.toHaveBeenCalled();
    // THEN: isVisible 상태도 변경되지 않아야 함
    expect(result.current.isVisible).toBe(false);
  });

  test("handleInputFocus 호출 시, handleFocus 함수가 호출되고, isVisible이 true로 설정되는지 확인", () => {
    // GIVEN: 유효한 filter로 hook 렌더링
    const filter = {
      ...baseFilter,
      type: "input" as const,
      inputValue: "",
    };

    const { result } = renderHook(() => useQueryFilterFieldInput({ filter }), {
      wrapper: Wrapper,
    });

    // WHEN: handleInputFocus 호출
    act(() => result.current.handleInputFocus());

    // THEN: Context의 handleFocus가 한 번 호출되어야 함
    expect(mockContextValue.handleFocus).toHaveBeenCalledOnce();
    // THEN: isVisible 상태가 true로 변경되어야 함
    expect(result.current.isVisible).toBe(true);
  });

  test(`handleInputBlur 호출 시, 
        filter=undefined이면, handleBlur 및 handleErrorClear를 호출하지 않고 종료되는지 확인`, () => {
    // GIVEN: filter: undefined로 hook 렌더링
    const { result } = renderHook(
      () => useQueryFilterFieldInput({ filter: undefined }),
      { wrapper: Wrapper },
    );

    // WHEN: handleInputBlur 호출
    act(() => result.current.handleInputBlur());

    // THEN: Context의 handleBlur는 호출되지 않아야 함
    expect(mockContextValue.handleBlur).not.toHaveBeenCalled();
    // THEN: Context의 handleErrorClear는 호출되지 않아야 함
    expect(mockContextValue.handleErrorClear).not.toHaveBeenCalled();
    // THEN: isVisible 상태도 변경되지 않아야 함
    expect(result.current.isVisible).toBe(false);
  });

  test(`handleInputBlur 호출 시, 
        handleBlur, handleErrorClear 함수가 호출되고, isVisible이 false로 설정되는지 확인`, () => {
    // GIVEN: 유효한 filter로 hook 렌더링
    const filter = {
      ...baseFilter,
      type: "input" as const,
      inputValue: "",
    };

    const { result } = renderHook(() => useQueryFilterFieldInput({ filter }), {
      wrapper: Wrapper,
    });

    // WHEN: handleInputBlur 호출
    act(() => result.current.handleInputBlur());

    // THEN: Context의 handleBlur가 한 번 호출되어야 함
    expect(mockContextValue.handleBlur).toHaveBeenCalledOnce();
    // THEN: Context의 handleErrorClear가 한 번 호출되어야 함
    expect(mockContextValue.handleErrorClear).toHaveBeenCalledOnce();
    // THEN: isVisible 상태가 false로 변경되어야 함
    expect(result.current.isVisible).toBe(false);
  });

  test(`handleApplyButtonMouseDown 호출 시, 
        filter=undefined이면, onUpdateTagValue 등 모든 함수를 호출하지 않고 종료되는지 확인`, () => {
    // GIVEN: filter: undefined로 hook 렌더링
    const { result } = renderHook(
      () => useQueryFilterFieldInput({ filter: undefined }),
      { wrapper: Wrapper },
    );

    // WHEN: handleApplyButtonMouseDown 호출
    act(() => result.current.handleApplyButtonMouseDown("queryKey")());

    // THEN: 모든 스토어 및 컨텍스트 업데이트 함수는 호출되지 않아야 함
    expect(
      mockUseQueryFilterStateStore.onUpdateInputValue,
    ).not.toHaveBeenCalled();
    expect(
      mockUseQueryFilterStateStore.onUpdateTagValue,
    ).not.toHaveBeenCalled();
    expect(mockContextValue.handleBlur).not.toHaveBeenCalled();
    expect(mockContextValue.handleErrorClear).not.toHaveBeenCalled();
  });

  test(`handleApplyButtonMouseDown 호출 시, 
        updateTagValue와 updateInputValue가 localInputValue로 올바르게 호출되고, 
        닫기 로직이 모두 실행되는지 확인`, () => {
    // GIVEN: 유효한 filter와 localInputValue
    const filter = {
      ...baseFilter,
      type: "input" as const,
      inputValue: "inputValue",
    };

    const { result } = renderHook(() => useQueryFilterFieldInput({ filter }), {
      wrapper: Wrapper,
    });

    // WHEN: handleApplyButtonMouseDown 호출
    act(() => result.current.handleApplyButtonMouseDown("queryKey")());

    // THEN: onUpdateInputValue가 localInputValue("inputValue")로 호출되어야 함
    expect(
      mockUseQueryFilterStateStore.onUpdateInputValue,
    ).toHaveBeenCalledOnce();
    expect(
      mockUseQueryFilterStateStore.onUpdateInputValue,
    ).toHaveBeenCalledWith({ queryKey: "queryKey", inputValue: "inputValue" });

    // THEN: onUpdateTagValue가 localInputValue("inputValue")로 호출되어야 함
    expect(
      mockUseQueryFilterStateStore.onUpdateTagValue,
    ).toHaveBeenCalledOnce();
    expect(mockUseQueryFilterStateStore.onUpdateTagValue).toHaveBeenCalledWith({
      queryKey: "queryKey",
      options: "single",
      selectedKey: "inputValue",
    });

    // THEN: 닫기 로직 (handleBlur, handleErrorClear, isVisible=false) 실행 확인
    expect(mockContextValue.handleBlur).toHaveBeenCalledOnce();
    expect(mockContextValue.handleErrorClear).toHaveBeenCalledOnce();
    expect(result.current.isVisible).toBe(false);
  });

  test("handleInputChange 호출 시, filter=undefined이면, onSetError 및 handleErrorClear를 호출하지 않고 종료되는지 확인", () => {
    // GIVEN: filter: undefined로 hook 렌더링
    const { result } = renderHook(
      () => useQueryFilterFieldInput({ filter: undefined }),
      { wrapper: Wrapper },
    );

    // WHEN: handleInputChange 호출
    act(() =>
      result.current.handleInputChange(createMockChangeEvent("anyValue")),
    );

    // THEN: localInputValue는 변경되지 않아야 함
    expect(result.current.localInputValue).toBe("");
    // THEN: 에러 관련 Context 함수는 호출되지 않아야 함
    expect(mockContextValue.handleErrorClear).not.toHaveBeenCalled();
    expect(mockContextValue.onSetError).not.toHaveBeenCalled();
  });

  describe("handleInputChange 호출 시", () => {
    test("type=input라면, regExp 관련 로직 없이 localInputValue만 업데이트되는지 확인", () => {
      // GIVEN: 일반 input 타입 filter
      const value = "changeInputValue";
      const filter = {
        ...baseFilter,
        type: "input" as const,
        inputValue: "",
      };

      const { result } = renderHook(
        () => useQueryFilterFieldInput({ filter }),
        { wrapper: Wrapper },
      );

      // WHEN: handleInputChange 호출
      act(() => result.current.handleInputChange(createMockChangeEvent(value)));

      // THEN: localInputValue가 새로운 값으로 업데이트되어야 함
      expect(result.current.localInputValue).toBe(value);
    });

    describe("type=inputRegExp라면", () => {
      test("regExp에 유효한 값 입력 시, handleErrorClear가 호출되며, localInputValue가 업데이트되는지 확인", () => {
        // GIVEN: 숫자만 허용하는 inputRegExp 타입 filter
        const value = "123456789";
        const filter = {
          ...baseFilter,
          type: "inputRegExp" as const,
          regExp: /[^0-9]/g,
          inputValue: "",
        };

        const { result } = renderHook(
          () => useQueryFilterFieldInput({ filter }),
          { wrapper: Wrapper },
        );

        // WHEN: 유효한 값 입력
        act(() =>
          result.current.handleInputChange(createMockChangeEvent(value)),
        );

        // THEN: handleErrorClear가 호출되어야 함 (유효한 입력이므로 에러 해제)
        expect(mockContextValue.handleErrorClear).toHaveBeenCalledOnce();
        // THEN: localInputValue가 업데이트되어야 함
        expect(result.current.localInputValue).toBe(value);
      });

      test(`regExp에 해당하는 유효하지 않은 문자가 포함된 값 입력 시, 
            onSetError가 호출되고, 해당 문자가 제거된 후 localInputValue가 업데이트되는지 확인`, () => {
        // GIVEN: 숫자만 허용하는 inputRegExp 타입 filter
        const filter = {
          ...baseFilter,
          type: "inputRegExp" as const,
          queryKey: "queryKey",
          maxLength: 100,
          regExp: /[^0-9]/g,
          inputValue: "",
        };

        const { result } = renderHook(
          () => useQueryFilterFieldInput({ filter }),
          { wrapper: Wrapper },
        );

        // WHEN: 유효하지 않은 문자("ABC ")가 포함된 값 입력
        act(() =>
          result.current.handleInputChange(
            createMockChangeEvent("123456789ABC "),
          ),
        );

        // THEN: onSetError가 호출되어야 함 (유효성 검사 실패)
        expect(mockContextValue.onSetError).toHaveBeenCalledOnce();
        // THEN: 유효하지 않은 문자가 제거된 값 ("123456789")으로 localInputValue가 업데이트되어야 함
        expect(result.current.localInputValue).toBe("123456789");
      });
    });

    describe("type=inputRegExpFullLength라면", () => {
      test(`fullLengthRegExp에 유효한 값이 입력되고, 길이가 maxLength와 일치할 때, 
            handleErrorClear가 호출되고 localInputValue가 업데이트되는지 확인`, () => {
        // GIVEN: 길이 5, 숫자만 허용하는 inputRegExpFullLength 타입 filter
        const value = "12345";
        const filter = {
          ...baseFilter,
          type: "inputRegExpFullLength" as const,
          regExp: /[^0-9]/g,
          inputValue: "",
        };

        const { result } = renderHook(
          () => useQueryFilterFieldInput({ filter }),
          { wrapper: Wrapper },
        );

        // WHEN: 유효한 값 (길이 5) 입력
        act(() =>
          result.current.handleInputChange(createMockChangeEvent(value)),
        );

        // THEN: handleErrorClear가 호출되어야 함 (정규식 및 길이 모두 유효)
        expect(mockContextValue.handleErrorClear).toHaveBeenCalledOnce();
        expect(result.current.localInputValue).toBe(value);
      });

      test(`fullLengthRegExp에 해당하는 유효하지 않은 문자가 포함된 값 입력 시, 
            onSetError가 호출되고, 해당 문자가 제거된 후 localInputValue가 업데이트되는지 확인`, () => {
        // GIVEN: 길이 5, 숫자만 허용하는 inputRegExpFullLength 타입 filter
        const filter = {
          ...baseFilter,
          type: "inputRegExpFullLength" as const,
          regExp: /[^0-9]/g,
          inputValue: "",
        };

        const { result } = renderHook(
          () => useQueryFilterFieldInput({ filter }),
          { wrapper: Wrapper },
        );

        // WHEN: 유효하지 않은 문자("A ")가 포함된 값 입력
        act(() =>
          result.current.handleInputChange(createMockChangeEvent("1234A ")),
        );

        // THEN: onSetError가 호출되어야 함 (정규식 실패)
        expect(mockContextValue.onSetError).toHaveBeenCalledOnce();
        // THEN: 유효하지 않은 문자가 제거된 값 ("1234")으로 localInputValue가 업데이트되어야 함
        expect(result.current.localInputValue).toBe("1234");
      });

      test(`길이가 maxLength보다 짧거나 긴 값 입력 시, 
            fullLengthRegExp 검사와 관계없이 onSetError가 호출되고, 
            localInputValue가 업데이트되는지 확인`, () => {
        // GIVEN: 길이 5, 숫자만 허용하는 inputRegExpFullLength 타입 filter
        const filter = {
          ...baseFilter, // maxLength: 5
          type: "inputRegExpFullLength" as const,
          regExp: /[^0-9]/g,
          inputValue: "",
        };

        const { result } = renderHook(
          () => useQueryFilterFieldInput({ filter }),
          { wrapper: Wrapper },
        );

        // WHEN: 길이가 긴 값 (8자리) 입력
        act(() =>
          result.current.handleInputChange(createMockChangeEvent("12345678")),
        );

        // THEN: onSetError가 호출되어야 함 (길이 불일치)
        expect(mockContextValue.onSetError).toHaveBeenCalledOnce();
        // THEN: localInputValue는 업데이트됨
        expect(result.current.localInputValue).toBe("12345678");

        // WHEN: 길이가 짧은 값 (3자리) 입력
        act(() =>
          result.current.handleInputChange(createMockChangeEvent("123")),
        );

        // THEN: onSetError가 다시 호출되어야 함 (길이 불일치)
        expect(mockContextValue.onSetError).toHaveBeenCalledTimes(2);
        // THEN: localInputValue는 업데이트됨
        expect(result.current.localInputValue).toBe("123");
      });
    });
  });

  test(`handleInputSearch 호출 시, 
        filter=undefined이면, preventDefault 및 모든 업데이트/닫기 함수를 호출하지 않고 종료되어야 함`, () => {
    // GIVEN: filter: undefined로 hook 렌더링
    const { result } = renderHook(
      () => useQueryFilterFieldInput({ filter: undefined }),
      { wrapper: Wrapper },
    );

    // WHEN: handleInputSearch 호출
    act(() => result.current.handleInputSearch("queryKey")(mockFormEvent));

    // THEN: preventDefault 호출되지 않음
    expect(mockFormEvent.preventDefault).not.toHaveBeenCalled();
    // THEN: 모든 스토어 및 컨텍스트 업데이트/닫기 함수 호출되지 않음
    expect(
      mockUseQueryFilterStateStore.onUpdateInputValue,
    ).not.toHaveBeenCalled();
    expect(
      mockUseQueryFilterStateStore.onUpdateTagValue,
    ).not.toHaveBeenCalled();
    expect(mockContextValue.handleBlur).not.toHaveBeenCalled();
  });

  test(`handleInputSearch 호출 시, 
        filter는 유효하지만 localInputValue가 빈 문자열일 때, 
        preventDefault가 호출되고 alert가 호출되며 스토어 업데이트는 하지 않는지 확인`, () => {
    // GIVEN: alert Mock 및 localInputValue가 빈 문자열인 filter
    const spyAlert = vi
      .spyOn(window, "alert")
      .mockImplementation((text) => text);
    const filter = {
      ...baseFilter,
      type: "input" as const,
      inputValue: "",
    };

    const { result } = renderHook(() => useQueryFilterFieldInput({ filter }), {
      wrapper: Wrapper,
    });

    // WHEN: handleInputSearch 호출
    act(() => result.current.handleInputSearch("queryKey")(mockFormEvent));

    // THEN: alert가 호출되어야 함
    expect(spyAlert).toHaveBeenCalledOnce();
    expect(spyAlert).toHaveBeenCalledWith("Please enter a search keyword.");
    // THEN: FormEvent의 preventDefault가 호출되어야 함
    expect(mockFormEvent.preventDefault).toHaveBeenCalledOnce();
    // THEN: 스토어 업데이트 및 닫기 로직은 호출되지 않아야 함
    expect(
      mockUseQueryFilterStateStore.onUpdateInputValue,
    ).not.toHaveBeenCalled();
    expect(
      mockUseQueryFilterStateStore.onUpdateTagValue,
    ).not.toHaveBeenCalled();
    expect(mockContextValue.handleBlur).not.toHaveBeenCalled();
  });

  test(`handleInputSearch 호출 시, 
        updateTagValue와 updateInputValue가 올바르게 호출되며, 닫기 로직이 실행되는지 확인`, () => {
    // GIVEN: 유효한 localInputValue
    const spyAlert = vi
      .spyOn(window, "alert")
      .mockImplementation((text) => text);
    const filter = {
      ...baseFilter,
      type: "input" as const,
      inputValue: "inputValue",
    };

    const { result } = renderHook(() => useQueryFilterFieldInput({ filter }), {
      wrapper: Wrapper,
    });

    // WHEN: handleInputSearch 호출
    act(() => result.current.handleInputSearch("queryKey")(mockFormEvent));

    // THEN: alert는 호출되지 않아야 함
    expect(spyAlert).not.toHaveBeenCalled();
    // THEN: preventDefault가 호출되어야 함
    expect(mockFormEvent.preventDefault).toHaveBeenCalledOnce();

    // THEN: onUpdateInputValue가 호출되어야 함
    expect(
      mockUseQueryFilterStateStore.onUpdateInputValue,
    ).toHaveBeenCalledOnce();
    expect(
      mockUseQueryFilterStateStore.onUpdateInputValue,
    ).toHaveBeenCalledWith({ queryKey: "queryKey", inputValue: "inputValue" });

    // THEN: onUpdateTagValue가 호출되어야 함
    expect(
      mockUseQueryFilterStateStore.onUpdateTagValue,
    ).toHaveBeenCalledOnce();
    expect(mockUseQueryFilterStateStore.onUpdateTagValue).toHaveBeenCalledWith({
      queryKey: "queryKey",
      options: "single",
      selectedKey: "inputValue",
    });

    // THEN: 닫기 로직 (handleBlur, isVisible=false) 실행 확인
    expect(mockContextValue.handleBlur).toHaveBeenCalledOnce();
    expect(result.current.isVisible).toBe(false);
  });

  test(`useEffect를 통해 filter.inputValue prop이 변경된다면, 
        localInputValue가 새로운 prop 값으로 업데이트되는지 확인`, () => {
    // GIVEN: 초기 inputValue가 빈 문자열인 filter
    const filter = {
      ...baseFilter,
      type: "input" as const,
      inputValue: "",
    };

    const { result, rerender } = renderHook(
      (props) => useQueryFilterFieldInput({ filter: props }),
      { wrapper: Wrapper, initialProps: filter },
    );

    // THEN: 초기 localInputValue 확인
    expect(result.current.localInputValue).toBe("");

    // WHEN: filter prop의 inputValue가 "inputValue"로 변경되어 rerender
    rerender({ ...filter, inputValue: "inputValue" });

    // THEN: localInputValue가 새로운 prop 값으로 업데이트되어야 함
    expect(result.current.localInputValue).toBe("inputValue");
  });
});
