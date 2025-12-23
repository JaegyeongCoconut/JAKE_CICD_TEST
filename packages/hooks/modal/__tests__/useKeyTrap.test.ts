import { act, fireEvent, renderHook } from "@testing-library/react";
import { vi, describe, test, expect, afterEach } from "vitest";

import useKeyTrap from "@packages/hooks/modal/useKeyTrap";

// DESC: HTMLElement를 동적으로 생성하기 위한 함수
const createMockElement = (tag = "div"): HTMLElement => {
  const element = document.createElement(tag);

  // DESC: HTMLElement.focus를 스파이하여 원본 동작은 유지하고 호출 기록만 추적
  element.focus = vi.fn();

  return element;
};

// DESC: 키 트랩에 사용할 컨테이너, 내부 포커스 가능한 요소 3개 구성
/*
  NOTE: 생성된 HTML 구조
  <div id="modal-container" tabindex="0">
    <button id="first-node" />   <= 1번째
    <a id="middle-node" href="#" /> <= 2번째
    <input id="last-node" />     <= 3번째
  </div>
*/
const createFocusTrapDOM = (): {
  container: HTMLElement;
  first: HTMLElement;
  last: HTMLElement;
  middle: HTMLElement;
} => {
  const container = createMockElement("div");
  container.id = "modal-container";
  // DESC: 컨테이너가 포커스 받을 수 있도록 tabindex 부여
  container.setAttribute("tabindex", "0");

  const first = createMockElement("button");
  first.id = "first-node";

  const middle = createMockElement("a");
  middle.setAttribute("href", "#");
  middle.id = "middle-node";

  const last = createMockElement("input");
  last.id = "last-node";

  container.appendChild(first);
  container.appendChild(middle);
  container.appendChild(last);

  document.body.appendChild(container);

  return { container, first, middle, last };
};

afterEach(() => {
  // DESC: body 부작용 초기화
  document.body.innerHTML = "";
});

describe("useKeyTrap Test", () => {
  test("Escape 키를 누르면 handleClose가 1회 호출되고, 언마운트 후에는 리스너가 제거됨.", () => {
    const mockHandleClose = vi.fn();
    const { container } = createFocusTrapDOM();

    const { unmount } = renderHook(() =>
      useKeyTrap(container, mockHandleClose),
    );

    // DESC: Escape 키 입력(호출 1회)
    act(() => {
      fireEvent.keyDown(window, { key: "Escape" });
    });

    expect(mockHandleClose).toHaveBeenCalledTimes(1);

    // DESC: 언마운트
    unmount();

    // DESC: 언마운트 이후 동일 이벤트 발생해도 더 이상 호출되지 않아야 함
    act(() => {
      fireEvent.keyDown(window, { key: "Escape" });
    });

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  test("마지막 요소에서 Tab key를 누르면 첫 번째 요소로 순환하여 포커스가 발생함.", () => {
    const { container, first, last } = createFocusTrapDOM();
    renderHook(() => useKeyTrap(container, vi.fn()));

    // DESC: 마지막 요소에서 keydown 발생을 시뮬레이션
    act(() => {
      fireEvent.keyDown(last, { key: "Tab", shiftKey: false });
    });

    // DESC: 첫 요소로 포커스 이동
    expect(first.focus).toHaveBeenCalledTimes(1);
    expect(last.focus).toHaveBeenCalledTimes(0);
  });

  test("첫 번째 요소에서 Shift+Tab key를 누르면 마지막 요소로 순환하여 포커스가 발생함.", () => {
    const { container, first, last } = createFocusTrapDOM();
    renderHook(() => useKeyTrap(container, vi.fn()));

    // DESC: 첫 요소에서 Shift+Tab 발생을 시뮬레이션
    act(() => {
      fireEvent.keyDown(first, { key: "Tab", shiftKey: true });
    });

    // DESC: 마지막 요소로 포커스 이동
    expect(last.focus).toHaveBeenCalledTimes(1);
    expect(first.focus).toHaveBeenCalledTimes(0);
  });

  test("preventDefault 동작 검증 — 마지막 요소에서 Tab 시 기본 동작이 취소됨.", () => {
    const { container, last } = createFocusTrapDOM();
    renderHook(() => useKeyTrap(container, vi.fn()));

    // DESC: preventDefault 스파이 설정을 위해, 네이티브 이벤트 생성 후 dispatch
    const ev = new KeyboardEvent("keydown", { key: "Tab", bubbles: true });
    const preventSpy = vi.spyOn(ev, "preventDefault");

    // DESC: last에서 이벤트 발생
    last.dispatchEvent(ev);

    // DESC: 순환 로직이 preventDefault를 호출했는지 확인
    expect(preventSpy).toHaveBeenCalledTimes(1);
  });
});
