import { describe, expect, it, test } from "vitest";

import {
  checkEmailValidation,
  checkPasswordLength,
  checkPasswordType,
  checkUrl,
  checkVersion,
} from "@packages/utils/validation";

describe("checkEmailValidation Test", () => {
  // DESC: 유효하지 않은 이메일 형식에 대한 테스트
  it.each([
    { email: "user.example.com" }, // DESC: @ 기호가 없는 경우
    { email: "user@" }, // DESC: 도메인 부분이 없는 경우
    { email: "user@example@com" }, // DESC: @ 기호가 두 개 이상인 경우
    { email: "user name@example.com" }, // DESC: 공백이 포함된 경우
    { email: "user@example" }, // DESC: .com과 같은 최상위 도메인이 없는 경우
    { email: "!@example.com" }, // DESC: 잘못된 특수문자가 포함된 경우
    { email: "" }, // DESC: 빈 문자열인 경우
    { email: "  " }, // DESC: 공백만 있는 빈 문자열인 경우
  ])("유효한 이메일 형식인 $email은 false를 반환함.", ({ email }) => {
    // WHEN: 유효하지 않은 이메일 형식 입력
    // THEN: false를 반환해야 함
    expect(checkEmailValidation(email)).toBe(false);
  });

  // DESC: 길이 제한 관련 테스트
  test("아이디나 도메인 길이가 제한을 초과하면 false를 반환함.", () => {
    // GIVEN: 아이디가 64자를 초과하는 경우
    const longId = "a".repeat(65);
    // THEN: false를 반환해야 함
    expect(checkEmailValidation(`${longId}@example.com`)).toBe(false);

    // GIVEN: 도메인 부분이 63자를 초과하는 경우 (TLD 포함하여 총 길이 제한 검증)
    const longDomain = "b".repeat(64);
    // THEN: false를 반환해야 함
    expect(checkEmailValidation(`user@${longDomain}.com`)).toBe(false);
  });
});

describe("checkPasswordLength Test", () => {
  // DESC: 유효한 비밀번호 길이 제한 관련 테스트 (8자리 이상, 20자리 이하)
  it.each([
    { password: "12345678" }, // DESC: 8자리 비밀번호 (최소 길이)
    { password: "ABCDEFGHIJKLMNOPQRST" }, // DESC: 20자리 비밀번호 (최대 길이)
    { password: "          " }, // DESC: 공백 문자열 10자리인 경우 (길이 조건 충족)
  ])("비밀번호가 8자리 이상 20자리 이하이면 true를 반환함.", ({ password }) => {
    // WHEN: 길이 제한을 만족하는 비밀번호 입력
    // THEN: true를 반환해야 함
    expect(checkPasswordLength(password)).toBe(true);
  });

  // DESC: 유효하지 않은 비밀번호 길이 제한 관련 테스트
  it.each([
    { password: "ABCDEFGHIJKLMNOPQRSTU" }, // DESC: 비밀번호가 20자리를 초과한 경우
    { password: "1234567" }, // DESC: 비밀번호가 8자리를 미만인 경우
  ])(
    "비밀번호 8자리 미만이거나 20자리를 초과하면 false를 반환함.",
    ({ password }) => {
      // WHEN: 길이 제한을 만족하지 못하는 비밀번호 입력
      // THEN: false를 반환해야 함
      expect(checkPasswordLength(password)).toBe(false);
    },
  );
});

describe("checkPasswordType Test", () => {
  // DESC: 유효한 비밀번호 형식에 대한 테스트 (두 가지 이상의 문자 유형 조합)
  it.each([
    { password: "qwerQWER" }, // DESC: 소문자 + 대문자
    { password: "qwer1234" }, // DESC: 소문자 + 숫자
    { password: "qwer!@#$" }, // DESC: 소문자 + 특수문자
    { password: "QWER!@#$" }, // DESC: 대문자 + 특수문자
    { password: "1234QWER" }, // DESC: 숫자 + 대문자
    { password: "1234!@#$" }, // DESC: 숫자 + 특수문자
    { password: "qwe123!@#" }, // DESC: 소문자 + 숫자 + 특수문자 (3가지 조합)
    { password: "QWE123!@#" }, // DESC: 대문자 + 숫자 + 특수문자 (3가지 조합)
    { password: "qwER1234" }, // DESC: 소문자 + 대문자 + 숫자 (3가지 조합)
    { password: "qwER12#$" }, // DESC: 소문자 + 대문자 + 숫자 + 특수문자 (4가지 조합)
    { password: "qwer 1234" }, // DESC: 중간에 공백이 포함된 경우 (일반 문자 유형으로 간주될 수 있음)
  ])("유효한 비밀번호 형식인 $password은 true를 반환함.", ({ password }) => {
    // WHEN: 두 가지 이상의 유형을 포함하는 비밀번호 입력
    // THEN: true를 반환해야 함
    expect(checkPasswordType(password)).toBe(true);
  });

  // DESC: 유효하지 않은 비밀번호 형식에 대한 테스트 (단일 유형만 포함)
  it.each([
    { password: "qwer" }, // DESC: 소문자만 있는 경우
    { password: "QWER" }, // DESC: 대문자만 있는 경우
    { password: "1234" }, // DESC: 숫자만 있는 경우
    { password: "!@#$" }, // DESC: 특수문자만 있는 경우
    { password: "" }, // DESC: 빈 문자열인 경우
    { password: "  " }, // DESC: 공백만 있는 빈 문자열인 경우
  ])(
    "유효하지 않은 비밀번호 형식인 $password은 false를 반환함.",
    ({ password }) => {
      // WHEN: 단일 유형만 포함하거나 빈 비밀번호 입력
      // THEN: false를 반환해야 함
      expect(checkPasswordType(password)).toBe(false);
    },
  );
});

describe("checkVersion Test", () => {
  // DESC: 유효한 버전 형식에 대한 테스트 (세 개의 숫자와 두 개의 점으로 구성)
  it.each([{ version: "0.0.0" }, { version: "1.2.3" }, { version: "1.2.300" }])(
    "유효한 버전 형식인 $version은 true를 반환함.",
    ({ version }) => {
      // WHEN: 유효한 버전 형식 입력 (Major.Minor.Patch)
      // THEN: true를 반환해야 함
      expect(checkVersion(version)).toBe(true);
    },
  );

  // DESC: 유효하지 않은 URL 형식에 대한 테스트
  it.each([
    { version: "1.0" }, // DESC: 숫자가 3개 미만인 경우
    { version: "1.0.0.0" }, // DESC: 숫자가 3개 초과한 경우
    { version: "-1.0.0" }, // DESC: 숫자가 음수인 경우
    { version: "1.A.0" }, // DESC: 숫자가 아닌 문자가 포함된 경우
    { version: "1-0-0" }, // DESC: . 기호가 아닌 다른 기호로 구분한 경우
    { version: "  1.0.0  " }, // DESC: 앞 뒤에 공백이 있는 경우
    { version: "1 . 0. 0" }, // DESC: 중간에 공백이 포함된 경우
    { version: ".1.0.0" }, // DESC: 문자열 시작이 . 기호인 경우
    { version: "1.0.0." }, // DESC: 문자열 끝이 . 기호인 경우
    { version: "1..0.0" }, // DESC: 숫자 사이에 . 기호가 연속으로 들아간 경우
    { version: "" }, // DESC: 빈 문자열인 경우
    { version: "  " }, // DESC: 공백만 있는 빈 문자열인 경우
  ])("유효하지 않은 버전 형식인 $version은 false를 반환함.", ({ version }) => {
    // WHEN: 유효하지 않은 버전 형식 입력
    // THEN: false를 반환해야 함
    expect(checkVersion(version)).toBe(false);
  });
});

describe("checkUrl Test", () => {
  // DESC: 유효한 URL 형식에 대한 테스트
  it.each([
    { url: "http://example.com" }, // DESC: 프로토콜이 소문자 http인 경우
    { url: "https://example.com" }, // DESC: 프로토콜이 소문자 https인 경우
    { url: "kkmove://example.com" }, // DESC: 프로토콜이 소문자 커스텀 프로토콜인 경우
    { url: "KKCAR://example.com" }, // DESC: 프로토콜이 대문자 커스텀 프로토콜인 경우
    { url: "https://a" }, // DESC: 도메인이 짧은 경우
    { url: "http:///example.com" }, // DESC: / 기호의 구분자가 3개 이상 있는 경우 (일부 브라우저에서 허용될 수 있는 형식)
  ])("유효한 URL 형식인 $url은 true를 반환함.", ({ url }) => {
    // WHEN: 유효한 프로토콜과 형식을 갖춘 URL 입력
    // THEN: true를 반환해야 함
    expect(checkUrl(url)).toBe(true);
  });

  // DESC: 유효하지 않은 URL 형식에 대한 테스트
  it.each([
    { url: "https://" }, // DESC: 도메인이 없는 경우
    { url: "htp://example.com" }, // DESC: 허용되지 않은 프로토콜인 경우
    { url: "httpss://example.com" }, // DESC: 프로토콜에 오타가 있는 경우
    { url: "://example.com" }, // DESC: 프로토콜이 없는 경우
    { url: "http:/example.com" }, // DESC: / 기호의 구분자가 1개만 있는 경우
    { url: "example.com" }, // DESC: 프로토콜 및 구분자가 없는 경우
    { url: "" }, // DESC: 빈 문자열인 경우
    { url: "  " }, // DESC: 공백만 있는 빈 문자열인 경우
  ])("유효하지 않은 URL 형식인 $url은 false를 반환함.", ({ url }) => {
    // WHEN: 유효하지 않은 프로토콜, 형식 또는 빈 문자열 입력
    // THEN: false를 반환해야 함
    expect(checkUrl(url)).toBe(false);
  });
});
