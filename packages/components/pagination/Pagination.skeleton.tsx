import React from "react";

import { ChevronDoubleLeftIcon, ChevronDownIcon } from "@repo/assets/icon";

import * as S from "./Pagination.styled";

interface PaginationProps {
  className?: string;
  hasDoubleButton?: boolean;
}

const PaginationSkeleton = ({
  className,
  hasDoubleButton = true,
}: PaginationProps) => {
  return (
    <S.Pagination className={className}>
      <S.Wrapper>
        {hasDoubleButton && (
          <S.ArrowButton type="button" disabled>
            <ChevronDoubleLeftIcon />
          </S.ArrowButton>
        )}
        <S.ArrowButton type="button" disabled>
          <ChevronDownIcon css={S.chevronLeftIcon} />
        </S.ArrowButton>
        <S.NumberWrapper>
          <S.NumberButton type="button" isCurrentPage={false} disabled>
            1
          </S.NumberButton>
        </S.NumberWrapper>
        <S.ArrowButton type="button" disabled>
          <ChevronDownIcon css={S.chevronRightIcon} />
        </S.ArrowButton>
        {hasDoubleButton && (
          <S.ArrowButton type="button" disabled>
            <ChevronDoubleLeftIcon css={S.chevronDoubleRightIcon} />
          </S.ArrowButton>
        )}
      </S.Wrapper>
    </S.Pagination>
  );
};

export default PaginationSkeleton;
