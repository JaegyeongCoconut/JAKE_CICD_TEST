import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import {
  createGoogleMapMarker,
  createGoogleMapMarkerIcon,
} from "@packages/utils/googleMapMarker";

// DESC: AdvancedMarkerElement 생성자 Mock
const mockAdvancedMarkerElement = vi.fn(
  (options: google.maps.marker.AdvancedMarkerElementOptions) => options,
);

// DESC: 각 테스트 전 전역 google 객체 및 클래스 Mock 주입
beforeEach(() => {
  vi.stubGlobal("google", {
    maps: {
      Map: vi.fn(),
      marker: { AdvancedMarkerElement: mockAdvancedMarkerElement },
    },
  });
});

// DESC: 테스트 이후 전역/모킹 정리
afterEach(() => {
  vi.unstubAllGlobals();
});

describe("googleMapMarker Test", () => {
  describe("createGoogleMapMarkerIcon Test", () => {
    test("주어진 src로 HTMLImageElement를 생성함.", () => {
      // GIVEN: 마커 이미지의 URL을 준비
      const src = "https://example.com/marker.png";

      // WHEN: createGoogleMapMarkerIcon 함수를 호출
      const result = createGoogleMapMarkerIcon(src);

      // THEN:
      // DESC: 1. 반환된 객체가 HTMLImageElement 인스턴스인지 확인
      expect(result).toBeInstanceOf(HTMLImageElement);
      // DESC: 2. 전달된 src가 이미지 요소의 src 속성에 정확히 할당되었는지 확인
      expect(result.src).toBe(src);
      // DESC: 3. 태그 이름이 IMG인지 확인
      expect(result.tagName).toBe("IMG");
      // DESC: 4. 마커 아이콘의 상호작용 속성(pointerEvents)이 'auto'로 설정되었는지 확인
      expect(result.style.pointerEvents).toBe("auto");
    });
  });

  describe("createGoogleMapMarker Test", () => {
    // DESC: 함수가 입력받은 옵션들을 AdvancedMarkerElement 생성자에게 올바르게 변환하여 전달하는지 확인.
    test("AdvancedMarkerElement에 올바른 옵션을 전달하고, 인스턴스를 반환.", () => {
      // GIVEN: Mock용 빈 Map 객체와 마커 옵션들을 준비
      const map = {} as google.maps.Map;
      const position = { lat: 37.5665, lng: 126.978 };
      const src = "https://example.com/marker.png";
      const zIndex = 1; // zIndex 옵션

      // WHEN: createGoogleMapMarker 함수를 호출
      const result = createGoogleMapMarker({ map, position, src, zIndex });

      // THEN:

      // DESC: 1. AdvancedMarkerElement 생성자가 정확히 한 번 호출되었는지 확인 (Mock 검증의 핵심)
      expect(mockAdvancedMarkerElement).toHaveBeenCalledOnce();

      // DESC: 2. 생성자에게 전달된 옵션 객체를 추출
      // mock.calls[0][0] = 첫 번째 호출의 첫 번째 인자
      const advancedMarkerOptions = mockAdvancedMarkerElement.mock.calls[0][0];

      // DESC: 3. 지도, 위치, zIndex 옵션이 그대로 전달되었는지 확인
      expect(advancedMarkerOptions.map).toBe(map);
      expect(advancedMarkerOptions.position).toEqual(position);
      expect(advancedMarkerOptions.zIndex).toBe(zIndex);

      // DESC: 4. content 옵션이 createGoogleMapMarkerIcon에서 생성된 HTMLImageElement인지 확인
      expect(advancedMarkerOptions.content).toBeInstanceOf(HTMLImageElement);

      // DESC: 5. 생성된 content 요소의 속성이 올바른지 확인 (createGoogleMapMarkerIcon의 호출 결과 확인)
      // NOTE: content는 HTMLImageElement임이 보장된다는 가정 하에 단언(as HTMLImageElement)
      const content = advancedMarkerOptions.content as HTMLImageElement;
      expect(content.src).toBe(src);
      expect(content.tagName).toBe("IMG");
      expect(content.style.pointerEvents).toBe("auto");

      // DESC: this를 쓰지 않고 객체를 직접 반환했으므로 instanceof 검증은 불가
      // DESC: 대신 mock.results[0].value(생성자가 반환한 값)와 동일성으로 검증
      const createdReturn = mockAdvancedMarkerElement.mock.results[0].value;

      expect(result).toBe(createdReturn);
    });
  });
});
