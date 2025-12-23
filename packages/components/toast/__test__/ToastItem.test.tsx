import type { ComponentProps } from "react";
import React from "react";

import { describe, expect, it, test, vi } from "vitest";

import type { Languages, ToastType } from "@repo/types";

import ToastItem from "@packages/toast/item/ToastItem";
import type * as StyledType from "@packages/toast/item/ToastItem.styled";

import renderComponent from "@tests/renderComponent";

// DESC: 아이콘 Mocking: ic_check_circle.svg를 Mocking하여 테스트 ID가 있는 SVG 컴포넌트를 반환하도록 설정
vi.mock("@repo/assets/icon/ic_check_circle.svg", () => ({
  ReactComponent: () => <svg data-testid="CheckCircleIcon" />,
}));
// DESC: 아이콘 Mocking: ic_warning.svg를 Mocking하여 테스트 ID가 있는 SVG 컴포넌트를 반환하도록 설정
vi.mock("@repo/assets/icon/ic_warning.svg", () => ({
  ReactComponent: () => <svg data-testid="WarningIcon" />,
}));
// DESC: defaultLanguage Mocking: useDefaultLanguage 훅과 defaultLanguage 함수를 Mocking
const mockDefaultLanguage = vi.fn(({ text }: { text: string }) => text);
vi.mock("@repo/hooks/useDefaultLanguage", () => ({
  default: () => ({ defaultLanguage: mockDefaultLanguage }),
}));
const hoisted = vi.hoisted(() => ({ mockIsClosing: false }));
// DESC: isClosing Mocking: useToastItem 훅과 isClosing Mocking
vi.mock("@repo/hooks/useToastItem", () => {
  return { default: () => ({ isClosing: hoisted.mockIsClosing }) };
});
// DESC: Styled Component Mocking: 스타일 컴포넌트들을 Mocking하여 테스트에 필요한 prop들이 DOM에 반영되는지 확인
vi.mock("@packages/toast/item/ToastItem.styled", () => {
  // DESC: ToastItem 스타일 컴포넌트 Mock
  const MockStyledToastItem = (
    props: ComponentProps<typeof StyledType.ToastItem>,
  ) => (
    <div data-is-closing={`${props.isClosing}`} data-testid="test-toast-item">
      {props.children}
    </div>
  );
  // DESC: Item 스타일 컴포넌트 Mock
  const MockStyledItem = (props: ComponentProps<typeof StyledType.Item>) => (
    <div data-testid="test-item" data-type={props.toastType}>
      {props.children}
    </div>
  );

  return { ToastItem: MockStyledToastItem, Item: MockStyledItem };
});

describe("ToastItem Test", () => {
  // GIVEN: 테스트에 사용할 toastItemId, toastItemContent, toastItemType 설정
  const toastItemId = "toast-id";
  const toastItemContent = "CONTENT" as Languages;
  const toastItemType = "success";

  it.each([{ isClosing: true }, { isClosing: false }])(
    "useToastItem 훅을 통해 나온 isClosing 값이 <S.ToastItem />의 isClosing props로 올바르게 전달되었는지 확인",
    ({ isClosing }) => {
      // GIVEN: useToastItem 훅을 통해 나온 isClosing 값 false 설정
      hoisted.mockIsClosing = isClosing;

      // GIVEN: id: "toast-id", content: "CONTENT", type: "success" 설정
      const { getByTestId } = renderComponent({
        ui: (
          <ToastItem
            id={toastItemId}
            content={toastItemContent}
            type={toastItemType}
          />
        ),
      });

      const toastItem = getByTestId("test-toast-item");

      // THEN: ToastItem Mock에 data-is-closing=true || false  검증
      expect(toastItem).toHaveAttribute("data-is-closing", `${isClosing}`);
    },
  );

  test("type props가 <S.Item />의 toastType props로 올바르게 전달되었는지 확인", () => {
    // GIVEN: id: "toast-id", content: "CONTENT", type: "success" 설정
    const { getByTestId } = renderComponent({
      ui: (
        <ToastItem
          id={toastItemId}
          content={toastItemContent}
          type={toastItemType}
        />
      ),
    });

    const item = getByTestId("test-item");

    // THEN: Item Mock에 data-type="success" || "warning" 검증
    expect(item).toHaveAttribute("data-type", toastItemType);
  });

  it.each([
    { type: "success", iconId: "CheckCircleIcon" },
    { type: "warning", iconId: "WarningIcon" },
  ])("type이 $type 이면, <$iconId /> 아이콘 렌더링", ({ type, iconId }) => {
    // GIVEN: id: "toast-id", content: "CONTENT", type: "success" || "false" 설정
    const { getByTestId } = renderComponent({
      ui: (
        <ToastItem
          id={toastItemId}
          content={toastItemContent}
          type={type as ToastType["type"]}
        />
      ),
    });

    const icon = getByTestId(iconId);

    // THEN: type에 따른 CheckCircleIcon, WarningIcon 렌더링 검증
    expect(icon).toBeInTheDocument();
  });

  test("content props가 <S.Item />의 content props로 올바르게 전달되었는지 확인", () => {
    // GIVEN: id: "toast-id", content: "CONTENT", type: "success" 설정
    const { getByTestId } = renderComponent({
      ui: (
        <ToastItem
          id={toastItemId}
          content={toastItemContent}
          type={toastItemType}
        />
      ),
    });

    // THEN: 토스트 메시지에 대해 defaultLanguage가 한 번 호출되었는지 검증
    expect(mockDefaultLanguage).toHaveBeenCalledOnce();
    expect(mockDefaultLanguage).toHaveBeenCalledWith({
      text: toastItemContent,
    });

    const item = getByTestId("test-item");
    // DESC: Item Mock의 하위 요소인 <p> 태그 선택
    const paragraph = item.querySelector("p");

    // THEN: 해당 <p> 태그가 DOM 문서에 존재하는지 검증
    expect(paragraph).toBeInTheDocument();
    // THEN: 렌더링된 Message가 표시되는지 검증
    expect(paragraph).toHaveTextContent(toastItemContent);
  });
});
