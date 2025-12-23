import { describe, expect, it, vi } from "vitest";

import {
  encryptWithSha256,
  encryptWithSha512,
  makeHmacApiHeaders256,
  makeHmacApiHeaders512,
} from "@packages/utils/crypto";

describe("crypto Test", () => {
  describe("makeCryptoPassword Test", () => {
    // GIVEN: 다양한 password 입력값과 기대되는 SHA256 해시 값을 준비
    it.each([
      {
        password: "",
        expected:
          "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", // GIVEN: 빈 문자열의 SHA256 해시
      },
      {
        password: "password",
        expected:
          "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", // GIVEN: "password"의 SHA256 해시
      },
    ])(
      "sha=256이고, password=$password이면 SHA256을 통해 올바른 hash를 반환.",
      ({ password, expected }) => {
        // WHEN: encryptWithSha256 함수에 password를 입력
        // THEN: 결과 해시가 기대값과 일치하는지 확인
        expect(encryptWithSha256(password)).toBe(expected);
      },
    );

    // GIVEN: 다양한 password 입력값과 기대되는 SHA512 해시 값을 준비
    it.each([
      {
        password: "",
        expected:
          "cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e", // GIVEN: 빈 문자열의 SHA512 해시
      },
      {
        password: "password",
        expected:
          "b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86", // GIVEN: "password"의 SHA512 해시
      },
    ])(
      "sha=512이고, password=$password이면 SHA512를 통해 올바른 hash를 반환.",
      ({ password, expected }) => {
        // WHEN: encryptWithSha512 함수에 password를 입력
        // THEN: 결과 해시가 기대값과 일치하는지 확인
        expect(encryptWithSha512(password)).toBe(expected);
      },
    );
  });

  describe("makeHmacApiHeaders Test", () => {
    // GIVEN: HMAC 계산에 사용될 고정된 시간 값 (Date.now()의 Mock 값)
    const fixedDate = 100;

    // GIVEN: Date.now()는 매번 바뀌기 때문에 고정된 테스트 결과값을 도출하기 위해 mocking하여 100을 반환하도록 설정
    vi.spyOn(Date, "now").mockReturnValue(fixedDate);

    // GIVEN: 다양한 hmacKey 입력값과 기대되는 HMAC-SHA256 헤더 객체를 준비
    it.each([
      {
        hmacKey: "",
        expected: {
          "x-api-data": "100", // DESC: Date.now()의 Mock 값
          "x-api-signature":
            "015c020fb08a2b2edfe28b99a4f5379c6ba93210a5450ffd04c166f6673677a4", // GIVEN: ""를 key로, "100"을 data로 계산한 HMAC-SHA256
        },
      },
      {
        hmacKey: "hmacKey",
        expected: {
          "x-api-data": "100", // DESC: Date.now()의 Mock 값
          "x-api-signature":
            "3d7d6ed4cc0676f4c3cff52e3375c89bd185b9a7994ca94d29d62025e472e80f", // GIVEN: "hmacKey"를 key로, "100"을 data로 계산한 HMAC-SHA256
        },
      },
    ])(
      "sha=256이고, password=$password이면 HmacSHA256를 통해 올바른 hash를 반환.",
      ({ hmacKey, expected }) => {
        // WHEN: makeHmacApiHeaders256 함수에 hmacKey를 입력
        // THEN: 결과 헤더 객체가 기대값과 일치하는지 확인
        expect(makeHmacApiHeaders256(hmacKey)).toEqual(expected);
      },
    );

    // GIVEN: 다양한 hmacKey 입력값과 기대되는 HMAC-SHA512 헤더 객체를 준비
    it.each([
      {
        hmacKey: "",
        expected: {
          "x-api-data": "100", // DESC: Date.now()의 Mock 값
          "x-api-signature":
            "813e186326a089021b1f7fa8abd664897831ee19cdb00b2984188e1b52dd1ecdeae5b7e3a1887c1f840661231019449df5aa7ecb8dbf0ac9508e17cf3c0e172a", // GIVEN: ""를 key로, "100"을 data로 계산한 HMAC-SHA512
        },
      },
      {
        hmacKey: "hmacKey",
        expected: {
          "x-api-data": "100", // DESC: Date.now()의 Mock 값
          "x-api-signature":
            "5a8f3fc2c74c5f20f899bcf3921ddebefbdc1552092b4aaa6e75e3eeb1623b5b604da0743ea249126c168939974d300c17eb9c74c2a72bf872ca64b7d5d27c77", // GIVEN: "hmacKey"를 key로, "100"을 data로 계산한 HMAC-SHA512
        },
      },
    ])(
      "sha=512이고, password=$password이면 HmacSHA512를 통해 올바른 hash를 반환.",
      ({ hmacKey, expected }) => {
        // WHEN: makeHmacApiHeaders512 함수에 hmacKey를 입력
        // THEN: 결과 헤더 객체가 기대값과 일치하는지 확인
        expect(makeHmacApiHeaders512(hmacKey)).toEqual(expected);
      },
    );
  });
});
