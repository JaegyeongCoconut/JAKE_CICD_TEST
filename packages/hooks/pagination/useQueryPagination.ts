import { useState, useEffect } from "react";

import { useSearchParams } from "react-router-dom";

import {
  getPreviousPageNumber,
  getNextPageNumber,
} from "@repo/utils/pagination";
import { getAllQuery } from "@repo/utils/queryFilter";

interface UseQueryPaginationProps {
  maxPageCount: number;
  totalPages: number;
}

const useQueryPagination = ({
  maxPageCount,
  totalPages,
}: UseQueryPaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(page ? +page : 1);

  const handlePreviousPageClick = (): void => {
    if (currentPage === 1) return;

    const previousPageNumber = getPreviousPageNumber({
      currentPage,
      maxPageCount,
    });

    setSearchParams({
      ...getAllQuery(searchParams),
      page: `${previousPageNumber}`,
    });
  };

  const handleFirstPageClick = (): void => {
    if (currentPage === 1) return;

    setSearchParams({
      ...getAllQuery(searchParams),
      page: "1",
    });
  };

  const handleNextPageClick = (): void => {
    if (currentPage === totalPages) return;

    const nextPageNumber = getNextPageNumber({
      currentPage,
      maxPageCount,
      totalPages,
    });

    setSearchParams({
      ...getAllQuery(searchParams),
      page: `${nextPageNumber}`,
    });
  };

  const handleLastPageClick = (): void => {
    if (currentPage === totalPages) return;

    setSearchParams({
      ...getAllQuery(searchParams),
      page: `${totalPages}`,
    });
  };

  const handleNumberClick = (index: number) => (): void => {
    setSearchParams({
      ...getAllQuery(searchParams),
      page: `${index}`,
    });
  };

  useEffect(() => {
    setCurrentPage(page ? +page : 1);
  }, [searchParams.get("page")]);

  return {
    currentPage,
    handlePreviousPageClick,
    handleFirstPageClick,
    handleNextPageClick,
    handleLastPageClick,
    handleNumberClick,
  };
};

export default useQueryPagination;
