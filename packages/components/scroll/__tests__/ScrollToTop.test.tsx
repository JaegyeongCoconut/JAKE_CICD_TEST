import React from "react";

import { describe, test, vi, beforeEach, expect } from "vitest";

import renderComponent from "@tests/renderComponent";

import ScrollToTop from "../ScrollToTop";

const mockUseLocation = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return { ...actual, useLocation: () => mockUseLocation() };
});
const mockScrollTo = vi.fn();

beforeEach(() => {
  // DESC: JSDOM은 scrollTo를 제공하지 않으므로 테스트용 mock을 document.documentElement에 주입
  Object.defineProperty(document.documentElement, "scrollTo", {
    value: mockScrollTo,
  });

  // GIVEN: 기본 경로 설정
  mockUseLocation.mockReturnValue({ pathname: "/initial" });
});

describe("ScrollToTop Test", () => {
  test("기본 렌더시, children 하나를 가짐", () => {
    // WHEN: 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: (
        <ScrollToTop>
          <div />
        </ScrollToTop>
      ),
    });

    // THEN: 컴포넌트는 UI를 렌더링하지 않고 children만 렌더링해야 함
    expect(container.children).toHaveLength(1);
    expect(container.children[0]).toBeInTheDocument();
  });

  test("컴포넌트가 마운트될 때 스크롤이 최상단(0, 0)으로 이동해야 함", () => {
    // GIVEN: beforeEach에서 mockUseLocation 설정됨

    // WHEN: 컴포넌트 렌더링 (마운트 시점)
    renderComponent({
      ui: (
        <ScrollToTop>
          <div />
        </ScrollToTop>
      ),
    });

    // THEN: 스크롤이 (0, 0)으로 이동하는 함수가 호출되었는지 확인
    expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
    expect(mockScrollTo).toHaveBeenCalledOnce();
  });

  test("location.pathname이 변경되면 스크롤이 다시 실행되어야 함", () => {
    // GIVEN: 초기 렌더링 및 스크롤 실행
    const { rerender } = renderComponent({
      ui: (
        <ScrollToTop>
          <div />
        </ScrollToTop>
      ),
    });

    // THEN: 초기 스크롤 실행 확인 (1회)
    expect(mockScrollTo).toHaveBeenCalledOnce();

    // WHEN: useLocation의 pathname이 '/new'로 변경됨
    mockUseLocation.mockReturnValue({ pathname: "/new" });

    // WHEN: 컴포넌트 재렌더링
    rerender(
      <ScrollToTop>
        <div />
      </ScrollToTop>,
    );

    // THEN: 스크롤이 (0, 0)으로 다시 이동하는 함수가 호출되었는지 확인 (총 2회)
    expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
    expect(mockScrollTo).toHaveBeenCalledTimes(2);
  });

  test("pathname이 동일하고 다른 location 속성만 바뀌면 스크롤은 재실행되지 않아야 함", () => {
    // GIVEN: 초기 렌더링 및 스크롤 실행 (1회)
    const { rerender } = renderComponent({
      ui: (
        <ScrollToTop>
          <div />
        </ScrollToTop>
      ),
    });

    expect(mockScrollTo).toHaveBeenCalledOnce();
    // GIVEN: 이전 호출 기록 초기화
    mockScrollTo.mockClear();

    // WHEN: useLocation의 pathname은 '/initial'로 동일하지만 search 속성만 변경됨
    mockUseLocation.mockReturnValue({
      pathname: "/initial",
      search: "?query=1",
    });

    // WHEN: 컴포넌트 재렌더링
    rerender(
      <ScrollToTop>
        <div />
      </ScrollToTop>,
    );

    // THEN: 스크롤 함수가 다시 호출되지 않았는지 확인
    expect(mockScrollTo).not.toHaveBeenCalled();
  });
});
