import React from "react";

import Skeleton from "react-loading-skeleton";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./DataSection.styled";

interface DataSectionSkeletonProps {
  className?: string;
  hasHeader?: boolean;
  buttonCount?: number;
  title?: Languages;
  children: React.ReactNode;
}

const DataSectionSkeleton = ({
  className,
  children,
  buttonCount = 0,
  title = "List",
  hasHeader = true,
}: DataSectionSkeletonProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <section className={className}>
      {hasHeader && (
        <S.Header>
          <S.LeftContent>
            <h2>{defaultLanguage(title)}</h2>
          </S.LeftContent>
          <S.ActiveWrapper>
            {[...Array(buttonCount)].map((_, i) => (
              <Skeleton key={i} height={40} width={130} />
            ))}
          </S.ActiveWrapper>
        </S.Header>
      )}
      {children}
    </section>
  );
};

export default DataSectionSkeleton;
