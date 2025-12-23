import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import useTimer from "@packages/hooks/useTimer";

// GIVEN: Mocking할 zustand 스토어의 기본 상태와 액션 정의
const mockTimerStore = {
  isTimeStart: false,
  isTimeOut: false,
  onStartTimer: vi.fn(), // DESC: 타이머 시작 액션 Mock
  onSetTimeOut: vi.fn(), // DESC: 타임아웃 상태 설정 액션 Mock
  onResetTimer: vi.fn(), // DESC: 타이머 리셋 액션 Mock
};

// GIVEN: @repo/stores/timer 모듈의 useTimerStore 훅을 Mocking
// DESC: selector 패턴을 흉내 내어 mockTimerStore를 주입
vi.mock("@repo/stores/timer", () => {
  return {
    useTimerStore: (selector: (store: typeof mockTimerStore) => unknown) =>
      // DESC: 훅 호출 시 전달된 selector 함수에 mockTimerStore를 주입하여 필요한 Mock 상태/액션이 반환되도록 함
      selector(mockTimerStore),
  };
});

describe("useTimer Test", () => {
  // DESC: 각 테스트 시작 전에 vitest의 타이머 기능을 가상 타이머로 대체
  beforeEach(() => {
    vi.useFakeTimers();
    // DESC: 각 테스트마다 Mock 상태를 초기화하여 독립성을 유지
    mockTimerStore.isTimeStart = false;
    mockTimerStore.isTimeOut = false;
  });

  // DESC: After (후처리): 각 테스트 종료 후 가상 타이머를 실제 타이머로 복원
  afterEach(() => {
    vi.useRealTimers();
  });

  test("(initTime=90) handler를 실행하지 않으면, isTimeStart=false, isTimeOut=false, limitTime=90, min=1, sec=30을 반환.", () => {
    // WHEN: 초기값 90초로 훅 렌더링
    const { result } = renderHook(() => useTimer(90));

    // THEN: 훅의 상태 및 계산된 분/초가 초기값과 일치하는지 확인
    expect(result.current.isTimeStart).toBe(false);
    expect(result.current.isTimeout).toBe(false);
    expect(result.current.limitTime).toBe(90);
    expect(result.current.min).toBe(1); // 90초 = 1분 30초
    expect(result.current.sec).toBe(30);
  });

  test("(initTime=5) startTimer 가 호출 된 후 2초가 지나면, limitTime=3, min=0, sec=3이 됨.", () => {
    // GIVEN: 초기값 5초로 훅 렌더링
    const { result, rerender } = renderHook(() => useTimer(5));

    // WHEN: startTimer 핸들러 호출
    act(() => {
      result.current.startTimer();
    });

    // THEN: Store의 onStartTimer 액션이 호출되었는지 확인
    expect(mockTimerStore.onStartTimer).toHaveBeenCalled();

    // GIVEN: 훅의 내부 로직이 타이머를 시작했음을 시뮬레이션하기 위해 Mock Store 상태를 업데이트
    mockTimerStore.isTimeStart = true;
    // GIVEN: 변경된 Mock 상태를 훅이 반영하도록 재렌더링
    rerender();

    // WHEN: 2초 경과 시뮬레이션
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // THEN: 제한 시간이 5초에서 3초로 감소했는지 확인
    expect(result.current.limitTime).toBe(3);
    // THEN: 분/초 계산 결과가 0분 3초인지 확인
    expect(result.current.min).toBe(0);
    expect(result.current.sec).toBe(3);
  });

  test("(initTime=2) 카운트가 0이 되면 onSetTimeOut이 호출되고 isTimeout=true가 되어 더이상 min과 sec가 감소 안 됨.", () => {
    // GIVEN: 초기값 2초로 훅 렌더링
    const { result, rerender } = renderHook(() => useTimer(2));

    // WHEN: startTimer 호출 및 Mock 상태 업데이트 후 재렌더링
    act(() => {
      result.current.startTimer();
    });
    mockTimerStore.isTimeStart = true;
    rerender();

    // WHEN: 2초 경과 → 0 도달 시뮬레이션
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // THEN: 제한 시간이 0인지 확인
    expect(result.current.limitTime).toBe(0);
    expect(result.current.min).toBe(0);
    expect(result.current.sec).toBe(0);

    // THEN: 타임아웃 설정 액션이 true 인자로 호출되었는지 확인
    expect(mockTimerStore.onSetTimeOut).toHaveBeenCalledWith(true);
  });

  test("resetTimer 호출 시, onResetTimer가 실행됨.", () => {
    // GIVEN: 훅 렌더링
    const { result } = renderHook(() => useTimer(10));

    // WHEN: resetTimer 핸들러 호출
    act(() => {
      result.current.resetTimer();
    });

    // THEN: Store의 onResetTimer 액션이 호출되었는지 확인
    expect(mockTimerStore.onResetTimer).toHaveBeenCalled();
  });

  test("언마운트 시 onSetTimeOut(false)가 실행됨.", () => {
    // GIVEN: 훅 렌더링 및 unmount 함수 확보
    const { unmount } = renderHook(() => useTimer(10));

    // WHEN: 훅 언마운트
    act(() => {
      unmount();
    });

    // THEN: 클린업 로직에 따라 onSetTimeOut(false)가 호출되었는지 확인
    expect(mockTimerStore.onSetTimeOut).toHaveBeenCalledWith(false);
  });

  test("limitTime이 정확히 0이 되는 순간 clearInterval이 호출되어 더 이상 감소 안 됨.", () => {
    // GIVEN: 초기값 3초로 훅 렌더링 및 타이머 시작
    const { result, rerender } = renderHook(() => useTimer(3));

    act(() => {
      result.current.startTimer();
    });
    mockTimerStore.isTimeStart = true;
    rerender();

    // WHEN: 3초 경과 (정확히 0 도달)
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // THEN: 제한 시간이 0인지 확인 및 타임아웃 액션 호출 확인
    expect(result.current.limitTime).toBe(0);
    expect(mockTimerStore.onSetTimeOut).toHaveBeenCalledWith(true);

    // WHEN: 추가 시간 경과 시뮬레이션
    act(() => {
      vi.advanceTimersByTime(10000);
    });

    // THEN: 제한 시간이 0으로 유지되며 더 이상 감소하지 않았는지 확인
    expect(result.current.limitTime).toBe(0);
    // THEN: onSetTimeOut이 중복 호출되지 않고 1회만 호출되었는지 확인
    expect(mockTimerStore.onSetTimeOut).toHaveBeenCalledOnce();
  });

  test("(initTime=61) 60초를 넘어가는 시간에서 분과 초가 올바르게 계산됨.", () => {
    // GIVEN: 초기값 61초로 훅 렌더링
    const { result, rerender } = renderHook(() => useTimer(61));

    // THEN: 초기 분/초가 1분 1초인지 확인
    expect(result.current.min).toBe(1);
    expect(result.current.sec).toBe(1);

    // WHEN: 타이머 시작 및 상태 반영
    act(() => {
      result.current.startTimer();
    });
    mockTimerStore.isTimeStart = true;
    rerender();

    // WHEN: 1초 경과 → 60초 (1분 0초)
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // THEN: 1분 0초인지 확인
    expect(result.current.limitTime).toBe(60);
    expect(result.current.min).toBe(1);
    expect(result.current.sec).toBe(0);

    // WHEN: 또 1초 경과 → 59초 (0분 59초)
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // THEN: 0분 59초인지 확인
    expect(result.current.limitTime).toBe(59);
    expect(result.current.min).toBe(0);
    expect(result.current.sec).toBe(59);
  });

  test("(initTime=0) 초기값이 0이면 즉시 timeout 상태가 됨.", () => {
    // GIVEN: 초기값 0초로 훅 렌더링
    const { result, rerender } = renderHook(() => useTimer(0));

    // THEN: 초기 시간이 0인지 확인
    expect(result.current.limitTime).toBe(0);

    // WHEN: 타이머 시작 및 상태 반영
    act(() => {
      result.current.startTimer();
    });
    mockTimerStore.isTimeStart = true;
    rerender();

    // WHEN: 1초 경과 시뮬레이션 (타이머가 한 번 실행됨)
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // THEN: 즉시 타임아웃 상태로 설정되었는지 확인
    expect(mockTimerStore.onSetTimeOut).toHaveBeenCalledWith(true);
    // THEN: 제한 시간 0 유지 확인
    expect(result.current.limitTime).toBe(0);
  });

  test("타이머가 실행 중일 때 언마운트되면 interval이 정리되고 onSetTimeOut(false)가 호출됨.", () => {
    // GIVEN: 초기값 10초로 훅 렌더링 및 타이머 시작
    const { result, rerender, unmount } = renderHook(() => useTimer(10));

    act(() => {
      result.current.startTimer();
    });
    mockTimerStore.isTimeStart = true;
    rerender();

    // WHEN: 2초 경과 (10초 → 8초)
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    // THEN: 시간이 감소했는지 확인
    expect(result.current.limitTime).toBe(8);

    // WHEN: 컴포넌트 언마운트
    act(() => {
      unmount();
    });

    // THEN: 언마운트 시 클린업 로직(onSetTimeOut(false)) 호출 확인
    expect(mockTimerStore.onSetTimeOut).toHaveBeenCalledWith(false);

    // WHEN: 추가 시간 경과 시뮬레이션
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // THEN: 언마운트되었으므로 onSetTimeOut이 추가로 호출되지 않았는지 확인
    expect(mockTimerStore.onSetTimeOut).toHaveBeenCalledOnce();
  });

  test("resetTimer를 호출하면 onResetTimer가 실행되고, isTimeStart가 false가 되면 initTime으로 리셋됨.", () => {
    // GIVEN: 초기값 10초로 훅 렌더링 및 타이머 시작
    const { result, rerender } = renderHook(() => useTimer(10));

    act(() => {
      result.current.startTimer();
    });
    mockTimerStore.isTimeStart = true;
    rerender();

    // WHEN: 5초 경과 (10초 → 5초)
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // THEN: 시간이 5초로 감소했는지 확인
    expect(result.current.limitTime).toBe(5);

    // WHEN: resetTimer 핸들러 호출
    act(() => {
      result.current.resetTimer();
    });

    // THEN: onResetTimer 액션 호출 확인
    expect(mockTimerStore.onResetTimer).toHaveBeenCalled();

    // GIVEN: Mock Store에서 리셋이 완료되어 isTimeStart가 false로 변경되었다고 가정
    mockTimerStore.isTimeStart = false;
    // GIVEN: 변경 반영을 위한 재렌더링
    rerender();

    // THEN: 제한 시간이 초기값 10초로 복원되었는지 확인
    expect(result.current.limitTime).toBe(10);
    expect(result.current.min).toBe(0);
    expect(result.current.sec).toBe(10);
  });
});
