import React from "react";

import { render, waitFor } from "@testing-library/react";
import {
  MemoryRouter,
  useNavigationType,
  useSearchParams,
} from "react-router-dom";
import { describe, expect, test } from "vitest";

import type { Languages } from "@repo/types";

import useTab from "@packages/hooks/useTab";

// GIVEN: 탭 목록 데이터
const TABS = [
  { key: "all", label: "전체" as Languages },
  { key: "docs", label: "문서" as Languages },
  { key: "images", label: "이미지" as Languages },
] satisfies ReadonlyArray<{ key: string; label: Languages }>;

// GIVEN: 훅의 상태와 라우터 정보를 노출하는 테스트용 컴포넌트
const TestComponent = () => {
  // DESC: useTab 훅 호출
  const { selectedTab } = useTab(TABS);
  // DESC: 쿼리 파라미터 접근
  const [searchParams] = useSearchParams();
  const queryTab = searchParams.get("tab") ?? "";
  // DESC: 내비게이션 타입 접근 (라우터 대체(replace) 동작 검증용)
  const navigateType = useNavigationType();

  return (
    <div>
      {/* DESC: 훅이 반환하는 선택된 탭 key */}
      <div data-testid="selected-tab">{selectedTab}</div>
      {/* DESC: URL에 실제로 존재하는 쿼리 파라미터 값 */}
      <div data-testid="query-tab">{queryTab}</div>
      {/* DESC: 내비게이션 타입 (REPLACE/PUSH/POP) */}
      <div data-testid="navigate-type">{navigateType}</div>
    </div>
  );
};

// GIVEN: React Router 환경 Mocking 및 렌더링 헬퍼 함수
const renderWithRouter = (initialEntry: string) =>
  render(
    // DESC: MemoryRouter로 컴포넌트를 감싸서 URL 및 히스토리 Mocking
    <MemoryRouter initialEntries={[initialEntry]}>
      <TestComponent />
    </MemoryRouter>,
  );

describe("useTab 훅 Test", () => {
  test("쿼리 파라미터가 없으면 첫 번째 탭을 선택함.", () => {
    // WHEN: '?tab' 파라미터 없이 렌더링
    const screen = renderWithRouter("/settings");

    // THEN: selectedTab은 기본값(TABS의 첫 번째 요소, 'all')이어야 함
    expect(screen.getByTestId("selected-tab").textContent).toBe("all");

    // THEN: 초기 쿼리가 없었으므로 query-tab은 빈 문자열이어야 함
    expect(screen.getByTestId("query-tab").textContent).toBe("");
  });

  test("유효한 tab 쿼리가 있으면 해당 탭을 선택함.", () => {
    // WHEN: tab=docs 쿼리로 렌더링
    const screen = renderWithRouter("/settings?tab=docs");

    // THEN: selectedTab은 쿼리 값인 'docs'이어야 함
    expect(screen.getByTestId("selected-tab").textContent).toBe("docs");
    // THEN: URL 쿼리 값도 'docs'로 유지되어야 함
    expect(screen.getByTestId("query-tab").textContent).toBe("docs");
  });

  test("유효하지 않은 tab 쿼리면 기본 탭으로 교체함.", () => {
    // WHEN: TABS 목록에 존재하지 않는 'template' 쿼리로 렌더링
    const screen = renderWithRouter("/settings?tab=template");

    // WHEN: useTab 훅 내부의 useEffect에서 쿼리를 교체(replace)하기까지 기다림
    waitFor(() => {
      // THEN: 선택된 탭은 유효한 기본값인 'all'로 초기화되어야 함
      expect(screen.getByTestId("selected-tab").textContent).toBe("all");
      // THEN: 실제 URL 쿼리도 'tab=all'로 교체(replace)되어야 함
      expect(screen.getByTestId("query-tab").textContent).toBe("all");
      // THEN: useTab 훅이 replace 옵션을 사용하여 내비게이션했음을 'REPLACE' 타입으로 확인
      expect(screen.getByTestId("navigate-type").textContent).toBe("REPLACE");
    });
  });
});
