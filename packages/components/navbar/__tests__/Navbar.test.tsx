import type { ComponentProps, PropsWithChildren } from "react";
import React from "react";

import userEvent from "@testing-library/user-event"; // userEvent 추가
import { describe, test, vi, beforeEach, expect } from "vitest";

import type { Languages } from "@repo/types";

import Navbar from "@packages/navbar/Navbar";
import type * as StyeldType from "@packages/navbar/Navbar.styled";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

interface MockNavLinkProps
  extends PropsWithChildren<{
    key: string;
    to: string;
    onClick: React.MouseEventHandler<HTMLAnchorElement>;
  }> {}

// DESC: React Router Mock (useLocation, NavLink)
const mockUseLocation = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useLocation: () => mockUseLocation(),
    NavLink: (props: MockNavLinkProps) => (
      // GIVEN: NavLink Mock (href 경로 및 onClick, data-testid 캡처)
      <a
        href={`/${props.to}`}
        data-key={props.key}
        data-testid={`test-nav-link-${props.to}`}
        onClick={props.onClick}
      >
        {props.children}
      </a>
    ),
  };
});
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ i18n: { language: vi.fn(() => "ko") } }),
}));
const mockUseQueryFilterStore = {
  isInitQueryFilter: false,
  setIsInitQueryFilter: vi.fn(),
};
vi.mock("@repo/stores/queryFilter", () => ({
  useQueryFilterStore: (
    selector: (store: typeof mockUseQueryFilterStore) => unknown,
  ) => selector(mockUseQueryFilterStore),
}));
const hoisted = vi.hoisted(() => ({
  // DESC: StyledLink의 props를 캡처하기 위한 Mock
  mockStyledLink: vi.fn().mockReturnValue(() => ({})),
}));
// DESC: Styled Components Mock
vi.mock("@packages/navbar/Navbar.styled", () => {
  const MockStyledNavbar = (
    props: ComponentProps<typeof StyeldType.Navbar>,
  ) => <nav data-testid="test-navbar">{props.children}</nav>;

  return { Navbar: MockStyledNavbar, link: hoisted.mockStyledLink };
});

const MockIcon = () => <svg data-testid="test-icon" />;

describe("Navbar Test", () => {
  const user = userEvent.setup();

  // GIVEN: 기본 내비게이션 항목 목록 (단일 경로 및 배열 경로 포함)
  const baseNavs = [
    { content: "Home" as Languages, Icon: MockIcon, path: "home" },
    { content: "Settings" as Languages, Icon: MockIcon, path: "settings" },
    {
      content: "User" as Languages,
      Icon: MockIcon,
      path: ["users", "admins"],
    },
  ];

  beforeEach(() => {
    // GIVEN: 각 테스트 전 Mock 초기화 및 기본 상태 설정
    mockUseLocation.mockReturnValue({ pathname: "/home" }); // DESC: 기본 경로: /home
  });

  describe("Parent Component Rendering and Access Control", () => {
    test("기본 렌더링 시, Styled Navbar 구조와 NavItem들이 올바르게 렌더링되는지 확인", () => {
      // WHEN: Navbar 렌더링
      const { container } = renderComponent({ ui: <Navbar navs={baseNavs} /> });

      expect(container.children).toHaveLength(1);

      const navBar = container.children[0];

      // THEN: 1. 기본 구조 (NAV -> UL -> LI) 확인
      expect(navBar).toBeInTheDocument();
      expect(navBar.tagName).toBe("NAV");
      expect(navBar.children).toHaveLength(1);

      const ul = navBar.children[0];

      expect(ul).toBeInTheDocument();
      expect(ul.tagName).toBe("UL");
      expect(ul.children).toHaveLength(baseNavs.length);

      baseNavs.forEach((item, i) => {
        const li = ul.children[i];

        expect(li).toBeInTheDocument();
        expect(li.tagName).toBe("LI");

        const navLink = li.children[0];

        // THEN: 2. NavLink (A 태그 Mock) 속성 확인
        expect(navLink).toBeInTheDocument();
        expect(navLink.tagName).toBe("A");
        // THEN: 배열 경로의 경우, 첫 번째 경로를 href로 사용했는지 확인
        expect(navLink).toHaveAttribute(
          "href",
          `/${Array.isArray(item.path) ? item.path[0] : item.path}`,
        );

        const navLinkIcon = navLink.children[0];

        // THEN: 3. 아이콘 렌더링 확인
        expect(navLinkIcon).toBeInTheDocument();
        expect(navLinkIcon.tagName).toBe("svg");
      });

      const linkCalls = hoisted.mockStyledLink.mock.calls;

      // THEN: 4. StyledLink 컴포넌트 호출 횟수 확인
      expect(linkCalls).toHaveLength(baseNavs.length);
      // THEN: 5. StyledLink에 전달된 props (isActive 상태) 확인 (초기 location: /home 기준)
      // DESC: 첫 번째 Nav(Home)
      expect(linkCalls[0][0]).toMatchObject({
        content: baseNavs[0].content,
        isActive: true, // DESC: /home과 일치
      });
      // DESC: 두 번째 Nav(Settings)
      expect(linkCalls[1][0]).toMatchObject({
        content: baseNavs[1].content,
        isActive: false, // DESC: /settings와 불일치
      });
      // DESC: 세 번째 Nav(User Management)
      expect(linkCalls[2][0]).toMatchObject({
        content: baseNavs[2].content,
        isActive: false, // DESC: 배열["user", "admin"]이 '/home'과 불일치
      });
      // THEN: 6. defaultLanguage가 각 content로 호출되었는지 확인
      expect(mockDefaultLanguage).toHaveBeenCalledWith({
        text: baseNavs[0].content,
      });
      expect(mockDefaultLanguage).toHaveBeenCalledWith({
        text: baseNavs[1].content,
      });
      expect(mockDefaultLanguage).toHaveBeenCalledWith({
        text: baseNavs[2].content,
      });
    });

    test("현재 경로와 일치하는 NavItem에 isActive=true가 전달되는지 확인 (단일 경로)", () => {
      // GIVEN: location을 /settings로 설정
      mockUseLocation.mockReturnValue({ pathname: "/settings" });

      // WHEN: 렌더링
      renderComponent({ ui: <Navbar navs={baseNavs} /> });

      // THEN: mockStyledLink 호출을 통해 isActive={true}가 전달되었는지 확인

      // DESC: Home (baseNavs[0])
      const homeLink = hoisted.mockStyledLink.mock.calls.find(
        (call) => call?.[0]?.content === baseNavs[0].content,
      );

      expect(homeLink?.[0].isActive).toBe(false);

      // DESC: Settings (baseNavs[1])
      const settingsLink = hoisted.mockStyledLink.mock.calls.find(
        (call) => call?.[0]?.content === baseNavs[1].content,
      );

      expect(settingsLink?.[0].isActive).toBe(true); // 현재 경로와 일치

      // DESC: User (baseNavs[2])
      const userLink = hoisted.mockStyledLink.mock.calls.find(
        (call) => call?.[0]?.content === baseNavs[2].content,
      );
      expect(userLink?.[0].isActive).toBe(false);
    });

    test("현재 경로와 일치하는 NavItem에 isActive=true가 전달되는지 확인 (배열 경로)", () => {
      // GIVEN: location을 배열 경로 중 하나인 /admins로 시작하는 /admins/profile로 설정
      mockUseLocation.mockReturnValue({ pathname: "/admins/profile" });

      // WHEN: 렌더링
      renderComponent({ ui: <Navbar navs={baseNavs} /> });

      // THEN: 다른 항목은 false여야 함
      const settingsLink = hoisted.mockStyledLink.mock.calls.find(
        (call) => call?.[0]?.content === baseNavs[1].content,
      );
      expect(settingsLink?.[0].isActive).toBe(false);

      // THEN: DESC: 'User' NavItem에 isActive={true}가 전달되었는지 검증
      const userLink = hoisted.mockStyledLink.mock.calls.find(
        (call) => call?.[0]?.content === baseNavs[2].content,
      );

      expect(userLink).toBeDefined();
      expect(userLink?.[0].isActive).toBe(true); // DESC: /admins/profile는 배열 경로 중 admins로 시작하므로 일치
    });

    test("checkAccessDenied가 true를 반환하는 nav 항목은 렌더링되지 않음", () => {
      // GIVEN: level 1, Settings 경로("settings")에 대한 접근 거부 설정
      const inaccessInfo = {
        "1": { path: [`/${baseNavs[1].path}`], redirectPage: "" },
      }; // DESC: level 1은 settings 접근 불가

      // WHEN: level=1로 Navbar 렌더링
      const { queryAllByRole, queryByTestId, getByTestId } = renderComponent({
        ui: <Navbar inaccessInfo={inaccessInfo} level={1} navs={baseNavs} />,
      });

      // THEN: 1. 렌더링된 Nav 항목(link)은 2개여야 함 (Settings 제외)
      expect(queryAllByRole("link")).toHaveLength(2);
      // THEN: 2. Settings 항목이 렌더링되지 않았는지 확인
      expect(queryByTestId(`test-nav-link-settings`)).not.toBeInTheDocument();
      // THEN: 3. Home 항목은 렌더링되었는지 확인 (접근 가능)
      expect(getByTestId("test-nav-link-home")).toBeInTheDocument();
      // THEN: 4. mockStyledLink 호출 횟수도 2회여야 함
      expect(hoisted.mockStyledLink.mock.calls).toHaveLength(2);
    });
  });

  describe("Filter Initialization Reset", () => {
    test("NavLink 클릭 시, isInitQueryFilter가 false이면 setIsInitQueryFilter(true)가 호출됨", async () => {
      // GIVEN: isInitQueryFilter가 false (기본값)
      mockUseQueryFilterStore.isInitQueryFilter = false;

      const { getByTestId } = renderComponent({
        ui: <Navbar navs={[baseNavs[0]]} />,
      }); // DESC: Home NavItem만 렌더링

      const homeLink = getByTestId(`test-nav-link-${baseNavs[0].path}`);

      // WHEN: NavLink 클릭
      await user.click(homeLink);

      // THEN: 호출 확인
      expect(mockUseQueryFilterStore.setIsInitQueryFilter).toHaveBeenCalledWith(
        true,
      );
      expect(
        mockUseQueryFilterStore.setIsInitQueryFilter,
      ).toHaveBeenCalledOnce();
    });

    test("NavLink 클릭 시, isInitQueryFilter가 true이면 setIsInitQueryFilter가 호출되지 않음", async () => {
      // GIVEN: isInitQueryFilter가 true
      mockUseQueryFilterStore.isInitQueryFilter = true;

      const { getByTestId } = renderComponent({
        ui: <Navbar navs={[baseNavs[0]]} />,
      }); // Home NavItem만 렌더링

      const homeLink = getByTestId(`test-nav-link-${baseNavs[0].path}`);

      // WHEN: NavLink 클릭
      await user.click(homeLink);

      // THEN: 호출 없음 확인
      expect(
        mockUseQueryFilterStore.setIsInitQueryFilter,
      ).not.toHaveBeenCalled();
    });
  });
});
