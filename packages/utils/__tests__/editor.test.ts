import { describe, expect, it, test, vi } from "vitest";

import { makeBase64ImageToFile } from "@packages/utils/editor";

// GIVEN: uuid가 매번 바뀌면 테스트하기 어려우므로, v4 함수를 모킹하여 'fixed-uuid'라는 고정된 값을 반환하도록 설정
vi.mock("uuid", () => ({ v4: () => "fixed-uuid" }));

// GIVEN: 테스트에 사용될 1x1 픽셀 PNG 이미지의 Base64 데이터
const ONE_PIXEL_PNG_BASE64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j2ioAAAAASUVORK5CYII=";

describe("editor Test", () => {
  describe("makeBase64ImageToFile 함수는", () => {
    // GIVEN: MIME 타입별 Base64 데이터 URL, 기대되는 File 타입, 확장자 정보를 배열로 준비
    it.each([
      {
        mime: "png",
        dataUrl: `data:image/png;base64,${ONE_PIXEL_PNG_BASE64}`,
        fileType: "image/png",
        extension: "png",
      },
      {
        mime: "jpeg",
        dataUrl: `data:image/jpeg;base64,${ONE_PIXEL_PNG_BASE64}`,
        fileType: "image/jpeg",
        extension: "jpeg",
      },
    ])(
      "base64Image 파라미터가 $mime 이라면 File 객체와 fileName이 'uuid.$extension' 형태를 반환.",
      ({ dataUrl, fileType, extension }) => {
        // WHEN: makeBase64ImageToFile 함수에 Base64 data URL을 입력하여 File 객체와 파일 이름을 얻음
        const { file, fileName } = makeBase64ImageToFile(dataUrl);

        // THEN:
        // DESC: 1. 반환된 'file'이 File 객체의 인스턴스인지 확인
        expect(file).toBeInstanceOf(File);
        // DESC: 2. File 객체의 'type'이 기대하는 MIME 타입과 일치하는지 확인
        expect(file.type).toBe(fileType);
        // DESC: 3. File 객체의 'name'이 모킹된 uuid와 올바른 확장자를 포함하는지 확인
        expect(file.name).toBe(`fixed-uuid.${extension}`);
        // DESC: 4. 반환된 'fileName'이 모킹된 uuid와 올바른 확장자를 포함하는지 확인
        expect(fileName).toBe(`fixed-uuid.${extension}`);
        // DESC: 5. File 객체의 'size'가 0보다 큰지 (실제 데이터를 포함하는지) 확인
        expect(file.size).toBeGreaterThan(0);
      },
    );
  });

  test("잘못된 data URL이면 에러가 발생함.", () => {
    // GIVEN: 불완전하거나 잘못된 Base64 data URL 문자열을 준비
    const invalid = "data:image/png;base64";

    // WHEN: 잘못된 URL로 makeBase64ImageToFile 함수를 실행
    // THEN: 내부적으로 데이터 파싱 실패 또는 Blob 생성 실패로 인해 예외(Error)가 발생하는지 확인
    // DESC: toThrow를 사용하기 위해 함수 호출을 래핑(Wrapping)함.
    expect(() => makeBase64ImageToFile(invalid)).toThrow();
  });
});
