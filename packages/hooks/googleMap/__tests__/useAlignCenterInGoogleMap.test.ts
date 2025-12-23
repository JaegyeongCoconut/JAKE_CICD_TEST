import { renderHook } from "@testing-library/react";
import { describe, expect, it, test, vi, beforeEach, afterEach } from "vitest";

import useAlignCenterInGoogleMap from "@packages/hooks/googleMap/useAlignCenterInGoogleMap";

// GIVEN: useGoogleMap hook mock
const hoisted = vi.hoisted(() => ({ mockUseGoogleMap: vi.fn() }));
vi.mock("@packages/hooks/useGoogleMap", () => ({
  default: hoisted.mockUseGoogleMap,
}));

// GIVEN: googleMap.fitBounds / LatLngBounds.extend mock 함수
const mockFitBounds = vi.fn();
const mockExtend = vi.fn();

// GIVEN: google.maps.LatLngBounds 생성자 Mock
const mockLatLngBounds = vi.fn(() => {
  // DESC: 생성자가 extend 메서드를 가진 객체를 반환하도록 설정
  return { extend: mockExtend };
});

// DESC: 각 테스트 시작 전 mock 환경 설정
beforeEach(() => {
  // DESC: 전역 google 객체에 LatLngBounds mock 주입
  vi.stubGlobal("google", { maps: { LatLngBounds: mockLatLngBounds } });

  // DESC: 기본적으로 유효한 googleMap과 fitBounds mock을 반환하도록 설정
  hoisted.mockUseGoogleMap.mockReturnValue({
    googleMap: { fitBounds: mockFitBounds },
  });
});

// DESC: 각 테스트 후 전역 google 객체 해제
afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useAlignCenterInGoogleMap Test", () => {
  test("유효한 좌표 리스트일 때, 올바른 패딩 옵션으로 fitBounds를 호출함.", () => {
    // GIVEN: hook에 전달할 Props 및 mock 좌표 리스트
    const props = { paddingLeft: 100, fitBoundsPadding: 10 };
    const mockLatLngs = [
      { lat: 37.5, lng: 127.0 },
      { lat: 37.6, lng: 127.1 },
    ];

    // WHEN: hook 렌더링 및 alignCenterInGoogleMap 함수 호출
    const { result } = renderHook(() => useAlignCenterInGoogleMap(props));

    result.current.alignCenterInGoogleMap(mockLatLngs);

    // THEN: 1. LatLngBounds 생성자가 호출되었는지 확인
    expect(mockLatLngBounds).toHaveBeenCalledOnce();
    // THEN:: 2. extend 메서드가 좌표 수만큼 호출되었는지 확인
    expect(mockExtend).toHaveBeenCalledTimes(2);
    expect(mockExtend).toHaveBeenNthCalledWith(1, mockLatLngs[0]);
    expect(mockExtend).toHaveBeenNthCalledWith(2, mockLatLngs[1]);
    // THEN:: 3. fitBounds가 올바른 옵션으로 호출되었는지 확인
    expect(mockFitBounds).toHaveBeenCalledOnce();
    expect(mockFitBounds).toHaveBeenCalledWith(
      // DESC: LatLngBounds 인스턴스가 첫 번째 인수로 전달
      expect.objectContaining({ extend: mockExtend }),
      // DESC: 패딩 옵션 검증 (좌측 패딩 = props.paddingLeft + props.fitBoundsPadding)
      { top: 10, left: 110, bottom: 10, right: 10 }, // left: 100 + 10 = 110
    );
  });

  it.each([
    {
      description: "좌표 리스트가 null이면",
      setup: () => {}, // DESC: 기본 useGoogleMap Mock 사용
      latLngs: null,
    },
    {
      description: "좌표 리스트가 빈 배열이면",
      setup: () => {}, // DESC: 기본 useGoogleMap Mock 사용
      latLngs: [],
    },
    {
      description: "googleMap이 undefined이면",
      setup: () => {
        // DESC: 이 케이스만 useGoogleMap mock을 undefined
        hoisted.mockUseGoogleMap.mockReturnValue({ googleMap: undefined });
      },
      latLngs: [{ lat: 1, lng: 1 }],
    },
    {
      description: "googleMap이 null이면",
      setup: () => {
        // DESC: 이 케이스만 useGoogleMap mock을 null
        hoisted.mockUseGoogleMap.mockReturnValue({ googleMap: null });
      },
      latLngs: [{ lat: 1, lng: 1 }],
    },
  ])("$description LatLngBounds를 호출 안 함.", ({ setup, latLngs }) => {
    // GIVEN: 케이스별 환경 설정
    setup();

    // WHEN: hook 렌더링 및 alignCenterInGoogleMap 함수 호출
    const { result } = renderHook(() =>
      useAlignCenterInGoogleMap({ paddingLeft: 100, fitBoundsPadding: 10 }),
    );

    // DESC: 타입 무시하고 호출
    result.current.alignCenterInGoogleMap(latLngs as any);

    // THEN:
    expect(mockLatLngBounds).not.toHaveBeenCalled();
    // DESC: fitBounds 함수가 호출되지 않았는지 확인
    expect(mockFitBounds).not.toHaveBeenCalled();
    // DESC: LatLngBounds.extend도 호출되지 않았는지 확인
    expect(mockExtend).not.toHaveBeenCalled();
  });
});
