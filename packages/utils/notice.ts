export const countNoticeNo = (totalData: number, currentPage: number): number =>
  totalData - (currentPage - 1) * 20;
