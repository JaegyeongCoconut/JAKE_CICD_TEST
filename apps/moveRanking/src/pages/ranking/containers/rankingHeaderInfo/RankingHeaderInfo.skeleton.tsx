import React from "react";

import Skeleton from "react-loading-skeleton";

import { LogoRankingIcon } from "@repo/assets/icon";

import * as S from "./RankingHeaderInfo.styled";

const RankingHeaderInfoSkeleton = () => {
  return (
    <S.Section>
      <S.DateInfo>
        <LogoRankingIcon css={S.rankingHeaderLogoIcon} />
        <S.DateInfoTitle>ການຈັດອັນດັບ Hero</S.DateInfoTitle>
        <S.DateInfoTimeWrapper>
          <p>ອັບເດດ:</p>
          <Skeleton css={S.skeleton(100)} />
        </S.DateInfoTimeWrapper>
      </S.DateInfo>
      <S.RevenueInfo>
        <S.RevenueInfoTitle>ຄ່າສະເລ່ຍສູງສຸດ 10%</S.RevenueInfoTitle>
        <S.RevenueInfoSubTitle>ບໍ່ລວມ "0 ກີບ"</S.RevenueInfoSubTitle>
        <S.RevenueContents>
          <div>
            <S.RevenueContentTitle>ຄຳສັ່ງ</S.RevenueContentTitle>
            <S.RevenueContentOrders>
              <Skeleton css={S.skeleton(100)} />
            </S.RevenueContentOrders>
          </div>
          <div>
            <S.RevenueContentTitle>ລາຍໄດ້</S.RevenueContentTitle>
            <S.RevenueContentPrice>
              <Skeleton css={S.skeleton(100)} />
            </S.RevenueContentPrice>
          </div>
        </S.RevenueContents>
      </S.RevenueInfo>
    </S.Section>
  );
};

export default RankingHeaderInfoSkeleton;
