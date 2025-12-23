import { beforeEach, describe, expect, test } from "vitest";

import { apiDebug } from "@packages/stores/apiDebug";

// DESC: 각 테스트 시작 전, apiDebug 스토어 상태를 초기화함.
beforeEach(() => {
  apiDebug.setState({ isOpen: false, logs: {} });
});

describe("apiDebug Test", () => {
  // DESC: 테스트에 사용할 에러 데이터 모킹
  const mockPath1 = "/test1";
  const mockPath2 = "/test2";
  const mockErrors1 = [{ path: "price", expected: "number", value: "100" }];
  const mockErrors2 = [{ path: "id", expected: "string", value: 100 }];

  test("onToggle 호출 시 isOpen 상태 반전", () => {
    // GIVEN: 초기 isOpen 상태 false 확인
    expect(apiDebug.getState().isOpen).toBe(false);

    // WHEN: onToggle 함수 호출
    apiDebug.getState().onToggle();

    // THEN: isOpen 상태 반전 확인
    expect(apiDebug.getState().isOpen).toBe(true);

    // WHEN: onToggle 함수 재호출
    apiDebug.getState().onToggle();

    // THEN: isOpen 상태 반전 확인
    expect(apiDebug.getState().isOpen).toBe(false);
  });

  test("logs가 빈 객체이면 false를 반환", () => {
    // THEN: 초기 logs 객체 비어있는지 확인
    expect(apiDebug.getState().logs).toEqual({});
    // THEN: onGetHasError false 반환 확인
    expect(apiDebug.getState().onGetHasError()).toBe(false);
  });

  test("logs가 빈 객체가 아니면 true 반환", () => {
    // GIVEN: apiDebug 스토어 호출
    const { onGetHasError, onSetLog } = apiDebug.getState();

    // THEN: 초기 logs 객체 비어있는지 확인
    expect(apiDebug.getState().logs).toEqual({});

    // WHEN: onSetLog 호출하여 logs에 항목 추가
    onSetLog({ path: mockPath1, errors: mockErrors1 });

    // THEN: onGetHasError true 반환 확인
    expect(onGetHasError()).toBe(true);
  });

  test("logs 객체에 새로운 경로 로그 추가", () => {
    // THEN: 초기 logs 객체 비어있는지 확인
    expect(apiDebug.getState().logs).toEqual({});

    // WHEN: onSetLog 호출하여 logs에 항목 추가
    apiDebug.getState().onSetLog({ path: mockPath1, errors: mockErrors1 });

    // THEN: logs 객체 확인
    expect(apiDebug.getState().logs).toEqual({ [mockPath1]: mockErrors1 });
  });

  test("onClearLog 호출 시 특정 경로 로그 제거", () => {
    // GIVEN: apiDebug 스토어 호출
    const { onClearLog, onSetLog } = apiDebug.getState();

    // WHEN: onSetLog 호출하여 logs에 항목 추가
    onSetLog({ path: mockPath1, errors: mockErrors1 });
    onSetLog({ path: mockPath2, errors: mockErrors2 });

    // THEN: onSetLog를 통해 logs 객체가 정상적으로 추가되었는지 확인
    expect(apiDebug.getState().logs).toEqual({
      [mockPath1]: mockErrors1,
      [mockPath2]: mockErrors2,
    });

    // WHEN: onClearLog 호출하여 mockPath1에 해당하는 log 삭제
    onClearLog(mockPath1);

    // THEN: logs 객체 확인
    expect(apiDebug.getState().logs).toEqual({ [mockPath2]: mockErrors2 });
  });

  test("onAllClear 호출 시 logs 객체 초기화 및 isOpen false 초기화", () => {
    // GIVEN: apiDebug 스토어 호출
    const { onAllClear, onGetHasError, onSetLog, onToggle } =
      apiDebug.getState();

    // WHEN: onSetLog 호출하여 logs에 항목 추가
    onSetLog({ path: mockPath1, errors: mockErrors1 });
    // WHEN: onToggle를 통해 isOpen 상태 변경
    onToggle();

    // THEN: logs 객체 확인
    expect(apiDebug.getState().logs).toEqual({
      [mockPath1]: mockErrors1,
    });
    // THEN: isOpen 상태 true 확인
    expect(apiDebug.getState().isOpen).toBe(true);

    // WHEN: onAllClear 호출하여 logs 객체 초기화 및 isOpen 상태 false로 초기화
    onAllClear();

    // THEN: logs 빈 객체 확인
    expect(apiDebug.getState().logs).toEqual({});
    // THEN: isOpen 상태 false 확인
    expect(onGetHasError()).toBe(false);
  });
});
