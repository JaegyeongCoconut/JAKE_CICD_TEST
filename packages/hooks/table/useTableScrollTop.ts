import { useEffect, useRef } from "react";

import { useSearchParams } from "react-router-dom";

import { size } from "@repo/styles/themes";

const useTableScrollTop = () => {
  const [searchParams] = useSearchParams();

  const tableRef = useRef<HTMLTableElement>(null);
  const toolBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tableCompo = tableRef?.current;
    const tableHeadCompo = tableCompo?.tHead;
    const tableBodyCompo = tableCompo?.tBodies[0];
    const headerHeight = +size.HEADER_HEIGHT.split("px")[0];
    const tableHeadHeight = tableHeadCompo?.scrollHeight ?? 0;
    const toolBoxHeight = toolBoxRef?.current?.scrollHeight ?? 0;

    const tableHeadPosY = (
      (tableHeadCompo?.getBoundingClientRect()?.top ?? 0) + tableHeadHeight
    ).toFixed(0);

    const tableBodyPosY = (
      tableBodyCompo?.getBoundingClientRect().top ?? 0
    ).toFixed(0);

    if (tableCompo && tableHeadPosY > tableBodyPosY) {
      window.scrollTo({
        top: tableCompo.offsetTop - headerHeight - toolBoxHeight + 2,
        behavior: "auto",
      });
    }
  }, [searchParams.get("page")]);

  return { tableRef, toolBoxRef };
};

export default useTableScrollTop;
