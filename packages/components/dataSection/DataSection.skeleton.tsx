import React, { Children } from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./DataSection.styled";

interface DataSectionSkeletonProps {
  className?: string;
  activeButtons: React.ReactNode;
  title: Languages | null;
  children: React.ReactNode;
}

const DataSectionSkeleton = ({
  className,
  activeButtons,
  title,
  children,
}: DataSectionSkeletonProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  const hasActiveButtons = Children.count(activeButtons) > 0;
  const hasHeader = title || hasActiveButtons;

  return (
    <section className={className}>
      {hasHeader && (
        <S.Header hasOnlyButton={!title && hasActiveButtons}>
          {title && (
            <S.LeftContent>
              <h2>{defaultLanguage({ text: title })}</h2>
            </S.LeftContent>
          )}
          {activeButtons}
        </S.Header>
      )}
      {children}
    </section>
  );
};

export default DataSectionSkeleton;
