import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./SummaryCard.styled";

interface CommonProps {
  className?: string;
  children: React.ReactNode;
}

interface Title extends CommonProps {
  title: Readonly<Languages>;
  labelComponent?: never;
}

interface LabelComponent extends CommonProps {
  title?: never;
  labelComponent: React.ReactNode;
}

type SummaryCardProps = Title | LabelComponent;

const SummaryCard = ({
  className,
  children,
  title,
  labelComponent,
}: SummaryCardProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.SummaryCard className={className}>
      <div>
        {title && <S.Title>{defaultLanguage(title)} </S.Title>}
        {labelComponent && labelComponent}
      </div>
      <S.Content>{children}</S.Content>
    </S.SummaryCard>
  );
};

export default SummaryCard;
