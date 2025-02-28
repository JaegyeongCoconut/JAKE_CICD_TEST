import React from "react";

import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

import type { ColumnTooltip, TableHeaderInfo } from "@repo/types";
import { calcTableWidth } from "@repo/utils/table";

import Table from "./Table";
import * as S from "./Table.styled";

interface TableSkeletonProps {
  className?: string;
  tableHeaderInfos: TableHeaderInfo;
  rowCount?: number;
  height?: number;
  columnTooltip?: ColumnTooltip;
}

const TableSkeleton = ({
  className,
  tableHeaderInfos,
  columnTooltip,
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
      <Table.Header
        tableHeaderInfos={tableHeaderInfos}
        columnTooltip={columnTooltip}
      />
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
