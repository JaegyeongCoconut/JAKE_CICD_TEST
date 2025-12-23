import type { ComponentProps } from "react";
import React from "react";

import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import type { Languages } from "@repo/types";

import GhostButton from "@packages/button/ghost/GhostButton";
import type * as StyledType from "@packages/button/ghost/GhostButton.styled";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

// DESC: LoadingSpinner Mocking: LoadingSpinner 대신 테스트 ID가 있는 <div>를 반환
vi.mock("@packages/loadingSpinner/LoadingSpinner", () => ({
  default: () => <div data-testid="test-loading-spinner" />,
}));
// DESC: Styled Component Mocking: 스타일 컴포넌트들을 Mocking하여 Prop 전달을 확인
vi.mock("@packages/button/ghost/GhostButton.styled", () => {
  // DESC: GhostButton 래퍼 컴포넌트 Mock
  const MockStyledGhostButton = (
    props: ComponentProps<typeof StyledType.GhostButton>,
  ) => (
    <button
      className={props.className}
      // DESC: isLoading은 DOM의 요소가 아님
      // DESC: data-* 속성은 문자열을 기대하므로, 명시적으로 'true' 또는 'false' 문자열로 변환하여 DOM에 전달
      data-is-loading={`${!!props.isLoading}`}
      data-testid={`test-ghost-button-${props.variant}`}
      disabled={props.disabled}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
  // DESC: Content 래퍼 컴포넌트 Mock (Label과 Icon을 감싸는 컨테이너)
  const MockStyledContent = (
    props: ComponentProps<typeof StyledType.Content>,
  ) => <span data-testid="test-content">{props.children}</span>;

  return {
    GhostButton: MockStyledGhostButton,
    Content: MockStyledContent,
    loadingSpinner: {}, // DESC: 검증이 불필요한 스타일은 빈 객체로 Mock
  };
});

describe("GhostButton Test", () => {
  // DESC: userEvent 설정
  const user = userEvent.setup();

  test("disabled=false, isLoading=false, Icon 없을 시 Label만 렌더, label은 defaultLanguage를 호출", () => {
    // GIVEN: 버튼이 활성화(disabled=false), 로딩 아님(isLoading=false), Icon 없음
    const variant = "alert";
    const label = "Label" as Languages;

    // WHEN: 컴포넌트 렌더링
    const { getByTestId, queryByTestId } = renderComponent({
      ui: (
        <GhostButton
          variant={variant}
          disabled={false}
          isLoading={false}
          label={label}
          handleButtonClick={vi.fn()}
        />
      ),
    });

    const ghostButton = getByTestId(`test-ghost-button-${variant}`);

    // THEN: 버튼 활성화 및 로딩 상태 검증
    expect(ghostButton).not.toBeDisabled();
    expect(ghostButton).toHaveAttribute("data-is-loading", "false");
    // THEN: Label 렌더링 및 번역 함수 호출 검증
    expect(mockDefaultLanguage).toHaveBeenCalledOnce();
    expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: label });
    expect(getByTestId("test-content")).toHaveTextContent(label);
    // THEN: LoadingSpinner가 렌더링되지 않았는지 검증
    expect(queryByTestId("test-loading-spinner")).toBeNull();
  });

  test("disabled=false, isLoading=false, Icon 있다면 Icon,Label 둘다 렌더, label은 defaultLanguage를 호출", () => {
    // GIVEN: 버튼이 활성화(disabled=false), 로딩 아님(isLoading=false), Icon 존재
    const variant = "alert";
    const label = "Label" as Languages;
    const MockIcon = <svg data-testid="test-icon" />;

    // WHEN: 컴포넌트 렌더링
    const { getByTestId, queryByTestId } = renderComponent({
      ui: (
        <GhostButton
          variant={variant}
          disabled={false}
          isLoading={false}
          Icon={MockIcon}
          label={label}
          handleButtonClick={vi.fn()}
        />
      ),
    });

    const ghostButton = getByTestId(`test-ghost-button-${variant}`);

    // THEN: 버튼 활성화 및 로딩 상태 검증
    expect(ghostButton).not.toBeDisabled();
    expect(ghostButton).toHaveAttribute("data-is-loading", "false");
    // THEN: Label 렌더링 및 번역 함수 호출 검증
    expect(mockDefaultLanguage).toHaveBeenCalledOnce();
    expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: label });
    expect(getByTestId("test-content")).toHaveTextContent(label);
    // THEN: Icon이 렌더링되었는지 검증
    expect(getByTestId("test-icon")).toBeInTheDocument();
    // THEN: LoadingSpinner가 렌더링되지 않았는지 검증
    expect(queryByTestId("test-loading-spinner")).toBeNull();
  });

  test("disabled=true라면 버튼은 비활성화 되고 로딩 상태가 아님", () => {
    // GIVEN: disabled=true 설정
    const variant = "alert";
    const label = "Label" as Languages;

    // WHEN: 컴포넌트 렌더링
    const { getByTestId, queryByTestId } = renderComponent({
      ui: <GhostButton variant={variant} disabled label={label} />,
    });

    const ghostButton = getByTestId(`test-ghost-button-${variant}`);

    // THEN: 버튼이 비활성화되었는지 검증
    expect(ghostButton).toBeDisabled();
    // THEN: 로딩 상태가 false인지 검증
    expect(ghostButton).toHaveAttribute("data-is-loading", "false");
    // THEN: Label 텍스트는 정상적으로 렌더링되었는지 검증
    expect(mockDefaultLanguage).toHaveBeenCalledOnce();
    expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: label });
    expect(getByTestId("test-content")).toHaveTextContent(label);
    // THEN: LoadingSpinner가 렌더링되지 않았는지 검증
    expect(queryByTestId("test-loading-spinner")).toBeNull();
  });

  test("disabled=true라면 클릭해도 handleButtonClick 호출 안 됨", async () => {
    // GIVEN: disabled=true 설정과 Mock 핸들러
    const variant = "alert";
    const label = "Label" as Languages;
    const mockHandler = vi.fn();

    const { getByTestId } = renderComponent({
      ui: <GhostButton variant={variant} disabled label={label} />,
    });

    const ghostButton = getByTestId(`test-ghost-button-${variant}`);

    // WHEN: 비활성화된 버튼 클릭
    await user.click(ghostButton);

    // THEN: 핸들러가 호출되지 않았는지 검증
    expect(mockHandler).not.toHaveBeenCalled();
  });

  test("isLoading=true라면 LoadingSpinner와 Content가 렌더됨", () => {
    // GIVEN: isLoading=true 설정
    const label = "Label" as Languages;
    const variant = "alert";

    // WHEN: 컴포넌트 렌더링
    const { getByTestId } = renderComponent({
      ui: (
        <GhostButton
          variant={variant}
          disabled={false}
          isLoading={true}
          label={label}
          handleButtonClick={vi.fn()}
        />
      ),
    });

    const ghostButton = getByTestId(`test-ghost-button-${variant}`);

    // THEN: 버튼은 비활성화되지 않고 로딩 상태가 true인지 검증
    expect(ghostButton).not.toBeDisabled();
    expect(ghostButton).toHaveAttribute("data-is-loading", "true");
    // THEN: LoadingSpinner가 렌더링되었는지 검증
    expect(getByTestId("test-loading-spinner")).toBeInTheDocument();
    // THEN: Label Content는 여전히 렌더링되었는지 검증 (로딩 중에도 텍스트는 남아있을 수 있음)
    expect(getByTestId("test-content")).toHaveTextContent(label);
  });

  test("GhostButton으로 type='button' & className이 전달됨", () => {
    // GIVEN: className 및 type prop이 필요 없는 variant 설정
    const variant = "ghost_blue";
    const label = "Label" as Languages;

    // WHEN: className을 포함하여 컴포넌트 렌더링
    const { getByTestId } = renderComponent({
      ui: (
        <GhostButton
          className="test-button"
          variant={variant}
          disabled={false}
          isLoading={false}
          label={label}
          handleButtonClick={vi.fn()}
        />
      ),
    });

    const ghostButton = getByTestId(`test-ghost-button-${variant}`);

    // THEN: 기본 type인 'button'이 Mock Styled 컴포넌트를 통해 DOM에 전달되었는지 검증
    expect(ghostButton).toHaveAttribute("type", "button");
    // THEN: className prop이 Mock Styled 컴포넌트를 통해 DOM에 전달되었는지 검증
    expect(ghostButton).toHaveClass("test-button");
  });

  test("Icon은 label 보다 앞에 렌더됨", () => {
    // GIVEN: Icon과 Label이 있는 설정
    const variant = "ghost";
    const label = "Label" as Languages;
    const MockIcon = <svg data-testid="test-icon" />;

    // WHEN: 컴포넌트 렌더링
    const { getByTestId } = renderComponent({
      ui: (
        <GhostButton
          variant={variant}
          disabled={false}
          isLoading={false}
          Icon={MockIcon}
          label={label}
          handleButtonClick={vi.fn()}
        />
      ),
    });

    // THEN: Content 컨테이너의 자식 노드 순서 검증
    const content = getByTestId("test-content");
    const children = Array.from(content.childNodes);

    // THEN: 첫 번째 자식이 Icon인지 검증
    expect(children[0]).toEqual(getByTestId("test-icon"));
    // THEN: 두 번째 자식(텍스트 노드)에 Label 텍스트가 포함되어 있는지 검증
    // DESC: toHaveTextContent는 HTMLElement에만 사용 가능, childNodes[1]는 텍스트 노드이므로 textContent로 직접 검증
    expect(children[1].textContent).toContain(label);
  });
});
