import React from "react";

import { describe, expect, test, vi } from "vitest";

import CommonPublicRoute from "@packages/route/public/CommonPublicRoute";

import renderComponent from "@tests/renderComponent";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    Navigate: (props: { to: string }) => (
      <div data-path={props.to} data-testid="test-navigate" />
    ),
    Outlet: () => <div data-testid="test-outlet" />,
  };
});
// GIVEN: i18n.changeLanguage 함수를 Mock으로 설정
const mockChangeLanguage = vi.fn();
// GIVEN: useTranslation hook을 Mocking하여 위에서 정의한 mockChangeLanguage 함수 주입
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ i18n: { changeLanguage: mockChangeLanguage } }),
}));

describe("CommonPublicRoute Test", () => {
  const navigatePath = "/dashboard";

  test("hasUser=true이면, Navigate 컴포넌트가 렌더링되고 navigatePath를 받는지 확인", () => {
    // WHEN: hasUser=true로 렌더링
    const { getByTestId, queryByTestId } = renderComponent({
      ui: (
        <CommonPublicRoute
          hasUser
          forceLaoLanguage={false}
          navigatePath={navigatePath}
        />
      ),
    });

    const navigateElement = getByTestId("test-navigate");
    // DESC: Nullable이기 때문에 queryByTestId 사용
    const outletElement = queryByTestId("test-outlet");

    // THEN: 1. Outlet이 아닌 Navigate이 렌더링되어야 함
    expect(navigateElement).toBeInTheDocument();
    expect(outletElement).not.toBeInTheDocument();
    // THEN: 2. Navigate Mock이 navigatePath를 정확히 받았는지 확인
    expect(navigateElement).toHaveAttribute("data-path", navigatePath);
  });

  test("hasUser=false이면, Outlet 컴포넌트가 렌더링되고 Navigate는 호출되지 않음", () => {
    // WHEN: hasUser=false로 렌더링
    const { getByTestId, queryByTestId } = renderComponent({
      ui: (
        <CommonPublicRoute
          hasUser={false}
          forceLaoLanguage={false}
          navigatePath={navigatePath}
        />
      ),
    });

    // DESC: Nullable이기 때문에 queryByTestId 사용
    const navigateElement = queryByTestId("test-navigate");
    const outletElement = getByTestId("test-outlet");

    // THEN: Outlet이 렌더링되어야 함
    expect(navigateElement).not.toBeInTheDocument();
    expect(outletElement).toBeInTheDocument();
  });

  test("forceLaoLanguage=true이면, 컴포넌트 마운트 시 i18n.changeLanguage('lo')가 호출되어야 함", () => {
    // WHEN: forceLaoLanguage=true로 렌더링
    renderComponent({
      ui: (
        <CommonPublicRoute
          hasUser={false}
          forceLaoLanguage
          navigatePath="/home"
        />
      ),
    });

    // THEN: changeLanguage('lo')가 호출되었는지 확인
    expect(mockChangeLanguage).toHaveBeenCalledOnce();
    expect(mockChangeLanguage).toHaveBeenCalledWith("lo");
  });

  test("forceLaoLanguage=false이면, i18n.changeLanguage가 호출되지 않아야 함", () => {
    // WHEN: forceLaoLanguage=false로 렌더링
    renderComponent({
      ui: (
        <CommonPublicRoute
          hasUser={false}
          forceLaoLanguage={false}
          navigatePath="/home"
        />
      ),
    });

    // THEN: changeLanguage가 호출되지 않았는지 확인
    expect(mockChangeLanguage).not.toHaveBeenCalled();
  });
});
