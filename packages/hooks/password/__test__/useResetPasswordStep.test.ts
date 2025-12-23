import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { RESET_PASSWORD_STEP } from "@repo/constants/step";

import useResetPasswordStep from "../useResetPasswordStep";

describe("useResetPasswordStep Test", () => {
  test("useResetPasswordStep hook 마운트 시 currentStep 상태가 IDENTITY_VERIFICATION=0으로 초기화됩니다.", () => {
    // WHEN: hook 렌더링
    const { result } = renderHook(() => useResetPasswordStep());

    // THEN: currentStep 상태가 첫 번째 단계(IDENTITY_VERIFICATION)의 값과 일치하는지 확인
    expect(result.current.currentStep).toBe(
      RESET_PASSWORD_STEP.IDENTITY_VERIFICATION,
    );
  });

  describe("handleMoveNextStep Test", () => {
    test("handleMoveNextStep 함수 호출 시 currentStep 상태가 CREATE_NEW_PASSWORD=1로 변경됩니다.", () => {
      // GIVEN: hook 렌더링 (초기 상태 = 0)
      const { result } = renderHook(() => useResetPasswordStep());

      // WHEN: handleMoveNextStep 함수 호출 (다음 단계로 이동)
      act(() => {
        result.current.handleMoveNextStep();
      });

      // THEN: currentStep 상태가 다음 단계(CREATE_NEW_PASSWORD)의 값과 일치하는지 확인 (0 -> 1)
      expect(result.current.currentStep).toBe(
        RESET_PASSWORD_STEP.CREATE_NEW_PASSWORD,
      );
    });
  });
});
