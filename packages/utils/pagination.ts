export const createPages = (
  currentPage: number,
  maxPageCount: number,
  totalPages: number,
): number[] => {
  const result = [];
  const firstIndex =
    Math.floor((currentPage - 1) / maxPageCount) * maxPageCount + 1;
  const lastIndex = Math.min(firstIndex + maxPageCount - 1, totalPages);

  for (let i = firstIndex; i <= lastIndex; i++) {
    result.push(i);
  }

  return result;
};

export const getPreviousPageNumber = (
  currentPage: number,
  maxPageCount: number,
): number =>
  Math.max(
    maxPageCount * Math.floor((currentPage - maxPageCount - 1) / maxPageCount) +
      1,
    1,
  );

export const getNextPageNumber = (
  currentPage: number,
  maxPageCount: number,
  totalPages: number,
): number =>
  Math.min(
    Math.floor((currentPage + maxPageCount - 1) / maxPageCount) * maxPageCount +
      1,
    totalPages,
  );
