import React from "react";

import { beforeEach, describe, expect, test, vi } from "vitest";

import CommonPrivateRoute from "@packages/route/private/CommonPrivateRoute";

import renderComponent from "@tests/renderComponent";

const mockUseLocation = vi.fn();
let mockSearchParams = new URLSearchParams("");
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useLocation: () => mockUseLocation(),
    useSearchParams: () => [mockSearchParams, vi.fn()],
    Navigate: (props: { to: string }) => (
      <div data-path={props.to} data-testid="test-navigate" />
    ),
    Outlet: () => <div data-testid="test-outlet" />,
  };
});
const mockModalStore = { handleModalAllClose: vi.fn() };
vi.mock("@repo/stores/modal", () => ({
  useModalStore: (selector: (store: typeof mockModalStore) => unknown) =>
    selector(mockModalStore),
}));

beforeEach(() => {
  // GIVEN: 각 테스트 전 useLocation의 기본값 설정
  mockUseLocation.mockReturnValue({ pathname: "/current", search: "" });
});

describe("CommonPrivateRoute Test", () => {
  const navigatePath = "/path";

  test("초기 마운트 시, handleModalAllClose 호출 및 Body Style 설정이 실행되어야 함", () => {
    // WHEN: 렌더링
    renderComponent({
      ui: <CommonPrivateRoute hasUser isAccessiblePage navigatePath="" />,
    });

    // THEN: 1. 모든 모달을 닫는 handleModalAllClose 호출 확인
    expect(mockModalStore.handleModalAllClose).toHaveBeenCalledTimes(1);
    // THEN: 2. Body를 auto로 설정하는 Side Effect 확인
    expect(document.body.style.cssText).toBe("overflow: auto;");
  });

  test("hasUser=false라면 루트 페이지('/')로 Navigate 해야 함", () => {
    // GIVEN: 사용자 없음
    const { getByTestId, queryByTestId } = renderComponent({
      ui: (
        <CommonPrivateRoute
          hasUser={false}
          isAccessiblePage
          navigatePath={navigatePath}
        />
      ),
    });

    // THEN: Navigate to="/"
    expect(getByTestId("test-navigate")).toBeInTheDocument();
    expect(getByTestId("test-navigate")).toHaveAttribute("data-path", "/");
    // THEN: Outlet은 렌더링되지 않음
    expect(queryByTestId("test-outlet")).not.toBeInTheDocument();
  });

  test("hasUser=true & isAccessiblePage=false라면 지정된 navigatePath로 Navigate 해야 함", () => {
    // GIVEN: 사용자 있음, 접근 불가
    const { getByTestId, queryByTestId } = renderComponent({
      ui: (
        <CommonPrivateRoute
          hasUser
          isAccessiblePage={false}
          navigatePath={navigatePath}
        />
      ),
    });

    // THEN: Navigate to={navigatePath} (접근 불가 페이지)
    expect(getByTestId("test-navigate")).toBeInTheDocument();
    expect(getByTestId("test-navigate")).toHaveAttribute(
      "data-path",
      navigatePath,
    );
    // THEN: Outlet은 렌더링되지 않음
    expect(queryByTestId("test-outlet")).not.toBeInTheDocument();
  });

  test("hasUser=true & isAccessiblePage=true라면 Outlet을 렌더링해야 함", () => {
    // GIVEN: 사용자 있음, 접근 가능
    const { getByTestId, queryByTestId } = renderComponent({
      ui: (
        <CommonPrivateRoute
          hasUser
          isAccessiblePage
          navigatePath={navigatePath}
        />
      ),
    });

    // THEN: Outlet 렌더링
    expect(getByTestId("test-outlet")).toBeInTheDocument();
    // THEN: Navigate는 렌더링되지 않음
    expect(queryByTestId("test-navigate")).not.toBeInTheDocument();
  });

  test("isAccessiblePage=false이고 navigatePath가 빈 문자열이면 Outlet을 렌더링해야 함", () => {
    // GIVEN: 사용자 있음, 접근 불가, 하지만 리다이렉트 경로가 빈 문자열인 경우
    const { getByTestId, queryByTestId } = renderComponent({
      ui: (
        <CommonPrivateRoute
          hasUser
          isAccessiblePage={false}
          navigatePath={""} // DESC: 빈 문자열이면 리다이렉트 로직 우회
        />
      ),
    });

    // THEN: Outlet 렌더링
    expect(getByTestId("test-outlet")).toBeInTheDocument();
    expect(queryByTestId("test-navigate")).not.toBeInTheDocument();
  });

  test("location.pathname이 변경될 때, Side Effect가 재실행되어야 함", () => {
    // GIVEN: 초기 렌더링
    const { rerender } = renderComponent({
      ui: <CommonPrivateRoute hasUser isAccessiblePage navigatePath="" />,
    });

    // WHEN: pathname 변경 (useEffect 의존성 변경)
    mockUseLocation.mockReturnValue({ pathname: "/new-path", search: "" });
    // WHEN: rerender
    rerender(<CommonPrivateRoute hasUser isAccessiblePage navigatePath="" />);

    // THEN: handleModalAllClose 재실행 확인( 초기 호출 + rerender로 인한 호출 = 2 )
    expect(mockModalStore.handleModalAllClose).toHaveBeenCalledTimes(2);
    // THEN: Body Style 설정 재실행 확인
    expect(document.body.style.cssText).toBe("overflow: auto;");
  });

  test("searchParams의 값이 변경될 때, Side Effect가 재실행되어야 함", () => {
    // GIVEN: 초기 렌더링
    const { rerender } = renderComponent({
      ui: <CommonPrivateRoute hasUser isAccessiblePage navigatePath="" />,
    });

    // WHEN: searchParams 변경 (useEffect 의존성 변경)
    mockSearchParams = new URLSearchParams("id=123");

    // WHEN: rerender
    rerender(<CommonPrivateRoute hasUser isAccessiblePage navigatePath="" />);

    // THEN: handleModalAllClose 재실행 확인( 초기 호출 + rerender로 인한 호출 = 2 )
    expect(mockModalStore.handleModalAllClose).toHaveBeenCalledTimes(2);
    // THEN: Body Style 설정 재실행 확인
    expect(document.body.style.cssText).toBe("overflow: auto;");
  });

  test("location.pathname이나 searchParams 외의 값이 변경될 때는 Side Effect가 실행되지 않아야 함", () => {
    // GIVEN: 초기 렌더링
    const { rerender } = renderComponent({
      ui: <CommonPrivateRoute hasUser isAccessiblePage navigatePath="" />,
    });
    // GIVEN: 초기 호출 기록 삭제
    mockModalStore.handleModalAllClose.mockClear();
    // GIVEN: Body Style 임의 변경
    document.body.style.cssText = "overflow: hidden;";

    // WHEN: location 객체 내의 pathname과 search는 유지하고, hash만 변경
    mockUseLocation.mockReturnValue({
      pathname: "/current",
      search: "",
      hash: "#section", // DESC: 무관한 값 변경
    });

    // WHEN: rerender
    rerender(<CommonPrivateRoute hasUser isAccessiblePage navigatePath="" />);

    // THEN: Side Effect 호출 없음 확인
    expect(mockModalStore.handleModalAllClose).not.toHaveBeenCalled();
    // THEN: Body Style이 변경되지 않았는지 확인
    expect(document.body.style.cssText).toBe("overflow: hidden;");
  });
});
