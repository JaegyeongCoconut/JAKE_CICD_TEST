import React, { useRef } from "react";

import { fireEvent } from "@testing-library/react";
import { describe, expect, vi, test } from "vitest";

import useOnClickOutside from "@packages/hooks/useOnClickOutside";

import renderComponent from "@tests/renderComponent";

// GIVEN: hook에 전달될 Props 타입 정의
interface TestComponentProps {
  exceptEl: HTMLElement | null | undefined; // DESC: 클릭을 무시할 예외 DOM 요소
  handler: () => void; // DESC: 외부 클릭 시 실행될 콜백 함수
}

// GIVEN: useOnClickOutside hook을 사용하는 테스트용 컴포넌트
const TestComponent = ({ handler, exceptEl }: TestComponentProps) => {
  const ref = useRef<HTMLDivElement>(null); // DESC: hook이 감시할 DOM 요소를 참조

  // DESC: useOnClickOutside hook 호출
  useOnClickOutside({ ref, handler, exceptEl });

  return (
    <div>
      {/* DESC: 감시 대상 요소 (ref) */}
      <div ref={ref} data-testid="inside">
        inside
        {/* DESC: 감시 대상의 자식 요소 */}
        <div data-testid="inside-child">child</div>
      </div>
      {/* DESC: 외부 영역 요소 */}
      <div data-testid="outside">outside</div>
    </div>
  );
};

describe("useOnClickOutside Test", () => {
  test("외부 영역(outside)을 클릭하면 handler가 1회 호출됨.", () => {
    // GIVEN: handler 함수를 Mock으로 설정
    const handler = vi.fn();

    // GIVEN: exceptEl 없이 컴포넌트 렌더링
    const { getByTestId } = renderComponent({
      ui: <TestComponent exceptEl={undefined} handler={handler} />,
    });

    // WHEN: 감시 대상(inside)의 외부 요소(outside)에 mouseDown 이벤트 발생
    fireEvent.mouseDown(getByTestId("outside"));

    // THEN: 외부 클릭으로 간주되어 handler가 정확히 1회 호출되었는지 확인
    expect(handler).toHaveBeenCalledOnce();
  });

  test("감시 대상(inside) 또는 그 자식 클릭 시 handler가 호출 안 됨.", () => {
    // GIVEN: handler 함수 Mock 설정
    const handler = vi.fn();

    const { getByTestId } = renderComponent({
      ui: <TestComponent exceptEl={undefined} handler={handler} />,
    });

    // WHEN: 감시 대상 내부 요소(inside)에 mouseDown 이벤트 발생
    fireEvent.mouseDown(getByTestId("inside"));
    // WHEN: 감시 대상의 자식 요소(inside-child)에 mouseDown 이벤트 발생
    fireEvent.mouseDown(getByTestId("inside-child"));

    // THEN: 내부 클릭이므로 handler가 전혀 호출되지 않았는지 확인
    expect(handler).not.toHaveBeenCalled();
  });

  test("예외 요소(exceptEl)를 클릭하면 handler가 호출 안 됨.", async () => {
    // GIVEN: handler 함수 Mock 설정
    const handler = vi.fn();

    // GIVEN: DOM 외부에 별도의 예외 요소 생성 및 document.body에 추가
    const exceptEl = document.createElement("div");
    exceptEl.setAttribute("data-testid", "except");
    document.body.appendChild(exceptEl);

    // WHEN: exceptEl을 전달하여 컴포넌트 렌더링
    renderComponent({
      ui: <TestComponent exceptEl={exceptEl} handler={handler} />,
    });

    // WHEN: 예외 요소에 mouseDown 이벤트 발생
    fireEvent.mouseDown(exceptEl);

    // THEN: 예외 요소 클릭이므로 handler가 호출되지 않았는지 확인
    expect(handler).not.toHaveBeenCalled();
  });

  test("컴포넌트 언마운트 후에는 cleanup 되어 더 이상 호출 안 됨.", () => {
    // GIVEN: handler 함수 Mock 설정
    const handler = vi.fn();
    const { unmount } = renderComponent({
      ui: <TestComponent exceptEl={undefined} handler={handler} />,
    });

    // WHEN: 컴포넌트 언마운트 (hook 내부의 이벤트 리스너 제거 기대)
    unmount();

    // WHEN: 언마운트 후 document.body에 외부 클릭 시도
    fireEvent.mouseDown(document.body);

    // THEN: 리스너가 제거되었으므로 handler가 호출되지 않았는지 확인
    expect(handler).not.toHaveBeenCalled();
  });
});
