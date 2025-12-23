import React from "react";

import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";

import useGoogleMap from "@packages/hooks/useGoogleMap";

import renderComponent from "@tests/renderComponent";

// GIVEN: GoogleMap API 객체의 최소 인터페이스 (테스트에 필요한 getDiv만 정의)
interface MinimalGoogleMap {
  getDiv: () => HTMLDivElement;
}

// GIVEN: Zustand store Mock 상태/액션 객체
const mockStore = {
  // DESC: Store가 현재 보유한 Google Map 인스턴스 상태
  googleMap: null as MinimalGoogleMap | null,
  // DESC: hook에서 호출될 setGoogleMap 액션을 Mock 함수로 대체
  setGoogleMap: vi.fn((value: MinimalGoogleMap | null) => {
    // DESC: setGoogleMap 호출 시, 이 Mock 상태도 갱신하여 후속 테스트의 '읽기'가 반영되도록 함
    mockStore.googleMap = value;
  }),
};

// GIVEN: @repo/stores/googleMap hook 모듈을 Mocking하여 위 mockStore를 주입
vi.mock("@repo/stores/googleMap", () => {
  return {
    useGoogleMapStore: <T,>(
      // DESC: Zustand selector 패턴을 지원
      selector?: (state: {
        googleMap: MinimalGoogleMap | null;
        setGoogleMap: (v: MinimalGoogleMap | null) => void;
      }) => T,
    ) => {
      // DESC: 현재 mock 상태를 반환
      const state = {
        googleMap: mockStore.googleMap,
        setGoogleMap: mockStore.setGoogleMap,
      };
      // DESC: selector가 있으면 selector를 실행한 결과를 반환, 없으면 전체 state 반환
      return typeof selector === "function" ? selector(state) : state;
    },
  };
});

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

describe("useGoogleMap Test", () => {
  // DESC: 각 테스트 전에 Mock 환경 초기화
  beforeEach(() => {
    vi.restoreAllMocks(); // DESC: 모든 스파이 및 Mock 초기화
    mockStore.googleMap = null; // DESC: 스토어 상태 초기화
    mockStore.setGoogleMap.mockClear(); // DESC: setGoogleMap 호출 카운트 초기화

    // DESC: 전역 google.maps.Map을 TestGoogleMap으로 스텁 (new Map() 호출 대역)
    vi.stubGlobal("google", { maps: { Map: TestGoogleMap } });
  });

  // DESC: 각 테스트 이후 전역 스텁 해제
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  // DESC: TestComponent에 전달할 시나리오 분기 props 타입
  interface TestComponentProps {
    preset: "none" | "same" | "different";
  }

  // DESC: useGoogleMap hook의 동작을 검증하는 테스트용 컴포넌트
  const TestComponent = ({ preset }: TestComponentProps) => {
    // DESC: "same" 케이스를 위해 컴포넌트 내부에서 DOM 노드를 참조할 변수
    let currentDiv: HTMLDivElement | null = null;

    // DESC: (1) 마운트 전, hook이 읽을 mockStore의 초기 상태를 설정
    switch (preset) {
      case "same": {
        // DESC: 기존 맵이 존재하며, 그 맵이 현재 렌더링될 DOM과 '동일한' Div를 반환하도록 Mock 설정
        mockStore.googleMap = { getDiv: () => currentDiv as HTMLDivElement };
        break;
      }
      case "different": {
        // DESC: 기존 맵이 존재하지만, '다른' Div를 반환하도록 Mock 설정 (새 Map 생성 유도)
        const differentDiv = document.createElement("div");
        mockStore.googleMap = { getDiv: () => differentDiv };
        break;
      }
      default: {
        // DESC: "none" => 기존 맵 인스턴스 없음 (새 Map 생성 유도)
        mockStore.googleMap = null;
        break;
      }
    }

    // DESC: (2) hook 호출, 위에서 설정한 mockStore 상태를 읽어 맵 생성 여부 결정
    const { ref } = useGoogleMap();

    // DESC: (3) 렌더링된 실제 DOM 노드를 ref와 currentDiv 변수에 연결 (useCallback 흉내)
    const attachRef = (node: HTMLDivElement | null): void => {
      // hook이 반환한 ref 객체의 current 속성에 DOM 노드 연결
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      // same 케이스에서 사용될 currentDiv 변수 업데이트
      currentDiv = node;
    };

    // DESC: hook이 참조하는 실제 DOM 엘리먼트
    return <div ref={attachRef} data-testid="map" />;
  };

  test("기존 맵이 없다면 새 Map 생성 및 setGoogleMap 호출, 언마운트 시 null로 정리함.", () => {
    // WHEN: preset="none"으로 렌더링 (기존 맵 없음)
    const { unmount } = renderComponent({
      ui: <TestComponent preset="none" />,
    });

    // THEN: setGoogleMap이 1회 호출되어 새 인스턴스를 저장했는지 확인
    expect(mockStore.setGoogleMap).toHaveBeenCalledOnce();
    // THEN: 저장된 인스턴스가 Mock Map 클래스로 만들어졌는지 확인
    expect(mockStore.setGoogleMap.mock.calls[0][0]).toBeInstanceOf(
      TestGoogleMap,
    );

    // WHEN: 컴포넌트 언마운트
    unmount();
    // THEN: 클린업 로직에 의해 setGoogleMap(null)이 호출되어야 함 (총 2회 호출)
    expect(mockStore.setGoogleMap).toHaveBeenCalledTimes(2);
    expect(mockStore.setGoogleMap).toHaveBeenLastCalledWith(null);
  });

  test("기존 맵의 getDiv()가 ref와 동일한 div라면 새 Map을 생성 안 함.", () => {
    // WHEN: preset="same"으로 렌더링 (기존 맵과 동일한 컨테이너)
    renderComponent({ ui: <TestComponent preset="same" /> });

    // THEN: setGoogleMap이 호출되지 않아 최적화가 작동했는지 확인
    expect(mockStore.setGoogleMap).not.toHaveBeenCalled();
  });

  test("기존 맵 getDiv()가 다른 div라면 새 Map 생성 및 setGoogleMap 호출함.", () => {
    // WHEN: preset="different"로 렌더링 (기존 맵과 다른 컨테이너)
    renderComponent({ ui: <TestComponent preset="different" /> });

    // THEN: setGoogleMap이 1회 호출되어 새 인스턴스로 교체했는지 확인
    expect(mockStore.setGoogleMap).toHaveBeenCalledOnce();
    // THEN: 새 인스턴스가 Mock Map 클래스로 만들어졌는지 확인
    expect(mockStore.setGoogleMap.mock.calls[0][0]).toBeInstanceOf(
      TestGoogleMap,
    );
  });
});
