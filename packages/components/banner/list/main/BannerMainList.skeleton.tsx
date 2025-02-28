import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";

import * as S from "./BannerMainList.styled";
import BannerCardSkeleton from "../../card/BannerCard.skeleton";
import CreateBannerCardSkeleton from "../../card/create/CreateBannerCard.skeleton";

const BannerMainListSkeleton = () => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <>
      <S.BannersHeader>
        <S.Title>{`${defaultLanguage("Banners")} (0)`}</S.Title>
      </S.BannersHeader>
      <S.Banners>
        <CreateBannerCardSkeleton
          dataCount={5}
          desc="The added banners are applied in order in the KOKKOK Move app."
        />
        {Array.from({ length: 5 }, (_, i) => (
          <S.BannerMainListSkeleton key={i}>
            <BannerCardSkeleton />
          </S.BannerMainListSkeleton>
        ))}
      </S.Banners>
    </>
  );
};

export default BannerMainListSkeleton;
