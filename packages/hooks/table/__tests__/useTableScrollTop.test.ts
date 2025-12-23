import { renderHook } from "@testing-library/react";
import * as routerDom from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";

import useTableScrollTop from "@packages/hooks/table/useTableScrollTop";

// DESC: window.scrollTo를 Spy하고 JSDOM의 'Not implemented' 경고를 막기 위해 Mock Implementation 추가
const spyScrollTop = vi.spyOn(window, "scrollTo").mockImplementation(() => {});

describe("useTableScrollTop Test", () => {
  beforeEach(() => {
    // DESC: 모든 테스트의 초기 상태를 page=2로 설정 (rerender 시 page=1로 변경하기 위한 기본값)
    vi.spyOn(routerDom, "useSearchParams").mockReturnValue([
      new URLSearchParams("page=2"),
      vi.fn(),
    ]);
  });

  test("페이지 쿼리가 존재하고, Table의 head가 body를 가릴 때 스크롤 위치가 조정되어야 함.", () => {
    // GIVEN: Mock DOM 요소 및 속성 정의 (toolBoxHeight: 100, tHead height: 50 가정)
    const mockToolBox = document.createElement("div");
    Object.defineProperty(mockToolBox, "scrollHeight", { value: 100 });
    const mockTable = document.createElement("table");
    const mockTableBody = document.createElement("tbody");
    const mockTableHead = document.createElement("thead");
    mockTable.appendChild(mockTableHead);
    mockTable.appendChild(mockTableBody);

    // DESC: tHead의 getBoundingClientRect Mock 설정 (top: 50)
    mockTableHead.getBoundingClientRect = vi.fn().mockReturnValue({ top: 50 });
    // DESC: tBody의 getBoundingClientRect Mock 설정 (top: 0). 스크롤 발생 조건 만족 (tHeadPosY=50 > tBodyPosY=0)
    mockTableBody.getBoundingClientRect = vi.fn().mockReturnValue({ top: 0 });

    // DESC: tableCompo.offsetTop을 Mocking (가상의 table 위치: 200 가정)
    Object.defineProperty(mockTable, "offsetTop", { value: 200 });

    const { result, rerender } = renderHook(() => useTableScrollTop());

    // DESC: 렌더링 직후, 훅이 반환한 ref에 Mock DOM 요소를 수동으로 연결
    // DESC: ref는 읽기 속성이기 때문에 definedProperty로 writable 변경
    Object.defineProperty(result.current.tableRef, "current", {
      value: mockTable, // DESC: tableRef.current에 mockTable 할당
      writable: true, // DESC: 쓰기 가능하도록 설정
    });

    Object.defineProperty(result.current.toolBoxRef, "current", {
      value: mockToolBox, // DESC: toolBoxRef.current에 mockToolBox 할당
      writable: true, // DESC: 쓰기 가능하도록 설정
    });

    // DESC: useEffect 실행을 위해 Dependency(page 쿼리)를 변경
    vi.spyOn(routerDom, "useSearchParams").mockReturnValue([
      new URLSearchParams("page=1"),
      vi.fn(),
    ]);

    // WHEN: useSearchParams Mock 변경 후 rerender를 호출하여 useEffect 재실행 유도
    rerender();

    // THEN: window.scrollTo 함수가 한 번 호출되었는지 검증
    expect(spyScrollTop).toHaveBeenCalledOnce();
    // DESC: 호출된 위치(top)가 올바른지 검증
    // DESC: tableCompo.offsetTop(200) - headerHeight(56) - toolBoxHeight(100) + 2 = 46
    expect(spyScrollTop).toHaveBeenCalledWith({ top: 46, behavior: "auto" });
  });

  test("페이지 쿼리가 존재하고, Table body가 head를 가리지 않을 때 스크롤하지 않아야 함.", () => {
    // GIVEN: Mock DOM 요소 및 속성 정의 (toolBoxHeight: 100, tHead height: 0 가정)
    const mockToolBox = document.createElement("div");
    Object.defineProperty(mockToolBox, "scrollHeight", { value: 100 });
    const mockTable = document.createElement("table");
    const mockTableBody = document.createElement("tbody");
    const mockTableHead = document.createElement("thead");
    mockTable.appendChild(mockTableHead);
    mockTable.appendChild(mockTableBody);

    // DESC: tHead의 getBoundingClientRect Mock 설정 (top: 50)
    mockTableHead.getBoundingClientRect = vi.fn().mockReturnValue({ top: 50 });
    // DESC: tBody의 getBoundingClientRect Mock 설정 (top: 50). 스크롤 방지 조건 만족 (tHeadPosY=50 <= tBodyPosY=50)
    mockTableBody.getBoundingClientRect = vi.fn().mockReturnValue({ top: 50 });

    // DESC: tableCompo.offsetTop을 Mocking (가상의 table 위치: 200 가정)
    Object.defineProperty(mockTable, "offsetTop", { value: 200 });

    const { result, rerender } = renderHook(() => useTableScrollTop());

    // DESC: 렌더링 직후, 훅이 반환한 ref에 Mock DOM 요소를 수동으로 연결
    // DESC: ref는 읽기 속성이기 때문에 definedProperty로 writable 변경
    Object.defineProperty(result.current.tableRef, "current", {
      value: mockTable, // DESC: tableRef.current에 mockTable 할당
      writable: true, // DESC: 쓰기 가능하도록 설정
    });

    Object.defineProperty(result.current.toolBoxRef, "current", {
      value: mockToolBox, // DESC: toolBoxRef.current에 mockToolBox 할당
      writable: true, // DESC: 쓰기 가능하도록 설정
    });

    // DESC: useEffect 실행을 위해 Dependency(page 쿼리)를 변경
    vi.spyOn(routerDom, "useSearchParams").mockReturnValue([
      new URLSearchParams("page=1"),
      vi.fn(),
    ]);

    // WHEN: useSearchParams Mock 변경 후 rerender를 호출하여 useEffect 재실행 유도
    rerender();

    // THEN: : window.scrollTo 함수가 호출되지 않았는지 검증
    expect(spyScrollTop).not.toHaveBeenCalled();
  });

  test("toolBoxRef가 null일 때, toolBoxHeight를 0으로 처리하여 올바른 위치로 스크롤 해야 함.", () => {
    // GIVEN: Mock DOM 요소 정의 (toolBoxRef는 null로 유지)
    const mockTable = document.createElement("table");
    const mockTableBody = document.createElement("tbody");
    const mockTableHead = document.createElement("thead");
    mockTable.appendChild(mockTableHead);
    mockTable.appendChild(mockTableBody);

    // DESC: 스크롤 발생 조건: tHead.top=50, tBody.top=0, tHead Height=50 Mocking
    mockTableHead.getBoundingClientRect = vi.fn().mockReturnValue({ top: 50 });
    mockTableBody.getBoundingClientRect = vi.fn().mockReturnValue({ top: 0 });
    // DESC: tHead Height를 50으로 Mocking하여 tableHeadPosY = 100이 되도록 함
    Object.defineProperty(mockTableHead, "scrollHeight", { value: 50 });

    // DESC: tableCompo.offsetTop을 Mocking
    Object.defineProperty(mockTable, "offsetTop", { value: 200 });

    const { result, rerender } = renderHook(() => useTableScrollTop());

    // DESC: tableRef만 Mock DOM 요소를 수동으로 연결
    Object.defineProperty(result.current.tableRef, "current", {
      value: mockTable, // DESC: tableRef.current에 mockTable 할당
      writable: true,
    });

    // DESC: toolBoxRef.current는 기본값(null)으로 유지되어 toolBoxHeight가 0으로 계산됨
    // DESC: useEffect 실행을 위해 Dependency(page 쿼리)를 변경
    vi.spyOn(routerDom, "useSearchParams").mockReturnValue([
      new URLSearchParams("page=1"),
      vi.fn(),
    ]);

    // WHEN: 강제 재렌더링으로 useEffect 실행 유도
    rerender();

    // THEN: 1. window.scrollTo 함수 호출 여부 검증
    expect(spyScrollTop).toHaveBeenCalledOnce();
    // THEN: 2. 호출된 위치(top)가 올바른지 검증
    // DESC: 계산: tableCompo.offsetTop(200) - headerHeight(56) - toolBoxHeight(0) + 2 = 146
    expect(spyScrollTop).toHaveBeenCalledWith({ top: 146, behavior: "auto" });
  });

  test("tableRef가 null일 때, 스크롤 로직을 실행하지 않고 안전하게 종료되어야 함.", () => {
    // GIVEN: Mock DOM 요소는 생성하거나 Ref에 할당하지 않아 tableRef.current는 null로 유지
    const { rerender } = renderHook(() => useTableScrollTop());

    // DESC: Ref 할당 단계를 생략하여 tableRef.current는 null로 유지
    // DESC: useEffect 실행을 위해 Dependency(page 쿼리)를 변경
    vi.spyOn(routerDom, "useSearchParams").mockReturnValue([
      new URLSearchParams("page=1"),
      vi.fn(),
    ]);

    // WHEN: 강제 재렌더링으로 useEffect 실행 유도
    rerender();

    // THEN: : window.scrollTo 함수가 호출되지 않았는지 검증
    expect(spyScrollTop).not.toHaveBeenCalled();
  });
});
