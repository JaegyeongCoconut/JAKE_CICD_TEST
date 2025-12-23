import type { ComponentProps } from "react";
import React from "react";

import { within } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";

import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";

import VersionCard from "@packages/card/version/VersionCard";
import type * as StyledType from "@packages/card/version/VersionCard.styled";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

// DESC: 아이콘 컴포넌트 Mocking
vi.mock("@repo/assets/icon/ic_down.svg", () => ({
  ReactComponent: () => <svg data-testid="test-down-icon" />,
}));

// DESC: Styled Component Mocking
vi.mock("@packages/card/version/VersionCard.styled", () => {
  const MockStyledWrapper = (
    props: ComponentProps<typeof StyledType.Wrapper>,
  ) => <div className={props.className}>{props.children}</div>;
  const MockStyledHeader = (
    props: ComponentProps<typeof StyledType.Header>,
  ) => <div>{props.children}</div>;
  const MockStyledTitle = (props: ComponentProps<typeof StyledType.Title>) => (
    <span data-testid="test-title">{props.children}</span>
  );
  const MockStyledBody = (props: ComponentProps<typeof StyledType.Body>) => (
    <div>{props.children}</div>
  );
  const MockStyledItem = (props: ComponentProps<typeof StyledType.Item>) => (
    <div>{props.children}</div>
  );
  const MockStyledName = (props: ComponentProps<typeof StyledType.Name>) => (
    <span data-testid="test-name">{props.children}</span>
  );
  const MockStyledVersionContent = (
    props: ComponentProps<typeof StyledType.VersionContent>,
  ) => <div data-testid="test-versionContent">{props.children}</div>;

  return {
    Wrapper: MockStyledWrapper,
    Header: MockStyledHeader,
    Title: MockStyledTitle,
    Body: MockStyledBody,
    Item: MockStyledItem,
    Name: MockStyledName,
    VersionContent: MockStyledVersionContent,
    icon: {},
    link: {},
  };
});

// GIVEN: 단계에서 필요한 Mock 코드
// DESC: react-router-dom의 Link 컴포넌트 Mocking
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    // DESC: Link 컴포넌트를 Mocking
    Link: ({ children, to }: { to: string; children: React.ReactNode }) => (
      <a
        data-testid="test-link"
        data-to={to} // DESC: to prop 검증을 위해 노출
      >
        {children}
      </a>
    ),
  };
});

describe("VersionCard Test", () => {
  const mockedVersion = {
    serviceName: "KOKKOK Move" as const,
    os: "Android" as const,
    to: "/moveManagement",
    old: "1.0.0",
    new: "2.0.0",
    test: "2.0.1",
  };

  test("VersionCard 렌더 시, 모든 데이터가 있으면 버전 정보와 링크가 올바르게 렌더됨", () => {
    // GIVEN: 모든 버전 데이터가 있는 VersionCard
    // WHEN: 컴포넌트 렌더링
    const { getByTestId, getAllByTestId } = renderComponent({
      ui: <VersionCard version={mockedVersion} />,
    });

    const title = getByTestId("test-title");
    const link = getByTestId("test-link");
    const versionContents = getAllByTestId("test-versionContent");

    // THEN: title 렌더링 및 text 표시 확인
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(
      `${mockedVersion.serviceName} (${mockedVersion.os})`,
    );

    // THEN: 렌더링 및 to props를 받았는지 검증
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("data-to", mockedVersion.to);
    // THEN: 하위 element가 2개인지 확인 및 문구 확인
    expect(link.children).toHaveLength(2);
    expect(link).toHaveTextContent(LANGUAGE_LABEL.EDIT); // NOTE: 문구 고정값
    expect(within(link).getByTestId("test-down-icon")).toBeInTheDocument();

    // THEN: versionContents의 개수 및 text 표시 확인(이중 검증)
    // DESC: versionContents는 배열이라 toBeInTheDocument로 확인 불가
    expect(versionContents).toHaveLength(3);
    expect(
      within(versionContents[0]).getByText(mockedVersion.old),
    ).toBeInTheDocument();
    expect(
      within(versionContents[1]).getByText(mockedVersion.new),
    ).toBeInTheDocument();
    expect(
      within(versionContents[2]).getByText(mockedVersion.test),
    ).toBeInTheDocument();
  });

  test("VersionCard 렌더 시, 각 버전 이름에 대해 defaultLanguage를 실행하고 올바른 텍스트가 렌더", () => {
    // GIVEN: version prop이 있는 VersionCard
    // WHEN: 컴포넌트 렌더링
    const { getAllByTestId } = renderComponent({
      ui: <VersionCard version={mockedVersion} />,
    });

    // THEN: defaultLanguage 훅이 각 버전 이름으로 호출되었는지 확인
    expect(mockDefaultLanguage).toHaveBeenCalledWith({
      text: LANGUAGE_LABEL.FIRST_VERSION,
    });
    expect(mockDefaultLanguage).toHaveBeenCalledWith({
      text: LANGUAGE_LABEL.LAST_VERSION,
    });
    expect(mockDefaultLanguage).toHaveBeenCalledWith({
      text: LANGUAGE_LABEL.REVIEW_VERSION,
    });

    const names = getAllByTestId("test-name");

    // THEN: 각 버전 이름이 올바르게 렌더링되는지 검증
    expect(names[0]).toHaveTextContent(LANGUAGE_LABEL.FIRST_VERSION);
    expect(names[1]).toHaveTextContent(LANGUAGE_LABEL.LAST_VERSION);
    expect(names[2]).toHaveTextContent(LANGUAGE_LABEL.REVIEW_VERSION);
  });

  test("모든 데이터가 undefined일 때, 기본값 포맷 '- (-)'이 표시되고 링크는 렌더링되지 않음", () => {
    // GIVEN: 모든 데이터가 undefined인 VersionCard
    const undefinedVersion = {
      serviceName: undefined,
      os: undefined,
      to: undefined,
      old: undefined,
      new: undefined,
      test: undefined,
    };

    // WHEN: 컴포넌트 렌더링
    const { getByTestId, queryByTestId } = renderComponent({
      ui: <VersionCard version={undefinedVersion} />,
    });

    const title = getByTestId("test-title");
    const link = queryByTestId("test-link"); // DESC: 없는 요소를 찾기 위해 queryByTestId 사용

    // THEN: 기본값 포맷이 표시되는지 확인
    expect(title).toHaveTextContent("- (-)");

    // THEN: 링크가 렌더링되지 않는지 확인
    expect(link).not.toBeInTheDocument();
  });

  test("to와 버전 정보가 빈 문자열일 때, 링크가 렌더링되지 않고 버전 정보는 대체 텍스트('-')로 표시됨", () => {
    // GIVEN: to와 버전 정보가 빈 문자열인 VersionCard
    const mockedVersion = {
      serviceName: "KOKKOK Move" as const,
      os: "Android" as const,
      to: "",
      old: "",
      new: "",
      test: "",
    };

    // WHEN: 컴포넌트 렌더링
    const { getAllByTestId, queryByTestId } = renderComponent({
      ui: <VersionCard version={mockedVersion} />,
    });

    const link = queryByTestId("test-link"); // DESC: 없는 요소를 찾기 위해 queryByTestId 사용
    const versionContents = getAllByTestId("test-versionContent");

    // THEN: 링크가 렌더링되지 않는지 확인
    expect(link).not.toBeInTheDocument();

    // THEN: 버전 정보가 대체 텍스트("-")로 표시되는지 확인
    expect(versionContents[0]).toHaveTextContent("-");
    expect(versionContents[1]).toHaveTextContent("-");
    expect(versionContents[2]).toHaveTextContent("-");
  });
});
