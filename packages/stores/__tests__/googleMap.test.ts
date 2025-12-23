import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { useGoogleMapStore } from "@packages/stores/googleMap";

// GIVEN: GoogleMap API 객체의 최소 인터페이스 (테스트에 필요한 getDiv만 정의)
interface MinimalGoogleMap {
  getDiv: () => HTMLDivElement;
}

// GIVEN: 전역 google.maps.Map 생성자를 Mocking하는 테스트용 클래스
class TestGoogleMap implements MinimalGoogleMap {
  private element: HTMLDivElement;
  // DESC: Map이 생성될 때 전달받은 DOM 엘리먼트를 저장
  constructor(element: HTMLDivElement) {
    this.element = element;
  }
  // DESC: 실제 Map 인스턴스처럼 DOM 엘리먼트를 반환
  getDiv = () => this.element;
}

// DESC: 테스트 시작 전 useGoogleMapStore 스토어 상태 초기화 및 전역 google 객체 및 클래스 Mock 주입
beforeEach(() => {
  vi.stubGlobal("google", { maps: { Map: TestGoogleMap } });
  useGoogleMapStore.setState({ googleMap: null });
});

// DESC: 테스트 후 전역 Mock 해제
afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useGoogleMapStore Test", () => {
  test("초기 googleMap 상태 null 확인", () => {
    // THEN: 초기 googleMap 상태가 null인지 확인
    expect(useGoogleMapStore.getState().googleMap).toBeNull();
  });

  test("setGoogleMap을 호출하여 googleMap 상태를 null로 변경", () => {
    // WHEN: setGoogleMap 호출하여 null로 변경
    useGoogleMapStore.getState().setGoogleMap(null);

    // THEN: googleMap 상태가 null로 변경되었는지 확인
    expect(useGoogleMapStore.getState().googleMap).toBeNull();
  });

  test("setGoogleMap을 호출하여 googleMap 상태를 새로운 google.maps.Map 객체로 변경", () => {
    // GIVEN: Mocking된 Map 객체 인스턴스화
    const mapDiv = document.createElement("div");
    const newMap = new google.maps.Map(mapDiv);

    // WHEN: setGoogleMap 호출하여 새로운 google.maps.Map으로 변경
    useGoogleMapStore.getState().setGoogleMap(newMap);

    const state = useGoogleMapStore.getState();

    // THEN: googleMap 상태가 새로운 google.maps.Map 객체로 변경 확인
    expect(state.googleMap).toBeInstanceOf(TestGoogleMap);
    expect(state.googleMap?.getDiv()).toBe(mapDiv);
  });
});
