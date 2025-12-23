import type { DragEvent } from "react";

import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, test, vi } from "vitest";

import useDragDropRoute from "@packages/hooks/useDragDropRoute";

// GIVEN: 드래그 완료 시 실행될 콜백 함수 Mock
const mockCallbackFn = vi.fn();
// GIVEN: 이벤트 기본 동작 차단 함수 Mock
const mockPreventDefault = vi.fn();
// GIVEN: DragEvent<HTMLElement> Mock 객체
const mockDragEvent = {
  preventDefault: mockPreventDefault,
} as unknown as DragEvent<HTMLElement>;

describe("useDragDropRoute Test", () => {
  // DESC: 각 테스트 시작 전 Mock 함수들의 호출 기록 초기화
  beforeEach(() => {
    mockCallbackFn.mockClear();
    mockPreventDefault.mockClear();
  });

  test("useDragDropRoute hook 마운트 시 모든 상태가 초기화됨.", () => {
    // WHEN: hook 렌더링
    const { result } = renderHook(() => useDragDropRoute(mockCallbackFn));

    // THEN: 모든 드래그 상태가 초기값(false 또는 빈 문자열)인지 확인
    expect(result.current.isMute).toBe(false);
    expect(result.current.draggableId).toBe("");
    expect(result.current.dragTargetId).toBe("");
    expect(result.current.dropTargetId).toBe("");
  });

  describe("handleSetDraggable Test", () => {
    // GIVEN: 초기 hook 상태(비교용)
    const { result: initialResult } = renderHook(() =>
      useDragDropRoute(mockCallbackFn),
    );

    // WHEN: 다양한 id 값을 handleSetDraggableId에 전달하고 반환된 핸들러 실행
    it.each([
      { id: "new-draggable-id", expected: "new-draggable-id" }, // DESC: 유효한 ID
      { id: "    ", expected: "    " }, // DESC: 공백 문자열 (유효성 검사는 hook 내에서 처리)
      { id: undefined, expected: initialResult.current.draggableId }, // DESC: undefined
      { id: "", expected: initialResult.current.draggableId }, // DESC: 빈 문자열
    ])("id가 $id일 경우, draggableId는 $expected가 됨.", ({ id, expected }) => {
      const { result } = renderHook(() => useDragDropRoute(mockCallbackFn));

      act(() => {
        result.current.handleSetDraggableId(id)();
      });

      // THEN: draggableId가 예상 값과 일치하는지 확인
      expect(result.current.draggableId).toBe(expected);
    });
  });

  describe("handleDragStart Test", () => {
    beforeEach(() => {
      mockCallbackFn.mockClear();
      mockPreventDefault.mockClear();
    });

    // GIVEN: 초기 hook 상태(비교용)
    const { result: initialResult } = renderHook(() =>
      useDragDropRoute(mockCallbackFn),
    );

    // WHEN: 다양한 id 값을 handleDragStart에 전달하고 반환된 핸들러 실행
    it.each([
      {
        id: "new-target-id",
        expected: { dragTargetId: "new-target-id", isMute: true }, // DESC: 유효한 ID → 상태 변경 + isMute=true
      },
      {
        id: "    ",
        expected: { dragTargetId: "    ", isMute: true }, // DESC: 공백 문자열 → 상태 변경 + isMute=true
      },
      {
        id: undefined,
        expected: {
          dragTargetId: initialResult.current.dragTargetId, // DESC: undefined → 상태 변화 없음
          isMute: initialResult.current.isMute,
        },
      },
      {
        id: "",
        expected: {
          dragTargetId: initialResult.current.dragTargetId, // DESC: 빈 문자열 → 상태 변화 없음
          isMute: initialResult.current.isMute,
        },
      },
    ])(
      "id가 $id일 경우, dragTargetId는 $expected.dragTargetId가 되고, isMute는 $expected.isMute가 됨.",
      ({ id, expected }) => {
        const { result } = renderHook(() => useDragDropRoute(mockCallbackFn));

        act(() => {
          result.current.handleDragStart(id)();
        });

        // THEN: dragTargetId와 isMute가 예상 값과 일치하는지 확인
        expect(result.current.dragTargetId).toBe(expected.dragTargetId);
        expect(result.current.isMute).toBe(expected.isMute);
      },
    );
  });

  describe("handleDragEnter Test", () => {
    beforeEach(() => {
      mockCallbackFn.mockClear();
      mockPreventDefault.mockClear();
    });

    // GIVEN: 초기 hook 상태(비교용)
    const { result: initialResult } = renderHook(() =>
      useDragDropRoute(mockCallbackFn),
    );

    // WHEN: 다양한 id 값을 handleDragEnter에 전달하고 반환된 핸들러 실행
    it.each([
      { id: "new-drop-target-id", expected: "new-drop-target-id" }, // DESC: 유효한 ID → dropTargetId 변경
      { id: "    ", expected: "    " }, // DESC: 공백 문자열 → dropTargetId 변경
      { id: undefined, expected: initialResult.current.dropTargetId }, // DESC: undefined → 상태 변화 없음
      { id: "", expected: initialResult.current.dropTargetId }, // DESC: 빈 문자열 → 상태 변화 없음
    ])(
      "id가 $id일 경우, dropTargetId는 $expected가 됨.",
      ({ id, expected }) => {
        const { result } = renderHook(() => useDragDropRoute(mockCallbackFn));

        act(() => {
          result.current.handleDragEnter(id)();
        });

        // THEN: dropTargetId가 예상 값과 일치하는지 확인
        expect(result.current.dropTargetId).toBe(expected);
      },
    );
  });

  describe("handleDragEnd Test", () => {
    beforeEach(() => {
      mockCallbackFn.mockClear();
      mockPreventDefault.mockClear();
    });

    // GIVEN: 초기 hook 상태(비교용)
    const { result: initialResult } = renderHook(() =>
      useDragDropRoute(mockCallbackFn),
    );

    // WHEN: 다양한 id 값을 handleDragEnd에 전달하고 반환된 핸들러 실행
    it.each([
      {
        id: "new-target-id",
        expected: {
          isMute: false, // DESC: isMute=false
          draggableId: "", // DESC: draggableId 초기화
          dragTargetId: "", // DESC: dragTargetId 초기화
          dropTargetId: initialResult.current.dropTargetId, // DESC: dropTargetId는 유지됨 (별도 로직 검증 필요)
        },
      },
      {
        id: "    ",
        expected: {
          isMute: false,
          draggableId: "",
          dragTargetId: "",
          dropTargetId: initialResult.current.dropTargetId,
        },
      },
      {
        id: undefined,
        expected: {
          isMute: initialResult.current.isMute,
          draggableId: initialResult.current.draggableId,
          dragTargetId: initialResult.current.dragTargetId,
          dropTargetId: initialResult.current.dropTargetId,
        },
      },
      {
        id: "",
        expected: {
          isMute: initialResult.current.isMute,
          draggableId: initialResult.current.draggableId,
          dragTargetId: initialResult.current.dragTargetId,
          dropTargetId: initialResult.current.dropTargetId,
        },
      },
    ])("id가 $id일 경우, drag 관련 상태가 초기화됨.", ({ id, expected }) => {
      const { result } = renderHook(() => useDragDropRoute(mockCallbackFn));

      act(() => {
        result.current.handleDragEnd(id)();
      });

      // THEN: 드래그 종료에 따른 상태 초기화 검증
      expect(result.current.isMute).toBe(expected.isMute);
      expect(result.current.dragTargetId).toBe(expected.dragTargetId);
      expect(result.current.dropTargetId).toBe(expected.dropTargetId);
      expect(result.current.draggableId).toBe(expected.draggableId);
    });

    test("handleDragEnd 함수 호출 시 dropTargetId 값이 유효하면 ''으로 초기화함.", () => {
      const { result } = renderHook(() => useDragDropRoute(mockCallbackFn));
      const targetId = "target-id";

      // GIVEN: dropTargetId 값을 미리 설정
      act(() => {
        result.current.handleDragEnter(targetId)();
      });
      // WHEN: handleDragEnd 호출 (dragTargetId와 무관하게 dropTargetId 초기화 로직 검증)
      act(() => {
        result.current.handleDragEnd(targetId)();
      });

      // THEN: dropTargetId가 ""으로 초기화되었는지 확인
      expect(result.current.dropTargetId).toBe("");
    });
  });

  describe("handleDragOver Test", () => {
    beforeEach(() => {
      mockCallbackFn.mockClear();
      mockPreventDefault.mockClear();
    });

    test("dragover 이벤트 발생 시 e.preventDefault()가 호출되어 기본 동작을 차단", () => {
      // GIVEN: hook 렌더링
      const { result } = renderHook(() => useDragDropRoute(mockCallbackFn));

      // WHEN: handleDragOver에 Mock DragEvent 전달
      result.current.handleDragOver(mockDragEvent);

      // THEN: 이벤트 기본 동작 차단 함수가 1회 호출되었는지 확인
      expect(mockPreventDefault).toHaveBeenCalledTimes(1);
    });
  });

  describe("handleDrop Test", () => {
    beforeEach(() => {
      mockCallbackFn.mockClear();
      mockPreventDefault.mockClear();
    });

    test("drop 이벤트 발생 시 e.preventDefault()가 호출되어 기본 동작을 차단", () => {
      // GIVEN: hook 렌더링
      const { result } = renderHook(() => useDragDropRoute(mockCallbackFn));

      // WHEN: handleDrop에 Mock DragEvent 전달
      result.current.handleDrop(mockDragEvent);

      // THEN: 이벤트 기본 동작 차단 함수가 1회 호출되었는지 확인
      expect(mockPreventDefault).toHaveBeenCalledTimes(1);
    });

    test("dragTargetId와 dropTargetId가 모두 유효하고 다를 경우, callbackFn이 호출되고 dropTargetId를 초기화함.", () => {
      const { result } = renderHook(() => useDragDropRoute(mockCallbackFn));

      const dragTargetId = "drag-target-id";
      const dropTargetId = "drop-target-id";

      // GIVEN: 드래그/드롭 타겟 ID를 유효하고 다르게 설정
      act(() => {
        result.current.handleDragStart(dragTargetId)();
        result.current.handleDragEnter(dropTargetId)();
      });
      // WHEN: handleDrop 호출
      act(() => {
        result.current.handleDrop(mockDragEvent);
      });

      // THEN: 콜백 함수가 dragTargetId와 dropTargetId를 인자로 1회 호출되었는지 확인
      expect(mockCallbackFn).toHaveBeenCalledTimes(1);
      expect(mockCallbackFn).toHaveBeenCalledWith(dragTargetId, dropTargetId);
      // THEN: 드롭 완료 후 dropTargetId가 ""으로 초기화되었는지 확인
      expect(result.current.dropTargetId).toBe("");
    });

    test("dropTargetId 값이 유효하지 않으면, callbackFn을 호출하지 않고 dropTargetId를 유지함.", () => {
      const { result } = renderHook(() => useDragDropRoute(mockCallbackFn));

      const dropTargetId = "";

      // GIVEN: dragTargetId는 유효, dropTargetId는 빈 문자열
      act(() => {
        result.current.handleDragStart("drag-id")();
        result.current.handleDragEnter(dropTargetId)();
      });
      // WHEN: handleDrop 호출
      act(() => {
        result.current.handleDrop(mockDragEvent);
      });

      // THEN: dropTargetId가 유효하지 않아 콜백은 호출되지 않음
      expect(mockCallbackFn).not.toHaveBeenCalled();
      // THEN: dropTargetId는 여전히 유효하지 않은 값("")으로 유지됨
      expect(result.current.dropTargetId).toBe(dropTargetId);
    });

    // WHEN: dragTargetId 유효성, dropTargetId 일치 여부에 따른 dropTargetId 초기화 로직 검증
    it.each([
      {
        dragTargetId: "", // DESC: 유효하지 않은 dragTargetId
        dropTargetId: "drop-target-id",
        expected: "", // DESC: 유효하지 않은 dragTargetId는 dropTargetId를 초기화 (드롭 실패)
      },
      {
        dragTargetId: "target-id",
        dropTargetId: "target-id", // DESC: dragTargetId와 dropTargetId가 같음
        expected: "", // DESC: 같은 ID는 드롭 실패로 간주하고 dropTargetId 초기화
      },
    ])(
      "dragTargetId($dragTargetId)가 유효하지 않거나, dropTargetId($dropTargetId)와 값이 같을 경우, dropTargetId를 $expected로 초기화함.",
      ({ dragTargetId, dropTargetId, expected }) => {
        const { result } = renderHook(() => useDragDropRoute(mockCallbackFn));

        // GIVEN: drag/drop 타겟 ID 설정
        act(() => {
          result.current.handleDragStart(dragTargetId)();
          result.current.handleDragEnter(dropTargetId)();
        });
        // WHEN: handleDrop 호출
        act(() => {
          result.current.handleDrop(mockDragEvent);
        });

        // THEN: dropTargetId가 예상대로 ""으로 초기화되었는지 확인
        expect(result.current.dropTargetId).toBe(expected);
        // THEN: 콜백 함수는 호출되지 않았는지 확인
        expect(mockCallbackFn).not.toHaveBeenCalled();
      },
    );
  });
});
