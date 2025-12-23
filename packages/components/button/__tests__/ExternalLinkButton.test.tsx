import type { ComponentProps } from "react";
import React from "react";

import { describe, expect, test, vi } from "vitest";

import ExternalLinkButton from "@packages/button/link/externalLinkButton/ExternalLinkButton";
import type * as StyledType from "@packages/button/link/externalLinkButton/ExternalLinkButton.styled";

import renderComponent from "@tests/renderComponent";

// DESC: Styled Component Mocking: Styled-component를 Mocking하여 최종 렌더링되는 <a> 태그의 속성 전달을 검증함.
vi.mock(
  "@packages/button/link/externalLinkButton/ExternalLinkButton.styled",
  () => {
    // DESC: ExternalLinkButton 스타일 컴포넌트 Mock
    const MockStyledExternalLinkButton = (
      props: ComponentProps<typeof StyledType.ExternalLinkButton>,
    ) => (
      <a
        className={props.className}
        href={props.href}
        data-testid={`test-external-link-button-${props.variant}`} // DESC: variant에 따라 테스트 ID 부여
        rel={props.rel}
        target={props.target}
      >
        {props.children}
      </a>
    );

    return { ExternalLinkButton: MockStyledExternalLinkButton };
  },
);

describe("ExternalLinkButton Test", () => {
  test(`ExternalLinkButton 컴포넌트 렌더 시, 
        S.ExternalLinkButton에 rel='noopener noreferrer', target='_blank' 속성이 전달됨`, () => {
    // GIVEN: 기본적인 href와 variant 설정
    const href = "/";
    const variant = "primary" as const;

    // WHEN: ExternalLinkButton 컴포넌트 렌더링
    const { getByTestId } = renderComponent({
      ui: (
        <ExternalLinkButton href={href} variant={variant}>
          <p />
        </ExternalLinkButton>
      ),
    });

    const externalLinkButton = getByTestId(
      `test-external-link-button-${variant}`,
    );

    // THEN: 컴포넌트가 DOM에 존재하는지 검증
    expect(externalLinkButton).toBeInTheDocument();
    // THEN: href 속성이 올바르게 전달되었는지 검증
    expect(externalLinkButton).toHaveAttribute("href", "/");
    // THEN: 새 탭 열기 속성(target='_blank')이 올바르게 전달되었는지 검증
    expect(externalLinkButton).toHaveAttribute("target", "_blank");
    // THEN: rel='noopener noreferrer'이 올바르게 전달되었는지 검증
    expect(externalLinkButton).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("렌더 시, children이 올바르게 렌더됨", () => {
    // GIVEN: children으로 테스트 ID가 있는 엘리먼트 설정
    const href = "/";
    const variant = "primary" as const;

    // WHEN: ExternalLinkButton 컴포넌트 렌더링
    const { getByTestId } = renderComponent({
      ui: (
        <ExternalLinkButton href={href} variant={variant}>
          <p data-testid="test-child-content" />
        </ExternalLinkButton>
      ),
    });

    // THEN: children 엘리먼트가 DOM에 존재하는지 검증
    expect(getByTestId("test-child-content")).toBeInTheDocument();
  });

  test(`ExternalLinkButton 컴포넌트 렌더 시, 
        S.ExternalLinkButton에 className을 지정하면 className 속성이 전달됨`, () => {
    // GIVEN: className prop 설정
    const href = "/";
    const variant = "primary" as const;
    const className = "test-className";

    // WHEN: className prop을 포함하여 ExternalLinkButton 컴포넌트 렌더링
    const { getByTestId } = renderComponent({
      ui: (
        <ExternalLinkButton className={className} href={href} variant={variant}>
          <p />
        </ExternalLinkButton>
      ),
    });

    // THEN: className 속성이 Mock Styled 컴포넌트를 통해 최종 DOM에 전달되었는지 검증
    expect(getByTestId(`test-external-link-button-${variant}`)).toHaveClass(
      className,
    );
  });
});
