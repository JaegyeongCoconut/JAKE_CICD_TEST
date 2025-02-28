import React from "react";

import { useSearchParams } from "react-router-dom";

import { MyRankingButton } from "~components";
import { useGetDriversRanking } from "~services";

import * as S from "./RankingButtonField.styled";
import useRankingButtonField from "./hooks/useRankingButtonField";

interface RankingButtonFieldProps {
  rankingListRefs: React.MutableRefObject<(HTMLLIElement | null)[]>;
}

const RankingButtonField = ({ rankingListRefs }: RankingButtonFieldProps) => {
  const [searchParams] = useSearchParams();

  const { data } = useGetDriversRanking();

  const driverRankInfo = data?.drivers.find(
    (driver) => driver.id === searchParams.get("driverId"),
  );

  const driverRank = driverRankInfo ? data?.drivers.indexOf(driverRankInfo) : 0;
  const isDriverRankTop10 = driverRank! >= 10;

  const { isRankInView, handleTop10ButtonClick, handleRectangleButtonClick } =
    useRankingButtonField({ rank: driverRank!, rankingListRefs });

  if (!driverRankInfo) return null;

  return (
    <S.Section isTop10={isRankInView}>
      {isRankInView ? (
        isDriverRankTop10 && (
          <S.Top10Button onClick={handleTop10ButtonClick}>
            <p>ອັນດັບ</p>
            <p>10</p>
          </S.Top10Button>
        )
      ) : (
        <MyRankingButton
          rankInfo={driverRankInfo}
          rank={driverRank!}
          handleMyRaknButtonClick={handleRectangleButtonClick(driverRank!)}
        />
      )}
    </S.Section>
  );
};

export default RankingButtonField;
