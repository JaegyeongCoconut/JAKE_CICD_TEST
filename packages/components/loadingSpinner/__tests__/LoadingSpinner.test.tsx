import type { ComponentProps } from "react";
import React from "react";

import { describe, expect, test, vi } from "vitest";

import renderComponent from "@tests/renderComponent";

import LoadingSpinner from "../LoadingSpinner";
import type * as StyledType from "../LoadingSpinner.styled";

vi.mock("../LoadingSpinner.styled", () => {
  const MockStyledLoadingSpinnerWrapper = (
    props: ComponentProps<typeof StyledType.LoadingSpinnerWrapper>,
  ) => <div className={props.className}>{props.children}</div>;

  const MockSpinner = () => <div />;

  return {
    LoadingSpinnerWrapper: MockStyledLoadingSpinnerWrapper,
    Spinner: MockSpinner,
  };
});

describe("LoadingSpinner Test", () => {
  test("LoadingSpinner 렌더 시, S.LoadingSpinnerWrapper가 최상위에 렌더되고 내부에 S.Spinner가 렌더되어야 함", () => {
    // WHEN: 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: <LoadingSpinner />,
    });

    // THEN: 최상위 엘리먼트가 하나인지 확인
    expect(container.children).toHaveLength(1);

    const wrapper = container.children[0];

    // THEN: wrapper 내부에 하나의 자식 요소만 있는지 확인
    expect(wrapper.children).toHaveLength(1);

    const spinner = wrapper.children[0];

    // THEN: Spinner가 렌더되었는지 확인
    expect(spinner).toBeInTheDocument();
  });

  test("className prop이 전달되면, S.LoadingSpinnerWrapper에 className이 적용되어야 함", () => {
    // GIVEN: className prop
    const testClassName = "test-className";

    // WHEN: className prop과 함께 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: <LoadingSpinner className={testClassName} />,
    });

    const wrapper = container.children[0];

    // THEN: wrapper에 className이 적용되었는지 확인
    expect(wrapper).toHaveClass(testClassName);
  });

  test("className prop이 없으면, S.LoadingSpinnerWrapper에 className이 적용되지 않아야 함", () => {
    // WHEN: className prop 없이 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: <LoadingSpinner />,
    });

    const wrapper = container.children[0];

    // THEN: wrapper의 className이 빈 문자열인지 확인
    expect(wrapper.className).toBe("");
  });
});
