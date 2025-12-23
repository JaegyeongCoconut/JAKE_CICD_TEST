import type { ComponentProps } from "react";
import React from "react";

import { describe, expect, it, test, vi } from "vitest";

import { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import type { Languages, QueryFilterControlUnion } from "@repo/types";

import QueryFilterField from "@packages/queryFilter/containers/row/containers/field/QueryFilterField";
import type * as StyledType from "@packages/queryFilter/containers/row/containers/field/QueryFilterField.styled";
import type QueryFilterFieldControl from "@packages/queryFilter/containers/row/containers/field/containers/control/QueryFilterFieldControl";
import type QueryFilterFieldName from "@packages/queryFilter/containers/row/containers/field/containers/name/QueryFilterFieldName";

import renderComponent from "@tests/renderComponent";

// DESC: QueryFilterFieldWrapper Mock (className, disabled, labelWidth 확인용)
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/QueryFilterField.styled",
  () => {
    const MockStyledQueryFilterFieldWrapper = (
      props: ComponentProps<typeof StyledType.QueryFilterFieldWrapper>,
    ) => (
      <div
        className={props.className}
        data-disabled={props.disabled}
        data-label-width={props.labelWidth}
      >
        {props.children}
      </div>
    );
    return { QueryFilterFieldWrapper: MockStyledQueryFilterFieldWrapper };
  },
);

// DESC: QueryFilterFieldControl Mock
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/control/QueryFilterFieldControl",
  () => ({
    default: (props: ComponentProps<typeof QueryFilterFieldControl>) => (
      <div data-testid="test-field-control">{props.children}</div>
    ),
  }),
);
// DESC: QueryFilterFieldName Mock
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/name/QueryFilterFieldName",
  () => ({
    default: (props: ComponentProps<typeof QueryFilterFieldName>) => (
      <div
        data-is-multi={props.isMultiSelect}
        data-is-required={props.isRequired}
        data-query-key={props.queryKey}
        data-testid="test-field-name"
      >
        {props.label}
      </div>
    ),
  }),
);

// DESC: Control Components Mock (동적 렌더링 및 props 캡처 로직)
const { mockControlRender, capturedControlProps } = vi.hoisted(() => {
  const capturedControlProps: Record<string, unknown>[] = [];

  const mockControlRender = (componentName: string) => () => ({
    default: (props: Record<string, unknown>) => {
      // GIVEN: 각 Control 컴포넌트에 전달되는 props 캡처
      capturedControlProps.push({ componentName, ...props });

      // GIVEN: 렌더링 결과 (queryKey 및 컴포넌트 타입 식별용 data-testid)
      return (
        <div
          data-query-key={props.queryKey}
          data-testid={`test-control-${componentName}`}
        />
      );
    },
  });

  return { mockControlRender, capturedControlProps };
});
// DESC: 각 Control 컴포넌트를 mockControlRender로 Mocking
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/control/containers/calendar/QueryFilterFieldCalendar",
  mockControlRender("calendar"),
);
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/control/containers/checkbox/QueryFilterFieldCheckbox",
  mockControlRender("checkbox"),
);
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/control/containers/dropdown/QueryFilterFieldDropdown",
  mockControlRender("dropdown"),
);
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/control/containers/radio/QueryFilterFieldRadio",
  mockControlRender("radio"),
);
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/containers/control/containers/input/QueryFilterFieldInput",
  mockControlRender("input"),
);
// DESC: useQueryFilterFieldState Hook Mock
vi.mock(
  "@packages/queryFilter/containers/row/containers/field/hooks/useQueryFilterFieldState",
  () => ({
    default: () => ({
      hasError: false,
      isFocused: false,
      handleErrorClear: () => {},
      handleBlur: () => {},
      handleFocus: () => {},
      onSetError: () => {},
    }),
  }),
);

const selections = [{ key: "key1", label: "Label1" as Languages }];
// DESC: 동적 렌더링 테스트를 위한 컨트롤 타입 및 예상 컴포넌트 목록
type MockControlsType = {
  component: string;
  props: Partial<QueryFilterControlUnion>;
  type: QueryFilterControlUnion["type"];
};
const mockControls: MockControlsType[] = [
  {
    type: QUERY_FILTER_TYPE.CALENDAR,
    component: "calendar",
    props: { calendarType: "free" },
  },
  {
    type: QUERY_FILTER_TYPE.CHECKBOX,
    component: "checkbox",
    props: { selections, hasAllCheckButton: true },
  },
  {
    type: QUERY_FILTER_TYPE.DROPDOWN,
    component: "dropdown",
    props: { selections },
  },
  {
    type: QUERY_FILTER_TYPE.RADIO,
    component: "radio",
    props: { selections },
  },
  { type: QUERY_FILTER_TYPE.INPUT, component: "input", props: {} },
  { type: QUERY_FILTER_TYPE.INPUT_REGEXP, component: "input", props: {} },
  {
    type: QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH,
    component: "input",
    props: {},
  },
];

describe("QueryFilterField Test", () => {
  test(`QueryFilterField 렌더 시, 
        wrapper에 className, disabled, labelWidth 정보와
        FieldName에는 isMultiselect, isRequried, label, queryKey의 정보가 전달되고
        FieldControl가 렌더됨`, () => {
    // GIVEN: INPUT 타입의 컨트롤 설정
    const controls = {
      type: QUERY_FILTER_TYPE.INPUT,
      queryKey: "code",
      label: "Code" as Languages,
      maxLength: 10,
      placeholder: "입력",
    };

    // WHEN: QueryFilterField 렌더링 (className, disabled, labelWidth 지정)
    const { container } = renderComponent({
      ui: (
        <QueryFilterField
          className="test-class"
          disabled={false}
          controls={controls}
          labelWidth={120}
        />
      ),
    });

    expect(container.children).toHaveLength(1);

    const wrapper = container.children[0];

    // THEN: 1. Wrapper에 props가 올바르게 전달되었는지 확인
    expect(wrapper).toHaveClass("test-class");
    expect(wrapper).toHaveAttribute("data-disabled", "false");
    expect(wrapper).toHaveAttribute("data-label-width", "120");

    expect(wrapper.children).toHaveLength(2); // DESC: FieldName과 FieldControl

    const fieldName = wrapper.children[0];

    // THEN: 2. FieldName에 props가 올바르게 전달되었는지 확인
    // DESC: INPUT 타입이므로 Multi/Required는 false
    expect(fieldName).toHaveAttribute("data-is-multi", "false");
    expect(fieldName).toHaveAttribute("data-is-required", "false");
    expect(fieldName).toHaveAttribute("data-query-key", controls.queryKey);
    expect(fieldName).toHaveTextContent(controls.label);

    const fieldControl = wrapper.children[1];

    // THEN: 3. FieldControl이 렌더링되었는지 확인
    expect(fieldControl).toBeInTheDocument();
  });

  it.each(mockControls)(
    "$type 타입일 때 알맞은 Control 컴포넌트가 렌더되고 queryKey가 전달됨",
    ({ type, component, props }) => {
      // GIVEN: 테스트 케이스별 컨트롤 설정
      const controls = {
        type,
        queryKey: "queryKey",
        label: "Label" as Languages,
        ...props,
      } as QueryFilterControlUnion;

      // WHEN: QueryFilterField 렌더링
      const { container } = renderComponent({
        ui: <QueryFilterField disabled controls={controls} labelWidth={100} />,
      });

      const wrapper = container.children[0];

      // THEN: 1. Wrapper의 disabled 상태 확인
      expect(wrapper).toHaveAttribute("data-disabled", "true");

      const fieldName = wrapper.children[0];

      // THEN: 2. FieldName의 isMultiSelect 상태 확인 (CHECKBOX만 true)
      if (type === QUERY_FILTER_TYPE.CHECKBOX) {
        expect(fieldName).toHaveAttribute("data-is-multi", "true");
      } else {
        expect(fieldName).toHaveAttribute("data-is-multi", "false");
      }

      // THEN: 3. FieldName의 isRequired 상태 확인 (기본값 false)
      expect(fieldName).toHaveAttribute(
        "data-is-required",
        `${controls.isRequired ?? false}`,
      );

      const fieldControl = wrapper.children[1];

      expect(fieldControl.children).toHaveLength(1); // DESC: Control 컴포넌트가 FieldControl 내부에 렌더됨

      const renderer = fieldControl.children[0];

      // THEN: 4. 렌더링된 Control 컴포넌트에 queryKey가 전달되었는지 확인
      expect(renderer).toHaveAttribute("data-query-key", "queryKey");

      const lastCaptured = capturedControlProps.at(-1);

      // THEN: 5. 캡처된 props를 통해 올바른 Control 컴포넌트가 렌더링되었는지 확인
      expect(lastCaptured?.componentName).toBe(component);
      expect(lastCaptured?.type).toBe(type);

      // THEN: 6. 타입별 고유 props가 올바르게 전달되었는지 확인
      if (type === QUERY_FILTER_TYPE.CALENDAR) {
        const calendarControls = controls as Extract<
          QueryFilterControlUnion,
          { type: typeof QUERY_FILTER_TYPE.CALENDAR }
        >;
        expect(lastCaptured?.calendarType).toBe(calendarControls.calendarType);
      }
      if (
        type === QUERY_FILTER_TYPE.CHECKBOX ||
        type === QUERY_FILTER_TYPE.DROPDOWN ||
        type === QUERY_FILTER_TYPE.RADIO
      ) {
        const selectableControls = controls as Extract<
          QueryFilterControlUnion,
          | { type: typeof QUERY_FILTER_TYPE.CHECKBOX }
          | { type: typeof QUERY_FILTER_TYPE.DROPDOWN }
          | { type: typeof QUERY_FILTER_TYPE.RADIO }
        >;
        expect(lastCaptured?.selections).toEqual(selectableControls.selections);
      }

      // THEN: 7. 다른 Control 컴포넌트는 렌더링되지 않았는지 확인 (오류 방지)
      mockControls
        .filter((item) => item.component !== component)
        .forEach((item) => {
          expect(
            wrapper.querySelector(
              `[data-testid="test-control-${item.component}"]`,
            ),
          ).toBeNull();
        });
    },
  );
});
