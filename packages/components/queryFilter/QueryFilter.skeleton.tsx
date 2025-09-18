import React from "react";

import type { QueryFilterRowSkeletonType } from "@repo/types";

import * as S from "./QueryFilter.styled";
import QueryFilterActionButtonsSkeleton from "./containers/actionButtons/QueryFilterActionButtons.skeleton";
import QueryFilterRowSkeleton from "./containers/row/QueryFilterRow.skeleton";

interface QueryFilterSkeletonProps {
  className?: string;
  rows: QueryFilterRowSkeletonType[];
}

const QueryFilterSkeleton = ({ className, rows }: QueryFilterSkeletonProps) => {
  return (
    <section>
      <S.QueryFilter css={className}>
        {rows.map(({ partition, controls }, i) => (
          <QueryFilterRowSkeleton
            key={i}
            controls={controls}
            partition={partition}
          />
        ))}
      </S.QueryFilter>
      <QueryFilterActionButtonsSkeleton />
    </section>
  );
};

export default QueryFilterSkeleton;
