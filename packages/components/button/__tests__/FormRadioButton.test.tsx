import type { ComponentProps } from "react";
import React from "react";

import FormRadioButton from "button/radio/form/FormRadioButton";
import { describe, expect, test, vi } from "vitest";

import type { Languages } from "@repo/types";

import type * as StyledType from "@packages/button/radio/form/FormRadioButton.styled";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

// DESC: React의 useId 훅을 Mocking하여 항상 고정된 값을 반환하도록 설정
vi.mock("react", async () => {
  const actual = await vi.importActual("react");

  // DESC: 모든 useId 호출에 대해 "fixed-uuid" 반환. ID 예측 및 검증에 사용
  return { ...actual, useId: () => "fixed-uuid" };
});
vi.mock("@packages/button/radio/form/FormRadioButton.styled", () => {
  // DESC: Styled Component Mock: 최상위 Wrapper
  const MockStyledRadioWrapper = (
    props: ComponentProps<typeof StyledType.RadioWrapper>,
  ) => (
    <div className={props.className} data-testid="test-radio-wrapper">
      {props.children}
    </div>
  );
  // DESC: Styled Component Mock: Label (disabled prop 전달 검증용)
  const MockStyledLabel = (props: ComponentProps<typeof StyledType.Label>) => (
    <label data-disabled={`${!!props.disabled}`} data-testid="test-label">
      {props.children}
    </label>
  );
  // DESC: Styled Component Mock: RadioButton (Custom Label)
  const MockStyledRadioButton = (
    props: ComponentProps<typeof StyledType.RadioButton>,
  ) => (
    <label
      id={props.id}
      data-testid="test-radio-button-label"
      htmlFor={props.htmlFor}
      tabIndex={props.tabIndex}
    />
  );

  return {
    RadioWrapper: MockStyledRadioWrapper,
    Label: MockStyledLabel,
    RadioButton: MockStyledRadioButton,
  };
});

describe("FormRadioButton Test", () => {
  // GIVEN: 테스트에 사용될 공통 라디오 목록 데이터
  const radioList = [
    { key: "a", label: "Option A" as Languages },
    { key: "b", label: "Option B" as Languages },
  ] as const;

  test("FormRadioButton 렌더 시, 전달된 props를 바탕으로 올바른 DOM 구조와 내용을 렌더링해야 함", () => {
    // GIVEN: React Hook Form의 register Mock
    const mockRegister = {
      name: "test-register",
      ref: vi.fn(),
      onChange: vi.fn(),
      onBlur: vi.fn(),
    };

    // WHEN: disabled={false} 및 register prop을 포함하여 컴포넌트 렌더링
    const { getByTestId, getAllByTestId } = renderComponent({
      ui: (
        <FormRadioButton
          className="test-class"
          disabled={false} // DESC: 테스트를 위해 disabled를 false로 설정
          radioList={radioList}
          register={mockRegister}
        />
      ),
    });

    // THEN: 1. 최상위 Wrapper 검증 및 className 확인
    const radioWrapper = getByTestId("test-radio-wrapper");

    expect(radioWrapper).toBeInTheDocument();
    expect(radioWrapper).toHaveClass("test-class");

    // THEN: 2. 라디오 버튼의 개수와 순서 검증
    const labels = getAllByTestId("test-label");

    expect(labels).toHaveLength(radioList.length); // THEN: radioList 개수만큼 렌더링 확인

    labels.forEach((labelElement, index) => {
      const { key, label: expectedLabelText } = radioList[index];
      // THEN: 3. 각 Label의 구조 및 내용 검증 (DOM 순서 포함)
      // DESC: Mocking 구조: <label> -> [0] <input>, [1] <S.RadioButton>, [2] <span>
      const inputRadio = labelElement.children[0];
      const radioButtonLabel = labelElement.children[1];
      const radioSpan = labelElement.children[2];
      const labelWrapper = labelElement as HTMLElement; // data-testid="test-label" 요소 (S.Label Mock)

      // THEN: S.Label (Mock)이 disabled={false} prop을 받았는지 확인
      expect(labelWrapper).toHaveAttribute("data-disabled", "false");
      // THEN: input 요소가 disabled={false} 속성을 받았는지 확인 (핵심 기능)
      expect(inputRadio).not.toBeDisabled();

      // THEN: Input Type 검증
      expect(inputRadio).toHaveAttribute("type", "radio");
      // THEN: register prop을 통해 전달된 name 속성 검증
      expect(inputRadio).toHaveAttribute("name", mockRegister.name);
      // THEN: value 속성 검증
      expect(inputRadio).toHaveAttribute("value", key);

      // THEN: ID와 FOR 속성 일치 검증 (접근성 보장)
      expect(radioButtonLabel.getAttribute("for")).toBe(inputRadio.id);
      // THEN: S.RadioButton (커스텀 레이블)에 tabIndex={0} 속성이 있는지 확인
      expect(radioButtonLabel).toHaveAttribute("tabindex", "0");

      // THEN: 라벨 텍스트 컨테이너가 SPAN 태그인지 확인
      expect(radioSpan.tagName).toBe("SPAN");
      // THEN: SPAN에 올바른 텍스트 내용이 있는지 확인
      expect(radioSpan).toHaveTextContent(expectedLabelText);

      // THEN: useDefaultLanguage 훅이 올바른 순서(index + 1)와 인수로 호출되었는지 검증
      // DESC: NthCalledWith는 1부터 시작함, 따라서 index + 1임
      expect(mockDefaultLanguage).toHaveBeenNthCalledWith(index + 1, {
        text: expectedLabelText,
      });
    });
  });

  test("disabled=true일 때, input과 S.Label 모두 disabled 상태를 전달받아야 함", () => {
    // GIVEN: disabled={true} 설정 및 register Mock
    const mockRegister = {
      name: "test-register",
      ref: vi.fn(),
      onChange: vi.fn(),
      onBlur: vi.fn(),
    };

    // WHEN: disabled prop이 true인 상태로 컴포넌트 렌더링
    const { getAllByTestId } = renderComponent({
      ui: (
        <FormRadioButton
          disabled
          radioList={radioList}
          register={mockRegister}
        />
      ),
    });

    const labels = getAllByTestId("test-label");

    labels.forEach((labelElement) => {
      const inputRadio = labelElement.children[0];
      const labelWrapper = labelElement as HTMLElement;

      // THEN: S.Label (Mock)이 disabled prop을 받았는지 확인
      expect(labelWrapper).toHaveAttribute("data-disabled", "true");

      // THEN: input 요소가 disabled 속성을 받았는지 확인 (클릭 차단)
      expect(inputRadio).toBeDisabled();
    });
  });
});
