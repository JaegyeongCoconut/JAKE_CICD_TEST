import React from "react";

import { Link } from "react-router-dom";

import { CirclePlusIcon } from "@repo/assets/icon";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./CreateBannerCard.styled";

interface CreateBannerCardProps {
  dataCount: number;
  desc: Languages;
  to: string;
}

const CreateBannerCard = ({ dataCount, desc, to }: CreateBannerCardProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <Link css={S.addBanner(dataCount)} to={to}>
      <CirclePlusIcon css={S.plusIcon} />
      <S.Text>{defaultLanguage("Add banner")}</S.Text>
      <S.Description>{defaultLanguage(desc)}</S.Description>
    </Link>
  );
};

export default CreateBannerCard;
