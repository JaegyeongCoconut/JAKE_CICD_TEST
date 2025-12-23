import React from "react";

import { screen, act } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";

import useDragDropFile from "@packages/hooks/useDragDropFile";

import renderComponent from "@tests/renderComponent";

// GIVEN: DataTransfer 객체의 구조를 정의하고 Mocking하는 인터페이스/함수
interface MockDataTransfer {
  dataTransfer: { items: { getAsFile: () => File | null }[] };
}

// DESC: File 객체를 포함하는 Mock DataTransfer 객체를 생성
const mockDataTransfer = (file: File): MockDataTransfer => ({
  dataTransfer: { items: [{ getAsFile: () => file }] },
});

// GIVEN: hook을 래핑하고 상태와 Ref를 DOM에 연결하는 테스트 컴포넌트
const TestDragDropComponent = ({
  uploadImageFile,
}: {
  uploadImageFile: (file: File) => void;
}) => {
  // DESC: hook 호출 (dragRef와 isDragging 상태를 가져옴)
  const { dragRef, isDragging } = useDragDropFile({ uploadImageFile });

  // DESC: dragRef를 DOM에 연결하고 isDragging 상태를 data-is-dragging 속성으로 노출
  return (
    <div ref={dragRef} data-is-dragging={isDragging} data-testid="drag-area">
      {isDragging ? "Dragging" : "Not Dragging"}
    </div>
  );
};

describe("useDragDropFile Test", () => {
  // GIVEN: 파일 업로드 함수 Mock 설정
  const mockUploadImageFile = vi.fn();

  test("handleDragEnter가 isDragging을 true로 설정함.", () => {
    // GIVEN: 컴포넌트 렌더링
    renderComponent({
      ui: <TestDragDropComponent uploadImageFile={mockUploadImageFile} />,
    });

    // GIVEN: hook의 ref가 붙은 DOM 요소 가져오기
    const dragArea = screen.getByTestId("drag-area");

    // WHEN: dragenter 이벤트 수동 디스패치 (act 블록으로 상태 업데이트 보장)
    act(() => {
      // DESC: bubbles=true, cancelable=true 설정으로 실제 브라우저 이벤트와 유사하게 생성
      const event = new Event("dragenter", { bubbles: true, cancelable: true });

      dragArea.dispatchEvent(event);
    });

    // THEN: isDragging 상태가 "true"로 변경되었는지 확인
    expect(dragArea.dataset.isDragging).toBe("true");
  });

  test("handleDragLeave가 컨테이너를 벗어날 때 isDragging을 false로 설정함.", () => {
    // GIVEN: 컴포넌트 렌더링
    renderComponent({
      ui: <TestDragDropComponent uploadImageFile={mockUploadImageFile} />,
    });
    const dragArea = screen.getByTestId("drag-area");

    // GIVEN: dragleave의 목적지(relatedTarget)로 사용할 외부 DOM 요소 생성
    const outerElement = document.createElement("div");
    document.body.appendChild(outerElement);

    // WHEN: dragenter로 상태를 "true"로 변경
    act(() => {
      const event = new Event("dragenter", { bubbles: true, cancelable: true });
      dragArea.dispatchEvent(event);
    });

    expect(dragArea.dataset.isDragging).toBe("true");

    // WHEN: dragleave 이벤트 디스패치
    act(() => {
      const leaveEvent = new Event("dragleave", {
        bubbles: true,
        cancelable: true,
      });

      // DESC: 테스트를 위해 읽기 전용 속성인 relatedTarget에 외부 요소 주입
      Object.defineProperty(leaveEvent, "relatedTarget", {
        value: outerElement,
      });

      dragArea.dispatchEvent(leaveEvent);
    });

    // DESC: After (후처리): 생성한 외부 요소를 DOM에서 제거
    document.body.removeChild(outerElement);

    // THEN: isDragging 상태가 "false"로 변경되었는지 확인
    expect(dragArea.dataset.isDragging).toBe("false");
  });

  test("handleDrop이 uploadImageFile을 호출하고 isDragging을 false로 설정함.", () => {
    // GIVEN: 업로드할 Mock File 생성
    const mockFile = new File(["x"], "test.png", { type: "image/png" });

    // GIVEN: 컴포넌트 렌더링
    renderComponent({
      ui: <TestDragDropComponent uploadImageFile={mockUploadImageFile} />,
    });

    const dragArea = screen.getByTestId("drag-area");

    // GIVEN: isDragging 상태를 "true"로 설정
    act(() => {
      const event = new Event("dragenter", { bubbles: true, cancelable: true });
      dragArea.dispatchEvent(event);
    });

    // WHEN: Mock DataTransfer를 포함하는 drop 이벤트 디스패치
    act(() => {
      const dropEvent = new Event("drop", { bubbles: true, cancelable: true });

      // DESC: dropEvent 객체에 Mock 파일 데이터를 강제로 할당
      Object.assign(dropEvent, mockDataTransfer(mockFile));

      dragArea.dispatchEvent(dropEvent);
    });

    // THEN: isDragging 상태가 "false"로 초기화되었는지 확인
    expect(dragArea.dataset.isDragging).toBe("false");
    // THEN: uploadImageFile 콜백이 1회 호출되었는지 확인
    expect(mockUploadImageFile).toHaveBeenCalledOnce();
    // THEN: 콜백이 Mock File 객체와 함께 호출되었는지 확인
    expect(mockUploadImageFile).toHaveBeenCalledWith(mockFile);
  });

  test("파일이 없을 때 uploadImageFile이 호출되지 않는지 확인.", () => {
    // GIVEN: getAsFile()이 null을 반환하도록 설정된 Mock DataTransfer (파일 없음)
    const mockNoFileTransfer: MockDataTransfer = {
      dataTransfer: { items: [{ getAsFile: () => null }] },
    };

    renderComponent({
      ui: <TestDragDropComponent uploadImageFile={mockUploadImageFile} />,
    });
    const dragArea = screen.getByTestId("drag-area");

    // GIVEN: isDragging 상태를 "true"로 설정
    act(() => {
      const event = new Event("dragenter", { bubbles: true, cancelable: true });
      dragArea.dispatchEvent(event);
    });
    expect(dragArea.dataset.isDragging).toBe("true");

    // WHEN: 파일이 없는 Mock DataTransfer를 포함하는 drop 이벤트 디스패치
    act(() => {
      const dropEvent = new Event("drop", { bubbles: true, cancelable: true });
      Object.assign(dropEvent, mockNoFileTransfer);
      dragArea.dispatchEvent(dropEvent);
    });

    // THEN: isDragging 상태는 반드시 "false"로 초기화되어야 함
    expect(dragArea.dataset.isDragging).toBe("false");

    // THEN: 파일이 없었으므로 uploadImageFile이 호출되지 않았는지 확인
    expect(mockUploadImageFile).not.toHaveBeenCalled();
  });

  test("언마운트 시 리스너가 제거되는지 확인.", () => {
    // GIVEN: 컴포넌트 렌더링 및 unmount 함수 가져오기
    const { unmount } = renderComponent({
      ui: <TestDragDropComponent uploadImageFile={mockUploadImageFile} />,
    });
    const dragArea = screen.getByTestId("drag-area");

    // GIVEN: removeEventListener 메서드를 스파이하여 호출 횟수 추적
    const spyRemoveEventListener = vi.spyOn(dragArea, "removeEventListener");

    // WHEN: 컴포넌트 언마운트 (hook 내부의 cleanup 함수 실행 기대)
    act(() => {
      unmount();
    });

    // THEN: hook이 등록했던 dragenter, dragleave, dragover, drop 4개의 이벤트 리스너가 모두 제거되었는지 확인
    expect(spyRemoveEventListener).toHaveBeenCalledTimes(4);

    spyRemoveEventListener.mockRestore();
  });
});
