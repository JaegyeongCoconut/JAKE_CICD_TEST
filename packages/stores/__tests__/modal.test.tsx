import React, { type MouseEvent } from "react";

import type { jsx } from "@emotion/react";
import { act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { useModalStore } from "@packages/stores/modal";

const createMockModal = (input: string): jsx.JSX.Element => (
  <dialog data-testid={input} />
);

describe("useModalStore Test", () => {
  // DESC: 각 테스트 시작 전, 스토어의 modals 상태를 빈 배열로 초기화
  beforeEach(() => {
    useModalStore.setState({ modals: [] });
  });

  // DESC: 각 테스트 실행 후, DOM 상태를 초기화
  // DESC: document.body.style.overflow를 'auto'로 복원
  afterEach(() => {
    document.body.innerHTML = "";
    document.body.style.overflow = "auto";
  });

  const mockModal1 = createMockModal("mockModal1");
  const mockModal2 = createMockModal("mockModal2");

  test("handleModalAdd를 호출하면 modals 배열에 추가되며 body의 style은 overflow:hidden이 됨.", () => {
    // GIVEN: 스토어 함수 추출
    const { handleModalAdd } = useModalStore.getState();

    // WHEN: 첫 번째 모달 추가
    act(() => {
      handleModalAdd(mockModal1);
    });

    // DESC: Then (검증-1): 상태 및 Side Effect 검증 (첫 번째 모달)
    // DESC: document.body의 overflow 스타일이 'hidden'으로 변경되었는지 확인
    expect(document.body.style.overflow).toBe("hidden");
    // DESC: modals 배열에 mockModal1이 추가되었는지 확인
    expect(useModalStore.getState().modals).toEqual([mockModal1]);

    // WHEN: 두 번째 모달 추가
    act(() => {
      handleModalAdd(mockModal2);
    });

    // DESC: Then (검증-2): 상태 및 Side Effect 검증 (두 번째 모달)
    // DESC: modals 배열에 mockModal2가 추가되었는지 확인
    expect(useModalStore.getState().modals).toEqual([mockModal1, mockModal2]);
    // DESC: 모달이 추가되어도 overflow 스타일이 'hidden'으로 유지되는지 확인
    expect(document.body.style.overflow).toBe("hidden");
  });

  test("handleModalClose는 pop 동작을 수행하고, 남은 모달이 0개면 body overflow를 auto로 복원", () => {
    // GIVEN: 초기 상태에 모달 두 개를 추가하여 시작
    const { handleModalAdd, handleModalClose } = useModalStore.getState();

    act(() => {
      handleModalAdd(mockModal1);
      handleModalAdd(mockModal2);
    });

    expect(useModalStore.getState().modals).toEqual([mockModal1, mockModal2]);
    expect(document.body.style.overflow).toBe("hidden");

    // WHEN: 모달 하나 제거 (아직 1개 남아있음)
    act(() => {
      handleModalClose();
    });

    // DESC: Then (검증-1): 모달이 남아있을 때 검증
    // DESC: 모달2가 제거되고 모달1이 남아있는지 확인
    expect(useModalStore.getState().modals).toEqual([mockModal1]);
    // DESC: 모달이 남아있으므로 overflow 스타일은 'hidden'을 유지
    expect(document.body.style.overflow).toBe("hidden");

    // WHEN: 마지막 모달 제거 (0개 됨)
    act(() => {
      handleModalClose();
    });

    // DESC: Then (검증-2): 모달이 모두 제거되었을 때 검증
    // DESC: modals 배열이 비었는지 확인
    expect(useModalStore.getState().modals).toEqual([]);
    // DESC: 모달이 0개가 되었으므로 overflow 스타일은 'auto'로 복원
    expect(document.body.style.overflow).toBe("auto");
  });

  test("handleModalAllClose는 modals를 빈 배열로 만들고 body의 overflow를 auto로 복원함.", () => {
    // GIVEN: 초기 상태에 모달 두 개를 추가
    const { handleModalAdd, handleModalAllClose } = useModalStore.getState();

    act(() => {
      handleModalAdd(mockModal1);
      handleModalAdd(mockModal2);
    });
    expect(useModalStore.getState().modals).toEqual([mockModal1, mockModal2]);
    expect(document.body.style.overflow).toBe("hidden");

    // WHEN: 모달 전체 제거 함수 호출
    act(() => {
      handleModalAllClose();
    });

    // THEN: 상태 및 Side Effect 검증
    // DESC: modals 배열이 빈 배열이 되었는지 확인
    expect(useModalStore.getState().modals).toEqual([]);
    // DESC: overflow 스타일이 'auto'로 복원되었는지 확인
    expect(document.body.style.overflow).toBe("auto");
  });

  test("handleModalOpen은 이벤트가 전달되면 stopPropagation을 호출하고 모달을 추가함.", () => {
    // GIVEN: 스토어 함수 추출, Mock Event 준비
    const { handleModalOpen } = useModalStore.getState();
    const mockEvent = {
      stopPropagation: vi.fn(),
    } as unknown as MouseEvent<Element>;

    // WHEN: 모달 오픈 핸들러 호출
    act(() => {
      handleModalOpen(mockModal1)(mockEvent);
    });

    // THEN: 이벤트 전파 방지 및 모달 추가 검증
    expect(mockEvent.stopPropagation).toHaveBeenCalledOnce();
    expect(useModalStore.getState().modals).toEqual([mockModal1]);
    expect(document.body.style.overflow).toBe("hidden");
  });
});
