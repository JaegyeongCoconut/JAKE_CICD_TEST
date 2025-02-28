import React from "react";

import {
  INIT_MAX_PAGE_COUNT,
  INIT_PAGE_INFO,
} from "@repo/constants/pagination";
import useModalPagination from "@repo/hooks/pagination/useModalPagination";
import type { PageInfo } from "@repo/types";

import Pagination from "./Pagination";

interface ModalPaginationProps {
  className?: string;
  hasDoubleButton?: boolean;
  currentPage: number;
  pageInfo?: PageInfo;
  maxPageCount?: number;
  movePage: (page: number) => void;
}

const ModalPagination = ({
  className,
  hasDoubleButton = true,
  currentPage,
  pageInfo = INIT_PAGE_INFO,
  maxPageCount = INIT_MAX_PAGE_COUNT,
  movePage,
}: ModalPaginationProps) => {
  const { totalPages } = pageInfo;

  const {
    handlePreviousPageClick,
    handleFirstPageClick,
    handleNextPageClick,
    handleLastPageClick,
    handleNumberClick,
  } = useModalPagination(currentPage, maxPageCount, totalPages, movePage);

  return (
    <Pagination
      className={className}
      hasDoubleButton={hasDoubleButton}
      currentPage={currentPage}
      totalPages={totalPages}
      maxPageCount={maxPageCount}
      handlePreviousPageClick={handlePreviousPageClick}
      handleFirstPageClick={handleFirstPageClick}
      handleNextPageClick={handleNextPageClick}
      handleLastPageClick={handleLastPageClick}
      handleNumberClick={handleNumberClick}
    />
  );
};

export default ModalPagination;
