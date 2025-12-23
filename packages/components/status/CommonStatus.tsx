import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages, StatusColorType } from "@repo/types";

import * as S from "./CommonStatus.styled";

interface CommonStatusProps {
  className?: string;
  variant: StatusColorType;
  hasBg: boolean;
  status: Languages;
}

const CommonStatus = ({
  className,
  variant,
  hasBg,
  status,
}: CommonStatusProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  switch (variant) {
    case "orange":
      return (
        <S.Label className={className} variant={variant} hasBg={hasBg}>
          {defaultLanguage({ text: status })}
        </S.Label>
      );

    case "green":
      return (
        <S.Label className={className} variant={variant} hasBg={hasBg}>
          {defaultLanguage({ text: status })}
        </S.Label>
      );

    case "blue":
      return (
        <S.Label className={className} variant={variant} hasBg={hasBg}>
          {defaultLanguage({ text: status })}
        </S.Label>
      );

    case "gray":
      return (
        <S.Label className={className} variant={variant} hasBg={hasBg}>
          {defaultLanguage({ text: status })}
        </S.Label>
      );

    case "red":
      return (
        <S.Label className={className} variant={variant} hasBg={hasBg}>
          {defaultLanguage({ text: status })}
        </S.Label>
      );
  }
};

export default CommonStatus;
