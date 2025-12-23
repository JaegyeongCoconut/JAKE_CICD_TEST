import "@testing-library/jest-dom";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

import { useQueryFilterStore } from "@packages/stores/queryFilter";

export const mockDefaultLanguage = vi.fn();
vi.mock("@packages/hooks/useDefaultLanguage", () => ({
  default: () => ({ defaultLanguage: mockDefaultLanguage }),
}));

export let isInitQueryFilter = false;
export const setIsInitQueryFilter = vi.fn((isInit: boolean) =>
  useQueryFilterStore.getState().setIsInitQueryFilter(isInit),
);

useQueryFilterStore.subscribe((state) => {
  isInitQueryFilter = state.isInitQueryFilter;
});

interface MockImageObjectProps {
  height: number;
  width: number;
  succeed: boolean;
}

export const mockImageObject = ({
  width,
  height,
  succeed,
}: MockImageObjectProps) => {
  // DESC: Image 객체를 흉내내기 위한 class
  class MockImage {
    onload: null | (() => void) = null;
    onerror: null | (() => void) = null;
    width = width;
    height = height;
    set src(_: string) {
      // DESC: jsdom/Node 환경에는 실제 로더가 없어서 onload/onerror가 자동 호출되지 않으므로,
      //       테스트에서 비동기 흐름을 흉내 내기 위해 setTimeout(0)로 작성.
      setTimeout(() => (succeed ? this.onload?.() : this.onerror?.()), 0);
    }
  }

  // DESC: 전역으로 Image 객체는 MockImage class로 생성됨
  vi.stubGlobal("Image", MockImage);
};

beforeEach(() => {
  mockDefaultLanguage.mockImplementation(
    ({ text }: { text: string }): string => text,
  );
  setIsInitQueryFilter.mockClear();
  setIsInitQueryFilter.mockImplementation((isInit: boolean) => {
    useQueryFilterStore.getState().setIsInitQueryFilter(isInit);
  });
  useQueryFilterStore.setState({ isInitQueryFilter: true });

  // DESC: File 함수의 text를 전역으로 사용하기 위해 vitest에 설정 추가
  if (!File.prototype.text) {
    File.prototype.text = function () {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsText(this);
      });
    };
  }

  // DESC: JSDOM은 createObjectURL, revokeObjectURL가 없기 때문에 mock이 필요
  // DESC: createObjectURL mock 함수
  //       사용하는 곳에서 호출하면 기대값으로 blob을 반환
  URL.createObjectURL = vi.fn().mockReturnValue("blob");
  // DESC: revokeObjectURL mock 함수
  URL.revokeObjectURL = vi.fn().mockImplementation(() => {});
});

// DESC: 각 테스트(it/test) "이후"에 공통 정리 작업을 수행
afterEach(() => {
  cleanup(); // DESC: 실행 후 DOM을 자동 정리
});
