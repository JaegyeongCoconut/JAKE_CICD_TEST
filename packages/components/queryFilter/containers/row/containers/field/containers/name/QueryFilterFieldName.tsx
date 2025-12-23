import React, { useContext } from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./QueryFilterFieldName.styled";
import QueryFilterFieldNameCheckbox from "./containers/QueryFilterFieldNameCheckbox";
import { QueryFilterFieldStateContext } from "../../context/QueryFilterFieldStateContext";

interface QueryFilterFieldNameProps<T extends string> {
  isMultiSelect: boolean;
  isRequired: boolean;
  label: Languages;
  queryKey: T;
}

const QueryFilterFieldName = <T extends string>({
  queryKey,
  label,
  isRequired,
  isMultiSelect,
}: QueryFilterFieldNameProps<T>) => {
  const { defaultLanguage } = useDefaultLanguage();

  const { isFocused, hasError } = useContext(QueryFilterFieldStateContext);

  return (
    <S.QueryFilterFeildName
      hasCheckbox={isMultiSelect}
      hasError={hasError}
      isFocused={isFocused}
    >
      <span>{defaultLanguage({ text: label })}</span>
      {isRequired && <S.Required>*</S.Required>}
      {isMultiSelect && <QueryFilterFieldNameCheckbox queryKey={queryKey} />}
    </S.QueryFilterFeildName>
  );
};

export default QueryFilterFieldName;
