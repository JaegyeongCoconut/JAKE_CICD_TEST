import type { ComponentProps } from "react";
import React from "react";

import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";

import type { Languages } from "@repo/types";

import FormModalButton from "@packages/button/formModal/FormModalButton";
import type * as StyledType from "@packages/button/formModal/FormModalButton.styled";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

// DESC: 아이콘 Mocking: ic_down.svg를 Mocking하여 테스트 ID가 있는 SVG 컴포넌트를 반환하도록 설정
vi.mock("@repo/assets/icon/ic_down.svg", () => ({
  ReactComponent: () => <svg data-testid="DownIcon" />,
}));
// DESC: Styled Component Mocking: 스타일 컴포넌트들을 Mocking하여 테스트에 필요한 prop들이 DOM에 반영되는지 확인
vi.mock("@packages/button/formModal/FormModalButton.styled", () => {
  // DESC: FormModalButton 스타일 컴포넌트 Mock
  const MockStyledFormModalButton = (
    props: ComponentProps<typeof StyledType.FormModalButton>,
  ) => (
    // DESC: hasError는 DOM의 요소가 아님
    // DESC: data-* 속성은 문자열을 기대하므로, 명시적으로 'true' 또는 'false' 문자열로 변환하여 DOM에 전달
    <button
      data-has-error={`${!!props.hasError}`}
      data-testid="test-formModalButton"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
  // DESC: Content 스타일 컴포넌트 Mock
  const MockStyledContent = (
    props: ComponentProps<typeof StyledType.Content>,
  ) => (
    // DESC: hasLabel는 DOM의 요소가 아님
    // DESC: data-* 속성은 문자열을 기대하므로, 명시적으로 'true' 또는 'false' 문자열로 변환하여 DOM에 전달
    <span data-has-label={`${!!props.hasLabel}`} data-testid="test-content">
      {props.children}
    </span>
  );

  return {
    FormModalButton: MockStyledFormModalButton,
    Content: MockStyledContent,
    chevronRight: {}, // DESC: 검증이 필요없는 스타일은 빈 객체로 Mock
  };
});

describe("FormModalButton 컴포넌트 테스트", () => {
  // DESC: userEvent 설정 (비동기 이벤트 처리)
  const user = userEvent.setup();

  test("label이 비어 있으면 defaultLanguage가 실행되면서 placeholder를 렌더", () => {
    // GIVEN: label이 빈 문자열이고 placeholder가 설정된 상태
    // GIVEN: (placeholder: "PLACEHOLDER", label: "")
    const { getByTestId } = renderComponent({
      ui: (
        <FormModalButton
          disabled={false}
          hasError={false}
          label=""
          placeholder={"PLACEHOLDER" as Languages}
          handleModalOpen={() => {}}
        />
      ),
    });

    // THEN: placeholder 텍스트에 대해 defaultLanguage가 한 번 호출되었는지 검증
    expect(mockDefaultLanguage).toHaveBeenCalledOnce();
    expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: "PLACEHOLDER" });

    const content = getByTestId("test-content");

    // THEN: 렌더링된 Content에 placeholder 텍스트가 표시되는지 검증
    expect(content).toHaveTextContent("PLACEHOLDER");
    // THEN: label이 비어있으므로 Content Mock에 data-has-label=false를 검증
    expect(content).toHaveAttribute("data-has-label", "false");
  });

  test("label이 존재하면 label을 표시하고, Content의 hasLabel=true가 전달되었는지 검증", () => {
    // GIVEN: label이 "선택됨"으로 설정된 상태
    const { getByTestId } = renderComponent({
      ui: (
        <FormModalButton
          disabled={false}
          hasError={false}
          label="선택됨"
          placeholder={"PLACEHOLDER" as Languages}
          handleModalOpen={() => {}}
        />
      ),
    });

    const content = getByTestId("test-content");

    // THEN: 렌더링된 Content에 label 텍스트가 표시되는지 검증
    expect(content).toHaveTextContent("선택됨");
    // THEN: label이 존재하므로 defaultLanguage는 호출되지 않았는지 검증
    expect(mockDefaultLanguage).not.toHaveBeenCalled();
    // THEN: label이 존재하므로 Content Mock에 data-has-label=true를 검증
    expect(content).toHaveAttribute("data-has-label", "true");
  });

  test("disabled=true면 버튼 클릭 시 핸들러가 호출되지 않음", async () => {
    // GIVEN: handleModalOpen Mock 함수와 disabled=true 설정
    const mockHandler = vi.fn();

    const { getByTestId } = renderComponent({
      ui: (
        <FormModalButton
          disabled
          hasError={false}
          label=""
          placeholder={"PLACEHOLDER" as Languages}
          handleModalOpen={mockHandler}
        />
      ),
    });

    // WHEN: 버튼 클릭
    await user.click(getByTestId("test-formModalButton"));

    // THEN: disabled 상태이므로 핸들러가 호출되지 않았는지 검증
    expect(mockHandler).not.toHaveBeenCalled();
  });

  test("disabled=false면 버튼 클릭 시 핸들러가 호출됨", async () => {
    // GIVEN: handleModalOpen Mock 함수와 disabled=false 설정
    const mockHandler = vi.fn();

    const { getByTestId } = renderComponent({
      ui: (
        <FormModalButton
          disabled={false}
          hasError={false}
          label=""
          placeholder={"PLACEHOLDER" as Languages}
          handleModalOpen={mockHandler}
        />
      ),
    });

    // WHEN: 버튼 클릭
    await user.click(getByTestId("test-formModalButton"));

    // THEN: disabled 상태가 아니므로 핸들러가 한 번 호출되었는지 검증
    expect(mockHandler).toHaveBeenCalledOnce();
  });

  test("hasError prop이 스타일 래퍼로 전달됨", () => {
    // GIVEN: hasError=true로 설정
    const { getByTestId, rerender } = renderComponent({
      ui: (
        <FormModalButton
          disabled={false}
          hasError
          label=""
          placeholder={"PLACEHOLDER" as Languages}
          handleModalOpen={() => {}}
        />
      ),
    });

    // THEN: Mock FormModalButton 컴포넌트에 data-has-error='true' 속성이 전달되었는지 검증
    expect(getByTestId("test-formModalButton")).toHaveAttribute(
      "data-has-error",
      "true",
    );

    rerender(
      <FormModalButton
        disabled={false}
        hasError={false}
        label=""
        placeholder={"PLACEHOLDER" as Languages}
        handleModalOpen={() => {}}
      />,
    );

    // THEN: Mock FormModalButton 컴포넌트에 data-has-error='false' 속성이 전달되었는지 검증
    expect(getByTestId("test-formModalButton")).toHaveAttribute(
      "data-has-error",
      "false",
    );
  });
});
