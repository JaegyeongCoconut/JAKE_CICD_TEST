import React from "react";

import { useSearchParams } from "react-router-dom";

import { MyRankingButton } from "~components";
import type { GetDriverRankingClientModel } from "~types";

import * as S from "./ButtonField.styled";
import useButtonField from "./hooks/useButtonField";

interface ButtonFieldProps {
  data: GetDriverRankingClientModel;
  rankingListRefs: React.MutableRefObject<(HTMLLIElement | null)[]>;
}

const ButtonField = ({ rankingListRefs, data }: ButtonFieldProps) => {
  const [searchParams] = useSearchParams();

  const driverRankInfo = data?.drivers?.find(
    (driver) => driver?.id === searchParams.get("driverId"),
  );
  const driverRank = driverRankInfo
    ? (data?.drivers?.indexOf(driverRankInfo) ?? 0)
    : 0;

  const { isRankInView, handleTop10ButtonClick, handleRectangleButtonClick } =
    useButtonField({ rank: driverRank, rankingListRefs });

  return (
    <S.Section isTop10={isRankInView}>
      {isRankInView ? (
        driverRank >= 10 && (
          <S.Top10Button onClick={handleTop10ButtonClick}>
            <p>ອັນດັບ</p>
            <p>10</p>
          </S.Top10Button>
        )
      ) : (
        <MyRankingButton
          rank={driverRank}
          rankInfo={driverRankInfo}
          handleMyRankButtonClick={handleRectangleButtonClick(driverRank)}
        />
      )}
    </S.Section>
  );
};

export default ButtonField;
