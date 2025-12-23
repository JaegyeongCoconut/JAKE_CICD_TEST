import type { ComponentProps } from "react";
import React from "react";

import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi, beforeEach } from "vitest";

import { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import type { Languages } from "@repo/types";

import type Checkbox from "@packages/button/checkbox/Checkbox";
import QueryFilterFieldCheckbox from "@packages/queryFilter/containers/row/containers/field/containers/control/containers/checkbox/QueryFilterFieldCheckbox";
import type * as StyledType from "@packages/queryFilter/containers/row/containers/field/containers/control/containers/checkbox/QueryFilterFieldCheckbox.styled";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

// DESC: useTypedQueryFilterState Hook Mock (필터 상태 조회)
const mockUseTypedQueryFilterState = vi.fn();
vi.mock("@repo/hooks/queryFilter/useTypedQueryFilterState", () => ({
  default: (args: unknown) => mockUseTypedQueryFilterState(args),
}));
// DESC: Styled Component Mock
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/control/containers/checkbox/QueryFilterFieldCheckbox.styled",
  () => {
    // GIVEN: Wrapper Mock (DOM 구조 확인용)
    const MockStyledQueryFilterFieldCheckboxWrapper = (
      props: ComponentProps<typeof StyledType.QueryFilterFieldCheckboxWrapper>,
    ) => <div data-testid="wrapper">{props.children}</div>;

    return {
      QueryFilterFieldCheckboxWrapper:
        MockStyledQueryFilterFieldCheckboxWrapper,
      checkbox: {},
    };
  },
);
// DESC: useQueryFilterFieldCheckbox Hook Mock (클릭 핸들러 생성)
const mockHandleCheckboxInner = vi.fn();
const mockHandleCheckboxClick = vi.fn(() => mockHandleCheckboxInner);
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/control/containers/checkbox/hooks/useQueryFilterFieldCheckbox",
  () => ({ default: () => ({ handleCheckboxClick: mockHandleCheckboxClick }) }),
);
// DESC: Checkbox Mock
const checkboxProps: ComponentProps<typeof Checkbox>[] = [];
vi.mock("@packages/button/checkbox/Checkbox", () => ({
  default: (props: ComponentProps<typeof Checkbox>) => {
    // GIVEN: Checkbox에 전달되는 props 캡처
    checkboxProps.push(props);

    // GIVEN: 사용자 클릭 이벤트를 시뮬레이션할 수 있는 input 요소 렌더링
    return (
      <input
        data-checked={props.isChecked}
        data-testid={`checkbox-${props.label}`}
        type="checkbox"
        onChange={props.handleCheck} // DESC: onChange를 통해 handleCheck 실행
      />
    );
  },
}));

beforeEach(() => {
  // GIVEN: 각 테스트 전 Checkbox props 배열 초기화
  checkboxProps.length = 0;
});

describe("QueryFilterFieldCheckbox Test", () => {
  const user = userEvent.setup();

  const selections = [
    { key: "key1", label: "Label A" as Languages },
    { key: "key2", label: "Label B" as Languages },
  ] as const;

  const baseFilter = {
    type: QUERY_FILTER_TYPE.CHECKBOX,
    queryKey: "status" as const,
    label: "Status" as Languages,
    hasAllCheckButton: false,
    selections,
    tagValue: ["key1"], // DESC: 초기 선택된 값
  };

  test("queryFilter가 undefined이면 null을 반환함", () => {
    // GIVEN: useTypedQueryFilterState가 필터 정보(undefined)를 반환
    mockUseTypedQueryFilterState.mockReturnValue(undefined);

    // WHEN: 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: (
        <QueryFilterFieldCheckbox
          queryKey="status"
          selections={selections}
          type={QUERY_FILTER_TYPE.CHECKBOX}
        />
      ),
    });

    // THEN: 컴포넌트가 null을 반환하여 DOM에 아무것도 렌더링되지 않음
    expect(container.firstChild).toBeNull();
    // THEN: 필터 상태 조회를 위해 훅이 올바른 인자로 호출되었는지 확인
    expect(mockUseTypedQueryFilterState).toHaveBeenCalledWith({
      type: QUERY_FILTER_TYPE.CHECKBOX,
      queryKey: "status",
    });
  });

  test("초기 렌더 시 Wrapper와 Checkbox들이 올바르게 렌더되고 props가 전달됨", () => {
    // GIVEN: 기본 필터 상태 반환
    mockUseTypedQueryFilterState.mockReturnValue(baseFilter);

    // WHEN: 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: (
        <QueryFilterFieldCheckbox
          queryKey={baseFilter.queryKey}
          selections={selections}
          type={QUERY_FILTER_TYPE.CHECKBOX}
        />
      ),
    });

    expect(container.children).toHaveLength(1);

    const wrapper = container.children[0];

    // THEN: 1. Wrapper가 존재하고, Checkbox 개수만큼 자식을 가짐 (2개)
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.children).toHaveLength(selections.length);
    // THEN: 2. Checkbox props가 selections 길이만큼 캡처되었는지 확인
    expect(checkboxProps).toHaveLength(selections.length);

    const [first, second] = checkboxProps;

    // THEN: 3. 첫 번째 Checkbox (tagValue에 포함)의 isChecked 상태 및 props 확인
    expect(first.isChecked).toBe(true); // DESC: tagValue: ["key1"]에 포함
    expect(first.label).toBe(selections[0].label);
    expect(typeof first.handleCheck).toBe("function");
    // THEN: 4. 두 번째 Checkbox (tagValue에 미포함)의 isChecked 상태 확인
    expect(second.isChecked).toBe(false); // DESC: tagValue에 미포함
    expect(second.label).toBe(selections[1].label);
    // THEN: 5. Label 변환 훅이 각 라벨에 대해 호출되었는지 확인 (언어 처리 로직 간접 확인)
    expect(mockDefaultLanguage).toHaveBeenCalledWith({
      text: selections[0].label,
    });
    expect(mockDefaultLanguage).toHaveBeenCalledWith({
      text: selections[1].label,
    });
  });

  test("Checkbox 클릭 시 handleCheckboxClick이 queryKey, key와 함께 호출되고 내부 핸들러도 실행됨", async () => {
    // GIVEN: 기본 필터 상태 및 핸들러 Mock 설정
    mockUseTypedQueryFilterState.mockReturnValue(baseFilter);
    mockHandleCheckboxClick.mockReturnValue(mockHandleCheckboxInner);

    // WHEN: 컴포넌트 렌더링 및 'Label B' 체크박스 클릭
    const { getByTestId } = renderComponent({
      ui: (
        <QueryFilterFieldCheckbox
          queryKey={baseFilter.queryKey}
          selections={selections}
          type={QUERY_FILTER_TYPE.CHECKBOX}
        />
      ),
    });

    const targetCheckbox = getByTestId("checkbox-Label B"); // DESC: key2에 해당하는 체크박스

    await user.click(targetCheckbox);

    // THEN: 1. handleCheckboxClick 훅이 클릭된 항목의 queryKey 및 key와 함께 호출되었는지 확인
    expect(mockHandleCheckboxClick).toHaveBeenCalledWith(
      baseFilter.queryKey,
      "key2", // DESC: 클릭된 'Label B'의 key
    );
    // THEN: 2. useQueryFilterFieldCheckbox 훅에서 반환된 내부 핸들러가 실행되었는지 확인
    expect(mockHandleCheckboxInner).toHaveBeenCalledOnce();
  });
});
