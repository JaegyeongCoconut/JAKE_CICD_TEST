import React from "react";

import Skeleton from "react-loading-skeleton";

import type { TableHeaderInfo } from "@repo/types";
import { calcTableWidth } from "@repo/utils/table";

import Table from "./Table";
import * as S from "./Table.styled";

interface TableSkeletonProps {
  className?: string;
  height?: number;
  rowCount?: number;
  tableHeaderInfos: TableHeaderInfo;
}

const TableSkeleton = ({
  className,
  tableHeaderInfos,
  rowCount = 10,
  height = 40,
}: TableSkeletonProps) => {
  const gridTemplateColumns = calcTableWidth({ tableHeaderInfos });

  let skeletonCount = 0;
  tableHeaderInfos.forEach((item) => {
    if (item.secondDepthes) {
      skeletonCount += item.secondDepthes.length;
    } else {
      skeletonCount += 1;
    }
  });

  return (
    <S.Table className={className} gridTemplateColumns={gridTemplateColumns}>
      <Table.Header tableHeaderInfos={tableHeaderInfos} />
      <tbody>
        {[...Array(rowCount)].map((_, i) => (
          <S.Row key={i} height={height}>
            {Array(skeletonCount)
              .fill(0)
              .map((_, j) => (
                <S.Td key={j}>
                  <Skeleton />
                </S.Td>
              ))}
          </S.Row>
        ))}
      </tbody>
    </S.Table>
  );
};

export default TableSkeleton;
