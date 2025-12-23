import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./LabelContent.styled";

interface BaseLabelContentProps {
  className?: string;
  isRequired: boolean;
  label: Languages;
  children: React.ReactNode;
}

interface HorizontalLabelContentProps extends BaseLabelContentProps {
  columnWidth: number;
  direction: "horizontal";
}

interface VerticalLabelContentProps extends BaseLabelContentProps {
  columnWidth?: never;
  direction: "vertical";
}

const LabelContent = ({
  className,
  label,
  isRequired,
  direction,
  columnWidth,
  children,
}: HorizontalLabelContentProps | VerticalLabelContentProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.Wrapper
      className={className}
      columnWidth={columnWidth}
      direction={direction}
    >
      <S.LabelWrapper>
        <S.Label isRequired={isRequired}>
          {defaultLanguage({ text: label })}
        </S.Label>
      </S.LabelWrapper>
      {children}
    </S.Wrapper>
  );
};

export default LabelContent;
