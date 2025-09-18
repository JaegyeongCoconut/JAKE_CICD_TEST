import React from "react";

import type { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import useTypedQueryFilterState from "@repo/hooks/queryFilter/useTypedQueryFilterState";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { QueryFilterSelections } from "@repo/types";

import * as S from "./QueryFilterFieldCheckbox.styled";
import useQueryFilterFieldCheckbox from "./hooks/useQueryFilterFieldCheckbox";
import Checkbox from "../../../../../../../../../button/checkbox/Checkbox";

interface QueryFilterFieldCheckboxProps<T extends string> {
  queryKey: T;
  selections: QueryFilterSelections;
  type: typeof QUERY_FILTER_TYPE.CHECKBOX;
}

const QueryFilterFieldCheckbox = <T extends string>({
  type,
  queryKey,
  selections,
}: QueryFilterFieldCheckboxProps<T>) => {
  const queryFilter = useTypedQueryFilterState({ type, queryKey });
  const { handleCheckboxClick } = useQueryFilterFieldCheckbox({
    queryFilter,
  });
  const { defaultLanguage } = useDefaultLanguage();

  if (!queryFilter) return null;

  return (
    <S.QueryFilterFieldCheckboxWrapper>
      {selections.map(({ key, label }, i) => (
        <Checkbox
          css={S.checkbox}
          key={i}
          disabled={false}
          isChecked={queryFilter.tagValue.includes(key)}
          label={defaultLanguage(label)}
          handleCheck={handleCheckboxClick(queryKey, key)}
        />
      ))}
    </S.QueryFilterFieldCheckboxWrapper>
  );
};

export default QueryFilterFieldCheckbox;
