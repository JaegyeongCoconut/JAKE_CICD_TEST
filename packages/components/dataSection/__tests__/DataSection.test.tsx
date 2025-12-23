import type { ComponentProps } from "react";
import React from "react";

import { within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import type { Languages } from "@repo/types";
import * as dateUtils from "@repo/utils/date";
import * as currencyUtils from "@repo/utils/formatter/currency";

import type Button from "@packages/button/Button";
import DataSection from "@packages/dataSection/DataSection";
import type * as StyledType from "@packages/dataSection/DataSection.styled";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

const hoisted = vi.hoisted(() => ({
  mockResetIcon: vi.fn(),
  mockExcelDownloadButton: vi.fn(),
  MockDownloadIcon: () => <svg data-testid="test-ic-download" />,
}));
vi.mock("@repo/assets/icon/ic_download.svg", () => ({
  ReactComponent: hoisted.MockDownloadIcon,
}));
vi.mock("@repo/assets/icon/ic_refresh.svg", () => ({
  ReactComponent: () => <svg data-testid="test-ic-refresh" />,
}));
vi.mock("@packages/dataSection/DataSection.styled", () => {
  const MockStyledHeader = (
    props: ComponentProps<typeof StyledType.Header>,
  ) => <div data-has-only-button={!!props.hasOnlyButton}>{props.children}</div>;
  const MockStyledLeftContent = (
    props: ComponentProps<typeof StyledType.LeftContent>,
  ) => <div>{props.children}</div>;
  const MockStyledRefetch = (
    props: ComponentProps<typeof StyledType.Refetch>,
  ) => <div>{props.children}</div>;
  const MockStyledRefetchButton = (
    props: ComponentProps<typeof StyledType.RefetchButton>,
  ) => (
    <button type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );

  return {
    Header: MockStyledHeader,
    LeftContent: MockStyledLeftContent,
    Refetch: MockStyledRefetch,
    RefetchButton: MockStyledRefetchButton,
    resetIcon: hoisted.mockResetIcon,
    excelDownloadButton: hoisted.mockExcelDownloadButton,
  };
});
const buttonProps: ComponentProps<typeof Button>[] = [];
vi.mock("@packages/button/Button", () => ({
  default: (props: ComponentProps<typeof Button>) => {
    buttonProps.push(props);

    return <div />;
  },
}));

const spyFormatICTDateTime = vi.spyOn(dateUtils, "formatICTDateTime");
const spyFormatLocalDateTime = vi.spyOn(dateUtils, "formatLocalDateTime");
const spyComma = vi.spyOn(currencyUtils, "comma");

beforeEach(() => {
  // GIVEN: 각 테스트 전 Button props 배열 초기화
  buttonProps.length = 0;
  // DESC: 각 util 함수의 내부 구현에 테스트가 종속되지 않도록 implementation으로 mock 함수 구현
  spyComma.mockImplementation((x) => `comma(${x})`);
  spyFormatICTDateTime.mockReturnValue("ICT_TIME");
  spyFormatLocalDateTime.mockReturnValue("LOCAL_TIME");
});

describe("DataSection Test", () => {
  const user = userEvent.setup();
  const baseProps = {
    isApiCalled: true,
    isLocalTime: false,
    dataUpdatedAt: 1672531200000,
    title: "TITLE" as Languages,
    totalData: 12345,
    onRefetch: vi.fn(),
    onRemove: vi.fn(),
    activeButtons: <button data-testid="test-active-button">Action</button>,
    children: <p data-testid="test-children">Content</p>,
  };

  beforeEach(() => {
    // DESC: 각 테스트 전 mock 함수를 재생성하여 테스트 격리 보장
    baseProps.onRefetch = vi.fn();
    baseProps.onRemove = vi.fn();
  });

  test("DataSection 초기 렌더 시, 기본 정보 (제목, totalData, 업데이트 시간)가 올바르게 렌더링되어야 함", async () => {
    // WHEN: 기본 Props로 렌더링
    const { container, getByTestId } = renderComponent({
      ui: (
        <DataSection
          className="test-class"
          isApiCalled={baseProps.isApiCalled}
          activeButtons={baseProps.activeButtons}
          dataUpdatedAt={baseProps.dataUpdatedAt}
          title={baseProps.title}
          totalData={baseProps.totalData}
          onRefetch={baseProps.onRefetch}
          onRemove={baseProps.onRemove}
        >
          {baseProps.children}
        </DataSection>
      ),
    });

    expect(container.children).toHaveLength(1);

    const section = container.children[0];

    // THEN: 1. 최상위는 SECTION 태그
    expect(section).toBeInTheDocument();
    expect(section.tagName).toBe("SECTION");
    expect(section.children).toHaveLength(2); // DESC: S.Header + children

    const header = section.children[0];

    // THEN: 2. Header 구조 확인 (LeftContent와 activeButtons 포함)
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute("data-has-only-button", "false"); // DESC: activeButtons가 있으므로 false
    expect(header.children).toHaveLength(2); // DESC: S.LeftContent + activeButtons

    const leftContent = header.children[0];

    // THEN: 3. LeftContent 구조 확인 (제목과 Refetch 정보 포함)
    expect(leftContent).toBeInTheDocument();
    expect(leftContent.children).toHaveLength(2); // DESC: h2 + S.Refetch

    const h2 = leftContent.children[0];

    // THEN: 4. h2 제목 렌더링 및 내용 (title + totalData) 확인
    expect(h2).toBeInTheDocument();
    expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: baseProps.title });
    expect(h2).toHaveTextContent(
      `${baseProps.title} (comma(${baseProps.totalData}))`, // DESC: title + 공백 + totalData 포맷 확인
    );

    const refetch = leftContent.children[1];

    // THEN: 5. Refetch 정보 블록 구조 확인 (업데이트 레이블, 시간, 버튼 포함)
    expect(refetch).toBeInTheDocument();
    expect(refetch.children).toHaveLength(3); // DESC: span + time + RefetchButton

    const span = refetch.children[0];

    // THEN: 6. span 렌더링 확인
    expect(span).toBeInTheDocument();
    expect(span.tagName).toBe("SPAN");
    expect(mockDefaultLanguage).toHaveBeenCalledWith({
      text: LANGUAGE_LABEL.LATEST_UPDATED,
    });
    expect(span).toHaveTextContent(LANGUAGE_LABEL.LATEST_UPDATED);

    const time = refetch.children[1];

    // THEN: 7. time 렌더링 및 시간 포맷 함수 호출 확인
    expect(time).toBeInTheDocument();
    expect(time.tagName).toBe("TIME");
    expect(spyFormatICTDateTime).toHaveBeenCalledWith({
      // DESC: formatICTDateTime 사용 확인
      date: baseProps.dataUpdatedAt,
    });
    expect(spyFormatLocalDateTime).not.toHaveBeenCalled(); // DESC: formatLocalDateTime 사용 안 함

    const refetchButton = refetch.children[2];

    // THEN: 8. RefetchButton 기본 속성 확인
    expect(refetchButton).toBeInTheDocument();
    expect(refetchButton).toHaveAttribute("type", "button");

    // THEN: 9. handleRefetch 호출 확인
    await user.click(refetchButton);

    expect(baseProps.onRefetch).toHaveBeenCalledOnce();
    expect(baseProps.onRemove).toHaveBeenCalledOnce();

    // THEN: 10. Refresh 아이콘 렌더링 확인
    const refreshIcon = within(refetchButton as HTMLElement).getByTestId(
      "test-ic-refresh",
    );

    expect(refreshIcon).toBeInTheDocument();
    expect(refreshIcon.tagName).toBe("svg");
    expect(hoisted.mockResetIcon).toHaveBeenCalledOnce(); // DESC: Styled Component 내부 아이콘 호출 확인

    const actionButtons = header.children[1];

    // THEN: 11. activeButtons가 렌더링되었는지 확인
    expect(actionButtons).toBeInTheDocument();
    expect(actionButtons).toBe(getByTestId("test-active-button"));

    const children = section.children[1];

    // THEN: 12. DataSection의 children이 section에 렌더링되었는지 확인
    expect(children).toBeInTheDocument();
    expect(children).toBe(getByTestId("test-children"));
  });

  test("isApiCalled=false 일 때, totalData=0, Refetch은 렌더링되지 않음", () => {
    // WHEN: isApiCalled=false로 렌더링
    const { container } = renderComponent({
      ui: <DataSection {...baseProps} isApiCalled={false} totalData={500} />,
    });

    const section = container.children[0];
    const header = section.children[0];
    const leftContent = header.children[0];
    const h2 = leftContent.children[0];

    // THEN: 1. totalData는 0으로 표시 (comma 호출 안 됨)
    expect(spyComma).not.toHaveBeenCalled();
    expect(h2).toHaveTextContent(`${baseProps.title} (0)`);

    // THEN: 2. S.Refetch이 렌더링되지 않음
    expect(leftContent.children).toHaveLength(1); // DESC: h2
  });

  test("totalData가 0일 때, totalData는 0으로 표시되고 comma 유틸리티는 호출되지 않음", () => {
    // WHEN: totalData=0으로 렌더링
    const { container } = renderComponent({
      ui: <DataSection {...baseProps} totalData={0} />,
    });

    const section = container.children[0];
    const header = section.children[0];
    const leftContent = header.children[0];
    const h2 = leftContent.children[0];

    // THEN: 1. totalData는 0으로 표시
    expect(spyComma).not.toHaveBeenCalled();
    expect(h2).toHaveTextContent(`${baseProps.title} (0)`);

    // THEN: 2. isApiCalled=true이므로 Refetch는 정상 렌더링
    expect(leftContent.children).toHaveLength(2);
  });

  test("isLocalTime=true 일 때, Local 시간 포맷이 사용되어야 함", () => {
    // WHEN: isLocalTime=true로 렌더링
    const { container } = renderComponent({
      ui: <DataSection {...baseProps} isLocalTime={true} />,
    });

    const timeElement = container.querySelector("time") as HTMLElement;

    // THEN: 1. formatLocalDateTime이 올바른 템플릿으로 호출되어야 함
    expect(spyFormatLocalDateTime).toHaveBeenCalledWith({
      date: baseProps.dataUpdatedAt,
      template: "DD/MM/YYYY, HH:mm",
    });
    expect(spyFormatICTDateTime).not.toHaveBeenCalled();

    // THEN: 2. 렌더링된 시간 확인
    expect(timeElement).toHaveTextContent("LOCAL_TIME");
  });

  test("dataUpdatedAt=0 일 때, 업데이트 시간은 '-'로 표시되고 RefetchButton은 렌더링되지 않아야 함", () => {
    // WHEN: dataUpdatedAt=0으로 렌더링
    const { container } = renderComponent({
      ui: <DataSection {...baseProps} dataUpdatedAt={0} />,
    });

    const timeElement = container.querySelector("time") as HTMLElement;
    const refetchButton = container.querySelector("button[type='button']");

    // THEN: 1. 시간은 '-'로 표시
    expect(timeElement).toHaveTextContent("-");
    expect(spyFormatICTDateTime).not.toHaveBeenCalled();
    expect(spyFormatLocalDateTime).not.toHaveBeenCalled();

    // THEN: 2. RefetchButton은 렌더링되지 않아야 함
    expect(refetchButton).toBeNull();
  });

  test("title이 없고 isApiCalled=true이며 activeButtons가 있을 때, S.Header에 hasOnlyButton=true가 전달되어야 함", () => {
    // WHEN: title="", isApiCalled=true, activeButtons=존재로 렌더링
    const { container } = renderComponent({
      ui: <DataSection {...baseProps} title={"" as Languages} totalData={0} />,
    });

    const section = container.children[0];
    const header = section.children[0];

    // THEN: S.Header에 props가 올바르게 전달되었는지 확인
    expect(header).toHaveAttribute("data-has-only-button", "true");

    // WHEN: title이 있지만, activeButtons가 없을 때
    const { container: container2 } = renderComponent({
      ui: (
        <DataSection
          {...baseProps}
          activeButtons={null} // DESC: activeButtons 없음
          totalData={0}
        />
      ),
    });

    const header2 = container2.children[0].children[0];

    // THEN: S.Header에 props가 false로 전달되어야 함
    expect(header2).toHaveAttribute("data-has-only-button", "false");
  });

  test("DataSection.ExcelDownloadButton 초기 렌더시 props가 올바르게 전달됨", () => {
    // GIVEN: 다운로드 Mock 함수 정의
    const mockHandleDownload = vi.fn();

    // WHEN: ExcelDownloadButton 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: (
        <DataSection.ExcelDownloadButton
          disabled={false}
          isLoading={false}
          handleDownload={mockHandleDownload}
        />
      ),
    });

    // THEN: 1. 렌더링된 요소 개수 확인
    expect(container.children).toHaveLength(1);

    // GIVEN: Button 컴포넌트에 전달된 props
    const [props] = buttonProps;

    // THEN: 2. 고정된 스타일 Props 확인
    expect(props.variant).toBe("secondary");
    // THEN: 3. 전달된 상태 Props 확인
    expect(props.isLoading).toBe(false);
    expect(props.disabled).toBe(false);
    expect(props.variant).toBe("secondary");
    // THEN: 4. 고정된 아이콘 Props 확인
    expect(props.Icon).toBe(hoisted.MockDownloadIcon);
    // THEN: 5. 고정된 레이블 Props 확인
    expect(props.label).toBe(LANGUAGE_LABEL.EXPORT);
    // THEN: 6. handleDownload 함수가 하위 컴포넌트의 handleButtonClick으로 올바르게 매핑되었는지 확인
    expect(props.handleButtonClick).toBe(mockHandleDownload);
  });
});
