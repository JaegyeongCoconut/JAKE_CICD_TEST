import { act, renderHook } from "@testing-library/react";
import useKeyTrap from "modal/useKeyTrap";
import useOnClickOutside from "useOnClickOutside";
import { describe, expect, test, vi } from "vitest";

import useDropdown from "@packages/hooks/dropdown/useDropdown";

const mockHandleSelect = vi.fn();
vi.mock("@packages/hooks/useOnClickOutside", () => ({ default: vi.fn() }));
vi.mock("@packages/hooks/modal/useKeyTrap", () => ({ default: vi.fn() }));

describe("useDropdown Test", () => {
  // DESC: 테스트에 사용할 tagValue 데이터 모킹
  const mockInitTagValue = "A";
  const mockNewTagValue = "B";

  test("useDropdown hook 초기 마운트 시 모든 상태 초기화", () => {
    // GIVEN: useDropdown hook 렌더링
    const { result } = renderHook(() =>
      useDropdown({
        tagValue: mockInitTagValue,
        handleSelect: mockHandleSelect,
      }),
    );

    // THEN: isOpen 상태 false 확인
    expect(result.current.isOpen).toBe(false);
    // THEN: dropdownRef Ref 객체가 null이 아닌것 확인
    expect(result.current.dropdownRef).not.toBeNull();
    // THEN: dropdownRef Ref 객체의 current가 null 확인
    expect(result.current.dropdownRef.current).toBeNull();
  });

  test("useDropdown hook 초기 마운트 시 useOnClickOutside 훅과 useKeyTrap 훅 호출", () => {
    // GIVEN: useOnClickOutside 훅 모킹
    const mockedUseOnClickOutside = vi.mocked(useOnClickOutside);
    // GIVEN: useKeyTrap 훅 모킹
    const mockUseKeyTrap = vi.mocked(useKeyTrap);

    // GIVEN: useDropdown hook 렌더링
    const { result } = renderHook(() =>
      useDropdown({
        tagValue: mockInitTagValue,
        handleSelect: mockHandleSelect,
      }),
    );

    // THEN: useKeyTrap hook 호출 확인
    expect(mockUseKeyTrap).toHaveBeenCalledOnce();
    // THEN: useKeyTrap hook 호출 인자 확인
    // DESC: expect.any(Function)가 handleClose를 대체
    expect(mockUseKeyTrap).toHaveBeenCalledWith(null, expect.any(Function));
    // THEN: useOnClickOutside hook 호출 확인
    expect(mockedUseOnClickOutside).toHaveBeenCalledOnce();
    // THEN: useOnClickOutside hook 인자 확인
    // DESC: expect.any(Function)가 handleClose를 대체
    expect(mockedUseOnClickOutside).toHaveBeenCalledWith(
      expect.objectContaining({
        ref: result.current.dropdownRef,
        handler: expect.any(Function),
        exceptEl: undefined,
      }),
    );
  });

  describe("handleOpener Test", () => {
    test("handleOpener 호출 시 isOpen 상태에 따라 handleOpen 또는 handleClose가 호출되어 isOpen 상태 반전", () => {
      // GIVEN: useDropdown hook 렌더링
      const { result } = renderHook(() =>
        useDropdown({
          tagValue: mockInitTagValue,
          handleSelect: mockHandleSelect,
        }),
      );

      // THEN: 초기 isOpen 상태 false 확인
      expect(result.current.isOpen).toBe(false);

      // WHEN: handleOpener 호출하여 isOpen 상태 변경
      act(() => result.current.handleOpener());

      // THEN: isOpen 상태 true 확인
      expect(result.current.isOpen).toBe(true);

      // WHEN: handleOpener 재호출하여 isOpen 상태 변경
      act(() => result.current.handleOpener());

      // THEN: isOpen 상태 false 확인
      expect(result.current.isOpen).toBe(false);
    });
  });

  describe("handleOptionClick Test", () => {
    test("handleOptionClick 호출 시 현재 선택된 옵션과 다른 옵션을 선택하면 handleSelect를 호출", () => {
      // GIVEN: useDropdown hook 렌더링, 기존 선택값 'A' 설정
      const { result } = renderHook(() =>
        useDropdown({
          tagValue: mockInitTagValue,
          handleSelect: mockHandleSelect,
        }),
      );

      // WHEN: handleOpener 호출
      act(() => result.current.handleOpener());

      // THEN: isOpen 상태 true 확인
      expect(result.current.isOpen).toBe(true);

      // WHEN: handleOptionClick 호출하여 다른 옵션 'B' 선택
      act(() => result.current.handleOptionClick(mockNewTagValue)());

      // THEN: handleSelect 호출 확인
      expect(mockHandleSelect).toHaveBeenCalledOnce();
      // THEN: handleSelect 호출 인자 확인
      expect(mockHandleSelect).toHaveBeenCalledWith(mockNewTagValue);
      // THEN: isOpen 상태 false 변경 확인
      expect(result.current.isOpen).toBe(false);
    });

    test("handleOptionClick 호출 시 현재 선택된 옵션과 동일 옵션을 선택하면 handleSelect 미호출", () => {
      // GIVEN: useDropdown hook 렌더링, 기존 선택값 'A' 설정
      const { result } = renderHook(() =>
        useDropdown({
          tagValue: mockInitTagValue,
          handleSelect: mockHandleSelect,
        }),
      );

      // WHEN: handleOpener 호출
      act(() => result.current.handleOpener());

      // THEN: isOpen 상태 true 확인
      expect(result.current.isOpen).toBe(true);

      // WHEN: handleOptionClick 호출하여 기존 옵션과 동일한 'A' 선택
      act(() => result.current.handleOptionClick(mockInitTagValue)());

      // THEN: handleSelect 호출 여부 확인
      expect(mockHandleSelect).not.toBeCalled();
      // THEN: isOpen 상태 false 변경 확인
      expect(result.current.isOpen).toBe(false);
    });
  });
});
