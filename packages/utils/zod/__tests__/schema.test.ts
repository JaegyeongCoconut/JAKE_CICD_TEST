import { describe, expect, it, test } from "vitest";
import z from "zod";

import { COMMON_ERROR_MESSAGE } from "@packages/constants/error/message";
import { SCHEMA } from "@packages/utils/zod/schema";

//NOTE: 1. 타입 에러 > Throw만 확인
//NOTE: 2. 빈문자열, 공백 > 메세지 문구 검사 + 문자 받아서 처리하는 것들은 > 문자 받은거 출력되는지만 확인

describe("schema Test", () => {
  describe("STRING Test", () => {
    describe("DEFAULT Test", () => {
      // GIVEN: 테스트에서 사용할 고정된 스키마 정의
      const stringSchema = SCHEMA.STRING.DEFAULT;

      it.each([
        { input: "hello", expected: "hello" },
        { input: " hello ", expected: "hello" },
        { input: "", expected: "" },
        { input: "  ", expected: "" },
      ])("$input을 입력하면 $expected를 반환", ({ input, expected }) => {
        // WHEN: 검증 결과를 객체로 반환
        const result = stringSchema.safeParse(input);

        // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
        expect(result.success).toBe(true);
        expect(result.data).toStrictEqual(expected);
      });

      it.each([
        { input: null, description: "null" },
        { input: undefined, description: "undefined" },
        { input: 123, description: "number" },
        { input: false, description: "boolean" },
        { input: [], description: "array" },
      ])(
        "허용되지 않는 타입($description)을 입력하면 에러가 발생",
        ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = stringSchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );
    });

    describe("REQUIRED Test", () => {
      const stringSchema = SCHEMA.STRING.REQUIRED;

      it.each([
        { input: "hello", expected: "hello" },
        { input: " hello ", expected: "hello" },
      ])("$input을 입력하면 $expected를 반환", ({ input, expected }) => {
        // WHEN: 검증 결과를 객체로 반환
        const result = stringSchema.safeParse(input);

        // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
        expect(result.success).toBe(true);
        expect(result.data).toBe(expected);
      });

      it.each([
        { input: null, description: "null" },
        { input: undefined, description: "undefined" },
        { input: 123, description: "number" },
        { input: false, description: "boolean" },
        { input: [], description: "array" },
      ])(
        "허용되지 않는 타입($description)을 입력하면 에러가 발생",
        ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = stringSchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );

      it.each([
        { input: "  ", description: "공백 문자열" },
        { input: "", description: "빈 문자열" },
      ])(
        "$input($description)을 입력하면 필수값 에러가 발생하고 지정된 에러 메시지를 반환",
        ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = stringSchema.safeParse(input);

          // THEN: 검증 실패 반환 및 지정된 에러 메시지 반환
          expect(result.success).toBe(false);
          expect(result.error?.issues?.[0]?.message).toBe(
            COMMON_ERROR_MESSAGE.FIELD,
          );
        },
      );
    });

    describe("NULLABLE Test", () => {
      const stringSchema = SCHEMA.STRING.NULLABLE;

      it.each([
        { input: "hello", expected: "hello" },
        { input: "", expected: "" },
        { input: "  ", expected: "  " },
        { input: null, expected: null },
      ])("$input을 입력하면 $expected를 반환", ({ input, expected }) => {
        // WHEN: 검증 결과를 객체로 반환
        const result = stringSchema.safeParse(input);

        // THEN: 스키마 통과 확인 및 문자열 또는 null을 반환해야 함
        expect(result.success).toBe(true);
        expect(result.data).toStrictEqual(expected);
      });

      it.each([
        { input: undefined, description: "undefined" },
        { input: 123, description: "number" },
        { input: false, description: "boolean" },
        { input: [], description: "array" },
      ])(
        "허용되지 않는 타입($description)을 입력하면 에러가 발생",
        ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = stringSchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );
    });

    describe("LENGTH Test", () => {
      it.each([
        {
          input: "hello",
          expected: "hello",
          length: 5,
          message: "5자리여야 합니다",
        },
        {
          input: "   hello   ",
          expected: "hello",
          length: 5,
          message: "5자리여야 합니다",
        },
        {
          input: "test code ",
          expected: "test code",
          length: 9,
          message: "9자리여야 합니다",
        },
      ])(
        "$input을 입력하고 길이가 $length이면 $expected를 반환",
        ({ input, expected, length, message }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = SCHEMA.STRING.LENGTH({ length, message }).safeParse(
            input,
          );

          // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
          expect(result.success).toBe(true);
          expect(result.data).toStrictEqual(expected);
        },
      );

      it.each([
        {
          input: undefined,
          description: "undefined",
          length: 5,
          message: "5자리여야 합니다",
        },
        {
          input: 123,
          description: "number",
          length: 5,
          message: "5자리여야 합니다",
        },
        {
          input: false,
          description: "boolean",
          length: 5,
          message: "5자리여야 합니다",
        },
        {
          input: [],
          description: "array",
          length: 5,
          message: "5자리여야 합니다",
        },
      ])(
        "허용되지 않는 타입($description)을 입력하면 에러가 발생",
        ({ input, length, message }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = SCHEMA.STRING.LENGTH({ length, message }).safeParse(
            input,
          );

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );

      it.each([
        { input: "  ", length: 5, message: "5자리여야 합니다" },
        { input: "", length: 5, message: "5자리여야 합니다" },
      ])(
        "$input을 입력하면 필수값 에러가 발생하고 지정된 에러 메시지를 반환",
        ({ input, length, message }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = SCHEMA.STRING.LENGTH({ length, message }).safeParse(
            input,
          );

          // THEN: 검증 실패 반환 및 지정된 에러 메시지 반환
          expect(result.success).toBe(false);
          expect(result.error?.issues?.[0]?.message).toBe(
            COMMON_ERROR_MESSAGE.FIELD,
          );
        },
      );

      it.each([
        {
          input: "hello",
          length: 6,
          message: "6자리여야 합니다",
        },
        {
          input: "test code",
          length: 6,
          message: "6자리여야 합니다",
        },
      ])(
        "$input을 입력했을 때 길이가 $length가 아니면 전달받은 message 값이 반환됨",
        ({ input, length, message }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = SCHEMA.STRING.LENGTH({ length, message }).safeParse(
            input,
          );

          // THEN: 검증 실패 반환 및 전달받은 에러 메시지 반환
          expect(result.success).toBe(false);
          expect(result.error?.issues?.[0]?.message).toBe(message);
        },
      );
    });

    describe("MIN Test", () => {
      it.each([
        {
          input: "hello",
          expected: "hello",
          length: 5,
          message: "최소 5자리여야 합니다",
        },
        {
          input: "   hello   ",
          expected: "hello",
          length: 5,
          message: "최소 5자리여야 합니다",
        },
        {
          input: "test code ",
          expected: "test code",
          length: 6,
          message: "최소 6자리여야 합니다",
        },
      ])(
        "$input을 입력하고 최소 길이가 $length이면 $expected를 반환",
        ({ input, expected, length, message }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = SCHEMA.STRING.MIN({ length, message }).safeParse(
            input,
          );

          // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
          expect(result.success).toBe(true);
          expect(result.data).toStrictEqual(expected);
        },
      );

      it.each([
        {
          input: undefined,
          description: "undefined",
          length: 5,
          message: "최소 5자리여야 합니다",
        },
        {
          input: 123,
          description: "number",
          length: 5,
          message: "최소 5자리여야 합니다",
        },
        {
          input: false,
          description: "boolean",
          length: 5,
          message: "최소 5자리여야 합니다",
        },
        {
          input: [],
          description: "array",
          length: 5,
          message: "최소 5자리여야 합니다",
        },
      ])(
        "허용되지 않는 타입($description)을 입력하면 에러가 발생",
        ({ input, length, message }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = SCHEMA.STRING.MIN({ length, message }).safeParse(
            input,
          );

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );

      it.each([
        {
          input: "  hello    ",
          length: 6,
          message: "최소 6자리여야 합니다",
        },
        {
          input: "hello",
          length: 6,
          message: "최소 6자리여야 합니다",
        },
      ])(
        "$input을 입력하고 최소 길이가 $length가 아니면 전달받은 message 값을 반환",
        ({ input, length, message }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = SCHEMA.STRING.MIN({ length, message }).safeParse(
            input,
          );

          // THEN: 검증 실패 반환 및 전달받은 에러 메시지 반환
          expect(result.success).toBe(false);
          expect(result.error?.issues?.[0]?.message).toBe(message);
        },
      );
    });

    describe("REQUIRED MIN Test", () => {
      it.each([
        {
          input: "hello",
          expected: "hello",
          length: 5,
          message: "최소 5자리여야 합니다",
        },
        {
          input: "   hello   ",
          expected: "hello",
          length: 5,
          message: "최소 5자리여야 합니다",
        },
        {
          input: "test code ",
          expected: "test code",
          length: 6,
          message: "최소 6자리여야 합니다",
        },
      ])(
        "$input을 입력하고 최소 길이가 $length이면 $expected를 반환",
        ({ input, expected, length, message }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = SCHEMA.STRING.REQUIRED_MIN({
            length,
            message,
          }).safeParse(input);

          // THEN: 공백이 제거되고 지정한 길이 이상의 문자열을 반환해야 함
          expect(result.success).toBe(true);
          expect(result.data).toStrictEqual(expected);
        },
      );

      it.each([
        { input: "  ", length: 5, message: "최소 5자리여야 합니다" },
        { input: "", length: 5, message: "최소 5자리여야 합니다" },
      ])(
        "$input을 입력하면 필수값 에러가 발생하고 지정된 에러 메시지를 반환",
        ({ input, length, message }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = SCHEMA.STRING.REQUIRED_MIN({
            length,
            message,
          }).safeParse(input);

          // THEN: 검증 실패 반환 및 지정된 에러 메시지 반환
          expect(result.success).toBe(false);
          expect(result.error?.issues?.[0]?.message).toBe(
            COMMON_ERROR_MESSAGE.FIELD,
          );
        },
      );

      it.each([
        {
          input: undefined,
          description: "undefined",
          length: 5,
          message: "최소 5자리여야 합니다",
        },
        {
          input: 123,
          description: "number",
          length: 5,
          message: "최소 5자리여야 합니다",
        },
        {
          input: false,
          description: "boolean",
          length: 5,
          message: "최소 5자리여야 합니다",
        },
        {
          input: [],
          description: "array",
          length: 5,
          message: "최소 5자리여야 합니다",
        },
      ])(
        "허용되지 않는 타입($description)을 입력하면 에러가 발생",
        ({ input, length, message }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = SCHEMA.STRING.REQUIRED_MIN({
            length,
            message,
          }).safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );

      it.each([
        {
          input: "  hello    ",
          length: 6,
          message: "최소 6자리여야 합니다",
        },
        {
          input: "hello",
          length: 6,
          message: "최소 6자리여야 합니다",
        },
      ])(
        "'$input'을 입력하고 최소 길이가 $length가 아니면 min 에러가 발생하고 전달받은 '$message'라는 에러메세지를 반환",
        ({ input, length, message }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = SCHEMA.STRING.REQUIRED_MIN({
            length,
            message,
          }).safeParse(input);

          // THEN: 검증 실패 반환 및 전달받은 에러 메시지 반환
          expect(result.success).toBe(false);
          expect(result.error?.issues?.[0]?.message).toBe(message);
        },
      );
    });

    describe("MAX Test", () => {
      it.each([
        {
          input: "hello",
          expected: "hello",
          length: 5,
          message: "최대 5자리여야 합니다",
        },
        {
          input: "   hello   ",
          expected: "hello",
          length: 5,
          message: "최대 5자리여야 합니다",
        },
        {
          input: "test code ",
          expected: "test code",
          length: 10,
          message: "최대 10자리여야 합니다",
        },
      ])(
        "$input을 입력하고 최대 길이가 $length이면 $expected를 반환",
        ({ input, expected, length, message }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = SCHEMA.STRING.MAX({ length, message }).safeParse(
            input,
          );

          // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
          expect(result.success).toBe(true);
          expect(result.data).toStrictEqual(expected);
        },
      );

      it.each([
        {
          input: undefined,
          description: "undefined",
          length: 5,
          message: "최대 5자리여야 합니다",
        },
        {
          input: 123,
          description: "number",
          length: 5,
          message: "최대 5자리여야 합니다",
        },
        {
          input: false,
          description: "boolean",
          length: 5,
          message: "최대 5자리여야 합니다",
        },
        {
          input: [],
          description: "array",
          length: 5,
          message: "최대 5자리여야 합니다",
        },
      ])(
        "허용되지 않는 타입($description)을 입력하면 에러가 발생",
        ({ input, length, message }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = SCHEMA.STRING.MAX({ length, message }).safeParse(
            input,
          );

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );

      it.each([
        {
          input: "  hello    ",
          length: 3,
          message: "최대 3자리여야 합니다",
        },
        {
          input: "hello",
          length: 3,
          message: "최대 3자리여야 합니다",
        },
      ])(
        "$input을 입력하고 최대 길이가 $length가 아니면 전달받은 message 값을 반환",
        ({ input, length, message }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = SCHEMA.STRING.MAX({ length, message }).safeParse(
            input,
          );

          // THEN: 검증 실패 반환 및 전달받은 에러 메시지 반환
          expect(result.success).toBe(false);
          expect(result.error?.issues?.[0]?.message).toBe(message);
        },
      );
    });

    describe("MIN_MAX Test", () => {
      it.each([
        {
          input: "hello",
          expected: "hello",
          minLength: 5,
          minMessage: "최소 5자리여야 합니다",
          maxLength: 10,
          maxMessage: "최대 10자리여야 합니다",
        },
        {
          input: "   hello   ",
          expected: "hello",
          minLength: 5,
          minMessage: "최소 5자리여야 합니다",
          maxLength: 10,
          maxMessage: "최대 10자리여야 합니다",
        },
        {
          input: "test code ",
          expected: "test code",
          minLength: 6,
          minMessage: "최소 6자리여야 합니다",
          maxLength: 10,
          maxMessage: "최대 10자리여야 합니다",
        },
      ])(
        "'$input'을 입력하고 최소 길이가 $minLength이고, 최대 길이가 $maxLength이면 '$expected'를 반환",
        ({ input, expected, minLength, minMessage, maxLength, maxMessage }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = SCHEMA.STRING.MIN_MAX({
            minLength,
            minMessage,
            maxLength,
            maxMessage,
          }).safeParse(input);

          // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
          expect(result.success).toBe(true);
          expect(result.data).toStrictEqual(expected);
        },
      );

      it.each([
        {
          input: "  ",
          minLength: 5,
          minMessage: "최소 5자리여야 합니다",
          maxLength: 10,
          maxMessage: "최대 10자리여야 합니다",
        },
        {
          input: "",
          minLength: 5,
          minMessage: "최소 5자리여야 합니다",
          maxLength: 10,
          maxMessage: "최대 10자리여야 합니다",
        },
      ])(
        "$input을 입력하면 필수값 에러가 발생하고 지정된 에러 메시지를 반환",
        ({ input, minLength, minMessage, maxLength, maxMessage }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = SCHEMA.STRING.MIN_MAX({
            minLength,
            minMessage,
            maxLength,
            maxMessage,
          }).safeParse(input);

          // THEN: 검증 실패 반환 및 지정된 에러 메시지 반환
          expect(result.success).toBe(false);
          expect(result.error?.issues?.[0]?.message).toBe(
            COMMON_ERROR_MESSAGE.FIELD,
          );
        },
      );

      it.each([
        {
          input: undefined,
          description: "undefined",
          minLength: 5,
          minMessage: "최소 5자리여야 합니다",
          maxLength: 10,
          maxMessage: "최대 10자리여야 합니다",
        },
        {
          input: 123,
          description: "number",
          minLength: 5,
          minMessage: "최소 5자리여야 합니다",
          maxLength: 10,
          maxMessage: "최대 10자리여야 합니다",
        },
        {
          input: false,
          description: "boolean",
          minLength: 5,
          minMessage: "최소 5자리여야 합니다",
          maxLength: 10,
          maxMessage: "최대 10자리여야 합니다",
        },
        {
          input: [],
          description: "array",
          minLength: 5,
          minMessage: "최소 5자리여야 합니다",
          maxLength: 10,
          maxMessage: "최대 10자리여야 합니다",
        },
      ])(
        "허용되지 않는 타입($description)을 입력하면 에러가 발생",
        ({ input, minLength, minMessage, maxLength, maxMessage }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = SCHEMA.STRING.MIN_MAX({
            minLength,
            minMessage,
            maxLength,
            maxMessage,
          }).safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );

      test("'err'을 입력하고 최소 길이가 6이 아니면 '$minMessage'을 반환", () => {
        const input = {
          input: "err",
          minLength: 6,
          minMessage: "최소 6자리여야 합니다",
          maxLength: 10,
          maxMessage: "최대 10자리여야 합니다",
        };

        // WHEN: 검증 결과를 객체로 반환
        const result = SCHEMA.STRING.MIN_MAX({
          minLength: input.minLength,
          minMessage: input.minMessage,
          maxLength: input.maxLength,
          maxMessage: input.maxMessage,
        }).safeParse(input.input);

        // THEN: 검증 실패 반환 및 전달받은 에러 메시지 반환
        expect(result.success).toBe(false);
        expect(result.error?.issues?.[0]?.message).toBe(input.minMessage);
      });

      test("'max error message'을 입력하고 최대 길이가 10가 아니면 전달받은 message 값을 반환", () => {
        const input = {
          input: "max error message",
          minLength: 6,
          minMessage: "최소 6자리여야 합니다",
          maxLength: 10,
          maxMessage: "최대 10자리여야 합니다",
        };

        // WHEN: 검증 결과를 객체로 반환
        const result = SCHEMA.STRING.MIN_MAX({
          minLength: input.minLength,
          minMessage: input.minMessage,
          maxLength: input.maxLength,
          maxMessage: input.maxMessage,
        }).safeParse(input.input);

        // THEN: 검증 실패 반환 및 전달받은 에러 메시지 반환
        expect(result.success).toBe(false);
        expect(result.error?.issues?.[0]?.message).toBe(input.maxMessage);
      });
    });
  });

  describe("BOOLEAN Test", () => {
    test("'true'을 입력하면 그대로를 반환", () => {
      // WHEN: 검증 결과를 객체로 반환
      const result = SCHEMA.BOOLEAN.safeParse(true);

      // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
      expect(result.success).toBe(true);
      expect(result.data).toBe(true);
    });

    it.each([
      { input: null, description: "null" },
      { input: undefined, description: "undefined" },
      { input: 123, description: "number" },
      { input: "hello", description: "string" },
    ])(
      "허용되지 않는 타입($description)을 입력하면 에러가 발생",
      ({ input }) => {
        // WHEN: 검증 결과를 객체로 반환
        const result = SCHEMA.BOOLEAN.safeParse(input);

        // THEN: 검증 실패 반환
        expect(result.success).toBe(false);
      },
    );
  });

  describe("NUMBER Test", () => {
    const numberSchema = SCHEMA.NUMBER;

    it.each([
      { input: 0, expected: 0 },
      { input: 123, expected: 123 },
      { input: -456, expected: -456 },
      { input: 3.14, expected: 3.14 },
    ])("$input을 입력하면 $expected를 반환", ({ input, expected }) => {
      // WHEN: 검증 결과를 객체로 반환
      const result = numberSchema.safeParse(input);

      // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
      expect(result.success).toBe(true);
      expect(result.data).toBe(expected);
    });

    it.each([
      { input: null, description: "null" },
      { input: undefined, description: "undefined" },
      { input: false, description: "boolean" },
      { input: "hello", description: "string" },
    ])(
      "허용되지 않는 타입($description)을 입력하면 에러가 발생",
      ({ input }) => {
        // WHEN: 검증 결과를 객체로 반환
        const result = numberSchema.safeParse(input);

        // THEN: 검증 실패 반환
        expect(result.success).toBe(false);
      },
    );
  });

  describe("OBJECT Test", () => {
    // GIVEN: OBJECT 테스트에 사용할 고정된 내부 스키마 정의
    const innerSchema = { id: z.number(), name: z.string().trim() };

    describe("DEFAULT Test", () => {
      // GIVEN: 고정된 스키마 정의
      const objectSchema = SCHEMA.OBJECT.DEFAULT(innerSchema);

      it.each([
        {
          description: "숫자 + 문자열 객체",
          input: { id: 123, name: "hello" },
          expected: { id: 123, name: "hello" },
        },
        {
          description: "숫자 + 공백이 포함된 문자열 객체",
          input: { id: 123, name: "  Test User  " },
          expected: { id: 123, name: "Test User" },
        },
        {
          description: "숫자 + 빈 문자열 객체",
          input: { id: 0, name: "" },
          expected: { id: 0, name: "" },
        },
        {
          description: "숫자 + 공백 문자열 객체",
          input: { id: 0, name: "  " },
          expected: { id: 0, name: "" },
        },
      ])(
        "$description을 충족하는 $input을 입력한 경우 $expected를 반환",
        ({ input, expected }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = objectSchema.safeParse(input);

          // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
          expect(result.success).toBe(true);
          expect(result.data).toStrictEqual(expected);
        },
      );

      it.each([
        { input: null, description: "null" },
        { input: undefined, description: "undefined" },
        { input: "hello", description: "string" },
        { input: 123, description: "number" },
        { input: false, description: "boolean" },
        { input: [], description: "array" },
      ])(
        "허용되지 않는 타입($description)을 입력하면 에러가 발생",
        ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = objectSchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );

      it.each([
        { input: { name: "hello" }, missingField: "id" },
        { input: { id: 123 }, missingField: "name" },
      ])("필수 필드($missingField)가 누락된 경우 에러가 발생", ({ input }) => {
        // WHEN: 검증 결과를 객체로 반환
        const result = objectSchema.safeParse(input);

        // THEN: 검증 실패 반환
        expect(result.success).toBe(false);
      });

      it.each([
        {
          input: { id: null, name: "hello" },
          description: "id가 null",
        },
        {
          input: { id: "hello", name: "hello" },
          description: "id가 문자열",
        },
        {
          input: { id: 123, name: null },
          description: "name이 null",
        },
        {
          input: { id: 123, name: false },
          description: "name이 boolean",
        },
        {
          input: { id: 123, name: [] },
          description: "name이 빈 배열",
        },
        {
          input: { id: 123, name: { id: "hello" } },
          description: "name이 객체",
        },
      ])(
        "내부 필드($description)가 정해진 타입이 아닌 경우 에러가 발생",
        ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = objectSchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );
    });

    describe("NULLABLE Test", () => {
      // GIVEN: 고정된 스키마 정의
      const objectSchema = SCHEMA.OBJECT.NULLABLE(innerSchema);

      it.each([
        {
          description: "숫자 + 문자열 객체",
          input: { id: 123, name: "hello" },
          expected: { id: 123, name: "hello" },
        },
        {
          description: "숫자 + 공백이 포함된 문자열 객체",
          input: { id: 123, name: "  Test User  " },
          expected: { id: 123, name: "Test User" },
        },
        {
          description: "숫자 + 빈 문자열 객체",
          input: { id: 0, name: "" },
          expected: { id: 0, name: "" },
        },
        {
          description: "숫자 + 공백 문자열 객체",
          input: { id: 0, name: "  " },
          expected: { id: 0, name: "" },
        },
        { description: "null", input: null, expected: null },
      ])(
        "$description을 충족하는 $input을 입력한 경우 $expected를 반환",
        ({ input, expected }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = objectSchema.safeParse(input);

          // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
          expect(result.success).toBe(true);
          expect(result.data).toStrictEqual(expected);
        },
      );

      it.each([
        { input: undefined, description: "undefined" },
        { input: "hello", description: "string" },
        { input: 123, description: "number" },
        { input: false, description: "boolean" },
        { input: [], description: "array" },
      ])(
        "허용되지 않는 타입($description)을 입력하면 에러가 발생",
        ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = objectSchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );

      it.each([
        { input: { name: "hello" }, missingField: "id" },
        { input: { id: 123 }, missingField: "name" },
        { input: {}, missingField: "id, name" },
      ])("필수 필드($missingField)가 누락된 경우 에러가 발생", ({ input }) => {
        // WHEN: 검증 결과를 객체로 반환
        const result = objectSchema.safeParse(input);

        // THEN: 검증 실패 반환
        expect(result.success).toBe(false);
      });

      it.each([
        {
          input: { id: null, name: "hello" },
          description: "id가 null",
        },
        {
          input: { id: "hello", name: "hello" },
          description: "id가 문자열",
        },
        {
          input: { id: 123, name: null },
          description: "name이 null",
        },
        {
          input: { id: 123, name: false },
          description: "name이 boolean",
        },
        {
          input: { id: 123, name: [] },
          description: "name이 빈 배열",
        },
        {
          input: { id: 123, name: { id: "hello" } },
          description: "name이 객체",
        },
      ])(
        "내부 필드($description)가 정해진 타입이 아닌 경우 에러가 발생",
        ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = objectSchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );
    });
  });

  describe("ARRAY Test", () => {
    describe("DEFAULT Test", () => {
      // GIVEN: 고정된 스키마 정의
      const arraySchema = SCHEMA.ARRAY.DEFAULT(z.string().trim());

      it.each([
        {
          description: "문자열만 있는 배열",
          input: ["hello"],
          expected: ["hello"],
        },
        {
          description: "공백이 포함된 문자열 배열",
          input: ["hello  "],
          expected: ["hello"],
        },
        {
          description: "문자열 배열",
          input: ["hello", "hi"],
          expected: ["hello", "hi"],
        },
        {
          description: "빈 문자열 배열",
          input: [""],
          expected: [""],
        },
        { description: "빈 배열", input: [], expected: [] },
      ])(
        "$description을 충족하는 $input을 입력한 경우 $expected를 반환",
        ({ input, expected }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = arraySchema.safeParse(input);

          // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
          expect(result.success).toBe(true);
          expect(result.data).toStrictEqual(expected);
        },
      );

      it.each([
        { input: null, description: "null" },
        { input: undefined, description: "undefined" },
        { input: "hello", description: "string" },
        { input: 123, description: "number" },
        { input: false, description: "boolean" },
      ])(
        "허용되지 않는 타입($description)을 입력하면 에러가 발생",
        ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = arraySchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );

      it.each([
        { input: [123], description: "number" },
        { input: [undefined], description: "undefined" },
        { input: [false], description: "boolean" },
        { input: [null], description: "null" },
        {
          input: ["client", null],
          description: "유효한 타입과 잘못된 타입이 섞인 배열",
        },
      ])(
        "배열 내 허용되지 않은 타입($description)이 포함된 경우 에러 발생",
        ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = arraySchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );
    });

    describe("STRING Test", () => {
      describe("DEFAULT Test", () => {
        const arraySchema = SCHEMA.ARRAY.STRING.DEFAULT;

        it.each([
          {
            description: "문자열만 있는 배열",
            input: ["hello"],
            expected: ["hello"],
          },
          {
            description: "공백이 포함된 문자열 배열",
            input: ["hello  "],
            expected: ["hello  "],
          },
          {
            description: "문자열 배열",
            input: ["hello", "hi"],
            expected: ["hello", "hi"],
          },
          { description: "빈 문자열 배열", input: [""], expected: [""] },
          { description: "빈 배열", input: [], expected: [] },
        ])(
          "$description을 충족하는 $input을 입력한 경우 $expected를 반환",
          ({ input, expected }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
            expect(result.success).toBe(true);
            expect(result.data).toStrictEqual(expected);
          },
        );

        it.each([
          { input: null },
          { input: undefined },
          { input: "hello" },
          { input: 123 },
          { input: false },
        ])("배열이 아닌 경우 에러 발생", ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = arraySchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        });

        it.each([
          { input: [123], description: "number" },
          { input: [undefined], description: "undefined" },
          { input: [false], description: "boolean" },
          { input: [null], description: "null" },
          {
            input: ["client", null],
            description: "유효한 타입과 잘못된 타입이 섞인 배열",
          },
        ])(
          "배열 내 허용되지 않은 타입($description)이 포함된 경우 에러 발생",
          ({ input }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 실패 반환
            expect(result.success).toBe(false);
          },
        );
      });

      describe("NULLABLE Test", () => {
        const arraySchema = SCHEMA.ARRAY.STRING.NULLABLE;

        it.each([
          {
            description: "문자열만 있는 배열",
            input: ["hello"],
            expected: ["hello"],
          },
          {
            description: "공백이 포함된 문자열 배열",
            input: ["hello  "],
            expected: ["hello  "],
          },
          {
            description: "문자열 배열",
            input: ["hello", "hi"],
            expected: ["hello", "hi"],
          },
          { description: "빈 문자열 배열", input: [""], expected: [""] },
          { description: "빈 배열", input: [], expected: [] },
          { description: "null", input: null, expected: null },
        ])(
          "$description을 충족하는 $input을 입력한 경우 $expected를 반환",
          ({ input, expected }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
            expect(result.success).toBe(true);
            expect(result.data).toStrictEqual(expected);
          },
        );

        it.each([
          { input: undefined },
          { input: "hello" },
          { input: 123 },
          { input: false },
        ])("배열이 아닌 경우 에러 발생", ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = arraySchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        });

        it.each([
          { input: [123], description: "number" },
          { input: [undefined], description: "undefined" },
          { input: [false], description: "boolean" },
          { input: [null], description: "배열 내부의 null" },
          {
            input: ["client", 4],
            description: "유효한 타입과 잘못된 타입이 섞인 배열",
          },
        ])(
          "배열 내 허용되지 않은 타입($description)이 포함된 경우 에러 발생",
          ({ input }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 실패 반환
            expect(result.success).toBe(false);
          },
        );
      });

      describe("REQUIRED_NULLABLE Test", () => {
        const arraySchema = SCHEMA.ARRAY.STRING.REQUIRED_NULLABLE;

        it.each([
          {
            description: "string",
            input: ["hello"],
            expected: ["hello"],
          },
          {
            description: "공백이 포함된 string 배열",
            input: ["hello", " hello "],
            expected: ["hello", "hello"],
          },
          { description: "null", input: null, expected: null },
          { description: "빈 배열", input: [], expected: [] },
        ])(
          "$description을 충족하는 $input을 입력한 경우 $expected를 반환",
          ({ input, expected }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
            expect(result.success).toBe(true);
            expect(result.data).toStrictEqual(expected);
          },
        );

        it.each([
          { input: undefined },
          { input: "hello" },
          { input: 123 },
          { input: false },
          { input: { id: "hello", name: "hello" } },
        ])("배열이 아닌 경우 에러 발생", ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = arraySchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        });

        it.each([
          { input: ["  "], description: "공백" },
          { input: [""], description: "빈 문자열" },
        ])("string 타입이지만 $description인 경우 에러 발생", ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = arraySchema.safeParse(input);

          // THEN: 검증 실패 및 지정된 에러 메시지 반환
          expect(result.success).toBe(false);
          expect(result.error?.issues?.[0]?.message).toBe(
            COMMON_ERROR_MESSAGE.FIELD,
          );
        });

        it.each([
          { input: [123], description: "number" },
          { input: [null], description: "배열 내부의 null" },
          {
            input: ["client", { id: "hello" }],
            description: "유효한 값과 잘못된 값이 섞인 배열",
          },
          {
            input: [{ id: "hello", name: "hello" }],
            description: "object",
          },
        ])(
          "배열 내 허용되지 않은 타입($description)이 포함된 경우 에러 발생",
          ({ input }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 실패 반환
            expect(result.success).toBe(false);
          },
        );
      });
    });

    describe("UNION Test", () => {
      describe("STRING_FILE_NULLABLE", () => {
        const arraySchema = SCHEMA.ARRAY.UNION.STRING_FILE_NULLABLE;

        //NOTE: file 객체 생성
        const file1 = new File(["file1"], "file1.txt", { type: "text/plain" });
        const file2 = new File(["file2"], "file2.txt", { type: "text/plain" });

        it.each([
          {
            description: "문자열만 있는 배열",
            input: ["A", "B"],
            expected: ["A", "B"],
          },
          {
            description: "File 객체만 있는 배열",
            input: [file1, file2],
            expected: [file1, file2],
          },
          {
            description: "문자열과 File이 혼합된 배열",
            input: ["A", file1],
            expected: ["A", file1],
          },
          { description: "빈 배열", input: [], expected: [] },
          { description: "null", input: null, expected: null },
        ])(
          "$description을 충족하는 $input을 입력한 경우 $expected을 반환",
          ({ input, expected }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
            expect(result.success).toBe(true);
            expect(result.data).toStrictEqual(expected);
          },
        );

        it.each([
          { input: undefined, description: "undefined" },
          { input: "hello", description: "string" },
          { input: 123, description: "number" },
          { input: false, description: "boolean" },
          { input: { id: "hello", name: "hello" }, description: "object" },
        ])(
          "허용되지 않는 타입($description)을 입력하면 에러 발생",
          ({ input }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 실패 반환
            expect(result.success).toBe(false);
          },
        );

        it.each([
          { input: [undefined], description: "undefined" },
          { input: [null], description: "null" },
          { input: [123], description: "number" },
          { input: [false], description: "boolean" },
          { input: [{ id: "hello" }], description: "object" },
          {
            input: ["hello", 123, file1],
            description: "유효한 타입과 잘못된 타입이 섞인 배열",
          },
        ])(
          "배열 내 허용되지 않은 타입($description)이 포함된 경우 에러 발생",
          ({ input }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 실패 반환
            expect(result.success).toBe(false);
          },
        );
      });
    });

    describe("OBJECT Test", () => {
      describe("DEFAULT Test", () => {
        // GIVEN: 테스트에서 사용할 고정된 내부 스키마 정의
        const innerSchema = { id: z.number(), name: z.string().trim() };
        const arraySchema = SCHEMA.ARRAY.OBJECT.DEFAULT(innerSchema);

        it.each([
          {
            description: "단일 객체 배열",
            input: [{ id: 123, name: "hello" }],
            expected: [{ id: 123, name: "hello" }],
          },
          {
            description: "단일 객체 배열(빈 문자열 포함)",
            input: [{ id: 0, name: "" }],
            expected: [{ id: 0, name: "" }],
          },
          {
            description: "단일 객체 배열(공백 문자열 포함)",
            input: [{ id: 0, name: "  " }],
            expected: [{ id: 0, name: "" }],
          },
        ])(
          "$description을 충족하는 $input을 입력한 경우 $expected를 반환",
          ({ input, expected }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
            expect(result.success).toBe(true);
            expect(result.data).toStrictEqual(expected);
          },
        );

        it.each([
          { input: undefined, description: "undefined" },
          { input: null, description: "null" },
          { input: "hello", description: "string" },
          { input: 123, description: "number" },
          { input: false, description: "boolean" },
        ])(
          "허용되지 않는 타입($description)을 입력하면 에러 발생",
          ({ input }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 실패 반환
            expect(result.success).toBe(false);
          },
        );

        it.each([
          {
            input: [{ id: null, name: "hello" }],
            description: "id에 null",
          },
          {
            input: [{ id: "hello", name: "hello" }],
            description: "id에 문자열",
          },
          {
            input: [{ id: 123, name: null }],
            description: "name에 null",
          },
          {
            input: [{ id: 123, name: false }],
            description: "name에 boolean",
          },
          { input: null, description: "null" },
          {
            input: [{ id: 123, label: "hello" }],
            description: "허용되지 않은 key(label)",
          },
        ])(
          "배열 내 허용되지 않은 타입($description)이 포함된 경우 에러 발생",
          ({ input }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 실패 반환
            expect(result.success).toBe(false);
          },
        );
      });

      describe("NULLABLE Test", () => {
        // GIVEN: 테스트에서 사용할 고정된 내부 스키마 정의
        const innerSchema = { id: z.number(), name: z.string().trim() };
        const arraySchema = SCHEMA.ARRAY.OBJECT.NULLABLE(innerSchema);

        it.each([
          {
            description: "단일 객체 배열",
            input: [{ id: 123, name: "  Test User  " }],
            expected: [{ id: 123, name: "Test User" }],
          },
          {
            description: "단일 객체 배열(빈 문자열 포함)",
            input: [{ id: 0, name: "" }],
            expected: [{ id: 0, name: "" }],
          },
          {
            description: "단일 객체 배열(공백 문자열 포함)",
            input: [{ id: 0, name: "  " }],
            expected: [{ id: 0, name: "" }],
          },
          { description: "null", input: null, expected: null },
        ])(
          "$description을 충족하는 $input을 입력한 경우 $expected을 반환",
          ({ input, expected }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
            expect(result.success).toBe(true);
            expect(result.data).toStrictEqual(expected);
          },
        );

        it.each([
          { input: undefined, description: "undefined" },
          { input: "hello", description: "string" },
          { input: 123, description: "number" },
          { input: false, description: "boolean" },
        ])(
          "허용되지 않는 타입($description)을 입력하면 에러 발생",
          ({ input }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 실패 반환
            expect(result.success).toBe(false);
          },
        );

        it.each([
          { input: [undefined], description: "undefined" },
          { input: [null], description: "null" },
          { input: ["hello"], description: "string" },
          { input: [123], description: "number" },
          { input: [false], description: "boolean" },
        ])(
          "배열 내 허용되지 않은 타입($description)이 포함된 경우 에러 발생",
          ({ input }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 실패 반환
            expect(result.success).toBe(false);
          },
        );

        it.each([
          {
            input: [{ id: null, name: "hello" }],
            description: "id가 null",
          },
          {
            input: [{ id: "hello", name: "hello" }],
            description: "id가 문자열",
          },
          {
            input: [{ id: 123, name: null }],
            description: "name이 null",
          },
          {
            input: [{ id: 123, name: false }],
            description: "name이 boolean",
          },
          {
            input: [{ id: 123, name: { key: "hello" } }],
            description: "name이 객체",
          },
          {
            input: [{ id: 123, label: "hello" }],
            description: "허용되지 않은 key(label)",
          },
        ])(
          "배열의 내부 객체 필드($description)가 정해진 타입이 아닌 경우 에러 발생",
          ({ input }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 실패 반환
            expect(result.success).toBe(false);
          },
        );
      });

      describe("NULLABLE_ITEM Test", () => {
        // GIVEN: 테스트에서 사용할 고정된 내부 스키마 정의
        const innerSchema = { id: z.number(), name: z.string().trim() };
        const arraySchema = SCHEMA.ARRAY.OBJECT.NULLABLE_ITEM(innerSchema);

        it.each([
          {
            description: "단일 객체 배열",
            input: [{ id: 123, name: "  Test User  " }],
            expected: [{ id: 123, name: "Test User" }],
          },
          {
            description: "null 요소만 있는 배열",
            input: [null],
            expected: [null],
          },
          {
            description: "객체와 null이 혼합된 배열",
            input: [{ id: 1, name: "A" }, null, { id: 2, name: "B" }],
            expected: [{ id: 1, name: "A" }, null, { id: 2, name: "B" }],
          },
        ])(
          "$description을 충족하는 $input을 입력한 경우 $expected를 반환",
          ({ input, expected }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
            expect(result.success).toBe(true);
            expect(result.data).toStrictEqual(expected);
          },
        );

        it.each([
          { input: undefined, description: "undefined" },
          { input: null, description: "null" },
          { input: "hello", description: "string" },
          { input: 123, description: "number" },
          { input: false, description: "boolean" },
        ])(
          "허용되지 않는 타입($description)을 입력하면 에러 발생",
          ({ input }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 실패 반환
            expect(result.success).toBe(false);
          },
        );

        it.each([
          { input: [undefined], description: "undefined" },
          { input: ["hello"], description: "string" },
          { input: [123], description: "number" },
          { input: [false], description: "boolean" },
        ])(
          "배열 내 허용되지 않은 타입($description)이 포함된 경우 에러 발생",
          ({ input }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 실패 반환
            expect(result.success).toBe(false);
          },
        );

        it.each([
          {
            input: [{ id: null, name: "hello" }],
            description: "id가 null",
          },
          {
            input: [{ id: "hello", name: "hello" }],
            description: "id가 문자열",
          },
          {
            input: [{ id: 123, name: null }],
            description: "name이 null",
          },
          {
            input: [{ id: 123, name: false }],
            description: "name이 boolean",
          },
          {
            input: [{ id: 123, name: { key: "hello" } }],
            description: "name이 객체",
          },
          {
            input: [{ id: 123, label: "hello" }],
            description: "허용되지 않은 key(label)",
          },
        ])(
          "배열의 내부 객체 필드($description)가 정해진 타입이 아닌 경우 에러 발생",
          ({ input }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 실패 반환
            expect(result.success).toBe(false);
          },
        );
      });
    });

    describe("ENUM Test", () => {
      const ENUM_OBJECT_ARRAY = [
        { key: "client", label: "Move" },
        { key: "driver", label: "Hero" },
      ] as const;

      describe("DEFAULT Test", () => {
        // GIVEN: 테스트에서 사용할 고정된 스키마 정의
        const arraySchema = SCHEMA.ARRAY.ENUM.DEFAULT(
          ENUM_OBJECT_ARRAY.map(({ key }) => key),
        );

        it.each([
          { input: ["client"], expected: ["client"] },
          { input: ["driver"], expected: ["driver"] },
          { input: ["client", "driver"], expected: ["client", "driver"] },
        ])("입력값이 $input이라면 $expected를 반환", ({ input, expected }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = arraySchema.safeParse(input);

          // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
          expect(result.success).toBe(true);
          expect(result.data).toStrictEqual(expected);
        });

        it.each([
          { input: null, description: "null" },
          { input: undefined, description: "undefined" },
          { input: "hello", description: "string" },
          { input: 123, description: "number" },
          { input: false, description: "boolean" },
          { input: { key: "client" }, description: "object" },
        ])(
          "허용되지 않는 타입($description)을 입력하면 에러 발생",
          ({ input }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 실패 반환
            expect(result.success).toBe(false);
          },
        );

        it.each([
          {
            input: ["admin"],
            description: "정의되지 않은 string - enum 불일치",
          },
          { input: [123], description: "number 타입" },
          { input: [null], description: "null 타입" },
          {
            input: ["client", "unknown"],
            description: "유효한 값과 잘못된 값이 섞인 배열",
          },
        ])(
          "배열 내 허용되지 않은 값($description)이 포함된 경우 에러 발생",
          ({ input }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 실패 반환
            expect(result.success).toBe(false);
          },
        );
      });

      describe("NULLABLE Test", () => {
        // GIVEN: 테스트에서 사용할 고정된 스키마 정의
        const arraySchema = SCHEMA.ARRAY.ENUM.NULLABLE(
          ENUM_OBJECT_ARRAY.map(({ key }) => key),
        );

        it.each([
          { input: ["client"], expected: ["client"] },
          { input: ["driver"], expected: ["driver"] },
          { input: ["client", "driver"], expected: ["client", "driver"] },
          { input: null, expected: null },
        ])("입력값이 $input이라면 $expected를 반환", ({ input, expected }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = arraySchema.safeParse(input);

          // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
          expect(result.success).toBe(true);
          expect(result.data).toStrictEqual(expected);
        });

        it.each([
          { input: undefined, description: "undefined" },
          { input: "hello", description: "string" },
          { input: 123, description: "number" },
          { input: false, description: "boolean" },
          { input: { key: "client" }, description: "object" },
        ])(
          "허용되지 않는 타입($description)을 입력하면 에러 발생",
          ({ input }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 실패 반환
            expect(result.success).toBe(false);
          },
        );

        it.each([
          {
            input: ["admin"],
            description:
              "정의되지 않은 string - 정의된 enum 목록에 없는 string",
          },
          { input: [123], description: "number 타입" },
          { input: [null], description: "배열 내 null 타입" },
          {
            input: ["client", "unknown"],
            description:
              "유효한 값과 정의된 enum 목록에 없는 string이 섞인 배열",
          },
        ])(
          "배열 내 허용되지 않은 값($description)이 포함된 경우 에러 발생",
          ({ input }) => {
            // WHEN: 검증 결과를 객체로 반환
            const result = arraySchema.safeParse(input);

            // THEN: 검증 실패 반환
            expect(result.success).toBe(false);
          },
        );
      });
    });
  });

  describe("ENUM Test", () => {
    const ENUM_OBJECT_ARRAY = [
      { key: "client", label: "Move" },
      { key: "driver", label: "Hero" },
    ] as const;

    describe("DEFAULT Test", () => {
      // GIVEN: 테스트에서 사용할 고정된 스키마 정의
      const enumSchema = SCHEMA.ENUM.DEFAULT(
        ENUM_OBJECT_ARRAY.map(({ key }) => key),
      );

      it.each([
        { input: "client", expected: "client" },
        { input: "driver", expected: "driver" },
      ])(
        "유효한 enum 값($input)이라면 $expected를 반환",
        ({ input, expected }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = enumSchema.safeParse(input);

          // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
          expect(result.success).toBe(true);
          expect(result.data).toStrictEqual(expected);
        },
      );

      it.each([
        { input: null, description: "null" },
        { input: undefined, description: "undefined" },
        { input: 123, description: "number" },
        { input: false, description: "boolean" },
        { input: { key: "client" }, description: "object" },
      ])(
        "enum 타입(문자열)이 아닌 값($description)을 입력하면 에러 발생",
        ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = enumSchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );

      it.each([
        { input: "admin", description: "정의되지 않은 Enum(admin)" },
        { input: "  ", description: "공백" },
        { input: "", description: "빈문자열" },
      ])(
        "정의된 enum 목록에 없는 문자열($description)을 입력하면 에러 발생", //NOTE: z.enum은 문자열만 받음
        ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = enumSchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );
    });

    describe("NULLABLE Test", () => {
      // GIVEN: 테스트에서 사용할 고정된 스키마 정의
      const enumSchema = SCHEMA.ENUM.NULLABLE(
        ENUM_OBJECT_ARRAY.map(({ key }) => key),
      );
      it.each([
        { input: "client" as const, expected: "client" },
        { input: "driver", expected: "driver" },
        { input: null, expected: null },
      ])(
        "유효한 enum 값($input)이라면 $expected를 반환",
        ({ input, expected }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = enumSchema.safeParse(input);

          // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
          expect(result.success).toBe(true);
          expect(result.data).toStrictEqual(expected);
        },
      );

      it.each([
        { input: undefined, description: "undefined" },
        { input: 123, description: "number" },
        { input: false, description: "boolean" },
        { input: { key: "client" }, description: "object" },
      ])(
        "enum 타입(문자열)이 아닌 값($description)을 입력하면 에러 발생",
        ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = enumSchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );

      it.each([
        { input: "admin", description: "정의되지 않은 Enum(admin)" },
        { input: "  ", description: "공백" },
        { input: "", description: "빈문자열" },
      ])(
        "정의된 enum 목록에 없는 값($description)을 입력하면 에러 발생",
        ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = enumSchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );
    });
  });

  describe("UNION Test", () => {
    //NOTE: file 객체 생성
    const file = new File(["file"], "file.txt", { type: "text/plain" });

    describe("STRING_UNDEFINED Test", () => {
      const unionSchema = SCHEMA.UNION.STRING_UNDEFINED;

      it.each([
        { description: "문자열", input: "hello", expected: "hello" },
        { description: "빈 문자열", input: "", expected: "" },
        {
          description: "공백이 포함된 문자열",
          input: "  hello  ",
          expected: "  hello  ",
        },
        { description: "undefined", input: undefined, expected: undefined },
      ])(
        "$description을 충족하는 $input을 입력하면 $expected를 반환",
        ({ input, expected }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = unionSchema.safeParse(input);

          // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
          expect(result.success).toBe(true);
          expect(result.data).toStrictEqual(expected);
        },
      );

      it.each([
        { input: null, description: "null" },
        { input: 123, description: "number" },
        { input: false, description: "boolean" },
        { input: [], description: "array" },
        { input: { id: "hello" }, description: "object" },
      ])(
        "허용되지 않는 타입($description)을 입력하면 에러 발생",
        ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = unionSchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );
    });

    describe("STRING_FILE Test", () => {
      const unionSchema = SCHEMA.UNION.STRING_FILE;

      it.each([
        { description: "문자열", input: "hello", expected: "hello" },
        { description: "빈 문자열", input: "", expected: "" },
        {
          description: "공백이 포함된 문자열",
          input: "  hello  ",
          expected: "  hello  ",
        },
        { description: "File 객체", input: file, expected: file },
      ])(
        "$description을 충족하는 $input을 입력하면 $expected를 반환",
        ({ input, expected }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = unionSchema.safeParse(input);

          // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
          expect(result.success).toBe(true);
          expect(result.data).toStrictEqual(expected);
        },
      );

      it.each([
        { input: null, description: "null" },
        { input: undefined, description: "undefined" },
        { input: 123, description: "number" },
        { input: false, description: "boolean" },
        { input: [], description: "array" },
        { input: { id: "hello" }, description: "object" },
      ])(
        "허용되지 않는 타입($description)을 입력하면 에러 발생",
        ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = unionSchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );
    });

    describe("STRING_FILE_NULLABLE Test", () => {
      const unionSchema = SCHEMA.UNION.STRING_FILE_NULLABLE;

      it.each([
        { description: "문자열", input: "hello", expected: "hello" },
        { description: "빈 문자열", input: "", expected: "" },
        {
          description: "공백이 포함된 문자열",
          input: "  hello  ",
          expected: "  hello  ",
        },
        { description: "File 객체", input: file, expected: file },
        { description: "null", input: null, expected: null },
      ])(
        "$description을 충족하는 $input을 입력하면 $expected를 반환",
        ({ input, expected }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = unionSchema.safeParse(input);

          // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
          expect(result.success).toBe(true);
          expect(result.data).toStrictEqual(expected);
        },
      );

      it.each([
        { input: undefined, description: "undefined" },
        { input: 123, description: "number" },
        { input: false, description: "boolean" },
        { input: [], description: "array" },
        { input: { id: "hello" }, description: "object" },
      ])(
        "허용되지 않는 타입($description)을 입력하면 에러 발생",
        ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = unionSchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );
    });

    describe("ARRAY_STRING_ITEM_UNDEFINED Test", () => {
      const unionSchema = SCHEMA.UNION.ARRAY_STRING_ITEM_UNDEFINED;

      it.each([
        {
          description: "문자열 배열",
          input: ["hello", "hi"],
          expected: ["hello", "hi"],
        },
        {
          description: "빈 문자열이 포함된 배열",
          input: ["hello", ""],
          expected: ["hello", ""],
        },
        {
          description: "공백이 포함된 문자열 배열",
          input: ["hello  ", "hi"],
          expected: ["hello  ", "hi"],
        },
        {
          description: "빈 배열",
          input: [],
          expected: [],
        },
        {
          description: "undefined",
          input: undefined,
          expected: undefined,
        },
      ])(
        "$description을 충족하는 $input을 입력한 경우 $expected를 반환",
        ({ input, expected }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = unionSchema.safeParse(input);

          // THEN: 검증 통과 및 성공적으로 파싱된 데이터 반환
          expect(result.success).toBe(true);
          expect(result.data).toStrictEqual(expected);
        },
      );

      it.each([
        { input: null, description: "null" },
        { input: "hello", description: "string" },
        { input: 123, description: "number" },
        { input: false, description: "boolean" },
        { input: { id: "hello" }, description: "object" },
      ])(
        "허용되지 않는 타입($description)을 입력하면 에러 발생",
        ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = unionSchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );

      it.each([
        { input: [123], description: "number" },
        { input: [null], description: "null" },
        { input: [undefined], description: "undefined" },
        { input: [false], description: "boolean" },
        { input: [{ id: "hello" }], description: "object" },
        {
          input: ["hello", 123],
          description: "유효한 값과 잘못된 값이 섞인 배열",
        },
      ])(
        "배열 내 허용되지 않은 타입($description)이 포함된 경우 에러 발생",
        ({ input }) => {
          // WHEN: 검증 결과를 객체로 반환
          const result = unionSchema.safeParse(input);

          // THEN: 검증 실패 반환
          expect(result.success).toBe(false);
        },
      );
    });
  });
});
