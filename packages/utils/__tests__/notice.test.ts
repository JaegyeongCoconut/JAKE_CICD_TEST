import { describe, expect, it, test } from "vitest";

import {
  combineImages,
  countNoticeNo,
  extractNoticeImageSource,
  filterCurrentImages,
} from "@packages/utils/notice";

describe("notice Test", () => {
  describe("countNoticeNo test", () => {
    // GIVEN: 전체 데이터 수(totalData)와 현재 페이지(currentPage)에 따른 기대되는 공지사항 시작 번호(expected)를 준비
    it.each([
      // totalData 100, 페이지당 20개 가정 (100 - (1-1)*20) = 100
      { totalData: 100, currentPage: 1, expected: 100 },
      // 100 - (2-1)*20 = 80
      { totalData: 100, currentPage: 2, expected: 80 },
      // 100 - (3-1)*20 = 60
      { totalData: 100, currentPage: 3, expected: 60 },
      { totalData: 100, currentPage: 4, expected: 40 },
      { totalData: 100, currentPage: 5, expected: 20 },
      // 100 - (6-1)*20 = 0 (데이터가 없는 페이지)
      { totalData: 100, currentPage: 6, expected: 0 },
    ])(
      "totalData=$totalData이고 currentPage=$currentPage 이면, $expected를 return 함.",
      ({ totalData, currentPage, expected }) => {
        // WHEN: countNoticeNo 함수를 호출
        // THEN: 예상되는 공지사항 번호와 일치하는지 확인
        expect(countNoticeNo({ totalData, currentPage })).toBe(expected);
      },
    );
  });

  describe("extractNoticeImageSource Test", () => {
    test("content가 빈 string 일 경우, 빈 배열을 반환.", () => {
      // GIVEN: 빈 문자열을 입력
      // WHEN: extractNoticeImageSource 함수를 호출
      // THEN: 빈 배열을 반환하는지 확인
      expect(extractNoticeImageSource("")).toEqual([]);
    });

    // GIVEN: 다양한 <img src="..." 패턴을 포함하는 content와 기대 결과(expected)를 준비
    it.each([
      {
        content: `<img src="aa"`,
        description: "content에 <img src와 일치하는 패턴이 하나일 경우",
        expected: ["aa"],
      },
      {
        content: `<img src="aa"    !ABDC  \t\n <img src="bb"  `,
        description: "content에 <img src와 일치하는 패턴이 두개일 경우",
        expected: ["aa", "bb"],
      },
    ])("$description, $expected 반환.", ({ content, expected }) => {
      // WHEN: extractNoticeImageSource 함수를 호출
      // THEN: content 내에서 추출된 이미지 src 배열이 기대값과 일치하는지 확인
      expect(extractNoticeImageSource(content)).toEqual(expected);
    });
  });

  describe("filterCurrentImages Test", () => {
    describe("originalImages가 빈 배열일 경우", () => {
      // GIVEN: originalImages(기존 저장된 이미지)가 빈 배열인 경우를 준비
      it.each([
        { currentImages: [] },
        { currentImages: ["aa"] },
        { currentImages: ["aa", "bb"] },
      ])(
        "currentImages=$currentImages이어도, 빈 배열을 반환.",
        ({ currentImages }) => {
          // WHEN: filterCurrentImages 함수를 호출
          // THEN: originalImages가 없으면, currentImages(현재 HTML에 남아있는 이미지)의 내용에 상관없이 빈 배열을 반환하는지 확인
          expect(
            filterCurrentImages({ originalImages: [], currentImages }),
          ).toEqual([]);
        },
      );
    });

    describe("originalImages가 ['aa']일 경우", () => {
      // GIVEN: originalImages가 ['aa']인 경우를 준비
      it.each([
        { currentImages: [], expected: [] },
        // currentImages에 'aa'가 남아있으므로 'aa'는 유지
        { currentImages: ["aa"], expected: ["aa"] },
        // currentImages에 'aa'가 남아있으므로 'aa'는 유지. 'bb'는 originalImages에 없었으므로 무시됨
        { currentImages: ["aa", "bb"], expected: ["aa"] },
      ])(
        "currentImages=$currentImages이라면, $expected을 반환.",
        ({ currentImages, expected }) => {
          // WHEN: filterCurrentImages 함수를 호출
          // THEN: originalImages 중 currentImages에 존재하는 이미지만 필터링되어 반환되는지 확인
          expect(
            filterCurrentImages({ originalImages: ["aa"], currentImages }),
          ).toEqual(expected);
        },
      );
    });
  });

  describe("combineImages Test", () => {
    // GIVEN: 테스트에 사용될 Mock URL 및 파싱된 URL 준비
    const currentHttpUrl = "http://current.com/current/aa.jpeg";
    const currentHttpsUrl = "https://current.com/current/bb.jpeg";
    const uploadHttpUrl = "http://upload.com/upload/aa.jpeg";
    const uploadHttpsUrl = "https://upload.com/upload/bb.jpeg";

    const parsingCurrentHttpUrl = "current/aa.jpeg";
    const parsingCurrentHttpsUrl = "current/bb.jpeg";
    const parsingUploadHttpUrl = "upload/aa.jpeg";
    const parsingUploadHttpsUrl = "upload/bb.jpeg";

    test("uploadImages와 currentImages가 빈 배열인 경우, 빈 배열을 반환.", () => {
      // GIVEN: 두 입력 배열이 모두 빈 배열
      // WHEN: combineImages 함수를 호출
      // THEN: 빈 배열을 반환하는지 확인
      expect(combineImages({ currentImages: [], uploadImages: [] })).toEqual(
        [],
      );
    });

    describe("currentImages가 빈 배열인 경우", () => {
      test(`[${uploadHttpUrl}]의 경우, [${parsingUploadHttpUrl}]이 반환됨.`, () => {
        // WHEN: uploadImages만 존재하는 경우를 호출
        // THEN: uploadImages의 URL이 파싱되어 반환되는지 확인
        expect(
          combineImages({ currentImages: [], uploadImages: [uploadHttpUrl] }),
        ).toEqual([parsingUploadHttpUrl]);
      });

      test(`[${uploadHttpsUrl}, ${uploadHttpUrl}]처럼 http와 https가 혼용된 경우, [${parsingUploadHttpsUrl}, ${parsingUploadHttpUrl}]이 반환됨.`, () => {
        // WHEN: http/https가 혼용된 uploadImages를 호출
        // THEN: 모든 URL이 파싱되어 순서대로 반환되는지 확인
        expect(
          combineImages({
            currentImages: [],
            uploadImages: [uploadHttpsUrl, uploadHttpUrl],
          }),
        ).toEqual([parsingUploadHttpsUrl, parsingUploadHttpUrl]);
      });
    });

    describe("uploadImages가 빈 배열인 경우", () => {
      test(`[${currentHttpUrl}]의 경우, [${parsingCurrentHttpUrl}]이 반환됨.`, () => {
        // WHEN: currentImages만 존재하는 경우를 호출
        // THEN: currentImages의 URL이 파싱되어 반환되는지 확인
        expect(
          combineImages({
            currentImages: [currentHttpUrl],
            uploadImages: [],
          }),
        ).toEqual([parsingCurrentHttpUrl]);
      });

      test(`[${currentHttpsUrl}, ${currentHttpUrl}]처럼 http와 https가 혼용된 경우, [${parsingCurrentHttpsUrl}, ${parsingCurrentHttpUrl}]이 반환됨.`, () => {
        // WHEN: http/https가 혼용된 currentImages를 호출
        // THEN: 모든 URL이 파싱되어 순서대로 반환되는지 확인
        expect(
          combineImages({
            currentImages: [currentHttpsUrl, currentHttpUrl],
            uploadImages: [],
          }),
        ).toEqual([parsingCurrentHttpsUrl, parsingCurrentHttpUrl]);
      });
    });

    describe("currentImages와 uploadImages가 둘다 있는 경우", () => {
      // GIVEN: currentImages와 uploadImages가 모두 존재하는 테스트 케이스를 준비
      const cases = [
        {
          currentImages: [currentHttpUrl],
          uploadImages: [uploadHttpUrl],
          expected: [parsingCurrentHttpUrl, parsingUploadHttpUrl],
        },
        {
          currentImages: [currentHttpsUrl, currentHttpUrl],
          uploadImages: [uploadHttpsUrl, uploadHttpUrl],
          expected: [
            parsingCurrentHttpsUrl,
            parsingCurrentHttpUrl,
            parsingUploadHttpsUrl,
            parsingUploadHttpUrl,
          ],
        },
      ].map((item) => ({
        ...item,
        // NOTE: it.each의 출력 라벨이 너무 길어지지 않도록 Custom Label을 추가하여 가독성 개선
        currentImagesLabel: `[${item.currentImages}]`,
        uploadImagesLabel: `[${item.uploadImages}]`,
        expectedLabel: `[${item.expected}]`,
      }));

      it.each(cases)(
        "currentImages=$currentImagesLabel, uploadImages=$uploadImagesLabel의 경우, 순서를 보장하고 $expectedLabel를 반환.",
        ({ currentImages, uploadImages, expected }) => {
          // WHEN: currentImages와 uploadImages를 모두 입력하여 combineImages 함수를 호출
          // THEN: currentImages 항목이 먼저, uploadImages 항목이 나중에 오며, 모든 URL이 파싱되어 순서대로 합쳐졌는지 확인
          expect(combineImages({ currentImages, uploadImages })).toEqual(
            expected,
          );
        },
      );
    });
  });
});
