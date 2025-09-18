import React from "react";

import type { jsx } from "@emotion/react";

import { ZERO_KIP } from "@repo/assets/static/currency";

import { MedalBronzeIcon, MedalGoldIcon, MedalSilverIcon } from "~assets";

import * as S from "./ListItemNoData.styled";

interface ListItemNoDataProps {
  index: number;
}

const ListItemNoData = ({ index }: ListItemNoDataProps) => {
  const renderRankIconOrDash = (rank: number): jsx.JSX.Element => {
    switch (rank) {
      case 1:
        return <MedalGoldIcon css={S.icon} />;
      case 2:
        return <MedalSilverIcon css={S.icon} />;
      case 3:
        return <MedalBronzeIcon css={S.icon} />;
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

export default ListItemNoData;
