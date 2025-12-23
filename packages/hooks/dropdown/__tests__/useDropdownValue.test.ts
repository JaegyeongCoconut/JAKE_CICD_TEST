import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";

import type { Languages } from "@repo/types";

import useDropdownValue from "@packages/hooks/dropdown/useDropdownValue";

describe("useDropdownValue Test", () => {
  // DESC: 테스트에 사용할 옵션 데이터 모킹
  const mockOption = [
    { key: "en", label: "English" as Languages },
    { key: "ko", label: "Korean" as Languages },
  ];

  it.each([{ initKey: undefined }, { initKey: "" }, { initKey: "lo" }])(
    "useDropdownValue hook 렌더링 시 initKey 값이 존재하지 않거나, initKey에 대응하는 options 값이 없다면 selectedOption 상태 { key: '', label: '' }로 초기화",
    ({ initKey }) => {
      // GIVEN: useDropdownValue hook 렌더링
      const { result } = renderHook(() =>
        useDropdownValue({ initKey: initKey, options: mockOption }),
      );

      // THEN: selectedOption 상태 확인
      expect(result.current.selectedOption).toEqual({ key: "", label: "" });
    },
  );

  test("useDropdownValue hook 렌더링 시 initKey가 존재하고 initKey에 대응하는 options 값이 있다면 해당 옵션 값으로 selectedOption 상태 초기화", () => {
    // GIVEN: useDropdownValue hook 렌더링
    const { result } = renderHook(() =>
      useDropdownValue({ initKey: "ko", options: mockOption }),
    );

    // THEN: selectedOption 상태 확인
    expect(result.current.selectedOption).toEqual({
      key: "ko",
      label: "Korean",
    });
  });

  test("useDropdownValue hook 리렌더링 시 useLayoutEffect가 재실행되지 않아 기존 상태 유지", () => {
    // GIVEN: useDropdownValue hook 렌더링
    const { rerender, result } = renderHook(() =>
      useDropdownValue({ initKey: "ko", options: mockOption }),
    );

    // THEN: selectedOption 상태 확인
    expect(result.current.selectedOption).toEqual({
      key: "ko",
      label: "Korean",
    });

    // WHEN: useDropdownValue hook 리렌더링
    rerender({ initKey: "en", options: mockOption });

    // THEN: selectedOption 상태 확인
    expect(result.current.selectedOption).toEqual({
      key: "ko",
      label: "Korean",
    });
  });

  test("handleSelect 호출 시 해당 키에 맞는 selectedOption으로 업데이트", () => {
    // GIVEN: useDropdownValue hook 렌더링
    const { result } = renderHook(() =>
      useDropdownValue({ initKey: "en", options: mockOption }),
    );

    // WHEN: handleSelect 함수 호출
    act(() => result.current.handleSelect("ko"));

    // THEN: selectedOption 상태 변경 확인
    expect(result.current.selectedOption).toEqual({
      key: "ko",
      label: "Korean",
    });
  });

  test("options가 변경되지 않으면 handleSelect 함수 참조 유지", () => {
    // GIVEN: useDropdownValue hook 렌더링
    const { rerender, result } = renderHook(() =>
      useDropdownValue({ initKey: "ko", options: mockOption }),
    );

    // DESC: 초기 렌더링 시 handleSelect 함수 참조 저장
    const initHandleSelect = result.current.handleSelect;

    // WHEN: 동일한 options으로 useDropdownValue hook 리렌더링
    rerender({ initKey: "ko", options: mockOption });

    // DESC: 리렌더링 후 handleSelect 함수 참조 저장
    const rerenderHandleSelect = result.current.handleSelect;

    // THEN: handleSelect 함수 참조 동일 여부 확인
    expect(initHandleSelect).toBe(rerenderHandleSelect);
  });
});
