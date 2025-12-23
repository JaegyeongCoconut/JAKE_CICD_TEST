import React, { useId } from "react";

import type { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import useTypedQueryFilterState from "@repo/hooks/queryFilter/useTypedQueryFilterState";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { QueryFilterSelections, Languages } from "@repo/types";

import * as S from "./QueryFilterFieldRadio.styled";
import useQueryFilterFieldRadio from "./hooks/useQueryFilterFieldRadio";

interface QueryFilterFieldRadioProps<T extends string> {
  disabled: boolean;
  queryKey: T;
  selections: QueryFilterSelections;
  type: typeof QUERY_FILTER_TYPE.RADIO;
}

const QueryFilterFieldRadio = <T extends string>({
  type,
  queryKey,
  disabled,
  selections,
}: QueryFilterFieldRadioProps<T>) => {
  const uuid = useId();

  const queryFilter = useTypedQueryFilterState({ type, queryKey });
  const { handleRadioButtonClick } = useQueryFilterFieldRadio({
    queryFilter,
  });
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.QueryFilterFieldRadioWrapper>
      {queryFilter &&
        selections.map(({ key, label }, i) => (
          <S.QueryFilterFieldRadioButton key={i} radioKey={key}>
            <input
              id={uuid + i}
              name={queryKey}
              checked={key === queryFilter.tagValue}
              disabled={disabled}
              value={key}
              type="radio"
              onChange={handleRadioButtonClick(key)}
            />
            <label htmlFor={uuid + i} tabIndex={0}>
              {defaultLanguage({ text: label as Languages })}
            </label>
          </S.QueryFilterFieldRadioButton>
        ))}
    </S.QueryFilterFieldRadioWrapper>
  );
};

export default QueryFilterFieldRadio;
