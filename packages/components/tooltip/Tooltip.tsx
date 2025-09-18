import React from "react";

import { ReactComponent as QuestionCircleIcon } from "@repo/assets/icon/ic_question_circle.svg";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages, TooltipPosition } from "@repo/types";

import * as S from "./Tooltip.styled";

interface TooltipProps {
  className?: string;
  position: TooltipPosition;
  message: Languages;
}

const Tooltip = ({ className, position, message }: TooltipProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.Tooltip className={className} aria-describedby="tip">
      <QuestionCircleIcon css={S.tooltipIcon} />
      <S.Container position={position}>
        <S.Message id="tip" role="tooltip">
          {defaultLanguage(message)}
        </S.Message>
      </S.Container>
    </S.Tooltip>
  );
};

export default Tooltip;
