import React from "react";

import Skeleton from "react-loading-skeleton";

import { ReactComponent as CheckCircleIcon } from "@repo/assets/icon/ic_check_circle.svg";
import { ReactComponent as TruckIcon } from "@repo/assets/icon/ic_truck.svg";
import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";

import * as S from "./DispatchVehicleList.styled";
import SearchInput from "../../../../input/search/SearchInput";

const DispatchVehicleListSkeleton = () => {
  return (
    <S.SearchWrapper>
      <S.SearchHeader>
        <SearchInput
          css={S.searchInput}
          disabled
          placeholder={LANGUAGE_LABEL.SEARCH_BY_PLATE_NUMBER}
        />
      </S.SearchHeader>
      <S.SearchBody>
        <S.Ul>
          {Array.from({ length: 4 }, (_, i) => (
            <S.Li key={i}>
              <S.CardButton type="button">
                <S.CardInfoWrapper>
                  <S.SkeletonWrapper>
                    <Skeleton width="100%" />
                  </S.SkeletonWrapper>
                  <S.CardDetailInfoWrapper>
                    <TruckIcon css={S.cardDetailInfoIcon} />
                    <S.SkeletonWrapper>
                      <Skeleton width="100%" />
                    </S.SkeletonWrapper>
                  </S.CardDetailInfoWrapper>
                </S.CardInfoWrapper>
                <CheckCircleIcon css={S.successIcon(false)} />
              </S.CardButton>
            </S.Li>
          ))}
        </S.Ul>
      </S.SearchBody>
    </S.SearchWrapper>
  );
};

export default DispatchVehicleListSkeleton;
