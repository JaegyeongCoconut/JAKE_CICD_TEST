import React from "react";

import Skeleton from "react-loading-skeleton";

import type { QueryFilterFieldControlSkeletonType } from "@repo/types";

import * as S from "./QueryFilterField.styled";
import QueryFilterFieldName from "./containers/name/QueryFilterFieldName";

interface QueryFilterFieldSkeletonProps
  extends QueryFilterFieldControlSkeletonType {}

const QueryFilterFieldSkeleton = ({
  hasRadio,
  label,
  labelWidth,
}: QueryFilterFieldSkeletonProps) => {
  return (
    <S.QueryFilterFieldWrapper disabled={false} labelWidth={labelWidth}>
      <QueryFilterFieldName
        isMultiSelect={false}
        isRequired={false}
        label={label}
        queryKey=""
      />
      {hasRadio ? (
        <S.QueryFilterFieldRadioSkeletonWrapper>
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} height={30} width={80} />
          ))}
        </S.QueryFilterFieldRadioSkeletonWrapper>
      ) : (
        <S.QueryFilterFieldControlSkeletonWrapper>
          <Skeleton css={S.inlineSkeleton} height={26} width={400} />
        </S.QueryFilterFieldControlSkeletonWrapper>
      )}
    </S.QueryFilterFieldWrapper>
  );
};

export default QueryFilterFieldSkeleton;
