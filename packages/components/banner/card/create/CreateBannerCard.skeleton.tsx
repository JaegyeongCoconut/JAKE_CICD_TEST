import React from "react";

import { CirclePlusIcon } from "@repo/assets/icon";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";
import type { Languages } from "@repo/types";

import * as S from "./CreateBannerCard.styled";

interface CreateBannerCardSkeletonProps {
  dataCount: number;
  desc: Languages;
}

const CreateBannerCardSkeleton = ({
  dataCount,
  desc,
}: CreateBannerCardSkeletonProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.CreateBannerSkeletonWrapper css={S.addBanner(dataCount)}>
      <CirclePlusIcon css={S.plusIcon} />
      <S.Text>{defaultLanguage("Add banner")}</S.Text>
      <S.Description>{defaultLanguage(desc)}</S.Description>
    </S.CreateBannerSkeletonWrapper>
  );
};

export default CreateBannerCardSkeleton;
