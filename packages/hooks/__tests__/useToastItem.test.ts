import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

// GIVEN: useToastStore의 deleteToast 함수를 Mock으로 설정
const mockRemoveToast = vi.fn();
const mockToastStore = {
  toasts: [],
  deleteToast: mockRemoveToast,
};
vi.mock("@repo/stores/toast", () => ({
  // DESC: 훅 호출 시 mockToastStore를 selector에 주입
  useToastStore: (selector: (store: typeof mockToastStore) => unknown) =>
    selector(mockToastStore),
}));

import useToastItem from "@packages/hooks/useToastItem";

describe("useToastItem Test", () => {
  // DESC: 각 테스트 시작 전에 vitest의 타이머 기능을 가상 타이머로 대체
  beforeEach(() => {
    vi.useFakeTimers();
  });

  // DESC: 각 테스트 종료 후 가상 타이머를 실제 타이머로 복원
  afterEach(() => {
    vi.useRealTimers();
  });

  test("toastDuration만큼 시간이 지나면, isClosing은 true로 반환됨.", () => {
    // GIVEN: 훅 렌더링 (toastDuration: 1000ms)
    const { result } = renderHook(() =>
      useToastItem({
        id: "toast-id",
        toastDuration: 1000,
        transitionDuration: 2000,
      }),
    );

    // THEN: 초기에는 isClosing 상태가 false인지 확인
    expect(result.current.isClosing).toBe(false);

    // WHEN: toastDuration(1000ms)만큼 시간 경과를 시뮬레이션 (act로 감싸 상태 업데이트 보장)
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // THEN: 지정 시간 경과 후 isClosing이 true가 되어 닫기 애니메이션이 시작되는지 확인
    expect(result.current.isClosing).toBe(true);
  });

  test("toastDuration + transitionDuration만큼 시간이 지나면, removeToast를 호출함.", async () => {
    // GIVEN: 훅 렌더링 (총 제거 시간: 1000ms + 2000ms = 3000ms)
    renderHook(() =>
      useToastItem({
        id: "toast-id",
        toastDuration: 1000,
        transitionDuration: 2000,
      }),
    );

    // THEN: 시간 경과 전에는 removeToast가 호출되지 않았는지 확인
    expect(mockRemoveToast).not.toHaveBeenCalled();

    // WHEN: 닫기 애니메이션 시간까지 포함한 전체 경과 시간(3000ms)을 진행
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // THEN: removeToast가 정확히 1회 호출되었는지 확인
    expect(mockRemoveToast).toHaveBeenCalledOnce();
    // THEN: 토스트 아이템의 ID("toast-id")를 인자로 호출되었는지 확인
    expect(mockRemoveToast).toHaveBeenCalledWith("toast-id");
  });
});
