import React from "react";

import { within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import type { BreadcrumbItemType, Languages } from "@repo/types";

import Breadcrumb from "@packages/breadcrumb/Breadcrumb";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

// DESC: MockUseQueryFilterStore: useQueryFilterStore의 상태와 액션을 Mock
const mockUseQueryFilterStore = {
  isInitQueryFilter: false,
  setIsInitQueryFilter: vi.fn(),
};

// DESC: useQueryFilterStore Mocking
vi.mock("@repo/stores/queryFilter", () => ({
  useQueryFilterStore: (
    selector: (store: typeof mockUseQueryFilterStore) => unknown,
  ) => selector(mockUseQueryFilterStore),
}));

// DESC: afterEach에서 원본 HTMLElement.prototype.offsetWidth를 복원하기 위해 저장
const originalOffsetWidth = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  "offsetWidth",
);

beforeEach(() => {
  mockUseQueryFilterStore.isInitQueryFilter = false;
});

// DESC: afterEach: 각 테스트 후 Mock킹된 offsetWidth를 원래대로 복원
afterEach(() => {
  if (originalOffsetWidth) {
    Object.defineProperty(
      HTMLElement.prototype,
      "offsetWidth",
      originalOffsetWidth,
    );
  }
});

describe("Breadcrumb Test", () => {
  // DESC: userEvent 설정 (비동기 이벤트 처리)
  const user = userEvent.setup();
  const notTranslatedName = "Not translate";
  const translatedName = "Translate" as Languages;
  // GIVEN: isTranslated가 true/false인 항목을 포함하는 Breadcrumb 데이터
  const baseBreadcrumbs: BreadcrumbItemType[] = [
    { isTranslated: false, name: notTranslatedName, path: "/" }, // DESC: 번역되지 않은 항목
    {
      isTranslated: true,
      name: translatedName as Languages,
      path: "/banner",
    }, // DESC: 번역된 항목 (defaultLanguage 호출 O)
  ];

  test("기본 렌더링 시 breadcrumbs 배열의 isTranslated가 true이면 defaultLanguage를 실행해 번역을 실행, isTranslated가 false이면 defaultLanguage를 실행하지 않고 번역 안 함", () => {
    // WHEN: Breadcrumb 컴포넌트 렌더링
    const { getByRole, getByText } = renderComponent({
      ui: <Breadcrumb breadcrumbs={baseBreadcrumbs} />,
    });
    const list = getByRole("list");

    // THEN: 렌더링 및 defaultLanguage 호출 검증
    expect(list).toBeInTheDocument();
    // THEN:  isTranslated=false 항목 검증: 번역 함수 호출이 없어야 함
    expect(mockDefaultLanguage).not.toHaveBeenCalledWith({
      text: baseBreadcrumbs[0].name,
    });
    expect(getByText(baseBreadcrumbs[0].name)).toBeInTheDocument();
    // THEN:  isTranslated=true 항목 검증: 번역 함수가 호출
    expect(mockDefaultLanguage).toHaveBeenCalledWith({
      text: baseBreadcrumbs[1].name,
    });
    expect(getByText(baseBreadcrumbs[1].name)).toBeInTheDocument();
  });

  describe("handleBreadcrumbClick Test", () => {
    test("마지막 Breadcrumb을 클릭했을 때, setIsInitQueryFilter 함수 호출하지 않고 종료", async () => {
      // GIVEN: 컴포넌트 렌더링
      const { getByRole } = renderComponent({
        ui: <Breadcrumb breadcrumbs={baseBreadcrumbs} />,
      });
      const items = within(getByRole("list")).getAllByRole("listitem");

      // WHEN: 마지막 항목을 클릭
      await user.click(items[items.length - 1]);

      // THEN: 마지막 항목 클릭 시에는 setIsInitQueryFilter 함수 호출이 없음을 검증
      expect(
        mockUseQueryFilterStore.setIsInitQueryFilter,
      ).not.toHaveBeenCalled();
    });

    test("마지막 경로가 아닌 Breadcrumb을 클릭했을 때, setIsInitQueryFilter 파라미터로 true가 호출되어야 함", async () => {
      // GIVEN: 컴포넌트 렌더링
      const { getByRole } = renderComponent({
        ui: <Breadcrumb breadcrumbs={baseBreadcrumbs} />,
      });
      const list = getByRole("list");
      const listItems = within(list).getAllByRole("listitem");
      const firstLinkItem = within(listItems[0]).getByRole("link");

      // WHEN: 첫 번째 항목을 클릭
      await user.click(firstLinkItem);

      // THEN: setIsInitQueryFilter 함수가 true 인수를 가지고 호출되었는지 검증
      expect(mockUseQueryFilterStore.setIsInitQueryFilter).toHaveBeenCalledWith(
        true,
      );
    });

    test("마지막 경로가 아닌 Breadcrumb을 클릭했을 때, breadcrumbs 아이템의 path가 없으면 아무 동작도  안 함", async () => {
      // GIVEN: path가 빈 문자열인 Breadcrumb을 포함한 데이터
      const breadcrumbsWithNoPath: BreadcrumbItemType[] = [
        ...baseBreadcrumbs,
        { isTranslated: false, name: "No Path", path: "" }, // DESC: path가 없는 항목
        { isTranslated: false, name: "Path", path: "/" }, // DESC: 마지막 항목
      ];

      const { getByRole } = renderComponent({
        ui: <Breadcrumb breadcrumbs={breadcrumbsWithNoPath} />,
      });

      const list = getByRole("list");
      const listItems = within(list).getAllByRole("listitem");
      const noPathLinkItem = within(listItems[2]).getByRole("link"); // DESC: path가 없는 항목

      // WHEN: path가 없는 항목을 클릭
      await user.click(noPathLinkItem);

      // THEN: path가 없으므로 setIsInitQueryFilter 함수 호출이 없어야 함
      expect(
        mockUseQueryFilterStore.setIsInitQueryFilter,
      ).not.toHaveBeenCalled();
    });

    test("isInitQueryFilter가 true일 때, 어떤 Breadcrumb을 클릭해도 아무 동작도  안 함", async () => {
      // GIVEN: 쿼리 필터 초기화 상태를 true로 설정하여 클릭 동작 막기
      mockUseQueryFilterStore.isInitQueryFilter = true;

      const { getByRole } = renderComponent({
        ui: <Breadcrumb breadcrumbs={baseBreadcrumbs} />,
      });

      const list = getByRole("list");
      const listItems = within(list).getAllByRole("listitem");
      const firstLinkItem = within(listItems[0]).getByRole("link");

      // WHEN: Breadcrumb 클릭
      await user.click(firstLinkItem);

      // THEN: isInitQueryFilter가 true이므로, setIsInitQueryFilter 호출 여부 검증
      expect(
        mockUseQueryFilterStore.setIsInitQueryFilter,
      ).not.toHaveBeenCalled();
    });
  });

  describe("Breadcrumb Dropdown Button rendering Test", () => {
    test("Breadcrumb의 총 길이가 최대 길이( 648px )를 초과하고, breadcrumb의 배열 길이가 3 이상일 때 드롭다운이 활성화", () => {
      // GIVEN: 엘리먼트의 길이(offsetWidth)를 Mock하여 최대 길이를 초과하도록 설정
      Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
        configurable: true,
        value: 300, // DESC: 길이를 Mock하여 드롭다운 활성화 조건 만족
      });

      const dropdownWithbreadcrumbs: BreadcrumbItemType[] = [
        { isTranslated: false, name: "First" as Languages, path: "/" },
        { isTranslated: true, name: "Middle" as Languages, path: "/banner" },
        { isTranslated: true, name: "Last" as Languages, path: "/banner" }, // DESC: breadcrumb의 배열 길이가 3 이상
      ];

      // WHEN: 컴포넌트 렌더링
      const { getByRole } = renderComponent({
        ui: <Breadcrumb breadcrumbs={dropdownWithbreadcrumbs} />,
      });

      // THEN: 드롭다운 버튼('...')이 DOM에 존재하는지 확인
      const dropdownButton = getByRole("button", { name: "..." });

      expect(dropdownButton).toBeInTheDocument();
    });

    test("Breadcrumb의 총 길이가 최대 길이( 648px )를 초과하지 않으면, 드롭다운이 비활성화", () => {
      Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
        configurable: true,
        value: 50, // DESC: 길이를 Mock하여 드롭다운 비활성화 조건 만족( 648 미만 )
      });

      // WHEN: 컴포넌트 렌더링
      const { queryByRole } = renderComponent({
        ui: <Breadcrumb breadcrumbs={baseBreadcrumbs} />,
      });

      // THEN: 드롭다운 버튼('...')이 DOM에 존재하지 않는지 확인
      const dropdownButton = queryByRole("button", { name: "..." });

      expect(dropdownButton).not.toBeInTheDocument();
    });

    test("Breadcrumb 배열 길이가 3 미만인 경우, 드롭다운이 비활성", () => {
      // GIVEN: 길이 Mock은 활성화 조건을 만족시키지만, breadcrumb의 배열 길이가 3 미만인 경우
      Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
        configurable: true,
        value: 300,
      });

      const oneLengthBreadcrumbs: BreadcrumbItemType[] = [
        { isTranslated: false, name: "First" as Languages, path: "/" },
      ];

      // WHEN: 컴포넌트 렌더링
      const { queryByRole } = renderComponent({
        ui: <Breadcrumb breadcrumbs={oneLengthBreadcrumbs} />,
      });

      const dropdownButton = queryByRole("button", { name: "..." });

      // THEN: 항목 개수 부족으로 인해 드롭다운 버튼이 DOM에 존재하지 않는지 확인
      expect(dropdownButton).not.toBeInTheDocument();
    });
  });
});
