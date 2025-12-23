import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, test } from "vitest";

import { DEFAULT_COUNTRY_CODE_INFO } from "@repo/assets/static/phone";

import useCountryList from "@packages/hooks/dropdown/useCountryList";

describe("useCountryList Test", () => {
  // DESC: 테스트에 사용할 countryData 데이터 모킹
  const mockCountryKR = { name: "South Korea", code: "KR", dial: "82" };
  const mockCountryLA = { name: "Laos", code: "LA", dial: "856" };
  const mockCountryData = {
    countries: [
      mockCountryKR,
      mockCountryLA,
      { name: undefined, code: undefined, dial: undefined },
      { name: "United States", code: undefined, dial: "1" },
    ],
  };

  it.each([
    // GIVEN: countryCode 또는 data가 없을 때
    { countryCode: undefined, data: undefined },
    { countryCode: undefined, data: mockCountryData },
    { countryCode: "LA", data: undefined },
  ])(
    "countryCode 또는 data가 없을 경우 selectedCountry를 DEFAULT_COUNTRY_CODE_INFO로 설정",
    ({ countryCode, data }) => {
      // GIVEN: useCountryList hook 렌더링
      const { result } = renderHook(() =>
        useCountryList({ countryCode, data }),
      );

      // THEN: selectedCountry가 DEFAULT_COUNTRY_CODE_INFO로 변경되었는지 확인
      expect(result.current.selectedCountry).toEqual(DEFAULT_COUNTRY_CODE_INFO);
    },
  );

  it.each([
    // GIVEN: countryCode와 data가 유효한 값일 때
    { countryCode: "KR", data: mockCountryData, expected: mockCountryKR },
    { countryCode: "LA", data: mockCountryData, expected: mockCountryLA },
  ])(
    "유효한 countryCode와 data가 있을 경우 selectedCountry를 $expected로 설정",
    ({ countryCode, data, expected }) => {
      // GIVEN: useCountryList hook 렌더링
      const { result } = renderHook(() =>
        useCountryList({ countryCode, data }),
      );

      // THEN: selectedCountry 상태 확인
      expect(result.current.selectedCountry).toEqual(expected);
    },
  );

  test("유효한 data 항목들을 기반으로 country 객체 생성", () => {
    // GIVEN: useCountryList hook 렌더링
    const { result } = renderHook(() =>
      useCountryList({ countryCode: "", data: mockCountryData }),
    );

    // THEN: country 객체에 유효한 값만 남아있는지 확인
    expect(result.current.country).toEqual({
      KR: mockCountryKR,
      LA: mockCountryLA,
    });
  });

  describe("handleCountryWithCodeSelect Test", () => {
    test("data가 없을 경우 handleCountryWithCodeSelect 호출해도 이전 상태 유지", () => {
      // GIVEN: useCountryList의 countryCode를 LA로 설정하고 hook 렌더링
      const { result } = renderHook(() =>
        useCountryList({ countryCode: "KR", data: undefined }),
      );

      // THEN: selectedCountry가 DEFAULT_COUNTRY_CODE_INFO로 설정되었는지 확인
      expect(result.current.selectedCountry).toEqual(DEFAULT_COUNTRY_CODE_INFO);

      // DESC: When (행동): handleCountryWithCodeSelect를 유효한 code로 호출
      act(() => result.current.handleCountryWithCodeSelect("LA"));

      // THEN: selectedCountry가 DEFAULT_COUNTRY_CODE_INFO로 변경되지 않고 유지되는지 확인
      expect(result.current.selectedCountry).toEqual(DEFAULT_COUNTRY_CODE_INFO);
    });

    test("data가 변경되지 않으면 handleCountryWithCodeSelect 함수 참조 유지", () => {
      // GIVEN: useCountryList hook 렌더링
      const { rerender, result } = renderHook(() =>
        useCountryList({ countryCode: "KR", data: mockCountryData }),
      );

      // DESC: 초기 렌더링 시 handleCountryWithCodeSelect 함수 참조 저장
      const initHandleSelect = result.current.handleCountryWithCodeSelect;

      // WHEN: 동일한 data로 useCountryList hook 리렌더링
      rerender({ countryCode: "LA", data: mockCountryData });

      // DESC: 리렌더링 후 handleCountryWithCodeSelect 함수 참조 저장
      const rerenderHandleSelect = result.current.handleCountryWithCodeSelect;

      // THEN: handleCountryWithCodeSelect 함수 참조 동일 여부 확인
      expect(initHandleSelect).toBe(rerenderHandleSelect);
    });

    test("국가 code가 유효하다면 해당 국가로 selectedCountry 상태 업데이트", () => {
      // GIVEN: useCountryList의 countryCode를 LA로 설정하고 hook 렌더링
      const { result } = renderHook(() =>
        useCountryList({ countryCode: "KR", data: mockCountryData }),
      );

      // THEN: selectedCountry가 KR로 설정되었는지 확인
      expect(result.current.selectedCountry).toEqual(mockCountryKR);

      // DESC: When (행동): handleCountryWithCodeSelect를 유효한 code로 호출
      act(() => result.current.handleCountryWithCodeSelect("LA"));

      // THEN: selectedCountry가 LA로 변경되었는지 확인
      expect(result.current.selectedCountry).toEqual(mockCountryLA);
    });

    test("국가 code가 유효하지 않으면 selectedCountry 상태 DEFAULT_COUNTRY_CODE_INFO로 업데이트", () => {
      // GIVEN: useCountryList의 countryCode를 LA로 설정하고 hook 렌더링
      const { result } = renderHook(() =>
        useCountryList({ countryCode: "KR", data: mockCountryData }),
      );

      // THEN: selectedCountry KR로 설정되었는지 확인
      expect(result.current.selectedCountry).toEqual(mockCountryKR);

      // DESC: When (행동): handleCountryWithCodeSelect를 유효하지 않은 code로 호출
      act(() => result.current.handleCountryWithCodeSelect(""));

      // THEN: selectedCountry가 DEFAULT_COUNTRY_CODE_INFO로 변경되었는지 확인
      expect(result.current.selectedCountry).toEqual(DEFAULT_COUNTRY_CODE_INFO);
    });
  });

  describe("handleCountryWithDialSelect Test", () => {
    test("data가 없으면 handleCountryWithDialSelect를 호출해도 이전 상태 유지", () => {
      // GIVEN: useCountryList의 countryCode를 LA로 설정하고 hook 렌더링
      const { result } = renderHook(() =>
        useCountryList({ countryCode: "KR", data: undefined }),
      );

      // THEN: selectedCountry가 DEFAULT_COUNTRY_CODE_INFO로 설정되었는지 확인
      expect(result.current.selectedCountry).toEqual(DEFAULT_COUNTRY_CODE_INFO);

      // DESC: When (행동): handleCountryWithCodeSelect를 유효한 code로 호출
      act(() => result.current.handleCountryWithDialSelect("856"));

      // THEN: selectedCountry가 DEFAULT_COUNTRY_CODE_INFO로 변경되지 않고 유지되는지 확인
      expect(result.current.selectedCountry).toEqual(DEFAULT_COUNTRY_CODE_INFO);
    });

    test("data가 변경되지 않으면 handleCountryWithDialSelect 함수 참조 유지", () => {
      // GIVEN: useCountryList hook 렌더링
      const { rerender, result } = renderHook(() =>
        useCountryList({ countryCode: "KR", data: mockCountryData }),
      );

      // DESC: 초기 렌더링 시 handleCountryWithDialSelect 함수 참조 저장
      const initHandleSelect = result.current.handleCountryWithDialSelect;

      // WHEN: 동일한 data로 useCountryList hook 리렌더링
      rerender({ countryCode: "LA", data: mockCountryData });

      // DESC: 리렌더링 후 handleCountryWithDialSelect 함수 참조 저장
      const rerenderHandleSelect = result.current.handleCountryWithDialSelect;

      // THEN: handleCountryWithDialSelect 함수 참조 동일 여부 확인
      expect(initHandleSelect).toBe(rerenderHandleSelect);
    });

    test("국가 dial이 유효하다면 해당 국가로 selectedCountry 상태 업데이트", () => {
      // GIVEN: useCountryList의 countryCode를 LA로 설정하고 hook 렌더링
      const { result } = renderHook(() =>
        useCountryList({ countryCode: "KR", data: mockCountryData }),
      );

      // THEN: selectedCountry가 KR로 설정되었는지 확인
      expect(result.current.selectedCountry).toEqual(mockCountryKR);

      // DESC: When (행동): handleCountryWithDialSelect를 유효한 dial로 호출
      act(() => result.current.handleCountryWithDialSelect("856"));

      // THEN: selectedCountry가 LA로 변경되었는지 확인
      expect(result.current.selectedCountry).toEqual(mockCountryLA);
    });

    test("국가 dial이 유효하지 않으면 selectedCountry 상태 DEFAULT_COUNTRY_CODE_INFO로 업데이트", () => {
      // GIVEN: useCountryList의 countryCode를 LA로 설정하고 hook 렌더링
      const { result } = renderHook(() =>
        useCountryList({ countryCode: "KR", data: mockCountryData }),
      );

      // THEN: selectedCountry가 KR로 설정되었는지 확인
      expect(result.current.selectedCountry).toEqual(mockCountryKR);

      // DESC: When (행동): handleCountryWithDialSelect를 유효하지 않은 dial로 호출
      act(() => result.current.handleCountryWithDialSelect(""));

      // THEN: selectedCountry가 DEFAULT_COUNTRY_CODE_INFO로 변경되었는지 확인
      expect(result.current.selectedCountry).toEqual(DEFAULT_COUNTRY_CODE_INFO);
    });
  });
});
