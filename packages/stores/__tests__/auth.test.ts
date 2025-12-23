import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import type { LanguageType } from "@repo/types";

import createAuthStore from "@packages/stores/auth";

// GIVEN: hoisted를 사용하여 Mock 함수를 테스트 스코프 외부에 안전하게 선언
const hoisted = vi.hoisted(() => ({
  mockGetCookie: vi.fn(),
  mockSetCookie: vi.fn(),
  mockRemoveCookie: vi.fn(),
}));
// GIVEN: js-cookie 모듈 Mock 함수 연결
vi.mock("js-cookie", () => ({
  default: {
    get: hoisted.mockGetCookie,
    set: hoisted.mockSetCookie,
    remove: hoisted.mockRemoveCookie,
  },
}));

// GIVEN: 테스트에서 사용할 user 데이터의 인터페이스 정의
interface MockTUser {
  accessToken: string;
  language: LanguageType;
  refreshToken: string;
}

// GIVEN: 테스트에서 사용할 CookieKey 설정
const TEST_COOKIE_KEY = "KOKKOK_CAR_INSPECTION";
// GIVEN: 테스트에서 사용할 user 데이터 설정
const MOCK_USER_DATA: MockTUser = {
  accessToken: "test-access-token",
  refreshToken: "test-refresh-token",
  language: "lo",
};
let mockUseAuthStore: ReturnType<typeof createAuthStore<MockTUser>>;

beforeEach(() => {
  // DESC: 전역 window 객체 Mocking
  vi.stubGlobal("window", {});
  // DESC: Store 인스턴스 생성
  mockUseAuthStore = createAuthStore<MockTUser>({ cookieKey: TEST_COOKIE_KEY });
  // DESC: 쿠키 읽기 Mock 함수 null 반환 설정
  hoisted.mockGetCookie.mockReturnValue(null);
});

afterEach(() => {
  // DESC: 테스트 후 전역 Mock 해제
  vi.unstubAllGlobals();
});

describe("createAuthStore Test", () => {
  test("Store 생성 시 초기 user 상태 null 확인", () => {
    // THEN: user 상태 null 확인
    expect(mockUseAuthStore.getState().user).toBeNull();
  });

  test("signIn 호출 시 user 상태 업데이트 및 쿠키 설정", () => {
    // GIVEN: 초기 state에서 user와 signIn 가져오기
    const { user, signIn } = mockUseAuthStore.getState();

    // THEN: user 상태 null 확인
    expect(user).toBeNull();

    // WHEN: signIn을 호출하여 user 상태 업데이트
    signIn(MOCK_USER_DATA);

    // THEN: mockSetCookie가 올바른 인자로 호출되었는지 확인
    expect(hoisted.mockSetCookie).toHaveBeenCalledWith(
      TEST_COOKIE_KEY,
      JSON.stringify(MOCK_USER_DATA),
    );
    // THEN: user 상태 업데이트 확인
    expect(mockUseAuthStore.getState().user).toEqual(MOCK_USER_DATA);
  });

  test("signOut 호출 시 user 상태 null 초기화 및 쿠키 제거", () => {
    // GIVEN: 초기 user 상태 MOCK_USER_DATA으로 설정
    mockUseAuthStore.setState({ user: MOCK_USER_DATA });
    // WHEN: signOut을 호출하여 user 상태 업데이트
    mockUseAuthStore.getState().signOut();

    // THEN: mockRemoveCookie가 올바른 인자로 호출되었는지 확인
    expect(hoisted.mockRemoveCookie).toHaveBeenCalledWith(TEST_COOKIE_KEY);
    // THEN: user 상태 업데이트 확인
    expect(mockUseAuthStore.getState().user).toBeNull();
  });

  describe("changeUserData Test", () => {
    test("changeUserData 호출 시 user 데이터가 유효하지 않으면 함수 동작 없음", () => {
      // GIVEN: state에서 user와 changeUserData 가져오기
      const { user, changeUserData } = mockUseAuthStore.getState();

      // THEN: 로그아웃 상태 확인
      expect(user).toBeNull();

      // WHEN: 로그아웃 상태에서 changeUserData 호출
      changeUserData({ language: "en" });

      // THEN: user 상태 null 유지 확인
      expect(mockUseAuthStore.getState().user).toBeNull();
      // THEN: mockSetCookie가 호출되지 않았는지 확인
      expect(hoisted.mockSetCookie).not.toHaveBeenCalled();
    });

    test("changeUserData 호출 시 user 데이터가 유효하면 user 상태 업데이트", () => {
      // GIVEN: 초기 user 상태 MOCK_USER_DATA로 설정
      mockUseAuthStore.setState({ user: MOCK_USER_DATA });

      // GIVEN: state에서 user와 changeUserData 가져오기
      const { user, changeUserData } = mockUseAuthStore.getState();

      // WHEN: 로그인 상태에서 changeUserData 호출
      changeUserData({ language: "en" });

      // THEN: mockSetCookie가 올바른 인자로 호출되었는지 확인
      expect(hoisted.mockSetCookie).toHaveBeenCalledWith(
        TEST_COOKIE_KEY,
        JSON.stringify({ ...user, language: "en" }),
      );
      // THEN: user의 language 상태 업데이트 확인
      expect(mockUseAuthStore.getState().user).toEqual({
        ...user,
        language: "en",
      });
    });
  });

  test("changeAccessToken 호출 시 user의 accessToken 상태 업데이트", () => {
    // GIVEN: 초기 user 상태 MOCK_USER_DATA로 설정
    mockUseAuthStore.setState({ user: MOCK_USER_DATA });

    // GIVEN: state에서 user와 changeUserData 가져오기
    const { user, changeAccessToken } = mockUseAuthStore.getState();

    const changedAccessToken = "new-test-access-token";

    // WHEN: 로그인 상태에서 changeAccessToken 호출
    changeAccessToken(changedAccessToken);

    // THEN: mockSetCookie가 올바른 인자로 호출되었는지 확인
    expect(hoisted.mockSetCookie).toHaveBeenCalledWith(
      TEST_COOKIE_KEY,
      JSON.stringify({ ...user, accessToken: changedAccessToken }),
    );
    // THEN: user의 accessToken 상태 업데이트 확인
    expect(mockUseAuthStore.getState().user).toEqual({
      ...user,
      accessToken: changedAccessToken,
    });
  });

  describe("initializeAuth Test", () => {
    test("initializeAuth 호출 시 window 객체가 undefined이면 함수 즉시 종료", () => {
      // GIVEN: beforeEach에서 stub된 window 제거
      vi.unstubAllGlobals();
      // GIVEN: window 객체 undefined 설정
      vi.stubGlobal("window", undefined);
      // GIVEN: Mock 함수 호출 기록 초기화
      vi.clearAllMocks();

      // WHEN: initializeAuth 호출
      mockUseAuthStore.getState().initializeAuth();

      // THEN: user 상태 null 유지 확인
      expect(mockUseAuthStore.getState().user).toBeNull();
      // THEN: mockGetCookie 호출되지 않았는지 확인
      expect(hoisted.mockGetCookie).not.toHaveBeenCalled();
    });

    test("initializeAuth 호출 시 쿠키에 데이터가 없으면 user 상태 null 초기화", () => {
      // WHEN: initializeAuth 호출
      mockUseAuthStore.getState().initializeAuth();

      // THEN: mockGetCookie가 올바른 인자로 호출되었는지 확인
      expect(hoisted.mockGetCookie).toHaveBeenCalledWith(TEST_COOKIE_KEY);
      // THEN: user 상태 null 업데이트 확인
      expect(mockUseAuthStore.getState().user).toBeNull();
    });

    test("initializeAuth 호출 시 쿠키에 유효한 데이터가 있으면 user 상태 업데이트", () => {
      hoisted.mockGetCookie.mockReturnValue(JSON.stringify(MOCK_USER_DATA));

      // WHEN: initializeAuth 호출
      mockUseAuthStore.getState().initializeAuth();

      // THEN: mockGetCookie가 올바른 인자로 호출되었는지 확인
      expect(hoisted.mockGetCookie).toHaveBeenCalledWith(TEST_COOKIE_KEY);
      // THEN: user 상태 MOCK_USER_DATA 업데이트 확인
      expect(mockUseAuthStore.getState().user).toEqual(MOCK_USER_DATA);
    });
  });
});
