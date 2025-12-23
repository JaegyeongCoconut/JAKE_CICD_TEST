import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

import useHasDebugError from "@packages/hooks/useHasDebugError";

const mockOnGetHasError = vi.fn();
vi.mock("@repo/stores/apiDebug", () => ({
  useApiDebugStore: (
    selector: (store: { onGetHasError: typeof mockOnGetHasError }) => unknown,
  ) => selector({ onGetHasError: mockOnGetHasError }),
}));

afterEach(() => {
  // DESC: 환경 변수 모두 해제하여 테스트 환경 정리
  vi.unstubAllEnvs();
});

describe("useHasDebugError Test", () => {
  test("NODE_ENV development이 아니면 false 반환", () => {
    // GIVEN: NODE_ENV를 production으로 변경
    vi.stubEnv("NODE_ENV", "production");

    // GIVEN: useHasDebugError hook 렌더링
    const { result } = renderHook(() => useHasDebugError());

    // THEN: useHasDebugError hook 반환값 false 확인
    expect(result.current).toBe(false);
  });

  test("NODE_ENV development이면 useApiDebugStore의 onGetHasError 함수 호출 ", () => {
    // GIVEN: NODE_ENV를 development로 변경
    vi.stubEnv("NODE_ENV", "development");

    // GIVEN: mockOnGetHasError가 true를 반환하도록 설정
    mockOnGetHasError.mockReturnValue(true);

    // GIVEN: useHasDebugError hook 렌더링
    const { result } = renderHook(() => useHasDebugError());

    // THEN: mockOnGetHasError 함수가 호출되었는지 확인
    expect(mockOnGetHasError).toHaveBeenCalledOnce();
    // THEN: useHasDebugError hook 반환값 true 확인
    expect(result.current).toBe(true);
  });
});
