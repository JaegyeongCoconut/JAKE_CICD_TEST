import React from "react";

import { QUERY_FILTER_TYPE } from "@repo/assets/static/queryFilter";
import useTypedQueryFilterState from "@repo/hooks/queryFilter/useTypedQueryFilterState";

import * as S from "./QueryFilterFieldNameCheckbox.styled";
import useQueryFilterFieldNameCheckbox from "./hooks/useQueryFilterFieldNameCheckbox";
import Checkbox from "../../../../../../../../button/checkbox/Checkbox";

interface QueryFilterFieldNameCheckboxProps<T extends string> {
  queryKey: T;
}

const QueryFilterFieldNameCheckbox = <T extends string>({
  queryKey,
}: QueryFilterFieldNameCheckboxProps<T>) => {
  const queryFilter = useTypedQueryFilterState({
    type: QUERY_FILTER_TYPE.CHECKBOX,
    queryKey,
  });
  const { isAllChecked, handleAllCheckboxClick } =
    useQueryFilterFieldNameCheckbox({
      queryFilter,
    });

  return (
    <Checkbox
      css={S.checkbox}
      disabled={false}
      isChecked={isAllChecked}
      handleCheck={handleAllCheckboxClick(queryKey)}
    />
  );
};

export default QueryFilterFieldNameCheckbox;
