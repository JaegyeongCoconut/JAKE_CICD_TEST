import React from "react";

import type { jsx } from "@emotion/react";

import {
  BronzeMedalIcon,
  GoldMedalIcon,
  SilverMedalIcon,
} from "@repo/assets/icon";
import { ZERO_KIP } from "@repo/assets/static";

import * as S from "./RankingListItemNoData.styled";

interface RankingListItemNodataProps {
  index: number;
}

const RankingListItemNodata = ({ index }: RankingListItemNodataProps) => {
  const renderRankIconOrDash = (rank: number): jsx.JSX.Element => {
    switch (rank) {
      case 1:
        return <GoldMedalIcon css={S.icon} />;
      case 2:
        return <SilverMedalIcon css={S.icon} />;
      case 3:
        return <BronzeMedalIcon css={S.icon} />;
      default:
        return <S.Ranking>-</S.Ranking>;
    }
  };

  return (
    <S.Li>
      <S.LiContent>
        {renderRankIconOrDash(index + 1)}
        <S.LiContentTextWrapper>
          <S.LiContentName>-</S.LiContentName>
          <S.LiContentOrderAndPriceWrapper>
            <S.LiContentOrder>0 ຄຳສັ່ງ</S.LiContentOrder>
            <S.LiContentPrice>{ZERO_KIP}</S.LiContentPrice>
          </S.LiContentOrderAndPriceWrapper>
        </S.LiContentTextWrapper>
      </S.LiContent>
    </S.Li>
  );
};

export default RankingListItemNodata;
