import React from "react";

import { beforeEach, describe, expect, test, vi } from "vitest";

import type { Languages, ToastType } from "@repo/types";

import HeadlessToast from "@packages/toast/HeadlessToast";
import ToastItem from "@packages/toast/item/ToastItem";

import renderComponent from "@tests/renderComponent";

// DESC: 테스트에 사용할 mockToastStore 정의
const mockToastStore = { toasts: [] as ToastType[] };
// DESC: @repo/stores/toast 모듈의 useToastStore 훅을 Mocking
vi.mock("@repo/stores/toast", () => {
  return {
    useToastStore: (selector: (store: typeof mockToastStore) => unknown) =>
      selector(mockToastStore),
  };
});
// DESC: ToastItem 컴포넌트 Mock
vi.mock("@packages/toast/item/ToastItem", () => ({
  default: vi.fn(() => <div data-testid="toast-item" />),
}));

// DESC: 각 테스트 실행 전 toasts 배열 초기화
beforeEach(() => {
  mockToastStore.toasts = [];
});

describe("HeadlessToast Test", () => {
  test("useToastStore 스토어에 저장된 toasts가 없을 때 HeadlessToast 컴포넌트의 태그 계층 구조와 순서 검증", () => {
    // GIVEN: ToastItem: ToastItem 컴포넌트 설정
    const { container } = renderComponent({
      ui: <HeadlessToast ToastItem={ToastItem} />,
    });

    // THEN: 최상위 엘리먼트가 한 개인지 확인
    expect(container.children.length).toBe(1);
    // THEN: 최상위 엘리먼트의 태그 <div> 확인
    expect(container.children[0].tagName).toBe("DIV");
    // THEN: 스토어에 저장된 toasts가 없으므로, 최상위 엘리먼트의 자식이 없는지 확인
    expect(container.children[0].children.length).toBe(0);
  });

  test("useToastStore 스토어에 저장된 toasts가 있을 때 HeadlessToast 컴포넌트의 태그 계층 구조와 순서 검증", () => {
    // GIVEN: 테스트를 위해 useToastStore에 2개의 임시 데이터 설정
    mockToastStore.toasts = [
      { id: "toast-1", content: "SUCCESS" as Languages, type: "success" },
      { id: "toast-2", content: "WARNING" as Languages, type: "warning" },
    ] as ToastType[];

    // GIVEN: ToastItem: ToastItem 컴포넌트 설정
    const { container } = renderComponent({
      ui: <HeadlessToast ToastItem={ToastItem} />,
    });

    // THEN: 최상위 엘리먼트가 한 개인지 확인
    expect(container.children.length).toBe(1);
    // THEN: 최상위 엘리먼트의 태그 <div> 확인
    expect(container.children[0].tagName).toBe("DIV");
    // THEN: 최상위 엘리먼트의 자식 수가 toasts 갯수와 같은지 확인
    expect(container.children[0].children.length).toBe(
      mockToastStore.toasts.length,
    );
    // THEN: 각 ToastItem이 <div> 태그인지 확인
    Array.from(container.children[0].children).forEach((toastItem) => {
      expect(toastItem.tagName).toBe("DIV");
    });
  });

  test("className props가 <div />의 className props로 올바르게 전달되었는지 확인", () => {
    // GIVEN: className: "test-headless-toast", ToastItem: ToastItem props 전달하도록 설정
    // DESC: container를 호출하여 최상위 렌더링된 div 요소에 접근
    const { container } = renderComponent({
      ui: (
        <HeadlessToast
          className="test-headless-toast-class"
          ToastItem={ToastItem}
        />
      ),
    });

    const div = container.querySelector("div");

    // THEN: div 태그에 className="test-headless-toast-class" 검증
    expect(div).toHaveClass("test-headless-toast-class");
  });

  test("useToastStore 스토어에 저장된 toasts가 없을 경우 ToastItem 컴포넌트 렌더링 안함", () => {
    // GIVEN: ToastItem: ToastItem 컴포넌트 설정
    const { queryByTestId } = renderComponent({
      ui: <HeadlessToast ToastItem={ToastItem} />,
    });

    const toastItem = queryByTestId("toast-item");

    // THEN: ToastItem 컴포넌트가 DOM 문서에 존재하지 않는지 검증
    expect(toastItem).not.toBeInTheDocument();
  });

  test("useToastStore 스토어에 저장된 toasts가 있을 경우 저장된 toast 갯수만큼 ToastItem 컴포넌트 렌더링", () => {
    // GIVEN: 테스트를 위해 useToastStore에 2개의 임시 데이터 설정
    mockToastStore.toasts = [
      { id: "toast-1", content: "SUCCESS" as Languages, type: "success" },
      { id: "toast-2", content: "WARNING" as Languages, type: "warning" },
    ] as ToastType[];

    // GIVEN: ToastItem: ToastItem 컴포넌트 설정
    // DESC: Theme에 의존하는 경우, render 대신 renderComponent를 사용하여 Theme 접근
    // DESC: ToastItem 컴포넌트 반복 렌더링 검증하기 위해 getAllByTestId 사용
    const { getAllByTestId } = renderComponent({
      ui: <HeadlessToast ToastItem={ToastItem} />,
    });

    const toastItems = getAllByTestId("toast-item");

    // THEN: 렌더링된 ToastItem 컴포넌트의 개수가 mockToastStore에 저장된 배열의 길이와 일치하는지 확인
    expect(toastItems).toHaveLength(mockToastStore.toasts.length);
    // THEN: 모든 ToastItem 컴포넌트 DOM 문서에 존재하는지 검증
    toastItems.forEach((toastItem) => {
      expect(toastItem).toBeInTheDocument();
    });
  });
});
