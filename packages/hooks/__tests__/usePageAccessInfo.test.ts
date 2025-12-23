import { renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import usePageAccessInfo from "@packages/hooks/usePageAccessInfo";

// GIVEN: window.history를 사용하여 현재 URL을 설정하는 헬퍼 함수
const setURL = (url: string) => {
  // DESC: 세 번째 인자로 URL을 변경하여 window.location 상태를 Mocking
  window.history.pushState({}, "", url);
};

describe("usePageAccessInfo Test", () => {
  test("level이 falsy(예: 0)면 accessInfo={ path: [], redirectPage: '' }가 isAccessiblePage=true으로 판정.", () => {
    // GIVEN: 현재 URL을 루트 경로로 설정
    setURL("/");

    // GIVEN: level 1에 대한 접근 불가능 정보
    const inaccessInfo = {
      1: { path: ["/dashboard"], redirectPage: "/login" },
    };

    // WHEN: level을 falsy 값인 0으로 설정하여 훅 렌더링
    const { result } = renderHook(() =>
      usePageAccessInfo({ level: 0, inaccessInfo }),
    );

    // THEN: accessInfo는 빈 객체로 초기화되어야 함 (falsy level은 무시)
    expect(result.current.accessInfo).toEqual({ path: [], redirectPage: "" });

    // THEN: 접근 불가능 정보가 없으므로 isAccessiblePage는 true여야 함
    expect(result.current.isAccessiblePage).toBe(true);
  });

  test("accessInfo.path에 `${pathname}${search}`와 완전 일치하는 항목이 있으면 isAccessiblePage=false로 판정.", () => {
    // GIVEN: 현재 URL을 '/dashboard?foo=1'로 설정 (pathname + search)
    setURL("/dashboard?foo=1");

    // GIVEN: path에 현재 URL과 완전히 일치하는 항목을 포함
    const inaccessInfo = {
      1: { path: ["/dashboard?foo=1", "/settings"], redirectPage: "/login" },
    };

    // WHEN: level 1로 훅 렌더링
    const { result } = renderHook(() =>
      usePageAccessInfo({ level: 1, inaccessInfo }),
    );

    // THEN: 완전 일치하므로 isAccessiblePage는 false여야 함
    expect(result.current.isAccessiblePage).toBe(false);
    // THEN: 리다이렉트 페이지 정보도 올바른지 확인
    expect(result.current.accessInfo.redirectPage).toBe("/login");
  });

  test("동적 파라미터 패턴('/users/:id')이 현재 경로('/users/42')와 매치되면 isAccessiblePage=false로 판정.", () => {
    // GIVEN: 현재 URL을 '/users/42'로 설정
    setURL("/users/42");

    // GIVEN: path에 동적 파라미터 패턴을 포함
    const inaccessInfo = {
      1: { path: ["/users/:id"], redirectPage: "/login" },
    };

    // WHEN: level 1로 훅 렌더링
    const { result } = renderHook(() =>
      usePageAccessInfo({ level: 1, inaccessInfo }),
    );

    // THEN: 동적 경로 매칭에 성공했으므로 isAccessiblePage는 false여야 함
    expect(result.current.isAccessiblePage).toBe(false);
  });

  test("level이 문자열 키여도 동일하게 동작하여 경로가 매치되면 isAccessiblePage=false로 판정.", () => {
    // GIVEN: 현재 URL을 '/teams/abc/members/123'로 설정
    setURL("/teams/abc/members/123");

    // GIVEN: level을 문자열 키('premium')로 사용
    const inaccessInfo = {
      premium: {
        path: ["/teams/:teamId/members/:memberId"],
        redirectPage: "/login",
      },
    };

    // WHEN: level을 "premium" 문자열로 설정하여 훅 렌더링
    const { result } = renderHook(() =>
      usePageAccessInfo({ level: "premium", inaccessInfo }),
    );

    // THEN: 문자열 level 키를 통해 동적 경로 매칭에 성공했으므로 isAccessiblePage는 false여야 함
    expect(result.current.isAccessiblePage).toBe(false);
  });

  test("search 쿼리가 다르면 완전 일치가 실패하므로 isAccessiblePage=true으로 판정.", () => {
    // GIVEN: 현재 URL을 '/dashboard?foo=2'로 설정 (search: foo=2)
    setURL("/dashboard?foo=2");

    // GIVEN: path에는 다른 search 쿼리('/dashboard?foo=1')가 지정됨
    const inaccessInfo = {
      1: { path: ["/dashboard?foo=1"], redirectPage: "/login" },
    };

    // WHEN: level 1로 훅 렌더링
    const { result } = renderHook(() =>
      usePageAccessInfo({ level: 1, inaccessInfo }),
    );

    // THEN: 경로와 쿼리까지 완전 일치하지 않으므로 isAccessiblePage는 true여야 함
    expect(result.current.isAccessiblePage).toBe(true);
  });
});
