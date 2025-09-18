import React from "react";

import type { QueryFilterFieldControlSkeletonType } from "@repo/types";

import * as S from "./QueryFilterRow.styled";
import QueryFilterFieldSkeleton from "./containers/field/QueryFilterField.skeleton";

export type QueryFilterRowSkeletonProps = {
  controls: QueryFilterFieldControlSkeletonType[];
  partition: number;
};

const QueryFilterRowSkeleton = ({
  partition,
  controls,
}: QueryFilterRowSkeletonProps) => {
  return (
    <S.QueryFilterRow partition={partition}>
      {controls.map(({ hasRadio, label, labelWidth }, i) => (
        <QueryFilterFieldSkeleton
          key={i}
          hasRadio={hasRadio}
          label={label}
          labelWidth={labelWidth}
        />
      ))}
    </S.QueryFilterRow>
  );
};

export default QueryFilterRowSkeleton;
