import type { ChangeEvent } from "react";

import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import type { Languages } from "@repo/types";
import * as imageCommonUtils from "@repo/utils/image/common";

import useUploadImages from "@packages/hooks/useUploadImages";

// GIVEN: useToastStore의 addToast 함수를 Mock으로 설정
const mockAddToast = vi.fn();
const mockToastStore = {
  toasts: [],
  addToast: mockAddToast,
};
vi.mock("@repo/stores/toast", () => ({
  useToastStore: (selector: (store: typeof mockToastStore) => unknown) =>
    selector(mockToastStore),
}));

describe("useUploadImages Test", () => {
  // GIVEN: 외부 유틸리티 함수에 대한 스파이 설정
  const spyAppendValidFiles = vi.spyOn(imageCommonUtils, "appendValidFiles");
  const spyCompressionImage = vi.spyOn(imageCommonUtils, "compressionImage");

  // GIVEN: 최대 파일 개수 초과 시 사용될 토스트 메시지
  const maxFileCountLabel = {
    type: "warning" as const,
    content: "에러" as Languages,
  };

  // GIVEN: 파일 이름 순 정렬 테스트를 위한 더미 파일 (b.png, a.png 순서로 선언)
  const uploadFile1 = new File(["x"], "b.png", { type: "image/jpeg" });
  const uploadFile2 = new File(["x"], "a.png", { type: "image/jpeg" });

  describe("handleImagesAdd Test", () => {
    describe("isNeedCompress=false 케이스", () => {
      test("파일 추가시, 기존 upload된 파일이 없다면, 추가된 파일이 이름순으로 정렬되고 업로드.", () => {
        // GIVEN: 폼 업데이트 함수 Mock
        const handleFormPhotoUpdate = vi.fn();
        // GIVEN: 훅 렌더링 (압축 OFF)
        const { result } = renderHook(() =>
          useUploadImages({
            images: [], // 초기 파일 없음
            isNeedCompress: false,
            maxFileCount: 10,
            maxFileCountLabel,
            handleFormPhotoUpdate,
          }),
        );
        // GIVEN: input 파일 목록 Mock (순서: b.png, a.png)
        const input = {
          files: [uploadFile1, uploadFile2],
        } as unknown as HTMLInputElement;

        // THEN: 초기 로딩 상태는 false
        expect(result.current.isLoading).toBe(false);

        // WHEN: 파일 추가 이벤트 호출
        act(() => {
          result.current.handleImagesAdd({
            target: input,
          } as ChangeEvent<HTMLInputElement>);
        });

        // THEN: 유효 파일 추가 유틸리티 1회 호출
        expect(spyAppendValidFiles).toHaveBeenCalledOnce();
        // THEN: 파일명이 'a.png', 'b.png' 순으로 정렬되어 유틸리티에 전달되었는지 확인
        expect(spyAppendValidFiles).toHaveBeenCalledWith(
          expect.objectContaining({
            sortedImageFiles: [uploadFile2, uploadFile1],
          }),
        );

        // THEN: 압축이 필요 없으므로 압축 함수 호출되지 않아야 함
        expect(spyCompressionImage).not.toHaveBeenCalled();

        // THEN: 훅 상태에 정렬된 결과가 반영되었는지 확인
        expect(result.current.uploadImages).toEqual([uploadFile2, uploadFile1]);
        // THEN: 폼 업데이트 함수도 정렬된 순서로 호출 확인
        expect(handleFormPhotoUpdate).toHaveBeenCalledWith([
          uploadFile2,
          uploadFile1,
        ]);

        // THEN: 처리 종료 후 로딩 false
        expect(result.current.isLoading).toBe(false);
        // THEN: input value 초기화 확인
        expect(input.value).toBe("");
      });

      test("기존 파일이 있는 상태에서 새 파일을 추가하면, 기존 파일 뒤에 추가.", () => {
        // GIVEN: 기존/신규 파일
        const existingFile = new File(["x"], "existing.png", {
          type: "image/jpeg",
        });
        const newFile = new File(["x"], "new.png", { type: "image/jpeg" });
        const handleFormPhotoUpdate = vi.fn();
        // GIVEN: 훅 렌더링 (기존 파일 포함)
        const { result } = renderHook(() =>
          useUploadImages({
            images: [existingFile],
            isNeedCompress: false,
            maxFileCount: 10,
            maxFileCountLabel,
            handleFormPhotoUpdate,
          }),
        );
        const input = { files: [newFile] } as unknown as HTMLInputElement;

        // WHEN: 파일 추가 이벤트 호출
        act(() => {
          result.current.handleImagesAdd({
            target: input,
          } as ChangeEvent<HTMLInputElement>);
        });

        // THEN: 기존 파일 뒤에 신규 파일이 추가된 배열 확인
        expect(result.current.uploadImages).toEqual([existingFile, newFile]);
        expect(handleFormPhotoUpdate).toHaveBeenCalledWith([
          existingFile,
          newFile,
        ]);
        expect(input.value).toBe("");
      });

      test("파일 추가시, maxFileCount를 넘어가는 파일들은 추가되지 않고 업로드.", () => {
        // GIVEN: 2개 파일, 최대 파일 개수 1개
        const uploadFile1 = new File(["x"], "uploadFile1.jpeg", {
          type: "image/jpeg",
        });
        const uploadFile2 = new File(["x"], "uploadFile2.jpeg", {
          type: "image/jpeg",
        });
        const handleFormPhotoUpdate = vi.fn();
        // GIVEN: 훅 렌더링 (maxFileCount: 1)
        const { result } = renderHook(() =>
          useUploadImages({
            images: [],
            isNeedCompress: false,
            maxFileCount: 1, // 최대 1개
            maxFileCountLabel,
            handleFormPhotoUpdate,
          }),
        );
        const input = {
          files: [uploadFile1, uploadFile2],
        } as unknown as HTMLInputElement;

        // WHEN: 파일 추가 이벤트 호출
        act(() => {
          result.current.handleImagesAdd({
            target: input,
          } as ChangeEvent<HTMLInputElement>);
        });

        // THEN: appendValidFiles 호출 확인
        expect(spyAppendValidFiles).toHaveBeenCalledOnce();
        // THEN: 압축 함수 호출되지 않음
        expect(spyCompressionImage).not.toHaveBeenCalled();

        // THEN: maxFileCountLabel을 인자로 토스트 메시지 1회 호출
        expect(mockAddToast).toHaveBeenCalledOnce();
        expect(mockAddToast).toHaveBeenCalledWith(maxFileCountLabel);

        // THEN: 최대 개수 제한에 따라 1개만 업로드되었는지 확인
        expect(result.current.uploadImages).toEqual([uploadFile1]);
        expect(handleFormPhotoUpdate).toHaveBeenCalledWith([uploadFile1]);
      });

      test("파일 없이 input change 이벤트가 발생하면 아무 동작도 안 함.", () => {
        const handleFormPhotoUpdate = vi.fn();
        const { result } = renderHook(() =>
          useUploadImages({
            images: [],
            isNeedCompress: false,
            maxFileCount: 10,
            maxFileCountLabel,
            handleFormPhotoUpdate,
          }),
        );

        // WHEN: files: null 상태로 이벤트 호출 (선택 취소 시 발생 가능)
        const input = { files: null } as HTMLInputElement;
        act(() => {
          result.current.handleImagesAdd({
            target: input,
          } as ChangeEvent<HTMLInputElement>);
        });

        // THEN: 파일이 없으므로 early-return되어 핵심 함수 미호출
        expect(spyAppendValidFiles).not.toHaveBeenCalled();
        expect(handleFormPhotoUpdate).not.toHaveBeenCalled();
      });

      test("uploadImages가 null일 때는 아무 동작도  안 함.", () => {
        const newFile = new File(["x"], "new.png", { type: "image/jpeg" });
        const handleFormPhotoUpdate = vi.fn();

        const { result } = renderHook(() =>
          useUploadImages({
            images: null, // 초기 상태 null
            isNeedCompress: false,
            maxFileCount: 10,
            maxFileCountLabel,
            handleFormPhotoUpdate,
          }),
        );
        const input = { files: [newFile] } as unknown as HTMLInputElement;

        // WHEN: 파일 추가 이벤트 호출
        act(() => {
          result.current.handleImagesAdd({
            target: input,
          } as ChangeEvent<HTMLInputElement>);
        });

        // THEN: 초기 images 상태가 null이므로 early-return되어 핵심 함수 미호출
        expect(spyAppendValidFiles).not.toHaveBeenCalled();
        expect(handleFormPhotoUpdate).not.toHaveBeenCalled();
      });

      test("appendValidFiles가 빈 배열을 반환하면 이미지가 추가되지 않음.", () => {
        const uploadFile = new File(["x"], "test.png", { type: "image/jpeg" });
        // GIVEN: appendValidFiles가 항상 빈 배열을 반환하도록 Mocking
        spyAppendValidFiles.mockReturnValue([]);

        const handleFormPhotoUpdate = vi.fn();
        const { result } = renderHook(() =>
          useUploadImages({
            images: [],
            isNeedCompress: false,
            maxFileCount: 10,
            maxFileCountLabel,
            handleFormPhotoUpdate,
          }),
        );
        const input = { files: [uploadFile] } as unknown as HTMLInputElement;

        // WHEN: 파일 추가 이벤트 호출
        act(() => {
          result.current.handleImagesAdd({
            target: input,
          } as ChangeEvent<HTMLInputElement>);
        });

        // THEN: 결과가 빈 배열이므로 상태도 빈 배열
        expect(result.current.uploadImages).toEqual([]);
        // THEN: 폼 업데이트도 빈 배열로 호출
        expect(handleFormPhotoUpdate).toHaveBeenCalledWith([]);
      });
    });

    describe("isNeedCompress=true 케이스", () => {
      test("파일 추가시 compressionImage가 호출되고 압축된 파일이 업로드.", async () => {
        // GIVEN: 원본 파일 및 예상 압축 파일
        const uploadFile = new File(["x"], "test.png", { type: "image/jpeg" });
        const compressedFile = new File(["x"], "test.png", {
          type: "image/jpeg",
        });

        // GIVEN: 유효성 통과 및 압축 성공 Mocking
        spyAppendValidFiles.mockReturnValue([uploadFile]);
        spyCompressionImage.mockResolvedValue(compressedFile);

        const handleFormPhotoUpdate = vi.fn();
        const { result } = renderHook(() =>
          useUploadImages({
            images: [],
            isNeedCompress: true, // 압축 ON
            compressedMaxFileSize: 1024,
            maxFileCount: 10,
            maxFileCountLabel,
            handleFormPhotoUpdate,
          }),
        );
        const input = { files: [uploadFile] } as unknown as HTMLInputElement;

        // WHEN: 파일 추가 이벤트 호출 (await act 사용, 비동기 압축 포함)
        await act(() =>
          result.current.handleImagesAdd({
            target: input,
          } as ChangeEvent<HTMLInputElement>),
        );

        // THEN: compressionImage 1회 호출 및 올바른 인자 전달 확인
        expect(spyCompressionImage).toHaveBeenCalledOnce();
        expect(spyCompressionImage).toHaveBeenCalledWith({
          file: uploadFile,
          compressedMaxFileSize: 1024,
          maxWidthHeight: 1920,
        });

        // THEN: 훅 상태 및 폼 업데이트 함수에 압축된 파일이 반영
        expect(result.current.uploadImages).toEqual([compressedFile]);
        expect(handleFormPhotoUpdate).toHaveBeenCalledWith([compressedFile]);
      });

      test("여러 파일 업로드시 모두 압축되어 업로드.", async () => {
        // GIVEN: 2개 원본/예상 압축 파일
        const file1 = new File(["x"], "a.png", { type: "image/jpeg" });
        const file2 = new File(["x"], "b.png", { type: "image/jpeg" });
        const compressionFile1 = new File(["x"], "a.png", {
          type: "image/jpeg",
        });
        const compressionFile2 = new File(["x"], "b.png", {
          type: "image/jpeg",
        });

        // GIVEN: 유효성 통과 및 순차적인 압축 결과 Mocking
        spyAppendValidFiles.mockReturnValue([file1, file2]);
        spyCompressionImage
          .mockResolvedValueOnce(compressionFile1)
          .mockResolvedValueOnce(compressionFile2);

        const handleFormPhotoUpdate = vi.fn();
        const { result } = renderHook(() =>
          useUploadImages({
            images: [],
            isNeedCompress: true,
            compressedMaxFileSize: 1024,
            maxFileCount: 10,
            maxFileCountLabel,
            handleFormPhotoUpdate,
          }),
        );
        const input = { files: [file1, file2] } as unknown as HTMLInputElement;

        // WHEN: 파일 추가 이벤트 호출
        await act(() =>
          result.current.handleImagesAdd({
            target: input,
          } as ChangeEvent<HTMLInputElement>),
        );

        // THEN: compressionImage 2회 호출 확인
        expect(spyCompressionImage).toHaveBeenCalledTimes(2);
        // THEN: 압축 파일 2개가 순서대로 반영되었는지 확인
        expect(result.current.uploadImages).toEqual([
          compressionFile1,
          compressionFile2,
        ]);
        expect(handleFormPhotoUpdate).toHaveBeenCalledWith([
          compressionFile1,
          compressionFile2,
        ]);
      });

      test("compressionImage가 undefined를 반환하면 해당 파일은 제외.", async () => {
        // GIVEN: 2개 원본 파일
        const file1 = new File(["x"], "a.png", { type: "image/jpeg" });
        const file2 = new File(["x"], "b.png", { type: "image/jpeg" });
        const compressionFile = new File(["x"], "a.png", {
          type: "image/jpeg",
        });

        // GIVEN: 파일 1은 성공, 파일 2는 실패(undefined) Mocking
        spyAppendValidFiles.mockReturnValue([file1, file2]);
        spyCompressionImage
          .mockResolvedValueOnce(compressionFile)
          .mockResolvedValueOnce(undefined);

        const handleFormPhotoUpdate = vi.fn();
        const { result } = renderHook(() =>
          useUploadImages({
            images: [],
            isNeedCompress: true,
            compressedMaxFileSize: 1024,
            maxFileCount: 10,
            maxFileCountLabel,
            handleFormPhotoUpdate,
          }),
        );
        const input = { files: [file1, file2] } as unknown as HTMLInputElement;

        // WHEN: 파일 추가 이벤트 호출
        await act(() =>
          result.current.handleImagesAdd({
            target: input,
          } as ChangeEvent<HTMLInputElement>),
        );

        // THEN: undefined가 필터링되어 성공한 파일 1개만 반영
        expect(result.current.uploadImages).toEqual([compressionFile]);
        expect(handleFormPhotoUpdate).toHaveBeenCalledWith([compressionFile]);
      });

      test("압축 중에는 isLoading이 true", async () => {
        // GIVEN: 원본 파일 및 예상 압축 파일
        const uploadFile = new File(["x"], "test.png", { type: "image/jpeg" });
        const compressedFile = new File(["x"], "test.png", {
          type: "image/jpeg",
        });

        spyAppendValidFiles.mockReturnValue([uploadFile]);

        // GIVEN: 압축 Promise 지연을 제어할 수 있도록 resolve 함수 캡쳐
        let resolveCompression: ((value: File) => void) | undefined;
        const compressionPromise = new Promise<File>((resolve) => {
          resolveCompression = resolve;
        });
        spyCompressionImage.mockReturnValue(compressionPromise); // 압축 함수가 이 지연 Promise를 반환하도록 Mocking

        const handleFormPhotoUpdate = vi.fn();
        const { result } = renderHook(() =>
          useUploadImages({
            images: [],
            isNeedCompress: true,
            compressedMaxFileSize: 1024,
            maxFileCount: 10,
            maxFileCountLabel,
            handleFormPhotoUpdate,
          }),
        );
        const input = { files: [uploadFile] } as unknown as HTMLInputElement;

        // THEN: 시작 전 로딩 false
        expect(result.current.isLoading).toBe(false);

        // WHEN: 파일 추가 이벤트 호출 (Promise는 아직 미완료 상태)
        act(() => {
          result.current.handleImagesAdd({
            target: input,
          } as ChangeEvent<HTMLInputElement>);
        });

        // THEN: 압축 진행 중이므로 로딩 true 확인
        expect(result.current.isLoading).toBe(true);

        // WHEN: 압축 완료를 외부에서 트리거하고 act로 상태 업데이트를 기다림
        await act(async () => {
          resolveCompression?.(compressedFile);
          await compressionPromise; // Promise가 완료될 때까지 act가 기다림
        });

        // THEN: 압축 완료 후 로딩 false 확인
        expect(result.current.isLoading).toBe(false);
      });
    });
  });

  describe("handleImageRemove 테스트", () => {
    test("특정 인덱스의 이미지를 제거", () => {
      // GIVEN: 3개 파일
      const file1 = new File(["x"], "a.png", { type: "image/jpeg" });
      const file2 = new File(["x"], "b.png", { type: "image/jpeg" });
      const file3 = new File(["x"], "c.png", { type: "image/jpeg" });

      const handleFormPhotoUpdate = vi.fn();

      const { result } = renderHook(() =>
        useUploadImages({
          images: [file1, file2, file3],
          isNeedCompress: false,
          maxFileCount: 10,
          maxFileCountLabel,
          handleFormPhotoUpdate,
        }),
      );

      // WHEN: 인덱스 1(b.png) 제거 실행
      act(() => {
        result.current.handleImageRemove(1)();
      });

      // THEN: file1과 file3만 남은 배열 확인
      expect(result.current.uploadImages).toEqual([file1, file3]);
      expect(handleFormPhotoUpdate).toHaveBeenCalledWith([file1, file3]);
    });

    test("uploadImages가 null일 때는 제거 동작을  안 함.", () => {
      const handleFormPhotoUpdate = vi.fn();

      const { result } = renderHook(() =>
        useUploadImages({
          images: null, // 초기 상태 null
          isNeedCompress: false,
          maxFileCount: 10,
          maxFileCountLabel,
          handleFormPhotoUpdate,
        }),
      );

      // WHEN: 제거 시도
      act(() => {
        result.current.handleImageRemove(0)();
      });

      // THEN: uploadImages가 null이므로 폼 업데이트 함수 미호출
      expect(handleFormPhotoUpdate).not.toHaveBeenCalled();
    });

    test("모든 이미지를 제거하면 빈 배열이 됨.", () => {
      // GIVEN: 1개 파일
      const file1 = new File(["x"], "a.png", { type: "image/jpeg" });
      const handleFormPhotoUpdate = vi.fn();

      const { result } = renderHook(() =>
        useUploadImages({
          images: [file1],
          isNeedCompress: false,
          maxFileCount: 10,
          maxFileCountLabel,
          handleFormPhotoUpdate,
        }),
      );

      // WHEN: 1개 파일 제거
      act(() => {
        result.current.handleImageRemove(0)();
      });

      // THEN: 빈 배열 확인
      expect(result.current.uploadImages).toEqual([]);
      expect(handleFormPhotoUpdate).toHaveBeenCalledWith([]);
    });
  });
});
