import React from "react";

import Skeleton from "react-loading-skeleton";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { TableHeaderInfo } from "@repo/types";
import { calcTableWidth } from "@repo/utils/table";

import * as S from "./CheckTable.styled";
import Checkbox from "../../button/checkbox/Checkbox";

interface CheckTableSkeletonProps {
  className?: string;
  rowCount: number;
  tableHeaderInfos: TableHeaderInfo;
}

const CheckTableSkeleton = ({
  className,
  tableHeaderInfos,
  rowCount,
}: CheckTableSkeletonProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const gridTemplateColumns = calcTableWidth({
    prevGrid: ["40px"],
    tableHeaderInfos: tableHeaderInfos,
  });

  return (
    <S.Table className={className} gridTemplateColumns={gridTemplateColumns}>
      <thead>
        <S.HeadRow>
          <S.CheckTh>
            <Checkbox disabled />
          </S.CheckTh>
          {tableHeaderInfos.map(({ key, label }, i) => (
            <S.Th key={i} title={key}>
              {defaultLanguage({ text: label })}
            </S.Th>
          ))}
        </S.HeadRow>
      </thead>
      <tbody>
        {[...Array(rowCount)].map((_, i) => (
          <S.Row key={i}>
            <S.Td>
              <Skeleton />
            </S.Td>
            {tableHeaderInfos.map(({ key }) => (
              <S.Td key={key}>
                <Skeleton />
              </S.Td>
            ))}
          </S.Row>
        ))}
      </tbody>
    </S.Table>
  );
};

export default CheckTableSkeleton;
