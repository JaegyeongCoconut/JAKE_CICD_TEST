import React, { Suspense, useRef } from "react";

import * as S from "./Ranking.styled";
import RankingButtonField from "./containers/rankingButtonField/RankingButtonField";
import RankingHeaderInfo from "./containers/rankingHeaderInfo/RankingHeaderInfo";
import RankingHeaderInfoSkeleton from "./containers/rankingHeaderInfo/RankingHeaderInfo.skeleton";
import RankingList from "./containers/rankingList/RankingList";
import RankingListSkeleton from "./containers/rankingList/RankingList.skeleton";

const Ranking = () => {
  const rankingListRefs = useRef<(HTMLLIElement | null)[]>([]);

  return (
    <S.Main>
      <Suspense fallback={<RankingHeaderInfoSkeleton />}>
        <RankingHeaderInfo />
      </Suspense>
      <Suspense fallback={<RankingListSkeleton />}>
        <RankingList rankingListRefs={rankingListRefs} />
        <RankingButtonField rankingListRefs={rankingListRefs} />
      </Suspense>
    </S.Main>
  );
};

export default Ranking;
