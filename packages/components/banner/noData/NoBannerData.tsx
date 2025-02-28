import React from "react";

import { Link } from "react-router-dom";

import { ErrorIcon } from "@repo/assets/icon";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";

import * as S from "./NoBannerData.styled";

interface NoBannerDataProps {
  to: string;
}

const NoBannerData = ({ to }: NoBannerDataProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.NoBannerData>
      <ErrorIcon css={S.errorIcon} />
      <S.ErrorMessage>{defaultLanguage("No history")}</S.ErrorMessage>
      <Link to={to} css={S.gotoCreateBanner}>
        {defaultLanguage("Add banner")}
      </Link>
    </S.NoBannerData>
  );
};

export default NoBannerData;
