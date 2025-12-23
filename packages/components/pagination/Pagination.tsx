import React from "react";

import { ReactComponent as DownIcon } from "@repo/assets/icon/ic_down.svg";
import { ReactComponent as LeftDoubleIcon } from "@repo/assets/icon/ic_left_double.svg";
import usePagination from "@repo/hooks/pagination/usePagination";

import * as S from "./Pagination.styled";

interface PaginationProps {
  className?: string;
  currentPage: number;
  maxPageCount: number;
  totalPages: number;
  handleFirstPageClick: () => void;
  handleLastPageClick: () => void;
  handleNextPageClick: () => void;
  handleNumberClick: (idx: number) => () => void;
  handlePreviousPageClick: () => void;
}

const Pagination = ({
  className,
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
    usePagination({ currentPage, maxPageCount, totalPages });

  return (
    <S.Pagination className={className}>
      <S.Wrapper>
        <S.ArrowButton
          disabled={isPreviousNumberDisabled}
          type="button"
          onClick={handleFirstPageClick}
        >
          <LeftDoubleIcon />
        </S.ArrowButton>
        <S.ArrowButton
          disabled={isPreviousNumberDisabled}
          type="button"
          onClick={handlePreviousPageClick}
        >
          <DownIcon css={S.chevronLeftIcon} />
        </S.ArrowButton>
        <S.NumberWrapper>
          {pageNumbers.length ? (
            pageNumbers.map((number) => (
              <S.NumberButton
                key={number}
                isCurrentPage={currentPage === number}
                type="button"
                onClick={handleNumberClick(number)}
              >
                {number}
              </S.NumberButton>
            ))
          ) : (
            <S.NumberButton disabled isCurrentPage={false} type="button">
              1
            </S.NumberButton>
          )}
        </S.NumberWrapper>
        <S.ArrowButton
          disabled={isNextNumberDisabled}
          type="button"
          onClick={handleNextPageClick}
        >
          <DownIcon css={S.chevronRightIcon} />
        </S.ArrowButton>
        <S.ArrowButton
          disabled={isNextNumberDisabled}
          type="button"
          onClick={handleLastPageClick}
        >
          <LeftDoubleIcon css={S.chevronDoubleRightIcon} />
        </S.ArrowButton>
      </S.Wrapper>
    </S.Pagination>
  );
};

export default Pagination;
