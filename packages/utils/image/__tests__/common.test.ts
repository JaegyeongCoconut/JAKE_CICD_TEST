import imageCompression from "browser-image-compression";
import {
  appendValidFiles,
  compressionImage,
  extractS3ImageKey,
} from "image/common";
import { describe, expect, it, test, vi } from "vitest";

import { COMMON_TOAST_MESSAGE } from "@packages/constants/toast";
import type { Languages } from "@packages/types";

// DESC: 외부 라이브러리이고, 전체를 return하는 형태이기 때문에 default로 처리
// GIVEN: imageCompression 라이브러리 함수를 목킹
vi.mock("browser-image-compression", () => ({ default: vi.fn() }));

describe("image common Test", () => {
  describe("extractS3ImageKey Test", () => {
    describe("http, https가 포함되지 않는 경우", () => {
      it.each([
        { input: "htt://test.com", expected: "htt://test.com" },
        { input: "htp://test.com", expected: "htp://test.com" },
        { input: "test.com", expected: "test.com" },
        { input: "test", expected: "test" },
      ])("$input일 경우, $expected을 반환.", ({ input, expected }) => {
        // WHEN: 유효한 http/https 스키마가 없는 문자열 입력
        // THEN: 입력 문자열을 그대로 반환해야 함
        expect(extractS3ImageKey(input)).toBe(expected);
      });
    });

    describe("http, https가 포함되는 경우", () => {
      it.each([
        { input: "http://test.com", expected: "/test.com" }, // DESC: 루트 경로
        { input: "https://test.com", expected: "/test.com" }, // DESC: https 스키마
        { input: "http://prefix/test.com", expected: "prefix/test.com" }, // DESC: 경로 포함
        { input: "https://prefix/test.com", expected: "prefix/test.com" }, // DESC: 경로 포함
        { input: "httptest.com", expected: "httptest.com" }, // DESC: 스키마가 아닌 문자열
        { input: "httpstest", expected: "httpstest" }, // DESC: 스키마가 아닌 문자열
      ])("$input일 경우, $expected을 반환.", ({ input, expected }) => {
        // WHEN: 유효한 http 또는 https 스키마를 포함한 URL 입력
        // THEN: "://" 이후의 경로 부분을 S3 키로 반환해야 함 (도메인 제거)
        expect(extractS3ImageKey(input)).toBe(expected);
      });
    });
  });

  describe("compressionImage Test", async () => {
    test("외부 라이브러리 호출 후 압축이 성공하면 압축된 File을 반환.", async () => {
      // GIVEN: 테스트용 File 객체 생성
      const file = new File(["x"], "a.png", { type: "image/png" });
      // GIVEN: imageCompression이 성공적으로 File을 반환하도록 설정 (실제 File 객체 사용)
      vi.mocked(imageCompression).mockResolvedValue(file);

      // WHEN: compressionImage 호출
      const result = await compressionImage({
        file,
        compressedMaxFileSize: 0.5,
        maxWidthHeight: 1000,
      });

      // THEN: imageCompression이 한 번 호출되었는지 판단
      expect(imageCompression).toHaveBeenCalledOnce();
      // THEN: imageCompression이 올바른 파라미터(maxSizeMB, maxWidthOrHeight)를 받았는지 판단
      expect(imageCompression).toHaveBeenCalledWith(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1000,
        useWebWorker: true,
      });

      // THEN: 반환된 결과가 File 인스턴스인지 판단
      expect(result).toBeInstanceOf(File);
      // THEN: 반환된 File의 name, type이 기존 file과 동일한지 여부 판단
      expect(result?.name).toBe("a.png");
      expect(result?.type).toBe("image/png");
    });

    test("압축 실패 시 undefined를 반환하고 콘솔로 에러를 출력함.", async () => {
      // GIVEN: 테스트용 File 객체와 에러 객체 생성
      const file = new File(["x"], "b.jpg", { type: "image/jpeg" });
      const error = new Error("Compression Error");

      // GIVEN: imageCompression이 강제로 실패하도록 설정
      vi.mocked(imageCompression).mockRejectedValue(error);

      // GIVEN: console.log 스파이 설정
      const spyConsoleLog = vi
        .spyOn(console, "log")
        .mockImplementation(() => {});

      // WHEN: compressionImage 호출
      const result = await compressionImage({
        file,
        compressedMaxFileSize: 1,
        maxWidthHeight: 800,
      });

      // THEN: 결과가 undefined인지 확인
      expect(result).toBeUndefined();
      // THEN: console.log가 에러 메시지와 함께 호출되었는지 확인
      expect(spyConsoleLog).toHaveBeenCalledWith("Compression Error", error);
    });
  });

  describe("appendValidFiles Test", () => {
    // GIVEN: 토스트 메시지 함수 목킹
    const handleToastAdd = vi.fn();

    const maxFileCountLabel = {
      type: "warning",
      content: "최대 파일 개수는 5개 " as Languages,
    } as const;

    test("hasLimit와 관계없이 sortedImageFiles의 길이가 0일 경우, 빈 배열을 반환.", () => {
      // WHEN: 새 파일 목록(sortedImageFiles)이 빈 배열인 경우
      const result = appendValidFiles({
        sortedImageFiles: [],
        currentFiles: [],
        hasLimit: false,
        maxFileCount: 5,
        maxFileCountLabel,
        handleToastAdd,
      });

      // THEN: 빈 배열을 반환해야 함
      expect(result).toEqual([]);
      // THEN: 토스트는 호출되지 않아야 함
      expect(handleToastAdd).not.toHaveBeenCalled();
    });

    test("hasLimit와 관계없이 currentFiles와 sortedImageFiles의 합이 maxFileCount를 초과하는 경우, 최대 파일 개수 초과 에러 토스트를 출력함.", () => {
      // GIVEN: 총 파일 개수가 maxFileCount(5)를 초과하도록 설정 (현재 3개 + 새 파일 3개 = 6개)
      const file1 = new File([new Uint8Array(1024 * 1024 * 0.1)], "1.png", {
        type: "image/png",
      });
      const file2 = new File([new Uint8Array(1024 * 1024 * 0.1)], "2.png", {
        type: "image/png",
      });
      const file3 = new File([new Uint8Array(1024 * 1024 * 0.1)], "3.png", {
        type: "image/png",
      });

      // WHEN: appendValidFiles 호출
      const result = appendValidFiles({
        sortedImageFiles: [file1, file2, file3],
        currentFiles: ["a.png", "b.png", "c.png"],
        hasLimit: false,
        maxFileCount: 5,
        maxFileCountLabel,
        handleToastAdd,
      });

      // THEN: 최대 개수(5)에 맞춰 2개의 새 파일만 추가하여 반환해야 함 ([file1, file2])
      expect(result).toEqual([file1, file2]);
      // THEN: 최대 파일 개수 초과 토스트가 한 번 호출되었는지 확인
      expect(handleToastAdd).toHaveBeenCalledOnce();
      expect(handleToastAdd).toHaveBeenCalledWith(maxFileCountLabel);
    });

    describe("hasLimit가 true이고, sortedImageFiles 내 하나라도 0.5MB를 초과하는 파일이 있는 경우", () => {
      test("'The file cannot exceed more than 0.5MB.' 에러 토스트를 출력함.", () => {
        // GIVEN: 0.5MB 미만, 0.5MB, 0.5MB 초과 파일 준비
        const smallFile = new File(
          [new Uint8Array(1024 * 1024 * 0.4)],
          "small.png",
          { type: "image/png" },
        );
        const equalFile = new File(
          [new Uint8Array(1024 * 1024 * 0.5)],
          "equal.png",
          { type: "image/png" },
        );
        const largeFile = new File(
          [new Uint8Array(1024 * 1024 * 0.6)],
          "large.png",
          { type: "image/png" },
        );

        // WHEN: appendValidFiles 호출 (hasLimit: true)
        const result = appendValidFiles({
          sortedImageFiles: [smallFile, equalFile, largeFile],
          currentFiles: [],
          hasLimit: true,
          maxFileCount: 5,
          maxFileCountLabel,
          handleToastAdd,
        });

        // THEN: 0.5MB 초과 파일(largeFile)을 제외한 파일만 반환해야 함
        expect(result).toEqual([smallFile, equalFile]);
        // THEN: 파일 크기 초과 에러 토스트가 한 번 호출되었는지 확인
        expect(handleToastAdd).toHaveBeenCalledOnce();
        expect(handleToastAdd).toHaveBeenCalledWith(
          COMMON_TOAST_MESSAGE.WARNING.FAIL_FILE_UPLOAD_500KB,
        );
      });

      test("0.5MB를 초과하는 파일은 스킵되고, 작은 파일들은 배열에 추가되어 반환됨.", () => {
        // GIVEN: 작은 파일 2개와 큰 파일 1개
        const smallFile1 = new File(
          [new Uint8Array(1024 * 1024 * 0.1)],
          "small1.png",
          { type: "image/png" },
        );
        const smallFile2 = new File(
          [new Uint8Array(1024 * 1024 * 0.2)],
          "small2.png",
          { type: "image/png" },
        );
        const largeFile = new File(
          [new Uint8Array(1024 * 1024 * 0.6)],
          "large.png",
          { type: "image/png" },
        );

        // WHEN: appendValidFiles 호출 (hasLimit: true)
        const result = appendValidFiles({
          sortedImageFiles: [smallFile1, largeFile, smallFile2], // 순서 무작위
          currentFiles: [],
          hasLimit: true,
          maxFileCount: 5,
          maxFileCountLabel,
          handleToastAdd,
        });

        // THEN: 큰 파일(largeFile)을 제외한 작은 파일들만 반환해야 함
        expect(result).toEqual([smallFile1, smallFile2]);
        // THEN: 파일 크기 초과 에러 토스트가 한 번 호출되었는지 확인
        expect(handleToastAdd).toHaveBeenCalledOnce();
        expect(handleToastAdd).toHaveBeenCalledWith(
          COMMON_TOAST_MESSAGE.WARNING.FAIL_FILE_UPLOAD_500KB,
        );
      });

      test("0.5MB를 초과하는 파일이 여러 개일 경우, 초과하는 파일 개수만큼 에러 토스트를 출력함.", () => {
        // GIVEN: 모든 파일이 0.5MB 초과
        const file1 = new File([new Uint8Array(1024 * 1024 * 0.6)], "1.png", {
          type: "image/png",
        });
        const file2 = new File([new Uint8Array(1024 * 1024 * 0.7)], "2.png", {
          type: "image/png",
        });
        const file3 = new File([new Uint8Array(1024 * 1024 * 0.8)], "3.png", {
          type: "image/png",
        });

        // WHEN: appendValidFiles 호출 (hasLimit: true)
        const result = appendValidFiles({
          sortedImageFiles: [file1, file2, file3],
          currentFiles: [],
          hasLimit: true,
          maxFileCount: 5,
          maxFileCountLabel,
          handleToastAdd,
        });

        // THEN: 모든 파일이 제외되어 빈 배열 반환
        expect(result).toEqual([]);
        // THEN: 파일 개수(3개)만큼 에러 토스트가 호출되었는지 확인
        expect(handleToastAdd).toHaveBeenCalledTimes(3);
        expect(handleToastAdd).toHaveBeenNthCalledWith(
          1,
          COMMON_TOAST_MESSAGE.WARNING.FAIL_FILE_UPLOAD_500KB,
        );
        expect(handleToastAdd).toHaveBeenNthCalledWith(
          2,
          COMMON_TOAST_MESSAGE.WARNING.FAIL_FILE_UPLOAD_500KB,
        );
        expect(handleToastAdd).toHaveBeenNthCalledWith(
          3,
          COMMON_TOAST_MESSAGE.WARNING.FAIL_FILE_UPLOAD_500KB,
        );
      });
    });

    describe("hasLimit가 false인 경우", () => {
      test("currentFiles와 sortedImageFiles의 합이 maxFileCount를 초과하지 않는 경우 sortedImageFiles 내 모든 파일을 반환.", () => {
        // GIVEN: 총 파일 개수가 maxFileCount(7) 미만이고, hasLimit: false
        const file1 = new File([new Uint8Array(1024 * 1024 * 0.1)], "1.png", {
          type: "image/png",
        });
        const file6 = new File([new Uint8Array(1024 * 1024 * 0.6)], "6.png", {
          type: "image/png",
        });
        // (중간 파일 생략)
        const allFiles = [file1, file6, file1, file6, file1, file6]; // 6개

        // WHEN: appendValidFiles 호출
        const result = appendValidFiles({
          sortedImageFiles: allFiles,
          currentFiles: [],
          hasLimit: false,
          maxFileCount: 7,
          maxFileCountLabel,
          handleToastAdd,
        });

        // THEN: 모든 파일을 반환해야 함 (파일 크기 제한 없음)
        expect(result).toEqual(allFiles);
        // THEN: 토스트는 호출되지 않아야 함
        expect(handleToastAdd).not.toHaveBeenCalled();
      });

      test("currentFiles와 sortedImageFiles의 합이 maxFileCount를 초과하는 경우, 설정해둔 최대 파일 개수 초과 에러 토스트를 출력하고, maxFileCount에 맞게 파일을 반환.", () => {
        // GIVEN: 현재 파일 3개 + 새 파일 3개 = 6개. maxFileCount: 5
        const file4 = new File([new Uint8Array(1024 * 1024 * 0.4)], "4.png", {
          type: "image/png",
        });
        const file5 = new File([new Uint8Array(1024 * 1024 * 0.5)], "5.png", {
          type: "image/png",
        });
        const file6 = new File([new Uint8Array(1024 * 1024 * 0.6)], "6.png", {
          type: "image/png",
        });

        // WHEN: appendValidFiles 호출 (hasLimit: false)
        const result = appendValidFiles({
          sortedImageFiles: [file4, file5, file6],
          currentFiles: ["1", "2", "3"], // 3개
          hasLimit: false,
          maxFileCount: 5,
          maxFileCountLabel,
          handleToastAdd,
        });

        // THEN: 최대 개수(5)에 맞춰 2개의 새 파일만 추가하여 반환해야 함 ([file4, file5])
        expect(result).toEqual([file4, file5]);
        // THEN: 최대 파일 개수 초과 토스트가 한 번 호출되었는지 확인
        expect(handleToastAdd).toHaveBeenCalledOnce();
        expect(handleToastAdd).toHaveBeenCalledWith(maxFileCountLabel);
      });
    });
  });
});
