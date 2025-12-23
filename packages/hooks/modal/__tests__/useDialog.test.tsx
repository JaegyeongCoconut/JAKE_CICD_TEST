import type { MouseEvent } from "react";

import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import useDialog from "@packages/hooks/modal/useDialog";
import useOnClickOutside from "@packages/hooks/useOnClickOutside";

vi.mock("@packages/hooks/useOnClickOutside", () => ({ default: vi.fn() }));

// DESC: 이벤트 객체의 stopPropagation을 Mocking
const mockStopPropagation = vi.fn();
const mockMouseEvent = {
  stopPropagation: mockStopPropagation,
} as unknown as MouseEvent<Element>;

// DESC: Dialog Opener 역할을 하는 DOM 엘리먼트를 Mocking
const mockDialogOpener = document.createElement("button");
// DESC: Opener 엘리먼트의 focus 함수를 Spy
const mockOpenerFocus = vi.spyOn(mockDialogOpener, "focus");
// DESC: document.activeElement를 Mocking하여 handleDialogOpen 시점에 Opener를 설정하도록 제어
Object.defineProperty(document, "activeElement", {
  configurable: true,
  get: () => mockDialogOpener,
});

beforeEach(() => {
  // DESC: 테스트 시작 전에 실제 타이머 대신 가짜 타이머를 사용하도록 설정 (setTimeout 제어용)
  vi.useFakeTimers();
});

afterEach(() => {
  // DESC: 테스트 종료 후 실제 타이머로 복원
  vi.useRealTimers();
});

describe("useDialog Test", () => {
  test("초기 상태는 isDialogOpen이 false이고 dialogRef는 null이어야 함.", () => {
    // GIVEN: useDialog 훅 렌더링을 위한 Props 정의
    // WHEN: useDialog 훅 렌더링
    const { result } = renderHook(() => useDialog({ disabled: false }));

    // THEN: isDialogOpen 상태와 dialogRef 초기값 확인
    expect(result.current.isDialogOpen).toBe(false);
    expect(result.current.dialogRef.current).toBe(null);
  });

  describe("handleDialogOpen Test", () => {
    test("disabled가 true일 때, 상태 변경 및 이벤트 stopPropagation이 호출되지 않아야 함.", () => {
      // GIVEN: disabled: true로 훅 렌더링
      const { result } = renderHook(() => useDialog({ disabled: true }));

      // WHEN: handleDialogOpen 호출
      act(() => {
        result.current.handleDialogOpen(mockMouseEvent);
      });

      // THEN: 조기 반환(Early Return) 검증
      expect(result.current.isDialogOpen).toBe(false);
      expect(mockStopPropagation).not.toHaveBeenCalled();
    });

    test("disabled가 false일 때, 상태를 true로 변경하고, stopPropagation 및 dialog에 focus를 호출해야 함.", () => {
      // GIVEN: 1. 훅 렌더링 및 dialog focus Mocking 준비
      const { result } = renderHook(() => useDialog({ disabled: false }));
      const mockDialogFocus = vi.fn();

      // GIVEN: 2. dialogRef.current Mocking (focus 검증용)
      // DESC: useRef의 current 속성을 재정의하여 focus 함수가 있는 Mock 객체 연결 (읽기 전용 에러 우회)
      Object.defineProperty(result.current.dialogRef, "current", {
        value: { focus: mockDialogFocus } as unknown as HTMLDialogElement,
        writable: true,
      });

      // WHEN: 1. handleDialogOpen 호출 (상태 변경 및 setTimeout 예약)
      act(() => {
        result.current.handleDialogOpen(mockMouseEvent);
      });

      // THEN: 1. 동기적 로직
      expect(result.current.isDialogOpen).toBe(true);
      expect(mockStopPropagation).toHaveBeenCalled();
      expect(mockDialogFocus).not.toHaveBeenCalled(); // DESC: setTimeout 실행 전이므로 호출되지 않음

      // WHEN: 2. 비동기 로직 실행 (타이머 진행)
      act(() => {
        // DESC: setTimeout(0)에 설정된 focus 로직 강제 실행
        vi.advanceTimersByTime(0);
      });

      // THEN: 2. 비동기 로직
      expect(mockDialogFocus).toHaveBeenCalled();
    });
  });

  describe("handleDialogClose Test", () => {
    test("isDialogOpen이 true일 때, 상태를 false로 변경하고 dialogOpener에 포커스를 복원해야 함.", () => {
      // GIVEN: 1. 훅 렌더링 및 dialogRef Mocking
      const { result } = renderHook(() => useDialog({ disabled: false }));
      Object.defineProperty(result.current.dialogRef, "current", {
        value: document.createElement("dialog") as HTMLDialogElement,
        writable: true,
      });

      // GIVEN: 2. 다이얼로그 열기 (isDialogOpen=true, dialogOpener 설정)
      act(() => {
        result.current.handleDialogOpen(mockMouseEvent);
      });
      // DESC: 열림 시 발생한 focus 기록은 무시하고, 닫힘 시 복원되는 focus만 검증하기 위해 초기화
      mockOpenerFocus.mockClear();

      // WHEN: handleDialogClose 호출
      act(() => {
        result.current.handleDialogClose();
      });

      // THEN:
      expect(result.current.isDialogOpen).toBe(false);
      // DESC: dialogOpener의 focus 함수가 호출되어 포커스가 복원되었는지 확인
      expect(mockOpenerFocus).toHaveBeenCalledTimes(1);
    });

    test("isDialogOpen이 false일 때, 상태 변경 및 focus 복원 행동이 일어나지 않아야 함.", () => {
      // GIVEN: isDialogOpen=false 상태에서 훅 렌더링 (초기 상태)
      const { result } = renderHook(() => useDialog({ disabled: false }));
      mockOpenerFocus.mockClear();

      // WHEN: handleDialogClose 호출
      act(() => {
        result.current.handleDialogClose();
      });

      // THEN:
      expect(result.current.isDialogOpen).toBe(false);
      expect(mockOpenerFocus).not.toHaveBeenCalled();
    });
  });

  test("ESC 키 입력 시 닫히고, 언마운트 시 keydown 리스너가 제거됨.", () => {
    // GIVEN: 1. addEventListener/ removeEventListener 스파이 생성 (리스너 등록/해제 검증용)
    const spyAddEventListener = vi.spyOn(window, "addEventListener");
    const spyRemoveEventListener = vi.spyOn(window, "removeEventListener");

    // GIVEN: 2. 훅 렌더 및 핸들러 추출
    const { result, unmount } = renderHook(() =>
      useDialog({ disabled: false }),
    );

    // DESC: 현재 등록된 keydown 핸들러 함수를 추출
    const handler = spyAddEventListener.mock.calls.find(
      ([type]) => type === "keydown",
    )?.[1] as (e: KeyboardEvent) => void;

    // GIVEN: 3. 다이얼로그 열림 상태로 변경
    act(() => {
      result.current.handleDialogOpen({
        stopPropagation: vi.fn(),
      } as unknown as MouseEvent<Element>);
    });
    expect(result.current.isDialogOpen).toBe(true);

    // WHEN: 1. ESC 키 이벤트 디스패치 → 닫힘 유도
    act(() => {
      handler(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    // THEN: 1. 닫힘 확인
    expect(result.current.isDialogOpen).toBe(false);

    // WHEN: 2. 훅 언마운트 (cleanup 로직 실행 유도)
    unmount();

    // THEN: 2. removeEventListener가 정확한 핸들러를 인자로 받아 호출되었는지 확인
    expect(spyRemoveEventListener).toHaveBeenCalledWith("keydown", handler);

    spyAddEventListener.mockRestore();
    spyRemoveEventListener.mockRestore();
  });

  test("handleToggleDialog: 닫힘→열림, 열림→닫힘 토글이 동작함.", () => {
    // GIVEN: 훅 렌더링
    const { result } = renderHook(() => useDialog({ disabled: false }));

    // WHEN: 1. 닫힘 상태에서 토글 → 열림
    act(() => {
      result.current.handleToggleDialog({
        stopPropagation: vi.fn(),
      } as unknown as MouseEvent<Element>);
    });

    // THEN: 1. 열림 상태 확인
    expect(result.current.isDialogOpen).toBe(true);

    // WHEN: 2. 열림 상태에서 토글 → 닫힘
    act(() => {
      result.current.handleToggleDialog({
        stopPropagation: vi.fn(),
      } as unknown as MouseEvent<Element>);
    });

    // THEN: 2. 닫힘 상태 확인
    expect(result.current.isDialogOpen).toBe(false);
  });
});

describe("useOnClickOutside 연동 테스트", () => {
  test("useOnClickOutside가 dialogRef, handleDialogClose, dialogOpener를 인자로 받아 호출되어야 함.", () => {
    // GIVEN: 1. useOnClickOutside 호출 인수를 캡처하기 위한 Mock 구현
    let capturedHandler: () => void = () => {};
    const mockedUseOnClickOutside = vi.mocked(useOnClickOutside);

    // DESC: Mocking된 useOnClickOutside의 구현을 정의하여 handler를 캡처하고 exceptEl을 검증할 준비
    mockedUseOnClickOutside.mockImplementation(({ handler }) => {
      capturedHandler = handler as () => void;
    });

    // GIVEN: 2. 훅 렌더 및 다이얼로그 열기 (dialogOpener가 설정되도록)
    const { result } = renderHook(() => useDialog({ disabled: false }));
    act(() => {
      result.current.handleDialogOpen({
        stopPropagation: vi.fn(),
      } as unknown as MouseEvent<Element>);
    });
    expect(result.current.isDialogOpen).toBe(true);

    // WHEN: 1. 외부 클릭 시뮬레이션 (캡처된 핸들러 호출)
    act(() => {
      capturedHandler();
    });

    // THEN: 1. 외부 클릭 시 닫힘 확인
    expect(result.current.isDialogOpen).toBe(false);
    // THEN: 2. useOnClickOutside가 올바른 인자를 전달받았는지 확인
    expect(mockedUseOnClickOutside).toHaveBeenCalledWith(
      expect.objectContaining({
        ref: result.current.dialogRef,
        handler: expect.any(Function), // DESC: handleDialogClose
        // DESC: dialogOpener (mockDialogOpener)가 exceptEl로 전달되었는지 확인
        exceptEl: expect.any(HTMLElement),
      }),
    );
  });
});
