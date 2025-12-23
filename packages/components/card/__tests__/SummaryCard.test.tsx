import type { ComponentProps } from "react";
import React from "react";

import { describe, expect, test, vi } from "vitest";

import type { Languages } from "@repo/types";

import SummaryCard from "@packages/card/summary/SummaryCard";
import type * as StyledType from "@packages/card/summary/SummaryCard.styled";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

// DESC: Styled Component Mocking
vi.mock("@packages/card/summary/SummaryCard.styled", () => {
  const MockStyledSummaryCard = (
    props: ComponentProps<typeof StyledType.SummaryCard>,
  ) => <div className={props.className}>{props.children}</div>;
  const MockStyledTitle = (props: ComponentProps<typeof StyledType.Title>) => (
    <span data-testid="test-title">{props.children}</span>
  );
  const MockStyledContent = (
    props: ComponentProps<typeof StyledType.Content>,
  ) => <div>{props.children}</div>;

  return {
    SummaryCard: MockStyledSummaryCard,
    Title: MockStyledTitle,
    Content: MockStyledContent,
  };
});

describe("SummaryCard Test", () => {
  const text = "LANGUAGES" as Languages;

  test("기본 렌더링 시 title이 있으면 defaultLanguage를 실행했는지 테스트", () => {
    // GIVEN: title prop이 있는 SummaryCard
    // WHEN: 컴포넌트 렌더링
    const { getByTestId } = renderComponent({
      ui: <SummaryCard title={text}>Render</SummaryCard>,
    });

    // THEN: defaultLanguage 훅이 한 번 호출되었는지 확인
    expect(mockDefaultLanguage).toHaveBeenCalledOnce();
    // THEN: defaultLanguage 훅이 올바른 텍스트를 전달받았는지 확인
    expect(mockDefaultLanguage).toHaveBeenCalledWith({ text });

    const title = getByTestId("test-title");

    // THEN: 렌더링된 Content에 label 텍스트가 표시되는지 검증
    expect(title).toHaveTextContent(text);
  });

  test("SummaryCard 렌더링 시 내부 구조 검증", () => {
    // GIVEN: title prop이 있는 SummaryCard
    // WHEN: 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: <SummaryCard title={text}>Render</SummaryCard>,
    });

    const summaryCard = container.children[0];

    // THEN: 최상위 엘리먼트가 한 개인지 확인
    expect(container.children).toHaveLength(1);
    // THEN: 최상위 엘리먼트의 태그 <div> 확인
    expect(summaryCard.tagName).toBe("DIV");
    // THEN: 자식 요소가 span, div 2개인지 확인
    expect(summaryCard.children).toHaveLength(2);
    // THEN: div 렌더링 확인
    expect(summaryCard).toBeInTheDocument();

    const title = summaryCard.children[0];

    // THEN: span 텍스트 및 Hook 호출 검증
    expect(title).toBeInTheDocument();
    expect(mockDefaultLanguage).toHaveBeenCalledWith({ text });

    const content = summaryCard.children[1];

    // THEN: content 렌더링 확인
    expect(content).toBeInTheDocument();
  });
});
