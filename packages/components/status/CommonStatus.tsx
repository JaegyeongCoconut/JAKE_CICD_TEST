import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./CommonStatus.styled";

interface CommonStatusProps {
  className?: string;
  hasBg?: boolean;
  variant: "orange" | "green" | "blue" | "gray" | "red";
  status: Languages;
}

const CommonStatus = ({
  className,
  hasBg,
  variant,
  status,
}: CommonStatusProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  switch (variant) {
    case "orange":
      return (
        <S.OrangeLabel className={className} hasBg={hasBg}>
          {defaultLanguage(status)}
        </S.OrangeLabel>
      );

    case "green":
      return (
        <S.GreenLabel className={className} hasBg={hasBg}>
          {defaultLanguage(status)}
        </S.GreenLabel>
      );

    case "blue":
      return (
        <S.BlueLabel className={className} hasBg={hasBg}>
          {defaultLanguage(status)}
        </S.BlueLabel>
      );

    case "gray":
      return (
        <S.GrayLabel className={className} hasBg={hasBg}>
          {defaultLanguage(status)}
        </S.GrayLabel>
      );

    case "red":
      return (
        <S.RedLabel className={className} hasBg={hasBg}>
          {defaultLanguage(status)}
        </S.RedLabel>
      );
  }
};

export default CommonStatus;
