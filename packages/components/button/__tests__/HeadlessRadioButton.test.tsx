import React from "react";

import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import type { Languages } from "@repo/types";

import HeadlessRadioButton from "@packages/button/radio/HeadlessRadioButton";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

const FIXED_UUID = "fixed-uuid";
// DESC: React의 useId 훅을 Mocking하여 항상 고정된 값을 반환하도록 설정
vi.mock("react", async () => {
  const actual = await vi.importActual("react");

  // DESC: 모든 useId 호출에 대해 "fixed-uuid" 반환. 이를 통해 name 속성 등을 예측 가능하게 만듬.
  return { ...actual, useId: () => FIXED_UUID };
});

describe("HeadlessRadioButton Test", () => {
  test("HeadlessRadioButton 렌더 시, radioList가 빈 배열이면 li 요소를 렌더링하지 않음", () => {
    // GIVEN: radioList가 빈 배열인 상태
    // WHEN: 컴포넌트 렌더링
    const { container, queryAllByRole } = renderComponent({
      ui: (
        <HeadlessRadioButton
          radioList={[]}
          renderRadioButtonItem={() => <label />}
        />
      ),
    });

    const listItems = queryAllByRole("listitem");

    // THEN: li 요소의 부모가 ul 태그인지 검증 (접근성 및 구조 검증)
    expect(container.querySelector("ul")).toBeInTheDocument();
    // THEN: 렌더링된 li(listitem) 요소의 개수가 0인지 검증
    expect(listItems).toHaveLength(0);
  });

  test("HeadlessRadiButton 렌더 시, radioList가 전달되면 radioList의 길이만큼 li 요소가 렌더됨", () => {
    // GIVEN: 3개의 요소가 포함된 radioList 배열
    const radios = [
      { key: "at", label: "AT" as Languages },
      { key: "mt", label: "MT" as Languages },
      { key: "cvt", label: "CVT" as Languages },
    ] as const;

    // WHEN: 컴포넌트 렌더링
    const { getAllByRole } = renderComponent({
      ui: (
        <HeadlessRadioButton
          radioList={radios}
          renderRadioButtonItem={() => <label />}
        />
      ),
    });

    const listItems = getAllByRole("listitem");

    // THEN: li 요소의 부모가 ul 태그인지 검증 (접근성 및 구조 검증)
    expect(listItems[0].parentElement?.tagName).toBe("UL");
    // THEN: li 요소의 개수가 radioList의 길이와 일치하는지 검증
    expect(listItems).toHaveLength(radios.length);
  });

  test(`HeadlessRadiButton 렌더 시, 
        radioList가 전달되면 radioList의 길이만큼 li 요소가 렌더되고 renderRadioButtonItem에 radio 타입이 전달됨`, () => {
    // GIVEN: 3개의 요소가 포함된 radioList 배열과 Mock render 함수
    const radios = [
      { key: "at", label: "AT" as Languages },
      { key: "mt", label: "MT" as Languages },
      { key: "cvt", label: "CVT" as Languages },
    ] as const;
    const mockRenderRadioButtonItem = vi.fn();

    // WHEN: 컴포넌트 렌더링
    const { getAllByRole } = renderComponent({
      ui: (
        <HeadlessRadioButton
          radioList={radios}
          renderRadioButtonItem={mockRenderRadioButtonItem}
        />
      ),
    });

    const listItems = getAllByRole("listitem");

    // THEN: 기본 구조 및 길이 검증
    expect(listItems[0].parentElement?.tagName).toBe("UL");
    expect(listItems).toHaveLength(radios.length);

    // THEN: renderRadioButtonItem이 radioList 길이만큼 호출되었는지 검증
    expect(mockRenderRadioButtonItem).toHaveBeenCalledTimes(radios.length);
    // THEN: renderRadioButtonItem이 radioList의 각 항목을 올바른 인자로 받았는지 검증
    radios.forEach((radio) =>
      expect(mockRenderRadioButtonItem).toHaveBeenCalledWith(radio),
    );
  });

  test("HeadlessRadiButton 렌더 시, className이 전달되면 ul 태그에 className이 지정됨", () => {
    // GIVEN: className prop 설정
    const radios = [
      { key: "at", label: "AT" as Languages },
      { key: "mt", label: "MT" as Languages },
      { key: "cvt", label: "CVT" as Languages },
    ] as const;

    // WHEN: className prop을 포함하여 컴포넌트 렌더링
    const { getAllByRole } = renderComponent({
      ui: (
        <HeadlessRadioButton
          className="test-class"
          radioList={radios}
          renderRadioButtonItem={() => <label />}
        />
      ),
    });

    const listItems = getAllByRole("listitem");
    // DESC: ul 태그를 찾음
    const parent = listItems[0].parentElement;

    // THEN: 부모가 ul 태그인지 확인
    expect(parent?.tagName).toBe("UL");
    // THEN: ul 태그에 className이 올바르게 적용되었는지 검증
    expect(parent).toHaveClass("test-class");
  });

  test("HeadlessRadioButton.Content 렌더 시, useId, useDefaultLanguage 훅이 올바르게 통합되어 렌더됨", () => {
    // GIVEN: 하나의 라디오 버튼 항목 설정
    const radioKey = "mt";
    const radioKeyWithUuid = `${radioKey}${FIXED_UUID}`;
    const radio = {
      key: radioKey,
      label: "MT" as Languages,
      Icon: () => <svg data-testid="test-icon" />, // DESC: Icon 존재
    };

    // WHEN: Content 컴포넌트 렌더링
    const { container, getByRole, getByText } = renderComponent({
      ui: (
        <HeadlessRadioButton.Content
          disabled={false}
          radio={radio}
          radioState={null}
          handleRadioButtonClick={vi.fn()}
        />
      ),
    });

    const radioInput = getByRole("radio", { name: "MT" });
    const labelWrapper = radioInput.parentElement;
    const childrens = Array.from(labelWrapper!.children);
    const innerLabel = container.querySelector(
      `label[for=${radioKeyWithUuid}]`,
    );

    // THEN: 최상위 컨테이너의 자식 노드 순서 검증
    expect(childrens[0].tagName).toBe("INPUT");
    expect(childrens[1].tagName).toBe("LABEL");
    expect(childrens[2].tagName).toBe("svg");
    expect(childrens[3].tagName).toBe("SPAN");

    // THEN: input의 ID가 radio.key와 Mock useId 값이 합쳐져 설정되었는지 검증 (접근성)
    expect(radioInput).toHaveAttribute("id", radioKeyWithUuid);
    // THEN: input의 name 속성이 Mock useId 값으로 설정되었는지 검증 (라디오 그룹)
    expect(radioInput).toHaveAttribute("name", FIXED_UUID);
    // THEN: label의 for 속성이 input의 id와 일치하는지 검증
    expect(innerLabel).toHaveAttribute("for", radioKeyWithUuid);
    // THEN: Label 텍스트가 렌더링되었는지 검증
    expect(getByText(radio.label)).toBeInTheDocument();
    // THEN: Label 텍스트에 대해 defaultLanguage 훅이 호출되었는지 검증
    expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: radio.label });
  });

  test("HeadlessRadioButton.Content 렌더 시, radio 내 icon이 있다면 icon과 span 둘다 렌더됨", () => {
    // GIVEN: Icon을 포함하는 라디오 버튼 항목 설정
    const radioKey = "mt";
    const radio = {
      key: radioKey,
      label: "MT" as Languages,
      Icon: () => <svg data-testid="test-icon" />, // DESC: Icon 존재
    };
    const mockHandleClick = vi.fn();

    // WHEN: Content 컴포넌트 렌더링
    const { getByText, getByTestId } = renderComponent({
      ui: (
        <HeadlessRadioButton.Content
          disabled={false}
          radio={radio}
          radioState={radioKey}
          handleRadioButtonClick={mockHandleClick}
        />
      ),
    });

    // THEN: Label 텍스트가 렌더링되었는지 검증
    expect(getByText(radio.label)).toBeInTheDocument();
    // THEN: Icon이 렌더링되었는지 검증
    expect(getByTestId("test-icon")).toBeInTheDocument();
  });

  test("HeadlessRadioButton.Content 렌더 시, radioState와 radio.key가 일치하면 checked 됨", () => {
    // GIVEN: radioState = radio.key ("mt")
    const radioKey = "mt";
    const radio = { key: radioKey, label: "MT" as Languages };
    const radioState = radioKey;
    const mockHandleClick = vi.fn();

    // WHEN: Content 컴포넌트 렌더링
    const { getByRole } = renderComponent({
      ui: (
        <HeadlessRadioButton.Content
          disabled={false}
          radio={radio}
          radioState={radioState}
          handleRadioButtonClick={mockHandleClick}
        />
      ),
    });

    const radioInput = getByRole("radio", { name: "MT" });

    // THEN: 라디오 input이 checked 상태인지 검증
    expect(radioInput).toBeChecked();
  });

  test("HeadlessRadioButton.Content 렌더 시, radioState와 radio.key가 일치하지 않으면 checked가 해제됨", () => {
    // GIVEN: 초기 상태 radioState = radio.key ("mt")
    const radioKey = "mt";
    const anotherRadioKey = "cvt";
    const radio = { key: radioKey, label: "MT" as Languages };
    const mockHandleClick = vi.fn();

    const { getByRole, rerender } = renderComponent({
      ui: (
        <HeadlessRadioButton.Content
          disabled={false}
          radio={radio}
          radioState={radioKey}
          handleRadioButtonClick={mockHandleClick}
        />
      ),
    });

    const radioInput = getByRole("radio", { name: "MT" });

    // THEN: 초기 상태: checked 상태인지 검증
    expect(radioInput).toBeChecked();

    // WHEN: radioState를 다른 값("cvt")으로 변경하여 다시 렌더링 (prop 변경)
    rerender(
      <HeadlessRadioButton.Content
        disabled={false}
        radio={radio}
        radioState={anotherRadioKey}
        handleRadioButtonClick={mockHandleClick}
      />,
    );

    // THEN: 라디오 input이 checked 상태가 해제되었는지 검증
    expect(radioInput).not.toBeChecked();
  });

  test("HeadlessRadioButton.Content 렌더 시, radio가 클릭되면 radio.key가 handleRadioButtonClick에 전달되어야 함", async () => {
    // GIVEN: userEvent 설정 및 Mock 핸들러 설정 (handleRadioButtonClick이 함수를 반환하는 구조)
    const user = userEvent.setup();
    const radioKey = "mt";
    const radio = { key: radioKey, label: "MT" as Languages };
    const mockInnerFunction = vi.fn();
    const mockHandleClick = vi.fn(() => mockInnerFunction);

    const { getByRole } = renderComponent({
      ui: (
        <HeadlessRadioButton.Content
          disabled={false}
          radio={radio}
          radioState={null}
          handleRadioButtonClick={mockHandleClick}
        />
      ),
    });

    const radioInput = getByRole("radio", { name: "MT" });

    // WHEN: 라디오 input 클릭
    await user.click(radioInput);

    // THEN: handleRadioButtonClick이 클릭된 라디오의 key를 인수로 받았는지 검증
    expect(mockHandleClick).toHaveBeenCalledWith(radio.key);
    // THEN: 반환된 내부 함수(클릭 이벤트 핸들러)가 한 번 호출되었는지 검증
    expect(mockInnerFunction).toHaveBeenCalledOnce();
  });

  test("HeadlessRadioButton.Content 렌더 시, disabled prop이 true면 input이 비활성화되고 클릭 이벤트가 발생하지 않음", async () => {
    // GIVEN: userEvent 설정, disabled=true 설정 및 Mock 핸들러 설정
    const user = userEvent.setup();
    const radioKey = "mt";
    const radio = { key: radioKey, label: "MT" as Languages };
    const mockInnerFunction = vi.fn();
    const mockHandleClick = vi.fn(() => mockInnerFunction);

    const { getByRole } = renderComponent({
      ui: (
        <HeadlessRadioButton.Content
          disabled // DESC: disabled=true
          radio={radio}
          radioState={radioKey}
          handleRadioButtonClick={mockHandleClick}
        />
      ),
    });

    const radioInput = getByRole("radio", { name: "MT" });

    // THEN: input이 disabled 속성을 가졌는지 검증
    expect(radioInput).toBeDisabled();

    // WHEN: 비활성화된 라디오 input 클릭 시도
    await user.click(radioInput);

    // THEN: 클릭 핸들러가 호출되지 않았는지 검증
    expect(mockHandleClick).not.toHaveBeenCalled();
    expect(mockInnerFunction).not.toHaveBeenCalled();
  });
});
