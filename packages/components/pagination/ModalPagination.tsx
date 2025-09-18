import React from "react";

import {
  INIT_MAX_PAGE_COUNT,
  INIT_PAGE_INFO,
} from "@repo/constants/pagination";
import useModalPagination from "@repo/hooks/pagination/useModalPagination";
import type { PageInfoType } from "@repo/types";

import Pagination from "./Pagination";

interface ModalPaginationProps {
  className?: string;
  hasDoubleButton?: boolean;
  currentPage: number;
  maxPageCount?: number;
  pageInfo?: PageInfoType;
  handlePageMove: (page: number) => void;
}

const ModalPagination = ({
  className,
  hasDoubleButton = true,
  currentPage,
  pageInfo = INIT_PAGE_INFO,
  maxPageCount = INIT_MAX_PAGE_COUNT,
  handlePageMove,
}: ModalPaginationProps) => {
  const { totalPages } = pageInfo;

  const {
    handlePreviousPageClick,
    handleFirstPageClick,
    handleNextPageClick,
    handleLastPageClick,
    handleNumberClick,
  } = useModalPagination({
    currentPage,
    maxPageCount,
    totalPages,
    handlePageMove,
  });

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

export default ModalPagination;
