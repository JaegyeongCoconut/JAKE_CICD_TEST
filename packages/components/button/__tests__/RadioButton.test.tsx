import type { ComponentProps } from "react";
import React from "react";

import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import type { Languages, RadioType } from "@repo/types";

import type HeadlessRadioButton from "@packages/button/radio/HeadlessRadioButton";
import RadioButton from "@packages/button/radio/RadioButton";

import renderComponent from "@tests/renderComponent";

const hoisted = vi.hoisted(() => {
  // DESC: HeadlessRadioButton.Content Mock: 실제 Content 로직 대신 클릭 시 핸들러 호출을 시뮬레이션
  const MockHeadlessRadioButtonContent = vi.fn(
    (props: ComponentProps<typeof HeadlessRadioButton.Content>) => {
      return (
        <div
          data-disabled={props.disabled} // DESC: disabled prop이 전달되었는지 확인용
          data-selected={props.radio.key === props.radioState} // DESC: 선택 상태 확인용
          data-testid={`radio-content-${props.radio.key}`}
          // WHEN: 클릭 시 handleRadioButtonClick(radio.key)를 호출하고, 그 결과로 반환된 함수를 실행
          onClick={() => props.handleRadioButtonClick(props.radio.key)()}
        >
          {props.radio.label}
        </div>
      );
    },
  );

  // DESC: HeadlessRadioButton Mock: radioList를 받아 renderRadioButtonItem으로 <li> 목록을 렌더링하는 역할만 시뮬레이션
  const MockHeadlessRadioButton = vi.fn(
    (props: ComponentProps<typeof HeadlessRadioButton>) => {
      return (
        <ul
          className={props.className}
          data-testid="mock-headless-radio-button"
        >
          {/* DESC: 리스트 항목을 순회하며 render prop을 실행하여 Content 렌더링 */}
          {radioList.map((radio) => (
            <li key={radio.key}>{props.renderRadioButtonItem(radio)}</li>
          ))}
        </ul>
      );
    },
  );

  // DESC: Compound Component 패턴을 모방하여 Content를 HeadlessRadioButton의 속성으로 할당
  (MockHeadlessRadioButton as any).Content = MockHeadlessRadioButtonContent;

  return {
    MockHeadlessRadioButton,
    MockHeadlessRadioButtonContent,
    MockStyledRadioButton: {}, // DESC: Styled Component Mock (검증 불필요)
    MockStyledContent: vi.fn(), // DESC: Styled Content Mock (disabled prop 전달 검증용)
  };
});
// DESC: Styled Component Mocking: 스타일 관련 컴포넌트들을 Mocking
vi.mock("@packages/button/radio/RadioButton.styled", () => {
  return {
    radioButton: "custom-css",
    content: hoisted.MockStyledContent, // DESC: MockStyledContent는 disabled prop을 받아 스타일을 처리함
    fillRadioSVG: {},
    label: {},
  };
});
// DESC: HeadlessRadioButton Mocking
vi.mock("@packages/button/radio/HeadlessRadioButton", () => ({
  default: hoisted.MockHeadlessRadioButton,
}));

// GIVEN: 테스트에 사용될 공통 라디오 목록 데이터
const radioList: readonly RadioType<string, Languages>[] = [
  { key: "OptionA", label: "옵션 A" as Languages },
  { key: "OptionB", label: "옵션 B" as Languages },
];

describe("RadioButton Test", () => {
  test("컴포넌트가 HeadlessRadioButton을 올바른 props로 렌더링하고, renderRadioButtonItem이 Content를 렌더링", () => {
    // GIVEN: Mock 클릭 핸들러
    const mockClickHandler = vi.fn();

    // WHEN: RadioButton (Wrapper) 컴포넌트 렌더링
    const { getByTestId } = renderComponent({
      ui: (
        <RadioButton
          className="custom-class"
          disabled={false}
          radioList={radioList}
          radioState="OptionA"
          handleRadioButtonClick={mockClickHandler}
        />
      ),
    });

    // THEN: HeadlessRadioButton (Base 컴포넌트)이 호출되었는지 확인
    expect(hoisted.MockHeadlessRadioButton).toHaveBeenCalled();

    const headlessRadioProps = hoisted.MockHeadlessRadioButton.mock.calls[0][0];

    // THEN: radioList prop이 HeadlessRadioButton에 올바르게 전달되었는지 확인
    expect(headlessRadioProps.radioList).toEqual(radioList);

    // THEN: className prop이 HeadlessRadioButton Mock을 통해 최종 ul 태그에 적용되었는지 확인
    const headlessRoot = getByTestId("mock-headless-radio-button");

    expect(headlessRoot).toHaveClass("custom-class");
    const classNames = headlessRadioProps.className?.split(" ");
    expect(classNames?.length).toBeGreaterThan(1);
    // THEN: Content 컴포넌트가 radioList 길이만큼 렌더링(호출)되었는지 확인
    expect(hoisted.MockHeadlessRadioButtonContent).toHaveBeenCalledTimes(
      radioList.length,
    );
    // THEN: disabled=false 상태가 Styled Content Mock에 전달되었는지 확인
    expect(hoisted.MockStyledContent).toHaveBeenCalledWith(false);

    // THEN: Content 컴포넌트가 각 항목에 대해 올바른 prop을 받았는지 확인 (첫 번째 항목 기준)
    const contentProps =
      hoisted.MockHeadlessRadioButtonContent.mock.calls[0][0];

    expect(contentProps.radio).toEqual(radioList[0]);
    expect(contentProps.radioState).toBe("OptionA");
    expect(contentProps.disabled).toBe(false);
    expect(contentProps.handleRadioButtonClick).toBe(mockClickHandler);
  });

  test("disabled가 false일 때, 라디오 버튼 클릭 시 handleRadioButtonClick이 호출", async () => {
    const user = userEvent.setup();
    // GIVEN: handleRadioButtonClick Mock 함수 설정 (key를 받고 내부 함수를 반환하는 구조)
    const mockInnerHandler = vi.fn();
    const mockClickHandler = vi.fn(() => mockInnerHandler);

    // WHEN: 컴포넌트 렌더링
    const { getByTestId } = renderComponent({
      ui: (
        <RadioButton
          className="custom-class"
          disabled={false}
          radioList={radioList}
          radioState="OptionA"
          handleRadioButtonClick={mockClickHandler}
        />
      ),
    });

    // WHEN: 두 번째 옵션 클릭 실행 (Mock Content의 onClick 로직을 통해 핸들러 호출 시뮬레이션)
    const optionBContent = getByTestId("radio-content-OptionB");

    await user.click(optionBContent);

    const expectedKey = "OptionB";

    // THEN: 외부 핸들러(mockClickHandler)가 한 번 호출되었는지 확인
    expect(mockClickHandler).toHaveBeenCalledOnce();
    // THEN: 외부 핸들러가 클릭된 라디오의 key("OptionB")를 인수로 받았는지 확인
    expect(mockClickHandler).toHaveBeenCalledWith(expectedKey);
    // THEN: 내부 핸들러(mockInnerHandler)가 실행되었는지 확인
    expect(mockInnerHandler).toHaveBeenCalledOnce();
  });

  test("disabled가 true일 때, handleRadioButtonClick이 undefined이고 클릭 시 이벤트가 발생하지 않아야 함", async () => {
    const user = userEvent.setup();

    // WHEN: disabled=true 상태로 컴포넌트 렌더링 (handleRadioButtonClick prop을 명시 안 함)
    const { getByTestId } = renderComponent({
      ui: <RadioButton disabled radioList={radioList} radioState="OptionA" />,
    });

    // THEN: disabled=true 상태가 Styled Content Mock에 전달되었는지 확인
    expect(hoisted.MockStyledContent).toHaveBeenCalledWith(true);

    // THEN: Content Mock에 disabled=true prop이 전달되었는지 확인 (첫 번째 항목 기준)
    const contentProps =
      hoisted.MockHeadlessRadioButtonContent.mock.calls[0][0];

    // DESC: Content Mock에서 handleRadioButtonClick이 undefined이면 클릭 로직이 실행되지 않음
    expect(contentProps.disabled).toBe(true);

    // WHEN: 두 번째 옵션 클릭 실행 (HeadlessRadioButtonContent Mock 클릭)
    const optionBContent = getByTestId("radio-content-OptionB");

    await user.click(optionBContent); // DESC: Mock Content의 onClick 로직은 disabled=true일 때 핸들러가 undefined여서 아무것도 호출 안 함

    // THEN: Mock Content가 disabled 속성을 받았는지 확인 (시각적/구조적 검증)
    expect(optionBContent).toHaveAttribute("data-disabled", "true");
  });
});
