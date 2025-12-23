import { renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { LAT_LNG } from "@repo/constants/map";

import useSetMapCenterInGoogleMap from "@packages/hooks/googleMap/useSetMapCenterInGoogleMap";

// DESC: useGoogleMap Mock 함수와 setOptions Mock 함수 모두를 호이스팅
const hoisted = vi.hoisted(() => ({
  mockSetOptions: vi.fn(),
  mockUseGoogleMap: vi.fn(), // DESC: useGoogleMap hook의 Mock 함수 자체를 추가
}));
// DESC: useGoogleMap의 default export를 hoisted Mock 함수로 지정
vi.mock("@packages/hooks/useGoogleMap", () => ({
  default: hoisted.mockUseGoogleMap,
}));

describe("useSetMapCenterInGoogleMap Test", () => {
  const center = LAT_LNG.LSM_OFFICE;
  const zoom = 14;

  test("googleMap이 null이라면 setOptions를 실행 안 함.", () => {
    // GIVEN: useGoogleMap Mock을 설정하여 googleMap이 null을 반환
    hoisted.mockUseGoogleMap.mockReturnValue({ googleMap: null });

    // WHEN: hook을 렌더링
    renderHook(() => useSetMapCenterInGoogleMap(center, zoom));

    // THEN: setOptions가 호출되지 않았는지 확인
    expect(hoisted.mockSetOptions).not.toHaveBeenCalled();
  });

  test("googleMap이 null이 아니라면 setOptions가 호출되며 center와 zoom을 전달 받음.", () => {
    // GIVEN: useGoogleMap Mock을 설정하여 유효한 googleMap 객체를 반환
    hoisted.mockUseGoogleMap.mockReturnValue({
      googleMap: { setOptions: hoisted.mockSetOptions },
    });

    // WHEN: hook을 렌더링
    renderHook(() => useSetMapCenterInGoogleMap(center, zoom));

    // THEN: setOptions가 예상된 인수로 호출되었는지 확인
    expect(hoisted.mockSetOptions).toHaveBeenCalledOnce();
    expect(hoisted.mockSetOptions).toHaveBeenCalledWith({ center, zoom });
  });
});
