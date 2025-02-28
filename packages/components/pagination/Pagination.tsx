import React from "react";

import { ChevronDoubleLeftIcon, ChevronDownIcon } from "@repo/assets/icon";
import usePagination from "@repo/hooks/pagination/usePagination";

import * as S from "./Pagination.styled";

interface PaginationProps {
  className?: string;
  hasDoubleButton?: boolean;
  currentPage: number;
  totalPages: number;
  maxPageCount: number;
  handlePreviousPageClick: () => void;
  handleFirstPageClick: () => void;
  handleNextPageClick: () => void;
  handleLastPageClick: () => void;
  handleNumberClick: (idx: number) => () => void;
}

const Pagination = ({
  className,
  hasDoubleButton = true,
  currentPage,
  totalPages,
  maxPageCount,
  handlePreviousPageClick,
  handleFirstPageClick,
  handleNextPageClick,
  handleLastPageClick,
  handleNumberClick,
}: PaginationProps) => {
  const { isPreviousNumberDisabled, isNextNumberDisabled, pageNumbers } =
    usePagination(currentPage, maxPageCount, totalPages);

  return (
    <S.Pagination className={className}>
      <S.Wrapper>
        {hasDoubleButton && (
          <S.ArrowButton
            type="button"
            disabled={isPreviousNumberDisabled}
            onClick={handleFirstPageClick}
          >
            <ChevronDoubleLeftIcon />
          </S.ArrowButton>
        )}

        <S.ArrowButton
          type="button"
          disabled={isPreviousNumberDisabled}
          onClick={handlePreviousPageClick}
        >
          <ChevronDownIcon css={S.chevronLeftIcon} />
        </S.ArrowButton>
        <S.NumberWrapper>
          {pageNumbers.length ? (
            pageNumbers.map((number) => (
              <S.NumberButton
                key={number}
                type="button"
                isCurrentPage={currentPage === number}
                onClick={handleNumberClick(number)}
              >
                {number}
              </S.NumberButton>
            ))
          ) : (
            <S.NumberButton type="button" isCurrentPage={false} disabled>
              1
            </S.NumberButton>
          )}
        </S.NumberWrapper>
        <S.ArrowButton
          type="button"
          disabled={isNextNumberDisabled}
          onClick={handleNextPageClick}
        >
          <ChevronDownIcon css={S.chevronRightIcon} />
        </S.ArrowButton>
        {hasDoubleButton && (
          <S.ArrowButton
            type="button"
            disabled={isNextNumberDisabled}
            onClick={handleLastPageClick}
          >
            <ChevronDoubleLeftIcon css={S.chevronDoubleRightIcon} />
          </S.ArrowButton>
        )}
      </S.Wrapper>
    </S.Pagination>
  );
};

export default Pagination;
