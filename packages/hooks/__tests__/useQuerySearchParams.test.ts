import { act, renderHook } from "@testing-library/react";
import * as routerDom from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import useQuerySearchParams from "@packages/hooks/useQuerySearchParams";

describe("useQuerySearchParams Test", () => {
  it("query에 파라미터를 추가함.", () => {
    // GIVEN: setSearchParams를 Mock 함수로 준비
    const setSearchParams = vi.fn();
    // GIVEN: useSearchParams hook을 Mocking하여 초기 쿼리 "?a=1"을 설정하고 setSearchParams Mock 함수를 반환
    vi.spyOn(routerDom, "useSearchParams").mockReturnValue([
      new URLSearchParams("?a=1"), // 초기 쿼리: a=1
      setSearchParams,
    ]);

    // GIVEN: hook 렌더링
    const { result } = renderHook(() => useQuerySearchParams());

    // WHEN: b=2 파라미터 추가 요청 (act로 상태 업데이트 보장)
    act(() => {
      result.current.updateQueryParam({ b: "2" });
    });

    // THEN: setSearchParams가 기존 a=1을 유지하고 b=2를 추가한 객체로 호출되었는지 확인
    expect(setSearchParams).toHaveBeenCalledWith({ a: "1", b: "2" });
  });

  it("기존 키는 덮어쓰고, 지정 키는 삭제", () => {
    // GIVEN: 초기 쿼리 "?a=1&b=2&c=3" 설정
    const setSearchParams = vi.fn();
    vi.spyOn(routerDom, "useSearchParams").mockReturnValue([
      new URLSearchParams("?a=1&b=2&c=3"),
      setSearchParams,
    ]);

    // GIVEN: hook 렌더링
    const { result } = renderHook(() => useQuerySearchParams());

    // WHEN: b는 "22"로 덮어쓰고, "a"는 삭제하도록 요청
    act(() => {
      result.current.updateQueryParam({ b: "22" }, ["a"]);
    });

    // THEN: a는 삭제되고, b는 "22"로 변경, c는 유지된 객체로 호출되었는지 확인
    expect(setSearchParams).toHaveBeenCalledWith({ b: "22", c: "3" });
  });

  it("지정 키를 삭제만 수행할 수도 있음.", () => {
    // GIVEN: 초기 쿼리 "?a=1&b=2" 설정
    const setSearchParams = vi.fn();
    vi.spyOn(routerDom, "useSearchParams").mockReturnValue([
      new URLSearchParams("?a=1&b=2"),
      setSearchParams,
    ]);

    // GIVEN: hook 렌더링
    const { result } = renderHook(() => useQuerySearchParams());

    // WHEN: 업데이트할 파라미터는 없고, "b"만 삭제하도록 요청
    act(() => {
      result.current.updateQueryParam({}, ["b"]);
    });

    // THEN: b는 삭제되고, a는 유지된 객체 { a: "1" }로 호출되었는지 확인
    expect(setSearchParams).toHaveBeenCalledWith({ a: "1" });
  });

  it("초기 쿼리가 비어있어도 정상 동작함.", () => {
    // GIVEN: 초기 쿼리가 빈 문자열인 경우 설정
    const setSearchParams = vi.fn();
    vi.spyOn(routerDom, "useSearchParams").mockReturnValue([
      new URLSearchParams(""),
      setSearchParams,
    ]);

    // GIVEN: hook 렌더링
    const { result } = renderHook(() => useQuerySearchParams());

    // WHEN: page=1 파라미터 추가 요청
    act(() => {
      result.current.updateQueryParam({ page: "1" });
    });

    // THEN: page=1이 추가된 객체로 호출되었는지 확인
    expect(setSearchParams).toHaveBeenCalledWith({ page: "1" });
  });
});
