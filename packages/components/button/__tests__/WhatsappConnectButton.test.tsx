import type { ComponentProps } from "react";
import React from "react";

import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";

import WhatsappConnectButton from "@packages/button/whatsapp/WhatsappConnectButton";
import type * as StyledType from "@packages/button/whatsapp/WhatsappConnectButton.styled";

import renderComponent from "@tests/renderComponent";

// DESC: WhatsApp Icon SVG Mocking
vi.mock("@repo/assets/icon/ic_whatsapp.svg", () => ({
  ReactComponent: () => <span data-testid="test-whatsapp-icon" />,
}));
// DESC: Styled Component Mocking: Button
vi.mock("@packages/button/whatsapp/WhatsappConnectButton.styled", () => {
  const MockStyledButton = (
    props: ComponentProps<typeof StyledType.Button>,
  ) => (
    <button
      className={props.className}
      data-testid="test-whatsapp-button"
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );

  return { Button: MockStyledButton, whatAppIcon: {} };
});

// DESC: 각 테스트 실행 후 Mocking했던 전역 함수(window.open) 복구
afterEach(() => {
  vi.unstubAllGlobals();
});

describe("WhasappConnectButton Test", () => {
  test("WhatsappConnectButton 렌더 시, 최상위에 S.Button이 렌더되고 children은 WhatsappIcon만 렌더되어야 함", () => {
    // GIVEN: mobile 번호와 className prop
    const mobile = "01012345678";

    // WHEN: 컴포넌트 렌더링
    const { container, getByTestId } = renderComponent({
      ui: <WhatsappConnectButton className="test-class" mobile={mobile} />,
    });

    // THEN: 최상위 엘리먼트가 하나인지 확인
    expect(container.children).toHaveLength(1);

    const button = container.children[0];

    // THEN: 버튼이 className과 type="button" 속성을 가졌는지 확인
    expect(button).toHaveClass("test-class");
    expect(button).toHaveAttribute("type", "button");

    // THEN: 버튼 내부에 하나의 자식 요소만 있는지 확인 (WhatsApp Icon)
    expect(button.children).toHaveLength(1);

    const whatsappIcon = button.children[0];

    // THEN: 자식 요소가 WhatsApp Icon Mock인지 확인
    expect(whatsappIcon).toBeInTheDocument();
    expect(whatsappIcon).toBe(getByTestId("test-whatsapp-icon"));
  });

  test("버튼 클릭 시, window.open이 올바른 왓츠앱 URL로 호출되어야 함", async () => {
    // GIVEN: userEvent setup 및 mobile 번호
    const user = userEvent.setup();
    const mobile = "01012345678";
    const expectedUrl = `https://wa.me/${mobile}`;

    // GIVEN: window.open 함수를 Spy 및 Mocking하여 실제 창 열림 방지
    const spyWindowOpen = vi
      .spyOn(window, "open")
      .mockImplementation(() => null);

    // WHEN: 컴포넌트 렌더링
    const { getByTestId } = renderComponent({
      ui: <WhatsappConnectButton mobile={mobile} />,
    });

    const button = getByTestId("test-whatsapp-button");

    // WHEN: 버튼 클릭 이벤트 발생
    await user.click(button);

    // THEN: window.open 함수가 정확히 한 번 호출되었는지 확인
    expect(spyWindowOpen).toHaveBeenCalledOnce();

    // THEN: window.open 함수가 예상된 WhatsApp URL을 인수로 받았는지 확인
    expect(spyWindowOpen).toHaveBeenCalledWith(expectedUrl);
  });
});
