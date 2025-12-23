import { describe, expect, test } from "vitest";

import { mappingToKeyLabelSelects } from "@packages/utils/mapping";

describe("mappingToKeyLabelSelects Test", () => {
  test("selects가 undefined이면, [{key: '', label: ''}]를 반환.", () => {
    // GIVEN: 입력 selects가 undefined인 경우
    // WHEN: mappingToKeyLabelSelects 함수를 호출
    // THEN: 기본값으로 [{key: '', label: ''}] 배열을 반환하는지 확인
    expect(mappingToKeyLabelSelects(undefined)).toEqual([
      { key: "", label: "" },
    ]);
  });

  test("[{ name: x, code: y }] 형태는 [{ key: y, label: x }] 형태를 반환. (단, key에 매핑되는 타입은 string)", () => {
    // GIVEN: 'code'와 'name' 필드를 포함하는 입력 배열을 준비 (code는 string/number 혼합)
    const input = [
      { name: "name1", code: "Code" },
      { name: "name2", code: 1 },
    ];

    // WHEN: mappingToKeyLabelSelects 함수를 호출
    const result = mappingToKeyLabelSelects(input);

    // THEN: 결과가 [{ key: code, label: name }] 형태로 올바르게 매핑되었는지 확인
    expect(result).toEqual([
      { key: "Code", label: "name1" },
      { key: "1", label: "name2" },
    ]);
    // THEN: 매핑된 key의 타입이 모두 string인지 확인
    expect(result.every(({ key }) => typeof key === "string")).toBe(true);
  });

  test("[{ id: x, name: y }] 형태는 [{ key: x, label: y }] 형태를 반환. (단, key에 매핑되는 타입은 string)", () => {
    // GIVEN: 'id'와 'name' 필드를 포함하는 입력 배열을 준비 (id는 string/number 혼합)
    const input = [
      { id: "user", name: "user1" },
      { id: 2, name: "user2" },
    ];

    // WHEN: mappingToKeyLabelSelects 함수를 호출
    const result = mappingToKeyLabelSelects(input);

    // THEN: 결과가 [{ key: id, label: name }] 형태로 올바르게 매핑되었는지 확인
    expect(result).toEqual([
      { key: "user", label: "user1" },
      { key: "2", label: "user2" },
    ]);

    // THEN: 매핑된 key의 타입이 모두 string인지 확인
    expect(result.every(({ key }) => typeof key === "string")).toBe(true);
  });

  test("[{ key: x, name: y }] 형태는 [{ key: x, label: y }] 형태를 반환. (단, key에 매핑되는 타입은 string)", () => {
    // GIVEN: 'key'와 'name' 필드를 포함하는 입력 배열을 준비 (key는 string/number 혼합)
    const input = [
      { key: "key", name: "name1" },
      { key: 2, name: "name2" },
    ];

    // WHEN: mappingToKeyLabelSelects 함수를 호출
    const result = mappingToKeyLabelSelects(input);

    // THEN: 결과가 [{ key: key, label: name }] 형태로 올바르게 매핑되었는지 확인
    expect(result).toEqual([
      { key: "key", label: "name1" },
      { key: "2", label: "name2" },
    ]);
    // THEN: 매핑된 key의 타입이 모두 string인지 확인
    expect(result.every(({ key }) => typeof key === "string")).toBe(true);
  });

  test("[{ key: x, label: y }] 형태는 [{ key: x, label: y }] 형태를 반환. (단, key에 매핑되는 타입은 string)", () => {
    // GIVEN: 'key'와 'label' 필드를 포함하는 입력 배열을 준비 (이미 최종 형태, key는 string/number 혼합)
    const input = [
      { key: 1, label: "label1" },
      { key: "2", label: "label2" },
    ];

    // WHEN: mappingToKeyLabelSelects 함수를 호출
    const result = mappingToKeyLabelSelects(input);

    // THEN: 결과가 기존 형태 그대로 유지되고 key가 string으로 변환되었는지 확인
    expect(result).toEqual([
      { key: "1", label: "label1" },
      { key: "2", label: "label2" },
    ]);
    // THEN: 매핑된 key의 타입이 모두 string인지 확인
    expect(result.every(({ key }) => typeof key === "string")).toBe(true);
  });

  test("key가 null/undefined인 아이템은 제거되고 [{ key: x, label: y }] 형태를 반환. (단, key에 매핑되는 타입은 string)", () => {
    // GIVEN: key에 매핑될 수 있는 필드(code, key, id) 중 일부가 null 또는 undefined인 입력 배열을 준비
    const input = [
      { code: null, name: "Code" }, // DESC: 제거 대상 (code가 null)
      { key: 1, label: "OK" }, // DESC: 정상 매핑 대상
      { key: null, label: "NG" }, // DESC: 제거 대상 (key가 null)
      { id: undefined, name: "NG2" }, // DESC: 제거 대상 (id가 undefined)
    ];

    // NOTE: mappingToKeyLabelSelects의 key, code, id가 undefined 혹은 null 타입을 허용하지 않아 as any로 타입 단언
    // WHEN: mappingToKeyLabelSelects 함수를 호출
    const result = mappingToKeyLabelSelects(input as any);

    // THEN: 유효한 아이템만 최종 [{ key: string, label: string }] 형태로 남아 있는지 확인
    expect(result).toEqual([{ key: "1", label: "OK" }]);
    // THEN: 남은 아이템의 key 타입이 string인지 확인
    expect(result[0].key).toBeTypeOf("string");
  });
});
