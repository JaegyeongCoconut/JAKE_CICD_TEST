import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, test, vi } from "vitest";

import { COMMON_ERROR_MESSAGE } from "@repo/constants/error/message";
import * as validationUtils from "@repo/utils/validation";

import useVersionForm from "@packages/hooks/useVersionForm";
import type { VersionFormSchema } from "@packages/schemas/versionForm.schema";

// GIVEN: 폼 내부에 사용되는 필드 키 목록
const KEYS = ["old", "new", "test", "os", "platform"] as const;

describe("useVersionForm Test", () => {
  test("Form에 version 데이터가 전달되지 않으면, INIT_FORM으로 초기화함.", () => {
    // WHEN: version prop 없이 hook 렌더링
    const { result } = renderHook(() => useVersionForm({ version: undefined }));

    // WHEN: 폼 값 조회
    const formValues = result.current.formMethod.getValues();

    // THEN: 모든 필드가 초기 빈 값으로 설정되었는지 확인
    expect(formValues).toEqual({
      old: "",
      new: "",
      test: "",
      os: null, // DESC: select 필드는 null로 초기화
      platform: null,
    });
  });

  describe("서버 데이터의 각 데이터가 undefined인 케이스", () => {
    const INIT_FORM: VersionFormSchema = {
      old: "1.0.0",
      new: "1.0.1",
      test: "0.0.1",
      os: "android",
      platform: "move",
    };

    it.each(KEYS.map((k) => [k]))(
      "'%s'가 undefined이면 해당 키만 INIT_FORM 값으로 대체",
      (key) => {
        // GIVEN: 특정 필드만 undefined인 version 객체 생성
        const version = { ...INIT_FORM, [key]: undefined };

        // WHEN: version 객체와 함께 hook 렌더링
        const { result } = renderHook(() => useVersionForm({ version }));
        const formValues = result.current.formMethod.getValues();

        // THEN: undefined였던 필드는 빈 값(문자열/null)으로 대체되고, 나머지는 INIT_FORM 값을 유지하는지 확인
        const expected = {
          old: key === "old" ? "" : INIT_FORM.old,
          new: key === "new" ? "" : INIT_FORM.new,
          test: key === "test" ? "" : INIT_FORM.test,
          os: key === "os" ? null : INIT_FORM.os,
          platform: key === "platform" ? null : INIT_FORM.platform,
        };

        expect(formValues).toEqual(expected);
      },
    );
  });

  test("mode: onTouched로, 터치 전에는 에러가 발생 안 함.", async () => {
    // GIVEN: 빈 값으로 hook 렌더링
    const { result } = renderHook(() => useVersionForm({ version: undefined }));

    // THEN: 초기 상태에서 에러 객체는 비어 있음
    expect(result.current.formMethod.formState.errors).toEqual({});

    // WHEN: 필드에 빈 값을 설정 (setValue)
    // NOTE: react-hook-form의 mode: onTouched에서는 setValue만으로는 에러가 발생 안 함.
    act(() => {
      result.current.formMethod.setValue("old", "");
      result.current.formMethod.setValue("new", "");
      result.current.formMethod.setValue("test", "");
    });

    // THEN: trigger가 호출되지 않았기 때문에, 여전히 에러가 발생하지 않아야 함 (빈 객체 유지)
    expect(result.current.formMethod.formState.errors).toEqual({});
  });

  test("touch 후 REQUIRED_STRING 유효성 에러가 발생함.", async () => {
    // GIVEN: 빈 값으로 hook 렌더링
    const { result } = renderHook(() => useVersionForm({ version: undefined }));

    // WHEN: 모든 필수 필드에 대해 수동으로 유효성 검사(trigger) 실행 (이는 touch를 흉내냄)
    await act(() => result.current.formMethod.trigger(KEYS));

    // WHEN: 에러 상태 조회
    const { errors } = result.current.formMethod.formState;

    // THEN: 버전 필드들에 필수값 에러 메시지가 설정되었는지 확인
    expect(errors.old?.message).toBe(COMMON_ERROR_MESSAGE.FIELD);
    expect(errors.new?.message).toBe(COMMON_ERROR_MESSAGE.FIELD);
    expect(errors.test?.message).toBe(COMMON_ERROR_MESSAGE.FIELD);
  });

  describe("checkVersion 테스트 케이스", () => {
    it.each(
      ["135134", "abcd", "!@#$"].flatMap((input) =>
        ["old", "new", "test"].map((key) => [input, key]),
      ),
    )(
      "'%s'가 '%s'에 전달되면 checkVersion을 통과하지 못해 에러가 발생함.",
      async (input, key) => {
        const fieldKey = key as (typeof KEYS)[number];
        // GIVEN: checkVersion 유틸리티 함수의 호출을 감시
        const spyCheckVersion = vi.spyOn(validationUtils, "checkVersion");

        // GIVEN: 빈 값으로 hook 렌더링
        const { result } = renderHook(() =>
          useVersionForm({ version: undefined }),
        );

        // WHEN: 현재 순회 중 필드에 유효하지 않은 입력값 설정
        act(() => {
          result.current.formMethod.setValue(fieldKey, input);
        });

        // WHEN: 해당 필드만 trigger하여 유효성 검사를 실행
        await act(() => result.current.formMethod.trigger([fieldKey]));

        // THEN: checkVersion이 해당 입력값으로 호출되었는지 확인
        const { errors } = result.current.formMethod.formState;

        expect(spyCheckVersion).toHaveBeenCalledWith(input);
        // THEN: 버전 형식 에러 메시지가 설정되었는지 확인
        expect(errors[fieldKey]?.message).toBe(
          COMMON_ERROR_MESSAGE.VERSION_INCORRECT,
        );
      },
    );
  });

  test("모든 필드 유효 시 handleSubmit의 onValid가 호출됨.", async () => {
    // GIVEN: 빈 값으로 hook 렌더링
    const { result } = renderHook(() => useVersionForm({ version: undefined }));

    // GIVEN: 모든 필드를 유효한 값으로 설정
    act(() => {
      result.current.formMethod.setValue("old", "1.2.3");
      result.current.formMethod.setValue("new", "1.2.3");
      result.current.formMethod.setValue("test", "1.2.3");
      result.current.formMethod.setValue("os", "android");
      result.current.formMethod.setValue("platform", "car");
    });

    // GIVEN: onValid/onInvalid 콜백 Mock 함수 준비
    const onValid = vi.fn();
    const onInvalid = vi.fn();

    // WHEN: handleSubmit 호출 (비동기 처리를 위해 act로 감쌈)
    await act(() =>
      result.current.formMethod.handleSubmit(onValid, onInvalid)(),
    );

    // THEN: 유효성 통과했으므로 onInvalid는 호출되지 않음
    expect(onInvalid).not.toHaveBeenCalled();
    // THEN: onValid가 1회 호출되었는지 확인
    expect(onValid).toHaveBeenCalledOnce();
    // THEN: onValid에 전달된 인자가 우리가 설정한 최종 폼 값과 동일한지 확인
    expect(onValid.mock.calls[0][0]).toEqual({
      old: "1.2.3",
      new: "1.2.3",
      test: "1.2.3",
      os: "android",
      platform: "car",
    });
  });
});
