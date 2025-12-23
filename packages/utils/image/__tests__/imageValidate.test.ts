import { describe, expect, test, vi } from "vitest";

import {
  PNG_FILE_EXTENSIONS,
  SVG_FILE_EXTENSIONS,
} from "@packages/assets/static/file";
import { mockImageObject } from "@packages/test/setup"; // DESC: 이미지 로딩(onload/onerror) 모킹 유틸리티
import type { Languages } from "@packages/types";
import * as fileUtils from "@packages/utils/file";
import * as imageDimensionUtils from "@packages/utils/image/imageDimensions";
import { validateImageWithToastMessage } from "@packages/utils/image/imageValidate";

// GIVEN: 에러 발생 시 반환할 토스트 메시지 객체
const TOASTS = {
  fileSize: { type: "warning", content: "파일 용량" as Languages },
  format: { type: "warning", content: "확장자" as Languages },
  size: { type: "warning", content: "사이즈" as Languages },
  ratio: { type: "warning", content: "비율" as Languages },
} as const;

// GIVEN: 테스트 공통 인자 설정
const baseArgs = {
  fileSizeLimit: 9, // DESC: 기본 파일 용량 제한 9MB
  fileSizeErrorToastMessage: TOASTS.fileSize,
  fileFormatErrorToastMessage: TOASTS.format,
  imageSizeErrorToastMessage: TOASTS.size,
  imageRatioErrorToastMessage: TOASTS.ratio,
  standardWidth: 800, // DESC: 표준 Width 800
  standardHeight: 600, // DESC: 표준 Height 600
} as const;

describe("imageValidate Test", () => {
  describe("validateImageWithToastMessage Test", () => {
    // GIVEN: 의존성 함수들(유틸리티)에 대한 스파이 설정
    const spyGetFileSize = vi.spyOn(fileUtils, "getFileSize");
    const spyCheckFileExtension = vi.spyOn(fileUtils, "checkFileExtension");
    const spyValidateSVGFileDimensions = vi.spyOn(
      imageDimensionUtils,
      "validateSVGFileDimensions",
    );
    const spyValidateImageFileDimensions = vi.spyOn(
      imageDimensionUtils,
      "validateImageFileDimensions",
    );

    test("용량 초과면 즉시 fileSize error toast를 반환하고 이후 로직은 호출 안 됨.", async () => {
      // GIVEN: 약 2MB 더미 PNG 파일 생성 및 제한을 0MB로 설정하여 용량 초과 유도
      const file = new File([new Uint8Array(2 * 1024 * 1024)], "a.png", {
        type: PNG_FILE_EXTENSIONS[0],
      });
      // WHEN: validateImageWithToastMessage 호출
      const result = await validateImageWithToastMessage({
        file,
        extensions: PNG_FILE_EXTENSIONS,
        hasMinimum: true,
        ...baseArgs,
        fileSizeLimit: 0, // DESC: 용량 제한 0MB
      });

      // THEN: 용량 체크는 1회 호출
      expect(spyGetFileSize).toHaveBeenCalledOnce();
      // THEN: 용량 초과 에러 토스트 반환
      expect(result).toEqual(TOASTS.fileSize);
      // THEN: 확장자 및 치수 검증 단계는 호출되지 않아야 함
      expect(spyCheckFileExtension).not.toHaveBeenCalled();
      expect(spyValidateImageFileDimensions).not.toHaveBeenCalled();
      expect(spyValidateSVGFileDimensions).not.toHaveBeenCalled();
    });

    test("지원되지 않는 확장자라면 format error toast 반환하고 이후 로직은 호출 안 됨.", async () => {
      // GIVEN: SVG 파일 생성, but 허용 확장자는 PNG로 설정
      const file = new File([new Uint8Array(2 * 1024 * 1024)], "a.svg", {
        type: SVG_FILE_EXTENSIONS[0],
      });
      // WHEN: validateImageWithToastMessage 호출 (확장자 에러 발생 유도)
      const result = await validateImageWithToastMessage({
        file,
        extensions: PNG_FILE_EXTENSIONS, // DESC: PNG만 허용
        hasMinimum: true,
        ...baseArgs,
      });

      // THEN: 확장자 체크 1회 호출
      expect(spyCheckFileExtension).toHaveBeenCalledOnce();
      // THEN: 확장자 에러 토스트 반환
      expect(result).toEqual(TOASTS.format);
      // THEN: 치수 검증 단계는 호출되지 않아야 함
      expect(spyValidateImageFileDimensions).not.toHaveBeenCalled();
      expect(spyValidateSVGFileDimensions).not.toHaveBeenCalled();
    });

    describe("SVG 파일일 경우, validateSVGFileDimensions 함수 반환값에 따라", () => {
      test("정상일 경우, null이 호출됨.", async () => {
        // GIVEN: 800x600 유효 SVG 콘텐츠 (기준과 동일)
        const svgText = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" />`;
        const file = new File([svgText], "a.svg", {
          type: SVG_FILE_EXTENSIONS[0],
        });
        // WHEN: validateImageWithToastMessage 호출 (SVG 유효성 검증)
        const result = await validateImageWithToastMessage({
          file,
          extensions: SVG_FILE_EXTENSIONS,
          hasMinimum: true,
          ...baseArgs,
        });

        // THEN: 모든 검증 통과 후 null 반환
        expect(result).toBeNull();
        // THEN: SVG 규격 검증은 1회 호출
        expect(spyValidateSVGFileDimensions).toHaveBeenCalledOnce();
        // THEN: 일반 이미지 규격 검증은 불리지 않음
        expect(spyValidateImageFileDimensions).not.toHaveBeenCalled();
      });

      test("사이즈가 다를 경우, size error toast를 반환.", async () => {
        // GIVEN: 600x400 SVG 콘텐츠 (기준 800x600보다 작음)
        const svgText = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" />`;
        const file = new File([svgText], "a.svg", {
          type: SVG_FILE_EXTENSIONS[0],
        });
        // WHEN: validateImageWithToastMessage 호출
        const result = await validateImageWithToastMessage({
          file,
          extensions: SVG_FILE_EXTENSIONS,
          hasMinimum: true,
          ...baseArgs,
        });

        // THEN: 사이즈 에러 토스트 반환
        expect(result).toEqual(TOASTS.size);
        // THEN: SVG 규격 검증은 1회 호출
        expect(spyValidateSVGFileDimensions).toHaveBeenCalledOnce();
        // THEN: 일반 이미지 규격 검증은 불리지 않음
        expect(spyValidateImageFileDimensions).not.toHaveBeenCalled();
      });

      test("비율이 다를 경우, ratio error toast를 반환.", async () => {
        // GIVEN: 800x700 SVG 콘텐츠 (기준 4:3 비율과 다름)
        const svgText = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="700" />`;
        const file = new File([svgText], "a.svg", {
          type: SVG_FILE_EXTENSIONS[0],
        });
        // WHEN: validateImageWithToastMessage 호출
        const result = await validateImageWithToastMessage({
          file,
          extensions: SVG_FILE_EXTENSIONS,
          hasMinimum: true,
          ...baseArgs,
        });

        // THEN: 비율 에러 토스트 반환
        expect(result).toEqual(TOASTS.ratio);
        // THEN: SVG 규격 검증은 1회 호출
        expect(spyValidateSVGFileDimensions).toHaveBeenCalledOnce();
        // THEN: 일반 이미지 규격 검증은 불리지 않음
        expect(spyValidateImageFileDimensions).not.toHaveBeenCalled();
      });
    });
  });

  describe("SVG 파일이 아닐 경우, validateImageFileDimensions 함수 반환값에 따라", () => {
    // GIVEN: 스파이 재설정 (혹시 모를 이전 테스트의 영향을 피하기 위해)
    const spyValidateSVGFileDimensions = vi.spyOn(
      imageDimensionUtils,
      "validateSVGFileDimensions",
    );
    const spyValidateImageFileDimensions = vi.spyOn(
      imageDimensionUtils,
      "validateImageFileDimensions",
    );

    test("정상일 경우, null이 호출됨.", async () => {
      // GIVEN: 800x600 비트맵 이미지 로드 성공 모킹
      mockImageObject({ width: 800, height: 600, succeed: true });
      const file = new File([new Uint8Array(2 * 1024 * 1024)], "a.png", {
        type: PNG_FILE_EXTENSIONS[0],
      });
      // WHEN: validateImageWithToastMessage 호출 (PNG 유효성 검증)
      const result = await validateImageWithToastMessage({
        file,
        extensions: PNG_FILE_EXTENSIONS,
        hasMinimum: true,
        ...baseArgs,
      });

      // THEN: 모든 검증 통과 후 null 반환
      expect(result).toBeNull();
      // THEN: 일반 이미지 규격 검증은 1회 호출
      expect(spyValidateImageFileDimensions).toHaveBeenCalledOnce();
      // THEN: SVG 규격 검증은 불리지 않음
      expect(spyValidateSVGFileDimensions).not.toHaveBeenCalled();
    });

    test("사이즈가 다를 경우, size error toast를 반환.", async () => {
      // GIVEN: 600x400 비트맵 이미지 로드 성공 모킹 (기준 800x600보다 작음)
      mockImageObject({ width: 600, height: 400, succeed: true });
      const file = new File([new Uint8Array(2 * 1024 * 1024)], "a.png", {
        type: PNG_FILE_EXTENSIONS[0],
      });
      // WHEN: validateImageWithToastMessage 호출
      const result = await validateImageWithToastMessage({
        file,
        extensions: PNG_FILE_EXTENSIONS,
        hasMinimum: true,
        ...baseArgs,
      });

      // THEN: 사이즈 에러 토스트 반환
      expect(result).toEqual(TOASTS.size);
      // THEN: 일반 이미지 규격 검증은 1회 호출
      expect(spyValidateImageFileDimensions).toHaveBeenCalledOnce();
      // THEN: SVG 규격 검증은 불리지 않음
      expect(spyValidateSVGFileDimensions).not.toHaveBeenCalled();
    });

    test("비율이 다를 경우, ratio error toast를 반환.", async () => {
      // GIVEN: 800x700 비트맵 이미지 로드 성공 모킹 (기준 4:3 비율과 다름)
      mockImageObject({ width: 800, height: 700, succeed: true });
      const file = new File([new Uint8Array(2 * 1024 * 1024)], "a.png", {
        type: PNG_FILE_EXTENSIONS[0],
      });
      // WHEN: validateImageWithToastMessage 호출
      const result = await validateImageWithToastMessage({
        file,
        extensions: PNG_FILE_EXTENSIONS,
        hasMinimum: true,
        ...baseArgs,
      });

      // THEN: 비율 에러 토스트 반환
      expect(result).toEqual(TOASTS.ratio);
      // THEN: 일반 이미지 규격 검증은 1회 호출
      expect(spyValidateImageFileDimensions).toHaveBeenCalledOnce();
      // THEN: SVG 규격 검증은 불리지 않음
      expect(spyValidateSVGFileDimensions).not.toHaveBeenCalled();
    });
  });
});
