import React from "react";

import { comma, commaWithCurrencyUnit } from "@repo/utils/formatter/currency";
import { formatFullName } from "@repo/utils/formatter/name";

import type { GetDriverRankingServerModel } from "~types";

import * as S from "./MyRankingButton.styled";

interface MyRankingButtonProps {
  rank: number;
  rankInfo: GetDriverRankingServerModel["drivers"][number];
  handleMyRaknButtonClick: () => void;
}

const MyRankingButton = ({
  rank,
  rankInfo,
  handleMyRaknButtonClick,
}: MyRankingButtonProps) => {
  return (
    <S.MyRankingButton onClick={handleMyRaknButtonClick}>
      <S.MyRankingButtonContentWrapper>
        <S.MyRanking>{comma(rank + 1)}</S.MyRanking>
        <S.MyRankginButtonNameAndOrderWrapper>
          <S.MyName>
            {formatFullName(rankInfo.firstName, rankInfo.lastName) ?? "-"}
          </S.MyName>
          <S.MyRankingButtonOrderPriceWrapper>
            <S.MyOrder>
              {comma(rankInfo.totalTransport!) || "0"} ຄຳສັ່ງ
            </S.MyOrder>
            <S.MyPrice>
              {commaWithCurrencyUnit({
                price: rankInfo.totalProfit,
                currencyUnit: "₭",
                showPlusSign: false,
              })}
            </S.MyPrice>
          </S.MyRankingButtonOrderPriceWrapper>
        </S.MyRankginButtonNameAndOrderWrapper>
      </S.MyRankingButtonContentWrapper>
    </S.MyRankingButton>
  );
};

export default MyRankingButton;
