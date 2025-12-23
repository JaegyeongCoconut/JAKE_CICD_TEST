import type { ReactElement } from "react";
import React, { useEffect } from "react";

import { useSearchParams } from "react-router-dom";

import { useQueryFilterStore } from "@repo/stores/queryFilter";
import { useQueryFilterStateStore } from "@repo/stores/queryFilterState";
import type { QueryFilterConstructorItem } from "@repo/types";

import * as S from "./QueryFilter.styled";
import QueryFilterActionButtons from "./containers/actionButtons/QueryFilterActionButtons";
import QueryFilterTagBox from "./containers/box/QueryFilterTagBox";
import QueryFilterRow from "./containers/row/QueryFilterRow";
import QueryFilterField from "./containers/row/containers/field/QueryFilterField";

interface QueryFilterProps {
  className?: string;
  isLoadingApplyButton: boolean;
  marginButton?: number; // NOTE: kokkokAdmin 에서만 사용해 옵셔널 적용
  constructor: QueryFilterConstructorItem;
  children:
    | ReactElement<typeof QueryFilterRow>
    | ReactElement<typeof QueryFilterRow>[];
}

const QueryFilter = ({
  className,
  isLoadingApplyButton,
  marginButton,
  constructor,
  children,
}: QueryFilterProps) => {
  const [searchParams] = useSearchParams();

  const queryFilters = useQueryFilterStateStore((state) => state.queryFilters);
  const setQueryFilters = useQueryFilterStateStore(
    (state) => state.onSetQueryFilters,
  );
  const setIsInitQueryFilter = useQueryFilterStore(
    (state) => state.setIsInitQueryFilter,
  );

  const hasTags = Object.values(queryFilters).some(
    ({ tagValue }) => tagValue.length !== 0,
  );

  useEffect(() => {
    return () => {
      setIsInitQueryFilter(true);
    };
  }, []);

  useEffect(() => {
    setQueryFilters({ constructor, searchParams });
  }, [searchParams]);

  return (
    <section>
      <S.QueryFilter className={className}>
        {children}
        {hasTags && <QueryFilterTagBox />}
      </S.QueryFilter>
      <QueryFilterActionButtons
        isLoadingApplyButton={isLoadingApplyButton}
        marginButton={marginButton}
      />
    </section>
  );
};

QueryFilter.Row = QueryFilterRow;
QueryFilter.Field = QueryFilterField;

export default QueryFilter;
