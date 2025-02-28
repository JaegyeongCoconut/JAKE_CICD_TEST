import React from "react";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";

import * as S from "./BannerChangeOrderList.styled";
import BannerCardSkeleton from "../../card/BannerCard.skeleton";

const BannerChangeOrderListSkeleton = () => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.PageSection>
      <S.Header>
        <div>
          <S.Title>{defaultLanguage("Change order")}</S.Title>
          <S.Desc>
            {defaultLanguage(
              "You can change the order by dragging the banner.",
            )}
          </S.Desc>
        </div>
      </S.Header>
      <S.Banners>
        {Array.from({ length: 5 }, (_, i) => (
          <S.BannerChangeOrderListSkeleton key={i}>
            <BannerCardSkeleton />
          </S.BannerChangeOrderListSkeleton>
        ))}
      </S.Banners>
    </S.PageSection>
  );
};

export default BannerChangeOrderListSkeleton;
