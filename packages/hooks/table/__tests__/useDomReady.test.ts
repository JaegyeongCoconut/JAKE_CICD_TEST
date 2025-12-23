import type React from "react";

import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

// DESC: 각 케이스마다 모듈 그래프 초기화
// IMPORTANT: import 순서 제어 목적
const reloadUseDomReady = async (): Promise<() => { domReady: boolean }> => {
  // DESC: SUT(System Under Test)를 동적으로 import하여 Mock의 적용/해제 시점을 제어
  const mod = await import("@packages/hooks/table/useDomReady");

  return mod.default;
};

describe("useDomReady Test", () => {
  test("초기 DOM의 상태는 false  (useEffect를 일시적으로 무력화)", async () => {
    // GIVEN:
    // DESC: SUT import 이전에 'react' 모듈의 named export useEffect를 목 처리
    // DESC: vi.doMock 사용: vi.mock과 달리 호이스팅되지 않고, 이 코드 라인에서 실행됨
    // DESC:         -> 이 테스트에서만 Mock이 적용되도록 범위를 제한하는 것이 목적
    vi.doMock("react", async () => {
      const actual = await vi.importActual<typeof React>("react");

      return {
        ...actual,
        // DESC: useEffect를 빈 함수로 대체하여 마운트 직후 setDomReady(true) 실행을 방지
        useEffect: vi.fn(),
      };
    });

    // DESC: 모킹 후에 SUT를 동적 import (Mocking된 useEffect가 반영됨)
    const useDomReady = await reloadUseDomReady();

    // WHEN: hook 실행
    const { result } = renderHook(() => useDomReady());

    // THEN: useEffect가 실행되지 않았으므로, useState의 초기값(false)이 유지됨을 검증
    expect(result.current.domReady).toBe(false);

    // DESC: 다음 테스트에 Mock이 영향을 주지 않도록 Mock 해제
    vi.doUnmock("react");
  });

  test("DOM이 마운트 되면 true로 변경됨.", async () => {
    // GIVEN: 모듈 리셋, 이전 테스트의 'react' Mock 해제 및 SUT를 실제 동작으로 되돌림
    vi.resetModules();
    // DESC: SUT를 동적 import (실제 useEffect가 반영된 상태)
    const useDomReady = await reloadUseDomReady();

    // WHEN: hook 실행
    const { result } = renderHook(() => useDomReady());

    // THEN: useEffect 을 기다려 최종 상태 검증
    await waitFor(() => {
      expect(result.current.domReady).toBe(true);
    });
  });
});
