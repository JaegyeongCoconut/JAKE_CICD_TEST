import React from "react";

import { within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import type { Languages } from "@repo/types";

import InternalLinkButton from "@packages/button/link/internalLinkButton/InternalLinkButton";

import renderComponent from "@tests/renderComponent";

// DESC: Styled Component Mocking을 위한 Mock 함수 저장소
const hoisted = vi.hoisted(() => ({
  mockInternalLink: vi.fn((variant) => variant), // DESC: S.internalLink Mock 함수 (전달된 variant 확인용)
}));
vi.mock(
  "@packages/button/link/internalLinkButton/InternalLinkButton.styled",
  () => ({ internalLink: hoisted.mockInternalLink }), // DESC: Styled Component Mocking
);
// GIVEN: 단계에서 필요한 Mock 코드
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    // DESC: Link 컴포넌트를 Mocking
    Link: ({ to, state, className, children }: any) => (
      <a
        className={className}
        data-state={JSON.stringify(state)} // DESC: state prop 검증을 위해 노출
        data-testid="test-internal-link-button"
        data-to={to} // DESC: to prop 검증을 위해 노출
      >
        {children}
      </a>
    ),
  };
});

describe("InternalLinkButton Test", () => {
  test(`InternalLinkButton 컴포넌트 렌더 시, 
        hasBoth='false'이고 variant='iconOnly'라면 
        S.internalLink에 'iconOnly'가 전달되며, children으로 Icon 만 렌더됨`, () => {
    // GIVEN: variant="iconOnly", hasBoth=false, Icon 존재
    const variant = "iconOnly" as const;
    const MockIcon = () => <svg data-testid="test-icon" />;

    // WHEN: 컴포넌트 렌더링
    const { getByTestId } = renderComponent({
      ui: (
        <InternalLinkButton
          variant={variant}
          hasBoth={false}
          Icon={MockIcon}
          to="/"
        />
      ),
    });

    const internalLinkButton = getByTestId("test-internal-link-button");

    // THEN: Mock Link 컴포넌트가 DOM에 존재하고 to prop을 받았는지 검증
    expect(internalLinkButton).toBeInTheDocument();
    expect(internalLinkButton).toHaveAttribute("data-to", "/");
    // THEN: Styled Component Mock에 올바른 variant("iconOnly")가 전달되었는지 검증
    expect(hoisted.mockInternalLink).toHaveBeenCalledWith(variant);
    // THEN: children으로 Icon만 렌더링되었는지 검증
    expect(getByTestId("test-icon")).toBeInTheDocument();
  });

  test(`InternalLinkButton 컴포넌트 렌더 시, 
        hasBoth='false'이고 variant!=='iconOnly'라면 
        S.internalLink에 'iconOnly'를 제외한 variant가 전달되며, children으로 label 만 렌더됨`, async () => {
    // GIVEN: variant="primary" (iconOnly 아님), hasBoth=false, Label 존재
    const variant = "primary" as const;
    const label = "Label" as Languages;

    // WHEN: 컴포넌트 렌더링
    const { getByTestId, queryByTestId } = renderComponent({
      ui: (
        <InternalLinkButton
          variant={variant}
          hasBoth={false}
          label={label}
          to="/"
        />
      ),
    });

    const internalLinkButton = getByTestId("test-internal-link-button");

    // THEN: Mock Link 컴포넌트가 DOM에 존재하고 to prop을 받았는지 검증
    expect(internalLinkButton).toBeInTheDocument();
    expect(internalLinkButton).toHaveAttribute("data-to", "/");
    // THEN: Styled Component Mock에 올바른 variant("primary")가 전달되었는지 검증
    expect(hoisted.mockInternalLink).toHaveBeenCalledWith(variant);
    // THEN: children으로 Label만 렌더링되었는지 검증
    expect(within(internalLinkButton).getByText(label)).toBeInTheDocument();
    // DESC: Icon은 렌더되지 않음
    expect(queryByTestId("test-icon")).toBeNull();
  });

  test(`InternalLinkButton 컴포넌트 렌더 시, 
        hasBoth='true'이라면 
        S.internalLink의 variant는 'iconOnly'를 받을 수 없으며 Icon과 label을 모두다 렌더함`, () => {
    // GIVEN: hasBoth=true, Label 및 Icon 모두 존재
    const variant = "primary" as const;
    const label = "Label" as Languages;
    const MockIcon = () => <svg data-testid="test-icon" />;

    // WHEN: 컴포넌트 렌더링
    const { getByTestId, queryByTestId } = renderComponent({
      ui: (
        <InternalLinkButton
          variant={variant}
          hasBoth
          Icon={MockIcon}
          label={label}
          to="/"
        />
      ),
    });

    const internalLinkButton = getByTestId("test-internal-link-button");

    // THEN: Mock Link 컴포넌트가 DOM에 존재하고 to prop을 받았는지 검증
    expect(internalLinkButton).toBeInTheDocument();
    expect(internalLinkButton).toHaveAttribute("data-to", "/");
    // THEN: Styled Component Mock에 올바른 variant("primary")가 전달되었는지 검증
    expect(hoisted.mockInternalLink).toHaveBeenCalledWith(variant);
    // THEN: hasBoth=true 일 때, "iconOnly" variant는 전달되지 않았는지 검증 (불필요한 스타일 방지)
    expect(hoisted.mockInternalLink).not.toHaveBeenCalledWith("iconOnly");
    // THEN: children으로 Icon과 Label 모두 렌더링되었는지 검증
    expect(within(internalLinkButton).getByText(label)).toBeInTheDocument();
    expect(queryByTestId("test-icon")).toBeInTheDocument();
  });

  test("InternalLinkButton 컴포넌트 렌더 시, state를 전달하면 Link에 state가 지정됨", () => {
    // GIVEN: state prop 설정
    const variant = "primary" as const;
    const label = "Label" as Languages;
    const state = { key: "state" };
    const MockIcon = () => <svg data-testid="test-icon" />;

    // WHEN: state prop을 포함하여 컴포넌트 렌더링
    const { getByTestId } = renderComponent({
      ui: (
        <InternalLinkButton
          className="test-class"
          variant={variant}
          hasBoth
          Icon={MockIcon}
          label={label}
          state={state}
          to="/"
        />
      ),
    });

    const internalLinkButton = getByTestId("test-internal-link-button");

    // THEN: state가 Mock Link 컴포넌트를 통해 DOM에 올바르게 적용되었는지 검증
    expect(internalLinkButton).toBeInTheDocument();
    expect(internalLinkButton).toHaveAttribute(
      "data-state",
      JSON.stringify(state),
    );
  });

  test("InternalLinkButton 컴포넌트 렌더 시, className을 전달하면 Link에 className이 지정됨", () => {
    // GIVEN: className prop 설정
    const variant = "primary" as const;
    const label = "Label" as Languages;
    const MockIcon = () => <svg data-testid="test-icon" />;

    // WHEN: className prop을 포함하여 컴포넌트 렌더링
    const { getByTestId } = renderComponent({
      ui: (
        <InternalLinkButton
          className="test-class"
          variant={variant}
          hasBoth
          Icon={MockIcon}
          label={label}
          to="/"
        />
      ),
    });

    const internalLinkButton = getByTestId("test-internal-link-button");

    // THEN: className prop이 Mock Link 컴포넌트를 통해 DOM에 올바르게 적용되었는지 검증
    expect(internalLinkButton).toBeInTheDocument();
    expect(internalLinkButton).toHaveClass("test-class");
  });
});
