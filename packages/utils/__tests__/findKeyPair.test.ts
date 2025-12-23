import { describe, expect, it, test } from "vitest";

import { findKeyPair } from "@packages/utils/findKey";

describe("findKeyPair Test", () => {
  // GIVEN: 테스트에 사용될 "키: 값" 쌍의 객체(Pair)를 준비
  const pair = { 0: "pending", 1: "activated", 2: "completed" };

  // GIVEN: value가 undefined 또는 null인 케이스를 준비
  it.each([{ value: undefined }, { value: null }])(
    "value가 $value이면 null을 반환.",
    ({ value }) => {
      // WHEN: findKeyPair 함수에 유효하지 않은 value를 입력
      // THEN: 결과가 null인지 확인
      expect(findKeyPair({ value, pair })).toBeNull();
    },
  );

  test("value가 pair와 일치하지 않으면 null을 반환.", () => {
    // GIVEN: pair 객체에 존재하지 않는 값("done")을 준비
    // WHEN: findKeyPair 함수를 실행
    // THEN: 일치하는 키가 없으므로 null을 반환하는지 확인
    expect(findKeyPair({ value: "done", pair })).toBeNull();
  });

  // GIVEN: pair 객체에 존재하는 value와 기대되는 key를 준비
  it.each([
    { value: "activated", expected: 1 },
    { value: "pending", expected: 0 },
    { value: "completed", expected: 2 },
  ])(
    "value가 $value이면 해당 key($expected)를 반환.",
    ({ value, expected }) => {
      // WHEN: findKeyPair 함수에 유효한 value를 입력
      // THEN: value에 해당하는 key가 기대값과 일치하는지 확인
      expect(findKeyPair({ value, pair })).toBe(expected);
    },
  );
});
