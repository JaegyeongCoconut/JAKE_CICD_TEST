import React from "react";

import dayjs from "dayjs";

import { formatICTDateTime } from "@repo/utils/date";
import { comma, commaWithCurrencyUnit } from "@repo/utils/formatter/currency";

import { LogoHeroRankingIcon } from "~assets";
import type { GetDriverRankingClientModel } from "~types";

import * as S from "./HeaderInfo.styled";

interface HeaderInfoProps {
  data: GetDriverRankingClientModel;
}

const HeaderInfo = ({ data }: HeaderInfoProps) => {
  return (
    <S.Section>
      <S.DateInfo>
        <LogoHeroRankingIcon css={S.rankingHeaderLogoIcon} />
        <S.DateInfoTitle>ການຈັດອັນດັບ Hero</S.DateInfoTitle>
        <S.DateInfoTimeWrapper>
          <p>ອັບເດດ:</p>
          <time>
            {data?.updated
              ? formatICTDateTime({ date: data.updated })
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

export default HeaderInfo;
