import type { IValidation } from "typia";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";

import {
  clearTypiaLog,
  sanitizeTypiaErrors,
  setTypiaLog,
} from "@packages/utils/api";

// GIVEN: Mocking할 zustand 스토어의 기본 상태와 액션 정의
const mocApiDebugStore = {
  logs: {}, // DESC: 초기 Typia 로그 객체 (실제 상태는 중요하지 않음)
  onClearLog: vi.fn(), // DESC: Typia 로그 삭제 액션을 Mock 함수로 대체
  onSetLog: vi.fn(), // DESC: Typia 로그 설정 액션을 Mock 함수로 대체
};

// GIVEN: @repo/stores/apiDebug 모듈의 apiDebug 훅 Mocking
// DESC: apiDebug.getState()가 mocApiDebugStore를 반환하도록 설정
vi.mock("@repo/stores/apiDebug", () => ({
  apiDebug: { getState: vi.fn(() => mocApiDebugStore) },
}));

const ORIGINAL_NODE_ENV = process.env.NODE_ENV;

beforeEach(() => {
  // DESC: alert는 jsdom 환경에 없을 수 있기 때문에 전역 mock 함수로 설정하여 준비
  vi.stubGlobal("alert", vi.fn());
});

afterEach(() => {
  // DESC: process.env.NODE_ENV 변수를 원래 값으로 복구하여 테스트 환경 정리
  process.env.NODE_ENV = ORIGINAL_NODE_ENV;
  // DESC: 전역 변수 mock을 모두 해제하여 테스트 환경 정리
  vi.unstubAllGlobals();
  // DESC: 환경 변수 mock을 모두 해제하여 테스트 환경 정리
  vi.unstubAllEnvs();
});

describe("sanitizeTypiaErrors Test", () => {
  const apiPath = "/test";

  describe("기본 동작", () => {
    test("원본 데이터를 변경 안 함.", () => {
      interface TestDataServerModel {
        name: string;
        age: number;
      }
      // GIVEN: 에러를 포함하는 원본 데이터와 에러 목록을 준비
      // NOTE: 서버에서 반환된 데이터에 에러가 있지만 ServerModel과 동일하다는 의미에서 단언
      const data = { name: 123, age: 30 } as unknown as TestDataServerModel;
      // DESC: error가 발생했다고 가정하고 임시 error 배열을 넘겨줌
      // NOTE: path: 에러 발생 위치, expected: 지정한 에러 타입, value: 서버의 반환값
      const errors = [
        { path: "$input.name", expected: "string", value: data.name },
      ];

      // WHEN: sanitizeTypiaErrors 함수를 호출하여 에러를 처리
      const result = sanitizeTypiaErrors<TestDataServerModel>({
        data,
        errors,
        path: apiPath,
      });

      // THEN: 반환된 결과가 원본 데이터와 다른 객체인지 확인
      expect(result).not.toBe(data);
    });

    test("에러 경로의 값을 undefined로 설정함.", () => {
      interface TestDataServerModel {
        name: string;
        age: number;
      }
      // GIVEN: 에러가 있는 단일 속성과 에러 목록을 준비
      // NOTE: 서버에서 반환된 데이터에 에러가 있지만 ServerModel과 동일하다는 의미에서 단언
      const data = { name: 123, age: 30 } as unknown as TestDataServerModel;
      const errors = [
        { path: "$input.name", expected: "string", value: data.name },
      ];

      // WHEN: sanitizeTypiaErrors 함수를 호출하여 에러를 처리
      const result = sanitizeTypiaErrors<TestDataServerModel>({
        data,
        errors,
        path: apiPath,
      });

      // THEN: 에러가 발생한 'name' 속성이 undefined로 설정되었는지 확인
      // THEN: 에러가 없는 'age' 속성은 원본 값을 유지하는지 확인
      expect(result?.name).toBeUndefined();
      expect(result?.age).toBe(30);
    });

    test("여러 에러를 동시에 처리하여 해당 요소를 undefined으로 설정함.", () => {
      interface TestDataServerModel {
        name: string;
        age: number;
        email: string;
      }
      // GIVEN: 여러 에러가 있는 데이터와 해당 에러 목록을 준비
      // NOTE: 서버에서 반환된 데이터에 에러가 있지만 ServerModel과 동일하다는 의미에서 단언
      const data = {
        name: null,
        age: 30,
        email: 456,
      } as unknown as TestDataServerModel;
      const errors = [
        { path: "$input.name", expected: "string", value: data.name },
        { path: "$input.email", expected: "string", value: data.email },
      ];

      // WHEN: sanitizeTypiaErrors 함수를 호출하여 에러를 처리
      const result = sanitizeTypiaErrors<TestDataServerModel>({
        data,
        errors,
        path: apiPath,
      });

      // THEN: 에러가 발생한 'name'과 'email' 속성이 undefined로 설정되었는지 확인
      // THEN: 에러가 없는 'age' 속성은 원본 값을 유지하는지 확인
      expect(result?.name).toBeUndefined();
      expect(result?.age).toBe(30);
      expect(result?.email).toBeUndefined();
    });

    test("에러가 없으면 원본 데이터의 복사본을 반환.", () => {
      interface TestDataServerModel {
        name: string;
        age: number;
      }
      // GIVEN: 에러가 없는 정상 데이터와 빈 에러 목록을 준비
      const data = { name: "John", age: 30 };
      // DESC: 에러가 없을 경우, 배열 내 요소가 없기 때문에 타입 단언으로 빈 배열 추가
      const errors: IValidation.IError[] = [];

      // WHEN: sanitizeTypiaErrors 함수를 호출하여 에러를 처리
      const result = sanitizeTypiaErrors<TestDataServerModel>({
        data,
        errors,
        path: apiPath,
      });

      // THEN: 반환된 결과가 원본 데이터와 동일한 내용을 가지는지 확인
      // THEN: 반환된 결과가 원본 데이터와 다른 객체인지(복사본인지) 확인
      expect(result).toEqual(data);
      expect(result).not.toBe(data);
    });
  });

  describe("중첩된 경로 처리", () => {
    test("깊이 2단계 경로에 해당하는 에러를 undefined으로 설정함.", () => {
      interface TestDataServerModel {
        user: { name: string; age: number };
      }
      // GIVEN: 중첩된 객체 내의 에러 데이터와 해당 에러 목록을 준비
      const data = {
        user: { name: undefined, age: 30 },
      } as unknown as TestDataServerModel;
      const errors = [
        { path: "$input.user.name", expected: "string", value: data.user.name },
      ];

      // WHEN: sanitizeTypiaErrors 함수를 호출하여 에러를 처리
      const result = sanitizeTypiaErrors<TestDataServerModel>({
        data,
        errors,
        path: apiPath,
      });

      // THEN: 중첩된 경로의 'name' 속성이 undefined로 설정되었는지 확인
      // THEN: 'user' 객체 내의 'age' 속성은 원본 값을 유지하는지 확인
      expect(result?.user?.name).toBeUndefined();
      expect(result?.user?.age).toBe(30);
    });

    test("깊이 3단계 이상 경로에 해당하는 에러를 undefined으로 설정함.", () => {
      interface TestDataServerModel {
        user: { profile: { name: string } };
      }
      // GIVEN: 3단계로 깊이 중첩된 객체 내의 에러 데이터와 해당 에러 목록을 준비
      const data = {
        user: { profile: { name: 123 } },
      } as unknown as TestDataServerModel;
      const errors = [
        {
          path: "$input.user.profile.name",
          expected: "string",
          value: data.user.profile.name,
        },
      ];

      // WHEN: sanitizeTypiaErrors 함수를 호출하여 에러를 처리
      const result = sanitizeTypiaErrors<TestDataServerModel>({
        data,
        errors,
        path: apiPath,
      });

      // THEN: 3단계 중첩 경로의 'name' 속성이 undefined로 설정되었는지 확인
      expect(result?.user?.profile?.name).toBeUndefined();
    });
  });

  describe("배열 경로 처리", () => {
    test("배열 인덱스 경로에 해당하는 에러를 undefined으로 설정함.", () => {
      interface TestDataServerModel {
        items: { name: string }[];
      }
      // GIVEN: 배열 내 특정 인덱스에 에러가 있는 데이터와 에러 목록을 준비
      const data = {
        items: [{ name: 123 }, { name: "Item2" }],
      } as TestDataServerModel;
      const errors = [
        {
          path: "$input.items[0].name",
          expected: "string",
          value: data.items[0].name,
        },
      ];

      // WHEN: sanitizeTypiaErrors 함수를 호출하여 에러를 처리
      const result = sanitizeTypiaErrors<TestDataServerModel>({
        data,
        errors,
        path: apiPath,
      });

      // THEN: 인덱스 0의 'name' 속성이 undefined로 설정되었는지 확인
      // THEN: 인덱스 1의 'name' 속성은 원본 값을 유지하는지 확인
      expect(result?.items?.[0]?.name).toBeUndefined();
      expect(result?.items?.[1]?.name).toBe("Item2");
    });

    test("중첩된 배열 내에 해당하는 에러를 undefined으로 설정함.", () => {
      interface TestDataServerModel {
        matrix: number[][];
      }
      // GIVEN: 중첩된 배열 내 특정 인덱스에 에러가 있는 데이터와 에러 목록을 준비
      const data = {
        matrix: [
          [1, null],
          [3, 4],
        ],
      } as TestDataServerModel;
      const errors = [
        { path: "$input.matrix[0][1]", expected: "number", value: null },
      ];

      // WHEN: sanitizeTypiaErrors 함수를 호출하여 에러를 처리
      const result = sanitizeTypiaErrors<TestDataServerModel>({
        data,
        errors,
        path: apiPath,
      });

      // THEN: 중첩 배열의 에러 위치가 undefined로 설정되었는지 확인
      // THEN: 다른 정상적인 값들은 유지되는지 확인
      expect(result?.matrix?.[0]?.[1]).toBeUndefined();
      expect(result?.matrix?.[0]?.[0]).toBe(1);
      expect(result?.matrix?.[1]?.[0]).toBe(3);
      expect(result?.matrix?.[1]?.[1]).toBe(4);
    });
  });

  test("배열과 객체가 혼합된 경로 내 에러를 undefined로 설정함.", () => {
    interface TestDataServerModel {
      users: { hobbies: { name: string }[] }[];
    }
    // GIVEN: 배열과 객체가 여러 단계로 혼합된 경로에 에러가 있는 데이터와 에러 목록을 준비
    const data = {
      users: [{ hobbies: [{ name: null }] }],
    } as unknown as TestDataServerModel;
    const errors = [
      {
        path: "$input.users[0].hobbies[0].name",
        expected: "string",
        value: data.users[0].hobbies[0].name,
      },
    ];

    // WHEN: sanitizeTypiaErrors 함수를 호출하여 에러를 처리
    const result = sanitizeTypiaErrors<TestDataServerModel>({
      data,
      errors,
      path: apiPath,
    });

    // THEN: 혼합된 경로의 최종 속성이 undefined로 설정되었는지 확인
    expect(result?.users?.[0]?.hobbies?.[0]?.name).toBeUndefined();
  });

  test("여러 단계 중첩된 객체와 배열 내 에러를 undefined로 설정함.", () => {
    interface TestDataServerModel {
      users: { name: string; posts: { tags: string[]; title: string }[] }[];
    }
    // GIVEN: 깊고 복잡하게 중첩된 객체와 배열 경로에 에러가 있는 데이터와 에러 목록을 준비
    const data = {
      users: [
        {
          name: "John",
          posts: [
            { title: "Post1", tags: ["tag1", 123] },
            { title: "Post2", tags: ["tag3"] },
          ],
        },
      ],
    } as unknown as TestDataServerModel;

    const errors = [
      {
        path: "$input.users[0].posts[0].tags[1]",
        expected: "string",
        value: data.users[0].posts[0].tags[1],
      },
    ];

    // WHEN: sanitizeTypiaErrors 함수를 호출하여 에러를 처리
    const result = sanitizeTypiaErrors<TestDataServerModel>({
      data,
      errors,
      path: apiPath,
    });

    // THEN: 복잡한 경로의 에러 위치가 undefined로 설정되었는지 확인
    // THEN: 주변의 정상적인 데이터는 유지되는지 확인
    expect(result?.users?.[0]?.posts?.[0]?.tags?.[1]).toBeUndefined();
    expect(result?.users?.[0]?.posts?.[0]?.tags?.[0]).toBe("tag1");
    expect(result?.users?.[0]?.posts?.[1]?.tags?.[0]).toBe("tag3");
  });

  test("리터럴 타입과 다른 반환값이 포함된 경우 undefined로 설정함.", () => {
    interface TestDataServerModel {
      status: "activate" | "pending" | "deactivate";
    }

    // GIVEN: 허용되지 않은 리터럴 값을 가진 데이터와 에러 목록을 준비
    const data = { status: "waiting" } as unknown as TestDataServerModel;
    const errors = [
      { path: "$input.status", expected: "string", value: data.status },
    ];

    // WHEN: sanitizeTypiaErrors 함수를 호출하여 에러를 처리
    const result = sanitizeTypiaErrors<TestDataServerModel>({
      data,
      errors,
      path: apiPath,
    });

    // THEN: 리터럴 타입 에러가 발생한 속성이 undefined로 설정되었는지 확인
    expect(result?.status).toBeUndefined();
  });

  describe("존재하지 않는 경로 처리", () => {
    test("중간 경로가 null인 경우 객체를 생성하고 에러에 undefined를 설정함.", () => {
      interface TestDataServerModel {
        user: { name: string };
      }

      // GIVEN: 중간 경로('user')가 null인 데이터와 에러 목록을 준비
      const data = { user: null } as unknown as TestDataServerModel;
      const errors = [
        { path: "$input.user.name", expected: "string", value: data.user },
      ];

      // WHEN: sanitizeTypiaErrors 함수를 호출하여 에러를 처리
      const result = sanitizeTypiaErrors<TestDataServerModel>({
        data,
        errors,
        path: apiPath,
      });

      // THEN: 'user' 객체가 정의되었는지(null이 아닌 객체로 생성되었는지) 확인
      // THEN: 최종 에러 속성 'name'이 undefined로 설정되었는지 확인
      expect(result?.user).toBeDefined();
      expect(result?.user).not.toBeNull();
      expect(result?.user?.name).toBeUndefined();
    });

    test("중간 경로가 undefined인 경우 객체를 생성하고 에러에 undefined를 설정함.", () => {
      interface TestDataServerModel {
        user: { name: string };
      }

      // GIVEN: 중간 경로('user')가 undefined인 데이터와 에러 목록을 준비
      const data = { user: undefined } as unknown as TestDataServerModel;
      const errors = [
        { path: "$input.user.name", expected: "string", value: data.user },
      ];

      // WHEN: sanitizeTypiaErrors 함수를 호출하여 에러를 처리
      const result = sanitizeTypiaErrors<TestDataServerModel>({
        data,
        errors,
        path: apiPath,
      });

      // THEN: 'user' 객체가 정의되었는지(undefined가 아닌 객체로 생성되었는지) 확인
      // THEN: 최종 에러 속성 'name'이 undefined로 설정되었는지 확인
      expect(result?.user).toBeDefined();
      expect(result?.user?.name).toBeUndefined();
    });

    test("중간 경로의 배열 경로가 없는 경우 배열을 생성하고 에러에 undefined를 설정함.", () => {
      interface TestDataServerModel {
        items: { name: string }[];
      }
      // GIVEN: 중간 경로('items')가 undefined인 데이터와 배열 경로 에러 목록을 준비
      const data = { items: undefined } as unknown as TestDataServerModel;
      const errors = [
        { path: "$input.items[0].name", expected: "string", value: data.items },
      ];

      // WHEN: sanitizeTypiaErrors 함수를 호출하여 에러를 처리
      const result = sanitizeTypiaErrors<TestDataServerModel>({
        data,
        errors,
        path: apiPath,
      });

      // THEN: 'items'가 배열 타입으로 생성되었는지 확인
      // DESC: 배열 타입은 object이기 때문에 명시적으로 배열임을 확인하기 위해 Array.isArray를 사용
      // THEN: 배열의 인덱스 0의 'name' 속성이 undefined로 설정되었는지 확인
      expect(Array.isArray(result?.items)).toBe(true);
      expect(result?.items?.[0]?.name).toBeUndefined();
    });

    describe("alert 동작", () => {
      test("production 환경에서 VITE_USE_TYPIA_ALERT가 true이면 alert가 호출됨.", () => {
        // GIVEN: NODE_ENV를 'production'으로, VITE_USE_TYPIA_ALERT를 'true'로 설정하여 환경을 준비
        // DESC: NODE_ENV를 production으로 변경
        process.env.NODE_ENV = "production";
        // DESC: 환경변수에 빈 문자열을 제외하고 넣어주면 설정된 것으로 인식
        vi.stubEnv("VITE_USE_TYPIA_ALERT", "true");

        interface TestDataServerModel {
          name: string;
          age: number;
        }
        // NOTE: 서버에서 반환된 데이터에 에러가 있지만 ServerModel과 동일하다는 의미에서 단언
        const data = { name: 123, age: 30 } as unknown as TestDataServerModel;
        // DESC: error가 발생했다고 가정하고 임시 error 배열을 넘겨줌
        // NOTE: path: 에러 발생 위치, expected: 지정한 에러 타입, value: 서버의 반환값
        const errors = [
          { path: "$input.name", expected: "string", value: data.name },
        ];

        // WHEN: sanitizeTypiaErrors 함수를 호출하여 에러를 처리
        sanitizeTypiaErrors<TestDataServerModel>({
          data,
          errors,
          path: apiPath,
        });

        // THEN: 전역 alert 함수가 한 번 호출되었는지 확인
        // DESC: alert이 spyOn, vi.mock으로 선언되지 않았기 때문에 mock된 함수라는 것을 타입으로 인식할 수 있도록 mocked 추가
        const mockedAlert = vi.mocked(alert);
        expect(mockedAlert).toHaveBeenCalledOnce();

        // THEN: alert 메시지에 에러 정보가 포함되어 있는지 확인
        const alertMessage = mockedAlert.mock.calls[0][0];

        expect(alertMessage).toContain(
          "1. key: name | expected type: string | response value: 123",
        );
      });

      test("여러 에러가 있을 때 모든 에러 정보를 포함", () => {
        // GIVEN: production 환경과 VITE_USE_TYPIA_ALERT='true'를 설정하고 여러 에러 목록을 준비
        // DESC: NODE_ENV를 production으로 변경
        process.env.NODE_ENV = "production";
        // DESC: 환경변수에 빈 문자열을 제외하고 넣어주면 설정된 것으로 인식
        vi.stubEnv("VITE_USE_TYPIA_ALERT", "true");

        interface TestDataServerModel {
          name: string;
          age: number;
        }

        const data = { name: 123, age: "30" } as unknown as TestDataServerModel;
        const errors = [
          { path: "$input.name", expected: "string", value: data.name },
          { path: "$input.age", expected: "number", value: data.age },
        ];

        // WHEN: sanitizeTypiaErrors 함수를 호출하여 에러를 처리
        sanitizeTypiaErrors<TestDataServerModel>({
          data,
          errors,
          path: apiPath,
        });

        // THEN: 전역 alert 함수가 한 번 호출되었는지 확인
        // DESC: alert이 spyOn, vi.mock으로 선언되지 않았기 때문에 mock된 함수라는 것을 타입으로 인식할 수 있도록 mocked 추가
        const mockedAlert = vi.mocked(alert);
        expect(mockedAlert).toHaveBeenCalledOnce();

        // THEN: alert 메시지에 모든 에러 정보가 포함되어 있는지 확인
        const alertMessage = mockedAlert.mock.calls[0][0];

        expect(alertMessage).toContain(
          "1. key: name | expected type: string | response value: 123",
        );
        expect(alertMessage).toContain(
          "2. key: age | expected type: number | response value: 30",
        );
      });

      test("production 환경에서 VITE_USE_TYPIA_ALERT가 false이면 alert가 호출 안 됨.", () => {
        // GIVEN: NODE_ENV를 'production'으로, VITE_USE_TYPIA_ALERT를 비어있는 문자열로(false로 인식) 설정하여 환경을 준비
        // DESC: NODE_ENV를 production으로 변경
        process.env.NODE_ENV = "production";
        // DESC: 환경변수에 빈 문자열을 넣어주면 false로 인식
        vi.stubEnv("VITE_USE_TYPIA_ALERT", "");

        interface TestDataServerModel {
          name: string;
          age: number;
        }
        // NOTE: 서버에서 반환된 데이터에 에러가 있지만 ServerModel과 동일하다는 의미에서 단언
        const data = { name: 123, age: 30 } as unknown as TestDataServerModel;
        // DESC: error가 발생했다고 가정하고 임시 error 배열을 넘겨줌
        // NOTE: path: 에러 발생 위치, expected: 지정한 에러 타입, value: 서버의 반환값
        const errors = [
          { path: "$input.name", expected: "string", value: data.name },
        ];

        // WHEN: sanitizeTypiaErrors 함수를 호출하여 에러를 처리
        sanitizeTypiaErrors<TestDataServerModel>({
          data,
          errors,
          path: apiPath,
        });

        // THEN: 전역 alert 함수가 호출되지 않았는지 확인
        // DESC: alert이 spyOn, vi.mock으로 선언되지 않았기 때문에 mock된 함수라는 것을 타입으로 인식할 수 있도록 mocked 추가
        const mockedAlert = vi.mocked(alert);

        expect(mockedAlert).not.toHaveBeenCalled();
      });
    });
  });
});

describe("Typia Log Helpers", () => {
  const path = "/sample-api";
  const mockErrors: IValidation.IError[] = [
    { path: "$input.name", expected: "string", value: 1 },
  ];

  beforeEach(async () => {
    mocApiDebugStore.onClearLog.mockClear();
    mocApiDebugStore.onSetLog.mockClear();
  });

  describe("clearTypiaLog", () => {
    test("개발 환경에서 onClearLog를 호출함.", () => {
      // GIVEN: 개발 환경 설정
      process.env.NODE_ENV = "development";

      // WHEN: clearTypiaLog 호출
      clearTypiaLog(path);

      // THEN: onClearLog가 올바른 인자로 호출되었는지 확인
      expect(mocApiDebugStore.onClearLog).toHaveBeenCalledOnce();
      expect(mocApiDebugStore.onClearLog).toHaveBeenCalledWith(path);
    });

    test("개발 환경이 아니면 onClearLog를 호출 안 함.", () => {
      // GIVEN: production 환경 설정
      process.env.NODE_ENV = "production";

      // WHEN: clearTypiaLog 호출
      clearTypiaLog(path);

      // THEN: onClearLog가 호출되지 않았는지 확인
      expect(mocApiDebugStore.onClearLog).not.toHaveBeenCalled();
    });
  });

  describe("setTypiaLog", () => {
    test("개발 환경에서 onSetLog를 호출함.", () => {
      // GIVEN: 개발 환경 설정
      process.env.NODE_ENV = "development";

      // WHEN: setTypiaLog 호출
      setTypiaLog({ path, errors: mockErrors });

      // THEN: onSetLog가 올바른 인자로 호출되었는지 확인
      expect(mocApiDebugStore.onSetLog).toHaveBeenCalledOnce();
      expect(mocApiDebugStore.onSetLog).toHaveBeenCalledWith({
        path,
        errors: mockErrors,
      });
    });

    test("개발 환경이 아니면 onSetLog를 호출 안 함.", () => {
      // GIVEN: production 환경 설정
      process.env.NODE_ENV = "production";

      // WHEN: setTypiaLog 호출
      setTypiaLog({ path, errors: mockErrors });

      // THEN: onSetLog가 호출되지 않았는지 확인
      expect(mocApiDebugStore.onSetLog).not.toHaveBeenCalled();
    });
  });
});
