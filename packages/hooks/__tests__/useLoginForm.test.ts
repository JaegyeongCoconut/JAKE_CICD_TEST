import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import * as validationUtils from "@repo/utils/validation";

import useLoginForm from "@packages/hooks/useLoginForm";

describe("useLoginForm Test", () => {
  test("초기 useLoginForm은 email, password 둘다 빈 string", () => {
    // WHEN: hook 렌더링
    const { result } = renderHook(() => useLoginForm());

    // THEN: React Hook Form의 getValues()를 통해 초기 값이 빈 객체와 일치하는지 확인
    expect(result.current.formMethod.getValues()).toEqual({
      email: "",
      password: "",
    });
  });

  describe("에러가 발생하는 케이스", () => {
    test("email에 빈 string이 전달되면 에러가 발생함.", async () => {
      // GIVEN: 유효성 검사 유틸 함수를 스파이하여 호출 여부 확인 준비
      const spyCheckEmailValidation = vi.spyOn(
        validationUtils,
        "checkEmailValidation",
      );
      // GIVEN: hook 렌더링
      const { result } = renderHook(() => useLoginForm());

      // WHEN: email 필드에 빈 문자열 설정
      act(() => {
        result.current.formMethod.setValue("email", "");
      });

      // WHEN: email 필드에 대한 유효성 검사 실행 (비동기 처리)
      const isValid = await act(() =>
        result.current.formMethod.trigger("email"),
      );

      // THEN: 유효성 검사 함수가 1회 호출되었는지 확인
      expect(spyCheckEmailValidation).toHaveBeenCalledOnce();

      // THEN: 유효성 검사 결과가 실패(false)인지 확인 (필수 필드 에러)
      expect(isValid).toBe(false);
    });

    test("email에 공백이 전달되면 에러가 발생함.", async () => {
      // GIVEN: hook 렌더링
      const { result } = renderHook(() => useLoginForm());

      // WHEN: email 필드에 공백 문자열 설정
      act(() => {
        result.current.formMethod.setValue("email", "    ");
      });

      // WHEN: email 필드에 대한 유효성 검사 실행
      const isValid = await act(() =>
        result.current.formMethod.trigger("email"),
      );

      // THEN: 유효성 검사 결과가 실패(false)인지 확인 (공백 처리 에러)
      expect(isValid).toBe(false);
    });

    test("email의 형식이 맞지 않으면 에러가 발생함.", async () => {
      // GIVEN: 유틸 함수 스파이 설정
      const spyCheckEmailValidation = vi.spyOn(
        validationUtils,
        "checkEmailValidation",
      );
      // GIVEN: hook 렌더링
      const { result } = renderHook(() => useLoginForm());

      // WHEN: 잘못된 형식의 이메일("abcd@") 설정
      act(() => {
        result.current.formMethod.setValue("email", "abcd@");
      });

      // WHEN: email 필드에 대한 유효성 검사 실행
      const isValid = await act(() => {
        return result.current.formMethod.trigger("email");
      });

      // THEN: 유효성 검사 함수 호출 확인
      expect(spyCheckEmailValidation).toHaveBeenCalledOnce();

      // THEN: 유효성 검사 결과가 실패(false)인지 확인 (형식 에러)
      expect(isValid).toBe(false);
    });

    test("email의 id 길이가 64 이상이면 에러가 발생함.", async () => {
      // GIVEN: 유틸 함수 스파이 설정
      const spyCheckEmailValidation = vi.spyOn(
        validationUtils,
        "checkEmailValidation",
      );
      // GIVEN: hook 렌더링
      const { result } = renderHook(() => useLoginForm());

      const emailId = "a".repeat(64);

      // WHEN: 64자 이상의 이메일 ID를 포함한 이메일 설정
      act(() => {
        result.current.formMethod.setValue("email", `${emailId}@test.com`);
      });

      // WHEN: email 필드에 대한 유효성 검사 실행
      const isValid = await act(() => {
        return result.current.formMethod.trigger("email");
      });

      // THEN: 유효성 검사 함수 호출 확인
      expect(spyCheckEmailValidation).toHaveBeenCalledOnce();

      // THEN: 유효성 검사 결과가 실패(false)인지 확인 (ID 길이 초과 에러)
      expect(isValid).toBe(false);
    });

    test("email의 domain 길이가 63 이상이면 에러가 발생함.", async () => {
      // GIVEN: 유틸 함수 스파이 설정
      const spyCheckEmailValidation = vi.spyOn(
        validationUtils,
        "checkEmailValidation",
      );
      // GIVEN: hook 렌더링
      const { result } = renderHook(() => useLoginForm());

      const emailDomain = "test".repeat(16); // 4 * 16 = 64자

      // WHEN: 63자 이상의 도메인 길이 설정
      act(() => {
        result.current.formMethod.setValue("email", `a@${emailDomain}.com`);
      });

      // WHEN: email 필드에 대한 유효성 검사 실행
      const isValid = await act(() => {
        return result.current.formMethod.trigger("email");
      });

      // THEN: 유효성 검사 함수 호출 확인
      expect(spyCheckEmailValidation).toHaveBeenCalledOnce();

      // THEN: 유효성 검사 결과가 실패(false)인지 확인 (도메인 길이 초과 에러)
      expect(isValid).toBe(false);
    });

    test("password에 빈 string이 전달되면 에러가 발생함.", async () => {
      // GIVEN: hook 렌더링
      const { result } = renderHook(() => useLoginForm());

      // WHEN: password 필드에 빈 문자열 설정
      act(() => {
        result.current.formMethod.setValue("password", "");
      });

      // WHEN: password 필드에 대한 유효성 검사 실행
      const isValid = await act(() =>
        result.current.formMethod.trigger("password"),
      );

      // THEN: 유효성 검사 결과가 실패(false)인지 확인 (필수 필드 에러)
      expect(isValid).toBe(false);
    });
  });
});
