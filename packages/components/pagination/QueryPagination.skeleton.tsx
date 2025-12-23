import React from "react";

import { ReactComponent as DownIcon } from "@repo/assets/icon/ic_down.svg";
import { ReactComponent as LeftDoubleIcon } from "@repo/assets/icon/ic_left_double.svg";

import * as S from "./Pagination.styled";

interface QueryPaginationSkeletonProps {
  className?: string;
}

const QueryPaginationSkeleton = ({
  className,
}: QueryPaginationSkeletonProps) => {
  return (
    <S.Pagination className={className}>
      <S.Wrapper>
        <S.ArrowButton disabled type="button">
          <LeftDoubleIcon />
        </S.ArrowButton>
        <S.ArrowButton disabled type="button">
          <DownIcon css={S.chevronLeftIcon} />
        </S.ArrowButton>
        <S.NumberWrapper>
          <S.NumberButton disabled isCurrentPage={false} type="button">
            1
          </S.NumberButton>
        </S.NumberWrapper>
        <S.ArrowButton disabled type="button">
          <DownIcon css={S.chevronRightIcon} />
        </S.ArrowButton>
        <S.ArrowButton disabled type="button">
          <LeftDoubleIcon css={S.chevronDoubleRightIcon} />
        </S.ArrowButton>
      </S.Wrapper>
    </S.Pagination>
  );
};

export default QueryPaginationSkeleton;
