import { renderHook, act } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import type { LanguageType } from "@repo/types";

import useChangeLanguage from "@packages/hooks/useChangeLanguage";

// GIVEN: i18n.changeLanguage 함수를 Mock으로 설정
const mockChangeLanguage = vi.fn();
// GIVEN: useTranslation hook을 Mocking하여 위에서 정의한 mockChangeLanguage 함수 주입
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ i18n: { changeLanguage: mockChangeLanguage } }),
}));

describe("useChangeLanguage Test", () => {
  test("selectLanguage 호출 시 i18n.changeLanguage와 changeAuthLanguageCode를 모두 호출함.", () => {
    // GIVEN: 인증 언어 코드 변경 콜백 Mock 함수 준비
    const changeAuthLanguageCode = vi.fn();
    // GIVEN: hook 렌더링 (isAuth=true)
    const { result } = renderHook(() =>
      useChangeLanguage({
        isAuth: true,
        authLanguage: "en",
        changeAuthLanguageCode,
      }),
    );

    // WHEN: 언어를 'lo'로 변경하는 selectLanguage 함수 호출 (act로 감싸 동기 처리)
    act(() => {
      result.current.selectLanguage("lo");
    });

    // THEN: i18n.changeLanguage가 변경된 언어 코드 'lo'로 호출되었는지 확인
    expect(mockChangeLanguage).toHaveBeenCalledWith("lo");
    // THEN: changeAuthLanguageCode 콜백도 변경된 언어 코드 'lo'로 호출되었는지 확인
    expect(changeAuthLanguageCode).toHaveBeenCalledWith("lo");
  });

  test("마운트 시 isAuth=false면 changeLanguage를 호출 안 함.", () => {
    // WHEN: hook 렌더링 (isAuth=false)
    renderHook(() =>
      useChangeLanguage({
        isAuth: false,
        authLanguage: "en",
        changeAuthLanguageCode: vi.fn(),
      }),
    );

    // THEN: i18n.changeLanguage가 호출되지 않았는지 확인
    expect(mockChangeLanguage).not.toHaveBeenCalled();
  });

  test("마운트 시 isAuth=true & authLanguage 유효하다면 해당 언어로 changeLanguage 호출함.", () => {
    // WHEN: hook 렌더링 (isAuth=true, authLanguage='en')
    renderHook(() =>
      useChangeLanguage({
        isAuth: true,
        authLanguage: "en",
        changeAuthLanguageCode: vi.fn(),
      }),
    );

    // THEN: i18n.changeLanguage가 유효한 인증 언어 코드 'en'으로 호출되었는지 확인
    expect(mockChangeLanguage).toHaveBeenCalledWith("en");
  });

  test("마운트 시 isAuth=true & authLanguage 무효하다면 기본값 'lo'로 changeLanguage 호출함.", () => {
    // WHEN: hook 렌더링 (isAuth=true, authLanguage=undefined)
    renderHook(() =>
      useChangeLanguage({
        isAuth: true,
        authLanguage: undefined,
        changeAuthLanguageCode: vi.fn(),
      }),
    );

    // THEN: i18n.changeLanguage가 기본값 'lo'로 호출되었는지 확인
    expect(mockChangeLanguage).toHaveBeenCalledWith("lo");
  });

  test("마운트 시 isAuth=true & authLanguage가 유효하지 않은 코드면 기본값 'lo'로 설정함.", () => {
    // GIVEN: 인증 언어 코드 변경 콜백 Mock 함수 준비
    const changeAuthLanguageCode = vi.fn();

    // WHEN: hook 렌더링 (isAuth=true, authLanguage='xx' - 유효하지 않은 코드)
    renderHook(() =>
      useChangeLanguage({
        isAuth: true,
        authLanguage: "xx" as LanguageType,
        changeAuthLanguageCode,
      }),
    );

    // THEN: 유효하지 않은 코드 대신 기본값 'lo'로 i18n.changeLanguage 호출
    expect(mockChangeLanguage).toHaveBeenCalledWith("lo");
    // THEN: changeAuthLanguageCode 콜백도 기본값 'lo'로 호출되었는지 확인 (언어 코드가 교정되었으므로)
    expect(changeAuthLanguageCode).toHaveBeenCalledWith("lo");
  });
});
