import React, { createRef } from "react";

import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import CalendarButton from "@packages/button/calendar/CalendarButton";

import renderComponent from "@tests/renderComponent";

const hoisted = vi.hoisted(() => ({
  mockIsDialogOpen: false,
  mockDialogRef: { current: null },
  mockHandleToggleDialog: vi.fn(),
  mockHandleCloseDialog: vi.fn(),
}));
// DESC: useDialog Hook Mocking
vi.mock("@repo/hooks/modal/useDialog", () => {
  return {
    default: () => ({
      isDialogOpen: hoisted.mockIsDialogOpen,
      dialogRef: hoisted.mockDialogRef,
      handleToggleDialog: hoisted.mockHandleToggleDialog,
      handleDialogClose: hoisted.mockHandleCloseDialog,
    }),
  };
});

describe("CalendarButton Test", () => {
  // DESC: userEvent 설정 (비동기 이벤트 처리)
  const user = userEvent.setup();

  test("파라미터로 전달된 ref가 제대로 렌더링 되었는지 확인", () => {
    // GIVEN: 버튼에 연결될 ref와 children 텍스트를 정의
    const buttonRef = createRef<HTMLButtonElement>();
    const CHILDREN_TEXT = "Click Me";

    // WHEN: CalendarButton을 렌더링하고 ref를 전달
    const { getByRole } = renderComponent({
      ui: (
        <CalendarButton ref={buttonRef} disabled={false} onPopup={vi.fn()}>
          <span>{CHILDREN_TEXT}</span>
        </CalendarButton>
      ),
    });

    const button = getByRole("button");

    // THEN: 전달된 ref의 current 값이 실제 렌더링된 버튼 엘리먼트인지 검증
    expect(buttonRef.current).toBe(button);
    // THEN: 버튼이 children 텍스트를 포함하는지 검증
    expect(button).toHaveTextContent(CHILDREN_TEXT);
  });

  test("버튼 클릭 시 useDialog의 handleToggleDialog 호출 여부 확인", async () => {
    // GIVEN: onPopup Mock 함수와 ref를 설정함.
    const mockOnPopup = vi.fn();
    const buttonRef = createRef<HTMLButtonElement>();

    // WHEN: 컴포넌트를 렌더
    renderComponent({
      ui: (
        <CalendarButton ref={buttonRef} disabled={false} onPopup={mockOnPopup}>
          <div />
        </CalendarButton>
      ),
    });

    // WHEN: 버튼 클릭
    await user.click(buttonRef.current!);

    // THEN: 버튼 클릭이 useDialog의 handleToggleDialog를 한 번 호출했는지 검증
    expect(hoisted.mockHandleToggleDialog).toHaveBeenCalledOnce();
  });

  test("onPopup 함수가 ref, isDialogOpen, handleCloseDialog를 파라미터로 호출되었는지 확인", async () => {
    // GIVEN: onPopup Mock 함수를 설정
    const mockOnPopup = vi.fn();
    const buttonRef = createRef<HTMLButtonElement>();

    // WHEN: 컴포넌트를 렌더
    renderComponent({
      ui: (
        <CalendarButton ref={buttonRef} disabled={false} onPopup={mockOnPopup}>
          <div />
        </CalendarButton>
      ),
    });

    // WHEN: 버튼 클릭
    await user.click(buttonRef.current!);

    // THEN: onPopup 콜백이 useDialog에서 받은 세 가지 값(ref, isDialogOpen, closeHandler)을 정확히 인수로 받았는지 검증
    expect(mockOnPopup).toHaveBeenCalledWith(
      hoisted.mockDialogRef,
      hoisted.mockIsDialogOpen,
      hoisted.mockHandleCloseDialog,
    );
  });

  test("disabled=true 일 때, onPopup은 호출되지 않아야 함", () => {
    // GIVEN: onPopup Mock 함수를 설정
    const mockOnPopup = vi.fn();

    // WHEN: disabled=true로 컴포넌트를 렌더링
    renderComponent({
      ui: (
        <CalendarButton disabled={true} onPopup={mockOnPopup}>
          <div />
        </CalendarButton>
      ),
    });

    // THEN: onPopup 콜백이 호출되지 않았는지 확인
    expect(mockOnPopup).not.toHaveBeenCalled();
  });
});
