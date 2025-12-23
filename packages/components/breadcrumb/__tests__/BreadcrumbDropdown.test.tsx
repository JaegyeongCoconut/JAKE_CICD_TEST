import type React from "react";

import { act, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest";

import type { BreadcrumbItemType, Languages } from "@repo/types";

import BreadcrumbDropdown from "@packages/breadcrumb/containers/dropdown/BreadcrumbDropdown";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

// GIVEN: useOnClickOutside 훅에서 전달받을 핸들러를 저장할 변수
let mockHandler: (() => void) | null = null;
// GIVEN: useOnClickOutside 훅을 목킹
vi.mock("@repo/hooks/useOnClickOutside", () => {
  return {
    default: (arg: { handler: () => void }) => {
      // DESC: 컴포넌트가 전달한 handler 함수를 mockHandler 변수에 할당
      mockHandler = arg.handler;
    },
  };
});

// GIVEN: 텍스트 오버플로우 상태를 강제로 설정하는 헬퍼 함수
const setAnchorOverflow = (showOverflow: boolean): void => {
  const visibleWidth = showOverflow ? 50 : 100; // DESC: 보이는 너비 (clientWidth)
  const contentWidth = 100; // DESC: 실제 내용의 너비 (scrollWidth)

  // DESC: 텍스트가 넘치려면 scrollWidth > clientWidth여야 함
  // DESC: HTMLAnchorElement.prototype.clientWidth 재정의 (읽기 전용 속성 모킹)
  Object.defineProperty(HTMLAnchorElement.prototype, "clientWidth", {
    configurable: true,
    get: () => visibleWidth,
  });
  // DESC: HTMLAnchorElement.prototype.scrollWidth 재정의 (읽기 전용 속성 모킹)
  Object.defineProperty(HTMLAnchorElement.prototype, "scrollWidth", {
    configurable: true,
    get: () => contentWidth,
  });
};

// GIVEN: 테스트에 사용될 브레드크럼 데이터
const breadcrumbs: BreadcrumbItemType[] = [
  { isTranslated: false, name: "Not translate", path: "/" }, // DESC: 번역되지 않은 항목
  { isTranslated: true, name: "Translate" as Languages, path: "/banner" }, // DESC: 번역된 항목
];

describe("Breadcrumb dropdown test", () => {
  const user = userEvent.setup();

  afterEach(() => {
    // DESC: After (후처리): 각 테스트 후 mockHandler 초기화
    mockHandler = null;
  });

  test("... 버튼을 클릭하면 드롭다운으로 항목들이 노출됨.", async () => {
    // GIVEN: 테스트 대상 컴포넌트 렌더링
    const { getByRole, queryByRole } = renderComponent({
      ui: <BreadcrumbDropdown breadcrumbs={breadcrumbs} />,
    });

    // DESC: "..." 버튼 찾기
    const button = getByRole("button", { name: "..." });

    // THEN: 클릭 전에는 드롭다운 목록(ul)이 DOM에 없어야 함
    expect(queryByRole("list")).not.toBeInTheDocument();

    // WHEN: "..." 버튼 클릭
    await user.click(button);

    // THEN: 클릭 후에는 드롭다운 목록(ul)이 DOM에 존재해야 함
    const list = getByRole("list");
    expect(list).toBeInTheDocument();

    // THEN: 드롭다운 목록 항목(li) 개수 검증 (데이터 길이와 동일)
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(breadcrumbs.length);

    // THEN: 드롭다운 링크(a) 개수 검증 (데이터 길이와 동일)
    const links = within(list).getAllByRole("link");
    expect(links).toHaveLength(breadcrumbs.length);
  });

  test("hover 시 텍스트가 넘치면(showTooltip=true) data-show-tooltip='true'로 설정됨.", async () => {
    // GIVEN: 오버플로우 상태를 true로 설정 (넘치도록 설정)
    setAnchorOverflow(true);

    const { getByRole, getAllByRole } = renderComponent({
      ui: <BreadcrumbDropdown breadcrumbs={breadcrumbs} />,
    });

    // WHEN: 드롭다운 열기
    const button = getByRole("button", { name: "..." });
    await user.click(button);

    // WHEN: 첫 번째 링크에 마우스 오버
    const links = getAllByRole("link");
    await user.hover(links[0]);

    // THEN: 해당 항목(li)에 툴팁 표시 속성('true')이 설정되었는지 확인
    const items = getAllByRole("listitem");
    expect(items[0]).toHaveAttribute("data-show-tooltip", "true");

    // DESC: After (후처리): hover 해제
    await user.unhover(links[0]);
  });

  test("hover 시 텍스트가 안 넘치면(showTooltip=false) data-show-tooltip='false'로 설정됨.", async () => {
    // GIVEN: 오버플로우 상태를 false로 설정 (넘치지 않도록 설정)
    setAnchorOverflow(false);

    const { getByRole, getAllByRole } = renderComponent({
      ui: <BreadcrumbDropdown breadcrumbs={breadcrumbs} />,
    });

    // WHEN: 드롭다운 열기
    const button = getByRole("button", { name: "..." });
    await user.click(button);

    // WHEN: 첫 번째 링크에 마우스 오버
    const links = getAllByRole("link");
    await user.hover(links[0]);

    // THEN: 해당 항목(li)에 툴팁 표시 속성('false')이 설정되었는지 확인
    const items = getAllByRole("listitem");
    expect(items[0]).toHaveAttribute("data-show-tooltip", "false");

    // DESC: After (후처리): hover 해제
    await user.unhover(links[0]);
  });

  test("useOnClickOutside의 handler 호출 시 닫힘.", async () => {
    const { getByRole, queryByRole } = renderComponent({
      ui: <BreadcrumbDropdown breadcrumbs={breadcrumbs} />,
    });

    // GIVEN: 드롭다운 열기
    const button = getByRole("button", { name: "..." });
    await user.click(button);

    // GIVEN: 드롭다운이 열렸음을 확인
    expect(getByRole("list")).toBeInTheDocument();

    // GIVEN: 목킹된 useOnClickOutside의 핸들러를 실행하는 함수 정의
    const triggerOutsideClick = (): void => {
      if (mockHandler) {
        mockHandler();
      }
    };

    // WHEN: 외부 클릭을 흉내내는 handler 호출 (상태 변경을 위해 act로 감쌈)
    act(() => {
      triggerOutsideClick();
    });

    // THEN: 드롭다운 목록(ul)이 DOM에서 사라졌는지 확인
    expect(queryByRole("list")).toBeNull();
  });

  test("isTranslated=true이면 defaultLanguage를 실행하고 isTranslated=false이면 defaultLanguage를 실행 안 함.", async () => {
    // GIVEN: 컴포넌트 렌더링
    const { getByRole } = renderComponent({
      ui: <BreadcrumbDropdown breadcrumbs={breadcrumbs} />,
    });

    // WHEN: 드롭다운 열기
    const button = getByRole("button", { name: "..." });

    await user.click(button);

    // THEN: isTranslated=false인 항목에 대해서는 defaultLanguage 함수가 호출되지 않았는지 확인
    expect(mockDefaultLanguage).not.toHaveBeenCalledWith({
      text: breadcrumbs[0].name, // DESC: isTranslated=false 항목
    });
    // THEN: isTranslated=true인 항목에 대해서만 defaultLanguage 함수가 호출되었는지 확인
    expect(mockDefaultLanguage).toHaveBeenCalledWith({
      text: breadcrumbs[1].name, // DESC: isTranslated=true 항목
    });
  });
});
