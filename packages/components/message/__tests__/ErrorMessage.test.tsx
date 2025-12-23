import type { ComponentProps } from "react";
import React from "react";

import { describe, expect, test, vi } from "vitest";

import type { Languages } from "@repo/types";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

import ErrorMessage from "../ErrorMessage";
import type * as StyledType from "../ErrorMessage.styled";

vi.mock("../ErrorMessage.styled", () => {
  const MockStyledErrorMessage = (
    props: ComponentProps<typeof StyledType.ErrorMessage>,
  ) => (
    <p className={props.className} role={props.role}>
      {props.children}
    </p>
  );

  return {
    ErrorMessage: MockStyledErrorMessage,
  };
});

describe("ErrorMessage Test", () => {
  // GIVEN: message prop
  const message = "Error message" as Languages;

  test("ErrorMessage 렌더 시, S.ErrorMessage가 렌더되고 role='alert' 속성을 가져야 함", () => {
    // WHEN: 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: <ErrorMessage message={message} />,
    });

    // THEN: 최상위 엘리먼트가 하나인지 확인
    expect(container.children).toHaveLength(1);

    const wrapper = container.children[0];

    // THEN: ErrorMessage이 렌더되었는지 확인
    expect(wrapper).toBeInTheDocument();

    // THEN: role="alert" 속성이 있는지 확인
    expect(wrapper).toHaveAttribute("role", "alert");
  });

  test("message prop이 전달되면, defaultLanguage 함수를 통해 번역된 텍스트가 렌더되어야 함", () => {
    // WHEN: 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: <ErrorMessage message={message} />,
    });

    const wrapper = container.children[0];

    // THEN: defaultLanguage 함수 호출 여부 확인
    expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: message });

    // THEN: 텍스트 내용이 있는지 확인
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.textContent).toBeTruthy();
  });

  test("className prop이 전달되면, S.ErrorMessage에 className이 적용되어야 함", () => {
    // GIVEN: className prop
    const testClassName = "test-className";

    // WHEN: className prop과 함께 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: <ErrorMessage className={testClassName} message={message} />,
    });

    const wrapper = container.children[0];

    // THEN: className이 적용되었는지 확인
    expect(wrapper).toHaveClass(testClassName);
  });

  test("className prop이 없으면, S.ErrorMessage에 className이 적용되지 않아야 함", () => {
    // WHEN: className prop 없이 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: <ErrorMessage message={message} />,
    });

    const wrapper = container.children[0];

    // THEN: className이 빈 문자열인지 확인
    expect(wrapper.className).toBe("");
  });
});
