import { afterEach, describe, expect, test } from "vitest";

import { useCheckIsDirtyStore } from "@packages/stores/checkIsDirty";

afterEach(() => {
  // DESC: 각 테스트 실행 후, 스토어의 상태를 isDirty: false로 초기화
  useCheckIsDirtyStore.setState({ isDirty: false });
});

describe("checkIsDirty Test", () => {
  test("초기 상태는 isDirty=false ", () => {
    // WHEN: 스토어의 현재 상태를 가져옴
    // THEN: isDirty의 초기값이 false인지 확인
    expect(useCheckIsDirtyStore.getState().isDirty).toBe(false);
  });

  test("setIsDirty는 isDirty 상태를 변경함.", () => {
    // WHEN: isDirty 상태를 true로 변경
    useCheckIsDirtyStore.getState().setIsDirty(true);

    const state1 = useCheckIsDirtyStore.getState();

    // THEN: 상태가 true로 변경되었는지 확인
    expect(state1.isDirty).toBe(true);

    // WHEN: isDirty 상태를 다시 false로 변경
    useCheckIsDirtyStore.getState().setIsDirty(false);

    const state2 = useCheckIsDirtyStore.getState();

    // THEN: 상태가 false로 변경되었는지 확인
    expect(state2.isDirty).toBe(false);
  });
});
