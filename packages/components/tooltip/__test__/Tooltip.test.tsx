import type { ComponentProps } from "react";
import React from "react";

import { describe, expect, test, vi } from "vitest";

import type { Languages, TooltipPosition } from "@repo/types";

import Tooltip from "@packages/tooltip/Tooltip";
import type * as StyledType from "@packages/tooltip/Tooltip.styled";

import renderComponent from "@tests/renderComponent";

// DESC: 아이콘 Mocking: ic_question_circle.svg를 Mocking하여 테스트 ID가 있는 SVG 컴포넌트를 반환하도록 설정
vi.mock("@repo/assets/icon/ic_question_circle.svg", () => ({
  ReactComponent: () => <svg data-testid="QuestionCircleIcon" />,
}));
// DESC: defaultLanguage Mocking: useDefaultLanguage 훅과 defaultLanguage 함수를 Mocking
const mockDefaultLanguage = vi.fn(({ text }: { text: string }) => text);
vi.mock("@repo/hooks/useDefaultLanguage", () => ({
  default: () => ({ defaultLanguage: mockDefaultLanguage }),
}));
// DESC: Styled Component Mocking: 스타일 컴포넌트들을 Mocking하여 테스트에 필요한 prop들이 DOM에 반영되는지 확인
vi.mock("@packages/tooltip/Tooltip.styled", () => {
  // DESC: Tooltip 스타일 컴포넌트 Mock
  // DESC: 하위 요소를 렌더링 하기 위해서는 상위 요소인 Tooltip 컴포넌트 렌더링 필요
  const MockStyledTooltip = ({
    children,
    className,
  }: ComponentProps<typeof StyledType.Tooltip>) => (
    <div className={className} data-testid="test-tooltip">
      {children}
    </div>
  );
  // DESC: Container 스타일 컴포넌트 Mock
  const MockStyledContainer = ({
    position,
    children,
  }: ComponentProps<typeof StyledType.Container>) => (
    <div data-position={position} data-testid="test-container">
      {children}
    </div>
  );
  // DESC: Message 스타일 컴포넌트 Mock
  const MockStyledMessage = ({
    children,
  }: ComponentProps<typeof StyledType.Message>) => (
    <p data-testid="test-message">{children}</p>
  );

  return {
    Container: MockStyledContainer,
    Message: MockStyledMessage,
    Tooltip: MockStyledTooltip,
    tooltipIcon: {}, // DESC: 검증이 필요없는 스타일은 빈 객체로 Mock
  };
});

describe("Tooltip Test", () => {
  // GIVEN: 테스트에 사용할 position, message 설정
  const tooltipPosition = "TOP_RIGHT" as TooltipPosition;
  const tooltipMessage = "MESSAGE" as Languages;

  test("className props가 <div />의 className props로 올바르게 전달되었는지 확인", () => {
    // GIVEN: className: "test-tooltip-class", position: "TOP_RIGHT", message: "MESSAGE" 설정
    // DESC: container를 호출하여 최상위 렌더링된 div 요소에 접근
    const { getByTestId } = renderComponent({
      ui: (
        <Tooltip
          className="test-tooltip-class"
          position={tooltipPosition}
          message={tooltipMessage}
        />
      ),
    });

    const tooltip = getByTestId("test-tooltip");

    // THEN: Tooltip Mock에 className="test-tooltip-class" 검증
    expect(tooltip).toHaveClass("test-tooltip-class");
  });

  test("position props가 <S.Container />의 position props로 올바르게 전달되었는지 확인", () => {
    // GIVEN: position: "TOP_RIGHT", message: "MESSAGE" 설정
    const { getByTestId } = renderComponent({
      ui: <Tooltip position={tooltipPosition} message={tooltipMessage} />,
    });

    const container = getByTestId("test-container");

    // THEN: Container Mock에 data-position="TOP_RIGHT" 검증
    expect(container).toHaveAttribute("data-position", tooltipPosition);
  });

  test("message props가 <S.Message />의 children으로 올바르게 전달되었는지 확인", () => {
    // GIVEN: position: "TOP_RIGHT", message: "MESSAGE" 설정
    const { getByTestId } = renderComponent({
      ui: <Tooltip position={tooltipPosition} message={tooltipMessage} />,
    });

    // THEN: message에 대해 defaultLanguage가 한 번 호출되었는지 검증
    expect(mockDefaultLanguage).toHaveBeenCalledOnce();
    expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: tooltipMessage });

    const message = getByTestId("test-message");

    // THEN: 렌더링된 Message가 표시되는지 검증
    expect(message).toHaveTextContent(tooltipMessage);
  });
});
