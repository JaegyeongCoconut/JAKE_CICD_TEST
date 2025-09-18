import React from "react";

import type { jsx } from "@emotion/react";

import { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import type { QueryFilterControlUnion } from "@repo/types";

import * as S from "./QueryFilterField.styled";
import QueryFilterFieldControl from "./containers/control/QueryFilterFieldControl";
import QueryFilterFieldCalendar from "./containers/control/containers/calendar/QueryFilterFieldCalendar";
import QueryFilterFieldCheckbox from "./containers/control/containers/checkbox/QueryFilterFieldCheckbox";
import QueryFilterFieldDropdown from "./containers/control/containers/dropdown/QueryFilterFieldDropdown";
import QueryFilterFieldInput from "./containers/control/containers/input/QueryFilterFieldInput";
import QueryFilterFieldRadio from "./containers/control/containers/radio/QueryFilterFieldRadio";
import QueryFilterFieldName from "./containers/name/QueryFilterFieldName";
import { QueryFilterFieldStateContext } from "./context/QueryFilterFieldStateContext";
import useQueryFilterFieldState from "./hooks/useQueryFilterFieldState";

interface QueryFilterFieldProps<T extends string> {
  className?: string;
  disabled: boolean;
  controls: QueryFilterControlUnion<T>;
  labelWidth?: number; // TODO: 임시 Optional 처리 추후 필수값으로 변경 필요
}

const QueryFilterField = <T extends string>({
  className,
  controls,
  disabled,
  labelWidth,
}: QueryFilterFieldProps<T>) => {
  const {
    hasError,
    isFocused,
    handleErrorClear,
    handleBlur,
    handleFocus,
    onSetError,
  } = useQueryFilterFieldState();

  const renderer: {
    [K in QueryFilterControlUnion["type"]]: (
      props: Extract<QueryFilterControlUnion, { type: K }>,
    ) => jsx.JSX.Element;
  } = {
    [QUERY_FILTER_TYPE.CALENDAR]: ({ type, queryKey, calendarType }) => (
      <QueryFilterFieldCalendar
        disabled={disabled}
        calendarType={calendarType}
        queryKey={queryKey}
        type={type}
      />
    ),
    [QUERY_FILTER_TYPE.CHECKBOX]: ({ type, queryKey, selections }) => (
      <QueryFilterFieldCheckbox
        queryKey={queryKey}
        selections={selections}
        type={type}
      />
    ),
    [QUERY_FILTER_TYPE.DROPDOWN]: ({ type, queryKey, selections }) => (
      <QueryFilterFieldDropdown
        disabled={disabled}
        queryKey={queryKey}
        selections={selections}
        type={type}
      />
    ),
    [QUERY_FILTER_TYPE.RADIO]: ({ type, queryKey, selections }) => (
      <QueryFilterFieldRadio
        disabled={disabled}
        queryKey={queryKey}
        selections={selections}
        type={type}
      />
    ),
    [QUERY_FILTER_TYPE.INPUT]: ({ type, queryKey }) => (
      <QueryFilterFieldInput
        disabled={disabled}
        queryKey={queryKey}
        type={type}
      />
    ),
    [QUERY_FILTER_TYPE.INPUT_REGEXP]: ({ type, queryKey }) => (
      <QueryFilterFieldInput
        disabled={disabled}
        queryKey={queryKey}
        type={type}
      />
    ),
    [QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH]: ({ type, queryKey }) => (
      <QueryFilterFieldInput
        disabled={disabled}
        queryKey={queryKey}
        type={type}
      />
    ),
  };

  const renderQueryFilterControl = <K extends QueryFilterControlUnion["type"]>(
    type: K,
    options: Extract<QueryFilterControlUnion, { type: K }>,
  ): jsx.JSX.Element => {
    return renderer[type](options);
  };

  return (
    <QueryFilterFieldStateContext.Provider
      value={{
        hasError,
        isFocused,
        handleErrorClear,
        handleBlur,
        handleFocus,
        onSetError,
      }}
    >
      <S.QueryFilterFieldWrapper
        className={className}
        disabled={disabled}
        labelWidth={labelWidth}
      >
        <QueryFilterFieldName
          isMultiSelect={
            controls.type === QUERY_FILTER_TYPE.CHECKBOX &&
            controls.hasAllCheckButton
          }
          isRequired={controls.isRequired ?? false}
          label={controls.label}
          queryKey={controls.queryKey}
        />
        <QueryFilterFieldControl>
          {renderQueryFilterControl(controls.type, controls)}
        </QueryFilterFieldControl>
      </S.QueryFilterFieldWrapper>
    </QueryFilterFieldStateContext.Provider>
  );
};

export default QueryFilterField;
