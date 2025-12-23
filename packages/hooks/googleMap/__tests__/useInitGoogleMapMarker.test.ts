import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";

import { zIndex } from "@repo/styles/themes";

import useInitGoogleMapMarker from "@packages/hooks/googleMap/useInitGoogleMapMarker";

// GIVEN: useGoogleMap Mock 함수 호이스팅 (글로벌하게 Mock 설정을 위해 사용)
const hoisted = vi.hoisted(() => ({
  mockUseGoogleMap: vi.fn(),
  mockSetGoogleMap: vi.fn(), // DESC: 마커의 map 속성 setter 호출을 추적하기 위한 Mock
}));

// GIVEN: useGoogleMap의 default export를 hoisted Mock 함수로 지정
vi.mock("@packages/hooks/useGoogleMap", () => ({
  default: hoisted.mockUseGoogleMap,
}));

// GIVEN: AdvancedMarkerElement 생성자 Mock
// NOTE: this를 사용해야 하기 때문에 화살표 함수 형식으로 작성할 수 없음
const mockAdvancedMarkerElement = vi.fn(function (
  this: {
    map: google.maps.Map | null;
    options: google.maps.marker.AdvancedMarkerElementOptions;
  },
  options: google.maps.marker.AdvancedMarkerElementOptions,
) {
  // DESC: 옵션 보관 (검증용)
  this.options = options;

  // DESC: hook의 cleanup 로직(marker.map = null)을 가로채기 위해 인스턴스에 Setter 정의
  // DESC: stubGlobal은 전역 객체 주입용이며, map 프로퍼티의 setter 호출을 가로채지 못함
  // DESC: 따라서 Object.defineProperty로 인스턴스의 map 프로퍼티에 직접 접근자(set)를 정의해야 함
  Object.defineProperty(this, "map", {
    // DESC: set: 프로퍼티에 값이 대입될 때 실행되는 setter 함수 (예: marker.map = null)
    set: (next: google.maps.Map | null) => {
      // DESC: hoisted.mockSetGoogleMap(next): setter 호출을 테스트에서 추적하기 위한 함수 호출부
      hoisted.mockSetGoogleMap(next);
    },
    // DESC: configurable: true -> 이 프로퍼티의 속성(접근자/데스크립터)을 이후에 다시 정의(재설정)하거나 삭제할 수 있음
    configurable: true,
  });

  return this;
});

// DESC: 각 테스트 전 전역 google 객체 및 클래스 Mock 주입
beforeEach(() => {
  vi.stubGlobal("google", {
    maps: {
      Map: vi.fn(),
      marker: { AdvancedMarkerElement: mockAdvancedMarkerElement },
    },
  });
});

// DESC: 각 테스트 후 전역 Mock 해제
afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useInitGoogleMapMarker Test", () => {
  const mockLat = 37.5665;
  const mockLng = 126.978;

  test("googleMap이 null이라면 마커를 생성하지 않고 null을 반환.", () => {
    // GIVEN: useGoogleMap이 googleMap=null 반환하도록 설정
    hoisted.mockUseGoogleMap.mockReturnValue({ googleMap: null });

    // WHEN: hook 렌더링
    const { result } = renderHook(() =>
      useInitGoogleMapMarker({ lat: mockLat, lng: mockLng }),
    );

    // THEN: 1. hook의 반환 값이 null인지 확인
    expect(result.current).toBeNull();
    // THEN: 2. AdvancedMarkerElement 생성자가 호출되지 않았는지 확인
    expect(mockAdvancedMarkerElement).not.toHaveBeenCalled();
  });

  test("googleMap이 렌더링되면 마커를 생성하고 반환.", async () => {
    // GIVEN: 유효한 googleMap Mock 객체를 반환하도록 설정
    hoisted.mockUseGoogleMap.mockReturnValue({ googleMap: {} });

    // WHEN: hook 렌더링
    const { result } = renderHook(() =>
      useInitGoogleMapMarker({ lat: mockLat, lng: mockLng }),
    );

    // THEN: 1. 마커 생성자 호출 검증, 비동기 로직(useEffect 내 initMarker) 완료 대기
    await waitFor(() => {
      // DESC: AdvancedMarkerElement 생성자가 정확히 1회 호출되었는지 확인
      expect(mockAdvancedMarkerElement).toHaveBeenCalledTimes(1);
      // DESC: 생성자 호출 인수가 예상대로 설정되었는지 확인
      expect(mockAdvancedMarkerElement).toHaveBeenCalledWith(
        expect.objectContaining({
          map: {}, // DESC: useGoogleMap이 반환한 맵 객체
          position: { lat: mockLat, lng: mockLng }, // DESC: 전달된 좌표
          zIndex: zIndex.GOOGLE_MAP_BRANCH_MARKER, // DESC: 정의된 zIndex 상수 사용
          content: expect.any(HTMLElement), // DESC: 커스텀 아이콘 엘리먼트 생성 확인
        }),
      );
    });

    // THEN: 2. hook의 반환 값이 생성된 마커 인스턴스인지 확인
    const created = mockAdvancedMarkerElement.mock.instances[0];
    expect(result.current).toBe(created);
  });

  test("hook이 언마운트될 때 마커의 map 속성을 null로 설정하여 제거함.", async () => {
    // GIVEN: 유효한 googleMap Mock 객체 설정
    hoisted.mockUseGoogleMap.mockReturnValue({ googleMap: {} });

    // WHEN: 1. hook 렌더링 및 마커 생성 완료 대기
    const { unmount } = renderHook(() =>
      useInitGoogleMapMarker({ lat: mockLat, lng: mockLng }),
    );

    await waitFor(() => {
      expect(mockAdvancedMarkerElement).toHaveBeenCalledTimes(1);
    });

    // WHEN: 2. hook 언마운트 (cleanup 함수 실행)
    unmount();

    // THEN: 마커 제거 로직(marker.map = null)에 의해 map setter Mock이 정확히 1회 호출되었는지 확인
    expect(hoisted.mockSetGoogleMap).toHaveBeenCalledTimes(1);
    // DESC: 호출 인수가 마커 제거를 의미하는 null인지 확인
    expect(hoisted.mockSetGoogleMap).toHaveBeenCalledWith(null);
  });
});
