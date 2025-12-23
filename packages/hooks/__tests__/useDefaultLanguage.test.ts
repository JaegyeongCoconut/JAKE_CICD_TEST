import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { Languages } from "@repo/types";

import useDefaultLanguage from "@packages/hooks/useDefaultLanguage";

// DESC: setup.ts에 정의된 useDefaultLanguage hook을 오버라이드(Override)
// DESC: setup.ts에 mock hook이 먼저 로드되기 때문에 renderHook으로 hook 호출 시
// DESC: 실제 useDefaultLanguage.ts가 아닌 setup.ts의 useDefaultLanguage hook을 참조
// DESC: 이로 인해 t 함수가 실제로 실행되지 않아 테스트에서 해당 테스트 코드에서 에러 발생
// GIVEN: useDefaultLanguage hook 자체를 Mocking하여 실제 hook 파일을 로드
vi.mock("@packages/hooks/useDefaultLanguage", async () => {
  const actual = await vi.importActual("@packages/hooks/useDefaultLanguage");
  // DESC: 실제 모듈의 default export를 반환하여 hook 구현체를 사용
  return { default: actual.default };
});
// GIVEN: react-i18next의 useTranslation hook Mock
const mockTranslation = vi.fn();
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: mockTranslation }), // DESC: t 함수를 Mock으로 제공
}));

const translated = "Translated" as Languages;
const notTranslated = "Not translated" as Languages;

describe("useDefaultLanguage Test", () => {
  // DESC: 각 테스트 전에 Mock T 함수 설정 및 초기화
  beforeEach(() => {
    mockTranslation.mockClear(); // DESC: t 함수 호출 기록 초기화
    // DESC: t 함수의 구현 Mock: translated를 받으면 동일 값 반환, 그 외는 NON_TRANSLATED_TEXT 반환
    mockTranslation.mockImplementation((text) =>
      text === translated ? translated : notTranslated,
    );
  });

  // WHEN: 최소 필수 인자(text)만 전달했을 때의 동작 검증
  it.each([
    { text: translated, expected: translated },
    { text: notTranslated, expected: notTranslated },
  ])(
    "text key가 '$text'일 때, t 함수가 올바른 옵션으로 호출되며 '$expected'를 반환.",
    ({ text, expected }) => {
      // WHEN: hook 렌더링
      const { result } = renderHook(() => useDefaultLanguage());

      // WHEN: defaultLanguage 함수 호출
      const returnValue = result.current.defaultLanguage({ text });

      // THEN: mockTranslation 함수가 'text'와 { defaultValue: text } 옵션으로 호출되었는지 확인
      expect(mockTranslation).toHaveBeenCalledWith(text, {
        defaultValue: text, // DESC: defaultValue가 명시되지 않으면 text 값으로 자동 설정되는지 검증
      });

      // THEN: 반환 값이 Mock T 함수의 예상 결과와 일치하는지 확인
      expect(returnValue).toBe(expected);
    },
  );

  it("모든 옵션 인자를 전달했을 때, t 함수에 옵션 객체를 확인.", () => {
    // WHEN: hook 렌더링
    const { result } = renderHook(() => useDefaultLanguage());

    // WHEN: 모든 i18next 옵션을 포함하여 defaultLanguage 함수 호출
    const returnValue = result.current.defaultLanguage({
      text: translated,
      defaultValue: translated,
      fallbackLng: "en",
      lng: "lo",
      N: undefined,
    });

    // THEN: mockTranslation 함수가 모든 옵션 인자를 그대로 전달받았는지 확인
    expect(mockTranslation).toHaveBeenCalledWith(translated, {
      defaultValue: translated,
      fallbackLng: "en",
      lng: "lo",
      N: undefined,
    });

    // THEN: 반환 값 확인
    expect(returnValue).toBe(translated);
  });

  it("defaultValue가 undefined일 때, text 값으로 대체", () => {
    // WHEN: hook 렌더링
    const { result } = renderHook(() => useDefaultLanguage());

    // WHEN: text는 유효하지만 defaultValue를 undefined로 명시하여 호출
    const returnValue = result.current.defaultLanguage({
      text: translated,
      defaultValue: undefined,
    });

    // THEN: hook 내부 로직이 defaultValue를 text 값으로 대체하여 T 함수에 전달했는지 확인
    expect(mockTranslation).toHaveBeenCalledWith(translated, {
      defaultValue: translated, // DESC: undefined 대신 text가 들어감
    });

    // THEN: 반환 값 확인
    expect(returnValue).toBe(translated);
  });
});
