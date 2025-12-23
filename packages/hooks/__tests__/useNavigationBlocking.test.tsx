import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import useNavigationBlocking from "@packages/hooks/useNavigationBlocking";

type LocationType = { pathname: string; search: string };

// DESC: react-router-dom hook/함수 모킹 (useBlocker, useLocation, useNavigate)
const mockRegisterBlocker = vi.fn(); // DESC: useBlocker 인자(핸들러/false) 수집
const mockNavigate = vi.fn();
const mockLocation = { pathname: "/now", search: "" as string };

vi.mock("react-router-dom", () => ({
  // DESC: isDirty ? handler(fn) : false 형태를 그대로 수집
  useBlocker: (
    argument:
      | false
      | ((path: {
          currentLocation: LocationType;
          nextLocation: LocationType;
        }) => boolean),
  ) => mockRegisterBlocker(argument),
  useLocation: () => mockLocation,
  useNavigate: () => mockNavigate,
}));

// DESC: checkIsDirty zustand 스토어 모킹
const mockCheckIsDirtyStore = {
  isDirty: false,
  setIsDirty: vi.fn(),
};
vi.mock("@repo/stores/checkIsDirty", () => ({
  useCheckIsDirtyStore: (
    selector: (store: typeof mockCheckIsDirtyStore) => unknown,
  ) => selector(mockCheckIsDirtyStore),
}));

// DESC: 모달 hook 모킹: open 핸들러로 confirm 콜백 주입
let capturedConfirm: (() => void) | null = null;
const mockHandleNavigationBlockingModalOpen = vi.fn((confirm: () => void) => {
  capturedConfirm = confirm;

  return vi.fn();
});
vi.mock("@packages/hooks/modal/useNavigationBlockingModal", () => ({
  default: () => ({
    handleNavigationBlockingModalOpen: mockHandleNavigationBlockingModalOpen,
  }),
}));

// DESC: beforeunload 등록/해제 spy
const spyAddEventListener = vi.spyOn(window, "addEventListener");
const spyRemoveEventListener = vi.spyOn(window, "removeEventListener");

describe("useNavigationBlocking 통합 테스트", () => {
  test("isDirty=false: useBlocker에 false가 전달되고 네비게이션이 항상 허용됨.", () => {
    // GIVEN:  마운트 (isDirty=false)
    renderHook(() => useNavigationBlocking(false));

    // THEN: useBlocker가 false와 함께 1회 호출
    expect(mockRegisterBlocker).toHaveBeenCalledTimes(1);
    expect(mockRegisterBlocker).toHaveBeenCalledWith(false);

    // THEN: 스토어 동기화
    expect(mockCheckIsDirtyStore.setIsDirty).toHaveBeenCalledWith(false);

    // THEN: beforeunload 리스너는 등록되지 않음
    expect(spyAddEventListener).not.toHaveBeenCalledWith(
      "beforeunload",
      expect.any(Function),
    );
  });

  test("isDirty=true: 같은 경로는 허용(false), 다른 경로는 차단(true)+모달 오픈", () => {
    // GIVEN:  마운트 (isDirty=true)
    renderHook(() => useNavigationBlocking(true));
    expect(mockRegisterBlocker).toHaveBeenCalledTimes(1);

    // GIVEN:  useBlocker에 등록된 핸들러 캡처
    const handler = mockRegisterBlocker.mock.calls[0][0];

    // THEN: 스토어 동기화 + beforeunload 등록
    expect(mockCheckIsDirtyStore.setIsDirty).toHaveBeenCalledWith(true);
    expect(spyAddEventListener).toHaveBeenCalledWith(
      "beforeunload",
      expect.any(Function),
    );

    let allowSame = false;

    act(() => {
      // WHEN: 같은 경로로 이동 시도
      allowSame = handler({
        currentLocation: { pathname: "/now", search: "" },
        nextLocation: { pathname: "/now", search: "" },
      });
    });

    // THEN: 허용(false)
    expect(allowSame).toBe(false);
    expect(mockHandleNavigationBlockingModalOpen).not.toHaveBeenCalled();

    // WHEN: 다른 경로로 이동 시도
    let blocked = false;
    act(() => {
      blocked = handler({
        currentLocation: { pathname: "/now", search: "" },
        nextLocation: { pathname: "/next", search: "?q=1" },
      });
    });
    // THEN: 차단(true) + 모달 오픈
    expect(blocked).toBe(true);
    expect(mockHandleNavigationBlockingModalOpen).toHaveBeenCalledTimes(1);
    expect(typeof capturedConfirm).toBe("function");
  });

  test("모달 확인(confirm) 시 저장된 목적지로 navigate가 호출됨.", () => {
    // GIVEN:  마운트 (isDirty=true) 및 핸들러 획득
    renderHook(() => useNavigationBlocking(true));
    const handler = mockRegisterBlocker.mock.calls[0][0];

    // WHEN: 다른 경로로 이동 시도 → 차단 + confirm 콜백 저장
    act(() => {
      handler({
        currentLocation: { pathname: "/now", search: "" },
        nextLocation: { pathname: "/next", search: "?q=1" },
      });
    });
    expect(typeof capturedConfirm).toBe("function");

    // WHEN: 사용자가 모달에서 '확인'을 누름
    act(() => {
      capturedConfirm && capturedConfirm();
    });

    // THEN: navigate가 목적지로 호출
    expect(mockNavigate).toHaveBeenCalledWith("/next?q=1");
  });

  test("언마운트 시 beforeunload 해제 및 setIsDirty(false)가 호출됨.", () => {
    // GIVEN:  마운트 (isDirty=true)
    const { unmount } = renderHook(() => useNavigationBlocking(true));
    expect(spyAddEventListener).toHaveBeenCalledWith(
      "beforeunload",
      expect.any(Function),
    );

    // WHEN: 언마운트
    unmount();

    // THEN: 리스너 해제 & 정리 이펙트
    expect(spyRemoveEventListener).toHaveBeenCalledWith(
      "beforeunload",
      expect.any(Function),
    );
    expect(mockCheckIsDirtyStore.setIsDirty).toHaveBeenCalledWith(false);
  });

  test("isDirty true => false 전환 시 차단 해제 및 beforeunload 해제가 수행됨.", () => {
    // GIVEN:  true로 시작
    const { rerender } = renderHook(
      ({ isDirty }) => useNavigationBlocking(isDirty),
      // DESC: 등록 상태를 만들기 위해 true로 시작
      { initialProps: { isDirty: true } },
    );
    // GIVEN:  최초엔 핸들러가 등록되어 있어야 함
    expect(mockRegisterBlocker).toHaveBeenCalledWith(expect.any(Function));
    expect(spyAddEventListener).toHaveBeenCalledWith(
      "beforeunload",
      expect.any(Function),
    );

    // WHEN: false로 전환
    rerender({ isDirty: false });

    // THEN: useBlocker(false)로 재호출, beforeunload 해제, store 동기화
    expect(mockRegisterBlocker).toHaveBeenLastCalledWith(false);
    expect(spyRemoveEventListener).toHaveBeenCalledWith(
      "beforeunload",
      expect.any(Function),
    );
    expect(mockCheckIsDirtyStore.setIsDirty).toHaveBeenCalledWith(false);
  });

  test("같은 pathname이지만 다른 search면 차단(true)되고 모달이 오픈됨.", () => {
    // GIVEN:  마운트 (isDirty=true)
    renderHook(() => useNavigationBlocking(true));
    const handler = mockRegisterBlocker.mock.calls[0][0];

    let blocked = false;
    act(() => {
      // WHEN: search만 다른 경로로 이동 시도
      blocked = handler({
        currentLocation: { pathname: "/now", search: "" },
        nextLocation: { pathname: "/now", search: "?page=2" },
      });
    });

    // THEN: 차단 + 모달 오픈
    expect(blocked).toBe(true);
    expect(mockHandleNavigationBlockingModalOpen).toHaveBeenCalledTimes(1);
  });
});
