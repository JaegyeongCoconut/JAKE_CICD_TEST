import React from "react";

import Skeleton from "react-loading-skeleton";

import type { Languages } from "@repo/types";

import SummaryCard from "./SummaryCard";
import * as S from "./SummaryCard.styled";

interface SummaryCardProps {
  className?: string;
  titles: Readonly<Languages[]>;
}

const SummaryCardSkeleton = ({ className, titles }: SummaryCardProps) => {
  return (
    <S.SummaryCardSkeleton className={className}>
      {titles.map((title) => (
        <SummaryCard key={title} title={title}>
          <S.Title>
            <Skeleton height="100%" width={150} borderRadius={6} />
          </S.Title>
          <S.Content>
            <Skeleton height="100%" width={80} borderRadius={6} />
          </S.Content>
        </SummaryCard>
      ))}
    </S.SummaryCardSkeleton>
  );
};

export default SummaryCardSkeleton;
