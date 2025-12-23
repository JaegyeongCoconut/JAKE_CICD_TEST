import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import useKeyTrap from "@packages/hooks/modal/useKeyTrap";
import useModal from "@packages/hooks/modal/useModal";

const mockModalStore = {
  handleModalClose: vi.fn(),
};
vi.mock("@repo/stores/modal", () => ({
  useModalStore: (selector: (store: typeof mockModalStore) => unknown) =>
    selector(mockModalStore),
}));
vi.mock("@packages/hooks/modal/useKeyTrap", () => ({ default: vi.fn() }));

describe("useModal Test", () => {
  test("modalRef는 modalElement를 업데이트하고, useKeyTrap을 업데이트된 element와 함께 재호출해야 함.", () => {
    // GIVEN: useModal hook 렌더링
    const { result } = renderHook(() => useModal());

    const mockUseKeyTrap = vi.mocked(useKeyTrap);

    // DESC: useKeyTrap이 초기 렌더링 시 (null, handleModalClose)로 호출되었는지 검증
    expect(mockUseKeyTrap).toHaveBeenCalledOnce();
    expect(mockUseKeyTrap).toHaveBeenCalledWith(
      null,
      mockModalStore.handleModalClose,
    );

    // WHEN: modalRef에 Mock DOM Element를 전달하여 호출
    const mockElement = document.createElement("dialog") as HTMLDialogElement;

    act(() => {
      result.current.modalRef(mockElement);
    });

    // THEN: 상태 변화 및 useKeyTrap 재호출 검증
    // DESC: useKeyTrap이 총 두 번 호출되었는지 검증 (초기 1회 + ref 설정 1회)
    expect(mockUseKeyTrap).toHaveBeenCalledTimes(2);
    // DESC: 두 번째 호출 시 인수가 (mockElement, handleModalClose)였는지 검증
    expect(mockUseKeyTrap).toHaveBeenCalledWith(
      mockElement,
      mockModalStore.handleModalClose,
    );
  });
});
