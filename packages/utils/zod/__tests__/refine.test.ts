import { afterEach, describe, expect, it, test, vi } from "vitest";

import { COMMON_ERROR_MESSAGE } from "@packages/constants/error/message";
import * as validationUtils from "@packages/utils/validation";
import { REFINE } from "@packages/utils/zod/refine";

vi.mock("@packages/utils/validation", () => ({
  checkEmailValidation: vi.fn(),
  checkVersion: vi.fn(),
  checkPasswordType: vi.fn(),
  checkPasswordLength: vi.fn(),
  checkUrl: vi.fn(),
}));

describe("refine Test", () => {
  afterEach(() => {
    vi.restoreAllMocks(); //DESC: 테스트 간 간섭 방지
  });

  describe("REQUIRED_STRING", () => {
    describe("REQUIRED_STRING의 test 메서드", () => {
      test("값이 존재하면 true 반환", () => {
        // WHEN: 값 존재 여부를 검증
        const result = REFINE.REQUIRED_STRING.test("test");

        // THEN: true 반환 확인
        expect(result).toBe(true);
      });

      it.each([{ input: null }, { input: "" }])(
        "값이 존재하지 않으면 false 반환",
        ({ input }) => {
          // WHEN: 값 존재 여부를 검증
          const result = REFINE.REQUIRED_STRING.test(input);

          // THEN: false 반환 확인
          expect(result).toBe(false);
        },
      );
    });

    describe("REQUIRED_STRING의 error 메서드", () => {
      it.each([
        {
          input: undefined,
          expected: { error: COMMON_ERROR_MESSAGE.FIELD },
          description: "기본 메시지 반환",
        },
        {
          input: "커스텀 에러",
          expected: { error: "커스텀 에러" },
          description: "커스텀 메시지 반환",
        },
      ])("입력값 $input일 때 $description", ({ input, expected }) => {
        // WHEN: input 여부에 따라 에러 메시지 생성
        const result = REFINE.REQUIRED_STRING.error(input);

        // THEN: input 여부에 따라 에러 메시지 반환 확인
        expect(result).toEqual(expected);
      });
    });
  });

  describe("REQUIRED_FILE", () => {
    const file = new File(["file"], "file.txt");

    describe("REQUIRED_FILE의 test 메서드", () => {
      it.each([{ input: "test" }, { input: file }])(
        "값이 존재하면 true 반환",
        ({ input }) => {
          // WHEN: 값 존재 여부를 검증
          const result = REFINE.REQUIRED_FILE.test(input);

          // THEN: true 반환 확인
          expect(result).toBe(true);
        },
      );

      it.each([{ input: null }, { input: "" }])(
        "값이 존재하지 않으면 false 반환",
        ({ input }) => {
          // WHEN: 값 존재 여부를 검증
          const result = REFINE.REQUIRED_FILE.test(input);

          // THEN: false 반환 확인
          expect(result).toBe(false);
        },
      );
    });

    describe("REQUIRED_FILE의 error 메서드", () => {
      it.each([
        {
          input: undefined,
          expected: { error: COMMON_ERROR_MESSAGE.FIELD },
          description: "기본 메시지 반환",
        },
        {
          input: "커스텀 에러",
          expected: { error: "커스텀 에러" },
          description: "커스텀 메시지 반환",
        },
      ])("입력값 $input일 때 $description", ({ input, expected }) => {
        // WHEN: input 여부에 따라 에러 메시지 생성
        const result = REFINE.REQUIRED_STRING.error(input);

        // THEN: input 여부에 따라 에러 메시지 반환 확인
        expect(result).toEqual(expected);
      });
    });
  });

  describe("REQUIRED_ARRAY", () => {
    describe("REQUIRED_ARRAY의 test 메서드", () => {
      //DESC: it.each로는 <T>에 대한 타입 추론이 불가능하여 나눠서 작성
      test("문자열 배열이 존재하면 true 반환", () => {
        // WHEN: 값 존재 여부를 검증
        const result = REFINE.REQUIRED_ARRAY.test<string>(["driver", "client"]);

        // THEN: true 반환 확인
        expect(result).toBe(true);
      });

      test("숫자 배열이 존재하면 true 반환", () => {
        // WHEN: 값 존재 여부를 검증
        const result = REFINE.REQUIRED_ARRAY.test<number>([1, 2]);

        // THEN: true 반환 확인
        expect(result).toBe(true);
      });

      test("문자열과 숫자가 섞인 배열이 존재하면 true 반환", () => {
        // WHEN: 값 존재 여부를 검증
        const result = REFINE.REQUIRED_ARRAY.test<string | number>([
          "driver",
          1,
        ]);

        // THEN: true 반환 확인
        expect(result).toBe(true);
      });

      test("객체 배열이 존재하면 true 반환", () => {
        // WHEN: 값 존재 여부를 검증
        const result = REFINE.REQUIRED_ARRAY.test<{
          key: string;
          label: string;
        }>([{ key: "driver", label: "Driver" }]);

        // THEN: true 반환 확인
        expect(result).toBe(true);
      });

      test.each([{ input: null }, { input: [] }])(
        "값이 존재하지 않으면 false 반환",
        ({ input }) => {
          // WHEN: 값 존재 여부를 검증
          const result = REFINE.REQUIRED_ARRAY.test(input);

          // THEN: false 반환 확인
          expect(result).toBe(false);
        },
      );
    });

    describe("REQUIRED_ARRAY의 error 메서드", () => {
      it.each([
        {
          input: undefined,
          expected: { error: COMMON_ERROR_MESSAGE.FIELD },
          description: "기본 메시지 반환",
        },
        {
          input: "커스텀 에러",
          expected: { error: "커스텀 에러" },
          description: "커스텀 메시지 반환",
        },
      ])("입력값 $input일 때 $description", ({ input, expected }) => {
        // WHEN: input 여부에 따라 에러 메시지 생성
        const result = REFINE.REQUIRED_ARRAY.error(input);

        // THEN: input 여부에 따라 에러 메시지 반환 확인
        expect(result).toEqual(expected);
      });
    });
  });

  describe("URL Test", () => {
    describe("test 메서드 (위임 검증)", () => {
      // GIVEN: 의존성 Mocking
      const mockCheckUrl = vi.mocked(validationUtils.checkUrl);

      test("입력받은 url을 그대로 checkUrl 함수에 전달하는지 확인", () => {
        // GIVEN: 테스트용 input과 mock 반환값 설정
        const input = "https://example.com";
        mockCheckUrl.mockReturnValue(true);

        // WHEN: URL 형식 검증 실행
        REFINE.URL.test(input);

        // THEN: checkUrl이 올바른 인자로 호출되었는지 확인
        expect(mockCheckUrl).toHaveBeenCalledWith(input);
        expect(mockCheckUrl).toHaveBeenCalledTimes(1);
      });

      test("checkUrl의 반환값을 그대로 반환하는지 확인", () => {
        // GIVEN: 테스트용 input과 mock 반환값을 false로 설정
        mockCheckUrl.mockReturnValue(false);
        const input = "invalid_url";

        // WHEN: URL 형식 검증 실행
        const result = REFINE.URL.test(input);

        // THEN: checkUrl의 반환값이 그대로 반환되는지 확인
        expect(result).toBe(false);
      });
    });

    describe("URL의 error 객체", () => {
      test("정의된 에러 상수 객체를 가지고 있어야 함", () => {
        // GIVEN: 정의된 에러 상수 객체
        const expected = { error: COMMON_ERROR_MESSAGE.URL_INCORRECT };

        // WHEN: 에러 상수 객체에 접근
        const result = REFINE.URL.error;

        // THEN: 에러 상수 객체와 동일한 값 반환 확인
        expect(result).toEqual(expected);
      });
    });
  });

  describe("PAIR Test", () => {
    describe("PAIR의 test 메서드", () => {
      test("key와 label이 모두 존재하면 true 반환", () => {
        // WHEN: key와 label의 존재 여부를 검증
        const result = REFINE.PAIR.test({ key: "driver", label: "Driver" });

        // THEN: true 반환 확인
        expect(result).toBe(true);
      });

      it.each([
        { input: { key: "driver", label: "" } },
        { input: { key: "", label: "Driver" } },
        { input: { key: "", label: "" } },
      ])(
        "$input에서 key 또는 label이 존재하지 않으면 false 반환",
        ({ input }) => {
          // WHEN: key 또는 label의 존재 여부를 검증
          const result = REFINE.PAIR.test(input);

          // THEN: false 반환 확인
          expect(result).toBe(false);
        },
      );
    });

    describe("PAIR의 error 객체", () => {
      test("정의된 에러 상수 객체를 가지고 있어야 함", () => {
        // GIVEN: 정의된 에러 상수 객체
        const expected = { error: COMMON_ERROR_MESSAGE.FIELD };

        // WHEN: 에러 상수 객체에 접근
        const result = REFINE.PAIR.error;

        // THEN: 에러 상수 객체와 동일한 값 반환 확인
        expect(result).toEqual(expected);
      });
    });
  });

  describe("NOTICE_CONTENTS Test", () => {
    describe("NOTICE_CONTENTS의 test 메서드", () => {
      it.each([
        { input: "", expected: false },
        { input: "  ", expected: false },
        { input: "<img src='https://example.com/image.png'>", expected: true },
        { input: "hello", expected: true },
      ])("값이 $input이면 $expected 반환", ({ input, expected }) => {
        // WHEN: 값 존재 여부를 검증
        const result = REFINE.NOTICE_CONTENTS.test(input);

        // THEN: expected 반환 확인
        expect(result).toBe(expected);
      });
    });

    describe("NOTICE_CONTENTS의 error 객체", () => {
      test("정의된 에러 상수 객체를 가지고 있어야 함", () => {
        // GIVEN: 정의된 에러 상수 객체
        const expected = { error: COMMON_ERROR_MESSAGE.FIELD };

        // WHEN: 에러 상수 객체에 접근
        const result = REFINE.NOTICE_CONTENTS.error;

        // THEN: 에러 상수 객체와 동일한 값 반환 확인
        expect(result).toEqual(expected);
      });
    });
  });

  describe("EMAIL Test", () => {
    describe("test 메서드 (위임 검증)", () => {
      // GIVEN: 의존성 Mocking
      const mockCheckEmail = vi.mocked(validationUtils.checkEmailValidation);

      test("입력받은 email을 그대로 checkEmailValidation 함수에 전달하는지 확인", () => {
        // GIVEN: 테스트용 input과 mock 반환값 설정
        mockCheckEmail.mockReturnValue(true);
        const input = "test@example.com";

        // WHEN: 이메일 형식 검증 실행
        REFINE.EMAIL.test(input);

        // THEN: checkEmailValidation이 올바른 인자로 호출되었는지 확인
        expect(mockCheckEmail).toHaveBeenCalledWith(input);
        expect(mockCheckEmail).toHaveBeenCalledTimes(1);
      });

      test("checkEmailValidation의 반환값을 그대로 반환하는지 확인", () => {
        // GIVEN: 테스트용 input과 mock 반환값을 false로 설정
        mockCheckEmail.mockReturnValue(false);
        const input = "invalid_email";

        // WHEN: 이메일 형식 검증 실행
        const result = REFINE.EMAIL.test(input);
        // THEN: checkEmailValidation의 반환값이 그대로 반환되는지 확인
        expect(result).toBe(false);
      });
    });

    describe("EMAIL의 error 객체", () => {
      test("정의된 에러 상수 객체를 가지고 있어야 함", () => {
        // GIVEN: 정의된 에러 상수 객체
        const expected = { error: COMMON_ERROR_MESSAGE.EMAIL_VALID };

        // WHEN: 에러 상수 객체에 접근
        const result = REFINE.EMAIL.error;

        // THEN: 에러 상수 객체와 동일한 값 반환 확인
        expect(result).toEqual(expected);
      });
    });
  });

  describe("VERSION Test", () => {
    describe("test 메서드 (위임 검증)", () => {
      // GIVEN: 의존성 Mocking
      const mockCheckVersion = vi.mocked(validationUtils.checkVersion);

      test("입력받은 version을 그대로 checkVersion 함수에 전달하는지 확인", () => {
        // GIVEN: 테스트용 input과 mock 반환값 설정
        mockCheckVersion.mockReturnValue(true);
        const input = "1.0.0";

        // WHEN: 버전 형식 검증 실행
        REFINE.VERSION.test(input);

        // THEN: checkVersion이 올바른 인자로 호출되었는지 확인
        expect(mockCheckVersion).toHaveBeenCalledWith(input);
        expect(mockCheckVersion).toHaveBeenCalledTimes(1);
      });

      test("checkVersion의 반환값을 그대로 반환하는지 확인", () => {
        // GIVEN: 테스트용 input과 mock 반환값을 false로 설정
        mockCheckVersion.mockReturnValue(false);
        const input = "invalid_version";

        // WHEN: 버전 형식 검증 실행
        const result = REFINE.VERSION.test(input);

        // THEN: checkVersion의 반환값이 그대로 반환되는지 확인
        expect(result).toBe(false);
      });
    });

    describe("VERSION의 error 객체", () => {
      test("정의된 에러 상수 객체를 가지고 있어야 함", () => {
        // GIVEN: 정의된 에러 상수 객체
        const expected = { error: COMMON_ERROR_MESSAGE.VERSION_INCORRECT };

        // WHEN: 에러 상수 객체에 접근
        const result = REFINE.VERSION.error;

        // THEN: 에러 상수 객체와 동일한 값 반환 확인
        expect(result).toEqual(expected);
      });
    });
  });

  describe("PASSWORD Test", () => {
    describe("TYPE Test", () => {
      describe("test 메서드 (위임 검증)", () => {
        // GIVEN: 의존성 Mocking
        const mockCheckPasswordType = vi.mocked(
          validationUtils.checkPasswordType,
        );

        test("입력받은 password를 그대로 checkPasswordType 함수에 전달하는지 확인", () => {
          // GIVEN: 테스트용 input과 mock 반환값 설정
          mockCheckPasswordType.mockReturnValue(true);
          const input = "qwerQWER";

          // WHEN: password 타입 검증 실행
          REFINE.PASSWORD.TYPE.test(input);

          // THEN: checkPasswordType이 올바른 인자로 호출되었는지 확인
          expect(mockCheckPasswordType).toHaveBeenCalledWith(input);
          expect(mockCheckPasswordType).toHaveBeenCalledTimes(1);
        });

        test("checkPasswordType의 반환값을 그대로 반환하는지 확인", () => {
          // GIVEN: 테스트용 input과 mock 반환값을 false로 설정
          mockCheckPasswordType.mockReturnValue(false);
          const input = "invalid_password";

          // WHEN: password 타입 검증 실행
          const result = REFINE.PASSWORD.TYPE.test(input);

          // THEN: checkPasswordType의 반환값이 그대로 반환되는지 확인
          expect(result).toBe(false);
        });
      });

      describe("TYPE의 error 객체", () => {
        test("정의된 에러 상수 객체를 가지고 있어야 함", () => {
          // GIVEN: 정의된 에러 상수 객체
          const expected = { error: COMMON_ERROR_MESSAGE.PASSWORD_TYPE };

          // WHEN: 에러 상수 객체에 접근
          const result = REFINE.PASSWORD.TYPE.error;

          // THEN: 에러 상수 객체와 동일한 값 반환 확인
          expect(result).toEqual(expected);
        });
      });
    });

    describe("LENGTH Test", () => {
      describe("test 메서드 (위임 검증)", () => {
        // GIVEN: 의존성 Mocking
        const mockCheckPasswordLength = vi.mocked(
          validationUtils.checkPasswordLength,
        );

        test("입력받은 password를 그대로 checkPasswordLength 함수에 전달하는지 확인", () => {
          // GIVEN: 테스트용 input과 mock 반환값 설정
          mockCheckPasswordLength.mockReturnValue(true);
          const input = "qwerQWER";

          // WHEN: password 길이 검증 실행
          REFINE.PASSWORD.LENGTH.test(input);

          // THEN: checkPasswordLength가 올바른 인자로 호출되었는지 확인
          expect(mockCheckPasswordLength).toHaveBeenCalledWith(input);
          expect(mockCheckPasswordLength).toHaveBeenCalledTimes(1);
        });

        test("checkPasswordLength의 반환값을 그대로 반환하는지 확인", () => {
          // GIVEN: 테스트용 input과 mock 반환값을 false로 설정
          mockCheckPasswordLength.mockReturnValue(false);
          const input = "invalid_password";

          // WHEN: password 길이 검증 실행
          const result = REFINE.PASSWORD.LENGTH.test(input);

          // THEN: checkPasswordLength의 반환값이 그대로 반환되는지 확인
          expect(result).toBe(false);
        });
      });

      describe("LENGTH의 error 객체", () => {
        test("정의된 에러 상수 객체를 가지고 있어야 함", () => {
          // GIVEN: 정의된 에러 상수 객체
          const expected = { error: COMMON_ERROR_MESSAGE.PASSWORD_LENGTH };

          // WHEN: 에러 상수 객체에 접근
          const result = REFINE.PASSWORD.LENGTH.error;

          // THEN: input 여부에 따라 에러 메시지 반환 확인
          expect(result).toEqual(expected);
        });
      });
    });

    describe("CONFIRM Test", () => {
      describe("CONFIRM의 test 메서드", () => {
        it.each([
          {
            confirmPassword: "12345678",
            newPassword: "12345678",
            expected: true,
          },
          {
            confirmPassword: "123456789012345678901",
            newPassword: "123456789012345678901",
            expected: true,
          },
          {
            confirmPassword: "1234567",
            newPassword: "1234567",
            expected: true,
          },
          { confirmPassword: "", newPassword: "", expected: true },
          {
            confirmPassword: "1234567890",
            newPassword: "1234567",
            expected: false,
          },
          {
            confirmPassword: "12390",
            newPassword: "123456789",
            expected: false,
          },
          {
            confirmPassword: "",
            newPassword: "1234567890",
            expected: false,
          },
        ])(
          "입력값 $confirmPassword과 $newPassword이 일치하면 $expected를 반환",
          ({ confirmPassword, newPassword, expected }) => {
            // WHEN: confirmPassword와 newPassword의 일치 여부를 검증
            const result = REFINE.PASSWORD.CONFIRM.test({
              confirmPassword,
              newPassword,
            });

            // THEN: expected 반환 확인
            expect(result).toBe(expected);
          },
        );
      });

      describe("CONFIRM의 error 객체", () => {
        test("정의된 에러 상수 객체를 가지고 있어야 함", () => {
          // GIVEN: 정의된 에러 상수 객체
          const expected = {
            error: COMMON_ERROR_MESSAGE.PASSWORD_CONFIRM,
            path: ["confirmPassword"],
          };

          // WHEN: 에러 상수 객체에 접근
          const result = REFINE.PASSWORD.CONFIRM.error;

          // THEN: 에러 상수 객체와 동일한 값 반환 확인
          expect(result).toEqual(expected);
        });
      });
    });
  });
});
