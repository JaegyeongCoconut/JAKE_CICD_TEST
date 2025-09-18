import React from "react";

import type { RecursiveUndefined } from "@repo/types";
import { comma, commaWithCurrencyUnit } from "@repo/utils/formatter/currency";
import { formatFullName } from "@repo/utils/formatter/name";

import { MedalBronzeIcon, MedalGoldIcon, MedalSilverIcon } from "~assets";
import type { DriverRankItem } from "~types";

import * as S from "./ListItem.styled";

interface ListItemProps {
  driverInfo: RecursiveUndefined<DriverRankItem>;
  driverRank: number | undefined;
  index: number;
  rankingListRefs: React.MutableRefObject<(HTMLLIElement | null)[]>;
}

const ListItem = ({
  driverInfo,
  driverRank,
  index,
  rankingListRefs,
}: ListItemProps) => {
  const MEDAL_ICONS = {
    1: <MedalGoldIcon css={S.icon} />,
    2: <MedalSilverIcon css={S.icon} />,
    3: <MedalBronzeIcon css={S.icon} />,
  };

  return (
    <S.Li
      key={driverInfo?.id || index}
      ref={(el) => (rankingListRefs.current[index] = el)}
      isCurrentDriverRank={index === driverRank}
    >
      <S.LiContent>
        <S.Ranking>
          {Object.keys(MEDAL_ICONS).includes(`${index + 1}`)
            ? MEDAL_ICONS[(index + 1) as keyof typeof MEDAL_ICONS]
            : index + 1}
        </S.Ranking>
        <S.LiContentTextWrapper>
          <S.LiContentName>
            {formatFullName({
              firstName: driverInfo?.firstName,
              lastName: driverInfo?.lastName,
            }) ?? "-"}
          </S.LiContentName>
          <S.LiContentOrderAndPriceWrapper>
            <S.LiContentOrder>
              {driverInfo?.totalTransport
                ? comma(driverInfo.totalTransport)
                : 0}{" "}
              ຄຳສັ່ງ
            </S.LiContentOrder>
            <S.LiContentPrice>
              {commaWithCurrencyUnit({
                price: driverInfo?.totalProfit,
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

export default ListItem;
