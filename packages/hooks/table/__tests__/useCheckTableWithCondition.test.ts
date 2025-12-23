import { act, renderHook } from "@testing-library/react";
import * as routerDom from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";

import useCheckTableWithCondition from "@packages/hooks/table/useCheckTableWithCondition";

describe("useCheckTableWithCondition Test", () => {
  beforeEach(() => {
    // DESC: useSearchParams의 반환값을 Mocking하여 'page=2' 쿼리 상태를 설정
    vi.spyOn(routerDom, "useSearchParams").mockReturnValue([
      new URLSearchParams("page=2"),
      vi.fn(),
    ]);
  });

  test("마운트될 때, tableDatas에서 isSelected가 true인 항목들로 checkedIds가 초기화되어야 함.", () => {
    // GIVEN: 초기 isSelected 상태가 혼합된 테이블 데이터
    const tableDatas = [
      { id: "1", isSelected: true },
      { id: "2", isSelected: false },
      { id: "3", isSelected: true },
    ];

    // WHEN: hook을 렌더링
    const { result } = renderHook(() =>
      useCheckTableWithCondition({ tableDatas }),
    );

    // THEN: isSelected가 true인 '1'과 '3'만 포함되는지 확인
    expect(result.current.checkedIds).toEqual(["1", "3"]);
  });

  test("isCheckable은 checkableIds에 포함된 id가 있다면 true, 없다면 false를 반환.", () => {
    // GIVEN: 테이블 ID 목록을 설정
    const tableDatas = [
      { id: "1", isSelected: true },
      { id: "2", isSelected: false },
      { id: "3", isSelected: true },
    ];

    // WHEN: hook을 렌더링
    const { result, rerender } = renderHook(() =>
      useCheckTableWithCondition({ tableDatas }),
    );

    rerender();

    // THEN: 존재하는 ID는 true, 존재하지 않는 ID는 false를 반환하는지 확인
    expect(result.current.isCheckable("1")).toBe(true);
    expect(result.current.isCheckable("2")).toBe(true);
    expect(result.current.isCheckable("99")).toBe(false);
  });

  describe("handleCheck Test", () => {
    test("handleCheck에 id가 undefined라면 함수를 종료함.", () => {
      // GIVEN: 변수 준비
      const tableDatas = [
        { id: "1", isSelected: true },
        { id: "2", isSelected: false },
        { id: "3", isSelected: true },
      ];

      // WHEN: hook 실행
      const { result } = renderHook(() =>
        useCheckTableWithCondition({ tableDatas }),
      );

      // DESC: checkedIds 초기 상태 확인
      expect(result.current.checkedIds).toEqual(["1", "3"]);

      act(() => {
        // DESC: undefined로 handleCheck 호출
        result.current.handleCheck(undefined)();
      });

      // THEN: checkedIds 상태가 변경되지 않았는지 확인
      expect(result.current.checkedIds).toEqual(["1", "3"]);
    });

    test("handleCheck는 특정 ID의 체크 상태를 토글해야 함.", () => {
      // GIVEN: 변수 준비
      const tableDatas = [
        { id: "1", isSelected: true },
        { id: "2", isSelected: false },
        { id: "3", isSelected: true },
      ];

      // WHEN: hook 실행
      const { result } = renderHook(() =>
        useCheckTableWithCondition({ tableDatas }),
      );

      // DESC: '2'를 추가 (체크)
      act(() => {
        result.current.handleCheck("2")();
      });

      // THEN: '2'가 추가되었는지 확인
      expect(result.current.checkedIds).toEqual(["1", "3", "2"]);

      // DESC: '2'를 제거 (체크 해제)
      act(() => {
        result.current.handleCheck("2")();
      });

      // THEN: '2'가 제거되었는지 확인
      expect(result.current.checkedIds).toEqual(["1", "3"]);
    });
  });

  test("handleAllCheck를 호출하면 tableDatas 내의 모든 id가 checkedIds에 저장되거나 빈 배열로 초기화됨.", () => {
    // GIVEN: 변수 준비
    const tableDatas = [
      { id: "1", isSelected: true },
      { id: "2", isSelected: false },
      { id: "3", isSelected: true },
    ];

    // WHEN: hook 실행
    const { result } = renderHook(() =>
      useCheckTableWithCondition({ tableDatas }),
    );

    // DESC: 1차 호출: 전체 선택
    act(() => {
      result.current.handleAllCheck();
    });

    // THEN: 모든 ID가 선택되었는지 확인
    expect(result.current.checkedIds).toEqual(["1", "2", "3"]);

    // DESC: 2차 호출: 전체 해제
    act(() => {
      result.current.handleAllCheck();
    });

    // THEN: 배열이 비었는지 확인
    expect(result.current.checkedIds).toEqual([]);
  });

  test("handleAllUnCheck를 호출하면 checkedIds 배열이 초기화됨.", () => {
    // GIVEN: 변수 준비
    const tableDatas = [
      { id: "1", isSelected: true },
      { id: "2", isSelected: false },
      { id: "3", isSelected: true },
    ];

    // WHEN: hook 실행
    const { result } = renderHook(() =>
      useCheckTableWithCondition({ tableDatas }),
    );

    // DESC: 초기 상태가 비어있지 않음을 확인
    expect(result.current.checkedIds).toEqual(["1", "3"]);

    act(() => {
      // DESC: 전체 해제 호출
      result.current.handleAllUnCheck();
    });

    // THEN: checkedIds 배열이 비어있는지 확인
    expect(result.current.checkedIds).toEqual([]);
  });

  test("isChecked를 호출하면 checkedIds 배열 내 아이디가 포함되어 있는지 여부를 boolean으로 반환.", () => {
    // GIVEN: 변수 준비
    const tableDatas = [
      { id: "1", isSelected: true },
      { id: "2", isSelected: false },
      { id: "3", isSelected: true },
    ];

    // WHEN: hook 실행
    const { result } = renderHook(() =>
      useCheckTableWithCondition({ tableDatas }),
    );

    // THEN: 존재하는 ID('1', '3'), 존재하지 않는 ID('2', '4')에 대한 결과를 확인
    expect(result.current.isChecked("1")).toBe(true);
    expect(result.current.isChecked("2")).toBe(false);
    expect(result.current.isChecked("3")).toBe(true);
    expect(result.current.isChecked("4")).toBe(false);
  });

  describe("isAllChecked Test", () => {
    test("isAllChecked가 호출되면 checkableTableIds와 checkedIds의 길이를 비교해 boolean을 반환.", () => {
      // GIVEN: 변수 준비
      const tableDatas = [
        { id: "1", isSelected: true },
        { id: "2", isSelected: false },
        { id: "3", isSelected: true },
      ];

      // WHEN: hook 실행
      const { result } = renderHook(() =>
        useCheckTableWithCondition({ tableDatas }),
      );

      // THEN: 초기 상태(2개만 체크)는 false 확인
      expect(result.current.isAllChecked()).toBe(false);

      act(() => {
        // DESC: handleAllCheck를 호출하여 모두 체크 (3개)
        result.current.handleAllCheck();
      });

      // THEN: 전체 체크 후 true가 되는지 확인
      expect(result.current.isAllChecked()).toBe(true);
    });

    test("isAllChecked는 tableDatas가 빈 배열일 때 false를 반환함.", () => {
      // GIVEN: 빈 테이블 데이터를 설정
      const tableDatas: { id: string; isSelected: boolean }[] = [];

      // WHEN: hook 실행
      const { result } = renderHook(() =>
        useCheckTableWithCondition({ tableDatas }),
      );

      // THEN: checkableIds.length가 0인 경우 false를 반환하는지 확인
      expect(result.current.isAllChecked()).toBe(false);
    });
  });

  test("page 쿼리가 변경되면 checkedIds는 빈 배열로 초기화됨.", () => {
    // GIVEN: 변수 준비
    const tableDatas = [
      { id: "1", isSelected: true },
      { id: "2", isSelected: false },
      { id: "3", isSelected: true },
    ];

    // WHEN: hook 실행    //  - 초기 렌더링
    const { result, rerender } = renderHook(() =>
      useCheckTableWithCondition({ tableDatas }),
    );

    // DESC: 초기 checkedIds 상태를 확인
    expect(result.current.checkedIds).toEqual(["1", "3"]);

    // DESC: useSearchParams Mocking 값을 변경하여 page 쿼리 변경
    vi.spyOn(routerDom, "useSearchParams").mockReturnValue([
      new URLSearchParams("page=1"),
      vi.fn(),
    ]);

    // WHEN: hook 실행    //  - rerender를 통해 hook을 업데이트
    rerender();

    // THEN: checkedIds가 빈 배열로 초기화되었는지 확인
    expect(result.current.checkedIds).toEqual([]);
  });
});
