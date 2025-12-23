import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";
import * as validationUtils from "@repo/utils/validation";

import useResetPasswordForm from "../useResetPasswordForm";

describe("useResetPasswordForm Test", () => {
  test("useResetPasswordForm hook 마운트 시 DEFAULT_VALUES으로 초기화합니다.", () => {
    // WHEN: hook 렌더링
    const { result } = renderHook(() => useResetPasswordForm());

    const formValues = result.current.formMethod.getValues();

    // THEN: 모든 폼 필드가 중첩된 구조와 기본값(빈 문자열, null, false)으로 초기화되었는지 확인
    expect(formValues).toEqual({
      verify: {
        email: "",
        verificationCode: "",
        token: null,
        isAuthCodeSend: false,
        hasVerified: false,
      },
      newPassword: "",
      confirmPassword: "",
    });
  });

  test("mode: onTouched로, 터치 전에는 에러가 발생하지 않습니다.", async () => {
    // GIVEN: hook 렌더링
    const { result } = renderHook(() => useResetPasswordForm());
    const { formMethod } = result.current;

    // THEN: 초기에는 에러가 없는지 확인
    expect(formMethod.formState.errors).toEqual({});

    // WHEN: trigger 호출 없이 모든 필드에 값을 설정 (setValue만 실행)
    act(() => {
      formMethod.setValue("verify.email", "");
      formMethod.setValue("verify.verificationCode", "");
      formMethod.setValue("verify.token", "");
      formMethod.setValue("verify.isAuthCodeSend", false);
      formMethod.setValue("verify.hasVerified", false);
      formMethod.setValue("newPassword", "");
      formMethod.setValue("confirmPassword", "");
    });

    // THEN: mode: onTouched/onChange 설정에 따라 터치(trigger/blur/submit)가 없었으므로 에러가 여전히 발생하지 않아야 함
    expect(formMethod.formState.errors).toEqual({});
  });

  test("모든 필드가 유효할 때, handleSubmit 호출 시 onValid가 호출됩니다.", async () => {
    // GIVEN: hook 렌더링 및 onValid Mock 함수
    const { result } = renderHook(() => useResetPasswordForm());
    const { formMethod } = result.current;
    const onValid = vi.fn();

    // WHEN: 모든 필드에 유효한 값 설정
    act(() => {
      formMethod.setValue("verify.email", "user@example.com");
      formMethod.setValue("verify.verificationCode", "123456");
      formMethod.setValue("verify.token", "a1s2d3f4");
      formMethod.setValue("verify.isAuthCodeSend", true);
      formMethod.setValue("verify.hasVerified", true);
      formMethod.setValue("newPassword", "qwer1234");
      formMethod.setValue("confirmPassword", "qwer1234");
    });

    // WHEN: handleSubmit 함수 호출 (onValid 실행 기대)
    await act(() => formMethod.handleSubmit(onValid, () => {})());

    // THEN: onValid 함수가 1회 호출되었는지 확인
    expect(onValid).toHaveBeenCalledTimes(1);
    // THEN: onValid에 전달된 최종 폼 데이터가 설정 값과 일치하는지 확인
    expect(onValid.mock.calls[0][0]).toEqual({
      verify: {
        email: "user@example.com",
        verificationCode: "123456",
        token: "a1s2d3f4",
        isAuthCodeSend: true,
        hasVerified: true,
      },
      newPassword: "qwer1234",
      confirmPassword: "qwer1234",
    });
  });

  describe("OPTIONAL_FIELD 검증 테스트 (조건부 필드)", () => {
    test("isAuthCodeSend가 false일 때, verificationCode 필드는 선택값이 되어 에러가 발생하지 않습니다.", async () => {
      // GIVEN: hook 렌더링 (isAuthCodeSend 기본값 false)
      const { result } = renderHook(() => useResetPasswordForm());
      const { formMethod } = result.current;

      expect(formMethod.formState.errors).toEqual({});

      // WHEN: verify.isAuthCodeSend가 false인 상태에서 verificationCode 필드에 대한 유효성 검사 트리거
      await act(async () => formMethod.trigger("verify.verificationCode"));

      // THEN: 필드가 선택적이므로 빈 문자열에도 불구하고 에러가 없어야 함
      expect(formMethod.formState.errors).toEqual({});
    });

    test("hasVerified가 false일 때, newPassword, confirmPassword 필드는 선택값이 되어 에러가 발생하지 않습니다.", async () => {
      // GIVEN: hook 렌더링 (hasVerified 기본값 false)
      const { result } = renderHook(() => useResetPasswordForm());
      const { formMethod } = result.current;

      expect(formMethod.formState.errors).toEqual({});

      // WHEN: hasVerified가 false인 상태에서 newPassword, confirmPassword 필드에 대한 유효성 검사 트리거
      await act(async () => {
        await formMethod.trigger("newPassword");
        await formMethod.trigger("confirmPassword");
      });

      // THEN: 필드가 선택적이므로 빈 문자열에도 불구하고 에러가 없어야 함
      expect(formMethod.formState.errors).toEqual({});
    });
  });

  describe("REQUIRED_FIELD 검증 테스트", () => {
    test("이메일이 빈 문자열이면 에러가 발생합니다.", async () => {
      // GIVEN: hook 렌더링
      const { result } = renderHook(() => useResetPasswordForm());
      const { formMethod } = result.current;

      expect(formMethod.formState.errors).toEqual({});

      // WHEN: verify.email 값을 빈 문자열로 설정 및 트리거 호출
      act(() => formMethod.setValue("verify.email", ""));
      await act(() => formMethod.trigger("verify.email"));

      const { errors } = formMethod.formState;

      // THEN: 이메일 필수 값 에러 메시지 확인
      expect(errors.verify?.email?.message).toBe(COMMON_ERROR_MESSAGE.FIELD);
    });

    test("isAuthCodeSend가 true일 때 verificationCode 필드가 필수로 변경되고 빈 문자열이면 에러가 발생합니다.", async () => {
      // GIVEN: hook 렌더링
      const { result } = renderHook(() => useResetPasswordForm());
      const { formMethod } = result.current;

      expect(formMethod.formState.errors).toEqual({});

      // WHEN: verify.isAuthCodeSend 값을 true로 변경 (필수 조건 활성화)
      act(() => formMethod.setValue("verify.isAuthCodeSend", true));

      // WHEN: verificationCode 필드(현재 빈 문자열)에 대해 유효성 검사 트리거
      await act(async () => formMethod.trigger("verify.verificationCode"));

      const { errors } = formMethod.formState;

      // THEN: verificationCode 필수 값 에러 메시지 확인
      expect(errors.verify?.verificationCode?.message).toBe(
        COMMON_ERROR_MESSAGE.FIELD,
      );
    });

    test("hasVerified가 true일 때, newPassword, confirmPassword 필드가 필수값이 되고 빈 문자열이면 에러가 발생합니다.", async () => {
      // GIVEN: hook 렌더링
      const { result } = renderHook(() => useResetPasswordForm());
      const { formMethod } = result.current;

      expect(formMethod.formState.errors).toEqual({});

      // WHEN: verify.hasVerified 값을 true로 변경 (필수 조건 활성화)
      act(() => formMethod.setValue("verify.hasVerified", true));

      // WHEN: newPassword, confirmPassword 필드(현재 빈 문자열)에 대해 유효성 검사 트리거
      await act(async () => {
        await formMethod.trigger("newPassword");
        await formMethod.trigger("confirmPassword");
      });

      const { errors } = formMethod.formState;

      // THEN: 두 비밀번호 필드 모두 필수 값 에러 메시지 확인
      expect(errors.newPassword?.message).toBe(COMMON_ERROR_MESSAGE.FIELD);
      expect(errors.confirmPassword?.message).toBe(COMMON_ERROR_MESSAGE.FIELD);
    });
  });

  describe("이메일 유효성 검사 테스트", () => {
    test("유효하지 않은 이메일 형식은 에러가 발생합니다.", async () => {
      // GIVEN: 이메일 유효성 검증 유틸함수 spy 설정
      const spyCheckEmailValidation = vi.spyOn(
        validationUtils,
        "checkEmailValidation",
      );
      const { result } = renderHook(() => useResetPasswordForm());
      const { formMethod } = result.current;

      expect(formMethod.formState.errors).toEqual({});

      // WHEN: 유효하지 않은 이메일 형식 설정 및 트리거 호출
      act(() => formMethod.setValue("verify.email", "user@"));
      await act(() => formMethod.trigger("verify.email"));

      const { errors } = formMethod.formState;

      // THEN: 유틸 함수 호출 확인
      expect(spyCheckEmailValidation).toHaveBeenCalledTimes(1);
      // THEN: 이메일 형식 에러 메시지 확인
      expect(errors.verify?.email?.message).toBe(
        COMMON_ERROR_MESSAGE.EMAIL_VALID,
      );
    });
  });

  describe("비밀번호 유효성 검사 테스트", () => {
    test("hasVerified가 true일 때, newPassword 비밀번호 길이가 8자리 미만이거나 20자리를 초과하면 에러가 발생합니다.", async () => {
      // GIVEN: 비밀번호 길이 검증 유틸함수 spy 설정
      const spyCheckPasswordLength = vi.spyOn(
        validationUtils,
        "checkPasswordLength",
      );
      const { result } = renderHook(() => useResetPasswordForm());
      const { formMethod } = result.current;

      expect(formMethod.formState.errors).toEqual({});

      // WHEN: hasVerified=true, 길이가 8자리 미만인 비밀번호 설정
      act(() => {
        formMethod.setValue("verify.hasVerified", true);
        formMethod.setValue("newPassword", "qw12");
      });

      // WHEN: newPassword 필드 트리거 호출
      await act(() => formMethod.trigger("newPassword"));

      const { errors } = formMethod.formState;

      // THEN: 유틸 함수 호출 확인
      expect(spyCheckPasswordLength).toHaveBeenCalledTimes(1);
      // THEN: 비밀번호 길이 에러 메시지 확인
      expect(errors.newPassword?.message).toBe(
        COMMON_ERROR_MESSAGE.PASSWORD_LENGTH,
      );
    });

    test("hasVerified가 true일 때, 유효하지 않은 newPassword 비밀번호 형식은 에러가 발생합니다.", async () => {
      // GIVEN: 비밀번호 형식 검증 유틸함수 spy 설정
      const spyCheckPasswordType = vi.spyOn(
        validationUtils,
        "checkPasswordType",
      );
      const { result } = renderHook(() => useResetPasswordForm());
      const { formMethod } = result.current;

      expect(formMethod.formState.errors).toEqual({});

      // WHEN: hasVerified=true, 형식(숫자로만 구성)이 유효하지 않은 비밀번호 설정
      act(() => {
        formMethod.setValue("verify.hasVerified", true);
        formMethod.setValue("newPassword", "12345678"); // 영문/특수문자 없음
      });

      // WHEN: newPassword 필드 트리거 호출
      await act(() => formMethod.trigger("newPassword"));

      const { errors } = formMethod.formState;

      // THEN: 유틸 함수 호출 확인
      expect(spyCheckPasswordType).toHaveBeenCalledTimes(1);
      // THEN: 비밀번호 형식 에러 메시지 확인
      expect(errors.newPassword?.message).toBe(
        COMMON_ERROR_MESSAGE.PASSWORD_TYPE,
      );
    });

    test("hasVerified가 true일 때, newPassword와 confirmPassword 값이 다르면 에러가 발생합니다.", async () => {
      // GIVEN: hook 렌더링
      const { result } = renderHook(() => useResetPasswordForm());
      const { formMethod } = result.current;

      expect(formMethod.formState.errors).toEqual({});

      // WHEN: hasVerified=true, newPassword와 confirmPassword 값을 다르게 설정
      act(() => {
        formMethod.setValue("verify.hasVerified", true);
        formMethod.setValue("newPassword", "qwer1234");
        formMethod.setValue("confirmPassword", "qwer12"); // 다름
      });

      // WHEN: 두 필드에 대해 유효성 검사 트리거 호출
      await act(async () => {
        await formMethod.trigger("newPassword");
        await formMethod.trigger("confirmPassword");
      });

      const { errors } = formMethod.formState;

      // THEN: confirmPassword 필드에 일치 에러 메시지 확인
      expect(errors.confirmPassword?.message).toBe(
        COMMON_ERROR_MESSAGE.PASSWORD_CONFIRM,
      );
    });
  });
});
