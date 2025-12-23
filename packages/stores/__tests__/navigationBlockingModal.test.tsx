import React from "react";

import { afterEach, describe, expect, test } from "vitest";

import { useNavigationBlockingModalStore } from "@packages/stores/navigationBlockingModal";

// GIVEN: 테스트에 사용할 ReactNode 모달 컴포넌트 목킹
const MockModal = <div data-testid="test-modal">Blocking Modal</div>;

afterEach(() => {
  // DESC: body의 overflow 스타일을 초기 상태로 복원
  document.body.style.overflow = "";
  // DESC: 스토어 상태(모달)를 null로 초기화
  useNavigationBlockingModalStore.setState({ navigationBlockingModal: null });
});

describe("useNavigationBlockingModalStore Test", () => {
  test("handleNavigationBlockingModalAdd는 상태와 body overflow를 설정함.", () => {
    // WHEN: 모달 추가 액션을 호출
    useNavigationBlockingModalStore
      .getState()
      .handleNavigationBlockingModalAdd(MockModal);

    // WHEN: 최신 상태를 조회
    const latestState = useNavigationBlockingModalStore.getState();

    // THEN: navigationBlockingModal 상태가 MockModal로 설정되었는지 확인
    expect(latestState.navigationBlockingModal).toBe(MockModal);
    // THEN: 모달 표시와 함께 body 스크롤이 'hidden'으로 설정되었는지 확인
    expect(document.body.style.overflow).toBe("hidden");
  });

  test("handleNavigationBlockingModalRemove는 상태를 초기화하고 body overflow를 복원함.", () => {
    // GIVEN: Remove 테스트를 위해 먼저 Add를 호출하여 상태를 설정
    useNavigationBlockingModalStore
      .getState()
      .handleNavigationBlockingModalAdd(MockModal);

    // WHEN: 모달 제거 액션을 호출
    useNavigationBlockingModalStore
      .getState()
      .handleNavigationBlockingModalRemove();

    // WHEN: 최신 상태를 조회
    const latestState = useNavigationBlockingModalStore.getState();

    // THEN: navigationBlockingModal 상태가 null로 초기화되었는지 확인
    expect(latestState.navigationBlockingModal).toBeNull();
    // THEN: body overflow가 'auto'로 복원되었는지 확인 (스크롤 허용)
    expect(document.body.style.overflow).toBe("auto");
  });
});
