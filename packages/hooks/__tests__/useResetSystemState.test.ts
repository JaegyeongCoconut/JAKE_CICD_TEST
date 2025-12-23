import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import useResetSystemState from "@packages/hooks/useResetSystemState";

const {
  mockQueryClientClear,
  mockChangeLanguage,
  mockClearCountryCodes,
  mockHandleNavigationBlockingModalClose,
  mockHandleModalAllClose,
} = vi.hoisted(() => ({
  mockQueryClientClear: vi.fn(),
  mockChangeLanguage: vi.fn(),
  mockClearCountryCodes: vi.fn(),
  mockHandleNavigationBlockingModalClose: vi.fn(),
  mockHandleModalAllClose: vi.fn(),
}));
vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({ clear: mockQueryClientClear }),
}));
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ i18n: { changeLanguage: mockChangeLanguage } }),
}));
vi.mock("@repo/stores/persist", () => ({
  useRecentSearchStore: (selector: (state: unknown) => unknown) =>
    selector({ onClearCountryCodes: mockClearCountryCodes }),
}));
vi.mock("@repo/hooks/modal/useNavigationBlockingModal", () => ({
  default: () => ({
    handleNavigationBlockingModalClose: mockHandleNavigationBlockingModalClose,
  }),
}));
vi.mock("@repo/hooks/modal/useModal", () => ({
  default: () => ({ handleModalAllClose: mockHandleModalAllClose }),
}));
vi.mock("@repo/stores/modal", () => ({
  useModalStore: (selector: (store: unknown) => unknown) =>
    selector({ handleModalAllClose: mockHandleModalAllClose }),
}));

describe("useResetSystemState Test", () => {
  test("(hasClearCountryCode=false, hasTranslation=false) resetSystemState 호출 시, queryClient.clear, handleModalAllClose, handleNavigationBlockingModalClose가 호출됨.", () => {
    // GIVEN: hook 렌더링
    const { result } = renderHook(() =>
      useResetSystemState({
        hasClearCountryCode: false,
        hasTranslation: false,
      }),
    );

    // WHEN: resetSystemState 함수 호출
    act(() => {
      result.current.resetSystemState();
    });

    // THEN: queryClient.clear가 호출되었는지 확인
    expect(mockQueryClientClear).toHaveBeenCalledOnce();
    // THEN: handleModalAllClose가 호출되었는지 확인
    expect(mockHandleModalAllClose).toHaveBeenCalledOnce();
    // THEN: handleNavigationBlockingModalClose가 호출되었는지 확인
    expect(mockHandleNavigationBlockingModalClose).toHaveBeenCalledOnce();
  });

  test("hasClearCountryCode가 true일 때 resetSystemState 호출 시 clearCountryCodes가 호출됨.", () => {
    // GIVEN: hook 렌더링
    const { result } = renderHook(() =>
      useResetSystemState({
        hasClearCountryCode: true,
        hasTranslation: false,
      }),
    );

    // WHEN: resetSystemState 함수 호출
    act(() => {
      result.current.resetSystemState();
    });

    // THEN: clearCountryCodes가 호출되었는지 확인
    expect(mockClearCountryCodes).toHaveBeenCalledOnce();
    // THEN: queryClient.clear가 호출되었는지 확인
    expect(mockQueryClientClear).toHaveBeenCalledOnce();
    // THEN: handleModalAllClose가 호출되었는지 확인
    expect(mockHandleModalAllClose).toHaveBeenCalledOnce();
    // THEN: handleNavigationBlockingModalClose가 호출되었는지 확인
    expect(mockHandleNavigationBlockingModalClose).toHaveBeenCalledOnce();
  });

  test("hasTranslation이 true일 때 resetSystemState 호출 시 i18n.changeLanguage가 'lo'로 호출됨.", () => {
    // GIVEN: hook 렌더링
    const { result } = renderHook(() =>
      useResetSystemState({
        hasClearCountryCode: false,
        hasTranslation: true,
      }),
    );

    // WHEN: resetSystemState 함수 호출
    act(() => {
      result.current.resetSystemState();
    });

    // THEN: i18n.changeLanguage가 'lo'로 호출되었는지 확인
    expect(mockChangeLanguage).toHaveBeenCalledWith("lo");
    // THEN: queryClient.clear가 호출되었는지 확인
    expect(mockQueryClientClear).toHaveBeenCalledOnce();
    // THEN: handleModalAllClose가 호출되었는지 확인
    expect(mockHandleModalAllClose).toHaveBeenCalledOnce();
    // THEN: handleNavigationBlockingModalClose가 호출되었는지 확인
    expect(mockHandleNavigationBlockingModalClose).toHaveBeenCalledOnce();
  });

  test("(hasClearCountryCode=true, hasTranslation=true) resetSystemState 호출 시, queryClient.clear, handleModalAllClose, handleNavigationBlockingModalClose가 호출됨.", () => {
    // GIVEN: hook 렌더링
    const { result } = renderHook(() =>
      useResetSystemState({
        hasClearCountryCode: true,
        hasTranslation: true,
      }),
    );

    // WHEN: resetSystemState 함수 호출
    act(() => {
      result.current.resetSystemState();
    });

    // THEN: queryClient.clear가 호출되었는지 확인
    expect(mockQueryClientClear).toHaveBeenCalledOnce();
    // THEN: handleModalAllClose가 호출되었는지 확인
    expect(mockHandleModalAllClose).toHaveBeenCalledOnce();
    // THEN: handleNavigationBlockingModalClose가 호출되었는지 확인
    expect(mockHandleNavigationBlockingModalClose).toHaveBeenCalledOnce();
    // THEN: i18n.changeLanguage가 'lo'로 호출되었는지 확인
    expect(mockChangeLanguage).toHaveBeenCalledWith("lo");
    // THEN: clearCountryCodes가 호출되었는지 확인
    expect(mockClearCountryCodes).toHaveBeenCalledOnce();
  });
});
