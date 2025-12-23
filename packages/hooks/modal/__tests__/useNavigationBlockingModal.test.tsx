import React from "react";

import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import useKeyTrap from "@packages/hooks/modal/useKeyTrap";
import useNavigationBlockingModal from "@packages/hooks/modal/useNavigationBlockingModal";

// DESC: 실제 모달 컴포넌트 대신 Mock 컴포넌트로 대체
vi.mock(
  "../../../components/modal/navigationBlocking/NavigationBlockingModal",
  () => {
    const MockModal = (props: { callbackFn: () => void }) => (
      <dialog onClick={props.callbackFn} />
    );

    // DESC: 컴포넌트 이름을 명시해 테스트 시 식별이 쉽도록 설정
    MockModal.displayName = "MockModal";
    return { default: MockModal };
  },
);

const mockNavigtionBlockModalStore = {
  navigationBlockingModal: null,
  handleNavigationBlockingModalAdd: vi.fn(),
  handleNavigationBlockingModalRemove: vi.fn(),
};
vi.mock("@repo/stores/navigationBlockingModal", () => ({
  useNavigationBlockingModalStore: (
    selector: (store: typeof mockNavigtionBlockModalStore) => unknown,
  ) => selector(mockNavigtionBlockModalStore),
}));

const mockCheckIsDirtyStore = {
  isDirty: false,
  setIsDirty: vi.fn(),
};
vi.mock("@repo/stores/checkIsDirty", () => ({
  useCheckIsDirtyStore: (
    selector: (store: typeof mockCheckIsDirtyStore) => unknown,
  ) => selector(mockCheckIsDirtyStore),
}));

vi.mock("@packages/hooks/modal/useKeyTrap", () => ({ default: vi.fn() }));

describe("useNavigationBlockingModal Test", () => {
  test("isDirty=false일 때, 모달을 add하지 않고 callback 함수만 실행해야 함.", () => {
    const mockCallback = vi.fn();

    const { result } = renderHook(() => useNavigationBlockingModal());

    // DESC: open 핸들러 실행
    act(() => {
      result.current.handleNavigationBlockingModalOpen(mockCallback)();
    });

    // DESC: 초기 isDirty=false이기 때문에 즉시 콜백 실행
    expect(mockCallback).toHaveBeenCalledTimes(1);
    // DESC: 모달 add 액션은 호출되지 않아야 함
    expect(
      mockNavigtionBlockModalStore.handleNavigationBlockingModalAdd,
    ).not.toHaveBeenCalled();
  });

  test("isDirty=true일 때, 모달을 add하고 callback은 실행되지 않고 모달 내부로 전달되어야 함.", () => {
    const mockCallback = vi.fn();

    // DESC: 훅 렌더링 및 인스턴스 유지 (rerender로 스토어 변화 반영)
    const { result, rerender } = renderHook(() => useNavigationBlockingModal());

    // DESC: isDirty를 true로 토글
    mockCheckIsDirtyStore.isDirty = true;

    // DESC: 외부 스토어 값 변경을 hook에 반영하기 위해 rerender
    rerender();

    // DESC: open 핸들러 실행
    act(() => {
      result.current.handleNavigationBlockingModalOpen(mockCallback)();
    });

    // DESC: isDirty=true이기 때문에 콜백 실행 금지
    expect(mockCallback).not.toHaveBeenCalled();

    // DESC: 모달 add 스파이의 첫 번째 호출의 첫 번째 인자 = ReactElement(MockModal)
    const modalElement =
      mockNavigtionBlockModalStore.handleNavigationBlockingModalAdd.mock
        .calls[0][0];

    // DESC: 모달 타입이 위에서 모킹한 MockModal인지 확인
    expect(modalElement.type.displayName).toBe("MockModal");
    // DESC: 모달로 전달된 callbackFn이 원래 콜백과 동일한지 검증
    expect(modalElement.props.callbackFn).toBe(mockCallback);
  });

  test(" handleNavigationBlockingModalClose를 호출하면 모달 remove 함수가 실행되어야 함.", () => {
    const { result } = renderHook(() => useNavigationBlockingModal());

    // DESC: 닫기 액션 호출
    act(() => {
      // DESC: handleNavigationBlockingModalClose 함수를 실행합
      result.current.handleNavigationBlockingModalClose();
    });

    // DESC: 모달 remove 스파이가 정확히 1회 호출되었는지 검증
    expect(
      mockNavigtionBlockModalStore.handleNavigationBlockingModalRemove,
    ).toHaveBeenCalledTimes(1);
  });

  test("useKeyTrap는 초기에는 null과 close 핸들러로 호출되어야 함.", () => {
    const { result } = renderHook(() => useNavigationBlockingModal());

    // DESC: 모킹된 useKeyTrap에 타입 안전한 핸들을 획득
    const mockUseKeyTrap = vi.mocked(useKeyTrap);

    // DESC: 초기 마운트 시 useKeyTrap가 1회 호출되어야 함
    expect(mockUseKeyTrap).toHaveBeenCalledTimes(1);

    // DESC: 초기 호출 인수 = [null, handleNavigationBlockingModalClose]
    const [element, closeHandler] = mockUseKeyTrap.mock.calls[0];
    // DESC: 첫 번째 인수는 초기 상태인 null
    expect(element).toBe(null);
    // DESC: 두 번째 인수는 훅이 반환한 close 핸들러와 동일
    expect(closeHandler).toBe(
      result.current.handleNavigationBlockingModalClose,
    );
  });

  test("navigationBlockingModalRef 호출 시, useKeyTrap가 새 DOM 요소로 재호출되어야 함.", () => {
    // DESC: useKeyTrap을 연결할 대상 DOM 요소를 준비
    const mockElement = document.createElement("dialog");

    const { result } = renderHook(() => useNavigationBlockingModal());

    // DESC: 모킹된 useKeyTrap 핸들 확보 후 호출 내역 초기화
    // DESC: useNavigationBlockingModal이 마운트될 때 useKeyTrap이 이미 1번 호출
    // DESC: "ref가 세팅된 후에 useKeyTrap이 어떻게 호출되는가"가 주된 초점이기 때문에 초기화
    const mockUseKeyTrap = vi.mocked(useKeyTrap);
    mockUseKeyTrap.mockClear();

    // DESC: Ref 콜백에 실제 DOM 요소를 전달하여 내부 state/효과를 갱신
    act(() => {
      result.current.navigationBlockingModalRef(mockElement);
    });

    // DESC: Ref 변화에 따라 useKeyTrap가 다시 호출되어야 함
    expect(mockUseKeyTrap).toHaveBeenCalledTimes(1);

    // DESC: 주의: 위에서 mockClear()로 호출 내역을 비웠으므로 "재호출"은 calls[0]이 됨
    const element = mockUseKeyTrap.mock.calls[0][0];

    // DESC: 첫 번째 인수로 mockElement가 전달되었는지 확인 (null이 아니어야 함)
    expect(element).toEqual(mockElement);
  });
});
