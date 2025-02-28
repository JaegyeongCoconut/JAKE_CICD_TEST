import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import { Languages } from "@repo/types";

import * as S from "./LabelContent.styled";

interface CommonProps {
  className?: string;
  label: Languages;
  children: React.ReactNode;
  isRequired?: boolean;
}

interface Horizontal extends CommonProps {
  direction: "horizontal";
  columnWidth: number;
}

interface Vertical extends CommonProps {
  direction: "vertical";
  columnWidth?: never;
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
      direction={direction}
      columnWidth={columnWidth}
    >
      <S.LabelWrapper>
        <S.Label isRequired={isRequired}>{defaultLanguage(label)}</S.Label>
      </S.LabelWrapper>
      {children}
    </S.Wrapper>
  );
};

export default LabelContent;
