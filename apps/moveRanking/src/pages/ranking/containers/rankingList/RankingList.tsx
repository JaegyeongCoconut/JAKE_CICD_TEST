import React from "react";

import { useSearchParams } from "react-router-dom";

import { useGetDriversRanking } from "~services";

import * as S from "./RankingList.styled";
import RankingListItem from "./containers/listItem/RankingListItem";
import RankingListItemNoData from "./containers/listItem/noData/RankingListItemNodata";

interface RankingListProps {
  rankingListRefs: React.MutableRefObject<(HTMLLIElement | null)[]>;
}

const RankingList = ({ rankingListRefs }: RankingListProps) => {
  const [searchParams] = useSearchParams();

  const { data } = useGetDriversRanking();
  const driverRank =
    data?.drivers.length &&
    data?.drivers.findIndex(
      (driver) => driver.id === searchParams.get("driverId"),
    );

  return (
    <S.Section>
      <S.Ul>
        {data?.drivers.length
          ? data.drivers.map((driver, i) => (
              <RankingListItem
                key={driver.id}
                driver={driver}
                driverRank={driverRank!}
                index={i}
                rankingListRefs={rankingListRefs}
              />
            ))
          : Array.from({ length: 10 }, (_, i) => (
              <RankingListItemNoData key={i} index={i} />
            ))}
      </S.Ul>
    </S.Section>
  );
};

export default RankingList;
