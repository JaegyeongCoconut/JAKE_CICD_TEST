import React from "react";

import Skeleton from "react-loading-skeleton";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";

import * as S from "./BannerCard.styled";

interface BannerCardSkeletonProps {
  children?: React.ReactNode;
}

const BannerCardSkeleton = ({ children }: BannerCardSkeletonProps) => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.BannerSkeletonCard>
      <S.Header>
        <S.InfoWrapper>
          <S.Label>{defaultLanguage("Order")}</S.Label>
          <Skeleton width={60} height={22} />
        </S.InfoWrapper>
        <S.InfoWrapper>
          <S.Label>{defaultLanguage("Status")}</S.Label>
          <Skeleton width={60} height={22} />
        </S.InfoWrapper>
        <S.InfoWrapper>
          <S.Label>{defaultLanguage("Linked")}</S.Label>
          <Skeleton width={60} height={22} />
        </S.InfoWrapper>
      </S.Header>
      <S.BannerImgWrapper bgColor="">
        <Skeleton css={S.bannerImg} />
      </S.BannerImgWrapper>
      {children}
    </S.BannerSkeletonCard>
  );
};

export default BannerCardSkeleton;
