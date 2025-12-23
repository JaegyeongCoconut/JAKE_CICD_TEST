import * as imageUtils from "image/common";
import { describe, expect, it, test, vi } from "vitest";

import {
  checkFileExtension,
  getFileSize,
  getS3FileFormData,
  uploadFileToS3AndReturnFileKey,
} from "@packages/utils/file";
import * as fileNameUtils from "@packages/utils/formatter/name";

describe("file Test", () => {
  describe("getFileSize Test", () => {
    // GIVEN: 다양한 바이트 크기(size)와 원하는 단위(type)에 따른 기대되는 결과값(expected)을 준비
    it.each([
      [{ type: "kB" as const, size: 1024, expected: 1 }], // DESC: 1024 bytes -> 1 kB
      [{ type: "kB" as const, size: 1536, expected: 1.5 }],
      [{ type: "kB" as const, size: 0, expected: 0 }],
      [{ type: "MB" as const, size: Math.pow(1024, 2), expected: 1 }], // DESC: 1024*1024 bytes -> 1 MB
      [{ type: "MB" as const, size: 1.5 * Math.pow(1024, 2), expected: 1.5 }],
      [{ type: "MB" as const, size: 1.25 * Math.pow(1024, 2), expected: 1.25 }],
      [{ type: "kB" as const, size: 1280, expected: 1.25 }],
    ])("$type이고 $size라면 $expected를 반환.", ({ type, size, expected }) => {
      // WHEN: getFileSize 함수에 size와 type을 입력
      // THEN: 결과가 기대되는 단위 변환 값과 일치하는지 확인
      expect(getFileSize({ type, size })).toBe(expected);
    });
  });

  describe("getS3FileFormData Test", () => {
    test("S3 Presigned URL을 받아 FormData를 생성함.", () => {
      // GIVEN: 더미 File 객체와 Mock S3 Presigned URL 정보를 준비
      const file = new File(["x"], "example.txt", { type: "text/plain" });
      const mockS3Info = {
        config: {},
        data: {
          url: "https://example.s3.amazonaws.com/",
          fields: {
            key: "uploads/example.txt",
            bucket: "mock-bucket",
            Policy: "mock-policy",
            "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
            "X-Amz-Credential": "mock-credential",
            "X-Amz-Date": "20231010T000000Z",
            "X-Amz-Signature": "mock-signature",
          },
        },
      };

      // WHEN: getS3FileFormData 함수에 File과 S3 정보를 입력
      const formData = getS3FileFormData({ file, s3Info: mockS3Info });

      // THEN: FormData 객체가 S3 fields의 모든 키-값 쌍과 file, Content-type을 올바르게 포함하는지 확인
      expect(formData.get("key")).toBe(mockS3Info.data.fields.key);
      expect(formData.get("bucket")).toBe(mockS3Info.data.fields.bucket);
      expect(formData.get("Policy")).toBe(mockS3Info.data.fields.Policy);
      expect(formData.get("X-Amz-Algorithm")).toBe(
        mockS3Info.data.fields["X-Amz-Algorithm"],
      );
      expect(formData.get("X-Amz-Credential")).toBe(
        mockS3Info.data.fields["X-Amz-Credential"],
      );
      expect(formData.get("X-Amz-Date")).toBe(
        mockS3Info.data.fields["X-Amz-Date"],
      );
      expect(formData.get("X-Amz-Signature")).toBe(
        mockS3Info.data.fields["X-Amz-Signature"],
      );
      expect(formData.get("Content-type")).toBe(file.type);
      expect(formData.get("file")).toBe(file); // File 객체 자체가 FormData에 추가되었는지 확인
    });
  });

  describe("checkFileExtension Test", () => {
    // GIVEN: 허용된 확장자 리스트(`acceptableFileExtensions`)와 현재 파일 확장자(`currentFileExtension`), 기대 결과(`expected`)를 준비
    it.each([
      {
        acceptableFileExtensions: [
          "image/x-icon",
          "image/png",
          "image/gif",
        ] as const,
        currentFileExtension: "image/x-icon",
        expected: true,
      },
      {
        acceptableFileExtensions: ["image/svg+xml", "image/tiff"] as const,
        currentFileExtension: "image/svg+xml",
        expected: true,
      },
      {
        acceptableFileExtensions: ["image/svg+xml", "image/tiff"] as const,
        currentFileExtension: "a",
        expected: false,
      },
    ])(
      "허용된 확장자가 $acceptableFileExtensions이고 현재 확장자가 $currentFileExtension라면 $expected를 반환.",
      ({ acceptableFileExtensions, currentFileExtension, expected }) => {
        // WHEN: checkFileExtension 함수를 실행
        const result = checkFileExtension({
          acceptableFileExtensions,
          currentFileExtension,
        });
        // THEN: 결과가 기대되는 boolean 값과 일치하는지 확인
        expect(result).toBe(expected);
      },
    );
  });

  describe("uploadFileToS3AndReturnFileKey Test", () => {
    // GIVEN: 외부 유틸리티 함수들을 Mocking하여 스파이(spy) 설정
    const spyExtractS3ImageKey = vi.spyOn(imageUtils, "extractS3ImageKey");
    const spyMakeNewImageFileName = vi.spyOn(
      fileNameUtils,
      "makeNewImageFileName",
    );
    // DESC: S3 업로드 API 호출을 Mocking
    const onCreateS3PresignedUrlAPI = vi.fn();

    // DESC: 테스트에 사용될 고정 값들을 준비
    const urlPrefix = "commercial";
    const photoUid = "uuid.png";
    const fileKey = `${urlPrefix}/${photoUid}`;

    test("file이 string인 경우, extractS3ImageKey 함수를 호출하여 string을 반환.", async () => {
      // GIVEN: file로 string(기존 S3 URL)을 준비
      spyExtractS3ImageKey.mockReturnValue("example.com/image.jpg"); // Mocking된 반환값 설정

      // WHEN: file이 string인 상태로 uploadFileToS3AndReturnFileKey 함수를 호출
      const result = await uploadFileToS3AndReturnFileKey({
        file: "https://example.com/image.jpg",
        urlPrefix,
        onCreateS3PresignedUrlAPI,
      });

      // THEN:
      // 1. imageUtils.extractS3ImageKey가 한 번 호출되었는지 확인
      expect(spyExtractS3ImageKey).toHaveBeenCalledOnce();
      // 2. imageUtils.extractS3ImageKey가 올바른 URL로 호출되었는지 확인
      expect(spyExtractS3ImageKey).toHaveBeenCalledWith(
        "https://example.com/image.jpg",
      );
      // 3. 반환된 결과가 Mock된 S3 Key와 일치하는지 확인
      expect(result).toBe("example.com/image.jpg");
      // 4. File 객체 처리 로직(파일 이름 생성, S3 API 호출)은 실행되지 않았는지 확인
      expect(spyMakeNewImageFileName).not.toHaveBeenCalled();
      expect(onCreateS3PresignedUrlAPI).not.toHaveBeenCalled();
    });

    test("file이 File인 경우, makeNewImageFileName 함수를 호출하여 새로운 파일명을 생성하고, onCreateS3PresignedUrlAPI를 호출한 뒤, onCreateS3PresignedUrlAPI의 status가 204로 반환된다면 fileKey를 반환.", async () => {
      // GIVEN: mock File 객체를 준비하고, 종속 함수들의 Mock 구현을 설정
      const mockFile = new File(["x"], "example.png", { type: "image/png" });
      spyMakeNewImageFileName.mockReturnValue(photoUid);
      onCreateS3PresignedUrlAPI.mockResolvedValue({ status: 204 }); // 성공적인 S3 업로드 응답 Mock

      // WHEN: file이 File인 상태로 uploadFileToS3AndReturnFileKey 함수를 호출
      const result = await uploadFileToS3AndReturnFileKey({
        file: mockFile,
        urlPrefix,
        onCreateS3PresignedUrlAPI,
      });

      // THEN:
      // DESC: 1. 파일 이름 생성 유틸리티가 한 번 호출되었는지 확인
      expect(spyMakeNewImageFileName).toHaveBeenCalledOnce();
      expect(spyMakeNewImageFileName).toHaveBeenCalledWith(mockFile);
      // DESC: 2. S3 Presigned URL API가 한 번 호출되었는지 확인
      expect(onCreateS3PresignedUrlAPI).toHaveBeenCalledOnce();
      // DESC: 3. S3 Presigned URL API가 올바른 fileKey와 file 객체로 호출되었는지 확인
      expect(onCreateS3PresignedUrlAPI).toHaveBeenCalledWith(fileKey, mockFile);
      // DESC: 4. API 응답 status 204에 따라 fileKey가 올바르게 반환되었는지 확인
      expect(result).toBe(fileKey);
    });

    test("file이 File인 경우, onCreateS3PresignedUrlAPI의 status가 204가 아니라면 빈 문자열을 반환.", async () => {
      // GIVEN: mock File 객체를 준비하고, S3 API 응답을 실패(400)로 Mock 설정
      const mockFile = new File(["x"], "example.png", { type: "image/png" });
      spyMakeNewImageFileName.mockReturnValue(photoUid);
      onCreateS3PresignedUrlAPI.mockResolvedValue({ status: 400 }); // 실패적인 S3 업로드 응답 Mock

      // WHEN: file이 File인 상태로 uploadFileToS3AndReturnFileKey 함수를 호출
      const result = await uploadFileToS3AndReturnFileKey({
        file: mockFile,
        urlPrefix,
        onCreateS3PresignedUrlAPI,
      });

      // THEN:
      // DESC: 1. 파일 이름 생성 및 S3 API 호출은 발생했는지 확인 (실행 로직 확인)
      expect(spyMakeNewImageFileName).toHaveBeenCalledOnce();
      expect(spyMakeNewImageFileName).toHaveBeenCalledWith(mockFile);
      expect(onCreateS3PresignedUrlAPI).toHaveBeenCalledOnce();
      expect(onCreateS3PresignedUrlAPI).toHaveBeenCalledWith(fileKey, mockFile);
      // DESC: 2. API 응답 status 204가 아니므로 빈 문자열이 반환되었는지 확인
      expect(result).toBe("");
    });
  });
});
