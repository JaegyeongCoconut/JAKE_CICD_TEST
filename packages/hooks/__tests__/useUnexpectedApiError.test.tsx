import type { ReactNode } from "react";
import React, { useEffect } from "react";

import { act, renderHook } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";

import { COMMON_ERROR_CODE } from "@repo/constants/error/code";

import useUnexpectedApiError from "@packages/hooks/useUnexpectedApiError";

// GIVEN: MemoryRouter의 경로를 JSDOM의 window.location과 동기화하는 래퍼 컴포넌트
const SyncWindowLocation = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    // DESC: MemoryRouter 상태가 변경될 때마다 window.history.pushState를 사용하여 window.location을 업데이트
    if (window.location.pathname !== location.pathname) {
      window.history.pushState({}, "", location.pathname);
    }
  }, [location.pathname]);

  return <>{children}</>;
};

beforeEach(() => {
  // DESC: 전역 alert 함수를 Mocking
  vi.stubGlobal("alert", vi.fn());
});

afterEach(() => {
  // DESC: Mocking했던 전역 alert 함수 복구
  vi.unstubAllGlobals();
});

describe("useUnexpectedApiError Test", () => {
  // GIVEN: 테스트 전용 래퍼 컴포넌트 정의
  const TestComponent = ({ children }: { children: ReactNode }) => {
    return (
      // DESC: 초기 경로를 설정하여 Current Page 값 Mocking ("/orders/123")
      <MemoryRouter initialEntries={["/orders/123"]}>
        <SyncWindowLocation>{children}</SyncWindowLocation>
      </MemoryRouter>
    );
  };

  describe("alert이 동작하지 않는 케이스", () => {
    it.each([
      COMMON_ERROR_CODE.INVALID_ACCESS_TOKEN,
      COMMON_ERROR_CODE.INVALID_TOKEN,
      COMMON_ERROR_CODE.DUPLICATED_SIGNIN_DETECTED,
      COMMON_ERROR_CODE.DUPLICATE_SIGNIN_DETECTED,
    ])("message=%s이면 alert를 호출 안 함.", (message) => {
      // GIVEN: 훅 렌더링
      const { result } = renderHook(() => useUnexpectedApiError(), {
        wrapper: TestComponent,
      });

      // WHEN: 무시해야 할 오류 코드로 showAlert 호출
      act(() => {
        result.current.showAlert({
          message, // DESC: 인증 관련 에러 코드
          method: "get",
          statusCode: 401,
          url: "/api/me",
        });
      });

      // GIVEN: Mock된 alert 함수 참조
      const mockedAlert = vi.mocked(alert);

      // THEN: alert이 호출되지 않았는지 확인
      expect(mockedAlert).not.toHaveBeenCalled();
    });
  });

  describe("alert이 동작하는 케이스", () => {
    test("현재 경로를 포함해 alert를 호출함.", () => {
      // GIVEN: 훅 렌더링
      const { result } = renderHook(() => useUnexpectedApiError(), {
        wrapper: TestComponent,
      });

      // WHEN: 일반적인 예상치 못한 오류(500)로 showAlert 호출
      act(() => {
        result.current.showAlert({
          message: "SomeError",
          method: "get",
          statusCode: 500,
          url: "/api/orders",
        });
      });

      // GIVEN: Mock된 alert 함수 참조
      const mockedAlert = vi.mocked(alert);

      // THEN: alert이 정확히 한 번 호출되었는지 확인
      expect(mockedAlert).toHaveBeenCalledOnce();

      // WHEN: alert에 전달된 메시지 내용 확인
      const alertMessage = mockedAlert.mock.calls[0][0];

      // THEN: alert 메시지에 API 정보(경로, 메서드) 포함 확인
      expect(alertMessage).toContain("API Path: GET /api/orders");
      // THEN: alert 메시지에 오류 코드 포함 확인
      expect(alertMessage).toContain("Error Code: 500");
      // THEN: alert 메시지에 오류 메시지 포함 확인
      expect(alertMessage).toContain("Error Message: SomeError");
      // THEN: alert 메시지에 현재 페이지 경로('/orders/123') 포함 확인
      expect(alertMessage).toContain("Current Page: /orders/123");
    });
  });
});
