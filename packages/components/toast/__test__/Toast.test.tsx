import type { ComponentProps } from "react";
import React from "react";

import type HeadlessToast from "toast/HeadlessToast";
import { describe, expect, test, vi } from "vitest";

import Toast from "@packages/toast/Toast";

import renderComponent from "@tests/renderComponent";

// DESC: 검증이 필요없지만 테스트에서 해당 스타일을 참조하고 있어 빈 객체로 Mock
vi.mock("@packages/toast/Toast.styled", () => ({ toast: {} }));
// DESC: HeadlessToast 컴포넌트 Mock
vi.mock("../HeadlessToast", () => ({
  default: (props: ComponentProps<typeof HeadlessToast>) => (
    <div data-testid="headless-toast" data-toast-item={!!props.ToastItem} />
  ),
}));

describe("Toast Test", () => {
  test("Toast 컴포넌트의 태그 계층 구조와 순서 검증", () => {
    const { container } = renderComponent({ ui: <Toast /> });

    // THEN: 최상위 엘리먼트가 한 개인지 확인
    expect(container.children.length).toBe(1);
    // THEN: 최상위 엘리먼트의 태그 <div> 확인
    expect(container.children[0].tagName).toBe("DIV");
  });

  test("HeadlessToast 컴포넌트 렌더링 확인 ", () => {
    // WHEN: Toast 컴포넌트 렌더링
    const { getByTestId } = renderComponent({ ui: <Toast /> });

    const headlessToast = getByTestId("headless-toast");

    // THEN: HeadlessToast 컴포넌트가 DOM 문서에 존재하는지 검증
    expect(headlessToast).toBeInTheDocument();
    expect(headlessToast).toHaveAttribute("data-toast-item", "true");
  });
});
