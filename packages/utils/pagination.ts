import { INIT_PAGE_INFO } from "@repo/constants/pagination";
import type { PageInfoType } from "@repo/types";

interface CreatePagesProps {
  currentPage: number;
  maxPageCount: number;
  totalPages: number;
}

export const createPages = ({
  currentPage,
  maxPageCount,
  totalPages,
}: CreatePagesProps): number[] => {
  const result = [];
  const firstIndex =
    Math.floor((currentPage - 1) / maxPageCount) * maxPageCount + 1;
  const lastIndex = Math.min(firstIndex + maxPageCount - 1, totalPages);

  for (let i = firstIndex; i <= lastIndex; i++) {
    result.push(i);
  }

  return result;
};

interface GetPreviousPageNumberProps {
  currentPage: number;
  maxPageCount: number;
}

export const getPreviousPageNumber = ({
  currentPage,
  maxPageCount,
}: GetPreviousPageNumberProps): number =>
  Math.max(
    maxPageCount * Math.floor((currentPage - maxPageCount - 1) / maxPageCount) +
      1,
    1,
  );

interface GetNextPageNumberProps {
  currentPage: number;
  maxPageCount: number;
  totalPages: number;
}

export const getNextPageNumber = ({
  currentPage,
  maxPageCount,
  totalPages,
}: GetNextPageNumberProps): number =>
  Math.min(
    Math.floor((currentPage + maxPageCount - 1) / maxPageCount) * maxPageCount +
      1,
    totalPages,
  );

export const generateDefaultPagination = (
  pageInfo: Partial<PageInfoType> | undefined,
): Required<PageInfoType> =>
  pageInfo
    ? {
        currentPage: pageInfo.currentPage ?? INIT_PAGE_INFO.currentPage,
        dataPerPage: pageInfo.dataPerPage ?? INIT_PAGE_INFO.dataPerPage,
        startRow: pageInfo.startRow ?? INIT_PAGE_INFO.startRow,
        totalData: pageInfo.totalData ?? INIT_PAGE_INFO.totalData,
        totalPages: pageInfo.totalPages ?? INIT_PAGE_INFO.totalPages,
      }
    : INIT_PAGE_INFO;
