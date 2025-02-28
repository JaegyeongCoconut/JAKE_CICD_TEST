import React from "react";

import Skeleton from "react-loading-skeleton";

import * as S from "./RankingList.styled";

const RankingListSkeleton = () => {
  return (
    <S.Section>
      <S.Ul>
        {Array.from({ length: 10 }, (_, i) => (
          <S.Li key={i}>
            <S.LiContent>
              <>
                <Skeleton />
                <S.LiContentTextWrapper>
                  <S.LiContentName>
                    <Skeleton css={S.skeleton(192)} />
                  </S.LiContentName>
                  <S.LiContentOrderAndPriceWrapper>
                    <S.LiContentOrder>
                      <Skeleton css={S.skeleton(30)} />
                    </S.LiContentOrder>
                    <S.LiContentPrice>
                      <Skeleton css={S.skeleton(30)} />
                    </S.LiContentPrice>
                  </S.LiContentOrderAndPriceWrapper>
                </S.LiContentTextWrapper>
              </>
            </S.LiContent>
          </S.Li>
        ))}
      </S.Ul>
    </S.Section>
  );
};

export default RankingListSkeleton;
