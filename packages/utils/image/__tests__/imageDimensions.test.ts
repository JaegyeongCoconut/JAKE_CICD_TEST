import { describe, expect, it, test, vi } from "vitest";

import { mockImageObject } from "@packages/test/setup"; // DESC: 이미지 로딩(onload/onerror)을 모킹하는 유틸리티
import {
  checkDimensions,
  validateImageFileDimensions,
  validateSVGFileDimensions,
} from "@packages/utils/image/imageDimensions";

describe("imageDimensions Test", () => {
  describe("checkDimensions Test", () => {
    describe("sizeError return Test", () => {
      describe("hasMinimum=false일 경우 (정확한 크기 일치 요구)", () => {
        it.each([
          {
            description: "width가 0일 경우", // DESC: 0은 허용되지 않음
            input: {
              width: 0,
              height: 1000,
              hasMinimum: false,
              standardWidth: 1000,
              standardHeight: 1000,
            },
          },
          {
            description: "height가 0일 경우", // DESC: 0은 허용되지 않음
            input: {
              width: 1000,
              height: 0,
              hasMinimum: false,
              standardWidth: 1000,
              standardHeight: 1000,
            },
          },
          {
            description: "width !== standardWidth일 경우", // DESC: 정확히 일치해야 함
            input: {
              width: 100,
              height: 1000,
              hasMinimum: false,
              standardWidth: 1000,
              standardHeight: 1000,
            },
          },
          {
            description: "height !== standardHeight일 경우", // DESC: 정확히 일치해야 함
            input: {
              width: 1000,
              height: 100,
              hasMinimum: false,
              standardWidth: 1000,
              standardHeight: 1000,
            },
          },
        ])(
          "$description, 'sizeError'를 반환.",
          ({
            input: { width, height, hasMinimum, standardWidth, standardHeight },
          }) => {
            // WHEN: hasMinimum=false이므로, 표준 크기와 불일치하거나 0인 경우
            // THEN: 'sizeError'를 반환해야 함
            expect(
              checkDimensions({
                width,
                height,
                hasMinimum,
                standardWidth,
                standardHeight,
              }),
            ).toBe("sizeError");
          },
        );
      });

      describe("hasMinimum=true일 경우, (최소 크기 요구)", () => {
        it.each([
          {
            description: "width < standardWidth일 경우", // DESC: 표준 width보다 작음
            input: {
              width: 100,
              height: 1000,
              hasMinimum: true,
              standardWidth: 1000,
              standardHeight: 1000,
            },
          },
          {
            description: "height < standardHeight일 경우", // DESC: 표준 height보다 작음
            input: {
              width: 1000,
              height: 100,
              hasMinimum: true,
              standardWidth: 1000,
              standardHeight: 1000,
            },
          },
        ])(
          "$description, 'sizeError'를 반환.",
          ({
            input: { width, height, hasMinimum, standardWidth, standardHeight },
          }) => {
            // WHEN: hasMinimum=true이므로, width 또는 height가 표준 크기보다 작은 경우
            // THEN: 'sizeError'를 반환해야 함
            expect(
              checkDimensions({
                width,
                height,
                hasMinimum,
                standardWidth,
                standardHeight,
              }),
            ).toBe("sizeError");
          },
        );
      });
    });

    describe("ratioError return Test", () => {
      test("hasMinimum이 true이고 Math.abs((width / height) - (standardWidth / standardHeight)) < 0.01 보다 큰 경우, 'ratioError'를 반환.", () => {
        // GIVEN: 표준 비율 250/1000 = 0.25, 입력 비율 500/1000 = 0.5. 오차 0.25 > 0.01
        // WHEN: 비율 오차가 0.01을 초과하고, hasMinimum=true인 경우
        // THEN: 'ratioError'를 반환해야 함
        expect(
          checkDimensions({
            width: 500,
            height: 1000,
            hasMinimum: true,
            standardWidth: 250,
            standardHeight: 1000,
          }),
        ).toBe("ratioError");
      });
    });

    describe("valid return Test", () => {
      describe("hasMinimum = true일 경우", () => {
        const base = {
          standardWidth: 800,
          standardHeight: 600,
          hasMinimum: true,
        };

        it.each([
          { description: "최소 크기가 일치할 경우", width: 800, height: 600 }, // DESC: 표준 크기와 일치
          {
            description: "표준 비율에 맞춰서 width와 height가 더 클 경우",
            width: 1600,
            height: 1200, // DESC: 표준 비율 (4:3) 유지하며 더 큼
          },
          {
            description: "비율 오차가 0.01 미만일 경우",
            width: 1000,
            height: 751, // DESC: 표준 비율 (4:3 = 1.333) vs 입력 비율 (1.3315). 오차 약 0.0017 < 0.01
          },
        ])("$description, 'valid'를 반환.", ({ width, height }) => {
          // WHEN: hasMinimum=true이므로, 최소 크기 이상이고 비율 오차가 허용 범위 이내인 경우
          // THEN: 'valid'를 반환해야 함
          expect(checkDimensions({ ...base, width, height })).toBe("valid");
        });
      });

      test("hasMinimum = false일 경우, width === standardWidth && height === standardHeight라면 'valid'를 반환.", () => {
        // WHEN: hasMinimum=false이므로, 표준 크기와 정확히 일치하는 경우
        // THEN: 'valid'를 반환해야 함
        expect(
          checkDimensions({
            standardWidth: 1024,
            standardHeight: 768,
            hasMinimum: false,
            width: 1024,
            height: 768,
          }),
        ).toBe("valid");
      });
    });
  });

  describe("validateSVGFileDimensions Test", () => {
    // GIVEN: SVG File 객체를 만들기 위한 헬퍼 함수
    const createSVGFile = (svgContent: string): File => {
      return new File([svgContent], "test.svg", { type: "image/svg+xml" });
    };

    describe("viewBox를 사용하는 svg Test", () => {
      it.each([
        {
          description: "width/height 없이 viewBox만 있는 경우",
          svg: '<svg viewBox="0 0 100 200"></svg>',
          hasMinimum: true,
          standardWidth: 100,
          standardHeight: 200,
          expected: "valid",
        },
        {
          description:
            "width/height가 number 타입이 아니고 viewBox가 있는 경우",
          svg: '<svg width="auto" height="auto" viewBox="0 0 150 300"></svg>',
          hasMinimum: false, // DESC: 정확한 크기 요구 (150x300)
          standardWidth: 150,
          standardHeight: 300,
          expected: "valid",
        },
      ])(
        "$description, viewBox의 width, height를 standardWidth와 standardHeight와 비교하여 케이스에 맞는 값을 반환.",
        async ({
          svg,
          hasMinimum,
          standardWidth,
          standardHeight,
          expected,
        }) => {
          // GIVEN: SVG File 생성
          const file = createSVGFile(svg);
          // WHEN: validateSVGFileDimensions 호출
          const result = await validateSVGFileDimensions({
            file,
            hasMinimum,
            standardWidth,
            standardHeight,
          });

          // THEN: 예상된 결과 ('valid') 반환
          expect(result).toBe(expected);
        },
      );
    });
    describe("비정상적인 svg 파일 Test", () => {
      it.each([
        {
          description: "svg 태그가 없는 경우", // DESC: 파싱 실패
          content: "<div>not an svg</div>",
        },
        {
          description: "width/height도 없고 viewBox도 없는 경우", // DESC: 치수 정보 없음
          content: "<svg></svg>",
        },
      ])("$description, 'sizeError'를 반환.", async ({ content }) => {
        // GIVEN: 비정상적인 SVG 콘텐츠로 File 생성
        const file = createSVGFile(content);
        // WHEN: validateSVGFileDimensions 호출
        const result = await validateSVGFileDimensions({
          file,
          hasMinimum: false,
          standardWidth: 100,
          standardHeight: 200,
        });

        // THEN: 치수 정보를 얻을 수 없거나 치수 정보가 0이어서 'sizeError' 반환
        expect(result).toBe("sizeError");
      });
    });
  });

  describe("validateImageFileDimensions Test", () => {
    test("onload가 성공 후, width/height 기반으로 'valid | sizeError | ratioError' 셋 중 하나의 문자열을 반환.", async () => {
      // GIVEN: 1024x768 (표준 크기와 일치)로 설정, onload 성공 모킹
      mockImageObject({ width: 1024, height: 768, succeed: true });

      // GIVEN: 테스트용 File 객체 생성
      const file = new File(["x"], "a.png", { type: "image/png" });
      // WHEN: validateImageFileDimensions 호출 (비동기 로딩 발생)
      const result = await validateImageFileDimensions({
        file,
        hasMinimum: false, // DESC: 정확한 크기 일치 요구
        standardWidth: 1024,
        standardHeight: 768,
      });

      // THEN: checkDimensions 로직에 따라 'valid' 반환
      expect(result).toBe("valid");
    });

    test("onerror 실패되면 revokeObjectURL 호출되고 false를 반환.", async () => {
      // GIVEN: 이미지 로딩 실패 (onerror) 모킹
      mockImageObject({ width: 0, height: 0, succeed: false });
      // GIVEN: URL.createObjectURL 및 URL.revokeObjectURL 스파이 참조
      const mockCreateObjectURL = vi.mocked(URL.createObjectURL);
      const mockRevokeObjectURL = vi.mocked(URL.revokeObjectURL);

      // GIVEN: 테스트용 File 객체 생성
      const file = new File(["x"], "a.png", { type: "image/png" });

      // WHEN: validateImageFileDimensions 호출 (비동기 로딩 발생)
      const result = await validateImageFileDimensions({
        file,
        hasMinimum: false,
        standardWidth: 100,
        standardHeight: 100,
      });

      // GIVEN: createObjectURL의 호출 결과 (모킹된 URL) 캡처
      const createdUrl = mockCreateObjectURL.mock.results[0]?.value;

      // THEN: 로딩 실패 시 revokeObjectURL이 같은 URL로 호출되었는지 확인 (메모리 해제)
      expect(mockRevokeObjectURL).toHaveBeenCalledWith(createdUrl);
      // THEN: 실패 경로 반환 값이 false인지 확인
      expect(result).toBe(false);
    });
  });
});
