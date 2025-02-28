import React from "react";

import dayjs from "dayjs";

import { LogoRankingIcon } from "@repo/assets/icon";
import { formatICTDateTime } from "@repo/utils/date";
import { comma, commaWithCurrencyUnit } from "@repo/utils/formatter/currency";

import { useGetDriversRanking } from "~services";

import * as S from "./RankingHeaderInfo.styled";

const RankingHeaderInfo = () => {
  const { data } = useGetDriversRanking();

  return (
    <S.Section>
      <S.DateInfo>
        <LogoRankingIcon css={S.rankingHeaderLogoIcon} />
        <S.DateInfoTitle>ການຈັດອັນດັບ Hero</S.DateInfoTitle>
        <S.DateInfoTimeWrapper>
          <p>ອັບເດດ:</p>
          <time>
            {data?.updated
              ? formatICTDateTime(data.updated)
              : dayjs().startOf("day").format("DD/MM/YYYY, HH:mm")}
          </time>
        </S.DateInfoTimeWrapper>
      </S.DateInfo>
      <S.RevenueInfo>
        <S.RevenueInfoTitle>ຄ່າສະເລ່ຍສູງສຸດ 10%</S.RevenueInfoTitle>
        <S.RevenueInfoSubTitle>ບໍ່ລວມ "0 ກີບ"</S.RevenueInfoSubTitle>
        <S.RevenueContents>
          <div>
            <S.RevenueContentTitle>ຄຳສັ່ງ</S.RevenueContentTitle>
            <S.RevenueContentOrders>
              {data?.averageTransport ? comma(data.averageTransport) : "0"}
            </S.RevenueContentOrders>
          </div>
          <div>
            <S.RevenueContentTitle>ລາຍໄດ້</S.RevenueContentTitle>
            <S.RevenueContentPrice>
              {commaWithCurrencyUnit({
                price: data?.averageProfit,
                currencyUnit: "₭",
                showPlusSign: false,
              })}
            </S.RevenueContentPrice>
          </div>
        </S.RevenueContents>
      </S.RevenueInfo>
    </S.Section>
  );
};

export default RankingHeaderInfo;
