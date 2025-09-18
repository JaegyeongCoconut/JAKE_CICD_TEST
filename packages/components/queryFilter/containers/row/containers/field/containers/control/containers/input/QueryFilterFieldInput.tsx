import React from "react";

import type { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useTypedQueryFilterState from "@repo/hooks/queryFilter/useTypedQueryFilterState";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";

import * as S from "./QueryFilterFieldInput.styled";
import useQueryFilterFieldInput from "./hooks/useQueryFilterFieldInput";
import Input from "../../../../../../../../../input/Input";

interface QueryFilterFieldInputProps<T extends string> {
  disabled: boolean;
  queryKey: T;
  type:
    | typeof QUERY_FILTER_TYPE.INPUT
    | typeof QUERY_FILTER_TYPE.INPUT_REGEXP
    | typeof QUERY_FILTER_TYPE.INPUT_REGEXP_FULL_LENGTH;
}

const QueryFilterFieldInput = <T extends string>({
  type,
  queryKey,
  disabled,
}: QueryFilterFieldInputProps<T>) => {
  const filter = useTypedQueryFilterState({ type, queryKey });

  const {
    localInputValue,
    isVisible,
    handleInputFocus,
    handleInputBlur,
    handleInputChange,
    handleInputSearch,
    handleApplyButtonMouseDown,
  } = useQueryFilterFieldInput({ filter });

  const { defaultLanguage } = useDefaultLanguage();

  if (!filter) return null;

  return (
    <S.QueryFilterFieldInputWrapper onSubmit={handleInputSearch(queryKey)}>
      <Input
        css={S.input}
        disabled={disabled}
        hasError={false}
        value={localInputValue}
        maxLength={filter?.maxLength}
        placeholder={filter.placeholder}
        handleBlur={handleInputBlur}
        handleChange={handleInputChange}
        handleFocus={handleInputFocus}
      />
      {isVisible && (
        <S.QueryFilterFieldInputApplyButton
          onMouseDown={handleApplyButtonMouseDown(queryKey)}
        >
          {defaultLanguage(LANGUAGE_LABEL.APPLY)}
        </S.QueryFilterFieldInputApplyButton>
      )}
    </S.QueryFilterFieldInputWrapper>
  );
};

export default QueryFilterFieldInput;
