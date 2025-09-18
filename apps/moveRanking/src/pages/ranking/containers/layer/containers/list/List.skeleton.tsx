import React from "react";

import Skeleton from "react-loading-skeleton";

import { MedalBronzeIcon, MedalGoldIcon, MedalSilverIcon } from "~assets";

import * as S from "./List.styled";

const ListSkeleton = () => {
  const MEDAL_ICONS = {
    1: <MedalGoldIcon css={S.icon} />,
    2: <MedalSilverIcon css={S.icon} />,
    3: <MedalBronzeIcon css={S.icon} />,
  };

  return (
    <S.Section>
      <S.Ul>
        {Array.from({ length: 10 }, (_, i) => (
          <S.Li key={i}>
            <S.LiContent>
              <>
                {Object.keys(MEDAL_ICONS).includes(`${i + 1}`) ? (
                  MEDAL_ICONS[(i + 1) as keyof typeof MEDAL_ICONS]
                ) : (
                  <Skeleton />
                )}
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

export default ListSkeleton;
