import React from "react";

import {
  INIT_MAX_PAGE_COUNT,
  INIT_PAGE_INFO,
} from "@repo/constants/pagination";
import useQueryPagination from "@repo/hooks/pagination/useQueryPagination";
import type { PageInfoType } from "@repo/types";

import Pagination from "./Pagination";

interface QueryPaginationProps {
  className?: string;
  hasDoubleButton?: boolean;
  maxPageCount?: number;
  pageInfo?: PageInfoType;
}

const QueryPagination = ({
  className,
  hasDoubleButton = true,
  pageInfo = INIT_PAGE_INFO,
  maxPageCount = INIT_MAX_PAGE_COUNT,
}: QueryPaginationProps) => {
  const { totalPages } = pageInfo;

  const {
    currentPage,
    handlePreviousPageClick,
    handleFirstPageClick,
    handleNextPageClick,
    handleLastPageClick,
    handleNumberClick,
  } = useQueryPagination({ maxPageCount, totalPages });

  return (
    <Pagination
      className={className}
      hasDoubleButton={hasDoubleButton}
      currentPage={currentPage}
      maxPageCount={maxPageCount}
      totalPages={totalPages}
      handleFirstPageClick={handleFirstPageClick}
      handleLastPageClick={handleLastPageClick}
      handleNextPageClick={handleNextPageClick}
      handleNumberClick={handleNumberClick}
      handlePreviousPageClick={handlePreviousPageClick}
    />
  );
};

export default QueryPagination;
