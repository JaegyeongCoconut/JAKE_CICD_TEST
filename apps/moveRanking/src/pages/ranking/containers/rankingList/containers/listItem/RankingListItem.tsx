import React from "react";

import {
  BronzeMedalIcon,
  GoldMedalIcon,
  SilverMedalIcon,
} from "@repo/assets/icon";
import { comma, commaWithCurrencyUnit } from "@repo/utils/formatter/currency";
import { formatFullName } from "@repo/utils/formatter/name";

import type { GetDriverRankingServerModel } from "~types";

import * as S from "./RankingListItem.styled";

interface RankingListItemProps {
  driver: GetDriverRankingServerModel["drivers"][number];
  driverRank: number;
  index: number;
  rankingListRefs: React.MutableRefObject<(HTMLLIElement | null)[]>;
}

const RankingListItem = ({
  driver,
  driverRank,
  index,
  rankingListRefs,
}: RankingListItemProps) => {
  const MEDAL_ICONS = {
    1: <GoldMedalIcon css={S.icon} />,
    2: <SilverMedalIcon css={S.icon} />,
    3: <BronzeMedalIcon css={S.icon} />,
  };

  return (
    <S.Li
      ref={(el) => (rankingListRefs.current[index] = el)}
      key={driver.id}
      isCurrentDriverRank={index === driverRank!}
    >
      <S.LiContent>
        <S.Ranking>
          {Object.keys(MEDAL_ICONS).includes(`${index + 1}`)
            ? MEDAL_ICONS[(index + 1) as keyof typeof MEDAL_ICONS]
            : index + 1}
        </S.Ranking>
        <S.LiContentTextWrapper>
          <S.LiContentName>
            {formatFullName(driver.firstName, driver.lastName) ?? "-"}
          </S.LiContentName>
          <S.LiContentOrderAndPriceWrapper>
            <S.LiContentOrder>
              {driver.totalTransport ? comma(driver.totalTransport) : 0} ຄຳສັ່ງ
            </S.LiContentOrder>
            <S.LiContentPrice>
              {commaWithCurrencyUnit({
                price: driver.totalProfit,
                currencyUnit: "₭",
                showPlusSign: false,
              })}
            </S.LiContentPrice>
          </S.LiContentOrderAndPriceWrapper>
        </S.LiContentTextWrapper>
      </S.LiContent>
    </S.Li>
  );
};

export default RankingListItem;
