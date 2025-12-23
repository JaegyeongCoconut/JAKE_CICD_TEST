import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import useRadioButton from "@packages/hooks/useRadioButton";

describe("useRadioButton Test", () => {
  // GIVEN: 테스트에 사용될 타입 정의
  type TestStatusType = "in" | "out";

  test("initState 값을 전달하면, 초기 radioState 값은 initState를 반환.", () => {
    // WHEN: 초기값 "in"을 전달하여 hook 렌더링
    const { result } = renderHook(() => useRadioButton<TestStatusType>("in"));

    // THEN: radioState가 초기값 "in"과 일치하는지 확인
    expect(result.current.radioState).toBe("in");
  });

  test("지정된 키를 handleRadioButtonClick에 전달하고 반환된 핸들러를 실행하면 radioState가 변경됨.", () => {
    // GIVEN: 초기값 "in"으로 hook 렌더링
    const { result } = renderHook(() => useRadioButton<TestStatusType>("in"));

    // WHEN: "out" 키를 인자로 전달하여 반환된 핸들러 함수를 실행 (act로 상태 업데이트 보장)
    act(() => {
      // DESC: handleRadioButtonClick("out") 호출 시 radioState를 "out"으로 변경하는 함수가 반환되어 즉시 실행됨
      result.current.handleRadioButtonClick("out")();
    });

    // THEN: radioState가 새로운 값인 "out"으로 변경되었는지 확인
    expect(result.current.radioState).toBe("out");
  });
});
