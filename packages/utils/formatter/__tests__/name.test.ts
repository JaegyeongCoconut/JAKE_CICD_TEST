import { describe, expect, it, test, vi } from "vitest";

import {
  formatFullName,
  makeNewImageFileName,
} from "@packages/utils/formatter/name";

// DESC: uuid가 매번 바뀌면 테스트하기 어려우므로 고정된 값으로 모킹
// GIVEN: uuid 라이브러리의 v4 함수를 'fixed-uuid' 문자열을 반환하도록 모킹
vi.mock("uuid", () => ({ v4: () => "fixed-uuid" }));

describe("name Test", () => {
  describe("formatFullName Test", () => {
    describe("null 반환", () => {
      it.each([
        { firstName: undefined, lastName: null },
        { firstName: undefined, lastName: undefined },
        { firstName: null, lastName: undefined },
        { firstName: null, lastName: null },
        { firstName: "", lastName: "" }, // DESC: 빈 문자열
        { firstName: " ", lastName: " " }, // DESC: 공백만 있는 문자열
      ])(
        "firstName=$firstName, lastName=$lastName이라면 null을 반환.",
        ({ firstName, lastName }) => {
          // WHEN: 이름 구성 요소가 모두 falsy (null, undefined, '', ' ')인 경우
          // THEN: null을 반환해야 함
          expect(formatFullName({ firstName, lastName })).toBeNull();
        },
      );
    });

    describe("string 반환", () => {
      it.each([
        { firstName: undefined },
        { firstName: null },
        { firstName: "" },
      ])(
        "firstName=$firstName이고 lastName은 문자열이라면 lastName 문자열을 반환.",
        ({ firstName }) => {
          // WHEN: firstName이 falsy이고 lastName만 유효한 문자열인 경우
          // THEN: lastName 문자열을 그대로 반환해야 함
          expect(formatFullName({ firstName, lastName: "last" })).toBe("last");
        },
      );

      it.each([{ lastName: undefined }, { lastName: null }, { lastName: "" }])(
        "lastName=$lastName이고 firstName은 문자열이라면 firstName 문자열을 반환.",
        ({ lastName }) => {
          // WHEN: lastName이 falsy이고 firstName만 유효한 문자열인 경우
          // THEN: firstName 문자열을 그대로 반환해야 함
          expect(formatFullName({ firstName: "first", lastName })).toBe(
            "first",
          );
        },
      );

      test("firstName과 lastName 둘다 문자열이라면 'firstName + 공백 + lastName'의 문자열을 반환.", () => {
        // WHEN: firstName과 lastName 모두 유효한 문자열인 경우
        // THEN: 두 문자열을 공백으로 연결한 문자열을 반환해야 함
        expect(formatFullName({ firstName: "first", lastName: "last" })).toBe(
          "first last",
        );
      });
    });
  });

  describe("makeNewImageFileName Test", () => {
    it.each([
      { extension: ".png", mime: "image/png", name: "test.png" },
      { extension: ".jpeg", mime: "image/jpeg", name: "test.jpeg" },
      { extension: ".gif", mime: "image/gif", name: "test.gif" },
      { extension: ".bmp", mime: "image/bmp", name: "test.bmp" },
      { extension: ".webp", mime: "image/webp", name: "test.webp" },
      { extension: ".tiff", mime: "image/tiff", name: "test.tiff" },
      { extension: ".svg", mime: "image/svg+xml", name: "test.svg" },
      { extension: ".ico", mime: "image/x-icon", name: "test.ico" },
      { extension: ".csv", mime: "text/csv", name: "test.csv" }, // DESC: 이미지 외 다른 파일 타입
      { extension: ".txt", mime: "text/plain", name: "test.txt" }, // DESC: 이미지 외 다른 파일 타입
      { extension: ".html", mime: "text/html", name: "test.html" }, // DESC: 이미지 외 다른 파일 타입
      { extension: ".json", mime: "application/json", name: "test.json" }, // DESC: 이미지 외 다른 파일 타입
      { extension: ".mp4", mime: "video/mp4", name: "test.mp4" }, // DESC: 이미지 외 다른 파일 타입
    ])(
      "$name을 가지는 파일은 'uuid + . + $extension' 조합의 문자열을 반환.",
      ({ extension, mime, name }) => {
        // GIVEN: 특정 확장자를 가진 File 객체 생성
        const file = new File(["x"], name, { type: mime });

        // WHEN: makeNewImageFileName 함수 호출
        // THEN: 모킹된 UUID와 원본 파일의 확장자를 조합한 문자열을 반환해야 함
        expect(makeNewImageFileName(file)).toBe(`fixed-uuid${extension}`);
      },
    );
  });
});
