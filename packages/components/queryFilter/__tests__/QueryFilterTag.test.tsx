import type { ComponentProps } from "react";
import React from "react";

import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import type { Languages } from "@repo/types";

import type Button from "@packages/button/Button";
import QueryFilterTag from "@packages/queryFilter/containers/box/containers/tag/QueryFilterTag";
import type * as StyledType from "@packages/queryFilter/containers/box/containers/tag/QueryFilterTag.styled";

import renderComponent from "@tests/renderComponent";

// GIVEN: ic_close.svg Mocking
vi.mock("@repo/assets/icon/ic_close.svg", () => ({
  ReactComponent: () => <svg data-testid="test-ic-close" />,
}));
// DESC: useDefaultLanguage Hook Mocking
const mockDefaultLanguage = vi.fn(({ text }: { text: string }) => text);
vi.mock("@repo/hooks/useDefaultLanguage", () => ({
  default: () => ({ defaultLanguage: mockDefaultLanguage }),
}));
// GIVEN: Styled Component Mocking (Props 확인용)
vi.mock(
  "@packages/queryFilter/containers/box/containers/tag/QueryFilterTag.styled",
  () => {
    // GIVEN: QueryFilterTag Wrapper Mock (isExpanded, wrapperWidth 추적용)
    const MockStyledQueryFilterTag = (
      props: ComponentProps<typeof StyledType.QueryFilterTag>,
    ) => (
      <div
        data-is-expanded={!!props.isExpanded}
        data-wrapper-width={props.wrapperWidth}
      >
        {props.children}
      </div>
    );
    // GIVEN: 태그 이름 Mock
    const MockStyledQueryFilterTagName = (
      props: ComponentProps<typeof StyledType.QueryFilterTagName>,
    ) => <div>{props.children}</div>;
    // GIVEN: 태그 내용 Mock
    const MockStyledQueryFilterTagContent = (
      props: ComponentProps<typeof StyledType.QueryFilterTagContent>,
    ) => <div>{props.children}</div>;

    return {
      QueryFilterTag: MockStyledQueryFilterTag,
      QueryFilterTagName: MockStyledQueryFilterTagName,
      QueryFilterTagContent: MockStyledQueryFilterTagContent,
      button: {},
    };
  },
);
// GIVEN: Button 컴포넌트 Mocking (클릭 이벤트, props 확인용)
vi.mock("@packages/button/Button", () => {
  const MockButton = (props: ComponentProps<typeof Button>) => (
    <button
      data-has-icon={!!props.Icon}
      data-testid={`test-button-${props.variant}`}
      disabled={props.disabled}
      onClick={props.handleButtonClick}
    >
      {props.Icon && <props.Icon />}
    </button>
  );

  return { default: MockButton };
});

describe("QueryFilterTag Test", () => {
  const user = userEvent.setup();
  // GIVEN: 모든 테스트에 사용될 기본 Props
  const baseProps = {
    label: "Category" as Languages,
    wrapperWidth: 200,
    handleTagDeleteButtonClick: vi.fn(), // DESC: 삭제 핸들러 Mock
  };

  test("초기 렌더 시, Styled Components에 Props가 정확히 전달되고 CloseIcon이 렌더됨", () => {
    // GIVEN: 일반적인 단일 값 태그 내용
    const content = "NormalValue";

    // WHEN: isExpanded=false 로 렌더링
    const { container, getByTestId } = renderComponent({
      ui: (
        <QueryFilterTag {...baseProps} isExpanded={false} content={content} />
      ),
    });

    const queryFilterTag = container.children[0];

    // THEN: 1. Wrapper Mock에 Props 전달 검증
    expect(queryFilterTag).toHaveAttribute("data-is-expanded", "false");
    expect(queryFilterTag).toHaveAttribute("data-wrapper-width", "200");

    expect(queryFilterTag.children).toHaveLength(3); // DESC: TagName, TagContent, CloseButton

    // THEN: 2. TagName 렌더링 및 Label 다국어 처리 확인
    const queryFilterTagName = queryFilterTag.children[0];

    expect(queryFilterTagName).toBeInTheDocument();
    expect(queryFilterTagName).toHaveTextContent(`${baseProps.label}:`);
    expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: baseProps.label });

    // THEN: 3. TagContent 렌더링 및 내용 확인
    const queryFilterTagContent = queryFilterTag.children[1];

    expect(queryFilterTagContent).toBeInTheDocument();
    expect(queryFilterTagContent).toHaveTextContent(content);

    // THEN: 4. 삭제 버튼 및 아이콘 렌더링 확인
    const closeButton = queryFilterTag.children[2];

    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute("data-has-icon", "true");
    expect(getByTestId("test-ic-close")).toBeInTheDocument();
  });

  describe("translateTagValue 로직 검증", () => {
    test("isExpanded=false일 때, content 전체에 대해 defaultLanguage가 1회 호출되고 정상 출력됨", () => {
      // GIVEN: 단일 Content
      const content = "StatusValue";
      mockDefaultLanguage.mockClear();

      // WHEN: isExpanded=false 로 렌더링 (단일 값 처리)
      const { container } = renderComponent({
        ui: (
          <QueryFilterTag {...baseProps} isExpanded={false} content={content} />
        ),
      });

      const queryFilterTag = container.children[0];
      const queryFilterTagContent = queryFilterTag.children[1];

      // THEN: 1. Content 값이 정상 표시되었는지 확인
      expect(queryFilterTagContent).toHaveTextContent(content);
      // THEN: 2. defaultLanguage 호출 횟수 (Label 1회 + Content 1회 = 총 2회)
      expect(mockDefaultLanguage).toHaveBeenCalledTimes(2);
      // THEN: 3. Content 변환에 사용된 인자 확인 (Content 전체 문자열)
      expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: "StatusValue" });
    });

    test("isExpanded=true일 때, content가 쉼표로 분리되어 각 조각에 대해 defaultLanguage가 호출되고 결합되어 출력됨", () => {
      // GIVEN: 쉼표로 분리된 다중 Content
      const content = "ValueA, ValueB, ValueC";
      mockDefaultLanguage.mockClear();

      // WHEN: isExpanded=true 로 렌더링 (다중 값 처리)
      const { getByText } = renderComponent({
        ui: <QueryFilterTag {...baseProps} isExpanded content={content} />,
      });

      // THEN: 1. defaultLanguage 호출 횟수 (Label 1회 + Content 3회 = 총 4회)
      expect(mockDefaultLanguage).toHaveBeenCalledTimes(4);
      // THEN: 2. 각 조각별 호출 인자 확인 (쉼표와 공백이 제거된 trim() 값이 전달되었는지 간접 검증)
      expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: "ValueA" });
      expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: "ValueB" });
      expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: "ValueC" });
      // THEN: 3. Content Mock에 ", "로 결합된 최종 문자열이 표시되었는지 확인
      expect(getByText(content)).toBeInTheDocument();
    });
  });

  test("Button 클릭 시, handleTagDeleteButtonClick 핸들러가 호출되는지 확인", async () => {
    // GIVEN: 핸들러가 Mock된 상태
    const content = "SomeValue";
    baseProps.handleTagDeleteButtonClick.mockClear();

    const { getByTestId } = renderComponent({
      ui: <QueryFilterTag {...baseProps} isExpanded content={content} />,
    });

    // GIVEN: 닫기 버튼 (MockButton의 iconOnly variant)
    const closeButton = getByTestId("test-button-iconOnly");

    // WHEN: 버튼 클릭
    await user.click(closeButton);

    // THEN: handleTagDeleteButtonClick 핸들러가 정확히 1회 호출되었는지 확인
    expect(baseProps.handleTagDeleteButtonClick).toHaveBeenCalledOnce();
  });
});
