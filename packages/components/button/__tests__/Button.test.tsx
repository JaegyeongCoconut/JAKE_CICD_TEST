import type { ComponentProps } from "react";
import React from "react";

import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import type { Languages } from "@repo/types";

import Button from "@packages/button/Button";
import type * as StyledType from "@packages/button/Button.styled";
import type HeadlessButton from "@packages/button/HeadlessButton";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

// DESC: Hoisted Mocking (Styled Button 및 Loading Spinner 참조용)
const hoisted = vi.hoisted(() => {
  const mockStyledButton = vi.fn(); // DESC: Styled Button Mock (props 전달 검증용)
  const mockLoadingSpinner = vi.fn(); // DESC: Loading Spinner Mock (호출 횟수 검증용)

  return { mockStyledButton, mockLoadingSpinner };
});
// DESC: Styled Component Mocking
vi.mock("@packages/button/Button.styled", () => {
  const MockStyleLoadingWrapper = (
    props: ComponentProps<typeof StyledType.LoadingWrapper>,
  ) => <div>{props.children}</div>; // DESC: 로딩 상태에서 아이콘/라벨을 감싸는 Wrapper
  const MockStyleLoadingContents = (
    props: ComponentProps<typeof StyledType.LoadingContents>,
  ) => <div data-testid="test-loading-contents">{props.children}</div>; // DESC: 로딩 중 실제 내용 (아이콘/라벨)

  return {
    LoadingWrapper: MockStyleLoadingWrapper,
    LoadingContents: MockStyleLoadingContents,
    button: hoisted.mockStyledButton, // DESC: S.button Mock
    loadingSpinner: hoisted.mockLoadingSpinner, // DESC: S.loadingSpinner Mock
  };
});
// DESC: HeadlessButton Mocking
vi.mock("@packages/button/HeadlessButton", () => ({
  default: (props: ComponentProps<typeof HeadlessButton>) => (
    <button
      className={props.className}
      data-is-loading={!!props.isLoading} // DESC: 로딩 상태 prop 전달 검증용
      data-testid="test-headless-button"
      disabled={props.disabled}
      type={props.type}
      onClick={props.handleButtonClick}
    >
      {props.children}
    </button>
  ),
}));
// DESC: LoadingSpinner 컴포넌트 Mocking
vi.mock("@packages/loadingSpinner/LoadingSpinner", () => ({
  default: () => <div data-testid="test-loading-spinner" />,
}));

describe("Button Test", () => {
  // GIVEN: userEvent setup
  const user = userEvent.setup();

  test("variant=iconOnly 라면, Button 렌더 시 Icon만 렌더됨", async () => {
    // GIVEN: Icon, mock handler, variant="iconOnly"
    const MockIcon = () => <svg data-testid="test-icon" />;
    const mockHandler = vi.fn();

    // WHEN: 컴포넌트 렌더링
    const { container, getByTestId } = renderComponent({
      ui: (
        <Button
          className="test-class"
          variant="iconOnly"
          disabled={false}
          Icon={MockIcon}
          handleButtonClick={mockHandler}
        />
      ),
    });

    // THEN: 최상위 엘리먼트가 HeadlessButton 하나인지 확인
    expect(container.children).toHaveLength(1);

    const headlessButton = container.children[0];

    // THEN: HeadlessButton의 기본 속성 및 props 전달 검증
    expect(headlessButton).toBeInTheDocument();
    expect(headlessButton).toBe(getByTestId("test-headless-button"));
    expect(headlessButton).toHaveClass("test-class");
    expect(hoisted.mockStyledButton).toHaveBeenCalledWith({
      isLoading: false,
      variant: "iconOnly", // DESC: variant prop 전달 확인
    });
    expect(headlessButton).not.toBeDisabled();
    expect(headlessButton).toHaveAttribute("data-is-loading", "false");
    expect(headlessButton).toHaveAttribute("type", "button");

    // THEN: HeadlessButton의 children이 Icon 하나만 있는지 확인
    expect(headlessButton.children).toHaveLength(1);

    const icon = headlessButton.children[0];

    // THEN: 렌더링된 자식이 Mock Icon인지 확인
    expect(icon).toBeInTheDocument();
    expect(icon).toBe(getByTestId("test-icon"));

    // WHEN: 버튼 클릭
    await user.click(headlessButton);

    // THEN: 클릭 핸들러가 한 번 호출되었는지 확인
    expect(mockHandler).toHaveBeenCalledOnce();
  });

  describe("variant!=iconOnly", () => {
    describe("isLoading=true", () => {
      // GIVEN: MockDefaultLanguage 호출 횟수 초기화
      vi.mocked(mockDefaultLanguage).mockClear();

      test(`Icon이 props로 전달된다면, 
            HeadlessButton의 chlidren으로 S.LoadingWrapper가 렌더 되고 
            S.LoadingWrapper의 children으로 LoadingSpinner, S.LoadingContents가 렌더된 뒤, 
            S.LoadingContents의 children으로 Icon과 label이 모두 렌더됨`, async () => {
        // GIVEN: label, Icon, isLoading: true
        const textLabel = "Label" as Languages;
        const MockIcon = () => <svg data-testid="test-icon" />;
        const mockHandler = vi.fn();

        // WHEN: 컴포넌트 렌더링
        const { container, getByTestId } = renderComponent({
          ui: (
            <Button
              className="test-class"
              variant="primary"
              disabled={false}
              isLoading // isLoading={true}
              Icon={MockIcon}
              label={textLabel}
              handleButtonClick={mockHandler}
            />
          ),
        });

        const headlessButton = container.children[0];

        // THEN: HeadlessButton의 자식이 LoadingWrapper 하나인지 확인
        expect(headlessButton.children).toHaveLength(1);

        const loadingWrapper = headlessButton.children[0];

        // THEN: LoadingWrapper의 자식이 LoadingSpinner와 LoadingContents 2개인지 확인
        expect(loadingWrapper.children).toHaveLength(2);

        // THEN: 첫 번째 자식이 LoadingSpinner Mock인지 확인
        expect(loadingWrapper.children[0]).toBeInTheDocument();
        expect(loadingWrapper.children[0]).toBe(
          getByTestId("test-loading-spinner"),
        );
        expect(hoisted.mockLoadingSpinner).toHaveBeenCalledOnce();

        // THEN: 두 번째 자식이 S.LoadingContents Mock인지 확인
        expect(loadingWrapper.children[1]).toBeInTheDocument();
        expect(loadingWrapper.children[1]).toBe(
          getByTestId("test-loading-contents"),
        );

        const loadingContents = loadingWrapper.children[1];

        // THEN: LoadingContents의 첫 번째 자식이 Mock Icon인지 확인
        const icon = loadingContents.firstChild;
        expect(icon).toBe(getByTestId("test-icon"));

        // THEN: LoadingContents의 마지막 자식이 텍스트 라벨인지 확인
        const label = loadingContents.lastChild;
        expect(label).not.toBeNull();
        expect(label?.nodeType).toBe(Node.TEXT_NODE);
        expect(label).toHaveTextContent(textLabel);
        expect(mockDefaultLanguage).toHaveBeenCalledOnce();
        expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: textLabel });
      });

      test(`Icon이 props로 전달되지 않는다면, 
            HeadlessButton의 chlidren으로 S.LoadingWrapper가 렌더 되고 
            S.LoadingWrapper의 children으로 LoadingSpinner, S.LoadingContents가 렌더된 뒤, 
            S.LoadingContents의 children으로 label만 렌더됨`, async () => {
        // GIVEN: label만 전달, isLoading: true
        const textLabel = "Label" as Languages;
        const mockHandler = vi.fn();

        // WHEN: 컴포넌트 렌더링
        const { container, getByTestId } = renderComponent({
          ui: (
            <Button
              className="test-class"
              variant="primary"
              disabled={false}
              isLoading
              label={textLabel}
              handleButtonClick={mockHandler}
            />
          ),
        });

        const headlessButton = container.children[0];

        // THEN: HeadlessButton의 자식이 LoadingWrapper 하나인지 확인
        expect(headlessButton.children).toHaveLength(1);

        const loadingWrapper = headlessButton.children[0];

        // THEN: LoadingWrapper의 자식이 LoadingSpinner와 LoadingContents 2개인지 확인
        expect(loadingWrapper.children).toHaveLength(2);
        expect(loadingWrapper.children[0]).toBeInTheDocument();
        expect(loadingWrapper.children[0]).toBe(
          getByTestId("test-loading-spinner"),
        );
        expect(hoisted.mockLoadingSpinner).toHaveBeenCalledOnce();
        expect(loadingWrapper.children[1]).toBeInTheDocument();
        expect(loadingWrapper.children[1]).toBe(
          getByTestId("test-loading-contents"),
        );

        const loadingContents = loadingWrapper.children[1];

        // THEN: LoadingContents의 자식이 텍스트 노드 하나만 있는지 확인
        const labelNode = loadingContents.firstChild;
        expect(labelNode).not.toBeNull();
        expect(labelNode?.nodeType).toBe(Node.TEXT_NODE);
        expect(labelNode).toHaveTextContent(textLabel);
        expect(mockDefaultLanguage).toHaveBeenCalledOnce();
        expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: textLabel });
      });
    });

    describe("isLoading=false", () => {
      // GIVEN: MockDefaultLanguage 호출 횟수 초기화
      vi.mocked(mockDefaultLanguage).mockClear();

      test("Icon이 props로 전달된다면, HeadlessButton의 children으로 Icon과 label 모두 렌더됨", () => {
        // GIVEN: label, Icon, isLoading: false
        const textLabel = "Label" as Languages;
        const MockIcon = () => <svg data-testid="test-icon" />;
        const mockHandler = vi.fn();

        // WHEN: 컴포넌트 렌더링
        const { container, getByTestId } = renderComponent({
          ui: (
            <Button
              className="test-class"
              variant="primary"
              disabled={false}
              isLoading={false}
              Icon={MockIcon}
              label={textLabel}
              handleButtonClick={mockHandler}
            />
          ),
        });

        const headlessButton = container.children[0];

        // THEN: HeadlessButton의 자식이 Icon과 텍스트 노드 두 개인지 확인
        expect(headlessButton.children).toHaveLength(1); // DESC: 텍스트 노드는 children에 포함 안됨, svg만 감지되기 때문에 길이는 1

        const icon = headlessButton.firstChild;

        // THEN: 첫 번째 자식이 Mock Icon인지 확인
        expect(icon).toBeInTheDocument();
        expect(icon).toBe(getByTestId("test-icon"));

        const label = headlessButton.lastChild;

        // THEN: 마지막 자식이 텍스트 라벨인지 확인
        expect(label).not.toBeNull();
        expect(label?.nodeType).toBe(Node.TEXT_NODE);
        expect(label).toHaveTextContent(textLabel);
        expect(mockDefaultLanguage).toHaveBeenCalledOnce();
        expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: textLabel });
      });

      test("Icon이 props로 전달되지 않는다면, HeadlessButton의 children으로 label만 렌더됨", () => {
        // GIVEN: label만 전달, isLoading: false
        const textLabel = "Label" as Languages;
        const mockHandler = vi.fn();

        // WHEN: 컴포넌트 렌더링
        const { container } = renderComponent({
          ui: (
            <Button
              className="test-class"
              variant="primary"
              disabled={false}
              isLoading={false}
              label={textLabel}
              handleButtonClick={mockHandler}
            />
          ),
        });

        const headlessButton = container.children[0];

        // THEN: HeadlessButton의 자식이 텍스트 노드 하나인지 확인
        expect(headlessButton.children).toHaveLength(0); // DESC: 텍스트 노드는 children에 포함 안됨

        const label = headlessButton.firstChild; // DESC: firstChild는 텍스트 노드를 반환

        // THEN: 첫 번째 자식이 텍스트 라벨인지 확인
        expect(label).not.toBeNull();
        expect(label?.nodeType).toBe(Node.TEXT_NODE);
        expect(label).toHaveTextContent(textLabel);
        expect(mockDefaultLanguage).toHaveBeenCalledOnce();
        expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: textLabel });
      });
    });
  });
});
