interface CountNoticeNoProps {
  currentPage: number;
  totalData: number;
}

export const countNoticeNo = ({
  totalData,
  currentPage,
}: CountNoticeNoProps): number => totalData - (currentPage - 1) * 20;
