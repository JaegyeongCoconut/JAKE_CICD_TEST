import React from "react";

import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import HeadlessButton from "@packages/button/HeadlessButton";

import renderComponent from "@tests/renderComponent";

describe("HeadlessButton Test", () => {
  describe("tabIndex Test", () => {
    test("isLoading=true이면, tabIndex는 -1", () => {
      // WHEN: isLoading=true로 렌더링
      const { getByRole } = renderComponent({
        ui: (
          <HeadlessButton
            disabled={false}
            isLoading
            handleButtonClick={vi.fn()}
          >
            <span data-testid="button-content">Click Me</span>
          </HeadlessButton>
        ),
      });

      const button = getByRole("button");

      // THEN: 버튼이 탭 순서에서 제외되는지 검증
      expect(button).toHaveAttribute("tabIndex", "-1");
    });

    test("isLoading=false이면, tabIndex는 0", () => {
      // WHEN: isLoading=false로 렌더링
      const { getByRole } = renderComponent({
        ui: (
          <HeadlessButton
            disabled={false}
            isLoading={false}
            handleButtonClick={vi.fn()}
          >
            <span data-testid="button-content">Click Me</span>
          </HeadlessButton>
        ),
      });

      const button = getByRole("button");

      // THEN: 버튼이 일반적인 탭 순서에 포함되있는지 검증
      expect(button).toHaveAttribute("tabIndex", "0");
    });

    test("disabled=true이면, 버튼 클릭 시 handleButtonClick이 호출되지 않음", async () => {
      // GIVEN: userEvent 및 Mock 핸들러 설정
      const user = userEvent.setup();
      const mockClickHandler = vi.fn();

      const { getByRole } = renderComponent({
        ui: (
          <HeadlessButton
            disabled // DESC: disabled=true
            isLoading={false}
            handleButtonClick={mockClickHandler}
          >
            <span data-testid="button-content">Click Me</span>
          </HeadlessButton>
        ),
      });

      const button = getByRole("button");

      // WHEN: 버튼 클릭 시도
      await user.click(button);

      // THEN: disabled 상태이므로 클릭 핸들러가 호출되지 않았는지 확인
      expect(mockClickHandler).not.toHaveBeenCalled();
    });

    test("버튼 클릭 시 handleButtonClick 핸들러가 호출", async () => {
      // GIVEN: userEvent 및 Mock 핸들러 설정
      const user = userEvent.setup();
      const mockClickHandler = vi.fn();

      const { getByRole } = renderComponent({
        ui: (
          <HeadlessButton
            disabled={false}
            isLoading={false}
            handleButtonClick={mockClickHandler}
          >
            <span data-testid="button-content">Click Me</span>
          </HeadlessButton>
        ),
      });

      const button = getByRole("button");

      // WHEN: 버튼 클릭
      await user.click(button);

      // THEN: 클릭 핸들러가 정확히 한 번 호출되었는지 확인
      expect(mockClickHandler).toHaveBeenCalledOnce();
    });

    test("파라미터로 설정한 disabled 및 type이 HeadlessButton에 올바르게 전달되었는지 확인", () => {
      // GIVEN: Mock 핸들러 및 type Prop 설정
      const mockClickHandler = vi.fn();
      const MOCK_TYPE = "submit";

      // WHEN: disabled와 type Prop을 명시적으로 전달하여 렌더링
      const { getByRole } = renderComponent({
        ui: (
          <HeadlessButton
            disabled
            isLoading={false}
            type={MOCK_TYPE}
            handleButtonClick={mockClickHandler}
          >
            <span data-testid="button-content">Click Me</span>
          </HeadlessButton>
        ),
      });

      const button = getByRole("button");

      // THEN: disabled Prop이 DOM 속성으로 올바르게 반영되었는지 확인
      expect(button).toBeDisabled();
      // DESC: type Prop이 DOM 속성으로 올바르게 반영되었는지 확인
      expect(button).toHaveAttribute("type", MOCK_TYPE);
    });

    test("마우스 다운 시 handleButtonMouseDown 핸들러가 호출", async () => {
      // GIVEN: userEvent 및 Mock MouseDown 핸들러 설정
      const user = userEvent.setup();
      const mockMouseDownHandler = vi.fn();

      const { getByRole } = renderComponent({
        ui: (
          <HeadlessButton
            disabled={false}
            isLoading={false}
            handleButtonClick={vi.fn()}
            handleButtonMouseDown={mockMouseDownHandler}
          >
            <span data-testid="button-content">Click Me</span>
          </HeadlessButton>
        ),
      });

      const button = getByRole("button");

      // WHEN: 버튼에 마우스 다운 이벤트를 시뮬레이션
      // DESC: user.pointer: 마우스, 펜, 터치와 같은 저수준 포인터 이벤트를 시뮬레이션하는 API
      // DESC: 1. [MouseLeft>]: 마우스 왼쪽 버튼 down 동작 시작
      // DESC: 2. target: button: 해당 이벤트의 대상 엘리먼트를 지정
      // DESC: 3. DOM에서 'mousedown' 이벤트를 발생
      await user.pointer([{ keys: "[MouseLeft>]", target: button }]);

      // THEN: MouseDown 핸들러가 정확히 한 번 호출되었는지 확인
      expect(mockMouseDownHandler).toHaveBeenCalledOnce();
    });

    test("isLoading=true로 변경되고 버튼이 포커스된 상태면, 포커스가 해제(blur)되어야 함", async () => {
      // GIVEN: 초기 상태 (isLoading=false)로 렌더링하고 버튼에 포커스를 설정
      const { getByRole, rerender } = renderComponent({
        ui: (
          <HeadlessButton
            disabled={false}
            isLoading={false}
            handleButtonClick={vi.fn()}
          >
            <span data-testid="button-content">Click Me</span>
          </HeadlessButton>
        ),
      });

      const button = getByRole("button");

      // DESC: 버튼을 수동으로 포커스
      button.focus();

      // THEN: 버튼이 포커스된 상태인지 확인
      expect(button).toHaveFocus();

      // WHEN: isLoading=true로 Prop을 변경하여 컴포넌트를 다시 렌더링
      rerender(
        <HeadlessButton disabled={false} isLoading handleButtonClick={vi.fn()}>
          <span data-testid="button-content">Click Me</span>
        </HeadlessButton>,
      );

      // THEN: isLoading이 true가 되면서 버튼의 포커스가 해제되었는지 확인
      expect(button).not.toHaveFocus();
    });
  });
});
