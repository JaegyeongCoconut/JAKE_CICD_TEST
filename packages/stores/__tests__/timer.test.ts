import { beforeEach, describe, expect, it, test } from "vitest";

import { useTimerStore } from "@packages/stores/timer";

// DESC: 테스트 시작 전 useTimerStore 스토어 상태 초기화
beforeEach(() => {
  useTimerStore.setState({
    isTimeOut: false,
    isTimeReset: false,
    isTimeStart: false,
  });
});

describe("useTimerStore Test", () => {
  it.each([
    { isTimeOut: false, isTimeReset: false, isTimeStart: false },
    { isTimeOut: false, isTimeReset: false, isTimeStart: true },
    { isTimeOut: false, isTimeReset: true, isTimeStart: false },
    { isTimeOut: false, isTimeReset: true, isTimeStart: true },
    { isTimeOut: true, isTimeReset: false, isTimeStart: false },
    { isTimeOut: true, isTimeReset: false, isTimeStart: true },
    { isTimeOut: true, isTimeReset: true, isTimeStart: false },
    { isTimeOut: true, isTimeReset: true, isTimeStart: true },
  ])(
    "초기 isTimeOut, isTimeReset, isTimeStart 상태 확인",
    ({ isTimeOut, isTimeReset, isTimeStart }) => {
      // GIVEN: 초기 isTimeOut, isTimeReset, isTimeStart 상태 설정
      useTimerStore.setState({ isTimeOut, isTimeReset, isTimeStart });

      // GIVEN: useTimerStore 스토어 호출
      const {
        isTimeOut: initIsTimeOut,
        isTimeReset: initIsTimeReset,
        isTimeStart: initIsTimeStart,
      } = useTimerStore.getState();

      // THEN: 초기 isTimeOut 상태 확인
      expect(initIsTimeOut).toBe(isTimeOut);
      // THEN: 초기 isTimeReset 상태 확인
      expect(initIsTimeReset).toBe(isTimeReset);
      // THEN: 초기 isTimeStart 상태 확인
      expect(initIsTimeStart).toBe(isTimeStart);
    },
  );

  test("onStartTimer를 호출하여 isTimeStart=true, isTimeReset=false로 상태 변경", () => {
    // WHEN: onStartTimer 호출
    useTimerStore.getState().onStartTimer();

    // THEN: isTimeStart, isTimeReset 상태 변경 확인
    expect(useTimerStore.getState().isTimeStart).toBe(true);
    expect(useTimerStore.getState().isTimeReset).toBe(false);
  });

  test("onResetTimer를 호출하여 isTimeOut=false, isTimeStart=false, isTimeReset=true로 상태 변경", () => {
    // WHEN: onResetTimer 호출
    useTimerStore.getState().onResetTimer();

    // THEN: isTimeOut, isTimeStart, isTimeReset 상태 변경 확인
    expect(useTimerStore.getState().isTimeOut).toBe(false);
    expect(useTimerStore.getState().isTimeStart).toBe(false);
    expect(useTimerStore.getState().isTimeReset).toBe(true);
  });

  it.each([{ isOut: false }, { isOut: true }])(
    "onSetTimeOut 호출 시 isTimeOut 상태 $isOut으로 변경",
    ({ isOut }) => {
      // WHEN: onSetTimeOut 호출 시 isOut 인자 전달
      useTimerStore.getState().onSetTimeOut(isOut);

      // THEN: isTimeOut 상태 변경 확인
      expect(useTimerStore.getState().isTimeOut).toBe(isOut);
    },
  );
});
