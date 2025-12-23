import { renderHook, act } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import useToggle from "@packages/hooks/useToggle";

describe("useToggle Test", () => {
  test("initIsValue를 설정하지 않으면 false로 초기화함.", () => {
    // WHEN: 인자 없이 hook 렌더링 (초기값 미설정)
    const { result } = renderHook(() => useToggle());

    // THEN: 반환된 isValue(첫 번째 요소)가 기본값 false인지 확인
    expect(result.current[0]).toBe(false);
  });

  test("initIsValue를 true로 설정하면 true로 반환됨.", () => {
    // WHEN: 초기값을 true로 설정하여 hook 렌더링
    const { result } = renderHook(() => useToggle(true));

    // THEN: 반환된 isValue가 설정된 값 true인지 확인
    expect(result.current[0]).toBe(true);
  });

  test("handleValue를 1번 호출하면 상태를 반전함.", () => {
    // GIVEN: 초기값을 false로 설정하여 hook 렌더링
    const { result } = renderHook(() => useToggle(false));

    // WHEN: 상태 변경 동작(handleValue 호출)은 act로 감싸 React 업데이트 사이클 보장
    act(() => {
      // DESC: handleValue (토글 함수) 실행: false -> true로 변경 시도
      result.current[1]();
    });

    // THEN: isValue 상태가 반전되어 true가 되었는지 확인
    expect(result.current[0]).toBe(true);
  });
});
