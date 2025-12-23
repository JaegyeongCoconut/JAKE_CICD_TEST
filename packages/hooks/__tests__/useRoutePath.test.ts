import { renderHook } from "@testing-library/react";
import { vi, describe, expect, test } from "vitest";

import useRoutePath from "@packages/hooks/useRoutePath";

const hoisted = vi.hoisted(() => ({
  mockUseLocation: vi.fn(),
  mockSetPath: vi.fn(),
}));
vi.mock("react-router-dom", () => ({ useLocation: hoisted.mockUseLocation }));
vi.mock("@repo/utils/pathStorage", () => ({
  default: { setPath: hoisted.mockSetPath },
}));

describe("useRoutePath Test", () => {
  test("nonSavedPath에 포함되지 않은 경로는 pathStorage에 저장되어야 함.", () => {
    const mockPathname = "/dashboard";

    // GIVEN: useLocation이 반환할 초기 경로 값 설정
    hoisted.mockUseLocation.mockReturnValue({
      pathname: mockPathname,
      search: "",
    });

    // WHEN: hook 렌더링, hook이 마운트될 때 useEffect가 실행됨
    renderHook(() => useRoutePath({ nonSavedPath: ["/login", "/register"] }));

    // THEN: pathStorage.setPath가 전체 경로로 한 번 호출되었는지 확인
    expect(hoisted.mockSetPath).toHaveBeenCalledTimes(1);
    expect(hoisted.mockSetPath).toHaveBeenCalledWith(mockPathname);
  });

  test("쿼리 파라미터가 포함된 경로는 전체 경로가 pathStorage에 저장되어야 함.", () => {
    const mockPathname = "/items";
    const mockSearch = "?page=2&sort=name";

    // GIVEN: useLocation이 쿼리 파라미터를 포함한 경로 반환
    hoisted.mockUseLocation.mockReturnValue({
      pathname: mockPathname,
      search: mockSearch,
    });

    // WHEN: hook 렌더링
    renderHook(() => useRoutePath({ nonSavedPath: [] }));

    // THEN: pathStorage.setPath가 'pathname + search'로 호출되었는지 확인
    expect(hoisted.mockSetPath).toHaveBeenCalledTimes(1);
    expect(hoisted.mockSetPath).toHaveBeenCalledWith(
      `${mockPathname}${mockSearch}`,
    );
  });

  test("nonSavedPath에 포함된 경로는 pathStorage에 저장되지 않아야 함.", () => {
    // GIVEN: useLocation이 저장 제외 경로 반환
    hoisted.mockUseLocation.mockReturnValue({
      pathname: "/login",
      search: "",
    });
    const nonSavedPath = ["/login", "/register"];

    // WHEN: hook 렌더링
    renderHook(() => useRoutePath({ nonSavedPath }));

    // THEN: pathStorage.setPath가 전혀 호출되지 않았는지 확인
    // DESC: hook 내부에서는 pathname만 비교함 (`nonSavedPath.includes(pathname)`)
    expect(hoisted.mockSetPath).not.toHaveBeenCalled();
  });

  describe("의존성 검증", () => {
    test("pathname만 변경되었을 때 pathStorage에 새 경로를 저장해야 함.", () => {
      const mockSearch = "?status=A";

      // GIVEN: 초기 경로 설정
      hoisted.mockUseLocation.mockReturnValue({
        pathname: "/home",
        search: mockSearch,
      });

      // WHEN: 1. hook 렌더링 (초기 저장)
      const { rerender } = renderHook(() => useRoutePath({ nonSavedPath: [] }));

      // WHEN: 2. pathname만 변경 후 다시 렌더링, search는 "?status=A"로 유지됨
      hoisted.mockUseLocation.mockReturnValue({
        pathname: "/profile",
        search: mockSearch,
      });

      rerender();

      // THEN: pathStorage.setPath가 새로운 경로("/profile?status=A")로 한 번 호출되었는지 확인
      expect(hoisted.mockSetPath).toHaveBeenCalledWith("/profile?status=A");
    });

    test("search만 변경되었을 때 pathStorage에 새 경로를 저장해야 함.", () => {
      const mockPathname = "/settings";

      // GIVEN: 초기 경로 설정
      hoisted.mockUseLocation.mockReturnValue({
        pathname: mockPathname,
        search: "?tab=popup",
      });

      // WHEN: 1. hook 렌더링 (초기 저장)
      const { rerender } = renderHook(() => useRoutePath({ nonSavedPath: [] }));

      // WHEN: 2. search만 변경 후 다시 렌더링, pathname은 "/settings"로 유지됨
      hoisted.mockUseLocation.mockReturnValue({
        pathname: mockPathname,
        search: "?tab=inquiry",
      });

      rerender();

      // THEN: pathStorage.setPath가 새로운 경로("/settings?tab=inquiry")로 한 번 호출되었는지 확인
      expect(hoisted.mockSetPath).toHaveBeenCalledWith("/settings?tab=inquiry");
    });

    test("pathname과 search 모두 변경되지 않았을 때 pathStorage가 호출되지 않아야 함.", () => {
      // GIVEN: 초기 경로 설정
      hoisted.mockUseLocation.mockReturnValue({
        pathname: "/report",
        search: "?filter=A",
      });

      // WHEN: 1. hook 렌더링 (초기 저장)
      const { rerender } = renderHook(() => useRoutePath({ nonSavedPath: [] }));

      // DESC: 마운트 시 호출된 1회 기록을 지움, 리렌더 시 호출 여부만 검증하기 위함
      vi.clearAllMocks();

      // WHEN: 2. 경로 변경 없이 다시 렌더링, useLocation의 반환값은 이전과 동일함
      rerender();

      // THEN: pathStorage.setPath가 추가로 호출되지 않았는지 확인
      expect(hoisted.mockSetPath).not.toHaveBeenCalled();
    });
  });
});
