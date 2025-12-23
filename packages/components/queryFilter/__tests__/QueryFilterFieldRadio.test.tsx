import type { ComponentProps } from "react";
import React from "react";

import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import type { Languages } from "@repo/types";

import QueryFilterFieldRadio from "@packages/queryFilter/containers/row/containers/field/containers/control/containers/radio/QueryFilterFieldRadio";
import type * as StyledType from "@packages/queryFilter/containers/row/containers/field/containers/control/containers/radio/QueryFilterFieldRadio.styled";

import renderComponent from "@tests/renderComponent";
import { mockDefaultLanguage } from "@tests/setup";

// DESC: useTypedQueryFilterState Hook Mock (필터 상태 조회)
const mockUseTypedQueryFilterState = vi.fn();
vi.mock("@repo/hooks/queryFilter/useTypedQueryFilterState", () => ({
  default: (args: unknown) => mockUseTypedQueryFilterState(args),
}));
// DESC: Styled Components Mock
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/control/containers/radio/QueryFilterFieldRadio.styled",
  () => {
    // GIVEN: Wrapper Mock
    const MockStyledQueryFilterFieldRadioWrapper = (
      props: ComponentProps<typeof StyledType.QueryFilterFieldRadioWrapper>,
    ) => <div data-testid="wrapper">{props.children}</div>;
    // GIVEN: Radio Button Item Mock (radioKey 확인용)
    const MockStyledQueryFilterFieldRadioButton = (
      props: ComponentProps<typeof StyledType.QueryFilterFieldRadioButton>,
    ) => (
      <div data-radio-key={props.radioKey} data-testid="radio-item">
        {props.children}
      </div>
    );

    return {
      QueryFilterFieldRadioWrapper: MockStyledQueryFilterFieldRadioWrapper,
      QueryFilterFieldRadioButton: MockStyledQueryFilterFieldRadioButton,
    };
  },
);
// DESC: useQueryFilterFieldRadio Hook Mock (클릭 핸들러 생성)
const mockHandleRadioInner = vi.fn();
const mockHandleRadioButtonClick = vi.fn(() => mockHandleRadioInner);
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/control/containers/radio/hooks/useQueryFilterFieldRadio",
  () => ({
    default: () => ({ handleRadioButtonClick: mockHandleRadioButtonClick }),
  }),
);

describe("QueryFilterFieldRadio Test", () => {
  const user = userEvent.setup();
  // GIVEN: 라디오 옵션 목록
  const selections = [
    { key: "a", label: "Alpha" as Languages },
    { key: "b", label: "Beta" as Languages },
  ] as const;

  // GIVEN: 기본 라디오 필터 상태
  const baseFilter = {
    type: QUERY_FILTER_TYPE.RADIO,
    queryKey: "status" as const,
    label: "Status" as Languages,
    placeholder: "선택" as Languages,
    selections,
    tagValue: "a", // DESC: 초기 선택 값: Alpha
  };

  test("queryFilter가 undefined이면 Wrapper만 렌더되고 옵션은 렌더되지 않음", () => {
    // GIVEN: useTypedQueryFilterState가 필터 정보(undefined)를 반환
    mockUseTypedQueryFilterState.mockReturnValue(undefined);

    // WHEN: 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: (
        <QueryFilterFieldRadio
          disabled={false}
          queryKey={baseFilter.queryKey}
          selections={selections}
          type={QUERY_FILTER_TYPE.RADIO}
        />
      ),
    });

    expect(container.children).toHaveLength(1);

    const wrapper = container.children[0];

    // THEN: Wrapper는 존재하지만 자식 요소(라디오 옵션)는 렌더링되지 않음
    expect(wrapper.children).toHaveLength(0);
  });

  test("초기 렌더 시 Wrapper와 Radio 옵션들이 올바르게 렌더되고 props가 전달됨", () => {
    // GIVEN: 기본 필터 상태 반환
    mockUseTypedQueryFilterState.mockReturnValue(baseFilter);

    // WHEN: 컴포넌트 렌더링
    const { container, getAllByTestId } = renderComponent({
      ui: (
        <QueryFilterFieldRadio
          disabled={false}
          queryKey={baseFilter.queryKey}
          selections={selections}
          type={QUERY_FILTER_TYPE.RADIO}
        />
      ),
    });

    expect(container.children).toHaveLength(1);

    const wrapper = container.children[0];

    // THEN: 1. Wrapper의 자식(옵션) 개수가 selections 길이와 일치
    expect(wrapper.children).toHaveLength(selections.length);

    const items = getAllByTestId("radio-item");

    expect(items).toHaveLength(selections.length);

    const inputs = wrapper.querySelectorAll("input");

    // THEN: 2. Input (radio 타입) 개수가 selections 길이와 일치
    expect(inputs).toHaveLength(selections.length);
    // THEN: 3. Input의 속성 (name, type) 및 초기 체크 상태 확인
    expect(inputs[0]).toHaveAttribute("name", baseFilter.queryKey); // DESC: queryKey가 name으로 사용됨
    expect(inputs[0]).toHaveAttribute("type", "radio");
    expect(inputs[0]).toBeChecked(); // DESC: tagValue: "a" 이므로 첫 번째 항목이 체크됨
    expect(inputs[1]).not.toBeChecked(); // DESC: tagValue: "a" 이므로 두 번째 항목은 체크되지 않음

    const labels = wrapper.querySelectorAll("label");

    expect(labels).toHaveLength(selections.length);
    // THEN: 4. 라벨 텍스트 확인
    expect(labels[0].textContent).toBe("Alpha");
    expect(labels[1].textContent).toBe("Beta");
    // THEN: 5. 라벨에 대한 언어 처리 훅 호출 확인
    expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: "Alpha" });
    expect(mockDefaultLanguage).toHaveBeenCalledWith({ text: "Beta" });
    // THEN: 6. input의 id와 label의 for가 같은지 검증
    expect(inputs[0].id).toBe(labels[0].getAttribute("for"));
    expect(inputs[1].id).toBe(labels[1].getAttribute("for"));
  });

  test("라디오 클릭 시 handleRadioButtonClick이 key와 함께 호출되고 반환 핸들러도 실행됨", async () => {
    // GIVEN: 기본 필터 상태 및 핸들러 Mock 설정
    mockUseTypedQueryFilterState.mockReturnValue(baseFilter);

    // WHEN: 컴포넌트 렌더링
    const { container } = renderComponent({
      ui: (
        <QueryFilterFieldRadio
          disabled={false}
          queryKey={baseFilter.queryKey}
          selections={selections}
          type={QUERY_FILTER_TYPE.RADIO}
        />
      ),
    });

    const wrapper = container.children[0];
    // WHEN: 두 번째 라디오 버튼 (key: "b") 클릭
    const secondInput = wrapper.querySelectorAll("input")[1];

    await user.click(secondInput);

    // THEN: 1. handleRadioButtonClick 훅이 클릭된 항목의 key와 함께 호출되었는지 확인
    expect(mockHandleRadioButtonClick).toHaveBeenCalledWith("b");
    // THEN: 2. useQueryFilterFieldRadio 훅에서 반환된 내부 핸들러가 실행되었는지 확인 (실제 상태 변경 로직 실행 확인)
    expect(mockHandleRadioInner).toHaveBeenCalledOnce();
  });
});
