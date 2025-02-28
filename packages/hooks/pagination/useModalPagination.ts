import {
  getPreviousPageNumber,
  getNextPageNumber,
} from "@repo/utils/pagination";

const useModalPagination = (
  currentPage: number,
  maxPageCount: number,
  totalPages: number,
  movePage: (page: number) => void,
) => {
  const handlePreviousPageClick = (): void => {
    if (currentPage === 1) return;

    const previousPageNumber = getPreviousPageNumber(currentPage, maxPageCount);

    movePage(previousPageNumber);
  };

  const handleFirstPageClick = (): void => {
    if (currentPage === 1) return;

    movePage(1);
  };

  const handleNextPageClick = (): void => {
    if (currentPage === totalPages) return;

    const nextPageNumber = getNextPageNumber(
      currentPage,
      maxPageCount,
      totalPages,
    );

    movePage(nextPageNumber);
  };

  const handleLastPageClick = (): void => {
    if (currentPage === totalPages) return;

    movePage(totalPages);
  };

  const handleNumberClick = (index: number) => (): void => {
    movePage(index);
  };

  return {
    handlePreviousPageClick,
    handleFirstPageClick,
    handleNextPageClick,
    handleLastPageClick,
    handleNumberClick,
  };
};

export default useModalPagination;
