import React from "react";

import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import Checkbox from "@packages/button/checkbox/Checkbox";

import renderComponent from "@tests/renderComponent";

// DESC: React의 useId 훅을 Mocking하여 항상 고정된 값을 반환하도록 설정
vi.mock("react", async () => {
  const actual = await vi.importActual("react");

  // DESC: 모든 useId 호출에 대해 "fixed-uuid" 반환
  return { ...actual, useId: () => "fixed-uuid" };
});

describe("Checkbox Test", () => {
  // DESC: userEvent 설정 (체크박스 클릭 등 비동기 이벤트 처리에 사용)
  const user = userEvent.setup();

  test("Checkbox 렌더링 시 레이블 표기 및 uuid가 input과 label에 연결되었는지 확인", () => {
    // GIVEN: 테스트 레이블과 handleCheck Mock 함수 설정
    const TEST_LABEL = "약관 동의";
    const mockHandleCheck = vi.fn();

    // WHEN: Checkbox 컴포넌트 렌더링
    const { getByText, container } = renderComponent({
      ui: (
        <Checkbox
          disabled={false}
          isChecked={false}
          label={TEST_LABEL}
          handleCheck={mockHandleCheck}
        />
      ),
    });

    // THEN: 렌더링 및 ID 연결 검증, 레이블 텍스트가 표시되는지 확인
    expect(getByText(TEST_LABEL)).toBeInTheDocument();

    // DESC: custom checkbox 역할을 하는 label 엘리먼트를 for 속성으로 찾음
    const customCheckbox = container.querySelector('label[for="fixed-uuid"]');

    // THEN: label 엘리먼트 존재 및 for 속성 검증 (input과 연결 확인)
    expect(customCheckbox).not.toBeNull();
    expect(customCheckbox).toHaveAttribute("for", "fixed-uuid");
  });

  test("label prop이 없을 때, label을 감싸는 span 태그는 렌더링되지 않아야 함", () => {
    // GIVEN: handleCheck Mock 함수 설정 (label prop은 전달하지 않음)
    const mockHandleCheck = vi.fn();

    // WHEN: label prop 없이 Checkbox 렌더링
    const { queryByText } = renderComponent({
      ui: <Checkbox disabled isChecked={false} handleCheck={mockHandleCheck} />,
    });

    // THEN: 렌더링되지 않을 것이라고 예상되는 임의 텍스트 찾기
    const labelSpan = queryByText("약관 동의");

    // THEN: labelSpan이 DOM에 존재하지 않는지 확인
    expect(labelSpan).not.toBeInTheDocument();
  });

  test(`Checkbox의 disabled=true일 때 
        클릭해도 handleCheck가 호출되지 않아야 하며, disabled 속성이 input 태그에 반영되어야 함`, async () => {
    // GIVEN: disabled=true 설정 및 handleCheck Mock 함수 설정
    const mockHandleCheck = vi.fn();

    const { container } = renderComponent({
      ui: (
        <Checkbox
          disabled
          isChecked={false}
          label="동의"
          handleCheck={mockHandleCheck}
        />
      ),
    });

    // WHEN: disabled된 input 엘리먼트를 클릭.
    const checkboxInput = container.querySelector(`#fixed-uuid`);

    await user.click(checkboxInput!);

    // THEN: disabled 속성이 input에 반영되었는지 확인
    expect(checkboxInput).toHaveAttribute("disabled");
    // THEN: disabled 상태이므로 클릭에도 불구하고 콜백 함수는 호출되지 않았는지 확인
    expect(mockHandleCheck).not.toHaveBeenCalled();
  });

  test("isChecked prop이 input의 checked 속성으로 번영되어야 함", () => {
    // GIVEN: isChecked=true 설정
    const mockHandleCheck = vi.fn();

    // WHEN: Checkbox를 isChecked=true로 렌더링
    const { container } = renderComponent({
      ui: (
        <Checkbox
          disabled
          isChecked={true}
          label="동의"
          handleCheck={mockHandleCheck}
        />
      ),
    });

    const checkboxInput = container.querySelector(`#fixed-uuid`);

    // THEN: 렌더링된 input 엘리먼트의 checked 속성 값이 isChecked prop과 일치하는지 확인
    expect(checkboxInput).toHaveProperty("checked", true);
  });
});
