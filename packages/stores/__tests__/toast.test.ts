import { beforeEach, describe, expect, it, test } from "vitest";

import type { Languages } from "@repo/types";

import { useToastStore } from "@packages/stores/toast";

// DESC: 테스트 시작 전 useToastStore 스토어 상태 초기화
beforeEach(() => {
  useToastStore.setState({ toasts: [] });
});

describe("useToastStore Test", () => {
  // DESC: 테스트에 사용할 토스트 데이터 모킹
  const mockSuccessToast = {
    id: "1",
    content: "Succeeded" as Languages,
    type: "success" as const,
  };
  const mockWarningToast = {
    id: "2",
    content: "Failed" as Languages,
    type: "warning" as const,
  };

  it.each([
    { toasts: [] },
    { toasts: [mockSuccessToast] },
    { toasts: [mockWarningToast] },
    { toasts: [mockSuccessToast, mockWarningToast] },
  ])("초기 toasts 상태 확인", ({ toasts }) => {
    // GIVEN: 초기 toasts 상태 설정
    useToastStore.setState({ toasts });

    // THEN: 초기 toasts 상태 확인
    expect(useToastStore.getState().toasts).toEqual(toasts);
  });

  test("addToast를 호출하여 toast 추가", () => {
    // GIVEN: 초기 toasts 상태 설정
    useToastStore.setState({ toasts: [mockSuccessToast] });

    // THEN: 초기 toasts 상태 확인
    expect(useToastStore.getState().toasts).toEqual([mockSuccessToast]);

    // WHEN: addToast 호출하여 새로운 Toast 데이터 추가
    useToastStore.getState().addToast(mockWarningToast);

    // THEN: 새로운 토스트 데이터 추가 확인
    expect(useToastStore.getState().toasts).toEqual([
      mockSuccessToast,
      { ...mockWarningToast, id: expect.any(String) },
    ]);
  });

  test("deleteToast를 호출하여 특정 ID를 가진 toast 삭제", () => {
    // GIVEN: 초기 toasts 상태 설정
    useToastStore.setState({ toasts: [mockSuccessToast, mockWarningToast] });

    // THEN: 초기 toasts 상태 확인
    expect(useToastStore.getState().toasts).toEqual([
      mockSuccessToast,
      mockWarningToast,
    ]);

    // WHEN: deleteToast 호출하여 특정 Toast 데이터 삭제
    useToastStore.getState().deleteToast(mockSuccessToast.id);

    // THEN: 해당 ID의 Toast 데이터 삭제 확인
    expect(useToastStore.getState().toasts).toEqual([mockWarningToast]);
  });
});
