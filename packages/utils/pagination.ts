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

interface MockPaginatedResponseProps<T, K extends string> {
  data: T[];
  dataKey: K;
  dataPerPage: number;
  page: string;
}

export const mockPaginatedResponse = <T, K extends string>({
  data,
  page,
  dataPerPage,
  dataKey,
}: MockPaginatedResponseProps<T, K>): { [key in K]: T[] } & {
  pageInfo: PageInfoType;
} => {
  const sanitizedDataPerPage = dataPerPage <= 0 ? 10 : dataPerPage; //NOTE: 음수,0 일 경우 10으로 초기화(미설정 시 이슈 발생)

  const totalData = data.length;
  const totalPages = Math.max(1, Math.ceil(totalData / sanitizedDataPerPage));
  const currentPage = Math.min(Math.max(1, +page), totalPages);
  const startRow = (currentPage - 1) * sanitizedDataPerPage;
  const pageData = data.slice(startRow, startRow + sanitizedDataPerPage);

  return {
    [dataKey]: pageData,
    pageInfo: {
      currentPage,
      dataPerPage: sanitizedDataPerPage,
      totalData,
      totalPages,
      startRow,
    },
  } as { [key in K]: T[] } & { pageInfo: PageInfoType };
};
