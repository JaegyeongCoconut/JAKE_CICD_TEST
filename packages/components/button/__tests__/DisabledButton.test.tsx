import type { ComponentProps } from "react";
import React from "react";

import DisabledButton from "button/disabled/DisabledButton";
import { describe, expect, test, vi } from "vitest";

import type { Languages } from "@repo/types";

import type HeadlessButton from "@packages/button/HeadlessButton";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

// DESC: 테스트에 사용할 Mock 아이콘 컴포넌트를 위한 SVG 엘리먼트
const icon = <svg data-testid="test-icon" />;

const hoisted = vi.hoisted(() => {
  // DESC: MockHeadlessButton: 실제 HeadlessButton 컴포넌트의 동작을 모방하는 Mock 컴포넌트
  // DESC: Dom 비표준 prop를 분리하지 않으면 경고가 발생
  const MockHeadlessButton = vi.fn(
    (props: ComponentProps<typeof HeadlessButton>) => (
      <button
        data-testid={`${props.isLoading}-mock-headless-button`}
        onClick={props.handleButtonClick}
        onMouseDown={props.handleButtonMouseDown}
      >
        {props.children}
      </button>
    ),
  );
  return { MockHeadlessButton };
});
// DESC: HeadlessButton 모듈 Mocking
vi.mock("@packages/button/HeadlessButton", () => ({
  default: hoisted.MockHeadlessButton,
}));

describe("DisabledButton Test", () => {
  const label = "Label" as Languages;

  test("DisabledButton 렌더 시, disabled=true, isLoading=false인지 검증", () => {
    // WHEN: DisabledButton 렌더링
    renderComponent({
      ui: <DisabledButton variant="primary" label={label} />,
    });

    // THEN: DisabledButton이 HeadlessButton에 전달한 Prop을 검증
    expect(hoisted.MockHeadlessButton).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: true,
        isLoading: false,
        type: "button",
      }),
      {},
    );
  });

  test("variant=iconOnly이면, 아이콘만 렌더되어야 함", () => {
    // WHEN: variant="iconOnly"와 Icon prop을 사용하여 렌더링
    const { getByTestId, queryByText } = renderComponent({
      ui: <DisabledButton variant="iconOnly" Icon={() => icon} />,
    });

    // THEN: 아이콘은 존재하고, 레이블(Test)은 존재하지 않는지 검증
    const iconElement = getByTestId("test-icon");
    // DESC: 레이블이 없음을 확인하기 위해 queryByText 사용
    const labelElement = queryByText(label);

    expect(iconElement).toBeInTheDocument();
    expect(labelElement).toBeNull();
  });

  test("variant!=iconOnly이면, label은 필수로 렌더되어야 함", () => {
    // WHEN: 기본 variant와 레이블을 사용하여 렌더링
    const { getByText } = renderComponent({
      ui: <DisabledButton variant="primary" label={label} />,
    });

    // THEN: 레이블 번역 함수가 호출되었는지 검증
    expect(mockDefaultLanguage).toHaveBeenCalledOnce();
    expect(mockDefaultLanguage).toHaveBeenCalledWith({
      text: label,
    });

    const labelElement = getByText(label);

    // THEN: 레이블 텍스트가 DOM에 존재하는지 검증
    expect(labelElement).toBeInTheDocument();
  });

  test("variant!=iconOnly이고 파라미터로 아이콘이 있다면, 아이콘과 레이블 모두 렌더 되어야 함", () => {
    // WHEN: 기본 variant, 아이콘, 레이블 모두 사용하여 렌더링
    const { getByText, getByTestId } = renderComponent({
      ui: <DisabledButton variant="primary" Icon={() => icon} label={label} />,
    });

    // THEN: 레이블 번역 함수 호출 확인
    expect(mockDefaultLanguage).toHaveBeenCalledOnce();
    expect(mockDefaultLanguage).toHaveBeenCalledWith({
      text: label,
    });

    const iconElement = getByTestId("test-icon");
    const labelElement = getByText(label);

    // DESC: 아이콘과 레이블 모두 DOM에 존재하는지 검증
    expect(iconElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
  });
});
