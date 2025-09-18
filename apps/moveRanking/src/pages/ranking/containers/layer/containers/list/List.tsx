import React from "react";

import { useSearchParams } from "react-router-dom";

import type { GetDriverRankingClientModel } from "~types";

import * as S from "./List.styled";
import ListItem from "./containers/listItem/ListItem";
import ListItemNoData from "./containers/listItemNoData/ListItemNoData";

interface RankingListProps {
  data: GetDriverRankingClientModel;
  rankingListRefs: React.MutableRefObject<(HTMLLIElement | null)[]>;
}

const List = ({ rankingListRefs, data }: RankingListProps) => {
  const [searchParams] = useSearchParams();

  const driverRank =
    data?.drivers?.length &&
    data?.drivers.findIndex(
      (driver) => driver?.id === searchParams.get("driverId"),
    );

  return (
    <S.Section>
      <S.Ul>
        {data?.drivers?.length
          ? data.drivers.map((driver, i) => (
              <ListItem
                key={driver?.id || i}
                driverInfo={driver}
                driverRank={driverRank}
                index={i}
                rankingListRefs={rankingListRefs}
              />
            ))
          : Array.from({ length: 10 }, (_, i) => (
              <ListItemNoData key={i} index={i} />
            ))}
      </S.Ul>
    </S.Section>
  );
};

export default List;
