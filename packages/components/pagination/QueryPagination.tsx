import React from "react";

import { INIT_MAX_PAGE_COUNT } from "@repo/constants/pagination";
import useQueryPagination from "@repo/hooks/pagination/useQueryPagination";
import type { PageInfoType } from "@repo/types";

import Pagination from "./Pagination";

interface QueryPaginationProps {
  className?: string;
  pageInfo: PageInfoType;
}

const QueryPagination = ({ className, pageInfo }: QueryPaginationProps) => {
  const { totalPages } = pageInfo;

  const {
    currentPage,
    handlePreviousPageClick,
    handleFirstPageClick,
    handleNextPageClick,
    handleLastPageClick,
    handleNumberClick,
  } = useQueryPagination({ maxPageCount: INIT_MAX_PAGE_COUNT, totalPages });

  return (
    <Pagination
      className={className}
      currentPage={currentPage}
      maxPageCount={INIT_MAX_PAGE_COUNT}
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
