import React from "react";

import type { RecursiveUndefined } from "@repo/types";
import { comma, commaWithCurrencyUnit } from "@repo/utils/formatter/currency";
import { formatFullName } from "@repo/utils/formatter/name";

import type { DriverRankItem } from "~types";

import * as S from "./MyRankingButton.styled";

interface MyRankingButtonProps {
  rank: number;
  rankInfo: RecursiveUndefined<DriverRankItem>;
  handleMyRankButtonClick: () => void;
}

const MyRankingButton = ({
  rank,
  rankInfo,
  handleMyRankButtonClick,
}: MyRankingButtonProps) => {
  return (
    <S.MyRankingButton onClick={handleMyRankButtonClick}>
      <S.MyRankingButtonContentWrapper>
        <S.MyRanking>{comma(rank + 1)}</S.MyRanking>
        <S.MyRankginButtonNameAndOrderWrapper>
          <S.MyName>
            {formatFullName({
              firstName: rankInfo?.firstName,
              lastName: rankInfo?.lastName,
            }) ?? "-"}
          </S.MyName>
          <S.MyRankingButtonOrderPriceWrapper>
            <S.MyOrder>
              {rankInfo?.totalTransport ? comma(rankInfo.totalTransport) : 0}{" "}
              ຄຳສັ່ງ
            </S.MyOrder>
            <S.MyPrice>
              {commaWithCurrencyUnit({
                price: rankInfo?.totalProfit,
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
