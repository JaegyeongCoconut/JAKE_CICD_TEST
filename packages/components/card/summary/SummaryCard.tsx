import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./SummaryCard.styled";

interface SummaryCardProps {
  className?: string;
  title: Readonly<Languages>;
  children: React.ReactNode;
}

const SummaryCard = ({ className, children, title }: SummaryCardProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.SummaryCard className={className}>
      <S.Title>{defaultLanguage({ text: title })} </S.Title>
      <S.Content>{children}</S.Content>
    </S.SummaryCard>
  );
};

export default SummaryCard;
