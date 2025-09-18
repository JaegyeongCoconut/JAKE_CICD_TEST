import {
  getPreviousPageNumber,
  getNextPageNumber,
} from "@repo/utils/pagination";

interface UseModalPaginationProps {
  currentPage: number;
  maxPageCount: number;
  totalPages: number;
  handlePageMove: (page: number) => void;
}

const useModalPagination = ({
  currentPage,
  maxPageCount,
  totalPages,
  handlePageMove,
}: UseModalPaginationProps) => {
  const handlePreviousPageClick = (): void => {
    if (currentPage === 1) return;

    const previousPageNumber = getPreviousPageNumber({
      currentPage,
      maxPageCount,
    });

    handlePageMove(previousPageNumber);
  };

  const handleFirstPageClick = (): void => {
    if (currentPage === 1) return;

    handlePageMove(1);
  };

  const handleNextPageClick = (): void => {
    if (currentPage === totalPages) return;

    const nextPageNumber = getNextPageNumber({
      currentPage,
      maxPageCount,
      totalPages,
    });

    handlePageMove(nextPageNumber);
  };

  const handleLastPageClick = (): void => {
    if (currentPage === totalPages) return;

    handlePageMove(totalPages);
  };

  const handleNumberClick = (index: number) => (): void => {
    handlePageMove(index);
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
