import React from "react";

import Skeleton from "react-loading-skeleton";

import { LANGUAGE_LABEL } from "@repo/constants/languageLabel";
import useDefaultLanguage from "@repo/hooks/useDefaultLanguage";

import * as S from "./VersionCard.styled";

const VersionCardSkeleton = () => {
  const { defaultLanguage } = useDefaultLanguage();

  return (
    <S.Wrapper>
      <S.Header>
        <Skeleton height={26} width={200} />
      </S.Header>
      <S.Body>
        <S.Item>
          <S.Name>{defaultLanguage(LANGUAGE_LABEL.FIRST_VERSION)}</S.Name>
          <Skeleton height={24} width={50} />
        </S.Item>
        <S.Item>
          <S.Name>{defaultLanguage(LANGUAGE_LABEL.LAST_VERSION)}</S.Name>
          <Skeleton height={24} width={50} />
        </S.Item>
        <S.Item>
          <S.Name>{defaultLanguage(LANGUAGE_LABEL.REVIEW_VERSION)}</S.Name>
          <Skeleton height={24} width={50} />
        </S.Item>
      </S.Body>
    </S.Wrapper>
  );
};

export default VersionCardSkeleton;
