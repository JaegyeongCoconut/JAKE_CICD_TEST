import { useState, useEffect } from "react";

import { createPages } from "@repo/utils/pagination";

const usePagination = (
  currentPage: number,
  maxPageCount: number,
  totalPages: number,
) => {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  const isPreviousNumberDisabled = currentPage - maxPageCount <= 0;
  const isNextNumberDisabled =
    maxPageCount === totalPages ||
    Math.floor((currentPage + maxPageCount - 1) / maxPageCount) >
      Math.floor(totalPages / maxPageCount);

  useEffect(() => {
    const newPageNumbers = createPages(currentPage, maxPageCount, totalPages);

    setPageNumbers(newPageNumbers);
  }, [currentPage, maxPageCount, totalPages]);

  return {
    isPreviousNumberDisabled,
    isNextNumberDisabled,
    pageNumbers,
  };
};

export default usePagination;
