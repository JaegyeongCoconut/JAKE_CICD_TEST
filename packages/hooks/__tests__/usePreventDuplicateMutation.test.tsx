import type { PropsWithChildren } from "react";
import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, vi, test } from "vitest";

import usePreventDuplicateMutation from "@packages/hooks/usePreventDuplicateMutation";

// GIVEN: 매 테스트마다 독립적인 QueryClient를 생성하고 Wrapper를 반환하는 헬퍼 함수
const createWrapper = () => {
  // DESC: 독립적인 QueryClient 인스턴스 생성
  const client: QueryClient = new QueryClient();

  // DESC: 테스트하려는 hook을 QueryClientProvider로 감싼 컴포넌트
  const Wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );

  return { Wrapper };
};

describe("usePreventDuplicateMutation Test", () => {
  test("같은 mutationKey로 동시 호출 시 1회만 실행되고, 2번째 호출은 즉시 undefined를 반환.", async () => {
    // GIVEN: QueryClient 래퍼와 Mock 데이터
    const { Wrapper } = createWrapper();
    const mockData = "OK";

    // GIVEN: 즉시 성공(Resolved)하는 비동기 Mock 함수
    const mutationFn = vi.fn().mockResolvedValue(mockData);

    // GIVEN: 중복 방지 hook 렌더링
    const { result } = renderHook(
      () =>
        usePreventDuplicateMutation<string, Error, { x: number }>({
          mutationKey: ["duplicate"], // DESC: 동일한 키로 중복 검사
          mutationFn,
        }),
      { wrapper: Wrapper },
    );

    // WHEN: 하나의 act 블록에서 두 번의 호출을 연속 실행하여 중복 시나리오 유발
    await act(async () => {
      // DESC: 1. 첫 호출 시작 (await 하지 않아 펜딩 상태 유지)
      const promise1 = result.current.mutateAsync({ x: 1 });
      // DESC: 2. 같은 키로 두 번째 호출 시도 => 락이 걸려 곧바로 undefined 반환을 기대
      const result2 = await result.current.mutateAsync({ x: 2 });

      // THEN: 두 번째 호출 결과가 undefined (차단됨)인지 확인
      expect(result2).toBeUndefined();

      // DESC: 3. 첫 호출이 완료되기를 기다리고 결과 검증
      const result1 = await promise1;

      // THEN: 첫 호출 결과가 성공적인 Mock 데이터인지 확인
      expect(result1).toBe(mockData);
    });

    // THEN: 실제 mutationFn(네트워크 요청)은 단 한 번만 호출되었는지 확인
    expect(mutationFn).toHaveBeenCalledOnce();
  });

  test("다른 mutationKey끼리는 동시에 실행됨.", async () => {
    // GIVEN: QueryClient 래퍼와 Mock 데이터
    const { Wrapper } = createWrapper();

    const mockDataA = "A";
    const mockDataB = "B";

    // GIVEN: 독립적인 MutationFn Mock 설정
    const mutationFn1 = vi.fn().mockResolvedValue(mockDataA);
    const mutationFn2 = vi.fn().mockResolvedValue(mockDataB);

    // GIVEN: 키 A를 사용하는 hook 렌더링
    const { result: result1 } = renderHook(
      () =>
        usePreventDuplicateMutation<string, Error, void>({
          mutationKey: ["key-A"],
          mutationFn: mutationFn1,
        }),
      { wrapper: Wrapper },
    );

    // GIVEN: 키 B를 사용하는 hook 렌더링 (키가 다르므로 독립적)
    const { result: result2 } = renderHook(
      () =>
        usePreventDuplicateMutation<string, Error, void>({
          mutationKey: ["key-B"],
          mutationFn: mutationFn2,
        }),
      { wrapper: Wrapper },
    );

    // WHEN: 두 키를 동시에 호출하여 독립 실행을 검증
    await act(async () => {
      const promise1 = result1.current.mutateAsync();
      const promise2 = result2.current.mutateAsync();

      // DESC: 두 호출 완료를 동시에 기다림
      const [resultA, resultB] = await Promise.all([promise1, promise2]);

      // THEN: 각 mutationFn이 정확히 한 번씩 독립적으로 호출됐는지 확인
      expect(mutationFn1).toHaveBeenCalledOnce();
      expect(mutationFn2).toHaveBeenCalledOnce();

      // THEN: 각 결과가 모킹 데이터와 일치하는지 검증
      expect(resultA).toBe(mockDataA);
      expect(resultB).toBe(mockDataB);
    });
  });

  test("onSuccess는 중복 호출되지 않습니다(2번째 호출은 undefined 처리).", async () => {
    // GIVEN: QueryClient 래퍼, Mock 데이터 및 onSuccess 스파이
    const { Wrapper } = createWrapper();
    const mockData = "OK";

    const mutationFn = vi.fn().mockResolvedValue(mockData);
    const onSuccess = vi.fn();

    // GIVEN: onSuccess 옵션을 포함하여 hook 렌더링
    const { result } = renderHook(
      () =>
        usePreventDuplicateMutation<string, Error, void>({
          mutationKey: ["success"],
          mutationFn,
          options: { onSuccess },
        }),
      { wrapper: Wrapper },
    );

    // WHEN: 중복 호출 시나리오 유발
    await act(async () => {
      // DESC: 첫 호출 시작
      const promise1 = result.current.mutateAsync();
      // DESC: 두 번째 호출 시도 (undefined 반환 기대)
      const result2 = await result.current.mutateAsync();

      expect(result2).toBeUndefined();
      // DESC: 첫 호출 완료
      const result1 = await promise1;

      expect(result1).toBe(mockData);
    });

    // THEN: onSuccess 콜백이 첫 번째 호출에 대해서만 1회 호출되었는지 확인
    expect(onSuccess).toHaveBeenCalledOnce();
    // THEN: onSuccess의 인자(data, variables, context) 검증
    expect(onSuccess).toHaveBeenCalledWith(mockData, undefined, undefined);
  });

  test("에러가 발생해도 락이 해제되어 이후 같은 key로 다시 호출이 가능함.", async () => {
    // GIVEN: QueryClient 래퍼 및 에러/성공 Mock 데이터
    const { Wrapper } = createWrapper();
    const errorMessage = "BOOM";
    const recoveryData = "RECOVERED";

    // GIVEN: mutationFn을 첫 호출은 실패(Reject), 두 번째 호출은 성공(Resolve)하도록 설정
    const mutationFn = vi
      .fn()
      .mockRejectedValueOnce(new Error(errorMessage))
      .mockResolvedValueOnce(recoveryData);

    // GIVEN: 콜백 스파이
    const onError = vi.fn();
    const onSuccess = vi.fn();

    const { result } = renderHook(
      () =>
        usePreventDuplicateMutation<string, Error, void>({
          mutationKey: ["error-then-ok"],
          mutationFn,
          options: { onError, onSuccess },
        }),
      { wrapper: Wrapper },
    );

    // WHEN: 1. 첫 호출 시도 → 실패 (락 해제 기대)
    // DESC: act와 expect().rejects를 함께 사용하여 에러 발생 검증
    await expect(act(async () => result.current.mutateAsync())).rejects.toThrow(
      errorMessage,
    );

    // THEN: onError 콜백이 1회 호출되었는지 비동기적으로 보장
    await waitFor(() => {
      expect(onError).toHaveBeenCalledOnce();
    });

    // WHEN: 2. 락이 해제된 후 같은 키로 재호출 → 성공 기대
    await act(async () => {
      const promise = result.current.mutateAsync();
      const value = await promise;
      // THEN: 재호출 결과가 성공 Mock 데이터인지 확인
      expect(value).toBe("RECOVERED");
    });

    // THEN: onSuccess 콜백이 재호출에 대해 1회 호출되었는지 보장
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledOnce();
    });

    // THEN: mutationFn이 총 2회(실패 1, 성공 1) 호출되었는지 최종 검증
    expect(mutationFn).toHaveBeenCalledTimes(2);
  });

  test("중복 호출의 두 번째 결과는 onSettled 등 에도 전달 안 됨.", async () => {
    // GIVEN: QueryClient 래퍼, Mock 데이터 및 콜백 스파이
    const { Wrapper } = createWrapper();
    const mockData = "OK";

    const mutationFn = vi.fn().mockResolvedValue(mockData);

    const onSettled = vi.fn();
    const onSuccess = vi.fn();
    const onError = vi.fn();

    const { result } = renderHook(
      () =>
        usePreventDuplicateMutation<string, Error, void>({
          mutationKey: ["settled"],
          mutationFn,
          options: { onSettled, onSuccess, onError },
        }),
      { wrapper: Wrapper },
    );

    // WHEN: 중복 호출 시나리오 유발
    await act(async () => {
      const promise1 = result.current.mutateAsync();
      // DESC: 두 번째 호출은 즉시 undefined 반환을 기대
      const value2 = await result.current.mutateAsync();
      expect(value2).toBeUndefined();
      // DESC: 첫 호출 완료
      const value1 = await promise1;
      expect(value1).toBe(mockData);
    });

    // THEN: 중복 호출 차단(undefined 반환)으로 인해 콜백이 추가 호출되지 않았는지 비동기적으로 보장
    await waitFor(() => {
      // DESC: 에러 콜백은 호출되지 않아야 함
      expect(onError).toHaveBeenCalledTimes(0);
      // DESC: 첫 호출에 대해서만 onSuccess가 1회 호출
      expect(onSuccess).toHaveBeenCalledOnce();
      // DESC: 첫 호출에 대해서만 onSettled가 1회 호출
      expect(onSettled).toHaveBeenCalledOnce();
    });

    // THEN: 실제 네트워크 함수는 1회만 호출되었는지 최종 검증
    expect(mutationFn).toHaveBeenCalledOnce();
  });
});
