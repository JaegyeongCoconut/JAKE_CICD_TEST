import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { useRecentSearchStore } from "@packages/stores/persist";

const hoisted = vi.hoisted(() => {
  // DESC: data: 실제 localStorage 역할을 수행하는 인메모리 저장소 객체
  const data: Record<string, string> = {};

  const mockStorage = {
    // DESC: getItem: data 객체에서 값을 가져오는 스파이 함수. persist 로드시 호출됨
    getItem: vi.fn((name: string) => data[name] || null),
    // DESC: setItem: data 객체에 값을 저장하는 스파이 함수. 상태 변경시 호출됨
    setItem: vi.fn((name: string, value: string) => (data[name] = value)),
    // DESC: removeItem: data 객체에서 키를 삭제하는 스파이 함수. clearStorage 호출시 사용됨
    removeItem: vi.fn((name: string) => delete data[name]),
  };

  // DESC: mockStorage 함수와 data 객체 자체를 모든 스코프에 노출시켜 접근 가능하도록 함
  return { mockStorage, data };
});

// DESC: zustand/middleware를 모킹하여 createJSONStorage의 기본 동작을 mock으로 대체
vi.mock("zustand/middleware", async () => {
  const actual = await vi.importActual("zustand/middleware");
  return {
    ...actual,
    // DESC: createJSONStorage를 모킹하여 우리의 mockStorage를 기반으로 JSON 처리 로직을 구현
    createJSONStorage: vi.fn(() => ({
      // DESC: getItem: 하위 mockStorage에서 JSON 문자열을 가져와 객체로 파싱
      getItem: vi.fn((name: string) => {
        const str = hoisted.mockStorage.getItem(name);
        return str ? JSON.parse(str) : null;
      }),
      // DESC: setItem: 객체를 받아 JSON.stringify로 문자열화하여 하위 mockStorage에 저장합
      setItem: vi.fn((name: string, value: unknown) => {
        hoisted.mockStorage.setItem(name, JSON.stringify(value));
      }),
      // DESC: removeItem: 하위 mockStorage의 removeItem을 그대로 사용
      removeItem: hoisted.mockStorage.removeItem,
    })),
  };
});

describe("useRecentSearhStore Test", () => {
  test("새로고침하여도 storage의 데이터는 유지되어야 함.", async () => {
    // GIVEN: Mock Storage에 이전 상태 데이터 주입
    const expectedCountryCodes = ["KR", "US", "CN"];
    const storedData = {
      version: 0,
      state: { countryCodes: expectedCountryCodes },
    };
    const expectedJsonString = JSON.stringify(storedData);

    // GIVEN: Mock Storage에 JSON 문자열 형태로 데이터를 미리 저장
    hoisted.data["recentSearchCountryCode"] = expectedJsonString;

    // THEN: Mock Storage가 우리가 넣은 문자열을 반환하는지 수동으로 확인
    expect(hoisted.mockStorage.getItem("recentSearchCountryCode")).toBe(
      expectedJsonString,
    );

    // WHEN: 모듈을 리셋하고 스토어를 새로 임포트하여 '새로고침'을 시뮬레이션
    // DESC: vi.resetModules(): 이전 스토어 인스턴스를 제거
    vi.resetModules();

    // DESC: await import(): 새로운 스토어 인스턴스를 비동기적으로 로드
    const { useRecentSearchStore: refreshedStore } = await import(
      "@packages/stores/persist"
    );

    // DESC: renderHook(): hook을 렌더링하여 persist 미들웨어의 비동기 로드(rehydration)를 시작
    renderHook(() => refreshedStore());

    // THEN: waitFor를 사용하여 비동기 로드 완료를 대기하고 검증
    await waitFor(() => {
      // DESC: hasHydrated(): 데이터 로드가 완료되었는지 확인
      expect(refreshedStore.persist.hasHydrated()).toBe(true);
      // DESC: getState(): 로드가 완료된 후 스토어의 최종 상태를 직접 검증
      expect(refreshedStore.getState().countryCodes).toEqual(
        expectedCountryCodes,
      );
    });
  });

  test("onAddCountryCode가 실행되면, 새로운 코드를 추가하고 중복을 제거하며 순서를 갱신해야 함.", () => {
    // GIVEN: hook 렌더링
    const { result } = renderHook(() => useRecentSearchStore());

    // WHEN: 중복을 포함하여 액션을 호출
    act(() => {
      result.current.onAddCountryCode("US"); // DESC: 1회 호출
      result.current.onAddCountryCode("CA"); // DESC: 2회 호출
      result.current.onAddCountryCode("US"); // DESC: 3회 호출 (중복 제거)
    });

    // THEN: 중복 없이, ["US", "CA"] 순서 확인
    expect(result.current.countryCodes).toEqual(["US", "CA"]);

    // DESC: setItem 호출 횟수: 상태 변경이 3번 있었으므로 3회 호출되었는지 확인
    expect(hoisted.mockStorage.setItem).toHaveBeenCalledTimes(3);

    // DESC: 최종 저장소 상태 내용 검증: 마지막 호출의 인수를 파싱하여 내용 확인
    const calls = hoisted.mockStorage.setItem.mock.calls;
    const [savedKey, savedValue] = calls[calls.length - 1] as [string, string];

    // DESC: 스토리지에 저장된 키가 올바른지 확인
    expect(savedKey).toBe("recentSearchCountryCode");

    const parsed = JSON.parse(savedValue);

    // DESC: 저장된 JSON 내용이 최종 상태를 포함하는지 부분적으로 검증
    expect(parsed).toEqual(
      expect.objectContaining({
        state: expect.objectContaining({ countryCodes: ["US", "CA"] }),
      }),
    );
  });

  test("onInitializeCountryCodes가 실행되면, 새로운 코드를 추가하되 중복은 허용하지 않아야 함.", () => {
    // GIVEN: hook 렌더링
    const { result } = renderHook(() => useRecentSearchStore());

    // WHEN: onAdd로 초기 상태를 만든 후, 새로운 코드('MX')와 중복 코드('US') 시도
    act(() => {
      result.current.onAddCountryCode("US"); // DESC: 상태 변경 1
      result.current.onAddCountryCode("CA"); // DESC: 상태 변경 2
      result.current.onInitializeCountryCodes("MX"); // DESC: 새로운 코드 추가
      result.current.onInitializeCountryCodes("US"); // DESC: 중복이므로 변화 없음
    });

    // THEN: 최종 상태: 중복 없이 ["MX", "CA", "US"] 순서 확인
    expect(result.current.countryCodes).toEqual(["MX", "CA", "US"]);

    // DESC: 최종 저장소 상태 내용 검증: 마지막 호출이 최종 상태를 저장했는지 확인
    const calls = hoisted.mockStorage.setItem.mock.calls;
    const [savedKey, savedValue] = calls[calls.length - 1] as [string, string];

    // DESC: 스토리지에 저장된 키가 올바른지 확인
    expect(savedKey).toBe("recentSearchCountryCode");

    const parsed = JSON.parse(savedValue);

    // DESC: 저장된 JSON 내용이 최종 상태를 포함하는지 부분적으로 검증
    expect(parsed).toEqual(
      expect.objectContaining({
        state: expect.objectContaining({ countryCodes: ["MX", "CA", "US"] }),
      }),
    );
  });

  test("onClearCountryCodes가 실행되면, 모든 코드를 제거하고 스토리지도 비워야 함.", () => {
    // GIVEN: hook 렌더링
    const { result } = renderHook(() => useRecentSearchStore());

    // WHEN: 몇 가지 코드를 추가한 후, 클리어 액션을 호출함.
    act(() => {
      result.current.onAddCountryCode("US");
      result.current.onAddCountryCode("CA");
      result.current.onClearCountryCodes(); // DESC: 스토어 초기화 및 storage.removeItem 호출
    });

    // THEN:스토어 상태가 빈 배열인지 확인
    expect(result.current.countryCodes).toEqual([]);
    // DESC: removeItem 호출 검증: persist.clearStorage()가 저장소 삭제 함수를 올바른 키로 호출했는지 확인
    expect(hoisted.mockStorage.removeItem).toHaveBeenCalledWith(
      "recentSearchCountryCode",
    );
    // DESC: Mock Storage 데이터 삭제 검증: Mock 데이터 객체에서 키가 실제로 삭제되었는지 확인
    expect(hoisted.data).not.toHaveProperty("recentSearchCountryCode");
  });
});
