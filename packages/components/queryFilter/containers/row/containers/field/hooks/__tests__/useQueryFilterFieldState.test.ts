import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import useQueryFilterFieldState from "@packages/queryFilter/containers/row/containers/field/hooks/useQueryFilterFieldState";

describe("useQueryFilterFieldState Test", () => {
  test("초기 호출값은 isFocused=false, hasError=false", () => {
    // WHEN: 훅을 렌더링하고 결과를 추출
    const { result } = renderHook(() => useQueryFilterFieldState());

    // THEN: 초기 isFocused 상태는 false여야 함
    expect(result.current.isFocused).toBe(false);
    // THEN: 초기 hasError 상태는 false여야 함
    expect(result.current.hasError).toBe(false);
  });

  test("handleFocus 호출 -> isFocused=true로 변경", () => {
    // GIVEN: 훅을 렌더링
    const { result } = renderHook(() => useQueryFilterFieldState());

    // WHEN: handleFocus 함수 호출 (act로 상태 변경 캡슐화)
    act(() => result.current.handleFocus());

    // THEN: isFocused 상태가 true로 변경되었는지 확인
    expect(result.current.isFocused).toBe(true);
  });

  test("handleBlur 호출 -> isFocused=false로 변경", () => {
    // GIVEN: 훅을 렌더링하고, 먼저 포커스 상태를 true로 설정
    const { result } = renderHook(() => useQueryFilterFieldState());

    act(() => result.current.handleFocus());

    // THEN: 초기 포커스 설정 확인
    expect(result.current.isFocused).toBe(true);

    // WHEN: handleBlur 함수 호출
    act(() => result.current.handleBlur());

    // THEN: isFocused 상태가 다시 false로 변경되었는지 확인
    expect(result.current.isFocused).toBe(false);
  });

  test("onSetError 호출 -> hasError=true로 변경", () => {
    // GIVEN: 훅을 렌더링하고 초기 에러 상태 확인
    const { result } = renderHook(() => useQueryFilterFieldState());

    expect(result.current.hasError).toBe(false);

    // WHEN: onSetError 함수 호출
    act(() => result.current.onSetError());

    // THEN: hasError 상태가 true로 변경되었는지 확인
    expect(result.current.hasError).toBe(true);
  });

  test("handleErrorClear 호출 -> hasError=false로 변경", () => {
    // GIVEN: 훅을 렌더링하고, 먼저 에러 상태를 true로 설정
    const { result } = renderHook(() => useQueryFilterFieldState());

    act(() => result.current.onSetError());

    // THEN: 에러 설정 확인
    expect(result.current.hasError).toBe(true);

    // WHEN: handleErrorClear 함수 호출
    act(() => result.current.handleErrorClear());

    // THEN: hasError 상태가 false로 변경되었는지 확인
    expect(result.current.hasError).toBe(false);
  });
});
