import React from "react";

import Skeleton from "react-loading-skeleton";

import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";

import * as S from "./VersionCard.styled";

const VersionCardSkeleton = () => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.Wrapper>
      <S.Header>
        <Skeleton width={200} height={26} />
      </S.Header>
      <S.Body>
        <S.Item>
          <S.Name>{defaultLanguage("First version")}</S.Name>
          <Skeleton width={50} height={24} />
        </S.Item>
        <S.Item>
          <S.Name>{defaultLanguage("Last version")}</S.Name>
          <Skeleton width={50} height={24} />
        </S.Item>
        <S.Item>
          <S.Name>{defaultLanguage("Review version")}</S.Name>
          <Skeleton width={50} height={24} />
        </S.Item>
      </S.Body>
    </S.Wrapper>
  );
};

export default VersionCardSkeleton;
