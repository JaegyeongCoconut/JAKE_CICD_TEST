import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";

import useDispatchSelect from "@packages/hooks/useDispatchSelect";

describe("useDispatchSelect Test", () => {
  // GIVEN: 유효한 객체 초기 데이터 전달
  it.each([
    { initData: { id: "A" }, expected: { id: "A" } },
    { initData: { id: undefined }, expected: { id: undefined } },
  ])(
    "useDispatchSelect hook 마운트 시 인자로 전달한 데이터가 $initData면 selectedData 초기값은 $expected가 됨.",
    ({ initData, expected }) => {
      // WHEN: hook 렌더링
      const { result } = renderHook(() => useDispatchSelect(initData));

      // THEN: selectedData가 전달된 초기 데이터와 동일한 객체를 가지는지 확인
      expect(result.current.selectedData).toEqual(expected);
    },
  );

  // GIVEN: null 또는 undefined 초기 데이터 전달
  it.each([
    { initData: null, expected: null },
    { initData: undefined, expected: null },
  ])(
    "useDispatchSelect hook 마운트 시 인자로 전달한 데이터가 $initData면 selectedData 초기값은 null이 됨.",
    ({ initData, expected }) => {
      // WHEN: hook 렌더링
      const { result } = renderHook(() => useDispatchSelect(initData));

      // THEN: selectedData가 null인지 확인
      expect(result.current.selectedData).toBe(expected);
    },
  );

  describe("handleDataSelect Test", () => {
    // GIVEN: 리스트에서 항목 선택 성공 케이스
    it.each([
      {
        list: [{ id: "A" }, { id: "B" }],
        selectId: "A",
        expected: { id: "A" },
      },
      {
        list: [{ id: "A" }, { id: "B" }],
        selectId: "B",
        expected: { id: "B" },
      },
    ])(
      "list에 포함된 항목 중 id가 '$selectId'인 객체($expected)를 selectedData에 저장",
      ({ list, selectId, expected }) => {
        // GIVEN: 초기값 null로 hook 렌더링
        const { result } = renderHook(() => useDispatchSelect(null));

        // WHEN: handleDataSelect 함수를 통해 list에서 selectId에 해당하는 항목 선택
        act(() => {
          result.current.handleDataSelect(list, selectId);
        });

        // THEN: selectedData가 예상되는 선택된 객체와 일치하는지 확인
        expect(result.current.selectedData).toEqual(expected);
      },
    );

    // GIVEN: 리스트에서 항목 선택 실패 (null 반환) 케이스
    it.each([
      { list: [], selectId: "A", expected: null }, // DESC: 빈 리스트
      { list: [{ id: undefined }], selectId: "A", expected: null }, // DESC: id가 없는 항목
      { list: [{ id: "A" }], selectId: "", expected: null }, // DESC: 빈 selectId
      { list: [{ id: "A" }], selectId: "B", expected: null }, // DESC: 리스트에 없는 selectId
    ])(
      "list에 selectId와 일치하는 항목이 없을 경우, selectedData는 null이 됨.",
      ({ list, selectId, expected }) => {
        // GIVEN: 초기값 null로 hook 렌더링
        const { result } = renderHook(() => useDispatchSelect(null));

        // WHEN: handleDataSelect 함수를 통해 항목 선택 시도
        act(() => {
          result.current.handleDataSelect(list, selectId);
        });

        // THEN: 일치 항목이 없으므로 selectedData가 null인지 확인
        expect(result.current.selectedData).toBe(expected);
      },
    );
  });

  describe("resetSelection Test", () => {
    test("resetSelection 함수를 호출하면 selectedData 값은 null로 변경됨.", () => {
      // GIVEN: 초기 값을 { id: "A" }로 설정하여 hook 렌더링
      const { result } = renderHook(() => useDispatchSelect({ id: "A" }));

      // WHEN: resetSelection 함수 호출
      act(() => {
        result.current.resetSelection();
      });

      // THEN: selectedData 값이 null로 초기화되었는지 확인
      expect(result.current.selectedData).toBe(null);
    });
  });
});
