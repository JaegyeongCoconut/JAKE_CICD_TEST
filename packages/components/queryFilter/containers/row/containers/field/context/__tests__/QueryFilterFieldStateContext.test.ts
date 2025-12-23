import { describe, expect, test } from "vitest";

// GIVEN: Context의 초기값 객체 import
import { defaultValue } from "@packages/queryFilter/containers/row/containers/field/context/QueryFilterFieldStateContext";

describe("QueryFilterFieldStateContext Test", () => {
  test("Context의 초기값(Initial Value)이 QueryFilterFieldStateContextProps의 모든 필드를 포함해야 함", () => {
    // THEN: 초기값 객체가 필수 속성들을 모두 가지고 있는지 검증
    // DESC: 1. boolean 타입 속성 확인 (초기값으로 true/false가 제공되었는지)
    // THEN: 'hasError' 속성의 존재 여부 및 타입이 boolean인지 확인
    expect(typeof defaultValue.hasError).toBe("boolean");
    // THEN: 'isFocused' 속성의 존재 여부 및 타입이 boolean인지 확인
    expect(typeof defaultValue.isFocused).toBe("boolean");
    // DESC: 2. 함수 타입 속성 확인 (초기값으로 함수가 제공되었는지)
    // THEN: 'handleBlur' 함수 속성의 존재 여부 확인
    expect(typeof defaultValue.handleBlur).toBe("function");
    // THEN: 'handleErrorClear' 함수 속성의 존재 여부 확인
    expect(typeof defaultValue.handleErrorClear).toBe("function");
    // THEN: 'handleFocus' 함수 속성의 존재 여부 확인
    expect(typeof defaultValue.handleFocus).toBe("function");
    // THEN: 'onSetError' 함수 속성의 존재 여부 확인
    expect(typeof defaultValue.onSetError).toBe("function");
  });
});
