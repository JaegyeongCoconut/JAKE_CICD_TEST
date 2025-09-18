import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./LabelContent.styled";

interface CommonProps {
  className?: string;
  isRequired?: boolean;
  label: Languages;
  children: React.ReactNode;
}

interface Horizontal extends CommonProps {
  columnWidth: number;
  direction: "horizontal";
}

interface Vertical extends CommonProps {
  columnWidth?: never;
  direction: "vertical";
}

type LabelContentProps = Horizontal | Vertical;

const LabelContent = ({
  className,
  label,
  isRequired,
  direction,
  columnWidth,
  children,
}: LabelContentProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.Wrapper
      className={className}
      columnWidth={columnWidth}
      direction={direction}
    >
      <S.LabelWrapper>
        <S.Label isRequired={isRequired}>{defaultLanguage(label)}</S.Label>
      </S.LabelWrapper>
      {children}
    </S.Wrapper>
  );
};

export default LabelContent;
