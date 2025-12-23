import { describe, expect, expectTypeOf, it, test } from "vitest";

import type { Languages } from "@packages/types";
import {
  findLookupTableLabel,
  getLiteralArrayFromKeyPair,
  getValueFromKeyPair,
} from "@packages/utils/method";

describe("method Test", () => {
  describe("findLookupTableLabel Test", () => {
    const translated = "Translated" as Languages;

    describe("nullable return Test", () => {
      // GIVEN: 테스트에 사용될 룩업 리스트를 준비
      const list = [{ key: "key", label: translated }] as const;

      // GIVEN: key가 null, undefined이거나 리스트에 없는 경우를 준비
      it.each([
        { description: "key가 undefined인 경우", key: undefined, list },
        { description: "key가 null인 경우", key: null, list },
        {
          description: "list 내 key의 value가 일치하지 않는 경우",
          key: "key2",
          list,
        },
      ])("$description, null을 반환", ({ key, list }) => {
        // WHEN: findLookupTableLabel 함수를 호출
        // THEN: 유효하지 않거나 일치하지 않는 키에 대해 null을 반환하는지 확인
        expect(findLookupTableLabel({ list, key })).toBeNull();
      });
    });

    describe("key의 타입 Test", () => {
      // GIVEN: key 타입이 string일 때와 number일 때의 리스트와 입력 key를 준비
      it.each([
        {
          description: "key의 타입이 string일 때",
          key: "key",
          list: [{ key: "key", label: translated }] as const,
        },
        {
          description: "key의 타입이 number일 때",
          key: 1,
          list: [{ key: 1, label: translated }] as const,
        },
      ])(
        "$description, list 내 key의 value가 일치한다면 list의 label을 반환",
        ({ key, list }) => {
          // WHEN: findLookupTableLabel 함수를 호출
          expect(
            // DESC: NOTE: key의 타입이 as로 좁아지면서 발생하는 타입 충돌을 방지하기 위해 제네릭 T 타입을 명시
            findLookupTableLabel<{ key: string | number; label: Languages }>({
              list,
              key,
            }),
          ).toBe(translated);
          // THEN: key에 해당하는 label이 올바르게 반환되었는지 확인
        },
      );
    });
  });

  describe("getValueFromKeyPair Test", () => {
    describe("undefined return Test", () => {
      // GIVEN: 키-값 쌍 객체를 준비
      const pair = { 0: "corporate", 1: "individual" } as const;

      // GIVEN: 유효하지 않은 value(key) 입력 케이스를 준비
      it.each([
        {
          description: "value가 null일 경우",
          value: null,
          pair,
        },
        {
          description: "value가 undefined일 경우",
          value: undefined,
          pair,
        },
        {
          description: "value가 pair 내 포함되지 않는 경우",
          value: 2,
          pair,
        },
      ])("$description, undefined를 반환", ({ pair, value }) => {
        // WHEN: getValueFromKeyPair 함수를 호출
        // THEN: 유효하지 않거나 일치하지 않는 키(value)에 대해 undefined를 반환하는지 확인
        expect(
          getValueFromKeyPair({ pair, value, returnAsString: false }),
        ).toBeUndefined();
      });
    });

    describe("returnAsString에 따른 Test", () => {
      // GIVEN: 키-값 쌍 객체를 준비
      const pair = { 0: "corporate", 1: "individual" } as const;

      test("returnAsString이 true이면, string 타입을 반환", () => {
        // WHEN: returnAsString: true로 함수를 호출
        const result = getValueFromKeyPair({
          pair,
          value: 0,
          returnAsString: true,
        });

        // DESC: Then (검증-타입): 컴파일 단계에서 결과 타입이 string | undefined로 추론되는지 확인
        expectTypeOf(result).toEqualTypeOf<string | undefined>();

        // DESC: Then (검증-값): 실제 반환 값이 올바른지 확인
        expect(result).toBe("corporate");
      });
      test("returnAsString이 false이면, pair의 value(as T[keyof T]) 타입을 반환", () => {
        // WHEN: returnAsString: false로 함수를 호출
        const result = getValueFromKeyPair({
          pair,
          value: 0,
          returnAsString: false,
        });

        // GIVEN: pair의 값들로 구성된 유니언 타입 (예: "corporate" | "individual")을 정의
        type PairValueType = (typeof pair)[keyof typeof pair];

        // DESC: Then (검증-타입): 컴파일 단계에서 결과 타입이 pair의 값 타입 | undefined로 추론되는지 확인
        expectTypeOf(result).toEqualTypeOf<PairValueType | undefined>();

        // DESC: Then (검증-값): 실제 반환 값이 올바른지 확인
        expect(result).toBe("corporate");
      });
    });

    describe("value의 타입 Test", () => {
      // GIVEN: key가 number인 pair와 key가 string인 pair를 준비
      const numberPair = { 0: "corporate", 1: "individual" } as const;
      const stringPair = {
        corporate: "corporate",
        individual: "individual",
      } as const;

      it.each([
        {
          description: "value의 타입이 string일 때",
          value: "corporate",
          pair: stringPair,
        },
        {
          description: "value의 타입이 number일 때",
          value: 0,
          pair: numberPair,
        },
      ])(
        "$description, pair 내 key가 일치한다면 pair의 value를 반환",
        ({ value, pair }) => {
          // WHEN: getValueFromKeyPair 함수를 호출
          // THEN: key 타입에 상관없이 일치하는 value를 올바르게 반환하는지 확인
          expect(
            getValueFromKeyPair({ pair, value, returnAsString: false }),
          ).toBe("corporate");
        },
      );
    });
  });

  describe("getLiteralArrayFromKeyPair Test", () => {
    const cases: Array<{
      description: string;
      expected: string[];
      keyPair: Record<string | number, string>;
    }> = [
      {
        description:
          "파라미터로 전달되는 keyPair가 string 타입의 key로 구성된 객체의 경우",
        // GIVEN: 숫자 키와 문자열 값으로 이루어진 객체 준비
        keyPair: {
          key1: "value1",
          key2: "value2",
          key3: "value3",
        } as Record<string, string>,
        expected: ["key1", "key2", "key3"],
      },
      {
        description:
          "파라미터로 전달되는 keyPair가 number 타입의 key로 구성된 객체의 경우",
        // GIVEN: 숫자 키와 문자열 값으로 이루어진 객체 준비
        keyPair: {
          1: "value1",
          2: "value2",
          3: "value3",
        },
        expected: ["1", "2", "3"],
      },
      {
        description:
          "파라미터로 전달되는 keyPair가 string | number의 복합적인 타입의 key로 구성된 객체의 경우",
        // GIVEN: 숫자 키와 문자열 값으로 이루어진 객체 준비
        keyPair: {
          1: "value1",
          key2: "value2",
          3: "value3",
        },
        expected: ["1", "3", "key2"],
      },
    ];
    it.each(cases)(
      "$description, 해당 key들을 문자열 배열을 반환해야 함",
      ({ keyPair, expected }) => {
        // WHEN: 실행
        const result = getLiteralArrayFromKeyPair(keyPair);

        expect(result).toEqual(expected);
        // THEN: 반환된 값이 배열인지 확인
        expect(Array.isArray(result)).toBe(true);
      },
    );

    test("파라미터로 전달되는 keyPair에 빈 객체를 전달할 경우, 빈 배열을 반환해야 함", () => {
      // GIVEN: 빈 객체 준비
      const keyPair = {} as Record<string | number, string>;

      // WHEN: 실행
      const result = getLiteralArrayFromKeyPair(keyPair);

      // THEN: 빈 배열이 반환되는지 확인
      expect(result).toEqual([]);
      // THEN: 반환된 값이 배열인지 확인
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
