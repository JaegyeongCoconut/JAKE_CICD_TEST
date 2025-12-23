import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";

import {
  clearNavigate,
  navigateByRef,
  setNavigate,
} from "@packages/utils/navigateService";

// DESC: 전역에서 사용할 navigate 함수의 Mock 객체를 생성
const mockNavigate = vi.fn();

beforeEach(() => {
  // DESC: navigateRef를 항상 null로 초기화하여 테스트 간의 의존성 제거
  clearNavigate();
});

afterEach(() => {
  // DESC: 환경 변수 해제
  vi.unstubAllEnvs();
});

describe("Navigate Utility Functions", () => {
  test("setNavigate가 호출되면 navigateRef가 설정되어야 함.", () => {
    // GIVEN: mockNavigate를 navigateRef에 설정
    setNavigate(mockNavigate);

    // WHEN: 설정된 navigateByRef를 호출하여 Mock 함수를 실행
    navigateByRef("/test");

    // THEN: Mock 함수가 1회, 그리고 올바른 경로로 호출되었는지 확인
    expect(mockNavigate).toHaveBeenCalledOnce();
    expect(mockNavigate).toHaveBeenCalledWith("/test");
  });

  test("clearNavigate가 호출되면 navigateRef가 null로 설정되어야 함.", () => {
    // GIVEN: navigateRef를 Mock 함수로 설정한 후, clearNavigate를 호출
    setNavigate(mockNavigate);
    clearNavigate();

    // WHEN: navigateByRef를 호출
    navigateByRef("/test");

    // THEN: navigateRef가 null이므로 Mock 함수가 호출되지 않았는지 확인
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it.each([
    { path: "" },
    { path: "    " },
    { path: "dashboard" },
    { path: "/dashboard" },
  ])(
    "navigateRef가 설정되었을 때, 문자열 경로($path)로 올바르게 이동해야 함.",
    ({ path }) => {
      // GIVEN: Mock 함수 설정
      setNavigate(mockNavigate);

      // WHEN: 문자열 경로로 navigateByRef 호출
      navigateByRef(path);

      // THEN: Mock 함수가 1회, 그리고 올바른 문자열 경로로 호출되었는지 확인
      expect(mockNavigate).toHaveBeenCalledOnce();
      expect(mockNavigate).toHaveBeenCalledWith(path);
    },
  );

  test("navigateRef가 null이고 NODE_ENV가 'development'일 때, Error를 throw해야 함.", () => {
    // GIVEN: 환경 변수를 'development'로 설정 (이때 navigateRef는 beforeEach에 의해 null)
    vi.stubEnv("NODE_ENV", "development");

    // THEN: navigateByRef 호출 시 에러를 던지는지 확인
    expect(() => navigateByRef("/fail")).toThrowError();
  });

  test("navigateRef가 null이고 NODE_ENV가 'production'일 때, 아무것도 하지 않고 조용히 종료해야 함.", () => {
    // GIVEN: 환경 변수를 'production'으로 설정 (이때 navigateRef는 beforeEach에 의해 null)
    vi.stubEnv("NODE_ENV", "production");

    // WHEN: navigateByRef를 호출
    navigateByRef("/return");

    // THEN: 에러가 발생하지 않았으며, Mock 함수가 호출되지 않았는지 확인
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
