import { beforeEach, describe, expect, it } from "vitest";

import { useQueryFilterStore } from "@packages/stores/queryFilter";

// DESC: 테스트 시작 전 useQueryFilterStore 스토어 상태 초기화
beforeEach(() => {
  useQueryFilterStore.setState({ isInitQueryFilter: true });
});

describe("useQueryFilterStore Test", () => {
  it.each([{ isInitQueryFilter: false }, { isInitQueryFilter: true }])(
    "초기 isInitQueryFilter 상태 확인",
    ({ isInitQueryFilter }) => {
      // GIVEN: 초기 isInitQueryFilter 상태 설정
      useQueryFilterStore.setState({ isInitQueryFilter });

      // THEN: 초기 isInitQueryFilter 상태 확인
      expect(useQueryFilterStore.getState().isInitQueryFilter).toBe(
        isInitQueryFilter,
      );
    },
  );

  it.each([{ isInit: false }, { isInit: true }])(
    "setIsInitQueryFilter 호출 시 isInitQueryFilter 상태 $isInit로 변경",
    ({ isInit }) => {
      // WHEN: setIsInitQueryFilter 호출 시 isInit 인자 전달
      useQueryFilterStore.getState().setIsInitQueryFilter(isInit);

      // THEN: isInitQueryFilter 상태 변경 확인
      expect(useQueryFilterStore.getState().isInitQueryFilter).toBe(isInit);
    },
  );
});
